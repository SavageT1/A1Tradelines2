const HUBSPOT_PORTAL_ID = "244921424";
const HUBSPOT_FORM_ID = "f738963e-9243-43e3-848c-df584038fa1a";
const LEAD_NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL || "info@a1tradelines.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "A1 Tradelines <leads@a1tradelines.com>";

const ALLOWED_ORIGINS = new Set([
  "https://a1tradelines.com",
  "https://www.a1tradelines.com",
  "https://a1-tradelines2.vercel.app",
]);

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;
const MAX_FIELD_LENGTHS = {
  firstname: 80,
  lastname: 80,
  email: 254,
  phone: 40,
  subject: 120,
  message: 4000,
};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimitHits = new Map<string, { count: number; resetAt: number }>();

function isAllowedOrigin(origin?: string) {
  if (!origin) return true;

  if (ALLOWED_ORIGINS.has(origin)) return true;

  try {
    const { hostname, protocol } = new URL(origin);
    return protocol === "https:" && hostname.endsWith(".vercel.app") && hostname.startsWith("a1-tradelines2");
  } catch {
    return false;
  }
}

function getCorsHeaders(origin?: string) {
  const allowedOrigin = origin && isAllowedOrigin(origin) ? origin : "https://a1tradelines.com";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "X-Content-Type-Options": "nosniff",
    "Content-Type": "application/json",
  };
}

function sendJson(res: any, status: number, payload: unknown, origin?: string) {
  const headers = getCorsHeaders(origin);
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
  return res.status(status).json(payload);
}

function getClientIp(req: any) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.socket?.remoteAddress || "unknown";
}

function isRateLimited(req: any) {
  const ip = getClientIp(req);
  const now = Date.now();
  const existing = rateLimitHits.get(ip);

  if (!existing || now > existing.resetAt) {
    rateLimitHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  existing.count += 1;
  return existing.count > RATE_LIMIT_MAX;
}

function cleanField(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstname: "", lastname: "" };
  if (parts.length === 1) return { firstname: parts[0], lastname: "" };
  return { firstname: parts[0], lastname: parts.slice(1).join(" ") };
}

async function sendLeadNotification(input: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  pageName: string;
}) {
  if (!RESEND_API_KEY || !LEAD_NOTIFICATION_EMAIL) return;

  const text = [
    `New lead from ${input.pageName}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Subject: ${input.subject}`,
    "",
    input.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [LEAD_NOTIFICATION_EMAIL],
      subject: `New lead: ${input.name || input.email}`,
      text,
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    console.error("Lead notification email failed:", response.status, details);
  }
}

function isSpamTrapFilled(body: Record<string, unknown>) {
  return Boolean(
    cleanField(body.website, 200) ||
      cleanField(body.companyWebsite, 200) ||
      cleanField(body.url, 200)
  );
}

export default async function handler(req: any, res: any) {
  const origin = req.headers.origin as string | undefined;

  if (req.method === "OPTIONS") {
    const headers = getCorsHeaders(origin);
    Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { success: false, message: "Method not allowed" }, origin);
  }

  if (!isAllowedOrigin(origin)) {
    return sendJson(res, 403, { success: false, message: "Request origin is not allowed" }, origin);
  }

  if (isRateLimited(req)) {
    return sendJson(res, 429, { success: false, message: "Too many submissions. Please try again later." }, origin);
  }

  try {
    const body = (req.body || {}) as Record<string, unknown>;

    if (isSpamTrapFilled(body)) {
      return sendJson(res, 200, { success: true, message: "Form submitted successfully!" }, origin);
    }

    const fullName = cleanField(body.name, MAX_FIELD_LENGTHS.firstname);
    const firstnameInput = cleanField(body.firstname, MAX_FIELD_LENGTHS.firstname);
    const lastnameInput = cleanField(body.lastname, MAX_FIELD_LENGTHS.lastname);
    const splitName = fullName ? splitFullName(fullName) : { firstname: "", lastname: "" };
    const firstname = firstnameInput || splitName.firstname;
    const lastname = lastnameInput || splitName.lastname;
    const email = cleanField(body.email, MAX_FIELD_LENGTHS.email).toLowerCase();
    const phone = cleanField(body.phone, MAX_FIELD_LENGTHS.phone);
    const subject = cleanField(body.subject, MAX_FIELD_LENGTHS.subject);
    const message = cleanField(body.message, MAX_FIELD_LENGTHS.message);
    const pageName =
      subject === "Tradeline Assessment Request"
        ? "Tradeline Assessment"
        : subject.startsWith("Inquiry:")
          ? "Tradeline Inquiry"
          : "Contact Form";

    if (!email) {
      return sendJson(res, 400, { success: false, message: "Email is required" }, origin);
    }

    if (!EMAIL_PATTERN.test(email)) {
      return sendJson(res, 400, { success: false, message: "Please enter a valid email address" }, origin);
    }

    const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
    const response = await fetch(hubspotUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: [
          { name: "firstname", value: firstname || "" },
          { name: "lastname", value: lastname || "" },
          { name: "email", value: email },
          { name: "phone", value: phone || "" },
          { name: "subject", value: subject || "" },
          { name: "message", value: subject ? `[${subject}] ${message || ""}` : (message || "") },
        ],
        context: {
          pageUri: req.headers.referer || "https://a1tradelines.com/contact",
          pageName,
        },
      }),
    });

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      console.error("HubSpot error:", response.status, details);
      return sendJson(res, 500, { success: false, message: "Failed to submit form" }, origin);
    }

    const submittedName = `${firstname || ""} ${lastname || ""}`.trim() || email;
    await sendLeadNotification({
      name: submittedName,
      email,
      phone,
      subject,
      message,
      pageName,
    });

    return sendJson(res, 200, { success: true, message: "Form submitted successfully!" }, origin);
  } catch (error) {
    console.error("Contact API error:", error);
    return sendJson(res, 500, { success: false, message: "Server error" }, origin);
  }
}
