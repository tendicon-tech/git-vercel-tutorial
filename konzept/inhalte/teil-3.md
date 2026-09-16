---
title: Teil 3 – Erstes Astro-Projekt & Deployment mit Vercel
description: Ein Astro-Projekt erstellen, auf GitHub veröffentlichen und über Vercel automatisch online bringen.
---

# Teil 3 – Erstes Astro-Projekt & Deployment mit Vercel

**Ziel:** Du erstellst deine erste Webseite mit Astro, lädst sie auf GitHub hoch und verbindest GitHub mit Vercel. Am Ende ist deine Seite im Internet erreichbar – und jede Änderung, die du pushst, geht automatisch online.

**Voraussetzungen:** [Teil 1](/teil-1/) und [Teil 2](/teil-2/) sind abgeschlossen.

> **Hinweis:** Wir verwenden in diesem Tutorial **Astro**, weil es einfach ist und gut zu inhaltsorientierten Webseiten passt. Vercel funktioniert aber genauso mit vielen anderen Arten von Projekten – zum Beispiel mit **Next.js**, einem Framework für umfangreiche Web-Anwendungen mit React. Der Ablauf mit GitHub und Vercel, den du hier lernst, ist dabei immer derselbe.

---

## 3.1 Was ist Astro?

**Astro** ist ein Framework zum Bauen von schnellen Webseiten. Es eignet sich besonders für Seiten, bei denen der **Inhalt** im Mittelpunkt steht: Blogs, Portfolios, Firmenwebseiten – oder Tutorials wie dieses. Wie Astro im Detail funktioniert, musst du nicht wissen – den Code schreibt Claude Code für dich.

