import { listFaq } from "../services/faq.service.js";
import { fetchFaqFromZoho } from "../utils/zoho.js";
import { logger } from "../utils/logger.js";
import { buildFaqSchema } from "../utils/seoSchema.js";

async function fetchFromZoho(lang) {
  try {
    const remote = await fetchFaqFromZoho();
    if (!remote || !remote.length) return null;
    return remote.map((record) => ({
      id: record.id,
      category: record.Category || "general",
      question: lang === "en" ? record.Question_en || record.Question : record.Question,
      answer: lang === "en" ? record.Answer_en || record.Answer : record.Answer,
    }));
  } catch (error) {
    logger.warn(`faq.zoho.fetch.failed message=${error.message}`);
    return null;
  }
}

export const getFaq = async (req, res) => {
  const { lang = "fr" } = req.query;
  const normalizedLang = lang.startsWith("en") ? "en" : "fr";
  const remote = await fetchFromZoho(normalizedLang);

  if (remote) {
    const categories = Array.from(new Set(remote.map((item) => item.category)));
    return res.json({
      ok: true,
      items: remote,
      categories,
      schema: buildFaqSchema(remote, normalizedLang),
    });
  }

  const data = listFaq(normalizedLang);
  res.json({
    ok: true,
    ...data,
    schema: buildFaqSchema(data.items, normalizedLang),
  });
};
