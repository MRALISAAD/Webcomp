export const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const base = prefersReduced ? { duration: 0.001, ease: "linear" } : { duration: 0.35, ease: "easeOut" };

export const sectionVariants = {
  hidden: { opacity: 0, y: prefersReduced ? 0 : 16 },
  visible: { opacity: 1, y: 0, transition: base },
};

export const staggerChildren = {
  hidden: { opacity: 0, y: prefersReduced ? 0 : 12 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...base, delay: prefersReduced ? 0 : index * 0.06 },
  }),
};
