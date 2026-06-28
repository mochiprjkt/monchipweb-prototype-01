import { useLang } from '../i18n/LanguageContext';

// Logo served from /public so it has a stable URL in both dev and production
// (used by the header, footer, mobile menu, and the initial preloader).
const LOGO_URL = '/momchips.png';

const IMG_SIZES = {
  md: 'w-11 h-11',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
};

export default function Logo({ size = 'md', withText = true }) {
  const { t } = useLang();
  const imgClass = IMG_SIZES[size] || IMG_SIZES.md;
  const titleClass = size === 'lg' ? 'text-3xl' : 'text-xl';

  return (
    <span className="flex items-center gap-3 group">
      <img
        src={LOGO_URL}
        alt={t.nav.logoAlt}
        className={`${imgClass} object-contain transition-transform group-hover:rotate-12`}
      />
      {withText && (
        <span>
          <span className={`font-display font-black ${titleClass} leading-none tracking-tight`}>
            Momchips
          </span>
          <span className="block text-[9px] uppercase tracking-[0.2em] text-content-muted mt-0.5">
            PT. Bumi Arjuna Indonesia
          </span>
        </span>
      )}
    </span>
  );
}
