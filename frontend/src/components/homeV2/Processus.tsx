import { motion } from "framer-motion";
import { Calendar, Plane, Home as HomeIcon, Handshake, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import Container from "../Container";
import Card from "../layout/Card";
import SectionHeading from "../layout/SectionHeading";
import SectionShell from "../layout/SectionShell";

const Processus = () => {
  const { t } = useTranslation();

  const steps = [
    { icon: Calendar, title: t("homeProcess.steps.0.title"), text: t("homeProcess.steps.0.description") },
    { icon: Plane, title: t("homeProcess.steps.1.title"), text: t("homeProcess.steps.1.description") },
    { icon: HomeIcon, title: t("homeProcess.steps.2.title"), text: t("homeProcess.steps.2.description") },
    { icon: Handshake, title: t("homeProcess.steps.3.title"), text: t("homeProcess.steps.3.description") },
    { icon: MessageSquare, title: t("homeProcess.steps.4.title"), text: t("homeProcess.steps.4.description") }
  ];

  return (
    <SectionShell>
      <Container>
        <SectionHeading title={t("homeProcess.title")} subtitle={t("homeProcess.subtitle")} />

        <div className="relative mx-auto mt-12 max-w-4xl">
          <div
            className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 bg-gradient-to-b from-gold via-gold/60 to-transparent md:block"
            aria-hidden="true"
          />
          <div className="space-y-8">
            {steps.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="relative flex items-center gap-6"
              >
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gold text-navy shadow-lg ring-4 ring-white dark:ring-navy">
                  <s.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <Card className="flex-1" interactive>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-mutedLight dark:text-mutedDark">{s.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </SectionShell>
  );
};

export default Processus;
