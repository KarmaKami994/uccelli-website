# PRD – Uccelli Society Website Redesign

**Version:** 3.0  
**Datum:** 25. Juni 2026  
**Auftraggeber:** Verein Uccelli  
**Aktuell:** https://uccelli-society.ch (WordPress)  
**Repository:** https://github.com/KarmaKami994/uccelli-website.git  

**Changelog v3.0:** Tech-Versionen aktualisiert (Next.js 16, React 19, Tailwind v4), Status-Tracking für alle Deliverables, Gap-Analyse Phase 1+2, fehlende Deliverables identifiziert (LanguageSwitcher, dynamische Detail-Seiten, API Route, 404, Datenschutz, SEO-Metadaten, i18n-Ausbau)  
**Changelog v2.1:** Payload CMS 3.x als Headless CMS gewählt, Collections definiert  
**Changelog v2.0:** Three.js entfernt (Option E), SEO-Redirect-Mapping, Consent Management (nDSG), Farbkontrast-Fix, INP, middleware.ts, OpenStreetMap, Spam-Schutz, Nightshift, Split-Menu, Font-Loading, Footer-Umbenennung

---

## 1. Projektzusammenfassung

Kompletter Neubau der Uccelli Society Website als moderne React/Next.js-Applikation. Die aktuelle WordPress-Seite wird durch eine performante, mehrsprachige Architektur mit zeitgemässem Design ersetzt, die auf dem vordefinierten Brand Kit und den gelieferten Figma/Canva-Templates basiert. Die Migration beinhaltet ein vollständiges 301-Redirect-Mapping aller bestehenden WordPress-URLs, um das bestehende SEO-Ranking zu erhalten.

---

## 2. Technologie-Stack (aktualisiert auf tatsächliche Versionen)

| Ebene | Technologie | Version | Status |
|-------|-------------|---------|--------|
| Framework | **Next.js (App Router)** | 16.2.9 | ✅ Installiert |
| UI | **React + TypeScript** | 19.2.4 | ✅ Installiert |
| Styling | **Tailwind CSS** | 4.3.1 | ✅ Konfiguriert (@theme in CSS) |
| Animation | **Framer Motion** | 12.41.0 | ✅ Installiert |
| Animation | **GSAP** | 3.15.0 | ✅ Installiert, noch nicht eingesetzt |
| i18n | **next-intl** | 4.13.0 | ✅ Konfiguriert (DE + EN) |
| CMS | **Payload CMS 3.x** | — | ⏳ Noch nicht installiert |
| Formulare | **React Hook Form + Zod + Resend** | — | ⏳ Noch nicht installiert |
| Spam-Schutz | **Cloudflare Turnstile** | — | ⏳ Phase 3 |
| Karten | **Leaflet + OpenStreetMap** | — | ⏳ Phase 3 |
| Consent | **Cookiebot oder Usercentrics** | — | ⏳ Phase 3 |
| Fonts | **next/font/local (Lato)** | — | ✅ Lokal geladen |
| Icons | **Lucide React** | — | ✅ Installiert |
| Utility | **clsx + tailwind-merge** | — | ✅ Installiert |
| Deployment | **Vercel** | — | ⏳ Phase 5 |

**Hinweis:** Next.js 16 verwendet `proxy` statt `middleware` als Konvention. Die aktuelle `middleware.ts` funktioniert noch, sollte aber perspektivisch migriert werden.

---

## 3. Design-System (aus Brand Kit)

### 3.1 Farben

| Rolle | Hex | Verwendung |
|-------|-----|------------|
| Primary | `#000000` | Texte, Hintergründe, Buttons |
| White | `#FFFFFF` | Hintergründe, Texte auf Schwarz |
| Accent | `#5170FF` | CTA-Buttons, Highlights, Hover-States |

