import { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
}

/**
 * Composant Image avec Lazy Loading Natif
 *
 * Charge l'image uniquement quand elle devient visible à l'écran
 *
 * Fonctionnalités:
 * - Lazy loading avec Intersection Observer
 * - Placeholder pendant le chargement
 * - Fade-in animation
 * - SEO friendly (indexable par Google)
 *
 * @example
 * ```tsx
 * <LazyImage
 *   src="/images/hero.jpg"
 *   alt="Hero image"
 *   className="w-full h-auto"
 * />
 * ```
 */
const LazyImage = ({
  src,
  alt,
  placeholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3C/svg%3E",
  className,
  ...props
}: LazyImageProps) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLImageElement>({
    threshold: 0.01,
    rootMargin: "50px",
    freezeOnceVisible: true,
  });

  return (
    <img
      ref={ref}
      src={isVisible ? src : placeholderSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn(
        "transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
      {...props}
    />
  );
};

export default LazyImage;
