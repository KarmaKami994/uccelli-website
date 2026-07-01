# PRD – Uccelli Society Website Redesign

**Version:** 6.0  
**Datum:** 30. Juni 2026  
**Auftraggeber:** Verein Uccelli  
**Aktuell:** https://uccelli-society.ch (WordPress — wird ersetzt)  
**Repository:** https://github.com/KarmaKami994/uccelli-website.git  
**Hosting:** Hosttech vServer (entschieden) — Deployment via GitHub Actions

**Changelog v6.0:** Phase A+B (Code-Qualität) abgeschlossen: `<a>` → `next/link` Migration (10 Dateien), `<img>` → `next/image` Migration (3 Dateien), vollständige i18n-Abdeckung (143/143 Keys DE+EN, 0 hardcoded Strings), ContactForm i18n + dynamische Zod-Validierung, Lucide SVG Social Icons (Footer + Kontakt), Skip-to-Content Accessibility Link, Mobile-Menu-Fix (Sub-Links schliessen Overlay), Test-Mocks für Link/Image, PersonCard i18n  
**Changelog v5.0:** SponsorBanner, Mobile-Nav-Fix, Unit Tests (34 Tests/7 Dateien), Payload importMap komplett (32 Einträge), FixedToolbarFeature, LexicalRenderer, PersonCard Bio-Modal, resolveImageUrl, COMMANDS.md, Collections auf richText umgestellt  
**Changelog v4.0:** Phase 3+4 abgeschlossen, SQLite, Kontaktformular, Leaflet, CookieBanner, GSAP, JSON-LD, Sitemap  
**Changelog v3.0:** Gap-Analyse, fehlende Deliverables  
**Changelog v2.0:** Option E, SEO-Redirects, Consent, Farbkontrast, OpenStreetMap

---

## 1. Projektzusammenfassung

Kompletter Neubau der Website des **Verein Uccelli** (gemeinnütziger Verein in Zürich für Bildung, sozialen Austausch und persönliche Entwicklung) als React/Next.js-Applikation mit Payload CMS. Migration von WordPress mit 301-Redirect-Mapping. Der Name „Uccelli" bedeutet „Vögel" auf Italienisch.

**Standort:** Riedhofstrasse 364, 8049 Zürich, Schweiz  
**Kontakt:** uccelli.society@gmail.com

---

## 2. Technologie-Stack

| Ebene | Technologie | Version | Status |
|-------|-------------|---------|--------|
| Framework | Next.js (App Router) | 16.2.9 | ✅ |
| UI | React + TypeScript | 19.2.4 | ✅ |
| Styling | Tailwind CSS | 4.3.1 | ✅ (v4 — @theme in CSS) |
| Animation | Framer Motion | 12.41.0 | ✅ |
| Animation | GSAP + ScrollTrigger | 3.15.0 | ✅ |
| i18n | next-intl | 4.13.0 | ✅ **143/143 Keys** |
| CMS | Payload CMS | 3.85.1 | ✅ |
| Datenbank | SQLite (@payloadcms/db-sqlite) | — | ✅ |
| Rich Text | Lexical + FixedToolbarFeature | — | ✅ |
| Formulare | React Hook Form + Zod | — | ✅ i18n-Validierung |
| E-Mail | Resend | — | ✅ (API-Key in .env) |
| Spam-Schutz | Cloudflare Turnstile | — | ✅ |
| Karten | Leaflet + OpenStreetMap | — | ✅ |
| Consent | CookieBanner (custom) | — | ✅ i18n |
| SEO | next-sitemap + JSON-LD | — | ✅ |
| Navigation | next/link | — | ✅ Client-Side Routing |
| Bilder | next/image | — | ✅ WebP/AVIF, Lazy Loading |
| Icons | Lucide React | 1.21.0 | ✅ SVG Social Icons |
| Tests | Vitest + React Testing Library | 4.1.9 | ✅ 34 Tests |
| Fonts | next/font/local (Lato) | — | ✅ |
| Hosting | Hosttech vServer | — | ⏳ Deployment |

