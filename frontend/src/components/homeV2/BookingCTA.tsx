import { useTranslation } from "react-i18next";
import Container from "../Container";
import SectionHeading from "../layout/SectionHeading";
import SectionShell from "../layout/SectionShell";
import { Button } from "../ui/button";

interface BookingCTAProps {
  onReserve?: () => void;
}

const BookingCTA = ({ onReserve }: BookingCTAProps) => {
  const { t } = useTranslation();

  return (
    <SectionShell>
      <Container className="mx-auto max-w-3xl text-center">
        <SectionHeading title={t("home.booking.title")} subtitle={t("home.booking.subtitle")} />
        {onReserve ? (
          <Button
            type="button"
            size="lg"
            onClick={onReserve}
            className="mt-8 rounded-full bg-[#b2452f] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#8e3826] hover:shadow-xl"
          >
            {t("home.booking.cta")}
          </Button>
        ) : (
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-full bg-[#b2452f] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#8e3826] hover:shadow-xl"
          >
            <a href="/packs">{t("home.booking.cta")}</a>
          </Button>
        )}
      </Container>
    </SectionShell>
  );
};

export default BookingCTA;
