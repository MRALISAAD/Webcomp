import { motion } from "framer-motion";
import { HandshakeIcon, BriefcaseIcon, GlobeIcon, ShieldCheckIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import Container from "../Container";
import Card from "../layout/Card";
import SectionHeading from "../layout/SectionHeading";
import SectionShell from "../layout/SectionShell";
import { marhabanImages } from "../../lib/media";

const WhyChoose = () => {
  const { t } = useTranslation();

  const items = [
    { Icon: HandshakeIcon, title: t("features.items.0.title"), text: t("features.items.0.description") },
    { Icon: BriefcaseIcon, title: t("features.items.1.title"), text: t("features.items.1.description") },
    { Icon: GlobeIcon, title: t("features.items.2.title"), text: t("features.items.2.description") },
    { Icon: ShieldCheckIcon, title: t("features.items.3.title"), text: t("features.items.3.description") }
  ];

  return (
    <SectionShell>
      <Container>
        <SectionHeading title={t("features.title")} />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, idx) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Card interactive>
                <div className="mb-4 inline-flex rounded-xl bg-gold/15 p-3 text-gold">
                  <it.Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mutedLight dark:text-mutedDark">{it.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <Card className="flex flex-col gap-8 lg:flex-row lg:items-center" interactive padding="lg">
            <img
              src={marhabanImages.family}
              alt={t("home.alt.family")}
              loading="lazy"
              className="h-72 w-full rounded-2xl object-cover shadow-md opacity-95 dark:opacity-90 lg:h-64 lg:w-1/2"
            />
            <div className="space-y-4 lg:w-1/2">
              <h3 className="text-2xl font-semibold">{t("home.family.title")}</h3>
              <p className="text-mutedLight dark:text-mutedDark">{t("home.family.subtitle")}</p>
            </div>
          </Card>
        </motion.div>
      </Container>
    </SectionShell>
  );
};

export default WhyChoose;
