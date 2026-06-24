# PRD – Uccelli Society Website Redesign

**Version:** 2.1  
**Datum:** 24. Juni 2026  
**Auftraggeber:** Verein Uccelli  
**Aktuell:** https://uccelli-society.ch (WordPress)  
**Repository:** https://github.com/KarmaKami994/uccelli-website.git  
**Changelog v2.1:** Payload CMS 3.x als Headless CMS gewählt, Collections definiert, Projektstruktur angepasst  
**Changelog v2.0:** Three.js entfernt (Option E gewählt), SEO-Redirect-Mapping ergänzt, Consent Management (nDSG), Farbkontrast-Fix, INP statt FID, middleware.ts, OpenStreetMap statt Google Maps, Spam-Schutz, Nightshift-Konsistenz, Split-Menu-Hinweis, Font-Loading, Footer-Umbenennung

---

## 1. Projektzusammenfassung

Kompletter Neubau der Uccelli Society Website als moderne React/Next.js-Applikation. Die aktuelle WordPress-Seite wird durch eine performante, mehrsprachige Architektur mit zeitgemässem Design ersetzt, die auf dem vordefinierten Brand Kit und den gelieferten Figma/Canva-Templates basiert. Die Migration beinhaltet ein vollständiges 301-Redirect-Mapping aller bestehenden WordPress-URLs, um das bestehende SEO-Ranking zu erhalten.

---

## 2. Technologie-Stack

| Ebene | Technologie | Begründung |
|-------|-------------|------------|
| Framework | **Next.js 14+ (App Router)** | SSR/SSG, Image Optimization, i18n-Routing |
| UI | **React 18+** | Komponentenbasiert, riesiges Ökosystem |
| Styling | **Tailwind CSS** | Utility-first, schnelles Prototyping, responsive |
| Animation | **GSAP + Framer Motion** | Scroll-Animationen, Page Transitions, Text-Reveals |
| i18n | **next-intl** | Mehrsprachig mit URL-basiertem Routing + Middleware |
| CMS | **Payload CMS 3.x** | TypeScript-native, läuft direkt im Next.js-Prozess, Admin-UI integriert |
| Formulare | **React Hook Form + Zod + Resend** | Validierung + E-Mail-Versand |
| Spam-Schutz | **Cloudflare Turnstile** | Bot-Schutz für Kontaktformular (DSGVO-freundlich) |
| Karten | **Leaflet + OpenStreetMap** | Leichtgewichtig, kein API-Key, keine Tracking-Cookies |
| Consent | **Cookiebot oder Usercentrics** | Cookie-Banner nach nDSG / revFADP |
| Fonts | **next/font/local (Lato)** | Lokal geladen, kein Google-Fonts-Tracking |
| Deployment | **Vercel** | Optimiert für Next.js, Edge Functions |

---

## 3. Design-System (aus Brand Kit)

### 3.1 Farben

| Rolle | Hex | Verwendung |
|-------|-----|------------|
| Primary | `#000000` | Texte, Hintergründe, Buttons |
| White | `#FFFFFF` | Hintergründe, Texte auf Schwarz |
| Accent | `#5170FF` | CTA-Buttons, Highlights, Hover-States |

**⚠️ Accessibility-Hinweis:** `#5170FF` auf Weiss ergibt ein Kontrastverhältnis von **4.07:1**. Das ist unterhalb des WCAG AA-Standards für normalen Text (4.5:1 erforderlich). Massnahmen:

- **Buttons (18px+ / Bold):** `#5170FF` ist erlaubt (Grosser Text braucht nur 3:1)
- **Kleine Links / Fliesstext:** Stattdessen `#3D5BD9` verwenden (angepasstes Dunkelblau, Kontrast ~5.2:1 auf Weiss)
- **Auf schwarzem Hintergrund:** `#5170FF` ist unproblematisch (Kontrast > 5:1)
- Tailwind-Config: `accent: '#5170FF'` und `accent-accessible: '#3D5BD9'` als separate Tokens definieren

### 3.2 Typografie

| Element | Font | Grösse | Gewicht |
|---------|------|--------|---------|
| H1 | Lato | 32pt (2rem) | Bold (700) |
| H2 | Lato | 24pt (1.5rem) | Regular (400) |
| H3 | Lato | 18pt (1.125rem) | Regular (400) |
| Body | Lato | 16px (1rem) | Regular (400) |
| Buttons | Lato | 16pt (1rem) | Bold (700), UPPERCASE |

