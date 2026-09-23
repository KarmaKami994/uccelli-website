# Uccelli Society – Website

Produktive Website des Vereins Uccelli.

- Öffentliche Website: `https://uccelli-society.ch`
- CMS: `https://cms.uccelli-society.ch/admin`
- Architektur: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- Betrieb / Recovery: [`docs/RUNBOOK.md`](docs/RUNBOOK.md)

## Architektur in Kürze

Die Anwendung läuft hybrid:

```text
Besucher
  ↓
Cloudflare
  ↓
Worker: uccelli-website
  ├─ D1: uccelli-prod
  └─ R2: uccelli-media

Redaktion
  ↓
cms.uccelli-society.ch
  ↓
Cloudflare Tunnel: uccelli-cms
  ↓
freeza
  ↓
Docker: uccelli-website:3000
  ├─ SQLite: /opt/uccelli-website/data/uccelli.db
  └─ Media:  /opt/uccelli-website/media/
```

Das Home-CMS ist die redaktionelle Source of Truth. `scripts/cloud-sync.py` veröffentlicht redaktionelle Daten regelmäßig nach D1 und Medien nach R2. Die öffentliche Website bleibt dadurch auch verfügbar, wenn der Home-Server oder der CMS-Tunnel nicht erreichbar ist.

## Stack

| Bereich | Technologie |
|---|---|
| Frontend | Next.js 16.3.3, React 19.2.6, TypeScript |
| CMS | Payload CMS 3.90.0 |
| Public Database | Cloudflare D1 |
| Public Media | Cloudflare R2 |
| CMS Database | SQLite auf `freeza` |
| CMS Media | lokales `media/` auf `freeza` |
| Cloud Runtime | Cloudflare Workers + OpenNext |
| CMS-Zugriff | Cloudflare Tunnel `uccelli-cms` |
| i18n | next-intl + Payload Localization |
| Styling | Tailwind CSS v4, Framer Motion, GSAP |
| E-Mail | Resend |
| Bot-Schutz | Cloudflare Turnstile |
| Tests | Vitest + Testing Library |

## Repository-Struktur

Wichtige Bereiche:

```text
app/                     Next.js App Router
collections/             Payload Collections
globals/                 Payload Globals
lib/                     gemeinsame App-/Payload-Logik
messages/                UI-Übersetzungen DE/EN
migrations/              Payload-/D1-Migrationen
ops/systemd/             Sync-Service und Timer
scripts/cloud-sync.py    SQLite/Media → D1/R2 Publisher
docs/ARCHITECTURE.md     verbindliche Architektur-Dokumentation
docs/RUNBOOK.md          Betriebs- und Recovery-Handbuch
payload.config.ts        Cloudflare Payload-Konfiguration
payload.config.home.ts   Home-CMS SQLite-Konfiguration
Dockerfile.admin         Home-CMS Image
docker-compose.yml       Home-CMS auf freeza
wrangler.jsonc           Cloudflare Bindings
```

## Lokale Entwicklung

Voraussetzung: Node.js gemäß `.node-version` / `package.json`.

```bash
cp .env.example .env
# PAYLOAD_SECRET in .env durch einen langen Zufallswert ersetzen
npm install
npm run dev
```

Wichtige Befehle:

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Next.js Produktions-Build |
| `npm run cloudflare:build` | OpenNext Cloudflare Bundle |
| `npm run lint` | ESLint |
| `npm run typecheck` | Payload-Typen + TypeScript |
| `npm test` | Unit Tests |
| `npm run migrate` | Payload Migrationen |
| `npm run migrate:create` | neue Migration erzeugen |
| `npm run generate:types` | `payload-types.ts` aktualisieren |
| `npm run sync:cloudflare` | Home-CMS-Inhalte nach D1/R2 publizieren |
| `npm run deploy` | Cloudflare Migration + Build + Deployment |

## Produktivbetrieb

### Öffentliche Website

Die öffentliche Anwendung nutzt:

```text
Worker: uccelli-website
D1:     uccelli-prod
R2:     uccelli-media
```

`wrangler.jsonc` enthält die D1- und R2-Bindings. Die öffentliche Payload-Konfiguration ist `payload.config.ts`.

