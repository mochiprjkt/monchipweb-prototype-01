import { useLang } from '../i18n/LanguageContext';
import { useCountUp } from '../hooks/useCountUp';

function Stat({ value, suffix = '', label }) {
  const ref = useCountUp(value, { suffix });
  return (
    <div className="bg-surface-3 rounded-2xl p-6 text-center border border-border/10">
      <div ref={ref} className="font-display font-black text-4xl stat-number" data-count={value}>
        {value + suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-content-muted mt-1.5">{label}</div>
    </div>
  );
}

export default function About() {
  const { t } = useLang();

  return (
    <section id="tentang" className="py-24 md:py-32 bg-surface-2/60 relative overflow-hidden">
      <div className="glow-orb w-80 h-80 bg-gold -top-10 right-1/4 opacity-30" />

      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="relative reveal">
            <div className="aspect-square bg-gradient-to-br from-primary to-primary-dark rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="relative h-full flex flex-col justify-between text-white">
                <div>
                  <div className="text-7xl font-display font-black italic">M</div>
                  <div className="text-2xl font-display font-bold mt-2">Momchips</div>
                  <div className="text-sm opacity-80">{t.about.since}</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <i className="fas fa-leaf" />
                    </span>
                    <span className="font-semibold">{t.about.feature1Title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <i className="fas fa-handshake" />
                    </span>
                    <span className="font-semibold">{t.about.feature2Title}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-surface-3 rounded-2xl p-5 shadow-xl border border-border/10 max-w-[200px]">
              <div className="text-3xl font-display font-black text-primary">10rb+</div>
              <div className="text-xs text-content-muted leading-tight mt-1">
                {t.about.customersTitle}
                <br />
                {t.about.customersDesc}
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal" style={{ transitionDelay: '120ms' }}>
            <span className="tag bg-primary/10 text-primary mb-5">{t.about.tag}</span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-content leading-tight mb-6">
              {t.about.titlePre}
              <span className="text-primary italic">{t.about.titleHighlight}</span>
            </h2>
            <div className="space-y-4 text-content-soft leading-relaxed">
              {t.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10">
              <Stat value={3} suffix="+" label={t.about.statYears} />
              <Stat value={50} suffix="+" label={t.about.statPartners} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
