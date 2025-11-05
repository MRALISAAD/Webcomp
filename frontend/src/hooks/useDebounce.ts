import { useEffect, useState } from "react";

/**
 * Hook personnalisé pour débouncer une valeur
 *
 * Utile pour:
 * - Recherche en temps réel
 * - Validation de formulaire
 * - Appels API
 *
 * @param value - La valeur à débouncer
 * @param delay - Le délai en millisecondes (défaut: 500ms)
 * @returns La valeur débouncée
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearch = useDebounce(searchTerm, 500);
 *
 * useEffect(() => {
 *   if (debouncedSearch) {
 *     // Faire l'appel API ici
 *   }
 * }, [debouncedSearch]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Créer un timer qui met à jour la valeur après le délai
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Nettoyer le timer si la valeur change avant la fin du délai
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