**Font-Loading:** Lato wird lokal über `next/font/local` geladen (nicht via Google Fonts CDN). Konfiguration in `app/layout.tsx`:

```typescript
import localFont from 'next/font/local';
const lato = localFont({
  src: [
    { path: '../public/fonts/Lato-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Lato-Bold.woff2', weight: '700' },
  ],
  variable: '--font-lato',
  display: 'swap',
});
```

### 3.3 Buttons

Drei Varianten, alle mit abgerundeten Ecken (~12px border-radius):

- **Primary (Schwarz):** Schwarzer Hintergrund, weisser Text
- **Secondary (Outline):** Weisser Hintergrund, schwarzer Rand, schwarzer Text
- **Accent (Blau):** `#5170FF` Hintergrund, weisser Text (nur für grossformatige CTAs)

Auf dunklem Hintergrund invertiert: weisser Fill oder weisser Outline.

### 3.4 Komponenten-Bibliothek

| Komponente | Beschreibung |
|------------|-------------|
| **Attention Banner** | Schwarzer Balken über dem Header, Event-Name + Datum, Carousel-Slide-Effekt |
| **Header (Desktop)** | **Split Menu** – Zentriertes Logo, Menü links: Skills4Growth, Programm — rechts: Netzwerk, Über uns, Kontakt. **Technischer Hinweis:** Das Logo muss `position: absolute; left: 50%; transform: translateX(-50%)` erhalten, damit es exakt zentriert bleibt und nicht durch unterschiedlich breite Menüpunkte links/rechts verschoben wird. Die Navigation nutzt Flexbox mit drei Sektionen: `nav-left (flex:1, justify-end)`, `logo (position:absolute)`, `nav-right (flex:1, justify-start)`. |
| **Header (Mobile)** | Hamburger links, Logo rechts, Fullscreen-Menü mit Akkordeon-Sub-Menüs |
| **Hero** | 3 Varianten: (1) Fullscreen-Gradient, (2) Titel + Bild, (3) Schwarz/Weiss Cutout-Effekt |
| **Card** | Bild oben, Titel, Body, Button — schwarzer 1px-Rand, abgerundete Ecken |
| **Person Card** | Porträtbild, Name (zentriert, Bold), Rolle (zentriert) — kein Rand |
| **FAQ Akkordeon** | Frage mit Chevron, aufklappbar, animiert |
| **Cookie Banner** | Consent-Banner nach nDSG (siehe Abschnitt 9) |
| **Footer (Mobile)** | Schwarzer Hintergrund, Akkordeon-Sektionen: Kontakt, Unsere Werte, Unterstütze Uns, Download, Social Icons, Copyright |
| **Footer (Desktop)** | Schwarzer Hintergrund, Multi-Column-Layout mit allen Sektionen nebeneinander |

---

## 4. Informationsarchitektur & Navigation

### 4.1 Desktop-Navigation (Split Menu / zentriertes Logo)

```
Skills4Growth    Programm    |  🐦 UCCELLI  |    Netzwerk    Über uns    Kontakt
```

### 4.2 Mobile Navigation (Hamburger-Menü)

```
Home
Skills4Growth
Programm          ▾
  ├─ Projekte
  ├─ Veranstaltungen
  ├─ Kursangebote
  └─ News
Netzwerk          ▾
  ├─ Uccelli Women
  ├─ Uccelli Ghana
  ├─ Uccelli FC
  └─ Nightshift Music
Über uns          ▾
  ├─ Vorstand
  ├─ Formular
  ├─ Partner/Sponsoren
  └─ FAQ
Kontakt
```

### 4.3 URL-Struktur (mit i18n-Prefix)

```
/[locale]/                          → Homepage
/[locale]/skills4growth             → Skills4Growth (LifeLab)
/[locale]/programm/projekte         → Projekte Overview
/[locale]/programm/projekte/[slug]  → Einzelnes Projekt
/[locale]/programm/veranstaltungen  → Event-Kalender
/[locale]/programm/kursangebote     → Kursangebote
/[locale]/programm/news             → News-Blog
/[locale]/programm/news/[slug]      → Einzelner News-Artikel
/[locale]/netzwerk                  → Netzwerke Overview
/[locale]/ueber-uns                 → Über uns
/[locale]/ueber-uns/vorstand        → Team / Vorstand
/[locale]/ueber-uns/partner         → Partner & Sponsoren
/[locale]/ueber-uns/faq             → FAQ
/[locale]/kontakt                   → Kontaktseite
/[locale]/werte/[slug]              → Werte-Seiten (Datenschutz, Solidarität etc.)
```

---

