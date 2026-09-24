# Befehle & Abläufe

## Entwicklung

```bash
npm run dev            # Dev-Server auf :3000
npm run lint           # ESLint
npm run typecheck      # TypeScript
npx vitest run         # Tests (einmalig)
npx vitest             # Tests (Watch-Mode)
```

## Datenbank

```bash
npm run migrate                 # Migrationen anwenden (auch im Container-Start enthalten)
npm run migrate:create <name>   # Nach Schema-Änderungen: neue Migration erzeugen und committen
npm run seed                    # Kanonische Inhalte einmalig in eine leere DB schreiben
npm run content:sync            # Versionierte DE/EN-Inhalte idempotent anwenden
npm run generate:types          # payload-types.ts aktualisieren (nach Collection-Änderungen)
```

Lokale DB zurücksetzen:

```bash
rm -f data/uccelli.db && npm run migrate && npm run seed
```

## Docker / Server

```bash
docker compose up -d --build    # Bauen + Starten
docker compose logs -f uccelli  # Logs
docker compose ps               # Healthcheck-Status (healthy?)
docker compose exec uccelli npm run seed   # Kanonische Inhalte im Container anwenden
```

> Der frühere Seed-Endpoint `GET /api/seed?key=...` wurde aus Sicherheitsgründen entfernt.
> Seeding läuft nur noch über die CLI (lokal `npm run seed`, im Container siehe oben).

## Backup (siehe RUNBOOK für Details)

```bash
sqlite3 data/uccelli.db ".backup 'backup-$(date +%F).db'"
```