**⚠️ Accessibility-Hinweis:** `#5170FF` auf Weiss ergibt ein Kontrastverhältnis von **4.07:1**. Massnahmen:
- **Buttons (18px+ / Bold):** `#5170FF` ist erlaubt (Grosser Text braucht nur 3:1)
- **Kleine Links / Fliesstext:** `#3D5BD9` verwenden (Kontrast ~5.2:1 auf Weiss)
- Tailwind-Config: In `@theme` als `--color-brand-accent` und `--color-brand-accent-accessible` definiert ✅

### 3.2 Typografie

| Element | Font | Grösse | Gewicht |
|---------|------|--------|---------|
| H1 | Lato | clamp(2.5rem, 8vw, 6rem) | Bold (700) |
| H2 | Lato | clamp(1.5rem, 4vw, 2.25rem) | Bold (700) |
| H3 | Lato | 18px | Regular/Bold |
| Body | Lato | 16px | Regular (400) |
| Buttons | Lato | 13–14px | Bold (700), UPPERCASE, tracking 0.12em |
| Labels | Lato | 11px | Bold (700), UPPERCASE, tracking 0.2em |

**Font-Loading:** Lato wird über `next/font/local` in `app/[locale]/layout.tsx` geladen. `lato.className` wird direkt auf `<body>` gesetzt. ✅

### 3.3 Buttons

Drei Varianten, `rounded-[12px]`, `px-7 py-3` (default) / `px-9 py-4` (large):
- **Primary (Schwarz):** `bg-black text-white` ✅
- **Secondary (Outline):** `bg-white text-black border border-black` ✅
- **Accent (Blau):** `bg-brand-accent text-white` ✅

### 3.4 Komponenten-Bibliothek

| Komponente | Status | Datei |
|------------|--------|-------|
| **AttentionBanner** | ✅ Fertig | `components/layout/AttentionBanner.tsx` |
| **Header (Desktop)** | ✅ Fertig | `components/layout/Header.tsx` — Split Menu, Logo absolut zentriert, Dropdown-Menüs, backdrop-blur |
| **Header (Mobile)** | ✅ Fertig | Hamburger + Fullscreen-Overlay mit Akkordeon |
| **Footer (Desktop)** | ✅ Fertig | `components/layout/Footer.tsx` — 4-Spalten-Grid |
| **Footer (Mobile)** | ✅ Fertig | Akkordeon-Sektionen |
| **Hero** | ✅ Fertig | `components/sections/Hero.tsx` — 3 Varianten (gradient, split, cutout) |
| **Button** | ✅ Fertig | `components/ui/Button.tsx` — primary, secondary, accent + sizes |
| **Card** | ✅ Fertig | `components/ui/Card.tsx` — Bild/Placeholder, Hover-Shadow |
| **PersonCard** | ✅ Fertig | `components/ui/PersonCard.tsx` — S/W-Foto, Hover-Color |
| **Accordion** | ✅ Fertig | `components/ui/Accordion.tsx` — Framer Motion animated |
| **ContactForm** | ✅ Fertig (UI) | `components/ui/ContactForm.tsx` — Backend fehlt noch |
| **LanguageSwitcher** | ❌ Fehlt | Geplant in Header — DE \| EN Toggle |
| **CookieBanner** | ⏳ Phase 3 | Consent Management Wrapper |
| **Map (Leaflet/OSM)** | ⏳ Phase 3 | Lazy-loaded Karte für Kontaktseite |

---

## 4. Informationsarchitektur & Navigation

(Unverändert — siehe v2.1)

### 4.1 Desktop-Navigation (Split Menu / zentriertes Logo)
```
Skills4Growth    Programm    |  ✦UCCELLI  |    Netzwerk    Über uns    Kontakt
```

### 4.2 Mobile Navigation (Hamburger-Menü)
```
Home
Skills4Growth
Programm          ▾ (Projekte, Veranstaltungen, Kursangebote, News)
Netzwerk          ▾ (Uccelli Women, Ghana, FC, Nightshift Music)
Über uns          ▾ (Vorstand, Partner/Sponsoren, FAQ)
Kontakt
```

