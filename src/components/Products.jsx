import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import ChipIllustration from './ChipIllustration';

// Maps a translated product name back to the illustration palette key.
const VARIANT_KEYS = {
  'Kripik Singkong': 'singkong',
  'Cassava Chips': 'singkong',
  'Ubi Ungu': 'ungu',
  'Purple Yam': 'ungu',
  'Ubi Orange': 'orange',
  'Orange Yam': 'orange',
  'Ubi Mix': 'mix',
  'Yam Mix': 'mix',
  'Kripik Pisang': 'pisang',
  'Banana Chips': 'pisang',
};

const TAG_COLORS = {
  'Kripik Singkong': 'bg-primary',
  'Cassava Chips': 'bg-primary',
  'Best Seller': 'bg-primary',
  Favorite: 'bg-primary-dark',
  Favorit: 'bg-primary-dark',
  Limited: 'bg-gold',
  Combo: 'bg-primary-dark',
  Baru: 'bg-primary',
  New: 'bg-primary',
};

function ProductCard({ item, index }) {
  const variantKey =
    VARIANT_KEYS[item.name] || Object.values(VARIANT_KEYS)[index % 4];

  return (
    <article
      className="product-card reveal snap-center flex-shrink-0 w-[300px] bg-surface-3 rounded-3xl p-8 border border-border/10 overflow-hidden relative"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {item.featured && <span className="ribbon">{item.featured}</span>}

      <div className={`mb-4 ${item.featured ? 'mt-8' : ''}`}>
        {item.tag && (
          <span className={`tag text-white ${TAG_COLORS[item.tag] || 'bg-primary'}`}>
            {item.tag}
          </span>
        )}
      </div>

      <div className="aspect-[4/3] flex items-center justify-center mb-6">
        <ChipIllustration variant={variantKey} />
      </div>

      <h3 className="font-display font-black text-2xl text-content mb-2">{item.name}</h3>
      <p className="text-content-soft text-sm leading-relaxed">
        {item.description}
      </p>
    </article>
  );
}

export default function Products() {
  const { t } = useLang();
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  // Re-check navigation state on mount, language switch (new cards), and resize.
  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.products.items]);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.product-card');
    const gap = 24; // matches gap-6
    const distance = card ? card.offsetWidth + gap : 324;
    el.scrollBy({ left: distance * dir, behavior: 'smooth' });
  };

  return (
    <section id="produk" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div className="max-w-xl">
            <span className="tag bg-primary/10 text-primary mb-5">{t.products.tag}</span>
            <h2 className="font-display font-black text-5xl md:text-6xl text-content leading-tight">
              {t.products.titlePre}{' '}
              <span className="text-primary italic">{t.products.titleHighlight}</span>
            </h2>
          </div>
          <p className="text-content-soft max-w-md text-lg leading-relaxed">
            {t.products.description}
          </p>
        </div>

        {/* Carousel navigation */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label={t.nav.prevProducts}
            className="w-11 h-11 rounded-full border border-border/20 bg-surface-3 flex items-center justify-center text-content transition-all hover:border-primary/50 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <i className="fas fa-arrow-left text-sm" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label={t.nav.nextProducts}
            className="w-11 h-11 rounded-full border border-border/20 bg-surface-3 flex items-center justify-center text-content transition-all hover:border-primary/50 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <i className="fas fa-arrow-right text-sm" />
          </button>
        </div>

        {/* Horizontal carousel — scrolls left/right only, never down.
            On mobile, side padding centers the single visible card; on desktop
            (md+) cards flow from the left since multiple fit in view. */}
        <div
          ref={trackRef}
          onScroll={updateScrollState}
          className="product-track flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory py-4 px-[calc((100vw-300px)/2-1.5rem)] md:px-0"
        >
          {t.products.items.map((item, i) => (
            <ProductCard key={`${item.name}-${i}`} item={item} index={i} />
          ))}
        </div>

        <div className="text-center mt-14 reveal">
          <a
            href="https://github.com/mochiprjkt"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-8 py-4 rounded-full font-bold inline-flex items-center gap-3 text-sm uppercase tracking-wider"
          >
            {t.products.orderAll}
            <i className="fas fa-arrow-right text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
}
