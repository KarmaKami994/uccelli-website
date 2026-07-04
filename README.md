# Uccelli Society – Website

Website des Verein Uccelli (Zürich): [uccelli-society.ch](https://uccelli-society.ch)

## Stack

| Bereich | Technologie |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| CMS | Payload CMS 3 (Admin unter `/admin`), SQLite |
| i18n | next-intl (DE default, EN) + native Payload-Localization |
| Styling | Tailwind CSS v4, Framer Motion, GSAP |
| E-Mail | Resend (Kontaktformular) |
| Bot-Schutz | Cloudflare Turnstile |
| Tests | Vitest + Testing Library |
| Deployment | Docker (Multi-Stage, non-root) hinter Nginx Proxy Manager |

## Lokale Entwicklung

```bash
cp .env.example .env        # PAYLOAD_SECRET setzen!
npm ci
npm run dev                 # http://localhost:3000
```

Beim ersten Start ist die Datenbank leer:

```bash
npm run migrate             # DB-Schema anlegen
npm run seed                # Initial-Inhalte einspielen (idempotent)
```

Danach unter `/admin` den ersten Benutzer anlegen (erster Benutzer = Admin-Rolle manuell setzen).

## Wichtige Befehle

| Befehl | Zweck |
|---|---|
| `npm run dev` | Dev-Server |
| `npm run build` | Produktions-Build (braucht keine DB) |
| `npm run lint` / `npm run typecheck` | Qualitäts-Checks |
| `npx vitest run` | Tests |
| `npm run migrate` | DB-Migrationen anwenden |
| `npm run migrate:create <name>` | Neue Migration nach Schema-Änderung erzeugen |
| `npm run seed` | Leere DB mit Startinhalten füllen (idempotent) |
| `npm run generate:types` | `payload-types.ts` nach Schema-Änderung neu generieren |

## Inhalte & Lokalisierung

- Inhalte werden im Payload-Admin gepflegt (`/admin`). Homepage & Navigation sind **Globals**, alles andere Collections.
- Übersetzungen: Im Admin oben rechts die Sprache (DE/EN) umschalten und Felder übersetzen. Fehlende EN-Übersetzungen fallen automatisch auf Deutsch zurück.
- Slugs sind sprachunabhängig (eine URL pro Inhalt, `/en/...` für Englisch).
- UI-Texte (Buttons, Labels): `messages/de.json` / `messages/en.json`.

## Deployment

```bash
# .env auf dem Server (siehe .env.example) — PAYLOAD_SECRET ist Pflicht
docker compose up -d --build
```

Der Container wendet beim Start automatisch Migrationen an (`payload migrate && next start`), läuft als unprivilegierter Benutzer und hat einen Healthcheck auf `/api/health`. Betriebsdetails, Backups und Incident-Schritte: **`docs/RUNBOOK.md`**.

## Architektur-Notizen

- **Rendering:** On-Demand ISR (`revalidate = 300`) — CMS-Änderungen sind nach max. 5 Minuten live, der Build braucht keine Datenbank.
- **Datenzugriff:** ausschliesslich über `lib/data.ts` (typisiert via generierte `payload-types.ts`, dedupliziert via `React.cache`). Fehler werden nicht verschluckt, sondern laufen in die Error-Boundary.
- **Sicherheit:** Public-Read/Auth-Write Access-Control auf allen Collections, RBAC auf Benutzern (nur Admins verwalten Benutzer/Rollen), Turnstile serverseitig verpflichtend sobald konfiguriert, Rate-Limiting auf dem Kontaktformular, Fail-Fast ohne `PAYLOAD_SECRET`.
