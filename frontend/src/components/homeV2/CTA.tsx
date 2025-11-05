import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import Container from "../Container";
import SectionShell from "../layout/SectionShell";

const CTA = () => {
  const { t } = useTranslation();

  return (
    <SectionShell>
      <Container>
        <div className="mx-auto max-w-3xl rounded-3xl border border-gold/20 bg-navyLight px-8 py-12 text-center text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_-20px_rgba(10,34,57,0.45)] dark:border-gold/30">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t("ctaFinal.title")}</h2>
            <p className="text-lg font-medium text-[#AAB4C2]">{t("ctaFinal.subtitle")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gold text-navy shadow-xl transition hover:-translate-y-0.5 hover:bg-gold/90 hover:shadow-2xl"
              >
                <Link to="/packs">{t("ctaFinal.primary")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-navy"
              >
                <Link to="/contact">{t("ctaFinal.secondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
};

export default CTA;
