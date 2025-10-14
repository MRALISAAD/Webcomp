const STORAGE_KEY = "mc:utm";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id"];

function parseParams(search) {
  const params = new URLSearchParams(search);
  const collected = {};

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      collected[key] = value;
    }
  });

  return collected;
}

export function captureUtmParams(search = window.location.search) {
  if (typeof window === "undefined") {
    return {};
  }

  const utm = parseParams(search);

  if (Object.keys(utm).length === 0) {
    return getStoredUtmParams();
  }

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  return utm;
}

export function getStoredUtmParams() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
