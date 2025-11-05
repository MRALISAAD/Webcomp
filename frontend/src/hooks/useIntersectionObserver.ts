import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

/**
 * Hook personnalisé pour détecter quand un élément est visible à l'écran
 *
 * Utile pour:
 * - Lazy loading d'images
 * - Animations au scroll
 * - Analytics (temps de visibilité)
 * - Infinite scroll
 *
 * @param options - Options de l'Intersection Observer
 * @returns [ref, isIntersecting, entry] - Référence à attacher, état de visibilité, entrée complète
 *
 * @example
 * ```tsx
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
 *
 * return (
 *   <div ref={ref} className={isVisible ? "animate-fade-in" : ""}>
 *     Content
 *   </div>
 * );
 * ```
 */
export function useIntersectionObserver<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<T>, boolean, IntersectionObserverEntry | undefined] {
  const {
    threshold = 0,
    root = null,
    rootMargin = "0px",
    freezeOnceVisible = false,
  } = options;

  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Si déjà visible et freezeOnceVisible activé, ne rien faire
    if (freezeOnceVisible && isIntersecting) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, isIntersecting]);

  return [ref, isIntersecting, entry];
}