`SITE_URL` für Produktion:

```env
SITE_URL=https://uccelli-society.ch
```

### Home-CMS auf freeza

Projektpfad:

```text
/opt/uccelli-website
```

Persistente Daten:

```text
/opt/uccelli-website/data/uccelli.db
/opt/uccelli-website/media/
```

CMS-Container:

```text
Compose service: uccelli
Container:       uccelli-website
Host port:       3100
Container port:  3000
Docker network:  npm
```

Wichtige Produktionswerte:

```env
SITE_URL=https://uccelli-society.ch
ADMIN_ORIGIN=https://cms.uccelli-society.ch
ADMIN_ONLY=1
```

Update des CMS:

```bash
cd /opt/uccelli-website
git pull --ff-only origin main
docker compose up -d --build uccelli
docker compose ps
```

Logs:

```bash
docker logs --tail 100 uccelli-website
```

## CMS-Tunnel

Das CMS besitzt einen eigenen Cloudflare-Tunnel:

```text
Tunnel:          uccelli-cms
Public hostname: cms.uccelli-society.ch
Service:         http://uccelli-website:3000
Connector:       uccelli-cloudflared auf freeza
Network:         npm
```

Der frühere Host `uccelli.qrwed.uk` gehört nicht mehr zur Uccelli-Architektur.

## Content-Publishing

Der Home-Server veröffentlicht redaktionelle Daten mit:

```text
scripts/cloud-sync.py
```

Dabei werden redaktionelle Collections/Globals und Media-Metadaten nach D1 sowie DB-referenzierte Dateien nach R2 übertragen.

Bewusst nicht vom Home-CMS überschrieben werden unter anderem:

- Payload-Benutzer
- Sessions und Payload-interne Tabellen
- `contact-submissions`

Der automatische Lauf wird über systemd gesteuert:

```bash
systemctl status uccelli-cloud-sync.timer
journalctl -u uccelli-cloud-sync.service -n 100 --no-pager
```

Ein Lauf kann manuell gestartet werden:

```bash
sudo systemctl start uccelli-cloud-sync.service
```

## Admin-Routing

Auf der öffentlichen Website wird:

```text
https://uccelli-society.ch/admin
```

auf:

```text
https://cms.uccelli-society.ch/admin
```

umgeleitet.

Das Home-CMS läuft mit `ADMIN_ONLY=1` und dient nicht als zweite öffentliche Website.

## Medien

Auf Cloudflare werden Medien über R2 bereitgestellt. Die öffentliche Route lautet:

```text
/api/media/file/[filename]
```

Next.js Image Optimization ist bewusst deaktiviert (`images.unoptimized = true`), damit Payload-/R2-Medien ohne zusätzliches Cloudflare-Images-Binding ausgeliefert werden können.

## Lokalisierung

- Deutsch ist Standardsprache.
- Englisch ist zusätzlich verfügbar.
- `next-intl` übernimmt Routing und UI-Übersetzungen.
- Payload speichert lokalisierte CMS-Felder.
- Fehlende englische CMS-Inhalte können auf Deutsch zurückfallen.

## CI

Der GitHub-Workflow validiert unter anderem:

1. Dependency Installation
2. Payload-Typgenerierung
3. CV-Creator JavaScript Syntax
4. ESLint
5. TypeScript
6. Unit Tests
7. externen CV-Compiler Smoke Test
8. OpenNext Cloudflare Production Bundle

## Secrets

Niemals echte Secrets ins Repository committen. Dazu gehören insbesondere:

- `PAYLOAD_SECRET`
- `CLOUDFLARE_API_TOKEN`
- Cloudflare Tunnel Tokens
- `RESEND_API_KEY`
- `TURNSTILE_SECRET_KEY`

Die Beispielwerte stehen in `.env.example`. Produktive Werte liegen ausschließlich außerhalb von Git.

## Dokumentation

Für technische Entscheidungen und Datenflüsse gilt [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) als maßgebliche Referenz.

Für Betrieb, Updates, Sync, Tunnel, Backups und Incident-Hilfe siehe [`docs/RUNBOOK.md`](docs/RUNBOOK.md).
