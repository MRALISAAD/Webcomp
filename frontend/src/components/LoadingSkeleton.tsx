import { cn } from "../lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "text" | "card" | "circle" | "button";
  lines?: number;
  width?: string;
  height?: string;
}

const LoadingSkeleton = ({ 
  className, 
  variant = "text", 
  lines = 3,
  width,
  height 
}: LoadingSkeletonProps) => {
  const baseClasses = "animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded";
  
  if (variant === "circle") {
    return (
      <div 
        className={cn(baseClasses, className)} 
        style={{ width: width || "40px", height: height || "40px" }}
      />
    );
  }

  if (variant === "button") {
    return (
      <div 
        className={cn(baseClasses, "h-10 w-full max-w-[200px]", className)} 
      />
    );
  }

  if (variant === "card") {
    return (
      <div className={cn("space-y-3", className)}>
        <div className={cn(baseClasses, "h-6 w-3/4")} />
        <div className={cn(baseClasses, "h-4 w-full")} />
        <div className={cn(baseClasses, "h-4 w-5/6")} />
        <div className={cn(baseClasses, "h-4 w-4/6")} />
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(baseClasses, "h-4", i === lines - 1 ? "w-3/4" : "w-full")}
          style={i === lines - 1 && width ? { width } : undefined}
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;

