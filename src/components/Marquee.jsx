import { useLang } from '../i18n/LanguageContext';

export default function Marquee() {
  const { t } = useLang();
  const items = t.marquee;

  // Duplicate the list so the CSS marquee can loop seamlessly (-50% translate).
  const loop = [...items, ...items];

  return (
    <section className="py-5 bg-primary text-white overflow-hidden">
      <div className="marquee-track">
        {[0, 1].map((group) => (
          <div key={group} className="flex items-center gap-12 px-6 whitespace-nowrap" aria-hidden={group === 1}>
            {items.map((text, i) => (
              <span key={`${group}-${i}`} className="flex items-center gap-12">
                <span
                  className={`font-display font-bold text-xl ${
                    i % 2 === 1 ? '' : 'italic'
                  }`}
                >
                  {text}
                </span>
                <span className="text-2xl">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