## 5. Seitenübersicht & Templates

### 5.1 Homepage (minimalistisch)

| Sektion | Inhalt |
|---------|--------|
| **Attention Banner** | Aktuelles Event mit Datum, Carousel |
| **Hero** | Fullscreen, grosser Titel „UCCELLI SOCIETY", Claim „Gemeinschaft. Integrität. Generativität.", CTA-Button |
| **Über uns Teaser** | Kurztext Vereinsziel, Button → Über uns |
| **Hauptaufgaben** | 3 Cards: Bildung, Soziales, Community |
| **Aktuelle Projekte** | 2–3 Projekt-Cards mit Bild, Titel, Teaser |
| **CTA / Kontakt** | Einfacher CTA-Block mit Button → Kontaktseite |
| **Footer** | Vollständiger Footer |

### 5.2 Über uns

Template: `Template_Über-uns.jpg`

- Hero: „ÜBER UNS" (Cutout-Stil mit blauem Highlight)
- „Wie alles begann" – Vereinsgeschichte
- Mission & Vision (Cards auf Bildhintergrund)
- „Hinter jeder Vision stehen Menschen" → Button „DER VORSTAND"
- „Für alle, die gemeinsam wachsen möchten" – Leittext
- „Unsere Säulen" – Alternierende Cards mit Bildern:
  - Schutz der Umwelt, Datenschutz, Diskriminierungsverbot, Freiheit und Autonomie, Solidarität und Kohäsion
  - Jede mit „MEHR ERFAHREN" Button → Werte-Seite

### 5.3 Der Vorstand (Team)

Template: `Template_Team_Seite.jpg`

- Hero: „DER VORSTAND" (Cutout-Stil)
- Person Cards (S/W-Fotos): ATO (Vereinspräsident), HATICE (Head of Project Management), KARIM (Head of IT)

### 5.4 Projekte Overview

Template: `Template_Projekte-Overview.jpg`

- Hero: „PROJEKTE" (Gradient-Stil)
- Intro: „Gemeinsam wachsen, lernen und vernetzen"
- Drei Kategorien mit farbcodierten Sektionen:
  - **Sozialprojekte** (weiss) – Cards
  - **Bildungsprojekte** (blau `#5170FF`) – Cards
  - **Gemeinschaftsprojekte** (weiss) – Cards

### 5.5 Einzelnes Projekt

Template: `Template_Aktuelles-Projekt.jpg`

