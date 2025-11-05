import { useTranslation } from "react-i18next";
import { faqItems } from "../data/faq";

const FAQAccordion = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4" id="faq">
      {faqItems.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-[#D4AF37]/10 bg-white p-5 shadow-sm transition-all duration-300 ease-out hover:shadow-md dark:bg-[#112A46]"
        >
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between text-left font-semibold text-[#0A2239] transition-all duration-300 ease-out dark:text-[#EAEAEA] [&::-webkit-details-marker]:hidden">
              <span>{t(item.questionKey)}</span>
              <span className="ml-4 text-lg text-[#D4AF37] transition-transform duration-300 group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-[#AAB4C2]">
              {t(item.answerKey)}
            </p>
          </details>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
