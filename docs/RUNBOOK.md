# RUNBOOK – Uccelli Website

> Aktueller Produktionsbetrieb. Architekturdetails: [`ARCHITECTURE.md`](ARCHITECTURE.md).

Dieses Dokument enthält die praktischen Betriebsabläufe für Cloudflare, das Home-CMS auf `freeza`, den Content-Sync, den CMS-Tunnel sowie Backup und Recovery.

---

## 1. Produktionsübersicht

Öffentliche Website:

```text
https://uccelli-society.ch
```

CMS:

```text
https://cms.uccelli-society.ch/admin
```

Cloudflare:

```text
Worker: uccelli-website
D1:     uccelli-prod
R2:     uccelli-media
Tunnel: uccelli-cms
```

Home-Server:

```text
Host:      freeza
Projekt:   /opt/uccelli-website
Container: uccelli-website
CMS Port:  3100 -> 3000
Network:   npm
```

Persistente redaktionelle Daten:

```text
/opt/uccelli-website/data/uccelli.db
/opt/uccelli-website/media/
```

---

## 2. Normaler CMS-Betrieb

Status:

```bash
cd /opt/uccelli-website
docker compose ps
```

Logs:

```bash
docker logs --tail 100 uccelli-website
```

Healthcheck:

```bash
curl -I https://cms.uccelli-society.ch/admin
curl -s https://cms.uccelli-society.ch/api/health
```

Der Health-Endpunkt prüft die Payload-Datenbankverbindung.

---

## 3. Home-CMS aktualisieren

```bash
cd /opt/uccelli-website
git pull --ff-only origin main
docker compose up -d --build uccelli
docker compose ps
```

Danach:

```bash
docker logs --tail 100 uccelli-website
curl -I https://cms.uccelli-society.ch/admin
```

Die persistenten Mounts `data/` und `media/` dürfen beim Rebuild nicht gelöscht werden.

---

## 4. Cloudflare Deployment

Die öffentliche Website wird mit OpenNext für Cloudflare gebaut.

Wichtige Befehle:

```bash
npm run cloudflare:build
npm run deploy
```

`npm run deploy` führt vor dem Deployment auch die Cloudflare-Migrationen aus.

Produktionsressourcen:

```text
Worker: uccelli-website
D1:     uccelli-prod
R2:     uccelli-media
```

Nach einem Deployment prüfen:

```bash
curl -I https://uccelli-society.ch
curl -I https://uccelli-society.ch/admin
```

`/admin` auf der Hauptdomain muss auf das CMS weiterleiten.

---

## 5. Content-Sync Home-CMS → Cloudflare

Publisher:

```text
/opt/uccelli-website/scripts/cloud-sync.py
```

Systemd Service:

```text
uccelli-cloud-sync.service
```

Timer:

```text
uccelli-cloud-sync.timer
```

Status:

```bash
systemctl status uccelli-cloud-sync.timer --no-pager
systemctl list-timers uccelli-cloud-sync.timer
```

Manuellen Sync starten:

```bash
sudo systemctl start uccelli-cloud-sync.service
```

Logs:

```bash
journalctl -u uccelli-cloud-sync.service -n 100 --no-pager
```

Dry Run:

```bash
cd /opt/uccelli-website
set -a
source /etc/uccelli-cloud-sync.env
set +a
python3 scripts/cloud-sync.py --dry-run
```

Erzwungener Publish:

```bash
cd /opt/uccelli-website
set -a
source /etc/uccelli-cloud-sync.env
set +a
python3 scripts/cloud-sync.py --force
```

### Was synchronisiert wird

Redaktionelle Collections/Globals und Media-Metadaten werden von SQLite nach D1 publiziert. DB-referenzierte Dateien werden nach R2 hochgeladen.

### Was bewusst nicht überschrieben wird

- `users`
- Session-/Payload-interne Tabellen
- `contact-submissions`

Dadurch bleiben Daten erhalten, die ausschließlich in der öffentlichen Cloudflare-Runtime entstehen.

---

## 6. Cloudflare Tunnel für das CMS

