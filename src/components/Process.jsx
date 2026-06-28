import { useLang } from '../i18n/LanguageContext';

const ICONS = ['fa-seedling', 'fa-scissors', 'fa-fire-flame-curved', 'fa-box'];

export default function Process() {
  const { t } = useLang();

  return (
    <section id="proses" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="tag bg-primary/10 text-primary mb-5">{t.process.tag}</span>
          <h2 className="font-display font-black text-5xl md:text-6xl text-content leading-tight">
            {t.process.titlePre}{' '}
            <span className="text-primary italic">{t.process.titleHighlight}</span>
          </h2>
          <p className="text-content-soft text-lg leading-relaxed mt-6">
            {t.process.description}
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for large screens */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-1 process-line rounded-full opacity-60" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.process.steps.map((step, i) => (
              <div
                key={i}
                className="reveal relative text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-surface-3 border-2 border-primary/20 flex items-center justify-center shadow-sm relative z-10">
                    <i className={`fas ${ICONS[i]} text-3xl text-primary`} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-primary text-white font-display font-black flex items-center justify-center text-sm z-20">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display font-black text-xl text-content mb-2">{step.title}</h3>
                <p className="text-content-soft text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
