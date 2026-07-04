# RUNBOOK – Uccelli Website

Betriebs-Handbuch: einmalige Pflicht-Aktionen nach diesem Update, Deployment,
Backups und Incident-Hilfe.

---

## 1. ⚠️ EINMALIGE PFLICHT-AKTIONEN (Sicherheit)

Die alten Datenbank-Dateien (`uccelli.db`, `data/uccelli.db`) lagen im Git-Repository
und enthalten den Passwort-Hash + Salt des Admin-Kontos `karim.moutiq@gmail.com`.
Das Löschen im aktuellen Commit reicht **nicht** — die Dateien bleiben in der
Git-Historie und damit auf GitHub abrufbar.

### 1a. Git-Historie bereinigen

```bash
# Einmalig installieren: pipx install git-filter-repo  (oder: brew install git-filter-repo)
git clone --mirror https://github.com/KarmaKami994/uccelli-website.git uccelli-mirror
cd uccelli-mirror
git filter-repo --invert-paths \
  --path uccelli.db \
  --path data/uccelli.db \
  --path-glob '*.db'
git push --force --mirror https://github.com/KarmaKami994/uccelli-website.git
```

Danach:
- Alle lokalen Klone der Mitwirkenden **neu klonen** (alte Klone enthalten die Historie weiter).
- GitHub-Support kann auf Anfrage gecachte Ansichten/Forks löschen ("sensitive data removal").

### 1b. Passwort rotieren

Das Passwort des Kontos `karim.moutiq@gmail.com` gilt als kompromittiert
(offline knackbar, sobald jemand die Historie geklont hat):

1. Neues, starkes Passwort im Payload-Admin setzen (`/admin` → Benutzer).
2. Falls dasselbe Passwort irgendwo anders verwendet wurde: **überall** ändern.

### 1c. PAYLOAD_SECRET rotieren

Das bisherige Secret war ggf. der Compose-Fallback (`change-me-…`) und stand im Repo.

```bash
openssl rand -hex 32   # neues Secret erzeugen
```

In `.env` auf dem Server eintragen (`PAYLOAD_SECRET=…`), dann `docker compose up -d`.
Folge: alle Admin-Sessions werden ungültig → einmal neu einloggen.

### 1d. Inhalte neu aufsetzen (Schema-Wechsel)

Dieses Update stellt auf **native Payload-Localization + Globals** um — das alte
DB-Schema ist inkompatibel. Auf dem Server (und der Preview) daher einmalig:

```bash
docker compose down
mv data/uccelli.db data/uccelli.db.ALT-$(date +%F)   # alte DB sichern, NICHT committen
docker compose up -d --build                          # wendet Migrationen automatisch an
docker compose exec uccelli npx tsx scripts/seed.ts   # Startinhalte einspielen
```

Danach im Admin: ersten Benutzer anlegen und Inhalte prüfen. Manuell gepflegte
Inhalte, die über den Seed hinausgehen, aus der Sicherungskopie abtippen bzw.
neu erfassen (die Alt-DB lässt sich lokal mit `sqlite3` öffnen).

---

## 2. Server-Setup (Hosttech vServer)

### Voraussetzungen

```bash
# Verzeichnisse müssen dem Container-User (UID 1000, "node") gehören:
mkdir -p data media
sudo chown -R 1000:1000 data media
```

### Environment

`.env` neben `docker-compose.yml` (niemals committen):

```
PAYLOAD_SECRET=<openssl rand -hex 32>
SITE_URL=https://uccelli-society.ch
RESEND_API_KEY=re_…
TURNSTILE_SITE_KEY=0x…
TURNSTILE_SECRET_KEY=0x…
```

Hinweise:
- Ohne `PAYLOAD_SECRET` **startet der Container absichtlich nicht** (Fail-Fast).
- Turnstile: Site Key + Secret Key im Cloudflare-Dashboard für die Domain anlegen.
  Sobald der Secret Key gesetzt ist, ist die Bot-Prüfung serverseitig Pflicht.
- Resend: Domain `uccelli-society.ch` verifizieren, damit `noreply@uccelli-society.ch` sendet.

### Start & Kontrolle

```bash
docker compose up -d --build
docker compose ps            # STATUS muss "healthy" werden (Healthcheck /api/health)
docker compose logs -f uccelli
```

Nginx Proxy Manager: Host → `uccelli-website:3000` (Netzwerk `npm`), SSL via Let's Encrypt,
"Block Common Exploits" + WebSocket-Support aktivieren.

---

## 3. Backups

SQLite-Datei + Uploads sichern. Beispiel-Cronjob (täglich 03:15, 14 Tage Aufbewahrung):

```bash
sudo tee /etc/cron.d/uccelli-backup << 'CRON'
15 3 * * * root cd /pfad/zu/uccelli && \
  sqlite3 data/uccelli.db ".backup '/var/backups/uccelli/db-$(date +\%F).db'" && \
  tar czf /var/backups/uccelli/media-$(date +\%F).tgz media/ && \
  find /var/backups/uccelli -mtime +14 -delete
CRON
sudo mkdir -p /var/backups/uccelli
```

`.backup` ist konsistent auch bei laufendem Server (im Gegensatz zu `cp`).
Backups zusätzlich **offsite** kopieren (z.B. `rclone`/`restic` zu einem Cloud-Storage) —
ein Backup auf demselben Server schützt nicht vor Serververlust.

Restore:

```bash
docker compose down
cp /var/backups/uccelli/db-YYYY-MM-DD.db data/uccelli.db
sudo chown 1000:1000 data/uccelli.db
docker compose up -d
```

---

## 4. Betrieb & Incidents

| Symptom | Prüfen |
|---|---|
| Container "unhealthy" | `docker compose logs uccelli` — meist DB-Pfad/Rechte (`chown 1000:1000 data media`) |
| Container startet nicht, Log `[FATAL] PAYLOAD_SECRET` | `.env` fehlt oder Variable leer |
| Seite zeigt Fehler-Boundary ("Etwas ist schiefgelaufen") | DB-Fehler in den Logs — absichtlich sichtbar statt leerer Seite |
| Kontaktformular 403 | Turnstile-Keys prüfen (Site Key ↔ Secret Key derselben Widget-Konfiguration) |
| Kontaktformular 429 | Rate-Limit (5 Anfragen / 15 Min / IP) — gewollt |
| CMS-Änderung nicht sichtbar | ISR-Cache: max. 5 Minuten warten |
| Admin-Login klemmt nach Secret-Rotation | erwartet — Sessions wurden invalidiert, neu einloggen |

### Schema-Änderungen deployen

Nach Änderungen an `collections/` oder `globals/`:

```bash
npm run generate:types                 # Typen aktualisieren
npm run migrate:create <beschreibung>  # Migration erzeugen
git add migrations/ payload-types.ts && git commit
# Deploy: Container wendet die Migration beim Start automatisch an
```

---

## 5. Was dieses Update NICHT automatisch erledigt

- [ ] Git-Historie bereinigen (1a) — **manuell, dringend**
- [ ] Admin-Passwort rotieren (1b) — **manuell, dringend**
- [ ] `PAYLOAD_SECRET` rotieren (1c)
- [ ] Turnstile-Keys anlegen und in `.env` eintragen
- [ ] Resend-Domain verifizieren
- [ ] Backup-Cron + Offsite-Kopie einrichten (3)
- [ ] `vereinsstatuten.pdf`: der tote Footer-Link wurde entfernt. Wenn die Statuten
      online sollen: PDF im Admin unter Media hochladen und im Footer neu verlinken.