---

## 3. Design-System

### Farben
| Rolle | Hex | Verwendung |
|-------|-----|------------|
| Primary | #000000 | Text, Buttons, Hintergründe |
| White | #FFFFFF | Hintergründe, Button-Text |
| Accent | #5170FF | Buttons ≥18px |
| Accent Accessible | #3D5BD9 | Kleine Links (WCAG AA) |

### Typografie
Lato Bold (700) + Regular (400), lokal geladen via next/font/local. H1 = clamp(2.5rem, 8vw, 6rem), H2 = clamp(1.5rem, 4vw, 2.25rem), Body = 16px.

### Buttons
3 Varianten (primary/black, secondary/outline, accent/blue), rounded-[12px], uppercase, tracking 0.12em. Client-Side Navigation via next/link.

---

## 4. Komponenten-Bibliothek (20 Komponenten)

| Komponente | Datei | Status |
|------------|-------|--------|
| AttentionBanner | `components/layout/AttentionBanner.tsx` | ✅ |
| Header (Split Menu) | `components/layout/Header.tsx` | ✅ Desktop + Mobile + i18n aria |
| Footer | `components/layout/Footer.tsx` | ✅ 4-Spalten + Accordion + SVG Icons |
| LanguageSwitcher | `components/layout/LanguageSwitcher.tsx` | ✅ DE \| EN (next/link) |
| CookieBanner | `components/layout/CookieBanner.tsx` | ✅ nDSG-konform + i18n |
| PageTransition | `components/layout/PageTransition.tsx` | ✅ Framer Motion |
| JsonLd | `components/layout/JsonLd.tsx` | ✅ Organization + FAQPage |
| Hero (3 Varianten) | `components/sections/Hero.tsx` | ✅ gradient, split, cutout + next/image |
| SponsorBanner | `components/sections/SponsorBanner.tsx` | ✅ next/link |
| Button | `components/ui/Button.tsx` | ✅ next/link für href |
| Card | `components/ui/Card.tsx` | ✅ next/image |
| PersonCard | `components/ui/PersonCard.tsx` | ✅ Bio-Modal + next/image + i18n |
| Accordion | `components/ui/Accordion.tsx` | ✅ |
| ContactForm | `components/ui/ContactForm.tsx` | ✅ RHF + Zod + i18n |
| Map (Leaflet/OSM) | `components/ui/Map.tsx` | ✅ |
| MapLoader (SSR-safe) | `components/ui/MapLoader.tsx` | ✅ |
| ScrollReveal (GSAP) | `components/ui/ScrollReveal.tsx` | ✅ |
| StaggerReveal (GSAP) | `components/ui/StaggerReveal.tsx` | ✅ |
| LexicalRenderer | `components/ui/LexicalRenderer.tsx` | ✅ Client-seitiger Rich-Text |
| RichTextRenderer | `components/ui/RichTextRenderer.tsx` | ✅ Server-seitig (Payload RSC) |

---

## 5. Seitenübersicht (20 Routen)

