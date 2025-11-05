import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "../../lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({ className, ...props }: AccordionPrimitive.AccordionItemProps) => (
  <AccordionPrimitive.Item
    className={cn("overflow-hidden rounded-2xl border border-gold/20 dark:border-gold/20", className)}
    {...props}
  />
);

AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = ({ className, children, ...props }: AccordionPrimitive.AccordionTriggerProps) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        "flex flex-1 items-center justify-between gap-4 bg-white px-5 py-4 text-left text-base font-semibold text-textDark transition hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-navyLight dark:text-textLight",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-5 w-5 shrink-0 transition-transform data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = ({ className, children, ...props }: AccordionPrimitive.AccordionContentProps) => (
  <AccordionPrimitive.Content
    className={cn(
      "bg-white px-5 pb-5 text-sm leading-relaxed text-mutedLight data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down dark:bg-navyLight dark:text-mutedDark",
      className
    )}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