### 4.3 URL-Struktur
```
/[locale]/                              → Homepage
/[locale]/skills4growth                 → Skills4Growth (LifeLab)
/[locale]/programm/projekte             → Projekte Overview
/[locale]/programm/projekte/[slug]      → Einzelnes Projekt
/[locale]/programm/veranstaltungen      → Event-Kalender
/[locale]/programm/kursangebote         → Kursangebote
/[locale]/programm/news                 → News-Blog
/[locale]/programm/news/[slug]          → Einzelner News-Artikel
/[locale]/netzwerk                      → Netzwerke Overview
/[locale]/ueber-uns                     → Über uns
/[locale]/ueber-uns/vorstand            → Team / Vorstand
/[locale]/ueber-uns/partner             → Partner & Sponsoren
/[locale]/ueber-uns/faq                 → FAQ
/[locale]/kontakt                       → Kontaktseite
/[locale]/werte/[slug]                  → Werte-Seiten
/[locale]/datenschutz                   → Datenschutzerklärung
```

---

## 5. Seitenübersicht & Status

### Komplett-Tracker

| # | Seite | Route | Template | Status |
|---|-------|-------|----------|--------|
| 1 | Homepage | `/` | Minimalistisch | ✅ Fertig |
| 2 | Über uns | `/ueber-uns` | Template_Über-uns.jpg | ✅ Fertig |
| 3 | Der Vorstand | `/ueber-uns/vorstand` | Template_Team_Seite.jpg | ✅ Fertig |
| 4 | FAQ | `/ueber-uns/faq` | Template_FAQ.jpg | ✅ Fertig |
| 5 | Partner & Sponsoren | `/ueber-uns/partner` | Template_Partner-und-Sponsoren.jpg | ✅ Fertig |
| 6 | Skills4Growth | `/skills4growth` | Template_Aktuelles-Projekt.jpg | ✅ Fertig |
| 7 | Projekte Overview | `/programm/projekte` | Template_Projekte-Overview.jpg | ✅ Fertig |
| 8 | Einzelnes Projekt | `/programm/projekte/[slug]` | Template_Aktuelles-Projekt.jpg | ❌ **Fehlt** |
| 9 | Veranstaltungen | `/programm/veranstaltungen` | — (Fallback-State) | ✅ Fertig |
| 10 | Kursangebote | `/programm/kursangebote` | Template_Kursangebote.jpg | ✅ Fertig |
| 11 | News Overview | `/programm/news` | — (Card-Liste) | ✅ Fertig |
| 12 | Einzelner News-Artikel | `/programm/news/[slug]` | — | ❌ **Fehlt** |
| 13 | Netzwerke | `/netzwerk` | Template_Netzwerke.jpg | ✅ Fertig |
| 14 | Kontakt | `/kontakt` | Template_Contact-us | ✅ Fertig (UI) |
| 15 | Werte-Seiten (6x) | `/werte/[slug]` | Template_Standard-Content.jpg | ✅ Fertig |
| 16 | Datenschutzerklärung | `/datenschutz` | — | ❌ **Fehlt** |
| 17 | 404-Seite | `not-found.tsx` | — | ❌ **Fehlt** |

### Fehlende Seiten im Detail

**8. Einzelnes Projekt (`/programm/projekte/[slug]`):** Dynamische Detailseite für Projekte wie LifeLab, Nightshift Music, Kleidersammelaktion. Verwendet das Template_Aktuelles-Projekt.jpg Layout: Hero mit Titel auf Schwarz, langer Fliesstext mit eingebetteten Bildern. Aktuell werden Projekte nur auf der Overview-Seite gelistet.

**12. Einzelner News-Artikel (`/programm/news/[slug]`):** Detailansicht für Blog-Posts. Einfaches Layout: Titel, Datum, Bild, Fliesstext. Aktuell werden News nur als Card-Liste angezeigt.

**16. Datenschutzerklärung (`/datenschutz`):** Separate rechtliche Seite gemäss nDSG. Unterscheidet sich von den Werte-Seiten — enthält technische Datenschutzinfos (Cookies, Datenverarbeitung, Rechte der Betroffenen).

