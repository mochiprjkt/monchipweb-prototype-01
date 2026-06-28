import { useEffect, useRef } from 'react';

/**
 * Animates a number from 0 to `value` with an ease-out curve when the
 * element scrolls into view. Supports prefix/suffix decorators.
 */
export function useCountUp(value, { duration = 1500, suffix = '' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const num = Number(value);
    if (!Number.isFinite(num) || num <= 0) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      node.textContent = num + suffix;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          const startTime = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            node.textContent = Math.floor(num * eased) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else node.textContent = num + suffix;
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration, suffix]);

  return ref;
}
