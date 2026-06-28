import { useEffect } from 'react';

/**
 * Hijacks clicks on in-page anchor links (`a[href^="#"]`) and performs a
 * smoothed scroll with a fixed offset for the sticky navbar.
 */
export function useSmoothScroll(deps = []) {
  useEffect(() => {
    const handler = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
