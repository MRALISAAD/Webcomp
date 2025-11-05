import { useTranslation } from "react-i18next";
import Container from "../Container";

const PartnersSection = () => {
  const { t } = useTranslation();

  // Partner logos - replace with actual logos
  const partners = [
    { name: "Stripe", logo: "/images/partners/stripe.svg" },
    { name: "Air Canada", logo: "/images/partners/aircanada.svg" },
    { name: "Hostaway", logo: "/images/partners/hostaway.svg" },
    { name: "Zoho", logo: "/images/partners/zoho.svg" },
    { name: "RBC", logo: "/images/partners/rbc.svg" },
    { name: "Telus", logo: "/images/partners/telus.svg" },
  ];

  return (
    <section className="py-16 bg-white dark:bg-zinc-900">
      <Container>
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-ink dark:text-white">
              {t("partners.heading")}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-300">
              {t("partners.subtitle")}
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center p-6 rounded-2xl bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all duration-300 hover:scale-105 opacity-70 hover:opacity-100"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PartnersSection;

