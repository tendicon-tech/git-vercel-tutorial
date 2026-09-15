# Konzept: Tutorial-Webseite „Git & Vercel – vom ersten Commit zum Live-Deployment"

## 1. Ziel & Idee

Eine Tutorial-Webseite, die Einsteiger:innen Schritt für Schritt erklärt,

1. wie sie ihre Entwicklungsumgebung unter Windows einrichten,
2. wie Git funktioniert (Commits, Branches, Remotes, Merges, Konflikte) und
3. wie sie ein Astro-Projekt über GitHub automatisch auf Vercel deployen.

**Besonderheit:** Die Webseite ist selbst mit genau diesem Stack gebaut (Astro → GitHub → Vercel). Das Repository ist **öffentlich** – Leser:innen können den Quellcode der Seite ansehen, forken und den im Tutorial beschriebenen Workflow direkt nachvollziehen.

## 2. Zielgruppe

- Personen ohne oder mit wenig Erfahrung mit Git und Terminal
- Grundkenntnisse im Umgang mit dem Computer (Dateien, Ordner, Programme installieren)
- Betriebssystem: **ausschließlich Windows** (10/11)

## 3. Lernergebnis

Nach dem Tutorial können Leser:innen:

- VS Code, Node.js, Git (inkl. Git Bash) und Claude Code installieren und nutzen
- Commits im Terminal und in VS Code erstellen
- Branches anlegen, wechseln, pushen und zusammenführen
- Merge-Konflikte erkennen und lösen
- ein Astro-Projekt erstellen, auf GitHub veröffentlichen und über Vercel automatisch deployen

---

## 4. Technischer Aufbau der Webseite

Bewusst **oldschool und basic**: reines Astro, kein Theme, keine UI-Bibliothek, kein Client-JavaScript.

| Bereich | Technologie |
|---|---|
| Framework | **Astro** (ohne Starlight oder andere Themes) |
| Inhalte | Markdown-Dateien in `src/pages/`, die über ein gemeinsames Layout gerendert werden |
| Styling | Eine einfache, handgeschriebene CSS-Datei |
| Code-Hervorhebung | Astros eingebautes Syntax-Highlighting (wird beim Build erzeugt, kein JavaScript im Browser) |
| Bilder | Screenshots als PNG in `public/images/`, Git-Diagramme als statische Bilder/SVG |
| Versionierung | Git, **öffentliches** Repository auf **GitHub** |
| Hosting & Deployment | **Vercel** (automatisches Deployment bei jedem Push auf `main`, Preview-Deployments für Branches/Pull Requests) |
| Sprache | Deutsch |

### Geplante Projektstruktur

```
git-vercel-tutorial/
├── public/
│   └── images/
│       ├── teil-1/          # Screenshots Einrichtung
│       ├── teil-2/          # Screenshots & Diagramme Git
│       └── teil-3/          # Screenshots Astro & Vercel
├── src/
│   ├── layouts/
│   │   └── TutorialLayout.astro   # Kopfzeile, Navigation, Inhalt, Weiter/Zurück
│   ├── components/
│   │   └── Navigation.astro       # statische Inhaltsübersicht
│   ├── styles/
│   │   └── global.css
│   └── pages/
│       ├── index.astro            # Startseite
│       ├── teil-1/                # je Lektion eine .md-Datei
│       ├── teil-2/
│       └── teil-3/
├── astro.config.mjs
├── package.json
└── README.md
```

### Wiederkehrende Elemente auf jeder Tutorial-Seite

Alles rein statisch – **keine interaktiven Elemente** (kein Kopier-Button, keine Tabs, kein Quiz, kein gespeicherter Fortschritt).

- **Ziel der Lektion** (1–2 Sätze)
- **Voraussetzungen** (Link auf vorherige Lektion)
- **Code-Blöcke** mit Syntax-Hervorhebung
- **Hinweise** als einfach gestaltete Absätze: Tipp, Achtung, Häufiger Fehler
- **Screenshots** zu jedem wichtigen Schritt, mit kurzer Bildunterschrift
- **Zusammenfassung „Das solltest du jetzt haben"** als einfache Aufzählung am Ende
- **Weiter/Zurück-Links**

