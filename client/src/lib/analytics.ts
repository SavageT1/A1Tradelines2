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

export function trackPageView(path: string, title?: string) {
  trackEvent("page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: title ?? document.title,
  });
}

export function trackFormEvent(
  formName: string,
  action: "started" | "submitted" | "failed",
  params: EventParams = {}
) {
  trackEvent(`form_${action}`, {
    form_name: formName,
    action,
    ...params,
  });
  trackEvent(`${formName}_${action}`, {
    form_name: formName,
    action,
    ...params,
  });
}

export function trackPhoneClick(location: string) {
  trackEvent("phone_click", { location, method: "phone" });
}

export function trackEmailClick(location: string) {
  trackEvent("email_click", { location, method: "email" });
}

export function trackAssessmentStart() {
  trackFormEvent("assessment", "started");
  window.oaiq?.(
    "measure",
    "custom",
    { type: "custom" },
    { custom_event_name: "assessment_started" }
  );
}

export function trackAssessmentSubmitted() {
  trackFormEvent("assessment", "submitted");
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

export function trackInventoryFilterChange(filterName: string, value: string) {
  trackEvent("inventory_filter_change", {
    filter_name: filterName,
    filter_value: value,
  });
}

export {};
