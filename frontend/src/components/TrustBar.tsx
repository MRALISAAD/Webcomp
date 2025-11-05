import { useTranslation } from "react-i18next";

const partners = [
  { src: "/images/partners/maple.svg", alt: "Partenaire Maple" },
  { src: "/images/partners/skylink.svg", alt: "Partenaire Skylink" },
  { src: "/images/partners/northcare.svg", alt: "Partenaire Northcare" }
];

const TrustBar = () => {
  const { t } = useTranslation();

  return (
    <section className="mt-10 rounded-3xl border border-gold/20 bg-white/90 p-6 shadow-sm transition-colors duration-300 dark:border-gold/20 dark:bg-navyLight/80">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-mutedLight dark:text-mutedDark">
        {t("trust.title")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {partners.map((partner) => (
          <img
            key={partner.src}
            src={partner.src}
            alt={partner.alt}
            loading="lazy"
            className="h-12 w-auto object-contain"
          />
        ))}
      </div>
    </section>
  );
};

export default TrustBar;
