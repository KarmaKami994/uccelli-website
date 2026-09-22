# Hybridbetrieb: Cloudflare Website + Payload Admin auf dem Home-Server

## Zielbild

- Die öffentliche Website läuft auf Cloudflare Workers.
- Produktionsinhalte liegen in Cloudflare D1.
- Produktionsmedien liegen in Cloudflare R2.
- Der schwere Payload-Admin läuft nur auf dem Home-Server.
- `/admin` auf der öffentlichen Website leitet zum Home-CMS weiter.
- Der Home-Server ist **nicht** für die Verfügbarkeit der öffentlichen Website nötig.

Aktueller Admin-Ursprung:

```
https://uccelli.qrwed.uk
```

Später kann `ADMIN_ORIGIN` auf z. B. `https://admin.uccelli.ch` geändert werden.

## Home-CMS aktualisieren

Auf `freeza`:

```bash
cd /opt/uccelli-website
git pull

docker compose up -d --build
docker compose ps
```

Das Compose-Setup verwendet `Dockerfile.admin`. Beim Build wird die lokale
SQLite-Konfiguration eingesetzt und die Cloudflare-spezifische R2-Dateiroute
entfernt. Die bestehende Datenbank und Medien bleiben als Volumes eingebunden:

```
/opt/uccelli-website/data/uccelli.db
/opt/uccelli-website/media/
```

Der Container bleibt absichtlich unter dem bisherigen Namen
`uccelli-website`, damit bestehende Reverse-Proxy-Ziele nicht angepasst werden
müssen.

## Was wird synchronisiert?

`scripts/cloud-sync.py` veröffentlicht redaktionelle Daten aus SQLite nach D1
und neue/geänderte Dateien aus `media/` nach R2.

Synchronisiert werden unter anderem:

- Projekte
- News
- Events
- Team
- Partner
- FAQs
- Netzwerk
- Werte
- Kurse
- Seiten
- Community
- Homepage
- Navigation
- Media-Metadaten und Dateien

Bewusst **nicht** vom Home-Server überschrieben werden:

- Payload-Benutzer und Sessions
- Payload-interne Tabellen
- Contact-Submissions aus der öffentlichen Website

Damit kann eine neue Kontaktanfrage in D1 nicht durch einen späteren CMS-Sync
gelöscht werden.

## Cloudflare-Token für den Sync

Für den Dauerbetrieb einen eigenen, möglichst eingeschränkten API-Token
verwenden. Der Token wird nicht im Repository gespeichert.

Datei anlegen:

```bash
sudo install -m 600 /dev/null /etc/uccelli-cloud-sync.env
sudo nano /etc/uccelli-cloud-sync.env
```

Inhalt:

```bash
CLOUDFLARE_API_TOKEN=DEIN_TOKEN
UCCELLI_D1_DATABASE=uccelli-prod
UCCELLI_R2_BUCKET=uccelli-media
UCCELLI_DB_PATH=/opt/uccelli-website/data/uccelli.db
UCCELLI_MEDIA_DIR=/opt/uccelli-website/media
UCCELLI_SYNC_STATE=/var/lib/uccelli-cloud-sync/state.json
```

## Ersten Sync testen

```bash
cd /opt/uccelli-website
set -a
source /etc/uccelli-cloud-sync.env
set +a

python3 scripts/cloud-sync.py --dry-run
python3 scripts/cloud-sync.py --force
```

Der erste echte Lauf lädt vorhandene lokale Medien bei Bedarf nach R2 und
veröffentlicht die redaktionellen Tabellen nach D1. Weitere Läufe vergleichen
einen Inhalts-Hash und überspringen D1, wenn sich nichts geändert hat.

## Automatischen Sync aktivieren

```bash
sudo cp ops/systemd/uccelli-cloud-sync.service /etc/systemd/system/
sudo cp ops/systemd/uccelli-cloud-sync.timer /etc/systemd/system/

sudo mkdir -p /var/lib/uccelli-cloud-sync
sudo systemctl daemon-reload
sudo systemctl enable --now uccelli-cloud-sync.timer
```

Status prüfen:

```bash
systemctl status uccelli-cloud-sync.timer
systemctl list-timers uccelli-cloud-sync.timer
```

Einen Lauf sofort auslösen:

```bash
sudo systemctl start uccelli-cloud-sync.service
```

Logs:

```bash
journalctl -u uccelli-cloud-sync.service -n 100 --no-pager
```

Der Timer läuft ungefähr alle zwei Minuten. Die öffentliche Website kann
zusätzlich durch Next.js-Revalidation einige Minuten benötigen, bis ein neuer
Stand sichtbar ist.

## Admin-Aufruf

Auf dem Home-CMS selbst bleibt Payload unter:

```
https://uccelli.qrwed.uk/admin
```

Die öffentliche Cloudflare-Version fängt `/admin` bereits im leichten
Middleware-Layer ab und leitet dorthin weiter. Dadurch muss der Payload-Admin
nicht mehr im Cloudflare Worker gerendert werden und das 10-ms-CPU-Limit des
Free-Plans spielt für das CMS keine Rolle.

## Später auf admin.uccelli.ch wechseln

Sobald der neue Hostname auf denselben Home-Server zeigt:

1. `ADMIN_ORIGIN=https://admin.uccelli.ch` in der Home-`.env` setzen.
2. Den Default `DEFAULT_ADMIN_ORIGIN` in `middleware.ts` auf den neuen
   Hostnamen ändern und Cloudflare neu deployen.
3. Reverse Proxy / Tunnel auf Port 3100 zeigen lassen.

Cloudflare Access ist für dieses Setup nicht erforderlich. Payload behält seine
eigene Benutzeranmeldung.
