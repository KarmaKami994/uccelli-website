# Uccelli Website – Befehls-Referenz

## Täglich verwenden

| Befehl | Was es tut |
|--------|-----------|
| `npm run dev` | Startet den Entwicklungsserver auf localhost:3000 |
| `npm run build` | Erstellt einen Production-Build + generiert Sitemap + importMap |
| `npm test` | Führt alle Unit-Tests einmal aus |
| `npx vitest` | Startet Tests im Watch-Mode (reagiert auf Dateiänderungen) |

## Payload CMS

| Befehl | Was es tut |
|--------|-----------|
| `localhost:3000/admin` | Öffnet das Admin-Dashboard im Browser |
| `localhost:3000/admin/collections/team-members/create` | Neues Team-Mitglied erstellen |
| `localhost:3000/admin/collections/projects/create` | Neues Projekt erstellen |
| `localhost:3000/admin/collections/posts/create` | Neuen News-Artikel erstellen |
| `localhost:3000/admin/collections/events/create` | Neues Event erstellen |
| `localhost:3000/admin/collections/partners/create` | Neuen Partner/Sponsor erstellen |
| `localhost:3000/admin/collections/faqs/create` | Neue FAQ erstellen |
| `localhost:3000/admin/collections/pages/create` | Neue statische Seite erstellen |
| `localhost:3000/admin/collections/media` | Alle hochgeladenen Bilder/PDFs verwalten |
| `Remove-Item uccelli.db` | Datenbank komplett zurücksetzen (PowerShell) |

## Probleme beheben

| Problem | Lösung |
|---------|--------|
| Seite lädt nicht / weisser Bildschirm | `rmdir /s /q .next` dann `npm run dev` |
| Module not found | `npm install` |
| importMap Fehler im Admin | `npm run build` dann `npm run dev` |
| Port 3000 belegt | `npx next dev -p 3001` (nutzt Port 3001) |
| Datenbank-Fehler / korrupte Daten | `Remove-Item uccelli.db` dann `npm run dev` |
| TypeScript-Fehler nach Änderungen | `npx next build` zeigt alle Fehler |

## Git (wenn GitHub eingerichtet)

| Befehl | Was es tut |
|--------|-----------|
| `git add .` | Alle Änderungen vormerken |
| `git commit -m "Beschreibung"` | Änderungen speichern |
| `git push` | Auf GitHub hochladen |
| `git pull` | Neueste Version von GitHub holen |

## Projektstruktur — wo ist was?

| Ordner/Datei | Inhalt |
|-------------|--------|
| `app/[locale]/` | Alle Seiten der Website |
| `app/(payload)/` | Payload Admin-Panel (nicht anfassen) |
| `components/` | Wiederverwendbare UI-Bausteine |
| `collections/` | CMS Datenstruktur-Definitionen |
| `messages/de.json` | Alle deutschen Texte |
| `messages/en.json` | Alle englischen Texte |
| `public/images/` | Bilder (Platzhalter → hier finale Bilder rein) |
| `public/fonts/` | Schriftarten (Lato) |
| `styles/globals.css` | Globale Styles + Tailwind Theme |
| `.env.local` | Geheime Schlüssel (nicht committen!) |
| `payload.config.ts` | CMS-Konfiguration |
| `next.config.ts` | Next.js Einstellungen + 301-Redirects |
| `uccelli.db` | SQLite Datenbank (wird automatisch erstellt) |
| `tests/` | Unit-Tests |
| `docs/PRD.md` | Projekt-Dokumentation |
