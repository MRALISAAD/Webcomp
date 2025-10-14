import { useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { captureUtmParams } from "../utils/utm.js";

const WHATSAPP_LINK = "https://wa.me/<MON_NUMERO>?text=Bonjour%20Marhaban%20Canada";

export default function Layout({ children }) {
  useEffect(() => {
    captureUtmParams();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-ink transition-colors duration-300 dark:bg-ink dark:text-white">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 py-16 md:px-6">
        {children}
      </main>
      <Footer />
      <a
        aria-label="Nous écrire sur WhatsApp"
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 btn btn-primary shadow-xl"
      >
        WhatsApp
      </a>
    </div>
  );
}
