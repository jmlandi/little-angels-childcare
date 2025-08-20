import { useEffect, useState } from "react";

export function useIsVisible<T extends HTMLElement>(
  ref: React.RefObject<T>,
  options?: IntersectionObserverInit,
  freezeOnceVisible = false
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // Fallback on environments without IO
      setIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      setIntersecting(visible);
      if (visible && freezeOnceVisible) observer.unobserve(el);
    }, options);

    observer.observe(el);
    return () => {
      try {
        observer.unobserve(el);
      } finally {
        observer.disconnect();
      }
    };
  }, [ref, options, freezeOnceVisible]);

  return isIntersecting;
}
