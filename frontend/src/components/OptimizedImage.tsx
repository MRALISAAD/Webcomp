import { ImgHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

/**
 * Composant Image Optimisé
 *
 * Fonctionnalités:
 * - Lazy loading automatique
 * - Placeholder pendant le chargement
 * - Gestion d'erreur avec fallback
 * - Support responsive
 * - Accessible (alt obligatoire)
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Fallback image en cas d'erreur
  const fallbackSrc = "/images/placeholder.png";

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      {/* Skeleton placeholder pendant le chargement */}
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
          aria-hidden="true"
        />
      )}

      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        {...props}
      />

      {/* Message d'erreur pour le développement */}
      {hasError && process.env.NODE_ENV === "development" && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-100 text-xs text-red-600">
          Erreur de chargement: {src}
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
