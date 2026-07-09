const HUBSPOT_PORTAL_ID = "244921424";
const HUBSPOT_FORM_ID = "f738963e-9243-43e3-848c-df584038fa1a";
const LEAD_NOTIFICATION_EMAIL = "info@a1tradelines.com";
const RESEND_API_KEY = (typeof process !== "undefined" && process.env && process.env.RESEND_API_KEY) || "";
const RESEND_FROM_EMAIL = (typeof process !== "undefined" && process.env && process.env.RESEND_FROM_EMAIL) || "A1 Tradelines <leads@a1tradelines.com>";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://www.a1tradelines.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const body = (await request.json()) as Record<string, string>;
    const { firstname, lastname, name, email, phone, subject, message } = body;

    const parts = (name || "").trim().split(/\s+/).filter(Boolean);
    const resolvedFirstname = firstname || parts[0] || "";
    const resolvedLastname = lastname || parts.slice(1).join(" ") || "";
    const pageName =
      subject?.startsWith("Inquiry:")
        ? "Tradeline Inquiry"
        : subject === "Tradeline Assessment Request"
          ? "Tradeline Assessment"
          : "Contact Form";

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, message: "Email is required" }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

    const response = await fetch(hubspotUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: [
          { name: "firstname", value: resolvedFirstname },
          { name: "lastname", value: resolvedLastname },
          { name: "email", value: email },
          { name: "phone", value: phone || "" },
          { name: "subject", value: subject || "" },
          { name: "message", value: subject ? `[${subject}] ${message || ""}` : (message || "") },
        ],
        context: {
          pageUri: request.headers.get("referer") || "https://a1tradelines.com/contact",
          pageName,
        },
      }),
    });

    if (!response.ok) {
      console.error("HubSpot error:", response.status);
      return new Response(
        JSON.stringify({ success: false, message: "Failed to submit form" }),
        { status: 500, headers: CORS_HEADERS }
      );
    }

    if (RESEND_API_KEY) {
      const text = [
        `New lead from ${pageName}`,
        `Name: ${[resolvedFirstname, resolvedLastname].filter(Boolean).join(" ") || email}`,
        `Email: ${email}`,
        `Phone: ${phone || ""}`,
        `Subject: ${subject || ""}`,
        "",
        message || "",
      ].join("\n");

      const notifyResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: RESEND_FROM_EMAIL,
          to: [LEAD_NOTIFICATION_EMAIL],
          subject: `New lead: ${[resolvedFirstname, resolvedLastname].filter(Boolean).join(" ") || email}`,
          text,
        }),
      });

      if (!notifyResponse.ok) {
        console.error("Lead notification email failed:", notifyResponse.status);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Form submitted successfully!" }),
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("Pages Function error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
};
