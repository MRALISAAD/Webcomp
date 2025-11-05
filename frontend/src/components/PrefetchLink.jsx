import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export const preloadMap = {
  "/": () => import("../pages/Home"),
  "/about": () => import("../pages/About"),
  "/packs": () => import("../pages/Packs"),
  "/processus": () => import("../pages/Processus"),
  "/process": () => import("../pages/Processus"),
  "/partners": () => import("../pages/Partners"),
  "/faq": () => import("../pages/FAQ"),
  "/blog": () => import("../pages/Blog"),
  "/contact": () => import("../pages/Contact"),
  "/testimonials": () => import("../pages/Testimonials"),
  "/legal": () => import("../pages/Legal"),
  "/booking": () => import("../pages/Booking"),
  "/blog/:slug": () => import("../pages/BlogPost"),
};

export const warmRoute = (key) => {
  const load = preloadMap[key];
  if (load) load();
};

export const usePrefetchRoute = (target) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !preloadMap[target]) return;
    const node = ref.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          warmRoute(target);
          observer.disconnect();
        }
      });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  const handleMouseEnter = () => warmRoute(target);
  const handleFocus = () => warmRoute(target);

  return { ref, handleMouseEnter, handleFocus };
};

export default function PrefetchLink({ to, prefetchKey, children, onMouseEnter, onFocus, ...props }) {
  const target = prefetchKey || to;
  const { ref, handleFocus, handleMouseEnter } = usePrefetchRoute(target);

  const combinedMouseEnter = (event) => {
    onMouseEnter?.(event);
    handleMouseEnter();
  };

  const combinedFocus = (event) => {
    onFocus?.(event);
    handleFocus();
  };

  return (
    <Link ref={ref} to={to} onMouseEnter={combinedMouseEnter} onFocus={combinedFocus} {...props}>
      {children}
    </Link>
  );
}