### Screenshots

- Werden auf dem **Mac** erstellt – VS Code, GitHub, Vercel und der Browser sehen unter Windows nahezu identisch aus
- Ausnahmen, die unter Windows aufgenommen oder durch offizielle Abbildungen/Beschreibungen ersetzt werden: Windows-Installer (VS Code, Git for Windows, Node.js) und Git Bash
- Terminal-Ausgaben werden bevorzugt als Code-Block statt als Screenshot gezeigt (plattformneutral)
- Hinweis auf der Startseite: „Die Screenshots stammen teilweise vom Mac – unter Windows sieht es fast genauso aus"
- Einheitliche Fenstergröße
- Dateinamen nach Schema `teil-2/05-vscode-commit.png`
- Wichtige Stellen werden mit roten Rahmen/Pfeilen markiert
- Jeder Screenshot bekommt einen aussagekräftigen `alt`-Text
- Keine persönlichen Daten sichtbar (Test-Account für GitHub/Vercel verwenden)

---

## 5. Inhaltliche Gliederung

### Startseite

- Kurze Einführung: Was lernt man, für wen ist das Tutorial?
- Hinweis: Das Tutorial ist für Windows geschrieben, Screenshots stammen teilweise vom Mac
- Überblick über die drei Teile mit Links
- Hinweis: „Diese Seite wurde selbst mit Astro gebaut, liegt öffentlich auf GitHub und wird über Vercel deployt" + Link zum Repository

---

### Teil 1 – Einrichtung der Entwicklungsumgebung

#### 1.1 Überblick: Welche Werkzeuge brauchen wir und wofür?
Kurze Erklärung jedes Werkzeugs in einem Satz:
- **VS Code** – Code-Editor
- **Git / Git Bash** – Versionsverwaltung und das Terminal, das wir unter Windows verwenden
- **Node.js** – JavaScript-Laufzeitumgebung, wird für Astro benötigt (inkl. npm)
- **Astro** – Framework für Webseiten
- **Claude Code** – KI-Assistent im Terminal
- **GitHub** – Online-Speicherort für Git-Repositories
- **Vercel** – Hosting-Plattform, die Webseiten automatisch veröffentlicht

#### 1.2 Accounts anlegen
- **GitHub**: Registrierung auf github.com, E-Mail bestätigen, Benutzername wählen (Tipp: seriös wählen, er ist öffentlich sichtbar), 2-Faktor-Authentifizierung empfehlen
- **Vercel**: Registrierung auf vercel.com mit „Continue with GitHub" (Hobby-Plan, kostenlos) – dadurch ist die Verbindung zu GitHub von Beginn an vorhanden
- **Claude**: Account auf claude.ai anlegen; Hinweis, dass Claude Code ein kostenpflichtiges Abo (Pro/Max) oder ein Anthropic-Console-Konto benötigt

