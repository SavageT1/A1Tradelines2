declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    oaiq?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, params: EventParams = {}) {
  window.gtag?.("event", eventName, params);
}

export function trackPhoneClick(location: string) {
  trackEvent("phone_click", { location, method: "phone" });
}

export function trackEmailClick(location: string) {
  trackEvent("email_click", { location, method: "email" });
}

export function trackAssessmentStart() {
  trackEvent("assessment_started", { form_name: "tradeline_assessment" });
  window.oaiq?.(
    "measure",
    "custom",
    { type: "custom" },
    { custom_event_name: "assessment_started" }
  );
}

export function trackAssessmentSubmitted() {
  trackEvent("assessment_submitted", { form_name: "tradeline_assessment" });
  window.oaiq?.(
    "measure",
    "lead_created",
    { type: "customer_action" },
    { event_id: `assessment_${Date.now()}_${Math.random().toString(36).slice(2, 10)}` }
  );
}

export function trackInventoryCardClick(item: { id: number; bank: string; price: number }) {
  trackEvent("inventory_card_click", {
    item_id: item.id,
    item_name: item.bank,
    value: item.price,
    currency: "USD",
  });
  window.oaiq?.("measure", "contents_viewed", {
    type: "contents",
    contents: [
      {
        id: String(item.id),
        name: item.bank,
        content_type: "tradeline",
      },
    ],
  });
}

export {};
