# PRD – Uccelli Society Website Redesign

**Version:** 5.0  
**Datum:** 29. Juni 2026  
**Auftraggeber:** Verein Uccelli  
**Aktuell:** https://uccelli-society.ch (WordPress)  
**Repository:** https://github.com/KarmaKami994/uccelli-website.git  
**Hosting:** Hosttech (bestehender Hoster)

**Changelog v5.0:** SponsorBanner, Mobile-Nav-Fix, Unit Tests (34 Tests/7 Dateien), Payload importMap komplett (32 Einträge), FixedToolbarFeature, LexicalRenderer für Rich-Text-Anzeige, PersonCard mit Bio-Modal, resolveImageUrl, COMMANDS.md, Collections auf richText umgestellt  
**Changelog v4.0:** Phase 3+4 abgeschlossen, SQLite, Kontaktformular, Leaflet, CookieBanner, GSAP, JSON-LD, Sitemap  
**Changelog v3.0:** Gap-Analyse, fehlende Deliverables  
**Changelog v2.0:** Option E, SEO-Redirects, Consent, Farbkontrast, OpenStreetMap

---

## 1. Projektzusammenfassung

Kompletter Neubau der Uccelli Society Website als React/Next.js-Applikation mit Payload CMS. Migration von WordPress mit 301-Redirect-Mapping.

---

## 2. Technologie-Stack

| Ebene | Technologie | Version | Status |
|-------|-------------|---------|--------|
| Framework | Next.js (App Router) | 16.2.9 | ✅ |
| UI | React + TypeScript | 19.2.4 | ✅ |
| Styling | Tailwind CSS | 4.3.1 | ✅ |
| Animation | Framer Motion | 12.41.0 | ✅ Eingesetzt |
| Animation | GSAP + ScrollTrigger | 3.15.0 | ✅ Eingesetzt |
| i18n | next-intl | 4.13.0 | ✅ 13/16 Seiten |
| CMS | Payload CMS | 3.85.1 | ✅ Installiert + konfiguriert |
| Datenbank | SQLite (@payloadcms/db-sqlite) | — | ✅ |
| Rich Text | Lexical + FixedToolbarFeature | — | ✅ Toolbar sichtbar |
| Formulare | React Hook Form + Zod | — | ✅ |
| E-Mail | Resend | — | ✅ (API-Key in .env) |
| Spam-Schutz | Cloudflare Turnstile | — | ✅ |
| Karten | Leaflet + OpenStreetMap | — | ✅ |
| Consent | CookieBanner (custom) | — | ✅ |
| SEO | next-sitemap + JSON-LD | — | ✅ |
| Tests | Vitest + React Testing Library | 4.1.9 | ✅ 34 Tests |
| Fonts | next/font/local (Lato) | — | ✅ |
| Hosting | Hosttech | — | ⏳ Deployment |

---

## 3. Komponenten-Bibliothek (20 Komponenten)

| Komponente | Datei | Status |
|------------|-------|--------|
| AttentionBanner | `components/layout/AttentionBanner.tsx` | ✅ |
| Header (Split Menu) | `components/layout/Header.tsx` | ✅ Desktop + Mobile |
| Footer | `components/layout/Footer.tsx` | ✅ Desktop Columns + Mobile Accordion |
| LanguageSwitcher | `components/layout/LanguageSwitcher.tsx` | ✅ DE \| EN |
| CookieBanner | `components/layout/CookieBanner.tsx` | ✅ nDSG-konform |
| PageTransition | `components/layout/PageTransition.tsx` | ✅ Framer Motion |
| JsonLd | `components/layout/JsonLd.tsx` | ✅ Organization + FAQPage |
| Hero (3 Varianten) | `components/sections/Hero.tsx` | ✅ gradient, split, cutout |
| **SponsorBanner** | `components/sections/SponsorBanner.tsx` | ✅ NEU |
| Button | `components/ui/Button.tsx` | ✅ |
| Card | `components/ui/Card.tsx` | ✅ |
| PersonCard | `components/ui/PersonCard.tsx` | ✅ Klickbar mit Bio-Modal |
| Accordion | `components/ui/Accordion.tsx` | ✅ |
| ContactForm | `components/ui/ContactForm.tsx` | ✅ RHF + Zod |
| Map (Leaflet/OSM) | `components/ui/Map.tsx` | ✅ |
| MapLoader (SSR-safe) | `components/ui/MapLoader.tsx` | ✅ |
| ScrollReveal (GSAP) | `components/ui/ScrollReveal.tsx` | ✅ |
| StaggerReveal (GSAP) | `components/ui/StaggerReveal.tsx` | ✅ |
| **LexicalRenderer** | `components/ui/LexicalRenderer.tsx` | ✅ NEU — Client-seitiger Rich-Text Renderer |
| RichTextRenderer | `components/ui/RichTextRenderer.tsx` | ✅ Server-seitig (für statische Seiten) |

---

## 4. Seitenübersicht (20 Routen)

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

## 5. Payload CMS

### Collections (9)

