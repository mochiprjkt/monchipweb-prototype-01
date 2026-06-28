import { useLang, languages } from '../i18n/LanguageContext';

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="relative inline-flex h-9 items-center rounded-full border border-border/20 bg-surface-3 p-1 text-xs font-bold uppercase tracking-wider">
      {Object.entries(languages).map(([code, dict]) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              active ? 'bg-primary text-white shadow-sm' : 'text-content-muted hover:text-content'
            }`}
          >
            {dict.meta.short}
          </button>
        );
      })}
    </div>
  );
}
