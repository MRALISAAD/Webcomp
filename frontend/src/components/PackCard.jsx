import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PackCard({
  name,
  price,
  description,
  features,
  highlight,
  onSelect,
  value,
  primaryLabel,
  secondaryLabel,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`flex h-full flex-col rounded-3xl border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl ${
        highlight
          ? "border-gold bg-white/95 shadow-xl dark:bg-navyLight/90"
          : "border-gold/20 bg-white/90 shadow-lg dark:border-gold/20 dark:bg-navyLight/70"
      }`}
    >
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-center text-2xl font-bold text-primary dark:text-gold">{name}</h3>
        <p className="mt-2 text-center text-xl font-semibold text-textDark dark:text-textLight">{price}</p>
        {description && (
          <p className="mt-3 text-center text-sm text-mutedLight dark:text-mutedDark">{description}</p>
        )}
        <ul className="mt-4 space-y-2 text-sm text-textDark/80 dark:text-textLight/80">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" aria-hidden="true" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3 p-6 pt-0">
        <button
          onClick={() => onSelect(value ?? name.toLowerCase())}
          className="rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-primaryDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-beige dark:focus-visible:ring-offset-navy"
        >
          {primaryLabel}
        </button>
        <a
          href={`https://wa.me/${import.meta.env.VITE_WHATSAPP}`}
          className="rounded-xl bg-gold py-3 text-center text-sm font-semibold text-navy shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-beige dark:focus-visible:ring-offset-navy"
        >
          {secondaryLabel}
        </a>
      </div>
    </motion.div>
  );
}
