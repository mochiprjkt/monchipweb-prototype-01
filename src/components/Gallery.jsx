import { useMemo } from 'react';
import { useLang } from '../i18n/LanguageContext';

// Themed placeholder tiles built from CSS gradients + emoji so the gallery
// renders identically in light/dark mode and needs no external image host.
const TILES = [
  { label: 'Cassava', emoji: '🟡', from: '#F4C842', to: '#D62828' },
  { label: 'Purple Yam', emoji: '🟣', from: '#7E22CE', to: '#5B1A9E' },
  { label: 'Orange Yam', emoji: '🟠', from: '#F4721E', to: '#A23C06' },
  { label: 'Banana', emoji: '🍌', from: '#E8B923', to: '#9E7A0A' },
  { label: 'Yam Mix', emoji: '✦', from: '#7E22CE', to: '#F4721E' },
  { label: 'Combo Pack', emoji: '🎁', from: '#D62828', to: '#F4A261' },
  { label: 'Fresh Farm', emoji: '🌿', from: '#4A7C2A', to: '#2F5318' },
  { label: 'Harvest', emoji: '🧺', from: '#C99A10', to: '#7A5A0A' },
  { label: 'Craft & Fry', emoji: '🔥', from: '#D4520A', to: '#7A1C1C' },
  { label: 'Packaging', emoji: '📦', from: '#B9784A', to: '#6A4A2A' },
  { label: 'Halal & BPOM', emoji: '✅', from: '#2F8F5B', to: '#1F5E3B' },
  { label: 'Local Farmers', emoji: '🤝', from: '#3F6B2A', to: '#2F5318' },
];

function GalleryTile({ tile, className = '' }) {
  const { t } = useLang();
  return (
    <div className={`gallery-item group cursor-pointer ${className}`}>
      <div
        className="aspect-[4/5] w-full h-full relative flex items-end p-6"
        style={{ background: `linear-gradient(135deg, ${tile.from}, ${tile.to})` }}
      >
        <span className="absolute inset-0 flex items-center justify-center text-7xl opacity-30 group-hover:scale-125 group-hover:opacity-50 transition-all duration-500">
          {tile.emoji}
        </span>
        <div className="relative z-10">
          <span className="text-[10px] uppercase tracking-widest text-white/80 font-bold">
            Momchips
          </span>
          <div className="font-display font-black text-xl text-white">{tile.label}</div>
          <span className="inline-flex items-center gap-2 mt-2 text-xs text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            {t.gallery.tryNow} <i className="fas fa-arrow-right" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { t } = useLang();

  const tiles = useMemo(
    () => TILES.map((tile, i) => ({ ...tile, label: t.gallery.tiles[i] || tile.label })),
    [t],
  );

  return (
    <section id="galeri" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 reveal">
          <div>
            <span className="tag bg-primary/10 text-primary mb-5">{t.gallery.tag}</span>
            <h2 className="font-display font-black text-5xl md:text-6xl text-content leading-tight">
              {t.gallery.titlePre}{' '}
              <span className="text-primary italic">{t.gallery.titleHighlight}</span>
            </h2>
          </div>
        </div>

        {/* Masonry-like grid with varied row spans; grid-flow-dense fills gaps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[220px] grid-flow-dense">
          <GalleryTile tile={tiles[0]} className="row-span-2" />
          <GalleryTile tile={tiles[1]} />
          <GalleryTile tile={tiles[2]} className="row-span-2" />
          <GalleryTile tile={tiles[3]} />
          <GalleryTile tile={tiles[4]} className="col-span-2" />
          <GalleryTile tile={tiles[5]} className="col-span-2" />
          <GalleryTile tile={tiles[6]} />
          <GalleryTile tile={tiles[7]} />
        </div>
      </div>
    </section>
  );
}
