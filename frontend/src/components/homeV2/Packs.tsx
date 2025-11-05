import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import Container from "../Container";
import Card from "../layout/Card";
import SectionHeading from "../layout/SectionHeading";
import SectionShell from "../layout/SectionShell";
import { marhabanImages } from "../../lib/media";

const packImages = [marhabanImages.passport, marhabanImages.housing, marhabanImages.family];

const PACK_SLUGS = ["essential", "comfort", "premium"] as const;
type PackSlug = (typeof PACK_SLUGS)[number];

interface PacksProps {
  onReserve?: (pack: PackSlug) => void;
}

const Packs = ({ onReserve }: PacksProps) => {
  const { t } = useTranslation();
  const cards = t("home.packs.cards", { returnObjects: true }) as Array<{
    name: string;
    price: string;
    badge?: string;
    description: string;
    cta?: string;
  }>;

  return (
    <SectionShell>
      <Container>
        <SectionHeading title={t("home.packs.title")} subtitle={t("home.packs.subtitle")} />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="relative h-full" interactive>
                {card.badge && (
                  <span className="absolute -top-4 right-6 inline-flex items-center rounded-full bg-gold px-4 py-1 text-xs font-semibold uppercase tracking-wide text-navy shadow-lg">
                    {card.badge}
                  </span>
                )}
                <img
                  src={packImages[index]}
                  alt={card.name}
                  loading="lazy"
                  className="h-48 w-full rounded-2xl object-cover shadow-md opacity-95 dark:opacity-90"
                />
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{card.name}</h3>
                    <span className="text-2xl font-bold text-gold">{card.price}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-mutedLight dark:text-mutedDark">{card.description}</p>
                  {onReserve ? (
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => onReserve(PACK_SLUGS[index] ?? "essential")}
                    >
                      {card.cta ?? t("cta.discoverPacks")}
                    </Button>
                  ) : (
                    <Button asChild className="w-full">
                      <Link to="/packs">{card.cta ?? t("cta.discoverPacks")}</Link>
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button asChild size="lg" variant="outline" className="border-2">
            <Link to="/packs">{t("home.packs.cta")}</Link>
          </Button>
        </div>
      </Container>
    </SectionShell>
  );
};

export default Packs;
