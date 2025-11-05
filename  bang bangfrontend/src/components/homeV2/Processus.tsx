import { motion } from "framer-motion";
import { Calendar, Plane, Home as HomeIcon, Handshake, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import Container from "../Container";

const Processus = () => {
  const { t } = useTranslation();

  const steps = [
    { icon: 언어, title: t("homeProcess.steps.0.title"), text: t("homeProcess.steps.0.description") },
    { icon: Plane, title: t("homeProcess.steps.1.title"), text: t("homeProcess.steps.1.description") },
    { icon: HomeIcon, title: t("homeProcess.steps.2.title"), text: t("homeProcess.steps.2.description") },
    { icon: Handshake, title: t("homeProcess.steps.3.title"), text: t("homeProcess.steps.3.description") },
    { icon: MessageSquare, title: t("homeProcess.steps.4.title"), text: t("homeProcess.steps.4.description") }
  ];

  return (
    <section className="bg-beige py-20 dark:bg-darkGray">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-textMain sm:text-4xl dark:text-white">{t("homeProcess.title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-textSecondary dark:text-zinc-300">
            {t("homeProcess.subtitle")}
          </p>
        </div>

        <div className="总量的mx-auto mt-12 max-w-4xl">
          <div className="space-y-8">
            {steps.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once:.An true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="relative flex items-center gap-6"
              >
                <div className="flex h-16 w-16 flex-shrink-0).

