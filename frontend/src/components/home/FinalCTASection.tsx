import { ArrowRightIcon, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../Container";
import { Button } from "../ui/button";

const FinalCTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-r from-primary via-red-600 to-secondary text-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {t("ctaFinal.title")}
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-white/90">
            {t("ctaFinal.subtitle")}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 shadow-lg"
            >
              <Link to="/packs">
                {t("ctaFinal.primary")}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/80 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER ?? ""}`} target="_blank" rel="noopener noreferrer">
                <MessageCircleIcon className="mr-2 h-5 w-5" />
                {t("ctaFinal.secondary")}
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FinalCTASection;

