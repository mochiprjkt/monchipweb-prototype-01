import { useLang } from '../i18n/LanguageContext';
import { useHeroScene } from '../hooks/useHeroScene';
import { useCountUp } from '../hooks/useCountUp';

function Stat({ value, suffix = '', label }) {
  const ref = useCountUp(value, { suffix });
  return (
    <div>
      <div ref={ref} className="font-display font-black text-4xl stat-number" data-count={value}>
        {value + suffix}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-content-muted mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const canvasRef = useHeroScene(true);

  return (
    <section id="beranda" className="relative min-h-screen flex items-center pt-28 pb-12 overflow-hidden">
      <canvas id="hero-canvas" ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 dot-pattern pointer-events-none" />
      <div className="glow-orb w-96 h-96 bg-primary top-20 -left-20" />
      <div className="glow-orb w-96 h-96 bottom-20 right-1/4" style={{ background: '#F4A261' }} />

      {/* Gradient overlay for readability (theme aware via surface alpha) */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-transparent lg:via-surface/60 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 bg-surface-3/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold tracking-wider border border-primary/10 shadow-sm text-content">
            <span className="w-2 h-2 bg-primary rounded-full pulse-glow" />
            {t.hero.badge}
          </div>

          <h1 className="hero-title font-display font-black text-7xl md:text-8xl lg:text-[10rem] text-content">
            <span className="block">{t.hero.title1}</span>
            <span className="block">
              <span className="text-primary italic">{t.hero.title2}</span>
              <span className="text-primary">.</span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-content-soft max-w-lg leading-relaxed">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/mochiprjkt"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-4 rounded-full font-bold inline-flex items-center gap-3 text-sm uppercase tracking-wider"
            >
              {t.hero.ctaOrder}
              <i className="fas fa-arrow-right text-xs" />
            </a>
            <a
              href="#produk"
              className="btn-outline px-8 py-4 rounded-full font-bold inline-flex items-center gap-3 text-sm uppercase tracking-wider"
            >
              {t.hero.ctaProducts}
            </a>
          </div>

          <div className="flex items-center gap-6 md:gap-10 pt-8">
            <Stat value={5} label={t.hero.statVariants} />
            <div className="w-px h-14 bg-border/30" />
            <Stat value={100} suffix="%" label={t.hero.statNatural} />
            <div className="w-px h-14 bg-border/30" />
            <Stat value={10} suffix={t.hero.statSuffix} label={t.hero.statCustomers} />
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-content-muted z-10">
        <span>{t.hero.scroll}</span>
        <div className="w-px h-12 animate-scroll-roll" />
      </div>
    </section>
  );
}
