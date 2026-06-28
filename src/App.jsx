import { useEffect, useState } from 'react';
import { useLang } from './i18n/LanguageContext';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useSmoothScroll } from './hooks/useSmoothScroll';

import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Products from './components/Products';
import About from './components/About';
import Process from './components/Process';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  const { lang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  // Re-run reveal + smooth-scroll wiring whenever content re-renders due to
  // a language switch (new DOM nodes need re-observing).
  useScrollReveal([lang]);
  useSmoothScroll([lang]);

  // Dismiss the preloader once React has mounted its first paint. A short
  // delay keeps the loader's entrance animation from flashing away instantly.
  useEffect(() => {
    const loader = document.getElementById('app-loader');
    if (!loader) return;
    const fadeTimer = window.setTimeout(() => loader.classList.add('is-hidden'), 400);
    const removeTimer = window.setTimeout(() => loader.remove(), 1000);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <Hero />
        <Marquee />
        <Products />
        <About />
        <Process />
        <Features />
        <Gallery />
        <Testimonials />
        <OrderForm />
      </main>

      <Footer />
    </>
  );
}
