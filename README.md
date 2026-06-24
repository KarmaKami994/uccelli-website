# Uccelli Society – Website Redesign

Offizielle Website des Verein Uccelli, Zürich.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 18 + TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** GSAP + Framer Motion
- **i18n:** next-intl (DE / EN, erweiterbar)
- **CMS:** Payload CMS 3.x (geplant)
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Projekt-Dokumentation

Siehe [docs/PRD.md](./docs/PRD.md) für die vollständige Spezifikation.

## Struktur

```
app/[locale]/       → Seiten (Homepage, Über uns, Projekte, etc.)
components/         → Wiederverwendbare Komponenten
  layout/           → Header, Footer, AttentionBanner
  ui/               → Button, Card, Accordion
  sections/         → Hero, ProjectGrid
messages/           → i18n Übersetzungen (de.json, en.json)
styles/             → globals.css (Tailwind v4 Theme)
collections/        → Payload CMS Collections (geplant)
public/fonts/       → Lato Regular + Bold (lokal)
```
