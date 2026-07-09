/**
 * Lead form integration.
 * Browser submissions go through /api/contact so validation, CORS, rate
 * limiting, and spam filtering happen before forwarding to HubSpot.
 */

export interface HubSpotFormData {
  firstname?: string;
  lastname?: string;
  name?: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  [key: string]: string | undefined;
}

/**
 * Submit form data through the site contact API.
 * @param formData - Object containing form field data
 * @returns Promise resolving to the submission result
 */
export async function submitToHubSpot(
  formData: HubSpotFormData
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: "Tradeline Inquiry",
        ...formData,
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "Failed to submit form. Please try again.",
      };
    }

    return {
      success: Boolean(result?.success),
      message: result?.message || "Form submitted successfully!",
    };
  } catch (error) {
    console.error("Lead submission error:", error);
    return {
      success: false,
      message: "An error occurred while submitting the form.",
    };
  }
}
