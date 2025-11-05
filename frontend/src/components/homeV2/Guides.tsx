import { motion } from "framer-motion";
import { FileText, Home as HomeIcon, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import Container from "../Container";
import Card from "../layout/Card";
import SectionHeading from "../layout/SectionHeading";
import SectionShell from "../layout/SectionShell";
import { marhabanImages } from "../../lib/media";

const Guides = () => {
  const { t } = useTranslation();

  const cards = [
    {
      icon: FileText,
      title: t("homeGuides.items.0.title"),
      image: marhabanImages.passport,
      alt: "Main tenant un passeport canadien / Hand holding a Canadian passport"
    },
    {
      icon: HomeIcon,
      title: t("homeGuides.items.1.title"),
      image: marhabanImages.housing,
      alt: "Appartement moderne lumineux / Modern bright apartment"
    },
    {
      icon: GraduationCap,
      title: t("homeGuides.items.2.title"),
      image: marhabanImages.family,
      alt: "Famille avec valises souriante / Happy family with suitcases"
    }
  ];

  return (
    <SectionShell>
      <Container>
        <SectionHeading title={t("homeGuides.title")} subtitle={t("homeGuides.subtitle")} />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
            >
              <Card interactive>
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="lazy"
                  className="mb-4 h-40 w-full rounded-2xl object-cover shadow-md dark:opacity-90"
                />
                <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">
                  <card.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{t("homeGuides.badge", "Guide premium")}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild size="lg">
            <Link to="/blog">{t("homeGuides.cta")}</Link>
          </Button>
        </div>
      </Container>
    </SectionShell>
  );
};

export default Guides;
