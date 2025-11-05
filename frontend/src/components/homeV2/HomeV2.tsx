import { useState } from "react";
import Hero from "./Hero";
import WhyChoose from "./WhyChoose";
import Packs from "./Packs";
import Comparison from "./Comparison";
import BookingCTA from "./BookingCTA";
import LeadFormSection from "./LeadFormSection";
import Processus from "./Processus";
import Testimonials from "./Testimonials";
import Guides from "./Guides";
import CTA from "./CTA";
import TechSection from "./TechSection";
import FAQ from "./FAQ";
import WelcomeMontreal from "./WelcomeMontreal";
import BookingPopup from "../BookingPopup";

type PackSlug = "essential" | "comfort" | "premium";

// Mapping des slugs vers les noms français
const packNameMap: Record<PackSlug, string> = {
  essential: "Essentiel",
  comfort: "Confort",
  premium: "Premium",
};

const HomeV2 = () => {
  const [open, setOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState("Essentiel");

  const handleOpen = (pack: PackSlug = "essential") => {
    setSelectedPack(packNameMap[pack]);
    setOpen(true);
  };

  return (
    <>
      <Hero />
      <WelcomeMontreal />
      <WhyChoose />
      <Packs onReserve={handleOpen} />
      <Comparison />
      <BookingCTA onReserve={() => handleOpen("essential")} />
      <LeadFormSection />
      <Processus />
      <Testimonials />
      <Guides />
      <CTA />
      <TechSection />
      <FAQ />
      <BookingPopup
        open={open}
        setOpen={setOpen}
        selectedPack={selectedPack}
        setSelectedPack={setSelectedPack}
      />
    </>
  );
};

export default HomeV2;


