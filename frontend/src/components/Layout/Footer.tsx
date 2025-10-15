import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MessageCircleIcon } from "lucide-react";
import Container from "../Container";

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white/80 py-10 text-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <Container className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="/images/logoM.png"
              alt="Logo Marhaban Canada"
              loading="lazy"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="text-base font-semibold text-ink dark:text-zinc-100">Marhaban Canada</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{t("footer.address")}</p>
            </div>
          </div>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-ink transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-primary dark:hover:text-primary"
            href="mailto:contact@marhabancanada.ca"
          >
            <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
            contact@marhabancanada.ca
          </a>
        </div>

        <div className="grid gap-6 text-zinc-600 dark:text-zinc-300 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {t("footer.legal")}
            </p>
            <Link className="hover:text-primary" to="/mentions-legales">
              {t("footer.legal")}
            </Link>
            <Link className="hover:text-primary" to="/politique-confidentialite">
              {t("footer.privacy")}
            </Link>
            <Link className="hover:text-primary" to="/conditions-utilisation">
              {t("footer.terms")}
            </Link>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              WhatsApp
            </p>
            <a
              className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80"
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER ?? ""}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
              {t("footer.whatsappCta")}
            </a>
          </div>
        </div>
      </Container>
      <Container className="mt-10 border-t border-zinc-100 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        {t("footer.rights", { year })}
      </Container>
    </footer>
  );
};

export default Footer;
