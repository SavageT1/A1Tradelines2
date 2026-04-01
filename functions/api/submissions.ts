const HUBSPOT_PORTAL_ID = "244921424";
const HUBSPOT_FORM_ID = "f738963e-9243-43e3-848c-df584038fa1a";

export const onRequestGet: PagesFunction<{ HUBSPOT_API_TOKEN: string }> = async ({ request, env }) => {
  const token = env.HUBSPOT_API_TOKEN;

  if (!token) {
    return new Response(
      JSON.stringify({ success: false, message: "HubSpot API token not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit") || "10";

    const response = await fetch(
      `https://api.hubapi.com/form-integrations/v1/submissions/forms/${HUBSPOT_FORM_ID}?limit=${limit}&portalId=${HUBSPOT_PORTAL_ID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ success: false, message: `HubSpot error: ${response.status}` }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json() as { results?: any[]; total?: number };

    // Format submissions for easy reading
    const submissions = (data.results || []).map((s: any) => {
      const fields: Record<string, string> = {};
      (s.values || []).forEach((v: any) => { fields[v.name] = v.value; });
      return {
        submittedAt: new Date(s.submittedAt).toLocaleString("en-US", { timeZone: "America/Phoenix" }),
        name: `${fields.firstname || ""} ${fields.lastname || ""}`.trim() || "Unknown",
        email: fields.email || "",
        phone: fields.phone || "",
        subject: fields.subject || "",
        message: fields.message || "",
      };
    });

    return new Response(
      JSON.stringify({ success: true, total: data.total || submissions.length, submissions }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
