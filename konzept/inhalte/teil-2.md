---
title: Teil 2 – Wie funktioniert Git?
description: Commits, Branches, Remote-Repositories, Merges und Merge-Konflikte – im Terminal und in VS Code.
---

# Teil 2 – Wie funktioniert Git?

**Ziel:** Du verstehst, was Commits und Branches sind, arbeitest mit GitHub als Remote-Repository und kannst Branches zusammenführen – auch wenn es einen Konflikt gibt.

**Voraussetzungen:** [Teil 1 – Einrichtung](/teil-1/) ist abgeschlossen.

---

## 2.1 Warum Versionsverwaltung?

Kennst du solche Ordner?

```
projekt.zip
projekt_neu.zip
projekt_final.zip
projekt_final_v2.zip
projekt_final_v2_wirklich_final.zip
```

Welche Version ist die aktuelle? Was wurde zwischen `final` und `final_v2` geändert? Und was passiert, wenn zwei Personen gleichzeitig am selben Projekt arbeiten?

Genau diese Probleme löst **Git**. Git ist wie eine **Zeitmaschine für dein Projekt**:

- Git merkt sich jeden gespeicherten Stand deines Projekts.
- Du kannst jederzeit sehen, **was**, **wann** und **von wem** geändert wurde.
- Du kannst zu jedem früheren Stand zurückkehren.
- Mehrere Personen können gleichzeitig am selben Projekt arbeiten, ohne sich gegenseitig Dateien zu überschreiben.

### Git oder GitHub?

Die beiden Begriffe werden oft verwechselt:

| | Git | GitHub |
|---|---|---|
| **Was ist das?** | Ein Programm | Eine Webseite / Plattform |
| **Wo läuft es?** | Auf deinem Computer | Im Internet |
| **Wofür?** | Versionsverwaltung | Git-Projekte online speichern, teilen und gemeinsam bearbeiten |

Git funktioniert auch komplett ohne GitHub. GitHub ist aber ohne Git nutzlos.

---

## 2.2 Grundbegriffe

### Repository

Ein **Repository** (kurz: **Repo**) ist ein Projektordner, dessen Änderungen von Git verfolgt werden. Git speichert die gesamte Versionsgeschichte in einem versteckten Unterordner namens `.git`.

> **Achtung:** Lösche oder verändere den Ordner `.git` nicht. Darin steckt die komplette Geschichte deines Projekts.

### Die drei Bereiche

Git arbeitet mit drei Bereichen:

```
 Arbeitsverzeichnis        Staging-Area              Repository
 (Working Directory)       (Index)                   (.git)

 Hier bearbeitest   ──►   Hier sammelst du    ──►   Hier werden die
 du deine Dateien   add    die Änderungen für  commit Commits dauerhaft
                           den nächsten Commit        gespeichert
```

1. **Arbeitsverzeichnis:** Deine normalen Dateien, so wie du sie im Explorer oder in VS Code siehst.
2. **Staging-Area:** Eine Art Einkaufskorb. Mit `git add` legst du Änderungen hinein, die in den nächsten Commit sollen.
3. **Repository:** Mit `git commit` wird der Inhalt des Einkaufskorbs als neuer Stand dauerhaft gespeichert.

> **Warum gibt es die Staging-Area?** Damit du selbst entscheiden kannst, welche Änderungen zusammengehören. Hast du drei Dateien geändert, aber nur zwei davon gehören zum selben Thema, kannst du auch nur diese zwei committen.

### Der Status einer Datei

Jede Datei in einem Repository hat einen Status:

| Status | Bedeutung |
|---|---|
| **untracked** | Die Datei ist neu. Git kennt sie noch nicht. |
| **modified** | Die Datei wurde seit dem letzten Commit geändert. |
| **staged** | Die Änderung liegt in der Staging-Area und kommt in den nächsten Commit. |
| **committed** | Die Änderung ist sicher im Repository gespeichert. |

### .gitignore

Manche Dateien sollen **nie** in ein Repository, zum Beispiel:

- `node_modules/` – ein riesiger Ordner mit installierten Paketen, der jederzeit neu erzeugt werden kann
- `.env` – Dateien mit Passwörtern oder geheimen Schlüsseln
- automatisch erzeugte Dateien wie `dist/`

Dafür gibt es die Datei `.gitignore`. Jede Zeile enthält einen Datei- oder Ordnernamen, den Git ignorieren soll:

```
node_modules/
dist/
.env
```

---

## 2.3 Was ist ein Commit?

Ein **Commit** ist ein gespeicherter **Schnappschuss** deines Projekts zu einem bestimmten Zeitpunkt. Stell dir einen Commit wie einen Speicherpunkt in einem Videospiel vor.

Jeder Commit enthält:

- eine eindeutige **ID** (auch *Hash* genannt), z. B. `3f2a1c9`
- den **Namen und die E-Mail-Adresse** der Person, die ihn erstellt hat
- **Datum und Uhrzeit**
- eine **Commit-Nachricht**, die beschreibt, was geändert wurde
- einen Verweis auf den **vorherigen Commit**

Weil jeder Commit auf seinen Vorgänger zeigt, entsteht eine Kette – die **Versionsgeschichte**:

