import "server-only";

// Sends email through Microsoft 365 using the Microsoft Graph API with
// app-only (client credentials) auth. See README → "Microsoft 365 email setup".

type Recipient = { address: string; name?: string };

export type GraphMail = {
  to: Recipient[];
  cc?: Recipient[];
  replyTo?: Recipient[];
  subject: string;
  html: string;
  importance?: "low" | "normal" | "high";
  saveToSentItems?: boolean;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

function env(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}`);
  return v;
}

export function isGraphConfigured() {
  return Boolean(
    process.env.MS_TENANT_ID && process.env.MS_CLIENT_ID && process.env.MS_CLIENT_SECRET && process.env.MS_SENDER_MAILBOX,
  );
}

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

  const res = await fetch(`https://login.microsoftonline.com/${env("MS_TENANT_ID")}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env("MS_CLIENT_ID"),
      client_secret: env("MS_CLIENT_SECRET"),
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Graph token request failed: ${res.status} ${await res.text()}`);

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

const toGraph = (list?: Recipient[]) => list?.map((r) => ({ emailAddress: { address: r.address, name: r.name } }));

export async function sendMail(mail: GraphMail) {
  if (!isGraphConfigured()) {
    // Local development without credentials: log instead of failing the form.
    console.warn(`[graph] not configured — would send "${mail.subject}" to ${mail.to.map((t) => t.address).join(", ")}`);
    return;
  }

  const token = await getAccessToken();
  const sender = encodeURIComponent(env("MS_SENDER_MAILBOX"));
  const res = await fetch(`https://graph.microsoft.com/v1.0/users/${sender}/sendMail`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: {
        subject: mail.subject,
        body: { contentType: "HTML", content: mail.html },
        toRecipients: toGraph(mail.to),
        ccRecipients: toGraph(mail.cc),
        replyTo: toGraph(mail.replyTo),
        importance: mail.importance ?? "normal",
      },
      saveToSentItems: mail.saveToSentItems ?? true,
    }),
    cache: "no-store",
  });
  // Graph returns 202 Accepted on success.
  if (res.status !== 202) throw new Error(`Graph sendMail failed: ${res.status} ${await res.text()}`);
}
