# monchipweb-prototype-01

> Landing page brand **Momchips** — kripik premium dari **PT. Bumi Arjuna Indonesia**.  
> Dibangun dengan React + Vite, Three.js 3D, dark mode, dan dukungan bilingual ID/EN.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.160-000000?logo=three.js)](https://threejs.org/)

---

## ✨ Fitur

| Fitur | Detail |
|-------|--------|
| 🌓 **Dark Mode** | Toggle theme + persist ke localStorage, CSS variables |
| 🌐 **Bilingual** | Bahasa Indonesia & English, auto-detect browser |
| 🎨 **3D Interaktif** | Hero section dengan Three.js — kripik 3D melayang, hover repel, animasi floating |
| 📱 **Responsive** | Mobile-first, carousel produk, masonry grid, sidebar menu |
| 🏎️ **Performa** | Code splitting (vendor three & react terpisah), lazy reveal via IntersectionObserver |
| ♿ **Aksesibilitas** | `prefers-reduced-motion` dihormati, semantic HTML, ARIA labels via i18n |
| 🎬 **Animasi** | Scroll reveal, smooth scroll, count-up, marquee, scroll indicator laser |
| 📝 **Feedback Form** | Rating bintang, toast notification (client-side) |

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev
# → http://localhost:5173

# Build produksi
npm run build

# Preview build
npm run preview
```

---

## 🗂 Struktur Proyek

```
src/
├── main.jsx                     # Entry point (ThemeProvider → LanguageProvider → App)
├── App.jsx                      # Layout & komposisi komponen
├── index.css                    # Tailwind + CSS variables theme system
├── context/
│   └── ThemeContext.jsx          # Dark/light mode
├── i18n/
│   ├── LanguageContext.jsx       # i18n context
│   └── locales/
│       ├── id.js                 # Bahasa Indonesia
│       └── en.js                 # English
├── hooks/
│   ├── useHeroScene.js           # Three.js 3D chip animation (~467 baris)
│   ├── useScrollReveal.js        # IntersectionObserver reveal
│   ├── useSmoothScroll.js        # Smooth scroll anchor
│   └── useCountUp.js             # Number counter animation
└── components/
    ├── Navbar.jsx                # Navbar sticky + scroll effect
    ├── MobileMenu.jsx            # Sidebar mobile
    ├── Hero.jsx                  # Hero + 3D Three.js canvas + statistik
    ├── Marquee.jsx               # Running text marquee
    ├── Products.jsx              # Carousel produk (horizontal scroll)
    ├── ChipIllustration.jsx      # SVG ilustrasi chip
    ├── About.jsx                 # Tentang perusahaan
    ├── Process.jsx               # 4 tahap produksi
    ├── Features.jsx              # 4 keunggulan
    ├── Gallery.jsx               # Galeri masonry grid
    ├── Testimonials.jsx          # Testimoni pelanggan
    ├── OrderForm.jsx             # Form feedback & rating
    ├── Footer.jsx                # Footer lengkap
    ├── ScrollProgress.jsx        # Progress bar reading
    ├── Logo.jsx                  # Logo reusable
    ├── ThemeToggle.jsx           # Toggle dark/light
    └── LanguageToggle.jsx        # Toggle ID/EN
```

---

## 🧩 Alur Halaman

```
Beranda → Marquee → Produk → Tentang → Proses → Keunggulan → Galeri → Testimoni → Feedback → Footer
```

Semua navigasi anchor-based dengan smooth scroll.

---

## 🎨 Sistem Desain

| Token | Nilai Light | Nilai Dark |
|-------|------------|------------|
| **Primary** | `#D62828` (merah) | — |
| **Gold** | `#F4A261` (oranye) | — |
| **Surface** | cream `#FFF8F0` | warm near-black |
| **Content** | near-black `#1A0505` | warm off-white |

- **Font**: Plus Jakarta Sans (sans) + Fraunces (display/serif)
- Framework CSS: **Tailwind CSS** dengan custom color tokens via CSS variables
- Semantic tokens (`surface`, `content`, `border`) otomatis berubah di dark mode

---

## 🧠 Highlight Teknis

### 3D Hero (`useHeroScene.js`)
- Procedural textures (crinkle, albedo, oil roughness) via Canvas API
- Chip geometry dengan 5 varian bentuk: saddle, bowl, taco
- Collision detection antar chip 3D
- Pointer interaction: hover → chip menjauh & membesar
- Parallax camera follow mouse
- Particle system remah-remah

### Sistem Tema
- CSS variables RGB + Tailwind alpha-value
- **No external UI library** — murni Tailwind + CSS variables
- Inline script di `index.html` untuk mencegah flash of incorrect theme

### i18n
- Custom context, bukan react-i18next
- Auto-detect browser language
- Persist pilihan ke localStorage
- Fallback ke Bahasa Indonesia

---

## 📄 License

Hak cipta © 2026 — **PT. Bumi Arjuna Indonesia**

---

> Dibuat dengan ❤️ oleh [mochiprjkt](https://github.com/mochiprjkt)
