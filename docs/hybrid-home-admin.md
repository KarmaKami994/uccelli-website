# Hybridbetrieb: Cloudflare Website + Payload Admin auf `freeza`

> Für die vollständige Architektur siehe [`ARCHITECTURE.md`](ARCHITECTURE.md). Dieses Dokument beschreibt gezielt den Hybridbetrieb des CMS.

## Zielbild

Die Uccelli-Website trennt öffentliche Auslieferung und Redaktion bewusst voneinander:

```text
Öffentliche Website
https://uccelli-society.ch
        ↓
Cloudflare Worker: uccelli-website
        ├─ D1: uccelli-prod
        └─ R2: uccelli-media

Redaktion
https://cms.uccelli-society.ch/admin
        ↓
Cloudflare Tunnel: uccelli-cms
        ↓
freeza
        ↓
Docker: uccelli-website:3000
        ├─ SQLite: data/uccelli.db
        └─ Media: media/
```

Wesentliche Eigenschaften:

- Die öffentliche Website läuft auf Cloudflare Workers.
- Produktionsinhalte für Besucher liegen in D1.
- öffentliche Medien liegen in R2.
- Payload Admin läuft ausschließlich auf `freeza`.
- Die redaktionelle Source of Truth ist SQLite + lokales `media/`.
- `/admin` auf der Hauptdomain leitet zum Home-CMS weiter.
- Der Home-Server ist für die Verfügbarkeit der öffentlichen Website nicht erforderlich.
- Das CMS besitzt einen eigenen Cloudflare-Tunnel und ist nicht von anderen Projekten oder Domains abhängig.

## Domains

```text
Website: https://uccelli-society.ch
CMS:     https://cms.uccelli-society.ch/admin
```

Der frühere temporäre Host `uccelli.qrwed.uk` gehört nicht mehr zur Uccelli-Architektur.

## Home-CMS auf freeza

Projektverzeichnis:

```text
/opt/uccelli-website
```

Compose Service:

```text
uccelli
```

Container:

```text
uccelli-website
```

Persistente Daten:

```text
/opt/uccelli-website/data/uccelli.db
/opt/uccelli-website/media/
```

Docker-Netzwerk:

```text
npm
```

Der Container verwendet `Dockerfile.admin` und läuft mit:

```env
DATABASE_URI=file:/app/data/uccelli.db
SITE_URL=https://uccelli-society.ch
ADMIN_ORIGIN=https://cms.uccelli-society.ch
ADMIN_ONLY=1
```

`PAYLOAD_SECRET` muss produktiv gesetzt sein.

## Warum es zwei Payload-Konfigurationen gibt

### Cloudflare

```text
payload.config.ts
```

Diese Konfiguration nutzt:

- D1 über `@payloadcms/db-d1-sqlite`
- R2 über `@payloadcms/storage-r2`
- Cloudflare Bindings `D1` und `R2`

### Home-CMS

```text
payload.config.home.ts
```

Diese Konfiguration nutzt:

- SQLite über `@payloadcms/db-sqlite`
- lokales Dateisystem für Uploads
- keine D1-/R2-Abhängigkeit für redaktionelle Schreibvorgänge

Beim Build von `Dockerfile.admin` wird die Home-Konfiguration als aktive Payload-Konfiguration verwendet.

## Home-CMS aktualisieren

Auf `freeza`:

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

Healthcheck:

```bash
curl -s https://cms.uccelli-society.ch/api/health
```

## Cloudflare Tunnel

Der Admin wird über einen eigenen Tunnel veröffentlicht:

```text
Tunnel name:     uccelli-cms
Public hostname: cms.uccelli-society.ch
Origin service:  http://uccelli-website:3000
```

Connector auf `freeza`:

```text
Container: uccelli-cloudflared
Network:   npm
```

Der Connector erreicht den CMS-Container direkt über Docker-DNS.

Status:

```bash
docker ps --filter name=uccelli-cloudflared
docker logs --tail 50 uccelli-cloudflared
```

Neustart:

```bash
docker restart uccelli-cloudflared
```

Der Tunnel wird remote über Cloudflare One verwaltet. Das Tunnel-Token liegt ausschließlich lokal und darf nicht ins Repository gelangen.

## `/admin`-Routing

Die Middleware unterscheidet öffentliche Website und Home-CMS.

Auf der öffentlichen Website:

```text
https://uccelli-society.ch/admin
```

wird auf:

```text
https://cms.uccelli-society.ch/admin
```

umgeleitet.

Auf dem Home-CMS sorgt `ADMIN_ONLY=1` dafür, dass der Container als Admin-System und nicht als zweite öffentliche Website betrieben wird.

## Content-Synchronisation

Publisher:

```text
scripts/cloud-sync.py
```

Der Publisher liest aus:

