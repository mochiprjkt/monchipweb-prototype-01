import { useLang } from '../i18n/LanguageContext';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

export default function MobileMenu({ open, onClose }) {
  const { t } = useLang();

  const links = [
    { href: '#beranda', label: t.nav.home },
    { href: '#produk', label: t.nav.products },
    { href: '#tentang', label: t.nav.about },
    { href: '#proses', label: t.nav.process },
    { href: '#galeri', label: t.nav.gallery },
    { href: '#pesan', label: t.nav.feedback },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        className={`mobile-menu fixed top-0 right-0 bottom-0 w-80 max-w-full bg-surface z-50 p-8 lg:hidden shadow-2xl ${
          open ? 'open' : ''
        }`}
      >
        <div className="flex justify-between items-center mb-12">
          <span className="font-display font-black text-2xl text-content">{t.nav.menu}</span>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-content"
            aria-label={t.nav.closeMenu}
          >
            <i className="fas fa-times" />
          </button>
        </div>

        <nav className="flex flex-col gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-xl font-display font-bold text-content"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/mochiprjkt"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="btn-primary px-6 py-3 rounded-full font-semibold text-center mt-4"
          >
            {t.nav.order}
          </a>
        </nav>

        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center justify-between gap-3 border-t border-border/10 pt-6">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <div className="mt-6">
            <Logo />
          </div>
        </div>
      </div>
    </>
  );
}
