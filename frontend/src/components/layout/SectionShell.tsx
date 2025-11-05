import { forwardRef } from "react";
import { cn } from "../../lib/utils";

type SectionTone = "light" | "solid" | "transparent";

interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof HTMLElementTagNameMap;
  tone?: SectionTone;
}

const toneClasses: Record<SectionTone, string> = {
  light: "section-gradient-light dark:section-gradient-dark",
  solid: "bg-beige text-textDark transition-colors duration-300 ease-out dark:bg-navy dark:text-textLight",
  transparent: "transition-colors duration-300 ease-out"
};

const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  ({ as: Tag = "section", tone = "light", className, children, ...props }, ref) => {
    return (
      <Tag ref={ref as never} className={cn("section-shell", toneClasses[tone], className)} {...props}>
        {children}
      </Tag>
    );
  }
);

SectionShell.displayName = "SectionShell";

export default SectionShell;
