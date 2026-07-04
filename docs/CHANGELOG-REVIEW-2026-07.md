# Changelog – Engineering-Review-Umsetzung (Juli 2026)

Vollständige Umsetzung aller Findings aus `uccelli-engineering-review.md`.
Getroffene Entscheidungen (abgestimmt): **native Payload-Localization**,
**Cookie-Banner bleibt**, **Seeding per CLI statt HTTP**.

## 🔴 Sicherheit

| Finding | Fix |
|---|---|
| S1: Datenbanken mit Admin-Credentials im Repo | `uccelli.db` + `data/uccelli.db` gelöscht; `.gitignore` blockiert `*.db`, `/data/`, `/media/`. **Historien-Bereinigung + Passwort-Rotation: manuell, siehe `docs/RUNBOOK.md` §1.** |
| S2: Stored XSS über `LexicalRenderer` | Komponente gelöscht; überall der offizielle, escapende `RichTextRenderer` (PersonCard, Accordion, Partner, Netzwerke, Events, News, Werte, Pages). |
| S3: Keine Access-Control | `lib/access.ts`: Public-Read/Auth-Write auf allen Content-Collections & Media (behebt auch anonym blockierte Media-Files); Benutzer-Collection mit echtem RBAC — nur Admins erstellen/löschen Benutzer, `role`-Feld nur von Admins änderbar (Privilege-Escalation Editor→Admin geschlossen). |
| S4: Turnstile wirkungslos (Bypass durch Weglassen des Tokens) | Serverseitig **Pflicht** sobald `TURNSTILE_SECRET_KEY` gesetzt (403 ohne/mit ungültigem Token); echtes Widget im Formular (`@marsidev/react-turnstile`), Token-Reset bei Fehler/Ablauf. Durch Tests abgedeckt. |
| S5: Rate-Limiter spoofbar & unbegrenzt wachsend | Letzter (vertrauenswürdiger) `x-forwarded-for`-Eintrag statt erstem; abgelaufene Einträge werden weggeräumt. Durch Tests abgedeckt. |
| S6: Unsichere Secret-Fallbacks + `/api/seed?key=` | Fail-Fast: Server startet ohne `PAYLOAD_SECRET` nicht (`instrumentation.ts` + Guard in `payload.config.ts`); Compose-Fallback entfernt (`:?`-Pflichtvariable); beide HTTP-Seed-Endpoints gelöscht → `npm run seed` (CLI, idempotent); `.env.example` ergänzt. |

## 🟠 Funktionale Bugs

| Finding | Fix |
|---|---|
| F1: FAQ crasht (Lexical-Objekt als React-Child) + kaputtes JSON-LD | Accordion nimmt gerenderten Rich Text; `lexicalToPlainText()` liefert valides FAQ-JSON-LD. Gleicher Bug auch auf der Partner-Seite gefunden & behoben. |
| F2: News-Details hartcodiert (CMS-Posts → 404) | `/programm/news/[slug]` liest jetzt aus der `posts`-Collection (`getPostBySlug`). |
| F3: i18n-Content-Modell kaputt (locale-Feld nie abgefragt) | **Native Payload-Localization** (`de`/`en`, Fallback auf DE): ein Dokument pro Inhalt, übersetzbare Felder, sprachunabhängige Slugs → Language-Switcher funktioniert auf allen Seiten. Datenlayer & alle Seiten locale-aware. |
| F4: Footer-Slug-Mismatch + toter PDF-Link | Footer-Werte kommen aus dem CMS (Titel & Slugs); Seed-Slug `datenschutz-wert`→`datenschutz` (Redirect `/practice/datenschutz` funktioniert, generisch via `/practice/:wert`); toter `vereinsstatuten.pdf`-Link entfernt (Re-Upload siehe RUNBOOK §5). |
| F5: SponsorBanner hartcodiert | Wird von der Homepage aus der `partners`-Collection gespeist; leere Liste ⇒ Sektion ausgeblendet. |
| F6: Dropdown/Modal nicht tastaturbedienbar | Desktop-Dropdowns öffnen bei Fokus, schliessen mit Escape, `aria-expanded`/`aria-haspopup`; PersonCard-Modal: `role="dialog"`, `aria-modal`, Fokus auf Schliessen-Button, Escape, Enter/Space auf der Karte; Skip-Link ergänzt. |
| F7: Rohe ISO-Datumsausgabe | `formatEventDate(date, locale)` (de-CH/en-GB), genutzt in AttentionBanner & Veranstaltungen. |
| F8: Leere Sitemap + fehlendes hreflang | `app/sitemap.ts` (CMS-basiert, mit Sprach-Alternates) ersetzt next-sitemap + committete leere Datei; jede Seite liefert Canonical + `hreflang` (de/en/x-default) via `lib/seo.ts`. |