> **Hinweis:** Diese Tutorial-Seite ist selbst ein Astro-Projekt. Schau dir den [Quellcode auf GitHub](https://github.com/) an, wenn du sehen willst, wie sie aufgebaut ist.

---

## 3.2 Astro-Projekt erstellen

### Neuen Projektordner in VS Code öffnen

1. Öffne VS Code und wähle **File** → **Open Folder...**.
2. Wechsle in deinen Ordner `projekte` (`C:\Users\DeinName\projekte`).
3. Klicke oben im Fenster auf **Neuer Ordner** und nenne ihn `mein-astro-projekt`.
4. Wähle den neuen Ordner aus und klicke auf **Ordner auswählen**.
5. Falls VS Code fragt, ob du den Dateien vertraust, klicke auf **Yes, I trust the authors**.
6. Öffne das Terminal mit **Strg + ö** oder über das Menü **Terminal** → **New Terminal**. Es startet automatisch im Ordner `mein-astro-projekt`.

### Den Astro-Assistenten starten

Tippe im Terminal von VS Code:

```bash
npm create astro@latest
```

> **Hinweis:** Beim ersten Mal fragt npm eventuell, ob es das Paket `create-astro` installieren darf (`Ok to proceed? (y)`). Bestätige mit **Enter**.

Der Assistent stellt dir nun einige Fragen. Mit den **Pfeiltasten** wählst du aus, mit **Enter** bestätigst du.

**Where should we create your new project?**
Gib einen Punkt `.` ein. Der Punkt steht für „der aktuelle Ordner“ – Astro legt das Projekt also direkt in `mein-astro-projekt` an, den du gerade geöffnet hast.

**How would you like to start your new project?**
Wähle **A basic, helpful starter project**. Das ist eine einfache Startseite, auf der wir aufbauen.

**Install dependencies?**
Wähle **Yes**. Astro installiert jetzt alle Pakete, die das Projekt braucht.

**Initialize a new git repository?**
Wähle **Yes**. Astro führt für dich `git init` aus und erstellt direkt den ersten Commit.

Nach kurzer Zeit meldet Astro:

```
 next  Liftoff confirmed. Explore your project!

       Run npm run dev to start the dev server. CTRL+C to stop.
```

Im Explorer von VS Code erscheinen jetzt alle Dateien deines neuen Projekts.

> **Hinweis:** Die genauen Texte und Fragen können sich je nach Astro-Version leicht unterscheiden. Wähle im Zweifel die empfohlene Option (*recommended*).

Prüfe kurz im Terminal, ob Astro wirklich schon committet hat:

```bash
git log --oneline
```

```
b4c3d2e (HEAD -> main) Initial commit from Astro
```

---

## 3.3 Die Seite lokal starten

Im Explorer von VS Code siehst du jetzt viele neue Ordner und Dateien. Keine Sorge – du musst sie nicht im Detail verstehen. Den Code schreibt gleich Claude Code für dich.

Tippe im Terminal von VS Code:

```bash
npm run dev
```

```
 astro  v5.x.x ready in 312 ms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose
```

Halte **Strg** gedrückt und klicke auf `http://localhost:4321/` – oder tippe die Adresse in deinen Browser. Du siehst die Startseite, die Astro als Vorlage mitbringt.

> **Was ist localhost?** `localhost` bedeutet „dieser Computer". Die Seite läuft nur auf deinem Rechner und ist noch nicht im Internet.

> **Hinweis:** Solange die Seite läuft, ist dieses Terminal belegt. Lass es einfach offen. Für alles Weitere öffnest du ein **zweites Terminal** über das **+** im Terminal-Bereich. Die Seite beendest du später mit **Strg + C**.

---

## 3.4 Die Webseite mit Claude Code gestalten

Jetzt kommt der spannende Teil: Statt selbst Code zu schreiben, beschreibst du Claude Code, wie deine Webseite aussehen soll.

### Claude Code starten

Öffne über das **+** im Terminal-Bereich ein zweites Terminal und starte Claude Code:

```bash
claude
```

### Deine Webseite beschreiben

Gib diesen Prompt ein und drücke **Enter**:

```
Lösche den Astro-Template-Code. Erstelle eine Hero-Sektion mit dem Titel
„Meine erste Astro-Webseite". Zeichne daneben einen Elefanten. Erstelle zwei
weitere Seiten: ein Impressum mit Platzhaltern und eine Datenschutzerklärung.
Verlinke beide Seiten von der Startseite.
```

> **Was ist ein Prompt?** Ein **Prompt** ist die Anweisung, die du der KI gibst. Je genauer du beschreibst, was du willst, desto besser wird das Ergebnis.

### Warten und Änderungen erlauben

Claude Code sieht sich jetzt dein Projekt an, plant die Änderungen und legt los. Das kann einen Moment dauern.

Bevor Claude Code Dateien ändert oder anlegt, fragt es dich um Erlaubnis. Sieh dir kurz an, was es vorhat, und bestätige mit **Yes**. Wenn du nicht bei jeder Datei gefragt werden möchtest, kannst du auch die Option wählen, Änderungen für diese Sitzung generell zu erlauben.

Du siehst im Terminal laufend, woran Claude Code gerade arbeitet. Wenn es fertig ist, fasst es zusammen, was es gemacht hat.

### Das Ergebnis ansehen

Wechsle in den Browser. Die Seite unter `http://localhost:4321/` hat sich **automatisch aktualisiert**. Du siehst deine Hero-Sektion mit dem Titel und dem Elefanten. Klicke auch auf die Links zum Impressum und zur Datenschutzerklärung.

> **Hinweis:** Dein Ergebnis sieht wahrscheinlich etwas anders aus als auf dem Screenshot. Die KI erzeugt jedes Mal eine eigene Lösung – das ist ganz normal.

> **Tipp:** Gefällt dir etwas nicht? Sag es Claude Code einfach, zum Beispiel: „Mach den Elefanten größer und färbe den Hintergrund der Hero-Sektion hellblau." So verbesserst du deine Seite Schritt für Schritt.

> **Achtung:** Das Impressum enthält nur Platzhalter. Bevor du die Seite wirklich veröffentlichst, musst du dort deine echten Angaben eintragen und die Datenschutzerklärung prüfen.

### Die Änderungen committen

Jetzt kommt dein Wissen aus Teil 2 zum Einsatz. Da es noch keine Live-Seite gibt, die wir schützen müssen, committen wir diese erste Version direkt auf `main`. Den Branch `staging` legen wir erst an, wenn die Seite online ist.

Du kannst die Änderungen wie gewohnt in der **Source Control**-Ansicht committen – oder du bittest Claude Code darum:

```
Committe alle Änderungen mit einer passenden Commit-Nachricht.
```

Beende Claude Code danach mit `/exit`.

---

## 3.5 Projekt auf GitHub veröffentlichen

Genau wie in [Teil 2](/teil-2/) legt VS Code das Repository für dich an:

1. Prüfe unten links in der Statusleiste, dass du auf `main` bist.
2. Öffne die **Source Control**-Ansicht und klicke auf **Publish Branch**.
3. Lass den Namen `mein-astro-projekt` stehen und wähle **Publish to GitHub public repository**.
4. VS Code legt das Repository auf GitHub an und lädt alles hoch. Klicke unten rechts in der Meldung auf **Open on GitHub**.

Du siehst jetzt alle Dateien deines Projekts auf GitHub – aber **keinen** Ordner `node_modules`. Den hat Astro in die `.gitignore` eingetragen, weil er riesig ist und jederzeit neu erzeugt werden kann.

---

## 3.6 GitHub mit Vercel verbinden

Jetzt kommt der spannende Teil: Wir bringen die Seite ins Internet.

### Projekt importieren

1. Öffne [vercel.com](https://vercel.com) und melde dich an.
2. Klicke im Dashboard auf **Add New…** → **Project**.
3. Unter **Import Git Repository** siehst du eine Liste deiner GitHub-Repositories. Klicke bei `mein-astro-projekt` auf **Import**.

> **Häufiger Fehler:** Das Repository taucht in der Liste nicht auf.
> Vercel hat noch keine Berechtigung, auf dieses Repository zuzugreifen. Klicke auf **Adjust GitHub App Permissions** (oder **Configure GitHub App**). Auf GitHub kannst du dann unter **Repository access** entweder **All repositories** wählen oder unter **Only select repositories** gezielt `mein-astro-projekt` hinzufügen. Klicke auf **Save** und kehre zu Vercel zurück.

### Projekt konfigurieren

Vercel zeigt dir die Seite **Configure Project**. Das Beste daran: Du musst fast nichts tun.

- **Project Name:** `mein-astro-projekt` – dieser Name bestimmt die spätere Adresse.
- **Framework Preset:** Vercel hat automatisch **Astro** erkannt.
- **Root Directory:** `./` – das Projekt liegt direkt im Hauptordner des Repositorys.
- **Build and Output Settings:** Vercel weiß bereits, dass es `npm run build` ausführen und den Ordner `dist` veröffentlichen muss.

Klicke auf **Deploy**.

### Das erste Deployment

Vercel holt jetzt dein Projekt von GitHub, installiert die Pakete, führt `npm run build` aus und veröffentlicht das Ergebnis. Du kannst dabei live im **Build-Log** zusehen. Das dauert meist nur eine knappe Minute.

Danach begrüßt dich Vercel mit **Congratulations!** und einer Vorschau deiner Seite.

Klicke auf **Continue to Dashboard**. Unter **Domains** findest du die Adresse deiner Webseite, zum Beispiel:

```
https://mein-astro-projekt.vercel.app
```

Öffne sie – **deine Webseite ist online!** Du kannst den Link jetzt an Freunde schicken und auf dem Handy öffnen.

> **Hinweis:** Ist der Name bereits vergeben, hängt Vercel automatisch etwas an die Adresse an, z. B. `mein-astro-projekt-abc123.vercel.app`.

---

## 3.7 Der automatische Deployment-Workflow

Ab jetzt musst du nie wieder etwas manuell hochladen. Vercel beobachtet dein GitHub-Repository und baut die Seite bei **jedem Push** automatisch neu.

### Schritt 1: Eine Änderung direkt live bringen

Probieren wir das gleich aus. Diese erste Änderung bringen wir noch direkt auf `main`.

Starte Claude Code im Terminal von VS Code mit `claude` und gib einen Prompt ein, zum Beispiel:

```
Ersetze den Elefanten durch eine Katze.
```

Sieh dir das Ergebnis unter `http://localhost:4321/` an. Gefällt es dir, committe und pushe die Änderung – in der Source-Control-Ansicht mit **✓ Commit** und **Sync Changes** oder mit einem Prompt:

```
Committe alle Änderungen mit einer passenden Commit-Nachricht und pushe sie.
```

Öffne das Vercel-Dashboard. Unter **Deployments** siehst du, dass ein neues Deployment läuft. Sobald es fertig ist (Status **Ready**), lade deine `.vercel.app`-Adresse neu: **Die Katze ist online.**

Jeder Push auf `main` erzeugt ein **Production Deployment** – also eine Aktualisierung der echten, öffentlichen Webseite.

### Schritt 2: Das Testsystem staging anlegen

Deine Seite ist jetzt live. Ab hier arbeiten wir wie in Teil 2: Neue Änderungen entstehen im Testsystem `staging` und kommen erst nach `main`, wenn sie fertig sind. So sehen deine Nutzer nie eine halbfertige Version.

1. Klicke unten links in der Statusleiste auf `main` und wähle **Create new branch...**.
2. Gib `staging` ein und drücke Enter.
3. Klicke in der Source-Control-Ansicht auf **Publish Branch**.

Vercel behandelt die beiden Branches automatisch unterschiedlich:

| Push auf … | Deployment-Art | Wo zu sehen? |
|---|---|---|
| `main` | **Production Deployment** | Deine echte Adresse, z. B. `mein-astro-projekt.vercel.app` – das sehen deine Nutzer |
| `staging` | **Preview Deployment** | Eine eigene Vorschau-Adresse zum Testen – die echte Seite bleibt unverändert |

```
  staging:  Prompt ──► Commit ──► Push ──► Preview Deployment   (Vorschau testen)
                                                  │
                                           Merge in main
                                                  │
                                                  ▼
  main:                                  Production Deployment  (live)
```

### Schritt 3: Im Testsystem ändern

Prüfe unten links in der Statusleiste, dass du auf `staging` bist. Gib Claude Code einen neuen Prompt – was du möchtest, zum Beispiel:

```
Färbe den Hintergrund der Hero-Sektion hellblau und füge unter dem Titel
einen kurzen Begrüßungstext hinzu.
```

Sieh dir das Ergebnis lokal an, dann committe und pushe wie gewohnt.

### Schritt 4: Die Vorschau ansehen

Vercel baut den Branch `staging` automatisch. Im Vercel-Dashboard unter **Deployments** erscheint ein neues Deployment mit dem Hinweis **Preview** und dem Branch `staging`.

Sobald es fertig ist (Status **Ready**), klicke darauf und öffne die Vorschau-Adresse. Du siehst deine neue Änderung – deine echte Seite unter `mein-astro-projekt.vercel.app` ist aber **unverändert**.

> **Hinweis:** Vercel schützt Preview Deployments standardmäßig. Wer die Vorschau-Adresse öffnet, muss eventuell bei Vercel angemeldet sein. Deine echte Adresse ist dagegen für alle öffentlich erreichbar.

### Schritt 5: Die neue Version live schalten

Passt alles in der Vorschau? Dann bringst du `staging` nach `main` – genau wie in Teil 2. Das kannst du Claude Code überlassen:

```
Merge den staging-Branch in main und pushe main. Wechsle danach zurück
auf staging.
```

Oder im Terminal:

```bash
git switch main
```

```bash
git pull
```

```bash
git merge staging
```

```bash
git push
```

```bash
git switch staging
```

Vercel erkennt den Push auf `main` und startet ein **Production Deployment**. Sobald es fertig ist, lade deine `.vercel.app`-Adresse neu: **Die neue Version ist live.**

> **Fehler auf der Live-Seite?** Dann gehst du vor wie beim Hotfix in Teil 2: Wechsle auf `main`, lass Claude Code den Fehler beheben, committe und pushe – Vercel bringt die Korrektur sofort online. Danach holst du die Änderung mit `git merge main` nach `staging`.

### Deployment-Status auf GitHub

Auch direkt auf GitHub siehst du, ob ein Deployment geklappt hat. Neben jedem Commit erscheint ein kleines Symbol:

- 🟡 **gelber Punkt** – Vercel baut gerade
- ✅ **grüner Haken** – Deployment erfolgreich
- ❌ **rotes Kreuz** – Deployment fehlgeschlagen

Ein Klick auf das Symbol führt dich direkt zu den Details bei Vercel.

---

## 3.8 Wenn etwas schiefgeht

### Build-Logs lesen

Schlägt ein Deployment fehl, bekommst du eine E-Mail von Vercel und das Deployment wird im Dashboard als **Error** markiert. Klicke darauf und öffne die **Build Logs**. Die entscheidende Fehlermeldung steht meistens **am Ende** des Logs – oft rot hervorgehoben.

> **Tipp:** Kopiere die Fehlermeldung und frag Claude Code: „Mein Vercel-Deployment schlägt mit diesem Fehler fehl: … Was bedeutet das und wie behebe ich es?"

> **Keine Sorge:** Ein fehlgeschlagenes Deployment macht deine Webseite **nicht kaputt**. Vercel veröffentlicht nur erfolgreiche Builds. Deine Seite bleibt so lange auf dem letzten funktionierenden Stand, bis du den Fehler behoben hast.

### Häufige Fehler

> **Häufiger Fehler:** `Command "npm run build" exited with 1`
> Der Build ist fehlgeschlagen – meistens wegen eines Fehlers im Code, zum Beispiel ein Tippfehler oder ein fehlendes schließendes Tag. Führe `npm run build` lokal aus. Dort siehst du dieselbe Fehlermeldung und kannst den Fehler direkt beheben. Danach committen und pushen.

> **Häufiger Fehler:** Die Seite zeigt `404: NOT_FOUND`
> Prüfe in Vercel unter **Settings** → **Build and Deployment**, ob das **Framework Preset** auf **Astro** steht und das **Root Directory** korrekt ist. Liegt dein Astro-Projekt in einem Unterordner des Repositorys, musst du diesen Ordner als Root Directory angeben.

> **Häufiger Fehler:** Fehler wegen der Node.js-Version
> Lokal verwendest du vielleicht eine andere Node.js-Version als Vercel. Unter **Settings** → **Build and Deployment** → **Node.js Version** kannst du die Version in Vercel anpassen. Wähle dieselbe Hauptversion, die `node -v` bei dir anzeigt.

> **Häufiger Fehler:** `Port 4321 is in use` beim Starten mit `npm run dev`
> Der Entwicklungsserver läuft bereits in einem anderen Terminal. Beende ihn dort mit **Strg + C** oder nutze die Adresse, die Astro dir stattdessen anzeigt (z. B. Port `4322`).

> **Häufiger Fehler:** `npm: command not found` bzw. `bash: npm: command not found`
> Node.js ist nicht installiert oder das Terminal wurde seit der Installation nicht neu gestartet. Siehe [Teil 1, Abschnitt 1.5](/teil-1/#15-nodejs-installieren).

### Zurück zu einer früheren Version: Rollback

Ist eine fehlerhafte Änderung doch live gegangen, kannst du in Sekunden zur vorherigen Version zurückkehren:

1. Öffne im Vercel-Dashboard den Tab **Deployments**.
2. Suche das letzte funktionierende Production Deployment.
3. Klicke auf das **⋯**-Menü rechts daneben und wähle **Instant Rollback**.

Deine Seite ist sofort wieder auf dem alten Stand. Behebe den Fehler danach in Ruhe im Code und pushe erneut.

---

## 3.9 Ausblick

Glückwunsch – du hast es geschafft! Du hast eine Entwicklungsumgebung eingerichtet, die Grundlagen von Git gelernt und eine eigene Webseite veröffentlicht, die sich bei jeder Änderung automatisch aktualisiert.

Wenn du weitermachen möchtest, hier ein paar Ideen:

- **Eigene Domain verbinden:** Unter **Settings** → **Domains** kannst du in Vercel eine eigene Adresse wie `www.dein-name.de` hinterlegen.
- **Umgebungsvariablen:** Unter **Settings** → **Environment Variables** speicherst du geheime Werte wie API-Schlüssel – sicher und außerhalb deines Repositorys.
- **Mehr Astro lernen:** Baue weitere Seiten, eigene Komponenten und ein eigenes Layout. Oder erstelle einen Blog mit Markdown-Dateien.
- **Zusammenarbeiten:** Lade jemanden als Collaborator in dein GitHub-Repository ein und arbeitet gemeinsam an `staging`.

### Weiterführende Links

- [Astro-Dokumentation](https://docs.astro.build/de/getting-started/) – auch auf Deutsch verfügbar
- [Git-Dokumentation und das kostenlose Buch „Pro Git"](https://git-scm.com/book/de/v2) – auf Deutsch
- [GitHub Docs](https://docs.github.com)
- [Vercel-Dokumentation](https://vercel.com/docs)
- [VS Code – Source Control](https://code.visualstudio.com/docs/sourcecontrol/overview)
- [Claude-Code-Dokumentation](https://docs.claude.com/en/docs/claude-code/overview)

---

## Das solltest du jetzt haben

- Ein **Astro-Projekt**, das lokal mit `npm run dev` läuft
- Das Projekt als **öffentliches Repository auf GitHub**
- Deine Webseite **live im Internet** unter einer `.vercel.app`-Adresse
- Die Branches **`main`** (Produktivsystem) und **`staging`** (Testsystem) – auch auf GitHub
- Ein Verständnis dafür, dass ein Push auf `main` ein **Production Deployment** und ein Push auf `staging` ein **Preview Deployment** auslöst
- Den kompletten Workflow: **Prompt → Commit → Push auf staging → Vorschau prüfen → Merge in main → live**

[← Teil 2: Wie funktioniert Git?](/teil-2/) · [Zurück zur Startseite](/)
