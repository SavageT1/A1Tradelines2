const HUBSPOT_PORTAL_ID = "244921424";
const HUBSPOT_FORM_ID = "f738963e-9243-43e3-848c-df584038fa1a";

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
    const { firstname, lastname, email, phone, subject, message } = body;

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
          { name: "firstname", value: firstname || "" },
          { name: "lastname", value: lastname || "" },
          { name: "email", value: email },
          { name: "phone", value: phone || "" },
          { name: "subject", value: subject || "" },
          { name: "message", value: subject ? `[${subject}] ${message || ""}` : (message || "") },
        ],
        context: {
          pageUri: request.headers.get("referer") || "https://a1tradelines.com/contact",
          pageName: "Contact Form",
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
