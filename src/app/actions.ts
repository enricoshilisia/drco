"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { practiceAreas } from "@/lib/content";
import { sendMail } from "@/lib/graph";
import {
  clientAcknowledgmentEmail,
  firmNotificationEmail,
  newsletterNotificationEmail,
  newsletterWelcomeEmail,
  type InquiryEmailData,
} from "@/lib/email-templates";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  reference?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

const MIN_FILL_MS = 3000; // bots submit instantly

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number we can reach you on")
    .max(30)
    .regex(/^[+\d\s()-]+$/, "Use digits, spaces and + only"),
  practice: z.string().refine((v) => v === "other" || practiceAreas.some((p) => p.slug === v), "Please choose a practice area"),
  preferredContact: z.enum(["Phone", "Email", "WhatsApp"]),
  urgent: z.boolean(),
  message: z.string().trim().min(20, "Please describe your matter in a few sentences").max(5000),
  consent: z.literal(true, "Please confirm you have read the privacy notice"),
  sourcePage: z.string().max(200).optional(),
});

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

function isBot(formData: FormData) {
  if (formData.get("company_website")) return true; // honeypot
  const started = Number(formData.get("started_at"));
  return !started || Date.now() - started < MIN_FILL_MS;
}

function makeReference() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(3)), (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 4).toUpperCase();
  return `DK-${ymd}-${rand}`;
}

// INQUIRY_ROUTES="family-succession:family@firm.co.ke,corporate-commercial:corporate@firm.co.ke"
function routeFor(practice: string) {
  const fallback = process.env.INQUIRY_INBOX || process.env.MS_SENDER_MAILBOX || site.email;
  const routes = Object.fromEntries(
    (process.env.INQUIRY_ROUTES ?? "")
      .split(",")
      .map((pair) => pair.split(":").map((s) => s.trim()))
      .filter(([k, v]) => k && v),
  );
  return routes[practice] ?? fallback;
}

export async function submitInquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  // Silently "succeed" for bots so they don't retry.
  if (isBot(formData)) return { status: "success", reference: "DK-RECEIVED" };

  if (!rateLimit(`inquiry:${await clientIp()}`)) {
    return { status: "error", message: "Too many submissions. Please call us or try again in a few minutes." };
  }

  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    practice: formData.get("practice"),
    preferredContact: formData.get("preferredContact") ?? "Email",
    urgent: formData.get("urgent") === "on",
    message: formData.get("message"),
    consent: formData.get("consent") === "on",
    sourcePage: formData.get("sourcePage") ?? undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const v = parsed.data;
  const practiceTitle = practiceAreas.find((p) => p.slug === v.practice)?.title ?? "General enquiry";
  const data: InquiryEmailData = {
    reference: makeReference(),
    name: v.name,
    email: v.email,
    phone: v.phone,
    practiceTitle,
    preferredContact: v.preferredContact,
    urgent: v.urgent,
    message: v.message,
    submittedAt: new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi", dateStyle: "full", timeStyle: "short" }),
    sourcePage: v.sourcePage || "/contact",
  };

  try {
    // 1) Route to the right inbox, with Reply-To set to the client.
    await sendMail({
      to: [{ address: routeFor(v.practice) }],
      replyTo: [{ address: v.email, name: v.name }],
      subject: `${v.urgent ? "[URGENT] " : ""}New enquiry ${data.reference} · ${practiceTitle} · ${v.name}`,
      html: firmNotificationEmail(data),
      importance: v.urgent ? "high" : "normal",
    });
    // 2) Instant branded acknowledgment to the client.
    await sendMail({
      to: [{ address: v.email, name: v.name }],
      subject: `We've received your enquiry — ref ${data.reference}`,
      html: clientAcknowledgmentEmail(data, site.bookingsUrl),
    });
  } catch (err) {
    console.error("[inquiry] email failed", err);
    return {
      status: "error",
      message: `We couldn't send your enquiry just now. Please call ${site.phone} or email ${site.email}.`,
    };
  }

  return { status: "success", reference: data.reference };
}

const newsletterSchema = z.object({ email: z.email("Please enter a valid email address") });

export async function subscribeNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: "success" };
  if (!rateLimit(`news:${await clientIp()}`, 3)) return { status: "error", message: "Please try again later." };

  const parsed = newsletterSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { status: "error", message: "Please enter a valid email address." };

  try {
    await sendMail({
      to: [{ address: process.env.NEWSLETTER_INBOX || process.env.INQUIRY_INBOX || site.email }],
      subject: `New Insights subscriber: ${parsed.data.email}`,
      html: newsletterNotificationEmail(parsed.data.email),
    });
    await sendMail({
      to: [{ address: parsed.data.email }],
      subject: `Subscribed to legal updates from ${site.name}`,
      html: newsletterWelcomeEmail(),
    });
  } catch (err) {
    console.error("[newsletter] email failed", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
  return { status: "success", message: "Thank you — you're subscribed." };
}
