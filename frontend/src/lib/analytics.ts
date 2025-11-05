// Google Analytics 4 integration
// Usage: trackEvent('event_name', { param1: 'value' })

interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  if (typeof window === "undefined" || !measurementId) return;

  // Load GA script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }

  gtag("js", new Date());
  gtag("config", measurementId, {
    page_path: window.location.pathname,
  });

  // Store gtag function globally
  (window as any).gtag = gtag;

  console.log("✅ Google Analytics initialized");
};

// Track page view
export const trackPageView = (path: string) => {
  if (typeof window === "undefined" || !(window as any).gtag) return;

  (window as any).gtag("config", import.meta.env.VITE_GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

// Track event
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === "undefined" || !(window as any).gtag) return;

  (window as any).gtag("event", eventName, params);
};

// Specific tracking functions
export const trackLeadSubmission = (pack: string) => {
  trackEvent("lead_submitted", {
    event_category: "Lead",
    event_label: pack,
    value: 1,
  });
};

export const trackContactSubmission = () => {
  trackEvent("contact_submitted", {
    event_category: "Contact",
    value: 1,
  });
};

export const trackPackClick = (packName: string) => {
  trackEvent("pack_clicked", {
    event_category: "Packs",
    event_label: packName,
  });
};

export const trackBlogView = (slug: string) => {
  trackEvent("blog_viewed", {
    event_category: "Blog",
    event_label: slug,
  });
};

export const trackLanguageChange = (language: string) => {
  trackEvent("language_changed", {
    event_category: "i18n",
    event_label: language,
  });
};

export const trackThemeToggle = (theme: string) => {
  trackEvent("theme_toggled", {
    event_category: "UI",
    event_label: theme,
  });
};

