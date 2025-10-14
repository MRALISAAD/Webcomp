import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle.jsx";
import LangSwitcher from "./LangSwitcher.jsx";

const NAV_ITEMS = [
  { id: "home", to: "/", end: true },
  { id: "services", to: "/services" },
  { id: "packs", to: "/packs" },
  { id: "about", to: "/a-propos" },
  { id: "testimonials", to: "/temoignages" },
  { id: "contact", to: "/contact" }
];

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const primaryLinks = NAV_ITEMS.filter((item) => item.id !== "contact");

  const linkClass = ({ isActive }) =>
    `px-2 py-1 rounded-md transition ${
      isActive
        ? "text-navy font-semibold dark:text-trust"
        : "text-slate-700 hover:text-navy dark:text-slate-200"
    }`;

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-slate-700 dark:bg-ink/90">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-lg font-extrabold tracking-wide text-navy dark:text-white">
          MARHABAN CANADA
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {primaryLinks.map(({ id, to, end }) => (
            <NavLink key={id} to={to} end={end} className={linkClass}>
              {t(`navbar.${id}`)}
            </NavLink>
          ))}
          <LangSwitcher />
          <ThemeToggle />
          <NavLink to="/contact" className="btn btn-primary">
            {t("navbar.contact")}
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-controls="mobile-nav"
          aria-expanded={open}
          className="md:hidden rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-200"
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-ink md:hidden"
        >
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map(({ id, to, end }) => (
              <NavLink
                key={id}
                to={to}
                end={end}
                onClick={closeMenu}
                className={linkClass}
              >
                {t(`navbar.${id}`)}
              </NavLink>
            ))}
            <LangSwitcher />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
