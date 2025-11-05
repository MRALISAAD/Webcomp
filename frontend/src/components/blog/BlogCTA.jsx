import { motion } from "framer-motion";
import Container from "../Container";

export default function BlogCTA() {
  return (
    <motion.section
      className="bg-gradient-to-r from-primary to-rose-500 py-20 text-center text-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <Container className="space-y-4">
        <h2 className="text-3xl font-bold md:text-4xl">Recevez nos guides d'installation gratuits 📘</h2>
        <p className="text-lg opacity-90">Des conseils pratiques chaque mois pour vivre une arrivée sans stress.</p>
        <form className="mx-auto flex max-w-lg flex-wrap justify-center gap-3">
          <input
            type="email"
            placeholder="Votre adresse email"
            className="w-full flex-1 rounded-full px-5 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary sm:w-auto"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-md transition hover:bg-rose-100"
          >
            S'inscrire
          </button>
        </form>
      </Container>
    </motion.section>
  );
}
