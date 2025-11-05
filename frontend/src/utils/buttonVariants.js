const buttonVariants = {
  primary:
    "rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primaryLight",
  outlineRed:
    "rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white",
  green:
    "rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-primary shadow-lg transition hover:bg-secondaryDark",
  outlineGreen:
    "rounded-full border border-secondary px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-secondary hover:text-primary",
  ghost:
    "rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-grayText transition hover:bg-white/10 dark:text-slate-200",
};

export function getButtonClasses(variant = "primary") {
  return buttonVariants[variant] || buttonVariants.primary;
}

export default buttonVariants;
