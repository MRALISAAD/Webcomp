import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { faqItems } from "../../data/faq";

const FAQ = () => {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => () => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-lightGray dark:bg-zinc-900 dark:ring-zinc-800">
      {faqItems.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="group">
            <button
              type="button"
              onClick={toggle(item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-all duration-200 hover:bg-beige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:hover:bg-gray-800"
            >
              <span className="text-base font-medium text-textMain dark:text-textLight">
                {t(item.questionKey)}
              </span>
              <ChevronDown
                className={`h-5 w-5 text-primary transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                aria-hidden="true"
              />
            </button>
            <div className="border-b border-gray-300/60 dark:border-zinc-800" />
            {isOpen && (
              <div className="px-4 pb-4 pt-2 text-sm text-textSecondary dark:text-zinc-300">
                {t(item.answerKey)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;


