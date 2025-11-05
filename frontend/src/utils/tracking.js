import { trackEvent } from "./analytics.js";

export const TrackingCategories = {
  LEAD: "lead",
  CONTACT: "contact",
  CTA: "cta",
};

export function trackLeadSubmission({ source = "website", pack }) {
  if (!pack) return;
  trackEvent({
    action: "lead_submitted",
    category: `${TrackingCategories.LEAD}:${source}`,
    label: pack,
  });
}

export function trackBookingLead(pack) {
  trackEvent({
    action: "booking_lead",
    category: `${TrackingCategories.LEAD}:booking`,
    label: pack,
  });
}

export function trackContactSubmission(subject) {
  trackEvent({
    action: "contact_message",
    category: TrackingCategories.CONTACT,
    label: subject,
  });
}

export function trackCta(name, variant) {
  trackEvent({
    action: "cta_click",
    category: TrackingCategories.CTA,
    label: variant ? `${name}:${variant}` : name,
  });
}