| # | Route | i18n | SEO | Animation | Payload | Status |
|---|-------|------|-----|-----------|---------|--------|
| 1 | `/` Homepage | ✅ | ✅ OG | ✅ | — | ✅ |
| 2 | `/ueber-uns` | ✅ | ✅ | ✅ | — | ✅ |
| 3 | `/ueber-uns/vorstand` | ✅ | ✅ | ✅ | ✅ Team | ✅ |
| 4 | `/ueber-uns/faq` | ✅ | ✅ JSON-LD | ✅ | ✅ FAQs | ✅ |
| 5 | `/ueber-uns/partner` | ✅ | ✅ | ✅ | ✅ Partners | ✅ |
| 6 | `/skills4growth` | ✅ | ✅ | ✅ | — | ✅ |
| 7 | `/programm/projekte` | ✅ | ✅ | ✅ | — | ✅ |
| 8 | `/programm/projekte/[slug]` | — | ✅ gen. | — | — | ✅ |
| 9 | `/programm/veranstaltungen` | ✅ | ✅ | — | ✅ Events | ✅ |
| 10 | `/programm/kursangebote` | ✅ | ✅ | ✅ | — | ✅ |
| 11 | `/programm/news` | ✅ | ✅ | ✅ | ✅ Posts | ✅ |
| 12 | `/programm/news/[slug]` | — | ✅ gen. | — | — | ✅ |
| 13 | `/netzwerk` | ✅ | ✅ | ✅ | — | ✅ |
| 14 | `/kontakt` | ✅ | ✅ | ✅ | — | ✅ |
| 15 | `/werte/[slug]` (6x) | — | ✅ gen. | — | — | ✅ |
| 16 | `/datenschutz` | — | ✅ | — | — | ✅ |
| 17 | `not-found` (404) | — | — | — | — | ✅ |
| 18 | `/admin/[[...]]` | — | — | — | — | ✅ Payload |
| 19 | `/api/[[...slug]]` | — | — | — | — | ✅ Payload REST |
| 20 | `/api/contact` | — | — | — | — | ✅ Form Backend |

---

## 6. Payload CMS

### Collections (9)

