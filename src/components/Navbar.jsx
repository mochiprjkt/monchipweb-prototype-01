import { useEffect, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

export default function Navbar({ onOpenMenu }) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#beranda', label: t.nav.home },
    { href: '#produk', label: t.nav.products },
    { href: '#tentang', label: t.nav.about },
    { href: '#proses', label: t.nav.process },
    { href: '#galeri', label: t.nav.gallery },
    { href: '#pesan', label: t.nav.feedback },
  ];

  return (
    <nav id="navbar" className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'scrolled' : ''}`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <a href="#beranda" className="flex-shrink-0">
          <Logo size="xl" withText={false} />
        </a>

        <div className="hidden lg:flex items-center gap-9">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link font-medium text-sm">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <a
            href="https://github.com/mochiprjkt"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden md:inline-flex px-6 py-2.5 rounded-full font-semibold text-sm"
          >
            {t.nav.order}
          </a>
          <button
            type="button"
            onClick={onOpenMenu}
            className="lg:hidden text-2xl text-content"
            aria-label={t.nav.openMenu}
          >
            <i className="fas fa-bars" />
          </button>
        </div>
      </div>
    </nav>
  );
}
