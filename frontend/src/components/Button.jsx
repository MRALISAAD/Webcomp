import clsx from "clsx";
import PrefetchLink from "./PrefetchLink.jsx";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primaryLight focus-visible:ring-primary/40",
  outline:
    "border border-secondary text-secondary hover:bg-secondary hover:text-primary focus-visible:ring-secondary/40",
  ghost:
    "bg-transparent text-secondary hover:bg-secondary/10 focus-visible:ring-secondary/40",
  success:
    "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500/40",
  danger:
    "bg-primary text-white hover:bg-primaryLight focus-visible:ring-primary/40",
};

export default function Button({
  as = "button",
  to,
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-beige dark:focus-visible:ring-offset-slate-900";
  const styles = variants[variant] || variants.primary;
  const classes = clsx(base, styles, disabled && "opacity-60 cursor-not-allowed", className);

  if ((as === "a" || href) && href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  if ((as === "link" || to) && to) {
    return (
      <PrefetchLink to={to} className={classes} {...props}>
        {children}
      </PrefetchLink>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

export const PrimaryButton = ({ label, className = "", ...props }) => (
  <button
    className={clsx(
      "bg-marhaban-gold text-marhaban-blue font-semibold py-3 px-6 rounded-xl hover:bg-[#E8B930] transition",
      className
    )}
    {...props}
  >
    {label}
  </button>
);

export const SecondaryButton = ({ label, className = "", ...props }) => (
  <button
    className={clsx(
      "border border-marhaban-gold text-marhaban-blue py-3 px-6 rounded-xl hover:bg-marhaban-gold hover:text-white transition",
      className
    )}
    {...props}
  >
    {label}
  </button>
);