| Collection | Felder | richText | Seiten |
|------------|--------|----------|--------|
| projects | title, slug, category, summary, body, image, locale, featured | body | Projekte |
| posts | title, slug, date, summary, body, image, locale | body | News |
| events | title, date, endDate, location, description, image, locale | description | Events |
| team-members | name, role, bio, image, order | bio | Vorstand |
| partners | name, type, description, logo, url, socials | description | Partner |
| faqs | question, answer, order, locale | answer | FAQ |
| pages | title, slug, body, locale | body | Statische Seiten |
| media | alt (upload: image/*, pdf) | — | Medien |
| users | email, name, role (auth) | — | Auth |

### Admin Panel
- **URL:** `/admin`
- **Editor:** Lexical mit FixedToolbarFeature (sichtbare Toolbar)
- **importMap:** 32 Einträge (9 RSC + 23 Client Features) — manuell befüllt wegen Node 24 ESM-Inkompatibilität
- **Datenbank:** SQLite (uccelli.db im Projektroot)

### Data Layer
- `lib/payload.ts` — `fetchCollection()` und `fetchBySlug()` mit try/catch
- `lib/data.ts` — Payload-first Datenzugriff mit statischem Fallback
- `resolveImageUrl()` — Extrahiert URLs aus Payload Media-Relationen
- 5 Seiten angebunden: Vorstand, FAQ, Partner, News, Events

---

## 7. i18n — Vollständig

- **Framework:** next-intl, middleware.ts mit localePrefix: "as-needed", Default: de
- **Messages:** de.json (143 Keys) + en.json (143 Keys)
- **Status: 143/143 Keys — 0 hardcoded deutsche Strings**
- **Abdeckung:** Navigation, Footer (inkl. Werte-Labels), CookieBanner, ContactForm (Labels + Zod-Validierung + Status-Meldungen), PersonCard ("Mehr erfahren", "Schliessen"), Header aria-labels, Netzwerk-Beschreibungen, alle Seitentexte
- **Async Server Components** nutzen `getTranslations()` von `next-intl/server`

---

## 8. Tests

| Datei | Tests | Komponente |
|-------|-------|------------|
| button.test.tsx | 8 | Button (Varianten, Sizes, Link/Button, disabled) |
| card.test.tsx | 5 | Card (Render, Button, Image, Placeholder) |
| person-card.test.tsx | 6 | PersonCard (Render, Image, Initial, Bio-Modal, i18n) |
| accordion.test.tsx | 5 | Accordion (Render, Open/Close, Single-Open) |
| contact-form.test.tsx | 3 | ContactForm (Fields, Submit-Button, i18n) |
| language-switcher.test.tsx | 3 | LanguageSwitcher (DE/EN, Active, Links) |
| sponsor-banner.test.tsx | 4 | SponsorBanner (Title, Names, Links) |
| **Total** | **34** | **7 Dateien, alle grün** |

### Test-Mocks (setup.tsx)
next-intl, next/navigation, next/link, next/image, next/font/local, framer-motion, gsap, gsap/ScrollTrigger, ScrollReveal, StaggerReveal

---

## 9. Accessibility

| Massnahme | Status |
|-----------|--------|
| Skip-to-Content Link | ✅ sr-only, sichtbar bei Tab, DE/EN |
| Keyboard Navigation | ✅ Alle interaktiven Elemente fokusierbar |
| ARIA Labels (i18n) | ✅ Hamburger Menu, Modal Close, Cookie Dialog |
| Focus Visible Outlines | ✅ focus-visible:outline-2 auf Buttons |
| Reduced Motion | ✅ GSAP + CSS prefers-reduced-motion |
| Farbkontrast WCAG AA | ✅ Accent-Accessible #3D5BD9 für kleine Links |
| Semantische HTML-Struktur | ✅ header, main, footer, nav, section |

---

## 10. SEO

| Massnahme | Status |
|-----------|--------|
| Meta title + description (16/16 Seiten) | ✅ |
| generateMetadata für dynamische Routen | ✅ |
| OpenGraph Tags (Homepage) | ✅ |
| JSON-LD Organization (alle Seiten) | ✅ |
| JSON-LD FAQPage (/faq) | ✅ |
| Sitemap (next-sitemap, auto-generiert) | ✅ |
| robots.txt (/admin + /api ausgeschlossen) | ✅ |
| 301-Redirects (25+ WordPress-URLs) | ✅ |
| hreflang (de + en) | ✅ |
| Custom 404 | ✅ |
| next/link Client-Side Routing + Prefetching | ✅ |
| next/image Optimierung (WebP/AVIF, sizes, priority) | ✅ |

---

## 11. Datenschutz & Compliance (nDSG)

| Massnahme | Status |
|-----------|--------|
| Google Maps → Leaflet/OpenStreetMap | ✅ |
| Google Fonts → Lato lokal geladen | ✅ |
| Google reCAPTCHA → Cloudflare Turnstile | ✅ |
| CookieBanner (i18n, Akzeptieren/Ablehnen) | ✅ |
| Datenschutzseite (/datenschutz) | ✅ |
| Kontaktformular Rate Limiting (5 Req/IP/15min) | ✅ |
| Hosting Schweiz (Hosttech, Daten in CH) | ✅ |

---

## 12. Entwicklungs-Phasen

### Phase 1: Foundation ✅
Next.js 16, Tailwind v4, i18n, Font-Loading, Komponenten, Layout, Homepage, 301-Redirects

### Phase 2: Seiten ✅
17 Frontend-Seiten, LanguageSwitcher, 404, Datenschutz, SEO-Metadaten (16/16)

### Phase 3: Features & Compliance ✅
Kontaktformular (RHF + Zod + Turnstile + Resend + Rate Limiting), Leaflet/OSM, CookieBanner, Payload CMS + SQLite, SponsorBanner

### Phase 4: Animation & SEO ✅
GSAP ScrollReveal/StaggerReveal, PageTransition, JSON-LD, Sitemap, i18n-Basis

### Phase 5: Polish & Bugfixes ✅
Mobile-Nav-Fix, Unit Tests (34), Payload importMap (32 Einträge), FixedToolbar, LexicalRenderer, PersonCard Bio-Modal, resolveImageUrl, richText Collections, COMMANDS.md

### Phase 6: Code-Qualität ✅
- [x] next/link Migration (10 Dateien — Client-Side Routing + Prefetching)
- [x] next/image Migration (3 Dateien — WebP/AVIF, Lazy Loading, priority)
- [x] i18n komplett (143/143 Keys, 0 hardcoded DE-Strings)
- [x] ContactForm i18n (Labels, Zod-Validierung, Status-Meldungen)
- [x] Netzwerk/Footer/CookieBanner/PersonCard/Header i18n
- [x] Lucide SVG Social Icons (Footer + Kontaktseite)
- [x] Skip-to-Content Accessibility Link
- [x] Mobile Menu Sub-Link Close Fix (onNavigate Callback)
- [x] Test-Mocks + Tests angepasst

### Phase 7: Deployment & Launch ⏳ ANSTEHEND
- [ ] Hosttech vServer einrichten (Node.js 22 LTS, PM2, Nginx)
- [ ] GitHub Action für Auto-Deployment
- [ ] Production .env konfigurieren
- [ ] DNS uccelli-society.ch → Hosttech
- [ ] SSL-Zertifikat (Let's Encrypt)
- [ ] Finale Bilder ersetzen
- [ ] Content in Payload CMS pflegen
- [ ] 301-Redirect-Monitoring (Google Search Console)
- [ ] Performance-Audit (Lighthouse)
- [ ] Accessibility-Audit (axe-core)
- [ ] Cross-Browser Testing

---

## 13. Offene Fragen

| # | Frage | Status |
|---|-------|--------|
| 1 | CMS → Payload 3.85 + SQLite | ✅ |
| 2 | Hosting → Hosttech vServer | ✅ |
| 3 | Deployment → GitHub Actions + SSH | ✅ |
| 4 | Domain: Bleibt uccelli-society.ch? | Offen |
| 5 | Finale Bilder: Wann werden sie geliefert? | Offen |
| 6 | Analytics: Plausible/Umami? | Offen |
| 7 | Node 24 → 22 LTS downgrade für Payload CLI? | Empfohlen |

---

## 14. Umgebungsvariablen (.env.local)

```bash
DATABASE_URI=file:./uccelli.db
PAYLOAD_SECRET=mindestens-32-zeichen-langer-geheimer-string
RESEND_API_KEY=re_xxxxxxxxxxxx          # Optional für Dev
TURNSTILE_SITE_KEY=0x0000000000000000    # Optional für Dev
TURNSTILE_SECRET_KEY=0x0000000000000000  # Optional für Dev
```

---

## 15. Bekannte Issues & Workarounds

| Issue | Workaround |
|-------|------------|
| `payload generate:importmap` schlägt fehl | importMap.ts manuell befüllt (32 Einträge) — Node.js 24 ESM-Inkompatibilität |
| `middleware.ts` Deprecation-Warnung | Ignorieren — Next.js 16 empfiehlt proxy statt middleware |
| `.next` Cache-Korruption nach Build + Dev | .next Ordner löschen, dann neu starten |
| Neue richText-Felder → alte Daten inkompatibel | uccelli.db löschen und neu anlegen (nur bei Feldtyp-Wechsel) |

---

## 16. Projektstruktur

```
uccelli-website/
├── middleware.ts                     # next-intl Locale-Routing
├── payload.config.ts                # Payload CMS Config
├── next.config.ts                   # withNextIntl(), 301-Redirects
├── vitest.config.ts                 # Test-Konfiguration
├── .env.example                     # Umgebungsvariablen-Template
├── app/
│   ├── layout.tsx                   # Root (pass-through)
│   ├── not-found.tsx                # Root 404
│   ├── [locale]/
│   │   └── layout.tsx               # Skip-to-Content + Header/Footer
│   ├── (payload)/admin/             # Payload Admin UI
│   └── api/                         # contact + Payload REST
├── collections/                     # 8 Payload Collection-Definitionen
├── components/                      # 20 React-Komponenten
├── lib/
│   ├── cn.ts                        # clsx + tailwind-merge
│   ├── payload.ts                   # Payload Client + Helpers
│   └── data.ts                      # Payload-first Data Layer
├── messages/                        # de.json (143) + en.json (143)
├── tests/                           # 7 Testdateien + setup.tsx
├── public/fonts/                    # Lato-Regular.woff2 + Lato-Bold.woff2
├── styles/globals.css               # Tailwind v4 @theme
└── docs/
    ├── PRD.md                       # Dieses Dokument (v6.0)
    └── COMMANDS.md                  # Entwickler-Befehls-Referenz
```
