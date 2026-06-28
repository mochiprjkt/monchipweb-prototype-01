import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import id from './locales/id';
import en from './locales/en';

export const languages = {
  id,
  en,
};

const LanguageContext = createContext({
  lang: 'id',
  setLang: () => {},
  toggleLang: () => {},
  t: id,
});

const STORAGE_KEY = 'momchips-lang';

function getInitialLang() {
  if (typeof window === 'undefined') return 'id';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'id' || stored === 'en') return stored;
    // Default to English for en-* browser languages, otherwise Indonesian.
    const browser = window.navigator.language?.toLowerCase() || '';
    return browser.startsWith('en') ? 'en' : 'id';
  } catch {
    return 'id';
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  useEffect(() => {
    const dict = languages[lang] || id;
    document.documentElement.setAttribute('lang', dict.meta.htmlLang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore persistence errors */
    }
  }, [lang]);

  const setLang = (next) => {
    if (next === 'id' || next === 'en') setLangState(next);
  };

  const toggleLang = () => setLangState((prev) => (prev === 'id' ? 'en' : 'id'));

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t: languages[lang] || id }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(LanguageContext);
}