#### 1.3 VS Code installieren
- Download von code.visualstudio.com
- Installer-Optionen: „Zu PATH hinzufügen" und „Mit Code öffnen" im Kontextmenü aktivieren
- Kurze Tour: Explorer, Suche, Source Control, Extensions, integriertes Terminal (``Strg+` ``)
- Optional: deutsches Sprachpaket, Astro-Extension

#### 1.4 Git für Windows installieren (inkl. Git Bash)
- Download von git-scm.com
- Wichtige Installer-Optionen erklären (mit Screenshots):
  - Standard-Editor: VS Code
  - Standard-Branchname: `main`
  - Git Credential Manager aktiviert lassen
- Git Bash in VS Code als Standard-Terminal festlegen
- Erstkonfiguration:
  ```bash
  git config --global user.name "Vorname Nachname"
  git config --global user.email "mail@beispiel.de"
  git config --global init.defaultBranch main
  ```
- Test: `git --version`

#### 1.5 Node.js installieren
- Download der **LTS-Version** von nodejs.org (Windows-Installer)
- Erklären: LTS vs. Current
- Test in Git Bash: `node -v` und `npm -v`

#### 1.6 Claude Code installieren
- Installation laut offizieller Anleitung für Windows (nativer Installer oder `npm install -g @anthropic-ai/claude-code`)
- Erster Start mit `claude` im Projektordner, Login mit dem Claude-Account
- Kurze Einordnung: Wofür kann man Claude Code im Tutorial nutzen (Befehle erklären lassen, Fehler verstehen, Commit-Messages formulieren) – Hinweis: die Grundlagen trotzdem selbst verstehen

#### 1.7 Astro – was muss installiert werden?
- Erklären: Astro wird **nicht global installiert**, sondern pro Projekt über `npm create astro@latest` (Details in Teil 3)
- Optional: Astro-Extension für VS Code installieren

#### 1.8 In VS Code bei GitHub anmelden
- Accounts-Symbol unten links → „Mit GitHub anmelden" → Browser-Autorisierung
- Alternativ beim ersten Push über den Git Credential Manager
- Test: Source-Control-Ansicht zeigt Option „Auf GitHub veröffentlichen"

#### Das solltest du jetzt haben
- GitHub-, Vercel- und Claude-Account
- Funktionierende Befehle: `code`, `git --version`, `node -v`, `npm -v`, `claude --version`
- Konfigurierten Git-Namen und -E-Mail
- VS Code mit GitHub verbunden

---

### Teil 2 – Wie funktioniert Git?

#### 2.1 Warum Versionsverwaltung?
- Problem: `projekt_final_v2_wirklich_final.zip`
- Git als „Zeitmaschine" für Projekte; Zusammenarbeit im Team
- Unterschied **Git** (Werkzeug) vs. **GitHub** (Plattform)

#### 2.2 Grundbegriffe
- **Repository** (Repo) – Projektordner mit Versionsgeschichte (`.git`-Ordner, im Windows-Explorer versteckt)
- **Die drei Bereiche**: Arbeitsverzeichnis → Staging-Area → Repository (Diagramm)
- Dateistatus: untracked, modified, staged, committed
- `.gitignore` (z. B. `node_modules/`, `.env`)

#### 2.3 Was ist ein Commit?
- Ein Commit = gespeicherter Schnappschuss des Projekts zu einem Zeitpunkt
- Bestandteile: eindeutige ID (Hash), Autor:in, Datum, Nachricht, Verweis auf Vorgänger-Commit
- Visualisierung als Kette von Commits
- Gute Commit-Messages: kurz, im Imperativ, beschreibt *was* und *warum* (Beispiele gut/schlecht)
- Wie groß sollte ein Commit sein? („eine logische Änderung pro Commit")

#### 2.4 Commit im Terminal (Git Bash)
Übungsprojekt: Ordner `git-uebung` mit einer `notizen.txt`
```bash
git init
git status
git add notizen.txt      # oder: git add .
git commit -m "Notizen-Datei hinzufügen"
git log --oneline
git diff
```
- Jeden Befehl erklären, typische Ausgaben als Screenshot zeigen

#### 2.5 Commit in VS Code
- Source-Control-Ansicht (Screenshots)
- Änderungen ansehen (Diff-Ansicht), Dateien stagen (`+`), Nachricht eingeben, „Commit" klicken
- Gegenüberstellung als Tabelle: Welche Aktion in VS Code entspricht welchem Terminal-Befehl?

#### 2.6 Branches – was ist das und wie erzeugt man einen?
- Konzept: Branch = beweglicher Zeiger auf einen Commit; paralleler Entwicklungszweig
- Warum Branches? Neue Features ausprobieren, ohne `main` zu gefährden
- `HEAD` erklären
- Terminal:
  ```bash
  git branch                      # Branches anzeigen
  git switch -c feature/kontakt   # neuen Branch anlegen und wechseln
  git switch main                 # zurückwechseln
  ```
- VS Code: Branchname in der Statusleiste unten links → „Neuen Branch erstellen"
- Namenskonventionen: `feature/…`, `fix/…`

#### 2.7 Auf einem Branch committen
- Änderungen auf dem Feature-Branch machen und committen (Terminal & VS Code)
- Zeigen: Zwischen Branches wechseln → Dateien im Ordner ändern sich
- Diagramm: `main` und `feature` laufen auseinander
- `git log --oneline --graph --all`

#### 2.8 Remote-Repositories & Remote-Branches
- Was ist ein Remote? (`origin`)
- Repository auf GitHub anlegen und lokal verbinden:
  ```bash
  git remote add origin https://github.com/<user>/git-uebung.git
  git push -u origin main
  ```
- Anmeldung beim ersten Push über den Git Credential Manager (Screenshot)
- Alternative in VS Code: „Publish to GitHub"
- Branch pushen: `git push -u origin feature/kontakt`
- `git fetch` vs. `git pull` – Unterschied erklären
- Lokale Branches vs. Remote-Tracking-Branches (`origin/main`)
- `git clone` – ein bestehendes Repository herunterladen
- VS Code: Sync-Button, ahead/behind-Anzeige (↑1 ↓2)

#### 2.9 Merges
- Branch in `main` zusammenführen:
  ```bash
  git switch main
  git merge feature/kontakt
  ```
- **Fast-Forward-Merge** vs. **Merge-Commit** (Diagramme)
- Merge über GitHub: **Pull Request** erstellen, prüfen, mergen (Screenshots)
- Nach dem Merge: Branch löschen (lokal und remote), `main` aktualisieren mit `git pull`

#### 2.10 Merge-Konflikte
- Wann entsteht ein Konflikt? (gleiche Zeile in zwei Branches unterschiedlich geändert)
- Übung: Konflikt absichtlich erzeugen
- Konfliktmarker verstehen:
  ```
  <<<<<<< HEAD
  Text aus main
  =======
  Text aus dem Feature-Branch
  >>>>>>> feature/kontakt
  ```
- Lösen im Terminal: Datei bearbeiten → `git add` → `git commit`
- Lösen in VS Code: „Accept Current / Incoming / Both", Merge-Editor (Screenshots)
- Notausgang: `git merge --abort`
- Tipps zur Vermeidung: oft pullen, kleine Branches, Absprachen im Team

#### 2.11 Spickzettel (Cheat Sheet)
- Statische Tabelle aller Befehle aus Teil 2 mit Kurzbeschreibung und VS-Code-Entsprechung

#### Das solltest du jetzt haben
- Verständnis, was ein Commit und ein Branch ist
- Commits im Terminal und in VS Code erstellt
- Einen Branch erstellt, gepusht und gemergt
- Einen Merge-Konflikt gelöst

---

### Teil 3 – Erstes Astro-Projekt & Deployment mit Vercel

#### 3.1 Was ist Astro?
- Kurz: Framework für schnelle, inhaltsorientierte Webseiten
- Hinweis: „Diese Tutorial-Seite ist selbst ein Astro-Projekt – schau dir den Code auf GitHub an"

#### 3.2 Astro-Projekt erstellen
```bash
npm create astro@latest
```
- Fragen des Assistenten Schritt für Schritt erklären (Projektname, Template, Abhängigkeiten installieren, Git-Repository initialisieren) – mit Screenshots aus Git Bash
- Projekt in VS Code öffnen: `code mein-astro-projekt`

#### 3.3 Projektstruktur verstehen
- `src/pages/`, `src/components/`, `src/layouts/`, `public/`, `astro.config.mjs`, `package.json`
- Warum `node_modules` nicht ins Repository gehört (`.gitignore` ist schon vorhanden)

#### 3.4 Lokal starten und erste Änderung
```bash
npm run dev
```
- `http://localhost:4321` im Browser öffnen
- Startseite anpassen → Live-Reload beobachten
- Änderung committen (Wiederholung aus Teil 2)
- Optional: Claude Code bitten, eine neue Seite `ueber-mich.astro` anzulegen

#### 3.5 Projekt auf GitHub veröffentlichen
- Neues Repository auf GitHub anlegen (ohne README, damit es keine Konflikte gibt) **oder** „Publish to GitHub" in VS Code
- `git remote add origin …` und `git push -u origin main`
- Kontrolle: Dateien sind auf GitHub sichtbar

#### 3.6 GitHub mit Vercel verbinden
- Vercel-Dashboard → „Add New… → Project"
- GitHub-Zugriff erlauben (Vercel GitHub App, ggf. nur ausgewählte Repositories)
- Repository importieren → Vercel erkennt Astro automatisch (Build-Befehl, Output-Ordner)
- „Deploy" klicken → Live-URL `https://<projekt>.vercel.app`

#### 3.7 Der automatische Deployment-Workflow
- Änderung lokal machen → committen → pushen → Vercel baut automatisch neu
- **Production Deployment** (Push auf `main`) vs. **Preview Deployment** (Push auf andere Branches / Pull Requests)
- Kompletter Ablauf als Diagramm:
  `Feature-Branch → Push → Preview-URL prüfen → Pull Request → Merge in main → Production`
- Deployment-Status auf GitHub (Häkchen am Commit/Pull Request) und im Vercel-Dashboard

#### 3.8 Wenn etwas schiefgeht
- Build-Logs in Vercel lesen
- Häufige Fehler: Build schlägt fehl, falscher Root-Ordner, Node-Version, fehlende Umgebungsvariablen
- Rollback auf ein früheres Deployment in Vercel
- Tipp: `npm run build` vorher lokal testen

#### 3.9 Ausblick
- Eigene Domain verbinden
- Umgebungsvariablen in Vercel
- Weiterführende Links: Astro-Doku, Git-Doku, Vercel-Doku, Claude-Code-Doku

#### Das solltest du jetzt haben
- Ein lokal laufendes Astro-Projekt
- Das Projekt auf GitHub
- Die Seite live über Vercel erreichbar
- Ein Preview-Deployment durch einen Push auf einen Branch

---

## 6. Didaktische Leitlinien

- **Learning by doing**: Jede Lektion enthält eine kleine praktische Übung
- **Terminal und VS Code parallel** zeigen, damit beide Wege verstanden werden
- **Screenshots** zu jedem wichtigen Schritt, damit man nie raten muss, wo man klicken soll
- **Diagramme** für abstrakte Git-Konzepte (Commits, Branches, Merges als Graphen)
- **Kurze, übersichtliche Abschnitte**, die man gut in Etappen durcharbeiten kann
- **Keine Zeitangaben**, um niemanden abzuschrecken
- **Fehler normalisieren**: Abschnitte „Häufiger Fehler" mit konkreten Fehlermeldungen und Lösungen
- **Einfache Sprache**, Fachbegriffe direkt im Text beim ersten Auftreten erklären

## 7. Umsetzungsschritte

1. Astro-Projekt (Basis-Template, ohne Theme) aufsetzen, Git-Repository anlegen
2. Öffentliches Repository auf GitHub anlegen und mit Vercel verbinden (die Seite nutzt so von Anfang an den eigenen Workflow)
3. Layout, Navigation und CSS erstellen
4. Seitengerüst für alle Lektionen anlegen (Platzhalter für Screenshots)
5. Inhalte Teil 1 schreiben
6. Inhalte Teil 2 schreiben + Diagramme
7. Inhalte Teil 3 schreiben
8. Screenshots auf dem Mac erstellen, während das Tutorial einmal komplett durchgespielt wird (Windows-Installer und Git Bash separat)
9. Feinschliff: Startseite, Spickzettel, Meta-Daten, README für das öffentliche Repository

## 8. Offene Fragen

- Screenshots mit Programmen in deutscher oder englischer Sprache? (Empfehlung: Englisch, da VS Code, GitHub und Vercel standardmäßig englisch sind und Fehlermeldungen so leichter zu googeln sind)
