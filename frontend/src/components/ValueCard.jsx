import { motion } from "framer-motion";

export default function ValueCard({ icon: Icon, title, text }) {
  return (
    <motion.div
      className="rounded-2xl border border-secondary bg-beige p-6 text-center shadow-sm"
      whileHover={{ scale: 1.03 }}
    >
      <Icon className="mx-auto mb-3 h-10 w-10 text-secondary" />
      <h3 className="text-xl font-semibold text-secondary">{title}</h3>
      <p className="mt-2 text-grayText">{text}</p>
    </motion.div>
  );
}
