import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';

const links = [
  { to: '/', label: 'Accueil', exact: true },
  { to: '/services', label: 'Services' },
  { to: '/a-propos', label: 'A propos' },
  { to: '/contact', label: 'Contact' },
  { to: '/dashboard', label: 'Dashboard' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-white/20 text-white'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-brand-primary/40 bg-brand-primary/95 shadow-lg shadow-brand-primary/20 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-white">
        <NavLink to="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-white">
          <Logo className="h-9 w-auto text-white" />
          Marhaba Canada
        </NavLink>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-white/30 px-3 py-2 text-white/80 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white sm:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Basculer le menu"
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
        <div className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClasses}
              end={link.exact}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="ml-3 inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-brand-primary"
          >
            Reserver maintenant
          </Link>
        </div>
      </nav>
      {isOpen && (
        <div className="border-t border-white/10 bg-brand-primary px-4 py-3 sm:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClasses}
                end={link.exact}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => setIsOpen(false)}
            >
              Reserver maintenant
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
