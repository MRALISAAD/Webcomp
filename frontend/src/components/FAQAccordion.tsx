import { useTranslation } from "react-i18next";
import { faqItems } from "../data/faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const FAQAccordion = () => {
  const { t } = useTranslation();

  return (
    <section className="space-y-6" id="faq">
      <div className="max-w-2xl space-y-2">
        <h2 className="text-3xl font-semibold text-ink dark:text-white">{t("faq.title")}</h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">{t("faq.intro")}</p>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqItems.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{t(item.questionKey)}</AccordionTrigger>
            <AccordionContent>{t(item.answerKey)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQAccordion;
