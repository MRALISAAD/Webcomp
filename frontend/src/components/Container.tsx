import { cn } from "../lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Container = ({ className, ...props }: ContainerProps) => {
  return <div className={cn("container-responsive", className)} {...props} />;
};

export default Container;
