# monchipweb-prototype-01 — Skill Context

You are assisting with **Momchips**, a premium chips brand landing page built with **React 18 + Vite 5 + Tailwind CSS 3 + Three.js**.

---

## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 (JSX, no TypeScript) |
| Bundler | Vite 5 |
| Styling | Tailwind CSS 3 + CSS Variables |
| 3D | Three.js 0.160 (via `three` npm package) |
| Icons | Font Awesome 6 (CDN) |
| Fonts | Plus Jakarta Sans (sans), Fraunces (serif/display) |

---

## 🧱 Architecture

### Component Tree
```
ThemeProvider → LanguageProvider → App
                                     ├── ScrollProgress
                                     ├── Navbar → Logo, ThemeToggle, LanguageToggle
                                     ├── MobileMenu
                                     ├── Hero (Three.js canvas + Stats)
                                     ├── Marquee
                                     ├── Products (carousel + ChipIllustration SVG)
                                     ├── About
                                     ├── Process
                                     ├── Features
                                     ├── Gallery
                                     ├── Testimonials
                                     ├── OrderForm (feedback form)
                                     └── Footer
```

### Custom Hooks
- `useHeroScene` — Three.js scene, chip geometry, animation loop, collision, pointer interaction
- `useScrollReveal` — IntersectionObserver-based reveal animation (`.reveal` → `.visible`)
- `useSmoothScroll` — Hijacks `a[href^="#"]` clicks, smooth scrolls with navbar offset
- `useCountUp` — Animated number counter with ease-out

### Contexts
- `ThemeContext` — dark/light mode, persists to `localStorage('momchips-theme')`
- `LanguageContext` — id/en, persists to `localStorage('momchips-lang')`, auto-detects browser

---

## 🌐 i18n Convention

- Custom implementation (NOT react-i18next)
- Files: `src/i18n/locales/{id,en}.js`
- Usage: `const { t } = useLang()` → `t.section.key`
- Language sections mirror component structure: `nav`, `hero`, `products`, `about`, `process`, `features`, `gallery`, `testimonials`, `contact`, `feedback`, `footer`

### Adding a new translatable string:
1. Add key to both `id.js` and `en.js`
2. Use `t.path.to.key` in component
3. Never hardcode user-facing text

---

## 🎨 Styling Rules

### Theme System
- CSS variables in `:root` (light) and `.dark` (dark) in `index.css`
- RGB triplets + Tailwind alpha: `rgb(var(--color-primary) / <alpha-value>)`
- Semantic tokens: `surface`, `surface-2`, `surface-3`, `content`, `content-soft`, `content-muted`, `border`

### Utility Classes
- `btn-primary` — red filled button with shine hover effect
- `btn-outline` — bordered button
- `tag` — small rounded pill label
- `reveal` — hidden element; ScrollReveal adds `.visible` class
- `form-input` — styled input with focus ring
- `.font-display` — Fraunces serif font
- `stat-number` — gradient text for stats

### Dark Mode
- Toggle via `ThemeContext` + `.dark` class on `<html>`
- Inline script in `index.html` prevents flash of incorrect theme
- CSS variables swap automatically; no separate dark stylesheets

---

## ⚠️ Critical Conventions

1. **No hardcoded strings** — every user-facing string MUST go through i18n (`t.*`)
2. **`prefers-reduced-motion`** — animations must respect this media query (already in index.css)
3. **New sections** need: component file, i18n keys (id + en), navbar link, anchor `id`
4. **`three` is a vendor chunk** — don't import it in non-3D components (code-split in vite.config)
5. **ESLint**: `react-refresh/only-export-components` — named exports may trigger warnings
6. **All components are default exports** in `src/components/`

---

## 🚀 Commands

```bash
npm run dev      # Dev server at :5173
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

---

## 📁 Key File Reference

| File | Purpose |
|------|---------|
| `index.html` | Entry + preloader + CDN fonts/icons + inline theme script |
| `vite.config.js` | Manual chunk splitting (three, react) |
| `tailwind.config.js` | Custom colors via CSS variables, Fraunces font family |
| `src/index.css` | Theme tokens, component utilities, animations, keyframes |
| `src/App.jsx` | Layout composition, preloader dismiss |
| `src/hooks/useHeroScene.js` | Three.js scene (~467 lines, most complex file) |

---

## 🎯 Current State Notes

- "Pesan Sekarang" / "Pesan Semua Varian" buttons currently link to `https://github.com/mochiprjkt` (dummy)
- Feedback form is client-side only (toast, no backend)
- Gallery tiles use CSS gradient placeholders (no real images)
- Social media links in footer are `#` placeholders
- Company info: PT. Bumi Arjuna Indonesia, Lampung Selatan
- Products: 5 variants (Cassava, Purple Yam, Orange Yam, Yam Mix, Banana Chips)
