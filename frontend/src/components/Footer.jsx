"use strict";

const socials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/14385550000",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a9.94 9.94 0 00-9.94 9.94 9.85 9.85 0 001.34 4.95L2 22l5.28-1.38a10 10 0 004.72 1.2h.01A9.94 9.94 0 0012 2zm0 18.09a8.1 8.1 0 01-4.14-1.15l-.3-.18-3.13.82.84-3.05-.2-.32a8.1 8.1 0 118.93 3.88z" />
        <path d="M17.09 13.56c-.22-.11-1.3-.64-1.5-.71s-.35-.11-.5.11-.57.71-.69.86-.25.16-.47.05a6.56 6.56 0 01-1.92-1.18 7.11 7.11 0 01-1.31-1.62c-.14-.24 0-.37.1-.5s.22-.26.33-.4a1.71 1.71 0 00.22-.36.45.45 0 000-.42c-.06-.11-.47-1.13-.64-1.55s-.34-.37-.47-.38h-.4a.76.76 0 00-.55.26 2.3 2.3 0 00-.72 1.71 4 4 0 00.83 2.11 9.08 9.08 0 003.42 3 11.13 11.13 0 001.1.4 2.66 2.66 0 001.22.08c.37-.06 1.3-.53 1.48-1s.18-.92.13-1a.85.85 0 00-.31-.25z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/marhabancanada",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 10-11.56 9.88v-7h-2.1V12h2.1V9.8c0-2.07 1.23-3.22 3.11-3.22.9 0 1.84.16 1.84.16v2h-1.04c-1 0-1.32.62-1.32 1.26V12h2.25l-.36 2.88h-1.89v7A10 10 0 0022 12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/marhabancanada",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm10 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
      </svg>
    ),
  },
];

function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-lg font-semibold text-white">Marhaban Canada</p>
          <p className="mt-2 max-w-md text-sm text-slate-400">
            Accompagnement complet pour les nouveaux arrivants : immigration, logement, carrière et intégration culturelle.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-brand-red"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Marhaban Canada. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