```
  a1b2c3d ◄── 3f2a1c9 ◄── 8e7d6f5
  Datei       Zweite       Dritte
  anlegen     Zeile        Zeile
```

### Gute Commit-Nachrichten

Die Commit-Nachricht ist ein Brief an dein zukünftiges Ich und an dein Team. Eine gute Nachricht

- ist **kurz** (maximal ca. 50 Zeichen),
- beschreibt, **was** geändert wurde – und wenn nötig, **warum**,
- steht im **Imperativ**, als würdest du eine Anweisung geben.

| ❌ Schlecht | ✅ Gut |
|---|---|
| `update` | `Kontaktformular auf der Startseite ergänzen` |
| `fix` | `Kaputten Link im Footer reparieren` |
| `asdf` | `Schriftgröße auf Mobilgeräten vergrößern` |
| `Änderungen von heute` | `Impressum-Seite hinzufügen` |

### Wie groß sollte ein Commit sein?

Faustregel: **eine logische Änderung pro Commit.** Lieber viele kleine Commits als ein riesiger. Wenn du die Commit-Nachricht nur mit „und" formulieren kannst („Header ändern **und** Impressum hinzufügen **und** Fehler beheben"), sind es wahrscheinlich mehrere Commits.

---

## 2.4 Commit im Terminal

Jetzt wird es praktisch. Wir legen ein kleines Übungsprojekt an und arbeiten dabei direkt in VS Code.

### Übungsprojekt in VS Code öffnen

1. Lege im Windows-Explorer in deinem Benutzerordner (`C:\Users\DeinName`) einen Ordner `projekte` an und darin einen Ordner `git-uebung`.
2. Öffne VS Code und wähle **File** → **Open Folder...**.
3. Wähle den Ordner `git-uebung` aus und klicke auf **Ordner auswählen**.
4. VS Code fragt eventuell, ob du den Dateien in diesem Ordner vertraust. Klicke auf **Yes, I trust the authors**.
5. Öffne das Terminal mit **Strg + ö**. Falls die Tastenkombination nicht funktioniert, findest du das Terminal auch im Menü unter **Terminal** → **New Terminal**. Es startet automatisch im Ordner `git-uebung`.

![VS Code mit geöffnetem, leerem Ordner git-uebung und Terminal](/images/teil-2/01-vscode-uebungsprojekt.png)

> **Achtung:** Lege deine Projekte **nicht** in einem Ordner an, der mit OneDrive synchronisiert wird (z. B. oft `Dokumente` oder `Desktop`). OneDrive und Git vertragen sich schlecht. Ein Ordner direkt in deinem Benutzerordner wie `C:\Users\DeinName\projekte` ist ideal.

Alle Befehle in diesem Abschnitt tippst du in das Terminal unten in VS Code.

### Schritt 1: Repository erstellen

```bash
git init
```

