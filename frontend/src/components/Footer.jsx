import { useTranslation } from "react-i18next";

const LINKS = [
  { href: "/mentions", label: "Mentions légales" },
  { href: "/privacy", label: "Confidentialité" }
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200 bg-muted py-10 dark:border-slate-700 dark:bg-slate-900">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-navy dark:text-white">Marhaban Canada</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t("footer.tagline")}</p>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-300">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="underline decoration-transparent underline-offset-2 hover:decoration-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:contact@marhabancanada.ca"
            className="btn btn-secondary text-sm font-semibold"
          >
            contact@marhabancanada.ca
          </a>
        </nav>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} Marhaban Canada · {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
