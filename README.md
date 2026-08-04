# Uccelli Society – Website

Neue Website des Vereins Uccelli in Zürich. Der aktuelle öffentliche Testbetrieb läuft unter `https://uccelli.qrwed.uk`; die bisherige WordPress-Seite unter `https://uccelli-society.ch` bleibt während der Migration separat erreichbar.

## Stack

| Bereich | Technologie |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| CMS | Payload CMS 3 (Admin unter `/admin`), SQLite |
| i18n | next-intl (DE default, EN) + native Payload-Localization |
| Styling | Tailwind CSS v4, Framer Motion |
| E-Mail | Resend |
| Bot-Schutz | Cloudflare Turnstile |
| Tests | Vitest + Testing Library |
| Deployment | Docker hinter Cloudflare und dem Home-Lab-Reverse-Proxy |

## Öffentliche Struktur

- Startseite
- Projekte mit Kategorienfilter und Detailseiten
- Community Hub für Tools, Games und Ressourcen
- News mit Detailseiten
- Über-uns-One-Pager
- Teil-werden-One-Pager
- Deutsch und Englisch

Veranstaltungen werden primär über Instagram kommuniziert. Die alten Kurs-, Veranstaltungs-, Netzwerk- und Unterseiten werden über permanente Redirects auf die neue Struktur geführt.

## Lokale Entwicklung

```bash
cp .env.example .env
# PAYLOAD_SECRET in .env durch einen langen Zufallswert ersetzen
npm ci
npm run migrate
npm run content:sync
npm run dev
```

Die Website ist danach unter `http://localhost:3000` und das Payload-Admin unter `http://localhost:3000/admin` erreichbar.

## Wichtige Befehle

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Produktions-Build |
| `npm run lint` | ESLint-Prüfung |
| `npm run typecheck` | Payload-Typen erzeugen und TypeScript prüfen |
| `npm test` | Tests ausführen |
| `npm run migrate` | Datenbankmigrationen anwenden |
| `npm run content:sync` | Versionierte, idempotente Inhaltsmigration anwenden |
| `npm run generate:types` | `payload-types.ts` neu erzeugen |

## Inhalte und Lokalisierung

- Inhalte werden im Payload-Admin gepflegt.
- Deutsch und Englisch werden als lokalisierte CMS-Felder gespeichert.
- Fehlende englische Inhalte fallen auf Deutsch zurück.
- Slugs bleiben sprachunabhängig; englische Seiten verwenden `/en/...`.
- UI-Texte liegen in `messages/de.json` und `messages/en.json`.
- Der versionierte Inhaltsimport läuft pro Version genau einmal und überschreibt spätere CMS-Änderungen nicht erneut.

## Home-Lab-Deployment

Die produktive SQLite-Datenbank und Medien liegen auf dem Host in:

```text
/opt/uccelli-website/data/
/opt/uccelli-website/media/
```

Die zusätzliche Datei `/opt/uccelli-website/uccelli.db` ist nicht das von Docker Compose eingebundene Datenbank-Volume.

### Vor jedem Update sichern

```bash
cd /opt/uccelli-website
mkdir -p backups/$(date +%Y%m%d-%H%M%S)
backup_dir="backups/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$backup_dir"
cp -a data "$backup_dir/"
cp -a media "$backup_dir/"
cp -a .env "$backup_dir/" 2>/dev/null || true
```

### Aktualisieren

```bash
cd /opt/uccelli-website
git pull --ff-only origin main
docker compose build --pull
docker compose up -d
docker compose logs --tail=200 -f uccelli
```

Beim Start führt der Container nacheinander aus:

```text
Payload-Schemamigration
→ versionierte Inhaltsmigration
→ Next.js-Server
```

Der Healthcheck verwendet `/api/health`.

### Öffentliche Domain

`SITE_URL` muss der Adresse entsprechen, die Besucher im Browser sehen:

```env
SITE_URL=https://uccelli.qrwed.uk
```

Cloudflare leitet die Domain zum Home-Lab weiter. `SITE_URL` steuert unabhängig davon Canonical-URLs, Sitemap, Open Graph und andere Metadaten.

## Qualitätsprüfung

Der GitHub-Workflow prüft:

1. Datenbankmigrationen auf einer leeren SQLite-Datenbank
2. versionierten Inhaltsimport
3. generierte Payload-Typen
4. ESLint
5. TypeScript
6. Unit Tests
7. Next.js-Produktionsbuild
8. Docker-Image-Build
9. echten Containerstart inklusive Healthcheck
