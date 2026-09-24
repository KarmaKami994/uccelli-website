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
npm run migrate                 # Payload-Migrationen manuell anwenden (nicht Teil des Container-Starts)
npm run migrate:create <name>   # Nach Schema-Änderungen: neue Migration erzeugen und committen
npm run seed                    # Alias für content:sync; nur für leere DB oder geplante Content-Migration
npm run content:sync            # Repository-Inhalte versioniert in die Datenbank schreiben
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
```

> Der frühere Seed-Endpoint `GET /api/seed?key=...` wurde entfernt. Ein Content-Sync wird
> ausschließlich bewusst über die CLI und unter den folgenden Voraussetzungen gestartet.
>
> **Produktionshinweis:** `npm run seed` und `npm run content:sync` sind keine regulären
> Deployment-Schritte. Sie dürfen auf der produktiven redaktionellen SQLite-Datenbank auf
> `freeza` nur als bewusst geplante Content-Migration und nach einem aktuellen Backup ausgeführt
> werden. Der Sync kann redaktionell gepflegte Inhalte überschreiben oder löschen.
>
> `Dockerfile.admin` startet `scripts/ensure-home-schema.mjs`, führt aber keine Payload-Migration
> über `npm run migrate` aus. Erforderliche Payload-Migrationen müssen bewusst ausgeführt werden.

## Backup (siehe RUNBOOK für Details)

```bash
sqlite3 data/uccelli.db ".backup 'backup-$(date +%F).db'"
```