**17. 404-Seite (`not-found.tsx`):** Custom 404 mit Suchvorschlägen und Link zur Homepage. Muss sowohl im Root (`app/not-found.tsx`) als auch im Locale-Layout funktionieren.

---

## 6. Mehrsprachigkeit (i18n)

### Status

| Aspekt | Status |
|--------|--------|
| next-intl Setup | ✅ Konfiguriert |
| middleware.ts (Locale-Routing) | ✅ Funktioniert |
| i18n/request.ts | ✅ Konfiguriert |
| messages/de.json | ⚠️ **Nur Homepage, Nav, Footer** — Unterseiten-Texte sind hardcoded |
| messages/en.json | ⚠️ **Nur Homepage, Nav, Footer** — Unterseiten-Texte sind hardcoded |
| LanguageSwitcher im Header | ❌ **Fehlt** |
| generateStaticParams() | ✅ Für de + en konfiguriert |

### Offene Arbeit

Die Unterseiten (Über uns, Projekte, FAQ, etc.) haben aktuell **hardcodierte deutsche Texte** in den Page-Komponenten. Für vollständige Mehrsprachigkeit müssen:
1. Alle Texte in `de.json` und `en.json` ausgelagert werden
2. Die Pages auf `useTranslations()` umgestellt werden
3. Ein `LanguageSwitcher`-Komponente im Header integriert werden

Dies ist eine bewusste Entscheidung: Zuerst die Seitenstruktur finalisieren, dann die i18n-Keys in einem Schritt sauber extrahieren — statt jede Seite zweimal anzufassen.

---

## 7–12. (Unverändert — siehe v2.1)

- §7 Interaktive Features
- §8 Animation & Motion (Option E)
- §9 Datenschutz & Consent Management
- §10 SEO & WordPress-Migration
- §11 Performance-Ziele
- §12 Accessibility (WCAG 2.1 AA)

---

## 13. Content-Übernahme — Status

| Content | Quelle | Status |
|---------|--------|--------|
| Vereinsziel & Leitbild | uccelli-society.ch | ✅ Übernommen (Homepage + Über uns) |
| Team (Ato, Hatice, Karim) | uccelli-society.ch | ✅ Übernommen (Vorstand) |
| LifeLab / Skills4Growth | uccelli-society.ch | ✅ Übernommen (vollständig) |
| Sackgeldbörse | uccelli-society.ch | ✅ Übernommen |
| Projekte-Beschreibungen | uccelli-society.ch | ✅ Übernommen (6 Projekte) |
| Partner-Beschreibungen | uccelli-society.ch | ✅ Übernommen (3 Partner, 3 Sponsoren) |
| Netzwerk-Texte | uccelli-society.ch | ✅ Übernommen (Ghana, Women, FC, Nightshift) |
| Kontaktinformationen | uccelli-society.ch | ✅ Übernommen |
| Spendenangaben (IBAN etc.) | uccelli-society.ch | ✅ Übernommen (Footer) |
| Werte-Seiten (6x) | uccelli-society.ch | ✅ Übernommen |
| FAQ-Inhalte | Neu erstellt | ✅ 7 FAQ-Einträge |
| Kursangebote-Kategorien | uccelli-society.ch | ✅ Übernommen (4 Kategorien) |
| News-Artikel | uccelli-society.ch | ✅ 3 Artikel übernommen |
| Bilder | — | ⏳ Platzhalter — finale Bilder nachliefern |

---

## 14. Footer-Inhalte

(Unverändert — siehe v2.1. Korrekt implementiert mit Desktop-4-Spalten + Mobile-Akkordeon.)

---

## 15. Projektstruktur (Ist-Zustand)

