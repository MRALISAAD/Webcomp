import { useTranslation } from "react-i18next";

const partners = [
  { src: "/images/partners/maple.svg", alt: "Partenaire Maple" },
  { src: "/images/partners/skylink.svg", alt: "Partenaire Skylink" },
  { src: "/images/partners/northcare.svg", alt: "Partenaire Northcare" }
];

const TrustBar = () => {
  const { t } = useTranslation();

  return (
    <section className="mt-10 rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
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
