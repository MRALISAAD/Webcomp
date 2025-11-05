import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../lib/axios";

export interface ContactFormValues {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  pack?: string | null;
}

export const useContactForm = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const submitContact = useCallback(async (values: ContactFormValues) => {
    setIsLoading(true);
    try {
      const payload = {
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        subject: "Contact site web",
        message: values.message.trim(),
        preferredLanguage: i18n.language.startsWith("en") ? "en" : "fr",
        pack: values.pack ?? "",
        source: "website",
      };

      const res = await api.post("/contact", payload);
      return { success: true, data: res.data };
    } catch (error) {
      console.error("contact.submit_failed", error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  }, [i18n.language]);

  return { submitContact, isLoading };
};


