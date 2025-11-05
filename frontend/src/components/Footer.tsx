import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { InstagramIcon, LinkedinIcon, YoutubeIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Container from "./Container";

const socialLinks = [
  { href: "https://www.instagram.com", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.linkedin.com", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "https://www.youtube.com", label: "YouTube", Icon: YoutubeIcon }
];

const quickLinks = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about", fallback: "À propos" },
  { to: "/faq", key: "nav.faq" },
  { to: "/contact", key: "nav.contact" },
  { to: "/legal", key: "footer.legal" }
];

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-marhaban-beige text-marhaban-blue dark:bg-marhaban-blue dark:text-marhaban-beige transition-colors duration-300 ease-out">
      <Container className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-marhaban-blue/10 text-marhaban-gold shadow-soft transition group-hover:scale-105 group-hover:bg-marhaban-gold/20 dark:bg-marhaban-beige/10 dark:text-marhaban-gold">
              <img src="/images/logoM.png" alt={t("siteName")} loading="lazy" className="h-10 w-10 rounded-lg object-cover" />
            </span>
            <div>
              <p className="font-title text-xl font-semibold text-marhaban-blue dark:text-marhaban-beige">{t("siteName")}</p>
              <p className="text-sm text-marhaban-blue/70 dark:text-marhaban-beige/70">{t("footer.address")}</p>
            </div>
          </Link>
          <p className="max-w-md text-sm text-marhaban-blue/80 dark:text-marhaban-beige/75">
            {t("footer.tagline", "Simplifions l’arrivée au Canada 🇨🇦")}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-marhaban-blue/10 text-marhaban-blue shadow-soft transition hover:-translate-y-0.5 hover:bg-marhaban-gold hover:text-marhaban-blue dark:bg-marhaban-beige/15 dark:text-marhaban-beige dark:hover:bg-marhaban-gold dark:hover:text-marhaban-blue"
                aria-label={label}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-marhaban-blue/60 dark:text-marhaban-beige/60">
            {t("footer.quickLinks", "Liens rapides")}
          </h3>
          <nav className="grid gap-2 text-sm" aria-label={t("footer.quickLinks", "Liens rapides")}>
            {quickLinks.map(({ to, key, fallback }) => (
              <Link
                key={to}
                to={to}
                className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-marhaban-blue/5 px-4 py-2 font-medium text-marhaban-blue transition hover:-translate-y-0.5 hover:border-marhaban-gold/40 hover:bg-marhaban-gold/15 hover:text-marhaban-gold dark:bg-marhaban-beige/10 dark:text-marhaban-beige dark:hover:bg-marhaban-gold/10 dark:hover:text-marhaban-blue"
              >
                <span className="h-2 w-2 rounded-full bg-marhaban-gold shadow-soft" aria-hidden="true" />
                {t(key, fallback)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-marhaban-blue/60 dark:text-marhaban-beige/60">
            {t("footer.contactTitle", "Contact")}
          </h3>
          <ul className="space-y-3 text-sm text-marhaban-blue dark:text-marhaban-beige">
            <li className="flex items-center gap-3 rounded-2xl border border-marhaban-blue/20 bg-marhaban-blue/5 px-4 py-3 shadow-soft dark:border-marhaban-beige/20 dark:bg-marhaban-beige/10">
              <MapPinIcon className="h-4 w-4 text-marhaban-gold" aria-hidden="true" />
              Montréal, QC
            </li>
            <li className="flex items-center gap-3 rounded-2xl border border-marhaban-blue/20 bg-marhaban-blue/5 px-4 py-3 shadow-soft dark:border-marhaban-beige/20 dark:bg-marhaban-beige/10">
              <MailIcon className="h-4 w-4 text-marhaban-gold" aria-hidden="true" />
              <a
                href="mailto:contact@marhabancanada.ca"
                className="transition hover:text-marhaban-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-beige dark:focus-visible:ring-offset-marhaban-blue"
              >
                contact@marhabancanada.ca
              </a>
            </li>
            <li className="flex items-center gap-3 rounded-2xl border border-marhaban-blue/20 bg-marhaban-blue/5 px-4 py-3 shadow-soft dark:border-marhaban-beige/20 dark:bg-marhaban-beige/10">
              <PhoneIcon className="h-4 w-4 text-marhaban-gold" aria-hidden="true" />
              +1 514 555 1234
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-marhaban-blue/15 dark:border-marhaban-beige/15">
        <Container className="flex flex-col gap-3 py-6 text-xs text-marhaban-blue/70 dark:text-marhaban-beige/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Marhaban Canada — {t("footer.rightsShort", "Tous droits réservés.")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/privacy" className="transition hover:text-marhaban-gold dark:hover:text-marhaban-gold">
              {t("footer.privacy")}
            </Link>
            <Link to="/terms" className="transition hover:text-marhaban-gold dark:hover:text-marhaban-gold">
              {t("footer.terms")}
            </Link>
            <Link to="/legal" className="transition hover:text-marhaban-gold dark:hover:text-marhaban-gold">
              {t("footer.legal")}
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