```
uccelli-website/
├── middleware.ts                        # next-intl Locale-Routing
├── next.config.ts                       # 301-Redirects + withNextIntl()
├── i18n/request.ts                      # next-intl Request-Config
├── app/
│   ├── layout.tsx                       # Root (pass-through)
│   └── [locale]/
│       ├── layout.tsx                   # Font, Header, Footer, NextIntlClientProvider
│       ├── page.tsx                     # Homepage ✅
│       ├── skills4growth/page.tsx       # ✅
│       ├── programm/
│       │   ├── projekte/page.tsx        # Overview ✅
│       │   ├── veranstaltungen/page.tsx # ✅
│       │   ├── kursangebote/page.tsx    # ✅
│       │   └── news/page.tsx            # ✅
│       ├── netzwerk/page.tsx            # ✅
│       ├── ueber-uns/
│       │   ├── page.tsx                 # ✅
│       │   ├── vorstand/page.tsx        # ✅
│       │   ├── partner/page.tsx         # ✅
│       │   └── faq/page.tsx             # ✅
│       ├── kontakt/page.tsx             # ✅ (UI only)
│       └── werte/[slug]/page.tsx        # ✅ (6 Slugs)
├── components/
│   ├── layout/
│   │   ├── Header.tsx                   # ✅ Split Menu + Mobile
│   │   ├── Footer.tsx                   # ✅ Desktop Columns + Mobile Accordion
│   │   └── AttentionBanner.tsx          # ✅
│   ├── ui/
│   │   ├── Button.tsx                   # ✅
│   │   ├── Card.tsx                     # ✅
│   │   ├── PersonCard.tsx               # ✅
│   │   ├── Accordion.tsx                # ✅
│   │   └── ContactForm.tsx              # ✅ (UI only, no backend)
│   └── sections/
│       └── Hero.tsx                     # ✅ (3 Varianten)
├── lib/cn.ts                            # ✅
├── messages/
│   ├── de.json                          # ⚠️ Nur Homepage + Nav + Footer
│   └── en.json                          # ⚠️ Nur Homepage + Nav + Footer
├── public/
│   ├── fonts/ (Lato Regular + Bold)     # ✅
│   └── images/ (Platzhalter)            # ✅
├── styles/globals.css                   # ✅ Tailwind v4 @theme
├── collections/                         # ⏳ Leer (Payload nicht installiert)
├── docs/PRD.md                          # ✅
└── package.json                         # ✅
```

### Fehlende Dateien (Soll vs Ist)

| Datei | Zweck | Priorität |
|-------|-------|-----------|
| `app/[locale]/programm/projekte/[slug]/page.tsx` | Projekt-Detailseite | **Hoch** |
| `app/[locale]/programm/news/[slug]/page.tsx` | News-Detailseite | **Hoch** |
| `app/[locale]/datenschutz/page.tsx` | Datenschutzerklärung | **Hoch** |
| `app/[locale]/not-found.tsx` | Custom 404 | Mittel |
| `app/api/contact/route.ts` | Kontaktformular-Backend | Phase 3 |
| `components/layout/LanguageSwitcher.tsx` | DE/EN Toggle im Header | Mittel |
| `components/layout/CookieBanner.tsx` | Consent Management | Phase 3 |
| `components/ui/Map.tsx` | Leaflet/OSM | Phase 3 |
| `lib/animations.ts` | GSAP ScrollTrigger Utilities | Phase 4 |
| `payload.config.ts` | Payload CMS Konfiguration | Phase 3+ |

---

## 16. Entwicklungs-Phasen — Status

### Phase 1: Foundation ✅ ABGESCHLOSSEN
- [x] Next.js 16 Projekt-Setup mit App Router
- [x] `middleware.ts` für next-intl Locale-Routing
- [x] Tailwind v4 mit `@theme` (Brand-Farben, Accessibility-Tokens)
- [x] Font-Loading via `next/font/local` (Lato)
- [x] Komponenten: Button, Card, PersonCard, Accordion, ContactForm
- [x] Layout: Header (Split Menu), Footer, AttentionBanner
- [x] i18n-Setup mit next-intl (Basis)
- [x] Homepage (minimalistisch)
- [x] 301-Redirects in `next.config.ts`
- [ ] ~~Payload CMS Integration~~ → verschoben auf Phase 3+

