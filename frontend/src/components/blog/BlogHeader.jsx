import { motion } from "framer-motion";
import Container from "../Container";

export default function BlogHeader() {
  return (
    <motion.section
      className="bg-white py-20 text-center font-poppins dark:bg-slate-900 md:py-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <Container className="mx-auto max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Insights 2025</p>
        <h1 className="text-4xl font-bold text-primary dark:text-rose-200">Le Blog Marhaban Canada</h1>
        <p className="text-lg leading-relaxed text-grayText dark:text-slate-300">
          Des conseils, des témoignages et des ressources pratiques pour une arrivée réussie au Canada.
        </p>
      </Container>
    </motion.section>
  );
}
