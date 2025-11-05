import { useEffect, useState, type ComponentProps, type ComponentType } from "react";
import type { SVGProps } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, Package, Users, Mail, Menu, X, ArrowRight } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { cn } from "../lib/utils";
// @ts-expect-error Prefetch utilities exported from JS module
import { usePrefetchRoute } from "./PrefetchLink";

type NavItem = {
  to: string;
  labelKey: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const navItems: NavItem[] = [
  { to: "/", labelKey: "navbar.home", icon: Home },
  { to: "/packs", labelKey: "navbar.packs", icon: Package },
  { to: "/partners", labelKey: "navbar.partners", icon: Users },
  { to: "/contact", labelKey: "navbar.contact", icon: Mail }
];

type PrefetchedNavLinkProps = ComponentProps<typeof NavLink>;

const PrefetchedNavLink = ({ to, children, className, ...rest }: PrefetchedNavLinkProps) => {
  const { ref, handleMouseEnter, handleFocus } = usePrefetchRoute(to);

  return (
    <NavLink
      ref={(node: HTMLAnchorElement | null) => {
        if (ref) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (ref as any).current = node;
        }
      }}
      to={to}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      className={className}
      {...rest}
    >
      {children}
    </NavLink>
  );
};

const Navbar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full border-b border-gray-200 bg-[#F5F0E6]/95 shadow-sm transition-all duration-300 ease-out backdrop-blur-lg dark:border-gray-700 dark:bg-[#002B5B]/95",
        isScrolled ? "shadow-lg shadow-[#002B5B]/10" : "shadow-none"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 text-sm sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src="/images/logoM.png" alt={t("siteName")} className="h-10 w-10 rounded-full shadow-md" loading="lazy" />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold text-[#002B5B] dark:text-white">Marhaban</span>
            <span className="text-lg font-semibold text-[#002B5B] dark:text-white">Canada</span>
          </div>
        </Link>

        <div
          className="hidden items-center gap-6 text-[#002B5B] transition-colors duration-300 dark:text-gray-100 md:flex"
          aria-label={t("nav.ariaPrimary", { defaultValue: "Navigation principale" })}
        >
          {navItems.map(({ to, labelKey, icon: Icon }) => (
            <PrefetchedNavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-full px-3 py-2 font-medium transition-colors duration-300 hover:bg-[#002B5B]/10 dark:hover:bg-white/10",
                  isActive ? "bg-[#002B5B] text-white dark:bg-[#B23A48]" : ""
                )
              }
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{t(labelKey)}</span>
            </PrefetchedNavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              to="/booking"
              className="flex items-center gap-2 rounded-full bg-[#B23A48] px-5 py-2.5 font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#9d3440] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B23A48] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F0E6] dark:focus-visible:ring-offset-[#002B5B]"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              {t("navbar.book")}
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#B23A48]/40 text-[#002B5B] transition duration-300 hover:bg-[#002B5B]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B23A48] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F0E6] dark:border-[#B23A48]/50 dark:text-gray-100 dark:hover:bg-white/10 dark:focus-visible:ring-offset-[#002B5B] md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? t("nav.close", { defaultValue: "Fermer le menu" }) : t("nav.menu", { defaultValue: "Ouvrir le menu" })}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">{isMenuOpen ? t("nav.close", { defaultValue: "Fermer le menu" }) : t("nav.menu", { defaultValue: "Ouvrir le menu" })}</span>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={cn(
          "md:hidden overflow-hidden border-t border-gray-200 bg-[#F5F0E6] px-4 pb-6 transition-all duration-300 dark:border-gray-700 dark:bg-[#002B5B]",
          isMenuOpen ? "max-h-96 pt-4" : "max-h-0 pt-0"
        )}
        aria-label={t("nav.ariaMobile", { defaultValue: "Navigation mobile" })}
      >
        <div className="flex flex-col space-y-4 text-[#002B5B] dark:text-gray-100">
          {navItems.map(({ to, labelKey, icon: Icon }) => (
            <PrefetchedNavLink
              key={`mobile-${to}`}
              to={to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-base font-semibold shadow-sm transition-colors duration-300 hover:border-[#B23A48]/40 dark:bg-[#003566]/60",
                  isActive ? "border-[#B23A48] text-[#002B5B] dark:border-white dark:text-white" : ""
                )
              }
            >
              <span className="flex items-center gap-3">
                <Icon className="h-5 w-5" aria-hidden="true" />
                {t(labelKey)}
              </span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </PrefetchedNavLink>
          ))}

          <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-sm dark:bg-[#003566]/60">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <Link
            to="/booking"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full bg-[#B23A48] px-5 py-2.5 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#9d3440]"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            {t("navbar.book")}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
