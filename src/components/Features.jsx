import { useLang } from '../i18n/LanguageContext';

const ICONS = ['fa-shield-heart', 'fa-award', 'fa-people-group', 'fa-truck-fast'];

export default function Features() {
  const { t } = useLang();

  return (
    <section className="py-24 md:py-32 bg-surface-2/60 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="tag bg-primary/10 text-primary mb-5">{t.features.tag}</span>
          <h2 className="font-display font-black text-5xl md:text-6xl text-content leading-tight">
            {t.features.titlePre} <span className="text-primary italic">{t.features.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.items.map((item, i) => (
            <div
              key={i}
              className="reveal bg-surface-3 rounded-3xl p-8 border border-border/10 hover:border-primary/40 transition-colors group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-6 transition-all duration-300">
                <i className={`fas ${ICONS[i]} text-2xl text-primary group-hover:text-white transition-colors`} />
              </div>
              <h3 className="font-display font-black text-xl text-content mb-2">{item.title}</h3>
              <p className="text-content-soft text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
