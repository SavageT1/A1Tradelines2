const HUBSPOT_PORTAL_ID = "244921424";
const HUBSPOT_FORM_ID = "f738963e-9243-43e3-848c-df584038fa1a";

const ALLOWED_ORIGINS = new Set([
  "https://a1tradelines.com",
  "https://www.a1tradelines.com",
  "https://a1-tradelines2.vercel.app",
]);

function getCorsHeaders(origin?: string) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://a1tradelines.com";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

function sendJson(res: any, status: number, payload: unknown, origin?: string) {
  const headers = getCorsHeaders(origin);
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
  return res.status(status).json(payload);
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

  try {
    const { firstname, lastname, email, phone, subject, message } = req.body || {};

    if (!email) {
      return sendJson(res, 400, { success: false, message: "Email is required" }, origin);
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
          pageName: subject === "Tradeline Assessment Request" ? "Tradeline Assessment" : "Contact Form",
        },
      }),
    });

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      console.error("HubSpot error:", response.status, details);
      return sendJson(res, 500, { success: false, message: "Failed to submit form" }, origin);
    }

    return sendJson(res, 200, { success: true, message: "Form submitted successfully!" }, origin);
  } catch (error) {
    console.error("Contact API error:", error);
    return sendJson(res, 500, { success: false, message: "Server error" }, origin);
  }
}
