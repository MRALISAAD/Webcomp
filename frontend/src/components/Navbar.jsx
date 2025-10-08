"use strict";

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { label: "Accueil", to: "/" },
  { label: "Services", to: "/services" },
  { label: "À propos", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((value) => !value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 text-lg font-semibold text-brand-red transition hover:text-brand-dark"
          onClick={handleClose}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-white">
            MC
          </span>
          Marhaban Canada
        </Link>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 transition hover:bg-brand-pale hover:text-brand-red lg:hidden"
          onClick={handleToggle}
          aria-expanded={open}
          aria-label="Menu"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "text-sm font-medium transition",
                  isActive ? "text-brand-red" : "text-slate-600 hover:text-brand-red",
                ].join(" ")
              }
              onClick={handleClose}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-2 px-4 py-4">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "block rounded-lg px-3 py-2 text-sm font-semibold transition",
                    isActive ? "bg-brand-pale text-brand-red" : "text-slate-700 hover:bg-brand-pale hover:text-brand-red",
                  ].join(" ")
              }
              onClick={handleClose}
            >
              {item.label}
            </NavLink>
          ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
