import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import WhatsAppFloat from "../WhatsAppFloat";
import CookieBanner from "../CookieBanner";
import { useUTM } from "../../hooks/useUTM";
import Toaster from "../ui/toaster";
import { cn } from "../../lib/utils";

const Layout = () => {
  useUTM();

  return (
    <div
      className={cn(
        "min-h-screen bg-marhaban-beige text-marhaban-blue transition-colors duration-300 ease-out dark:bg-marhaban-blue dark:text-marhaban-gold"
      )}
    >
      <Navbar />
      <main className="flex-1 pt-24 pb-16 md:pb-20">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
      <Toaster />
    </div>
  );
};

export default Layout;
