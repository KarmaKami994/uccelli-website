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
npm run generate:types          # payload-types.ts aktualisieren (nach Collection-Änderungen)
```

### Fresh Install / vollständig leere Datenbank

```bash
npm run seed
```

`seed` führt zuerst `bootstrap:empty-db` aus. Dieser Schritt ergänzt die Bootstrap-Daten für
Netzwerke, Werte, Kurse und Veranstaltungen nur, wenn die jeweilige Collection leer ist. Sobald
bereits vom versionierten Content-Sync verwaltete redaktionelle Inhalte vorhanden sind, bricht der
Bootstrap vor dem ersten Schreibzugriff ab. Anschliessend befüllt `content:sync` die übrigen
Collections und Globals.

Bei einer Wiederherstellung aus einem vorhandenen SQLite-Backup wird `seed` nicht ausgeführt:
Backup einspielen und danach den normalen Deploy verwenden. `seed` ist nur für den Neuaufbau ohne
nutzbaren Content-Datenbestand vorgesehen.

Lokale Datenbank vollständig neu aufbauen:

```bash
rm -f data/uccelli.db && npm run migrate && npm run seed
```

### Bewusst geplante Content-Migration

```bash
npm run content:sync
```

`content:sync` schreibt die versionierten Repository-Inhalte in die Datenbank. Der Befehl ist kein
allgemeiner Bootstrap und darf nur nach Prüfung des Sync-Diffs sowie einem aktuellen Backup
ausgeführt werden.

### Normaler `freeza`-Deploy

```bash
docker compose up -d --build    # Bauen + Starten
docker compose logs -f uccelli  # Logs
docker compose ps               # Healthcheck-Status (healthy?)
```

> **Produktionshinweis:** Ein normaler Deploy auf `freeza` enthält weder `npm run seed` noch
> `npm run content:sync`. `seed` ist ausschliesslich für eine frische/leere Datenbank bestimmt.
> `content:sync` kann redaktionell gepflegte Inhalte überschreiben oder löschen und darf auf der
> produktiven SQLite-Datenbank nur als bewusst geplante Content-Migration nach einem aktuellen
> Backup ausgeführt werden.
>
> `Dockerfile.admin` startet `scripts/ensure-home-schema.mjs`, führt aber keine Payload-Migration
> über `npm run migrate` aus. Erforderliche Payload-Migrationen müssen bewusst ausgeführt werden.

## Backup (siehe RUNBOOK für Details)

```bash
sqlite3 data/uccelli.db ".backup 'backup-$(date +%F).db'"
```
