import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const question = item.question ?? item.q;
        const answer = item.answer ?? item.a;
        const panelId = `accordion-panel-${index}`;
        const buttonId = `accordion-button-${index}`;
        return (
          <div key={question} className="overflow-hidden rounded-xl border border-secondary/40">
            <button
              id={buttonId}
              aria-controls={panelId}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between bg-beige p-4 text-left font-semibold text-textMain hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-expanded={openIndex === index}
            >
              {question}
              <ChevronDown
                className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="bg-white p-4 text-textSecondary dark:bg-zinc-900 dark:text-zinc-300"
                >
                  {answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