```text
/opt/uccelli-website/data/uccelli.db
/opt/uccelli-website/media/
```

und veröffentlicht nach:

```text
D1: uccelli-prod
R2: uccelli-media
```

Synchronisiert werden redaktionelle Content-Tabellen, Globals, Media-Metadaten und DB-referenzierte Mediendateien.

Bewusst ausgeschlossen sind unter anderem:

- Benutzer
- Sessions
- Payload-interne Tabellen
- `contact-submissions`

Damit überschreibt ein späterer Home-CMS-Sync keine Daten, die ausschließlich in der öffentlichen Cloudflare-Runtime entstanden sind.

## Sync-Konfiguration

Produktive Sync-Secrets liegen in:

```text
/etc/uccelli-cloud-sync.env
```

Beispielstruktur:

```bash
CLOUDFLARE_API_TOKEN=<token>
UCCELLI_D1_DATABASE=uccelli-prod
UCCELLI_R2_BUCKET=uccelli-media
UCCELLI_DB_PATH=/opt/uccelli-website/data/uccelli.db
UCCELLI_MEDIA_DIR=/opt/uccelli-website/media
UCCELLI_SYNC_STATE=/var/lib/uccelli-cloud-sync/state.json
```

Der echte API-Token wird niemals committed.

## Automatischer Sync

Systemd-Dateien im Repository:

```text
ops/systemd/uccelli-cloud-sync.service
ops/systemd/uccelli-cloud-sync.timer
```

Status:

```bash
systemctl status uccelli-cloud-sync.timer --no-pager
systemctl list-timers uccelli-cloud-sync.timer
```

Manueller Lauf:

```bash
sudo systemctl start uccelli-cloud-sync.service
```

Logs:

```bash
journalctl -u uccelli-cloud-sync.service -n 100 --no-pager
```

Der Timer läuft ungefähr alle zwei Minuten mit einem kleinen zufälligen Delay.

## Publikationslogik

Der Publisher arbeitet idempotent:

- Für die D1-Daten wird ein Inhalts-Hash berechnet.
- Wenn sich redaktionelle Daten nicht geändert haben, wird D1 nicht neu beschrieben.
- Medien werden anhand ihres lokalen Zustands nur hochgeladen, wenn sie neu oder geändert sind.
- Es werden nur Dateien publiziert, die in der Payload-Medienbibliothek referenziert sind.
- MIME-Typen stammen bevorzugt aus den Media-Metadaten der Datenbank.

## Medien auf Cloudflare

Die öffentliche Website liest Medien aus R2 über:

```text
/api/media/file/[filename]
```

Die Home-CMS-Buildvariante entfernt diese Cloudflare-spezifische R2-Passthrough-Route, damit Payload dort lokale Dateien ausliefern kann.

## Ausfallverhalten

### `freeza` ist offline

- CMS nicht erreichbar
- keine neuen Content-Publishes
- öffentliche Website bleibt erreichbar
- D1/R2 behalten den zuletzt publizierten Stand

### Tunnel ist offline

- CMS nicht erreichbar
- öffentliche Website bleibt erreichbar

### Sync schlägt fehl

- Redaktion kann lokal weiterarbeiten
- öffentliche Website zeigt weiterhin den letzten erfolgreichen Publish
- Fehler über systemd Journal untersuchen

### Cloudflare Worker/D1/R2 gestört

- öffentliche Website kann beeinträchtigt sein
- Home-CMS auf `freeza` bleibt davon grundsätzlich getrennt

## Sicherheitsgrenzen

- CMS ist nur über den eigenen Uccelli-Tunnel veröffentlicht.
- Keine öffentliche Portfreigabe ist für den Tunnel erforderlich.
- Payload behält seine eigene Benutzeranmeldung.
- Cloudflare Access ist für das aktuelle Setup nicht erforderlich.
- `PAYLOAD_SECRET`, Tunnel-Token und Cloudflare API-Token bleiben außerhalb von Git.
- SQLite und `media/` dürfen nicht committed werden.

## Schnelldiagnose

```bash
curl -I https://uccelli-society.ch
curl -I https://uccelli-society.ch/admin
curl -I https://cms.uccelli-society.ch/admin
curl -s https://cms.uccelli-society.ch/api/health

docker ps --filter name=uccelli-website
docker ps --filter name=uccelli-cloudflared

systemctl status uccelli-cloud-sync.timer --no-pager
journalctl -u uccelli-cloud-sync.service -n 50 --no-pager
```

## Weitere Dokumentation

- vollständige Architektur: [`ARCHITECTURE.md`](ARCHITECTURE.md)
- Betrieb und Recovery: [`RUNBOOK.md`](RUNBOOK.md)
- Environment-Beispiel: [`../.env.example`](../.env.example)
