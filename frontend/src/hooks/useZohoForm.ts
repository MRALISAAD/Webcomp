import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../lib/axios";
import type { UtmValues } from "./useUTM";

export interface LeadFormValues {
  fullName: string;
  email: string;
  phone: string;
  country?: string;
  desiredPack: "" | "Basique" | "Standard" | "Premium";
  message: string;
  consent: boolean;
}

export interface LeadPayload extends Omit<LeadFormValues, "consent"> {
  utm: UtmValues | null;
  locale: "fr" | "en";
  pack: string;
}

const readStoredUtm = (): UtmValues | null => {
  if (typeof window === "undefined") return null;
  const raw =
    window.sessionStorage.getItem("utm") ??
    window.sessionStorage.getItem("marhaban-utm");
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as UtmValues;
    if (window.sessionStorage.getItem("marhaban-utm")) {
      window.sessionStorage.removeItem("marhaban-utm");
      window.sessionStorage.setItem("utm", JSON.stringify(parsed));
    }
    return parsed;
  } catch (error) {
    console.error("Failed to parse stored UTM", error);
    window.sessionStorage.removeItem("utm");
    window.sessionStorage.removeItem("marhaban-utm");
    return null;
  }
};

export const useZohoForm = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const submitLead = useCallback(
    async (values: LeadFormValues) => {
      setIsLoading(true);
      try {
        const mapDesiredPackToSlug = (value: string): string => {
          const normalized = value.trim().toLowerCase();
          if (!normalized) return "essential";
          if (["basique", "essentiel", "essential", "pack essentiel"].includes(normalized)) return "essential";
          if (["standard", "confort", "comfort", "pack confort"].includes(normalized)) return "comfort";
          return "premium";
        };

        const payload: LeadPayload = {
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          country: values.country?.trim() ?? "",
          desiredPack: values.desiredPack,
          message: values.message.trim(),
          utm: readStoredUtm(),
          locale: i18n.language === "en" ? "en" : "fr",
          pack: mapDesiredPackToSlug(values.desiredPack),
        };

        const { desiredPack: _omit, ...apiPayload } = payload;
        const response = await api.post("/leads", apiPayload);
        console.info("✅ Lead submitted to Zoho CRM", response.data);
        return { success: true };
      } catch (error) {
        console.error("❌ Failed to submit lead", error);
        return { success: false, error };
      } finally {
        setIsLoading(false);
      }
    },
    [i18n.language]
  );

  return { submitLead, isLoading };
};