Der CMS-Tunnel ist ein eigenes Uccelli-System:

```text
Tunnel:          uccelli-cms
Public hostname: cms.uccelli-society.ch
Origin service:  http://uccelli-website:3000
Connector:       uccelli-cloudflared
Docker network:  npm
```

Status des Connectors:

```bash
docker ps --filter name=uccelli-cloudflared
docker logs --tail 50 uccelli-cloudflared
```

Erwartet werden Meldungen wie:

```text
Registered tunnel connection
```

Connector neu starten:

```bash
docker restart uccelli-cloudflared
```

Tunnel-Token lokal:

```text
/opt/uccelli-cloudflared/tunnel-token
```

Der Token darf niemals ins Repository oder in öffentliche Logs kopiert werden.

Der frühere Host `uccelli.qrwed.uk` gehört nicht mehr zur Uccelli-Produktionsarchitektur.

---

## 7. Environment auf freeza

Produktive `.env` liegt außerhalb von Git im Projektverzeichnis.

Wesentliche Werte:

```env
PAYLOAD_SECRET=<secret>
SITE_URL=https://uccelli-society.ch
ADMIN_ORIGIN=https://cms.uccelli-society.ch
DATABASE_URI=file:./data/uccelli.db
RESEND_API_KEY=
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Cloudflare-Sync-Secrets liegen separat in:

```text
/etc/uccelli-cloud-sync.env
```

Beispiel:

```env
CLOUDFLARE_API_TOKEN=<token>
UCCELLI_D1_DATABASE=uccelli-prod
UCCELLI_R2_BUCKET=uccelli-media
UCCELLI_DB_PATH=/opt/uccelli-website/data/uccelli.db
UCCELLI_MEDIA_DIR=/opt/uccelli-website/media
UCCELLI_SYNC_STATE=/var/lib/uccelli-cloud-sync/state.json
```

Reale Secrets niemals committen.

---

## 8. Schema-Änderungen

Nach Änderungen an Payload Collections oder Globals:

```bash
npm run generate:types
npm run migrate:create
```

Migrationen und `payload-types.ts` gehören ins Repository.

Cloudflare-Migrationen:

```bash
npm run cloudflare:migrate
```

Home-CMS: Nach Pull/Rebuild führt der Container vor dem Serverstart den lokalen Schema-Check aus.

Vor produktiven Schema-Änderungen immer sicherstellen, dass ein aktuelles Backup der SQLite-Datenbank existiert.

---

## 9. Backup

Die redaktionelle Source of Truth besteht aus:

```text
/opt/uccelli-website/data/uccelli.db
/opt/uccelli-website/media/
```

Ein Backup muss daher mindestens beide Bereiche enthalten.

### Konsistentes SQLite-Backup

```bash
mkdir -p /opt/uccelli-backups/$(date +%F)
sqlite3 /opt/uccelli-website/data/uccelli.db \
  ".backup '/opt/uccelli-backups/$(date +%F)/uccelli.db'"
```

### Media sichern

```bash
tar -czf /opt/uccelli-backups/$(date +%F)/media.tar.gz \
  -C /opt/uccelli-website media