## 🟡 Architektur & Performance

- **Rendering:** On-Demand ISR (`revalidate = 300`) mit `setRequestLocale` — CMS-Änderungen nach max. 5 Min live; `next build` braucht keine Datenbank mehr.
- **Datenlayer:** `payload-types.ts` generiert und genutzt; `lib/payload.ts`/`lib/data.ts` vollständig typisiert (keine `as any` mehr), `React.cache()` dedupliziert doppelte Queries (generateMetadata + Page); Layout lädt Navigation/Events/Werte parallel (`Promise.all`); `getBannerEvents`-Duplikat entfernt.
- **Fehlerbehandlung:** Datenlayer verschluckt keine DB-Fehler mehr → `app/[locale]/error.tsx` (Error-Boundary) statt stiller leerer Seite.
- **Globals:** Homepage & Navigation sind echte Payload-Globals (kein "nur ein Eintrag erlaubt"-Workaround, Navigations-Reihenfolge per Drag & Drop statt `order`-Feld).
- **Migrationen:** Initiale DB-Migration committet; Container führt `payload migrate` beim Start aus.
- **Contact-API:** geteiltes Zod-Schema (Client mit Übersetzungen + Server identisch), Längenlimits, JSON-Parse-Guard, Newline-Stripping im Betreff.

## 🧹 Aufräumarbeiten

- Gelöscht: `LexicalRenderer`, `app/api/seed/`, `app/api/contact/seed/`, `next-sitemap` (+Config+postbuild), `@fontsource/lato`, `public/sitemap.xml`, `PRD.md.bak`, `PRD_v5.md`, Wallhaven-Platzhalter-PNGs, doppeltes Logo, doppelte Font-Definition im Root-Layout, 32 redundante Redirects (48→16, Trailing-Slash-Duplikate + Doppel-Hops über `/de/…`).
- Dedupliziert: Social-Icons (`SocialIcons`-Komponente statt Copy-Paste in Footer + Kontakt).
- `package.json`: `"type": "module"` (Payload-3-Standard, behebt den ESM-CLI-Fehler aus der PRD), Scripts für `typecheck`/`migrate`/`seed`/`generate:*`; `package-lock.json` neu generiert (war out-of-sync — `npm ci` schlug fehl).
- README neu geschrieben (war veraltet: React 18, Vercel, "CMS geplant"); `docs/COMMANDS.md` aktualisiert; **`docs/RUNBOOK.md` neu** (Pflicht-Aktionen, Deploy, Backups, Incidents).

## 🏗️ Infrastruktur

- **Dockerfile:** Multi-Stage (`npm ci` → Build → `npm prune --omit=dev`), läuft als `node` (non-root), `HEALTHCHECK` auf neuem `/api/health`, `CMD` = migrate + start.
- **docker-compose:** kein Secret-Fallback mehr (Pflichtvariable), `SITE_URL` ergänzt.
- **CI:** `.github/workflows/ci.yml` — Lint, Typecheck, Tests, Build auf Node 22.

## ✅ Tests

34 → **55 Tests** (alle grün). Neu: Contact-API (Validierung, Rate-Limit inkl. Spoofing-Szenario, Turnstile-Pflicht), `lexicalToPlainText`, `formatEventDate`, `resolveImageUrl`, `localizedUrl`, SponsorBanner-Empty-State, Modal-A11y (Escape/Enter/`role=dialog`). Verifiziert ausserdem per Live-Smoke-Test: alle Routen 200, Inhalte aus CMS, hreflang im Head & Sitemap, 403 ohne Turnstile-Token, Server-Startabbruch ohne Secret, Seed-Idempotenz.

## ⚠️ Breaking / Manuell nötig

1. **DB-Schema inkompatibel** (Localization + Globals): Server-DB neu aufsetzen → RUNBOOK §1d.
2. **Git-Historie bereinigen + Passwörter/Secret rotieren** → RUNBOOK §1a–1c (dringend).
3. `npm install` einmal lokal ausführen (neue Dependencies: `@marsidev/react-turnstile`, `tsx`; entfernt: `@fontsource/lato`, `next-sitemap`).
4. Turnstile-Keys + `SITE_URL` in `.env` setzen (sonst läuft das Formular ohne Bot-Schutz bzw. zeigen Canonicals auf die Default-Domain).
