import { useEffect, useState } from "react";

/**
 * Hook personnalisé pour détecter les media queries
 *
 * Utile pour:
 * - Responsive design
 * - Comportements spécifiques mobile/desktop
 * - Dark mode
 *
 * @param query - La media query CSS
 * @returns boolean - true si la media query correspond
 *
 * @example
 * ```tsx
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const isDark = useMediaQuery("(prefers-color-scheme: dark)");
 *
 * return (
 *   <div>
 *     {isMobile ? <MobileMenu /> : <DesktopMenu />}
 *   </div>
 * );
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Fonction de callback pour les changements
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Écouter les changements
    mediaQuery.addEventListener("change", handleChange);

    // Mettre à jour l'état initial
    setMatches(mediaQuery.matches);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Hooks pré-configurés pour les breakpoints courants
 */
export const useIsMobile = () => useMediaQuery("(max-width: 768px)");
export const useIsTablet = () => useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1025px)");
export const useIsDarkMode = () => useMediaQuery("(prefers-color-scheme: dark)");
export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
