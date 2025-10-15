import { cn } from "../lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof HTMLElementTagNameMap;
}

const Section = ({ as: Tag = "section", className, ...props }: SectionProps) => {
  return <Tag className={cn("space-y-6", className)} {...props} />;
};

export default Section;
