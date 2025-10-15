import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "../WhatsAppFloat";
import CookieBanner from "../CookieBanner";
import { useUTM } from "../../hooks/useUTM";
import Toaster from "../ui/toaster";
import { cn } from "../../lib/utils";
import Container from "../Container";

const Layout = () => {
  useUTM();

  return (
    <div className={cn("min-h-screen bg-background text-ink dark:bg-zinc-950 dark:text-zinc-50")}>
      <Navbar />
      <main className="flex-1 py-12 md:py-16">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
      <Toaster />
    </div>
  );
};

export default Layout;