| Collection | Felder | richText | Seiten |
|------------|--------|----------|--------|
| projects | title, slug, category, summary, body, image, locale, featured | body | Projekte |
| posts | title, slug, date, summary, body, image, locale | body | News |
| events | title, date, endDate, location, description, image, locale | description | Events |
| team-members | name, role, **bio**, image, order | **bio** ✅ | Vorstand |
| partners | name, type, **description**, logo, url, socials | **description** ✅ | Partner |
| faqs | question, **answer**, order, locale | **answer** ✅ | FAQ |
| pages | title, slug, body, locale | body | Statische Seiten |
| media | alt (upload: image/*, pdf) | — | Medien |
| users | email, name, role (auth) | — | Auth |

### Admin Panel

- **URL:** `/admin`
- **Editor:** Lexical mit **FixedToolbarFeature** (sichtbare Toolbar)
- **importMap:** 32 Einträge (9 RSC + 23 Client Features) — manuell befüllt wegen Node 24 ESM-Inkompatibilität mit `generate:importmap`
- **Datenbank:** SQLite (`uccelli.db` im Projektroot)

### Data Layer

- `lib/payload.ts` — Payload Client Helper mit `fetchCollection()` und `fetchBySlug()`
- `lib/data.ts` — Payload-first Datenzugriff mit statischem Fallback
- `resolveImageUrl()` — Extrahiert URLs aus Payload Media-Relationen
- 5 Seiten angebunden: Vorstand, FAQ, Partner, News, Events

---

## 6. Tests

| Datei | Tests | Komponente |
|-------|-------|------------|
| button.test.tsx | 8 | Button (Varianten, Sizes, Link/Button, disabled) |
| card.test.tsx | 5 | Card (Render, Button, Image, Placeholder) |
| person-card.test.tsx | 6 | PersonCard (Render, Image, Initial, Bio-Modal) |
| accordion.test.tsx | 5 | Accordion (Render, Open/Close, Single-Open) |
| contact-form.test.tsx | 3 | ContactForm (Fields, Submit-Button) |
| language-switcher.test.tsx | 3 | LanguageSwitcher (DE/EN, Active, Links) |
| sponsor-banner.test.tsx | 4 | SponsorBanner (Title, Names, Links) |
| **Total** | **34** | **7 Dateien, alle grün** |

---

## 7. Entwicklungs-Phasen

### Phase 1: Foundation ✅
Next.js 16, Tailwind v4, i18n, Font-Loading, Komponenten, Layout, Homepage, 301-Redirects

### Phase 2: Seiten ✅
17 Frontend-Seiten, LanguageSwitcher, 404, Datenschutz, SEO-Metadaten (16/16)

### Phase 3: Features & Compliance ✅
Kontaktformular (RHF + Zod + Turnstile + Resend + Rate Limiting), Leaflet/OSM, CookieBanner, Payload CMS + SQLite, SponsorBanner

### Phase 4: Animation & SEO ✅
GSAP ScrollReveal/StaggerReveal, PageTransition, JSON-LD, Sitemap, i18n-Ausbau (13/16)

### Phase 5: Polish & Bugfixes ✅
Mobile-Nav-Fix, Unit Tests (34), Payload importMap (32 Einträge), FixedToolbar, LexicalRenderer, PersonCard Bio-Modal, resolveImageUrl, richText Collections, COMMANDS.md

### Phase 6: Launch ⏳ ANSTEHEND
- [ ] Finale Bilder ersetzen (Platzhalter → echte Fotos)
- [ ] Content in Payload CMS pflegen (Team, Partner, FAQ, News, Events)
- [ ] Hosttech Deployment konfigurieren (Node.js Hosting oder Docker)
- [ ] Domain uccelli-society.ch → neues Hosting umstellen
- [ ] SSL-Zertifikat konfigurieren
- [ ] 301-Redirect-Monitoring (Google Search Console)
- [ ] Performance-Audit (Lighthouse)
- [ ] Accessibility-Audit (axe-core)
- [ ] Cross-Browser Testing

---

## 8. Offene Fragen

| # | Frage | Status |
|---|-------|--------|
| 1 | CMS → Payload 3.85 + SQLite | ✅ |
| 2 | Hosting → Hosttech | ✅ Entschieden |
| 3 | Domain: Bleibt uccelli-society.ch? | Offen |
| 4 | Hosttech: Node.js Hosting verfügbar, oder Docker/VPS nötig? | Offen |
| 5 | Finale Bilder: Wann werden sie geliefert? | Offen |
| 6 | Analytics: Plausible/Umami? | Offen |
| 7 | Node 24 → 22 LTS downgrade für Payload CLI Kompatibilität? | Empfohlen |

---

## 9. Dokumentation

| Datei | Inhalt |
|-------|--------|
| `docs/PRD.md` | Dieses Dokument — Projekt-Spezifikation |
| `docs/COMMANDS.md` | Befehls-Referenz (npm, Payload, Git, Troubleshooting) |
| `.env.example` | Umgebungsvariablen-Template |
| `README.md` | Quick-Start-Anleitung |
