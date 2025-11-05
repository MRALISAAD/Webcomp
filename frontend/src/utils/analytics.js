let gaId = null;
let initialized = false;

const isBrowser = typeof window !== "undefined";

function injectGtScript() {
  if (!isBrowser || document.getElementById("ga4-script")) return;
  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);
}

function push(...args) {
  if (!isBrowser) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

export function initAnalytics(id) {
  if (!isBrowser || initialized || !id) return;
  gaId = id;
  injectGtScript();
  push("js", new Date());
  push("config", gaId, { anonymize_ip: true });
  initialized = true;
}

export function trackPageView(path) {
  if (!initialized || !gaId) return;
  push("config", gaId, { page_path: path });
}

export function trackEvent({ action, category, label, value }) {
  if (!initialized || !gaId) return;
  push("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}
