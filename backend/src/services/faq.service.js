import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const faqData = JSON.parse(readFileSync(join(__dirname, "../data/faq.json"), "utf-8"));

export function listFaq(lang = "fr") {
  const normalizedLang = lang.startsWith("en") ? "en" : "fr";

  const items = faqData
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((entry) => {
      const translation = entry[normalizedLang] || entry.fr;
      return {
        id: entry.id,
        category: entry.category,
        question: translation.question,
        answer: translation.answer,
      };
    });

  const categories = Array.from(new Set(items.map((item) => item.category)));

  return { items, categories };
}
