import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-gold/30 bg-white/95 px-4 py-3 text-sm text-navy shadow-sm transition-all duration-300 placeholder:text-mutedLight focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-beige disabled:cursor-not-allowed disabled:bg-white/70 dark:border-gold/30 dark:bg-navyLight/80 dark:text-textLight dark:placeholder:text-mutedDark dark:focus-visible:border-gold dark:focus-visible:ring-offset-navy",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
