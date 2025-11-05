import { useTranslation } from "react-i18next";
import PrefetchLink from "./PrefetchLink.jsx";

export default function CTASection() {
  const { t } = useTranslation();
  const data = t("home.cta", { returnObjects: true });

  return (
    <section className="bg-primary py-16 text-center text-white">
      <h2 className="mb-4 text-3xl font-poppins font-semibold">{data.title}</h2>
      <div className="flex flex-col justify-center gap-4 md:flex-row">
        <PrefetchLink
          to="/booking"
          className="rounded-2xl bg-white px-8 py-3 font-semibold text-primary shadow-md transition hover:scale-105"
        >
          {data.primary}
        </PrefetchLink>
        <a
          href={`https://wa.me/${import.meta.env.VITE_WHATSAPP}`}
          className="rounded-2xl bg-secondary px-8 py-3 font-semibold text-primary shadow-md transition hover:-translate-y-0.5 hover:scale-105 hover:bg-secondaryDark"
          target="_blank"
          rel="noreferrer"
        >
          {data.secondary}
        </a>
      </div>
    </section>
  );
}
