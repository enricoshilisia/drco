import "server-only";
import { site } from "./site";

// Email-safe HTML (tables + inline styles) in the firm's palette.

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function layout(title: string, inner: string) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#FAF7F0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F0;padding:32px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border:1px solid #E7E0D0;">
<tr><td style="background:#0E1A2B;padding:24px 32px;">
<span style="display:inline-block;border:1.5px solid #C9A25C;color:#C9A25C;font-family:Georgia,serif;font-size:14px;padding:6px 8px;margin-right:10px;">DK</span>
<span style="color:#FAF7F0;font-family:Georgia,serif;font-size:18px;vertical-align:middle;">${esc(site.name)}</span>
</td></tr>
<tr><td style="padding:32px;font-family:'Segoe UI',Arial,sans-serif;color:#1C1C1A;font-size:15px;line-height:1.7;">
<h1 style="font-family:Georgia,serif;font-weight:normal;color:#0E1A2B;font-size:24px;margin:0 0 16px;">${esc(title)}</h1>
${inner}
</td></tr>
<tr><td style="background:#0A141F;padding:20px 32px;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;color:#8C99AD;line-height:1.6;">
${esc(site.legalName)} · ${esc(site.address.building)}, ${esc(site.address.street)}, ${esc(site.address.city)}<br>
Tel ${esc(site.phone)} · ${esc(site.phone2)} · Cell ${esc(site.mobile)}<br><a href="mailto:${site.email}" style="color:#C9A25C;">${esc(site.email)}</a> · <a href="${site.url}" style="color:#C9A25C;">${esc(site.url.replace(/^https?:\/\//, ""))}</a><br>
This email and any attachments are confidential and may be legally privileged.
</td></tr>
</table></td></tr></table></body></html>`;
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:8px 12px 8px 0;color:#6B6558;font-size:13px;vertical-align:top;white-space:nowrap;">${esc(label)}</td><td style="padding:8px 0;font-size:15px;">${value}</td></tr>`;

export type InquiryEmailData = {
  reference: string;
  name: string;
  email: string;
  phone: string;
  practiceTitle: string;
  preferredContact: string;
  urgent: boolean;
  message: string;
  submittedAt: string;
  sourcePage: string;
};

export function firmNotificationEmail(d: InquiryEmailData) {
  const urgentBanner = d.urgent
    ? `<p style="background:#FBEFD9;border:1px solid #C9A25C;padding:10px 14px;margin:0 0 20px;"><strong>Marked urgent by the client</strong> — please respond today.</p>`
    : "";
  return layout(
    `New consultation request · ${d.reference}`,
    `${urgentBanner}
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
${row("Name", esc(d.name))}
${row("Email", `<a href="mailto:${esc(d.email)}" style="color:#8A6A22;">${esc(d.email)}</a>`)}
${row("Phone", `<a href="tel:${esc(d.phone.replace(/\s/g, ""))}" style="color:#8A6A22;">${esc(d.phone)}</a>`)}
${row("Practice area", esc(d.practiceTitle))}
${row("Prefers", esc(d.preferredContact))}
${row("Submitted", esc(d.submittedAt))}
${row("From page", esc(d.sourcePage))}
</table>
<h2 style="font-family:Georgia,serif;font-weight:normal;color:#0E1A2B;font-size:18px;margin:24px 0 8px;">Matter summary</h2>
<div style="background:#FAF7F0;border:1px solid #E7E0D0;padding:16px;white-space:pre-wrap;">${esc(d.message)}</div>
<p style="margin-top:24px;color:#6B6558;font-size:13px;">Reply to this email to respond directly to the client. An acknowledgment with reference ${esc(d.reference)} has already been sent to them.</p>`,
  );
}

export function clientAcknowledgmentEmail(d: InquiryEmailData, bookingsUrl: string) {
  const first = d.name.split(/\s+/)[0];
  const booking = bookingsUrl
    ? `<p>If you would like to choose a time now, you can <a href="${esc(bookingsUrl)}" style="color:#8A6A22;">book a consultation slot online</a>.</p>`
    : "";
  return layout(
    "We have received your enquiry",
    `<p>Dear ${esc(first)},</p>
<p>Thank you for contacting ${esc(site.name)}. Your enquiry about <strong>${esc(d.practiceTitle)}</strong> has been received and passed to the relevant advocate.</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px 0;background:#0E1A2B;width:100%;"><tr><td style="padding:16px 20px;color:#FAF7F0;">
<span style="color:#C9A25C;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">Your reference</span><br>
<span style="font-family:Georgia,serif;font-size:22px;">${esc(d.reference)}</span></td></tr></table>
<p><strong>What happens next</strong></p>
<ol style="padding-left:20px;margin:0 0 16px;">
<li>An advocate reviews your enquiry and checks for any conflict of interest.</li>
<li>We contact you by ${esc(d.preferredContact.toLowerCase())} ${d.urgent ? "<strong>as a priority, today where possible</strong>" : "within one business day"}.</li>
<li>If we can assist, we confirm the scope of work and fees in writing before any work begins.</li>
</ol>
${booking}
<p>Please keep your reference number for any correspondence. If your matter involves a court deadline, call us on <a href="tel:${site.phoneHref.replace("tel:", "")}" style="color:#8A6A22;">${esc(site.phone)}</a>.</p>
<p style="color:#6B6558;font-size:13px;border-top:1px solid #E7E0D0;padding-top:16px;margin-top:24px;">Submitting an enquiry does not create an advocate–client relationship. Please do not send original documents until we have confirmed our engagement. Your information is processed in accordance with the Data Protection Act, 2019 and our privacy notice.</p>
<p>Kind regards,<br>${esc(site.name)}</p>`,
  );
}

export function newsletterNotificationEmail(email: string) {
  return layout("New Insights subscriber", `<p><strong>${esc(email)}</strong> subscribed to legal updates from the website.</p>`);
}

export function newsletterWelcomeEmail() {
  return layout(
    "You're subscribed to our legal updates",
    `<p>Thank you for subscribing. We publish short, practical notes on changes in Kenyan and East African law that affect individuals and businesses.</p>
<p>You can unsubscribe at any time by replying to this email with “unsubscribe”.</p>
<p>Kind regards,<br>${esc(site.name)}</p>`,
  );
}