- Hero: Projekttitel auf Schwarz (z.B. „LifeLab – KOMPETENZEN FÜRS LEBEN")
- Langer Fliesstext mit eingebetteten Bildern
- Kontaktinformationen am Ende

### 5.6 Netzwerke

Template: `Template_Netzwerke.jpg`

- Hero: „NETZWERKE" (weisser Hintergrund)
- Intro: „Menschen. Ideen. Möglichkeiten."
- Sub-Gruppen, alternierend Schwarz/Weiss:
  - **Uccelli Ghana** (schwarz) – Logo + Beschreibung
  - **Uccelli Women** (weiss) – Logo + Beschreibung
  - **Uccelli FC** (schwarz) – Logo + Beschreibung
  - **Nightshift Music** (weiss) – Logo + Beschreibung: Konzert- und Musikplattform, die neuen Artists eine Bühne bietet

### 5.7 Kursangebote

Template: `Template_Kursangebote.jpg`

- Hero: „KURS ANGEBOTE" (Cutout-Stil)
- Intro: „Lernen. Wachsen. Vernetzen."
- Kategorie-Buttons auf schwarzem Hintergrund:
  - KURSE ZU PSYCHOLOGIE
  - KURSE ZU SPORT
  - KURSE ZU FINANZEN

### 5.8 FAQ

Template: `Template_FAQ.jpg`

- Hero: „FAQ" mit Subtitle „Wir sind da um zu helfen!"
- Akkordeon-Items (Q1–Q7), aufklappbar

### 5.9 Partner & Sponsoren

Template: `Template_Partner-und-Sponsoren.jpg`

- Hero: „PARTNER & SPONSOREN" (Cutout-Stil)
- Intro: „Gemeinsam Grosses Erreichen"
- **Partner** (grauer Hintergrund): GZ Höngg, Royal Studio, Anker Swiss AG
- **Sponsoren** (schwarzer Hintergrund): Hosttech GmbH, GymOne, Fröhliche Info

### 5.10 Kontakt

Template: `Template_Contact-us_Desktop.png` + `Template_Contact-us_Mobile.jpg`

- Titel: „Get in Touch with Us"
- Formular: Name, Email, Subject, Message, SENDEN-Button + Turnstile-Widget
- Adresse: Riedhofstrasse 364, 8049 Zürich, Schweiz
- E-Mail: Uccelli.society@gmail.com
- Social Icons: LinkedIn, Instagram, Facebook, Website
- **OpenStreetMap-Karte** via Leaflet (kein Google Maps → kein API-Key, keine Tracking-Cookies, keine Consent-Probleme). Lazy-loaded bei Sichtbarkeit.

### 5.11 Standard Content (Werte-Seiten)

Template: `Template_Standard-Content.jpg`

- Einfacher Titel + Trennlinie + Fliesstext
- Verwendet für: Werte-/Philosophie-Seiten (Datenschutz, Freiheit und Autonomie, Solidarität und Kohäsion, Schutz der Umwelt, Diskriminierungsverbot, Integrität)

### 5.12 News-Blog (kein Template – neu)

- Listenansicht mit Cards (Bild, Datum, Titel, Teaser, „Weiterlesen")
- Einzelansicht mit Artikel-Content

### 5.13 Event-Kalender (kein Template – neu)

- Listenansicht anstehender Events
- „Keine anstehenden Veranstaltungen" Fallback

---

## 6. Mehrsprachigkeit (i18n)

### Strategie

- **Framework:** `next-intl` mit URL-basiertem Routing (`/de/`, `/en/`, etc.)
- **Standardsprache:** Deutsch (`de`)
- **Initial:** Deutsch + Englisch
- **Erweiterbar:** Französisch, Italienisch, etc. durch Hinzufügen von Translations-Dateien
- **Sprachumschalter:** Im Header, minimalistisch (DE | EN)
- **Content:** Alle Texte in JSON-Translations-Dateien, Seitenstrukturen sprachunabhängig

### Middleware (Pflicht für App Router)

`next-intl` im App Router erfordert eine `middleware.ts` im Projekt-Root, die das Locale aus der URL extrahiert, Default-Redirects handhabt und nicht-lokalisierte Pfade weiterleitet:

```typescript
// middleware.ts (Root-Verzeichnis)
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localePrefix: 'as-needed' // /de/ wird weggelassen für Default
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

### Ordnerstruktur

```
/messages/
  de.json
  en.json
  fr.json  (später)
```

---

## 7. Interaktive Features

### 7.1 Kontaktformular

- Felder: Name, E-Mail, Betreff, Nachricht
- Validierung: Client-seitig (React Hook Form + Zod)
- **Spam-Schutz:** Cloudflare Turnstile Widget (unsichtbar oder managed) – DSGVO-konform, kein reCAPTCHA nötig. Alternativ: hCaptcha. Token wird im API-Route serverseitig verifiziert.
- Backend: Next.js API Route → Token-Verifikation → E-Mail via Resend an uccelli.society@gmail.com
- Rate Limiting: Max 5 Anfragen pro IP / 15 Minuten (via Vercel Edge Middleware oder Upstash)
- Feedback: Erfolgs-/Fehlermeldung nach Absenden

### 7.2 Event-Kalender

- Listenansicht kommender Events
- Quelle: Payload CMS (Collection: `events`)
- Fallback: „Keine anstehenden Veranstaltungen"

### 7.3 News-Blog

- Artikel-Übersicht mit Pagination
- Einzelartikel mit Rich-Text-Content
- Quelle: Payload CMS (Collection: `posts`)

---

## 8. Animation & Motion (Option E – CSS + GSAP)

### Entscheidung

Kein Three.js. Stattdessen hochwertige 2D-Animationen mit GSAP und Framer Motion für beste Performance, Zugänglichkeit und Wartbarkeit.

### Animationskonzept

| Element | Animation | Technologie |
|---------|-----------|-------------|
| **Hero-Titel** | Buchstaben-Reveal (staggered, von unten einslidend) | GSAP SplitText |
| **Scroll-Reveals** | Sektionen faden bei Scroll ein (opacity + translateY) | GSAP ScrollTrigger |
| **Page Transitions** | Sanfter Crossfade zwischen Seiten | Framer Motion AnimatePresence |
| **Cards** | Hover: leichter Scale (1.02) + Shadow | CSS transitions |
| **Buttons** | Magnetic Effect (Button folgt dem Cursor leicht) | GSAP mit Mouse-Events |
| **Attention Banner** | Automatischer Slide-Effekt (Carousel) | CSS @keyframes oder Framer Motion |
| **FAQ Akkordeon** | Smooth Height-Animation beim Öffnen/Schliessen | Framer Motion layout |
| **Navigation** | Mobile Menu: Slide-in mit staggered Items | Framer Motion |
| **Parallax** | Subtiler Parallax-Effekt auf Hero-Bildern | GSAP ScrollTrigger |
| **Text-Highlight** | Cutout-Titel-Effekt (Schwarz/Weiss) per CSS mix-blend-mode | Reines CSS |

### Reduced Motion

Alle Animationen werden in `@media (prefers-reduced-motion: reduce)` deaktiviert oder auf einfache Opacity-Fades reduziert. GSAP-Instanzen prüfen `matchMedia` und überspringen Animationen entsprechend.

---

## 9. Datenschutz & Consent Management (nDSG)

### Rechtlicher Hintergrund

Das revidierte Schweizer Datenschutzgesetz (revFADP / nDSG, seit 1.9.2023) verlangt bei Verwendung von nicht-essentiellen Cookies eine informierte Einwilligung. Auch die DSGVO gilt, sofern EU-Bürger die Website nutzen.

### Massnahmen

| Thema | Lösung |
|-------|--------|
| **Cookie-Banner** | Integration von Cookiebot oder Usercentrics als Consent-Management-Plattform (CMP). Banner erscheint beim ersten Besuch mit: „Akzeptieren / Ablehnen / Einstellungen". |
| **Google Maps entfernt** | Durch OpenStreetMap (Leaflet) ersetzt – setzt keine Tracking-Cookies, benötigt keinen Consent |
| **Google Fonts entfernt** | Lato wird lokal via `next/font/local` geladen – kein Datenabfluss an Google |
| **Kontaktformular** | Cloudflare Turnstile statt Google reCAPTCHA – DSGVO-konformer Bot-Schutz |
| **Analytics (falls gewünscht)** | Plausible Analytics oder Umami empfohlen (Cookie-frei, EU-hosted). Erst nach Consent laden, falls Cookie-basiert. |
| **Datenschutzseite** | Eigene Seite unter `/[locale]/datenschutz` mit Informationen zu Datenverarbeitung, Cookies, Rechten |
| **Social Media Embeds** | Social Icons verlinken nur (kein Tracking-Embed). Falls Social Feeds eingebettet werden, erst nach Consent laden (2-Click-Lösung). |

### Consent-Flow

1. Besucher öffnet die Seite → CMP-Banner wird angezeigt
2. Essenzielle Cookies (Session, Sprache) sind immer aktiv
3. Nicht-essenzielle Scripts (Analytics, ggf. Tracking) werden erst nach „Akzeptieren" geladen
4. Präferenz wird im CMP-Cookie gespeichert (12 Monate gültig)

---

## 10. SEO & WordPress-Migration

### 301-Redirect-Mapping

Beim Umzug von WordPress auf Next.js ändern sich alle URLs. Um das bestehende Google-Ranking zu erhalten, müssen alle alten URLs per 301-Redirect auf die neuen Pfade weitergeleitet werden. Die Redirects werden in `next.config.ts` konfiguriert:

| Alte WordPress-URL | Neue Next.js-URL |
|--------------------|------------------|
| `/` | `/de` |
| `/ueber-die-uccelli-familie/` | `/de/ueber-uns` |
| `/team-4-cols-v2/` | `/de/ueber-uns/vorstand` |
| `/team/ato-akrofi-vorstandsmitglied/` | `/de/ueber-uns/vorstand` |
| `/team/karim-moutiq-vorstandsmitglied/` | `/de/ueber-uns/vorstand` |
| `/team/hatice-aksuet/` | `/de/ueber-uns/vorstand` |
| `/practice-areas/` | `/de/ueber-uns` |
| `/practice/schutz-der-umwelt/` | `/de/werte/schutz-der-umwelt` |
| `/practice/datenschutz/` | `/de/werte/datenschutz` |
| `/practice/diskriminierungsverbot/` | `/de/werte/diskriminierungsverbot` |
| `/practice/freiheit-und-autonomie/` | `/de/werte/freiheit-und-autonomie` |
| `/practice/solidaritaet-und-kohaesion/` | `/de/werte/solidaritaet-und-kohaesion` |
| `/practice/integritaet/` | `/de/werte/integritaet` |
| `/aktive-projekte/` | `/de/programm/projekte` |
| `/lifelab-kompetenzen-fuers-leben/` | `/de/skills4growth` |
| `/skills4growth/` | `/de/skills4growth` |
| `/events/` | `/de/programm/veranstaltungen` |
| `/kursangebote/` | `/de/programm/kursangebote` |
| `/unser-netzwerk-im-ueberblick/` | `/de/netzwerk` |
| `/partner/` | `/de/ueber-uns/partner` |
| `/unsere-projekte/` | `/de/programm/news` |
| `/contact/` | `/de/kontakt` |
| `/faq/` | `/de/ueber-uns/faq` |
| `/formulare/` | `/de/ueber-uns` |
| `/konzertreihe-nightshift-music/` | `/de/programm/projekte/nightshift-music` |
| `/en/` | `/en` |
| `/en/*` | Äquivalente englische Route |

### Weitere SEO-Massnahmen

- **Sitemap:** Automatisch generiert via `next-sitemap`
- **Meta-Tags:** OpenGraph + Twitter Cards pro Seite
- **Structured Data:** JSON-LD für Organisation, Events, FAQ
- **Canonical URLs:** Pro Seite + pro Sprache (`hreflang`)
- **robots.txt:** Konfiguriert über `next.config.ts`
- **404-Seite:** Custom 404 mit Suchvorschlägen

---

## 11. Performance-Ziele

| Metrik | Ziel |
|--------|------|
| Lighthouse Performance | > 90 |
| LCP (Largest Contentful Paint) | < 2.5s |
| **INP (Interaction to Next Paint)** | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Bundle-Grösse (JS) | < 150KB gzipped |
| TTFB (Time to First Byte) | < 600ms |

---

## 12. Accessibility (WCAG 2.1 AA)

| Bereich | Anforderung |
|---------|-------------|
| Farbkontrast | Alle Texte erfüllen 4.5:1 (normaler Text) bzw. 3:1 (grosser Text). `#5170FF` nur für Buttons/Badges (≥18px Bold). Für kleine Links: `#3D5BD9`. |
| Tastaturnavigation | Alle interaktiven Elemente fokussierbar, sichtbarer Focus-Ring |
| Screenreader | Semantisches HTML, ARIA-Labels wo nötig, `alt`-Texte für alle Bilder |
| Reduced Motion | `prefers-reduced-motion` wird überall respektiert |
| Formulare | Labels korrekt verknüpft, Fehlermeldungen im ARIA-Live-Bereich |
| Sprache | `lang`-Attribut auf `<html>` korrekt gesetzt pro Locale |

---

## 13. Content-Übernahme

### Von der aktuellen Website übernehmen

- Alle Texte der Startseite (Vereinsziel, Hauptaufgaben, Team-Beschreibungen)
- Projekt-Beschreibungen (LifeLab, Skills4Growth, Nightshift Music, Uccelli Liga)
- Partner-Zitate und Testimonials
- Team-Informationen (Ato, Hatice, Karim)
- Kontaktinformationen und Spendenangaben
- Partner- und Sponsoren-Beschreibungen
- Netzwerk-Beschreibungen (Uccelli Ghana, Women, FC, Nightshift Music)
- FAQ-Inhalte
- News-Artikel
- Vereinsstatuten (PDF-Download)

### Bilder

- Platzhalterbilder werden eingesetzt
- Finale Bilder werden vom Auftraggeber nachgeliefert und ersetzt

---

## 14. Footer-Inhalte

### Sektionen

**KONTAKT:** FAQ-Link, E-Mail-Link, „Finde uns hier"-Link

**UNSERE WERTE** (umbenannt von „Rechtliches"): Schutz der Umwelt, Datenschutz, Diskriminierungsverbot, Freiheit und Autonomie, Solidarität und Kohäsion, Integrität  
*Hinweis: Die Seiten unter diesem Menüpunkt sind Philosophie-/Werte-Seiten des Vereins, nicht rein rechtliche Dokumente. Die URL-Struktur `/werte/[slug]` spiegelt dies korrekt wider.*

**UNTERSTÜTZE UNS:** Spendeninfos + QR-Code
- Empfänger: Verein Uccelli
- Konto Nr: 1148-5358.899
- IBAN: CH53 0070 0114 8053 5889 9

**DOWNLOAD:** Vereinsstatuten (PDF)

**SOCIALS:** LinkedIn, Instagram, Facebook

**Copyright:** Uccelli Bird-Icon + „Copyright © 2026"

---

## 15. Projektstruktur (Next.js)

```
uccelli-website/
├── middleware.ts                        # ⚠️ PFLICHT: next-intl Locale-Routing
├── payload.config.ts                   # Payload CMS Konfiguration
├── app/
│   ├── (frontend)/                     # Route Group: Öffentliche Website
│   │   └── [locale]/
│   │       ├── page.tsx                # Homepage
│   │       ├── layout.tsx              # Root Layout (Font-Loading, Header/Footer)
│   │       ├── skills4growth/page.tsx
│   │       ├── programm/
│   │       │   ├── projekte/
│   │       │   │   ├── page.tsx        # Projekte Overview
│   │       │   │   └── [slug]/page.tsx # Einzelnes Projekt
│   │       │   ├── veranstaltungen/page.tsx
│   │       │   ├── kursangebote/page.tsx
│   │       │   └── news/
│   │       │       ├── page.tsx
│   │       │       └── [slug]/page.tsx
│   │       ├── netzwerk/page.tsx
│   │       ├── ueber-uns/
│   │       │   ├── page.tsx            # Über uns
│   │       │   ├── vorstand/page.tsx
│   │       │   ├── partner/page.tsx
│   │       │   └── faq/page.tsx
│   │       ├── kontakt/page.tsx
│   │       ├── werte/[slug]/page.tsx   # Werte-Seiten
│   │       └── datenschutz/page.tsx    # Datenschutzerklärung
│   ├── (payload)/                      # Route Group: Payload Admin UI
│   │   └── admin/
│   │       └── [[...segments]]/page.tsx
│   └── api/
│       ├── contact/route.ts            # Kontaktformular + Turnstile
│       └── [...payload]/route.ts       # Payload REST API
├── collections/                        # Payload CMS Collections
│   ├── Projects.ts                     # Projekte (Titel, Slug, Kategorie, Body, Bild)
│   ├── Posts.ts                        # News-Artikel (Titel, Datum, Body, Bild)
│   ├── Events.ts                       # Veranstaltungen (Titel, Datum, Ort, Beschreibung)
│   ├── TeamMembers.ts                  # Vorstand (Name, Rolle, Bild, Bio)
│   ├── Partners.ts                     # Partner & Sponsoren (Name, Logo, Beschreibung, Typ)
│   ├── FAQs.ts                         # FAQ-Einträge (Frage, Antwort, Sortierung)
│   ├── Pages.ts                        # Statische Seiten (Werte, Über uns etc.)
│   └── Media.ts                        # Bilder & Dateien
├── components/
│   ├── layout/
│   │   ├── Header.tsx                  # Split Menu (Logo absolut zentriert)
│   │   ├── Footer.tsx
│   │   ├── AttentionBanner.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── CookieBanner.tsx            # Consent Management Wrapper
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── PersonCard.tsx
│   │   ├── Accordion.tsx
│   │   ├── ContactForm.tsx             # inkl. Turnstile-Widget
│   │   └── Map.tsx                     # Leaflet/OSM (lazy-loaded)
│   └── sections/
│       ├── Hero.tsx                    # Alle 3 Hero-Varianten
│       ├── ProjectGrid.tsx
│       └── TestimonialSlider.tsx
├── lib/
│   ├── animations.ts                  # GSAP ScrollTrigger Utilities
│   └── payload.ts                     # Payload Client-Helfer (getPayload)
├── messages/
│   ├── de.json
│   └── en.json
├── public/
│   ├── fonts/
│   │   ├── Lato-Regular.woff2
│   │   └── Lato-Bold.woff2
│   ├── images/
│   └── logos/
├── styles/
│   └── globals.css                     # Tailwind + Custom Properties
├── tailwind.config.ts                  # Brand-Farben inkl. accent-accessible
├── next.config.ts                      # 301-Redirects + i18n + withPayload()
└── package.json
```

### Payload CMS Collections

| Collection | Felder | Zweck |
|------------|--------|-------|
| `projects` | title, slug, category (sozial/bildung/gemeinschaft), body (richtext), image, locale | Projekte-Seiten |
| `posts` | title, slug, date, body (richtext), image, locale | News-Blog |
| `events` | title, date, location, description, locale | Veranstaltungen |
| `team-members` | name, role, image, bio, order | Vorstand |
| `partners` | name, type (partner/sponsor), logo, description, url, socials | Partner & Sponsoren |
| `faqs` | question, answer, order, locale | FAQ-Einträge |
| `pages` | title, slug, body (richtext), locale | Werte-Seiten, statische Seiten |
| `media` | Upload-Collection für Bilder und PDFs | Medien-Verwaltung |

---

## 16. Entwicklungs-Phasen

### Phase 1: Foundation (Woche 1–2)
- Next.js Projekt-Setup mit App Router
- **Payload CMS 3.x Integration** (Collections, Admin UI, Media Upload)
- `middleware.ts` für next-intl Locale-Routing
- Tailwind-Konfiguration mit Brand-Farben, Typografie und Accessibility-Tokens
- Font-Loading via `next/font/local`
- Komponenten-Bibliothek: Button, Card, PersonCard, Accordion
- Layout-Komponenten: Header (Split Menu mit absolut zentriertem Logo), Footer, AttentionBanner
- i18n-Setup mit next-intl
- Responsive Grundstruktur

### Phase 2: Seiten (Woche 3–4)
- Homepage (minimalistisch)
- Über uns + Vorstand
- Projekte Overview + Einzelseiten
- Netzwerke (inkl. Nightshift Music)
- Kursangebote
- FAQ
- Partner & Sponsoren
- Kontaktseite mit Formular + OpenStreetMap (Leaflet)
- Werte-Seiten (Standard Content Template)

### Phase 3: Features & Compliance (Woche 5)
- Kontaktformular-Backend (API Route + Turnstile + E-Mail via Resend)
- Rate Limiting
- News-Blog (statisch oder CMS-angebunden)
- Event-Kalender
- Cookie-Banner / Consent Management (Cookiebot/Usercentrics)
- Datenschutzseite

### Phase 4: Animation & SEO (Woche 6)
- GSAP ScrollTrigger: Scroll-Reveals, Hero-Titel-Animation
- Framer Motion: Page Transitions, Akkordeon, Mobile-Menü
- CSS: Magnetic Buttons, Card-Hovers, Parallax
- `prefers-reduced-motion` Fallbacks
- 301-Redirect-Mapping in `next.config.ts`
- SEO: Sitemap, Meta-Tags, OpenGraph, JSON-LD, hreflang
- Accessibility-Audit (axe-core / Lighthouse)

### Phase 5: Launch (Woche 7)
- Content-Finalisierung
- Bildaustausch (Platzhalter → finale Bilder)
- Testing (Cross-Browser, Mobile, Accessibility)
- Performance-Audit (Lighthouse, WebPageTest)
- DNS-Umstellung / Deployment auf Vercel
- Monitoring der 301-Redirects (Google Search Console)

---

## 17. Offene Fragen

| # | Frage | Status |
|---|-------|--------|
| 1 | ~~Headless CMS~~ → **Payload CMS 3.x** gewählt. Läuft im selben Next.js-Prozess. | ✅ Entschieden |
| 2 | Soll das Kontaktformular E-Mails direkt versenden oder an ein CRM weiterleiten? | Offen |
| 3 | Hosting: Vercel, oder eigener Server? | Offen |
| 4 | Domain-Setup: Bleibt uccelli-society.ch? | Offen |
| 5 | Skills4Growth: Ist das dasselbe wie LifeLab, oder ein separates Programm? | Offen |
| 6 | Consent Management: Cookiebot oder Usercentrics (oder anderer Anbieter)? | Offen |
| 7 | Analytics: Wird ein Analytics-Tool benötigt? Falls ja, Plausible/Umami empfohlen. | Offen |
| 8 | Nightshift Music: Eigene Detailseite unter Netzwerk, oder nur Abschnitt auf der Netzwerk-Seite? | Offen |

---

## 18. Anhang: Gelieferte Design-Assets

### Komponenten (PDF)
- `00_Uccelli Brand Kit.pdf` – Logo, Farben, Typografie
- `01_Buttons.pdf` – Button-Varianten
- `02_Header.pdf` – Mobile Navigation
- `03_Footer.pdf` – Mobile Footer
- `04_Hero.pdf` – 3 Hero-Designs
- `05_Attention Banner.pdf` – Event-Banner
- `06_Card.pdf` – Content-Card
- `07_Card_Person.pdf` – Team-Card

### Page Templates (JPG/PNG)
- `Template_Über-uns.jpg` – Über uns Seite
- `Template_Aktuelles-Projekt.jpg` – Einzelnes Projekt
- `Template_Contact-us_Desktop.png` – Kontakt (Desktop)
- `Template_Contact-us_Mobile.jpg` – Kontakt (Mobile)
- `Template_FAQ.jpg` – FAQ Seite
- `Template_Kursangebote.jpg` – Kursangebote
- `Template_Netzwerke.jpg` – Netzwerke
- `Template_Partner-und-Sponsoren.jpg` – Partner & Sponsoren
- `Template_Projekte-Overview.jpg` – Projekte Übersicht
- `Template_Standard-Content.jpg` – Standard Content
- `Template_Team_Seite.jpg` – Vorstand / Team