![Terminal in VS Code mit dem eingetippten Befehl „git init"](/images/teil-2/02-git-init.png)

```
Initialized empty Git repository in C:/Users/DeinName/projekte/git-uebung/.git/
```

Der Ordner ist jetzt ein Git-Repository. Git hat dafür den versteckten Ordner `.git` angelegt – im Explorer von VS Code siehst du ihn nicht, er ist aber da.

### Schritt 2: Eine Datei anlegen

1. Fahre im Explorer von VS Code mit der Maus über den Ordnernamen und klicke auf das Symbol **New File**.
2. Nenne die Datei `notizen.txt`.
3. Schreibe `Meine erste Zeile` hinein und speichere mit **Strg + S**.

### Schritt 3: Den Status prüfen

```bash
git status
```

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        notizen.txt

nothing added to commit but untracked files present (use "git add" to track)
```

Git hat die neue Datei bemerkt, verfolgt sie aber noch nicht – sie ist **untracked**.

> **Tipp:** `git status` ist dein wichtigster Befehl. Wenn du nicht weißt, was los ist: `git status`. Git gibt dir sogar Hinweise, was du als Nächstes tun kannst.

### Schritt 4: Die Datei zur Staging-Area hinzufügen

```bash
git add notizen.txt
```

```bash
git status
```

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   notizen.txt
```

Die Datei liegt jetzt im „Einkaufskorb" – sie ist **staged**.

> **Tipp:** Mit `git add .` fügst du **alle** geänderten und neuen Dateien im aktuellen Ordner auf einmal hinzu.

### Schritt 5: Committen

```bash
git commit -m "Notizen-Datei hinzufügen"
```

```
[main (root-commit) a1b2c3d] Notizen-Datei hinzufügen
 1 file changed, 1 insertion(+)
 create mode 100644 notizen.txt
```

Geschafft – dein erster Commit! Das `-m` steht für *message* und ist die Commit-Nachricht.

### Schritt 6: Eine Änderung machen und ansehen

Füge in `notizen.txt` eine zweite Zeile `Meine zweite Zeile` hinzu und speichere.

Mit `git diff` siehst du, was sich seit dem letzten Commit geändert hat:

```bash
git diff
```

```diff
diff --git a/notizen.txt b/notizen.txt
index 5c1b1a2..9d8e7f6 100644
--- a/notizen.txt
+++ b/notizen.txt
@@ -1 +1,2 @@
 Meine erste Zeile
+Meine zweite Zeile
```

Zeilen mit `+` wurden hinzugefügt, Zeilen mit `-` entfernt.

> **Tipp:** Wenn die Ausgabe von `git diff` oder `git log` sehr lang ist, zeigt Git sie seitenweise an. Blättere mit den Pfeiltasten und beende die Ansicht mit der Taste **q**.

Committe die Änderung:

```bash
git add notizen.txt
```

```bash
git commit -m "Zweite Zeile ergänzen"
```

### Schritt 7: Die Versionsgeschichte ansehen

```bash
git log
```

```
commit 3f2a1c9e8b7d6a5f4e3d2c1b0a9f8e7d6c5b4a3f (HEAD -> main)
Author: Vorname Nachname <deine-email@beispiel.de>
Date:   Tue Sep 15 15:12:04 2026 +0200

    Zweite Zeile ergänzen

commit a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0
Author: Vorname Nachname <deine-email@beispiel.de>
Date:   Tue Sep 15 15:08:41 2026 +0200

    Notizen-Datei hinzufügen
```

Kompakter geht es mit:

```bash
git log --oneline
```

```
3f2a1c9 (HEAD -> main) Zweite Zeile ergänzen
a1b2c3d Notizen-Datei hinzufügen
```

> **Häufiger Fehler:** `warning: in the working copy of 'notizen.txt', LF will be replaced by CRLF the next time Git touches it`
> Keine Sorge, das ist nur ein Hinweis und kein Fehler. Windows und andere Betriebssysteme speichern Zeilenumbrüche unterschiedlich. Git kümmert sich automatisch darum. Du kannst die Meldung ignorieren.

> **Häufiger Fehler:** `Author identity unknown` oder `Please tell me who you are`
> Git kennt deinen Namen und deine E-Mail-Adresse nicht. Führe die `git config`-Befehle aus [Teil 1, Abschnitt 1.4](/teil-1/#git-konfigurieren) aus.

---

## 2.5 Commit in VS Code

Alles, was du gerade im Terminal gemacht hast, geht auch mit wenigen Klicks – ganz ohne Befehle.

### Eine Änderung machen

1. Öffne `notizen.txt` im Explorer.
2. Füge eine dritte Zeile hinzu: `Diese Zeile kommt aus VS Code`
3. Speichere mit **Strg + S**.

Links in der Aktivitätsleiste erscheint beim **Source Control**-Symbol eine kleine **1**. Das bedeutet: Eine Datei wurde geändert. Im Explorer ist die Datei außerdem mit einem **M** (für *modified*) markiert.

### Änderungen ansehen

1. Klicke auf **Source Control**. Unter **Changes** siehst du `notizen.txt`.

![Source-Control-Ansicht in VS Code mit der geänderten Datei notizen.txt unter „Changes"](/images/teil-2/03-vscode-diff.png)

2. Klicke auf die Datei. VS Code zeigt links die alte und rechts die neue Version. Neue Zeilen sind grün markiert.

![Diff-Ansicht in VS Code: links die alte Version, rechts die neue mit grün markierter Zeile](/images/teil-2/04-vscode-diff-ansicht.png)

### Stagen und committen

1. Fahre mit der Maus über die Datei und klicke auf das **+** (**Stage Changes**). Die Datei wandert in den Bereich **Staged Changes**.

![Source-Control-Ansicht mit der Datei notizen.txt unter „Staged Changes"](/images/teil-2/05-vscode-stage-commit.png)

2. Gib oben in das Feld **Message** eine Commit-Nachricht ein: `Dritte Zeile in VS Code ergänzen`
3. Klicke auf **✓ Commit**.

> **Hinweis:** Wenn du auf **Commit** klickst, ohne vorher etwas zu stagen, fragt VS Code, ob es alle Änderungen automatisch stagen soll. Das ist praktisch, aber achte darauf, dass wirklich alle Änderungen in diesen Commit gehören.

Prüfe im Terminal, ob der Commit angekommen ist:

```bash
git log --oneline
```

```
8e7d6f5 (HEAD -> main) Dritte Zeile in VS Code ergänzen
3f2a1c9 Zweite Zeile ergänzen
a1b2c3d Notizen-Datei hinzufügen
```

### Terminal und VS Code im Vergleich

| Aufgabe | Terminal | VS Code |
|---|---|---|
| Status ansehen | `git status` | Source Control → Liste unter **Changes** |
| Änderungen ansehen | `git diff` | Auf die Datei in **Changes** klicken |
| Datei stagen | `git add datei.txt` | **+** neben der Datei |
| Alle Dateien stagen | `git add .` | **+** neben **Changes** |
| Datei unstagen | `git restore --staged datei.txt` | **−** neben der Datei in **Staged Changes** |
| Committen | `git commit -m "Nachricht"` | Nachricht eingeben → **✓ Commit** |

Beide Wege führen zum gleichen Ergebnis. Nutze, was dir lieber ist – aber verstehe, was im Hintergrund passiert.

### Du musst dir nicht alle Befehle merken

In diesem Tutorial lernst du viele Git-Befehle kennen. Du musst sie **nicht auswendig lernen**. Wichtig ist, dass du das **Prinzip verstehst** – also was ein Commit, ein Branch oder ein Merge ist. Dann kannst du Claude Code sagen, was du erreichen willst, und es übernimmt die Befehle für dich.

Starte Claude Code dazu im Terminal von VS Code mit `claude` und beschreibe in normaler Sprache, was du möchtest, zum Beispiel:

```
Prüfe, was ich geändert habe, und committe meine Änderungen
mit einer treffenden, kurzen Commit-Nachricht.
```

![Claude Code im Terminal von VS Code mit einem eingetippten Prompt zum Committen](/images/teil-2/06-claude-code-commit.png)

Claude Code zeigt dir, welche Befehle es ausführen möchte, und fragt vorher um Erlaubnis. So lernst du nebenbei, welcher Befehl wofür da ist.

> **Tipp:** Frag ruhig nach, wenn du etwas nicht verstehst: „Erkläre mir, was `git status` gerade anzeigt."

---

## 2.6 Branches – was ist das und wie erzeugt man einen?

### Das Konzept

Bisher sind alle Commits in einer geraden Linie entstanden, auf dem Branch **main**. Ein **Branch** (deutsch: *Zweig*) ist ein **paralleler Entwicklungsstrang**. Auf einem Branch kannst du Änderungen machen, ohne dass die anderen Branches davon etwas mitbekommen.

Technisch ist ein Branch nur ein **beweglicher Zeiger auf einen Commit**. Wenn du auf einem Branch committest, wandert der Zeiger zum neuen Commit weiter.

### Unser Branch-Modell

In diesem Tutorial – und später bei unserer Webseite – arbeiten wir mit genau zwei Branches:

| Branch | Bedeutung | Wofür? |
|---|---|---|
| `main` | **Unser Produktivsystem** | Hier liegt die **Live-Seite**, die unsere Nutzer gerade benutzen. |
| `staging` | **Unser Testsystem** | Hier **bereiten wir die neue Version vor**. Neue Funktionen bauen und testen wir hier, bis alles passt. |

> **Achtung, doppelt belegter Begriff:** Das Wort *Staging* kommt in diesem Tutorial zweimal vor – und meint zwei verschiedene Dinge. Die **Staging-Area** ist der Zwischenbereich in Git, in den du mit `git add` deine Änderungen für den nächsten Commit legst (siehe Abschnitt 2.2). Der Branch **`staging`** dagegen ist unser Testsystem. Den Namen haben wir selbst gewählt, mit der Staging-Area hat er nichts zu tun.

```
  main      ●──────────●──────────────●     Produktivsystem (live)
             \          \            /
  staging     ●───●───●──●───●───●──●       Testsystem
```

### Warum zwei Branches?

Stell dir folgende Situation vor:

Du arbeitest gerade in `staging` an der neuen Version der Webseite. Die Hälfte ist fertig, der Rest noch eine Baustelle. Da meldet sich jemand: **Auf der Live-Seite ist ein Fehler!**

Hättest du nur einen einzigen Branch, hättest du jetzt ein Problem: Entweder du veröffentlichst die Korrektur zusammen mit deiner halbfertigen neuen Version – oder die Nutzer müssen mit dem Fehler leben, bis alles fertig ist.

Mit zwei Branches ist das kein Problem:

1. Du committest deine noch nicht committeten Änderungen in `staging`. So ist deine halbfertige Arbeit gesichert und du kannst den Branch wechseln.
2. Du wechselst auf `main`. Dort liegt genau der Stand, der gerade live ist – ohne deine Baustelle.
3. Du behebst den Fehler direkt auf `main`. Das nennt man einen **Hotfix**. Der Fehler ist live behoben.
4. Du holst den Hotfix nach `staging`, damit er in der neuen Version nicht wieder auftaucht.
5. Du arbeitest in `staging` genau dort weiter, wo du aufgehört hast.

Ist die neue Version fertig getestet, bringst du `staging` nach `main` – und die neue Version ist live.

> **Merke:** Neue Funktionen entstehen in `staging`. Direkt auf `main` machst du nur **dringende Korrekturen** an der Live-Seite.

> **Ausblick auf Teil 3:** Dort verbinden wir das mit Vercel. Alles auf `main` wird automatisch auf der echten Webseite veröffentlicht. Alles auf `staging` bekommt eine eigene Vorschau-URL zum Testen.

### HEAD

**HEAD** ist ein besonderer Zeiger. Er zeigt an, **wo du gerade bist** – also auf welchem Branch du arbeitest. In der Ausgabe von `git log --oneline` hast du ihn schon gesehen: `(HEAD -> main)` bedeutet „du bist auf dem Branch main".

### Branch im Terminal erstellen

Alle Branches anzeigen:

```bash
git branch
```

```
* main
```

Das Sternchen markiert den aktuellen Branch. Bisher gibt es nur unser Produktivsystem.

Jetzt erstellen wir unser Testsystem. Der Befehl erstellt einen neuen Branch **und** wechselt direkt zu ihm:

```bash
git switch -c staging
```

```
Switched to a new branch 'staging'
```

Das `-c` steht für *create*. Der neue Branch startet auf genau dem Stand, auf dem du gerade warst – also auf dem aktuellen Stand von `main`. Prüfe mit `git branch`:

```
  main
* staging
```

Zwischen Branches wechseln:

```bash
git switch main      # zum Produktivsystem wechseln
```

```bash
git switch staging   # zurück zum Testsystem
```

> **Hinweis:** In älteren Anleitungen findest du oft `git checkout` statt `git switch`. Beide funktionieren, `git switch` ist aber neuer und leichter verständlich.

### Branch in VS Code erstellen

1. Klicke unten links in der **Statusleiste** auf den Namen des aktuellen Branches (z. B. `main`).
2. Oben öffnet sich eine Auswahl. Wähle **Create new branch...**.
3. Gib den Namen ein und drücke Enter.

Über denselben Klick auf den Branchnamen kannst du auch zwischen Branches wechseln.

![VS Code mit markiertem Branchnamen in der Statusleiste und geöffneter Branch-Auswahl](/images/teil-2/07-vscode-branch-erstellen.png)

> **Achtung:** Schau vor jeder Änderung unten links in die Statusleiste, auf welchem Branch du gerade bist. So landet deine Arbeit nicht versehentlich direkt im Produktivsystem.

---

## 2.7 Auf einem Branch committen

### Im Testsystem arbeiten

Stelle sicher, dass du auf `staging` bist:

```bash
git switch staging
```

Die neue Version unserer Übungsseite soll eine Kontaktdatei bekommen. Lege in VS Code die Datei `kontakt.txt` mit dem Inhalt `E-Mail: ich@beispiel.de` an, speichere und committe sie:

```bash
git add kontakt.txt
```

```bash
git commit -m "Kontaktdatei hinzufügen"
```

```
[staging 4c5d6e7] Kontaktdatei hinzufügen
 1 file changed, 1 insertion(+)
 create mode 100644 kontakt.txt
```

In der ersten Zeile siehst du: Der Commit wurde auf `staging` erstellt.

Außerdem soll die neue Version eine Galerie bekommen. Lege die Datei `galerie.txt` mit dem Inhalt `Galerie` an, speichere und committe:

```bash
git add galerie.txt
```

```bash
git commit -m "Galerie-Seite anlegen"
```

### Das Besondere an Branches

Wechsle jetzt ins Produktivsystem und behalte dabei den Explorer von VS Code im Blick:

```bash
git switch main
```

Die Dateien `kontakt.txt` und `galerie.txt` sind **verschwunden**! Keine Sorge – sie existieren nur im Testsystem `staging`. Das Produktivsystem ist unverändert, unsere Nutzer sehen die neuen Dateien also noch nicht. Wechsle zurück:

```bash
git switch staging
```

Da sind sie wieder. Git tauscht beim Wechseln des Branches die Dateien in deinem Ordner automatisch aus.

> **Achtung:** Committe deine Änderungen, **bevor** du den Branch wechselst. Hast du ungespeicherte Änderungen, die mit dem anderen Branch kollidieren würden, verweigert Git den Wechsel.

### Die Branches als Graph ansehen

```bash
git log --oneline --graph --all
```

```
* 5b6c7d8 (HEAD -> staging) Galerie-Seite anlegen
* 4c5d6e7 Kontaktdatei hinzufügen
* 8e7d6f5 (main) Dritte Zeile in VS Code ergänzen
* 3f2a1c9 Zweite Zeile ergänzen
* a1b2c3d Notizen-Datei hinzufügen
```

Du siehst: `staging` ist zwei Commits weiter als `main`.

### Auf einem Branch in VS Code committen

Das funktioniert genau wie in Abschnitt 2.5. Achte nur darauf, dass unten links in der Statusleiste der richtige Branch angezeigt wird, bevor du committest.

---

## 2.8 Remote-Repositories & Remote-Branches

Bisher liegt dein Repository nur auf deinem Computer. Geht die Festplatte kaputt, ist alles weg. Außerdem kann niemand sonst mitarbeiten. Deshalb verbinden wir das Repository jetzt mit **GitHub**.

### Was ist ein Remote?

Ein **Remote** ist eine Kopie deines Repositorys auf einem anderen Rechner – in unserem Fall auf GitHub. Das Standard-Remote heißt üblicherweise **origin**.

```
   Dein Computer                          GitHub
  ┌──────────────┐     git push      ┌──────────────┐
  │   lokales    │  ──────────────►  │    Remote    │
  │  Repository  │  ◄──────────────  │   (origin)   │
  └──────────────┘  git fetch / pull └──────────────┘
```

### Repository auf GitHub veröffentlichen

Weil VS Code bereits mit deinem GitHub-Account verbunden ist ([Teil 1, Abschnitt 1.7](/teil-1/)), musst du auf GitHub nichts vorbereiten. VS Code legt das Repository für dich an.

1. Wechsle auf `main`, indem du unten links in der Statusleiste auf den Branchnamen klickst und `main` auswählst.
2. Öffne die **Source Control**-Ansicht und klicke auf **Publish Branch**.
3. VS Code fragt, wie das Repository heißen und ob es öffentlich sein soll. Lass den Namen `git-uebung` stehen und wähle **Publish to GitHub private repository** oder **Publish to GitHub public repository** – für die Übung ist beides in Ordnung.

![VS Code mit dem Button „Publish Branch" und der Auswahl zwischen privatem und öffentlichem Repository](/images/teil-2/08-vscode-publish-branch.png)
4. VS Code legt das Repository auf GitHub an und lädt `main` hoch. Unten rechts erscheint eine Meldung mit dem Button **Open on GitHub**.

Klicke auf **Open on GitHub**. Du siehst jetzt deine Datei `notizen.txt` und unter **Commits** deine Versionsgeschichte.

![Repository git-uebung auf GitHub mit der Datei notizen.txt und drei Commits](/images/teil-2/09-github-repository.png)

> **Was ist im Hintergrund passiert?** VS Code hat das Repository auf GitHub erstellt, es als Remote mit dem Namen `origin` eingetragen und den Branch hochgeladen. Im Terminal hätte das so ausgesehen: `git remote add origin https://github.com/dein-name/git-uebung.git` und `git push -u origin main`.

### Den staging-Branch pushen

Auch unser Testsystem laden wir zu GitHub hoch:

1. Wechsle in der Statusleiste auf `staging`.
2. Klicke in der Source-Control-Ansicht auf **Publish Branch**.

Da das Repository jetzt schon existiert, fragt VS Code nicht erneut, sondern lädt den Branch direkt hoch. Im Terminal ginge das mit `git push -u origin staging`.

Auf GitHub kannst du jetzt über das Branch-Menü (dort steht `main`) zwischen den Branches wechseln.

![Branch-Menü auf GitHub mit den Branches main und staging](/images/teil-2/10-github-branches.png)

### Lokale Branches und Remote-Branches

Seit dem Push gibt es jeden Branch zweimal:

| Branch | Wo? | Bedeutung |
|---|---|---|
| `staging` | lokal | Dein Branch, an dem du arbeitest |
| `origin/staging` | lokal (Kopie) | Git merkt sich, auf welchem Stand `staging` auf GitHub zuletzt war |

Alle Branches, auch die Remote-Branches, siehst du mit:

```bash
git branch -a
```

```
* main
  staging
  remotes/origin/main
  remotes/origin/staging
```

### Änderungen von GitHub holen: fetch und pull

In echten Projekten arbeiten andere Personen mit und pushen Änderungen zu GitHub. Das simulieren wir jetzt: Eine Kollegin ergänzt im Testsystem eine Telefonnummer. Wir machen das direkt auf GitHub:

1. Öffne dein Repository auf GitHub.
2. Wähle im Branch-Menü **staging** aus.
3. Klicke auf `kontakt.txt` und dann auf das **Stift-Symbol** (*Edit this file*).
4. Füge eine Zeile hinzu: `Telefon: 0123 456789`
5. Klicke auf **Commit changes…** und gib als Nachricht `Telefonnummer ergänzen` ein. Prüfe, dass **Commit directly to the `staging` branch** ausgewählt ist, und bestätige mit **Commit changes**.

Jetzt ist `staging` auf GitHub einen Commit weiter als auf deinem Computer. Dein lokales Repository weiß davon aber noch nichts.

**git fetch** lädt die Informationen über neue Commits herunter, **ändert aber deine Dateien nicht**:

```bash
git switch staging
```

```bash
git fetch
```

```bash
git status
```

```
On branch staging
Your branch is behind 'origin/staging' by 1 commit, and can be fast-forwarded.
  (use "git pull" to update your local branch)
```

**git pull** lädt die neuen Commits herunter **und** übernimmt sie in deinen aktuellen Branch:

```bash
git pull
```

Öffne `kontakt.txt` in VS Code – die Telefonnummer ist jetzt auch bei dir angekommen:

```
E-Mail: ich@beispiel.de
Telefon: 0123 456789
```

| Befehl | Was passiert? |
|---|---|
| `git fetch` | „Schau nach, was es Neues gibt" – deine Dateien bleiben unverändert |
| `git pull` | „Hol das Neue und übernimm es" – entspricht `git fetch` + `git merge` |
| `git push` | „Lade meine neuen Commits hoch" |

> **Tipp:** Mach es dir zur Gewohnheit, **vor dem Arbeiten** `git pull` auszuführen. So arbeitest du immer auf dem neuesten Stand und vermeidest Konflikte.

> **Häufiger Fehler:** `! [rejected] staging -> staging (fetch first)`
> Auf GitHub gibt es Commits, die du lokal noch nicht hast. Führe zuerst `git pull` aus und danach erneut `git push`.

### Push und Pull in VS Code

In VS Code siehst du unten links in der Statusleiste neben dem Branchnamen, ob du auf dem aktuellen Stand bist:

- **↓1** – auf GitHub gibt es einen Commit, den du noch nicht hast
- **↑2** – du hast zwei Commits, die noch nicht auf GitHub sind

Ein Klick auf dieses Symbol oder auf **Sync Changes** in der Source-Control-Ansicht führt `git pull` und `git push` nacheinander aus.

---

## 2.9 Merges

Irgendwann sollen Änderungen von einem Branch in den anderen übernommen werden. Das nennt man **Mergen** (deutsch: *zusammenführen*). In unserem Branch-Modell gibt es zwei typische Merges:

| Von | Nach | Wann? |
|---|---|---|
| `main` | `staging` | Du hast einen Hotfix im Produktivsystem gemacht und willst ihn auch im Testsystem haben. |
| `staging` | `main` | Die neue Version ist fertig getestet und geht live. |

> **Merke:** Du wechselst immer **zuerst zu dem Branch, in den gemergt werden soll**, und holst dann den anderen Branch hinein. „Ich bin auf `staging` und merge `main` hinein."

### Szenario 1: Hotfix im Produktivsystem

Die neue Version in `staging` ist noch nicht fertig. Da fällt auf: **Im Produktivsystem fehlt das Impressum!**

Wechsle auf `main`. Im Explorer siehst du: `kontakt.txt` und `galerie.txt` sind weg – du siehst genau den Stand, der gerade live ist.

```bash
git switch main
```

```bash
git pull
```

Lege die Datei `impressum.txt` mit dem Inhalt `Impressum: Max Mustermann, Musterstraße 1, 12345 Musterstadt` an, speichere, committe und pushe:

```bash
git add impressum.txt
```

```bash
git commit -m "Fehlendes Impressum hinzufügen"
```

```bash
git push
```

Der Fehler ist live behoben. Jetzt holst du den Hotfix ins Testsystem – sonst fehlt das Impressum wieder, sobald die neue Version live geht:

```bash
git switch staging
```

```bash
git merge main -m "Hotfix aus main übernehmen"
```

```bash
git push
```

Weil sich **beide Branches** weiterentwickelt haben, erstellt Git dabei einen **Merge-Commit**, der beide Stränge zusammenführt:

```
  ●───●───●──────────●              main
           \          \
            ●───●───●──●            staging (● = Merge-Commit)
```

> **Tipp:** In VS Code siehst du in der Source-Control-Ansicht unter **Graph**, wie die beiden Branches zusammengeführt wurden.

### Szenario 2: Die neue Version geht live

Die neue Version ist fertig getestet und soll ins Produktivsystem. Dafür wechselst du auf `main` und holst `staging` hinein:

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

```
Updating 2d3e4f5..7f6e5d4
Fast-forward
 galerie.txt | 1 +
 kontakt.txt | 2 ++
 2 files changed, 3 insertions(+)
```

Git meldet **Fast-forward**: Auf `main` ist seit dem letzten Merge nichts Neues passiert – der Hotfix ist ja schon in `staging` enthalten. Git muss also nichts zusammenführen und schiebt `main` einfach nach vorne. Produktivsystem und Testsystem sind jetzt identisch, und die neue Version ist live.

> **Achtung:** Prüfe vor diesem Schritt in der Statusleiste, dass du wirklich auf `main` bist, und merge nur, wenn in `staging` alles fertig getestet ist. Alles, was du jetzt nach `main` bringst, sehen deine Nutzer.

> **Mit der KI mergen:** Gerade beim Mergen musst du dir die Befehle nicht merken. Wenn du unsicher bist oder Konflikte vermutest, starte Claude Code im Terminal mit `claude` und gib zum Beispiel ein:
>
> ```
> Hilf mir, den staging- und den main-Branch zu synchronisieren. Prüfe beide
> Branches und gib mir die Git-Befehle, um beide sicher zusammenzuführen.
> ```
>
> Claude Code sieht sich an, was sich in beiden Branches geändert hat, warnt dich vor möglichen Konflikten und erklärt dir jeden Schritt.

---

## 2.10 Merge-Konflikte

Ein **Merge-Konflikt** entsteht, wenn **dieselbe Zeile in beiden Branches unterschiedlich geändert** wurde. Git kann dann nicht wissen, welche Version richtig ist, und fragt dich. In unserem Modell passiert das zum Beispiel, wenn ein Hotfix auf `main` genau die Stelle korrigiert, die du in `staging` gerade umgebaut hast.

> **Keine Panik!** Merge-Konflikte sind völlig normal. Es geht nichts kaputt, und mit `git merge --abort` kannst du einen Merge jederzeit abbrechen.

### Übung: Einen Konflikt erzeugen

1. Wechsle auf `staging`, ändere die **erste Zeile** von `notizen.txt` in `# Meine Notizen`, speichere und committe.
2. Wechsle auf `main`. Hier lautet die erste Zeile noch `Meine erste Zeile`. Ändere sie in `Notizen von Alex`, speichere und committe.
3. Hol den Hotfix nach `staging`:

```bash
git switch staging
```

```bash
git merge main
```

```
Auto-merging notizen.txt
CONFLICT (content): Merge conflict in notizen.txt
Automatic merge failed; fix conflicts and then commit the result.
```

Da ist er, dein erster Merge-Konflikt.

### Den Konflikt lösen

Öffne `notizen.txt`. Git hat beide Versionen in die Datei geschrieben und mit **Konfliktmarkern** gekennzeichnet:

```
<<<<<<< HEAD
# Meine Notizen
=======
Notizen von Alex
>>>>>>> main
Meine zweite Zeile
Diese Zeile kommt aus VS Code
```

Oben zwischen `<<<<<<< HEAD` und `=======` steht deine Version aus `staging`, darunter bis `>>>>>>> main` die Version aus `main`.

VS Code hebt beide Versionen farbig hervor und zeigt darüber diese Optionen:

- **Accept Current Change** – deine Version (`staging`) behalten
- **Accept Incoming Change** – die Version aus `main` übernehmen
- **Accept Both Changes** – beide Versionen untereinander behalten

Wir wollen beides behalten und klicken auf **Accept Both Changes**. Du kannst die Datei aber auch einfach von Hand so bearbeiten, wie sie am Ende aussehen soll – wichtig ist nur, dass alle Konfliktmarker verschwunden sind.

Schließe den Merge danach ab:

```bash
git add notizen.txt
```

```bash
git commit -m "Merge-Konflikt in notizen.txt lösen"
```

```bash
git push
```

In VS Code geht das genauso: Datei in der Source-Control-Ansicht mit **+** stagen und auf **✓ Commit** klicken.

> **Mit der KI Konflikte lösen:** Auch hier hilft dir Claude Code. Gib zum Beispiel ein:
>
> ```
> Ich habe beim Mergen von main in staging einen Konflikt. Erkläre mir,
> was in den beiden Versionen steht, und hilf mir, den Konflikt zu lösen.
> ```

### Konflikte vermeiden

- **Oft pullen**, damit du immer auf dem neuesten Stand arbeitest.
- **Hotfixes sofort nach `staging` holen**, nicht erst Tage später.
- **Neue Versionen regelmäßig veröffentlichen**, damit `staging` und `main` nicht zu weit auseinanderlaufen.

---

## 2.11 Spickzettel

### Unsere Branches

| Branch | System | Hier machst du … |
|---|---|---|
| `main` | Produktivsystem (live) | nur dringende Korrekturen (Hotfixes) |
| `staging` | Testsystem | neue Funktionen und die nächste Version |

### Einrichten

| Befehl | Bedeutung | VS Code |
|---|---|---|
| `git init` | Neues Repository im aktuellen Ordner anlegen | Source Control → **Initialize Repository** |
| `git remote add origin <url>` | Repository mit GitHub verbinden | **Publish Branch** |

### Committen

| Befehl | Bedeutung | VS Code |
|---|---|---|
| `git status` | Aktuellen Zustand anzeigen | Source Control |
| `git diff` | Nicht gestagte Änderungen anzeigen | Datei unter **Changes** anklicken |
| `git add <datei>` | Datei stagen | **+** neben der Datei |
| `git add .` | Alle Änderungen stagen | **+** neben **Changes** |
| `git restore --staged <datei>` | Datei unstagen | **−** neben der Datei |
| `git commit -m "Nachricht"` | Commit erstellen | Nachricht eingeben → **✓ Commit** |
| `git log --oneline` | Versionsgeschichte kompakt anzeigen | Source Control → **Graph** |
| `git log --oneline --graph --all` | Alle Branches als Graph anzeigen | Source Control → **Graph** |

### Branches

| Befehl | Bedeutung | VS Code |
|---|---|---|
| `git branch` | Lokale Branches anzeigen | Branchname in der Statusleiste |
| `git branch -a` | Alle Branches inkl. Remote anzeigen | Branchname in der Statusleiste |
| `git switch -c <name>` | Neuen Branch erstellen und wechseln | Statusleiste → **Create new branch...** |
| `git switch <name>` | Zu einem Branch wechseln | Statusleiste → Branch auswählen |

### Zusammenarbeit

| Befehl | Bedeutung | VS Code |
|---|---|---|
| `git push -u origin <branch>` | Branch zum ersten Mal hochladen | **Publish Branch** |
| `git push` | Neue Commits hochladen | **Sync Changes** |
| `git fetch` | Neuigkeiten von GitHub abrufen | Befehlspalette → **Git: Fetch** |
| `git pull` | Neuigkeiten abrufen und übernehmen | **Sync Changes** |

### Mergen

| Befehl | Bedeutung | VS Code |
|---|---|---|
| `git merge <branch>` | Branch in den aktuellen Branch mergen | Befehlspalette → **Git: Merge...** |
| `git merge --abort` | Laufenden Merge abbrechen | Befehlspalette → **Git: Abort Merge** |

---

## Das solltest du jetzt haben

- Du kannst erklären, was ein **Repository**, ein **Commit** und ein **Branch** ist.
- Du kennst die drei Bereiche **Arbeitsverzeichnis**, **Staging-Area** und **Repository**.
- Du hast im **Terminal** und in **VS Code** committet.
- Du kennst unser Branch-Modell: **`main`** ist das Produktivsystem, **`staging`** das Testsystem.
- Du hast den Branch `staging` **erstellt**, darauf **committet** und ihn zu **GitHub gepusht**.
- Du kennst den Unterschied zwischen `git fetch`, `git pull` und `git push`.
- Du hast einen **Hotfix** im Produktivsystem gemacht, ihn nach `staging` geholt und eine **neue Version** von `staging` nach `main` gebracht.
- Du kennst den Unterschied zwischen **Fast-Forward** und **Merge-Commit**.
- Du hast einen **Merge-Konflikt** gelöst.
- Du weißt, wie du **Claude Code** beschreibst, was du mit Git erreichen willst, statt dir alle Befehle zu merken.
- Dein Übungsprojekt `git-uebung` liegt auf GitHub.

[← Teil 1: Einrichtung](/teil-1/) · [Weiter mit Teil 3: Astro & Vercel →](/teil-3/)