```

### Integrität prüfen

```bash
sqlite3 /opt/uccelli-backups/$(date +%F)/uccelli.db 'PRAGMA integrity_check;'
```

Erwartet:

```text
ok
```

Ein lokales Backup auf `freeza` schützt nicht vor Verlust des gesamten Servers. Für echte Disaster Recovery ist zusätzlich eine Offsite-Kopie erforderlich.

---

## 10. Restore

### SQLite

CMS stoppen:

```bash
cd /opt/uccelli-website
docker compose stop uccelli
```

Backup zurückspielen:

```bash
cp /pfad/zum/backup/uccelli.db /opt/uccelli-website/data/uccelli.db
```

Danach Dateirechte entsprechend dem bestehenden Setup prüfen und CMS starten:

```bash
cd /opt/uccelli-website
docker compose start uccelli
```

Healthcheck:

```bash
curl -s https://cms.uccelli-society.ch/api/health
```

### Media

```bash
tar -xzf /pfad/zum/backup/media.tar.gz -C /opt/uccelli-website
```

Nach einem Restore einen Cloudflare-Publish auslösen:

```bash
sudo systemctl start uccelli-cloud-sync.service
```

---

## 11. Kontaktformular

Öffentliche Route:

```text
POST /api/contact
```

Ablauf:

1. Eingabevalidierung
2. optional Turnstile-Verifikation
3. Speicherung in D1 als `contact-submissions`
4. optional E-Mail über Resend
5. Status des Mailversands wird in der Submission gespeichert

Wichtig: `contact-submissions` werden vom Home-CMS-Sync nicht überschrieben.

Fehlerdiagnose bei Formularproblemen:

- HTTP 400: ungültige Daten
- HTTP 403: Turnstile fehlgeschlagen
- HTTP 429: Rate Limit
- HTTP 500: Server-/Payload-Fehler

---

## 12. Häufige Fehler

| Symptom | Prüfung |
|---|---|
| CMS nicht erreichbar | `docker ps`, `docker logs uccelli-website`, `docker logs uccelli-cloudflared` |
| Tunnel zeigt 502/503 | Origin `http://uccelli-website:3000`, Docker-Netzwerk `npm`, Containerstatus prüfen |
| CMS-Änderung erscheint nicht öffentlich | Sync-Timer und `journalctl -u uccelli-cloud-sync.service` prüfen |
| Media fehlt öffentlich | DB-Media-Referenz, lokale Datei und R2-Sync prüfen |
| Öffentliche Website fehlerhaft | Worker-Deployment, D1-Migrationen, Cloudflare Logs prüfen |
| `/admin` auf Hauptdomain öffnet nicht CMS | `middleware.ts`, `ADMIN_ORIGIN`, Deployment prüfen |
| Container unhealthy | `/api/health`, SQLite-Datei und Mounts prüfen |
| Kontaktformular 403 | Turnstile Site-/Secret-Key prüfen |
| Kontaktformular sendet keine Mail | `RESEND_API_KEY` und Resend-Domain prüfen; Submission bleibt trotzdem gespeichert |

---

## 13. Security

- echte Secrets nie committen
- Cloudflare API-Token mit minimal notwendigen Rechten verwenden
- Tunnel-Token bei Offenlegung rotieren
- `PAYLOAD_SECRET` ausreichend lang und zufällig halten
- Admin-Passwörter nicht wiederverwenden
- `.env`, SQLite-Datenbanken, `media/`, Backup-Dateien und Token-Dateien nicht in Git aufnehmen

Die alten SQLite-Dateien waren historisch zeitweise im öffentlichen Git-Repository enthalten. Das aktuelle Repository trackt sie nicht mehr. Eine vollständige Historienbereinigung kann bei Bedarf separat mit `git filter-repo` durchgeführt werden; dabei müssen alle Klone anschließend neu synchronisiert bzw. neu geklont werden.

---

## 14. Schnellcheck nach Änderungen

```bash
curl -I https://uccelli-society.ch
curl -I https://uccelli-society.ch/admin
curl -I https://cms.uccelli-society.ch/admin
curl -s https://cms.uccelli-society.ch/api/health
systemctl status uccelli-cloud-sync.timer --no-pager
docker ps --filter name=uccelli-cloudflared
docker ps --filter name=uccelli-website
```

Erwarteter Zustand:

- Hauptseite: HTTP 200
- `/admin`: Redirect zum CMS
- CMS: erreichbar
- Healthcheck: `status: ok`
- Sync-Timer: aktiv
- `uccelli-cloudflared`: läuft
- `uccelli-website`: läuft/healthy

---

## 15. Verbindliche Referenzen

- Architektur: [`ARCHITECTURE.md`](ARCHITECTURE.md)
- Hybrid-CMS: [`hybrid-home-admin.md`](hybrid-home-admin.md)
- Environment-Beispiel: [`../.env.example`](../.env.example)
- Cloudflare-Konfiguration: [`../wrangler.jsonc`](../wrangler.jsonc)
- Home-CMS Compose: [`../docker-compose.yml`](../docker-compose.yml)
