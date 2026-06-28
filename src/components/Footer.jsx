import { useLang } from '../i18n/LanguageContext';
import Logo from './Logo';

const SOCIAL = ['fa-instagram', 'fa-facebook-f', 'fa-tiktok', 'fa-whatsapp'];

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-2 border-t border-border/10 pt-20 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-5">
            <Logo size="lg" />
            <p className="text-content-soft leading-relaxed mt-6 max-w-sm">{t.footer.tagline}</p>
            <div className="flex gap-3 mt-6">
              {SOCIAL.map((icon) => (
                <a
                  key={icon}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-full bg-surface-3 border border-border/10 flex items-center justify-center text-content-soft hover:bg-primary hover:text-white hover:border-primary transition-all"
                  aria-label={icon}
                >
                  <i className={`fab ${icon}`} />
                </a>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 mt-6 text-xs font-semibold text-content-muted">
              <i className="fas fa-certificate text-gold" />
              {t.footer.certified}
            </span>
          </div>

          {/* Products */}
          <div className="md:col-span-2">
            <h4 className="font-display font-bold text-content mb-4">{t.footer.productsTitle}</h4>
            <ul className="space-y-2.5">
              {t.footer.products.map((item) => (
                <li key={item}>
                  <a
                    href="#produk"
                    className="text-sm text-content-soft hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="font-display font-bold text-content mb-4">{t.footer.companyTitle}</h4>
            <ul className="space-y-2.5">
              {t.footer.company.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-sm text-content-soft hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="font-display font-bold text-content mb-4">{t.footer.contactTitle}</h4>
            <ul className="space-y-3 text-sm text-content-soft">
              <li className="flex gap-3">
                <i className="fas fa-location-dot text-primary mt-1" />
                <span dangerouslySetInnerHTML={{ __html: t.contact.address }} />
              </li>
              <li className="flex gap-3">
                <i className="fas fa-phone text-primary mt-1" />
                <span dangerouslySetInnerHTML={{ __html: t.contact.phone }} />
              </li>
              <li className="flex gap-3">
                <i className="fas fa-envelope text-primary mt-1" />
                <span dangerouslySetInnerHTML={{ __html: t.contact.email }} />
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-content-muted text-center md:text-left">
            {t.footer.copyright.replace('2024', String(year))}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-xs text-content-muted hover:text-primary transition-colors"
            >
              {t.footer.privacy}
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-xs text-content-muted hover:text-primary transition-colors"
            >
              {t.footer.terms}
            </a>
            <span className="text-xs text-content-muted flex items-center gap-1.5">
              <i className="fas fa-heart text-primary" />
              {t.footer.madeWith}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
