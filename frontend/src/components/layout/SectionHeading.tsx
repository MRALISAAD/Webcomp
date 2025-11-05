import { cn } from "../../lib/utils";

type SectionHeadingAlign = "left" | "center";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: SectionHeadingAlign;
  size?: "default" | "large";
}

const alignmentClasses: Record<SectionHeadingAlign, string> = {
  center: "text-center",
  left: "text-left md:text-left"
};

const titleSizes: Record<NonNullable<SectionHeadingProps["size"]>, string> = {
  default: "text-3xl sm:text-4xl",
  large: "text-4xl sm:text-5xl"
};

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  size = "default",
  className,
  ...props
}: SectionHeadingProps) => {
  return (
    <div className={cn("mx-auto max-w-3xl", alignmentClasses[align], className)} {...props}>
      {eyebrow && (
        <span className="inline-flex items-center justify-center rounded-full bg-gold/15 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className={cn("mt-4 font-bold text-textDark dark:text-textLight", titleSizes[size])}>{title}</h2>
      {subtitle && (
        <p className="mt-3 text-lg text-mutedLight dark:text-mutedDark">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;
