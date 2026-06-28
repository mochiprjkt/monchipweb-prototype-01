import { useLang } from '../i18n/LanguageContext';

const AVATAR_GRADIENTS = [
  'from-primary to-primary-dark',
  'from-gold to-primary',
  'from-primary-dark to-gold',
];

function TestimonialCard({ item, index }) {
  return (
    <figure
      className="reveal bg-surface-3 rounded-3xl p-8 border border-border/10 flex flex-col"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex gap-1 text-gold mb-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <i key={i} className="fas fa-star text-sm" />
        ))}
      </div>
      <blockquote className="text-content leading-relaxed flex-1 mb-6 text-lg font-medium">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-4 pt-5 border-t border-border/10">
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white font-display font-black text-lg flex-shrink-0`}
        >
          {item.name.charAt(0)}
        </div>
        <div>
          <div className="font-display font-bold text-content">{item.name}</div>
          <div className="text-xs text-content-muted">{item.meta}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const { t } = useLang();

  return (
    <section className="py-24 md:py-32 bg-surface-2/60 relative overflow-hidden">
      <div className="glow-orb w-80 h-80 bg-primary bottom-0 -left-10 opacity-30" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="tag bg-primary/10 text-primary mb-5">{t.testimonials.tag}</span>
          <h2 className="font-display font-black text-5xl md:text-6xl text-content leading-tight">
            {t.testimonials.titlePre}{' '}
            <span className="text-primary italic">{t.testimonials.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.testimonials.items.map((item, i) => (
            <TestimonialCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
