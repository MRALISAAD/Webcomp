import { MessageCircleIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const buildWhatsAppUrl = (language: string, packFromRoute?: string) => {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER ?? "";
  const base = `https://wa.me/${phone}`;
  const messageBase =
    language === "en"
      ? "Hello Marhaban Canada, I would like to talk with an advisor"
      : "Bonjour Marhaban Canada, je souhaite parler avec un conseiller";
  const packText = packFromRoute ? ` - Pack: ${packFromRoute}` : "";
  const text = encodeURIComponent(`${messageBase}${packText}`);
  return `${base}?text=${text}`;
};

const WhatsAppFloat = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const packFromRoute = location.hash?.replace("#", "") || undefined;
  const link = buildWhatsAppUrl(i18n.language, packFromRoute);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Parler à un conseiller sur WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-xl transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
    >
      <MessageCircleIcon className="h-6 w-6" aria-hidden="true" />
    </a>
  );
};

export default WhatsAppFloat;
