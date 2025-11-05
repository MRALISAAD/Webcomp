import { cva, type VariantProps } from "class-variance-authority";
import { ElementType, forwardRef } from "react";
import { cn } from "../../lib/utils";

const cardVariants = cva(
  "rounded-3xl border border-gold/20 bg-white/95 text-textDark shadow-md transition-colors duration-300 ease-out dark:border-gold/20 dark:bg-navyLight/85 dark:text-textLight",
  {
    variants: {
      interactive: {
        true: "transition-transform hover:-translate-y-1 hover:shadow-2xl",
        false: ""
      },
      tone: {
        default: "",
        subtle: "bg-white/80 dark:bg-navyLight/70",
        translucent: "bg-white/70 backdrop-blur dark:bg-navyLight/60"
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8"
      }
    },
    defaultVariants: {
      interactive: false,
      tone: "default",
      padding: "md"
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof cardVariants> {
  as?: ElementType;
}

const Card = forwardRef<HTMLElement, CardProps>(
  ({ className, interactive, tone, padding, children, as: Component = "div", ...props }, ref) => (
    <Component
      ref={ref as never}
      className={cn(cardVariants({ interactive, tone, padding, className }))}
      {...props}
    >
      {children}
    </Component>
  )
);

Card.displayName = "Card";

export default Card;
