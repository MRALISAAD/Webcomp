import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MenuIcon, XIcon, MessageCircleIcon } from "lucide-react";
import LangSwitcher from "../LangSwitcher";
import ThemeToggle from "../ThemeToggle";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import Container from "../Container";

const navItems = [
  { to: "/", key: "nav.home" },
  { to: "/packs", key: "nav.packs" },
  { to: "/faq", key: "nav.faq" },
  { to: "/blog", key: "nav.blog" },
  { to: "/temoignages", key: "nav.testimonials" },
  { to: "/a-propos", key: "nav.about" },
  { to: "/contact", key: "nav.contact" }
];

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-950/90">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/logoM.png"
            alt="Logo Marhaban Canada"
            className="h-10 w-10 rounded-full object-cover"
            loading="lazy"
          />
          <span className="text-base font-semibold tracking-tight text-ink dark:text-white">
            Marhaban Canada
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium text-zinc-600 transition hover:text-ink dark:text-zinc-300 dark:hover:text-white",
                  isActive && "text-ink dark:text-white"
                )
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitcher />
          <ThemeToggle />
          <Button asChild size="sm">
            <Link to="/contact">
              <MessageCircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("cta.contactTeam")}
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          <span className="sr-only">Menu</span>
          {isOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden",
          isOpen ? "block border-t border-zinc-200 dark:border-zinc-800" : "hidden"
        )}
      >
        <Container className="flex flex-col gap-4 py-6" aria-label="Navigation mobile">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  "text-base font-medium text-zinc-600 transition hover:text-ink dark:text-zinc-300 dark:hover:text-white",
                  isActive && "text-ink dark:text-white"
                )
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
          <LangSwitcher />
          <ThemeToggle />
          <Button asChild>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <MessageCircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("cta.contactTeam")}
            </Link>
          </Button>
        </Container>
      </div>
    </header>
  );
};

export default Navbar;
