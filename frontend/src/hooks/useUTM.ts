import { useEffect } from "react";

export interface UtmValues {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

const UTM_STORAGE_KEY = "utm";
const LEGACY_UTM_KEY = "marhaban-utm";
const UTM_PARAM_KEYS: Array<keyof UtmValues> = ["source", "medium", "campaign", "term", "content"];

const captureUtmFromUrl = () => {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const utmValues: UtmValues = {};

  UTM_PARAM_KEYS.forEach((key) => {
    const value = params.get(`utm_${key}`);
    if (value) {
      utmValues[key] = value;
    }
  });

  if (Object.keys(utmValues).length > 0) {
    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmValues));
  }
};

const readStoredUtm = (): UtmValues => {
  if (typeof window === "undefined") return {};

  const raw =
    window.sessionStorage.getItem(UTM_STORAGE_KEY) ??
    window.sessionStorage.getItem(LEGACY_UTM_KEY);
  if (!raw) return {};

  try {
    if (window.sessionStorage.getItem(LEGACY_UTM_KEY)) {
      window.sessionStorage.removeItem(LEGACY_UTM_KEY);
      window.sessionStorage.setItem(UTM_STORAGE_KEY, raw);
    }
    return JSON.parse(raw) as UtmValues;
  } catch (error) {
    console.error("Failed to parse stored UTM", error);
    window.sessionStorage.removeItem(UTM_STORAGE_KEY);
    window.sessionStorage.removeItem(LEGACY_UTM_KEY);
    return {};
  }
};

export const useUTM = () => {
  useEffect(() => {
    captureUtmFromUrl();
  }, []);

  return {
    getStoredUtm: () => readStoredUtm()
  };
};

export const useUTMCapture = useUTM;
export const getStoredUtm = readStoredUtm;
