import { useTheme } from '../context/ThemeContext';
import { useLang } from '../i18n/LanguageContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLang();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? t.nav.switchToLight : t.nav.switchToDark}
      title={isDark ? t.nav.lightMode : t.nav.darkMode}
      className="relative inline-flex h-9 w-14 shrink-0 items-center rounded-full border border-border/20 bg-surface-3 p-1 transition-colors hover:border-primary/50"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform duration-300 ${
          isDark ? 'translate-x-4' : 'translate-x-0'
        }`}
      >
        <i className={`text-xs ${isDark ? 'fas fa-moon' : 'fas fa-sun'}`} />
      </span>
    </button>
  );
}
