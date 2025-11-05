import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPageView } from "../lib/analytics";

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on mount
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (gaId) {
      initGA(gaId);
    }
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      trackPageView(location.pathname);
    }
  }, [location.pathname]);

  return null;
};

export default Analytics;

