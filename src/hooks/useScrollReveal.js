import { useEffect } from 'react';

/**
 * Adds the `visible` class to every `.reveal` element when it scrolls
 * into view, using IntersectionObserver. Re-scans whenever `deps`
 * change (e.g. language switch re-renders the tree).
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