### Phase 2: Seiten ✅ ABGESCHLOSSEN (mit Lücken)
- [x] Über uns + Vorstand
- [x] Projekte Overview
- [ ] **Projekt-Detailseiten** (`/projekte/[slug]`) ❌
- [x] Netzwerke (inkl. Nightshift Music)
- [x] Kursangebote
- [x] FAQ
- [x] Partner & Sponsoren
- [x] Kontaktseite (UI, ohne Leaflet-Karte)
- [x] Werte-Seiten (6x Standard Content)
- [x] News Overview
- [ ] **News-Detailseiten** (`/news/[slug]`) ❌
- [x] Skills4Growth
- [x] Veranstaltungen (mit Fallback-State)
- [ ] **Datenschutz-Seite** ❌
- [ ] **Custom 404** ❌
- [ ] **LanguageSwitcher** ❌

### Phase 3: Features & Compliance ⏳ ANSTEHEND
- [ ] Kontaktformular-Backend (API Route + Turnstile + Resend)
- [ ] React Hook Form + Zod Validierung
- [ ] Rate Limiting
- [ ] Cookie-Banner / Consent Management
- [ ] Datenschutzseite
- [ ] Leaflet/OpenStreetMap auf Kontaktseite
- [ ] Payload CMS Integration + Collections

### Phase 4: Animation & SEO ⏳ ANSTEHEND
- [ ] GSAP ScrollTrigger: Scroll-Reveals, Hero-Titel-Animation
- [ ] Framer Motion: Page Transitions
- [ ] CSS: Magnetic Buttons, Parallax
- [ ] `prefers-reduced-motion` Fallbacks
- [ ] SEO: Metadaten pro Seite, Sitemap, OpenGraph, JSON-LD, hreflang
- [ ] i18n-Ausbau: Alle Texte in de.json/en.json auslagern
- [ ] Accessibility-Audit

### Phase 5: Launch ⏳ ANSTEHEND
- [ ] Content-Finalisierung
- [ ] Bildaustausch (Platzhalter → finale Bilder)
- [ ] Cross-Browser Testing
- [ ] Performance-Audit
- [ ] Deployment auf Vercel
- [ ] DNS-Umstellung
- [ ] 301-Redirect-Monitoring (Google Search Console)

---

## 17. Offene Fragen

| # | Frage | Status |
|---|-------|--------|
| 1 | ~~Headless CMS~~ → **Payload CMS 3.x** gewählt | ✅ Entschieden |
| 2 | Soll das Kontaktformular E-Mails direkt versenden oder an ein CRM weiterleiten? | Offen |
| 3 | Hosting: Vercel, oder eigener Server? | Offen |
| 4 | Domain-Setup: Bleibt uccelli-society.ch? | Offen |
| 5 | Skills4Growth: Ist das dasselbe wie LifeLab, oder ein separates Programm? | Offen |
| 6 | Consent Management: Cookiebot oder Usercentrics? | Offen |
| 7 | Analytics: Wird ein Analytics-Tool benötigt? (Plausible/Umami empfohlen) | Offen |
| 8 | Nightshift Music: Eigene Detailseite, oder nur Abschnitt auf Netzwerk? | Offen |
| 9 | Payload CMS: Datenbank (MongoDB vs PostgreSQL)? | Offen |
| 10 | Soll die Datenschutzseite von einem Anwalt geprüft werden? | Offen |

---

## 18. Anhang: Gelieferte Design-Assets

(Unverändert — siehe v2.1)

### Komponenten (PDF)
00_Uccelli Brand Kit, 01_Buttons, 02_Header, 03_Footer, 04_Hero, 05_Attention Banner, 06_Card, 07_Card_Person

### Page Templates (JPG/PNG)
Template_Über-uns, Template_Aktuelles-Projekt, Template_Contact-us_Desktop, Template_Contact-us_Mobile, Template_FAQ, Template_Kursangebote, Template_Netzwerke, Template_Partner-und-Sponsoren, Template_Projekte-Overview, Template_Standard-Content, Template_Team_Seite
