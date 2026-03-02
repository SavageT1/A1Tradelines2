/**
 * HubSpot Forms API Integration
 * Submits form data to HubSpot using the Forms API
 * Portal ID: 244921424
 * Form ID: f738963e-9243-43e3-848c-df584038fa1a
 * Region: NA2
 */

const HUBSPOT_PORTAL_ID = "244921424";
const HUBSPOT_FORM_ID = "f738963e-9243-43e3-848c-df584038fa1a";
const HUBSPOT_REGION = "na2";

export interface HubSpotFormData {
  firstname?: string;
  lastname?: string;
  email: string;
  phone?: string;
  message?: string;
  [key: string]: string | undefined;
}

/**
 * Submit form data to HubSpot
 * @param formData - Object containing form field data
 * @returns Promise resolving to the submission result
 */
export async function submitToHubSpot(
  formData: HubSpotFormData
): Promise<{ success: boolean; message: string }> {
  try {
    // Build the submission URL
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

    // Transform form data to HubSpot format
    const fields = Object.entries(formData)
      .filter(([, value]) => value !== undefined && value !== "")
      .map(([name, value]) => ({
        name,
        value: String(value),
      }));

    const payload = {
      fields,
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    // Submit to HubSpot
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // HubSpot returns 200 on success, other codes on error
      const errorData = await response.json().catch(() => ({}));
      console.error("HubSpot submission error:", errorData);
      return {
        success: false,
        message: "Failed to submit form. Please try again.",
      };
    }

    return {
      success: true,
      message: "Form submitted successfully!",
    };
  } catch (error) {
    console.error("HubSpot submission error:", error);
    return {
      success: false,
      message: "An error occurred while submitting the form.",
    };
  }
}
