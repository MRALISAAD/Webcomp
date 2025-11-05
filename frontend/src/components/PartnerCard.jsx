import { motion } from "framer-motion";

export default function PartnerCard({ logo, name, description, link }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center rounded-2xl border border-secondary bg-beige p-6 text-center shadow-sm transition hover:shadow-md"
      whileHover={{ scale: 1.05 }}
    >
      {logo && <img src={logo} alt={name} loading="lazy" className="mb-3 h-20 w-20 object-contain" />}
      <h3 className="mb-2 text-lg font-semibold text-secondary">{name}</h3>
      <p className="text-sm text-grayText">{description}</p>
    </motion.a>
  );
}
