---
title: Teil 1 – Einrichtung der Entwicklungsumgebung
description: Accounts bei GitHub, Vercel und Claude anlegen und VS Code, Git, Node.js und Claude Code unter Windows installieren.
---

# Teil 1 – Einrichtung der Entwicklungsumgebung

**Ziel:** Am Ende dieses Teils sind alle Accounts angelegt und alle Werkzeuge installiert. Dein Computer ist bereit für Git und dein erstes Webprojekt.

**Voraussetzungen:** keine

---

## 1.1 Überblick: Welche Werkzeuge brauchen wir?

Bevor wir loslegen, ein kurzer Überblick, was wir installieren und wofür wir es brauchen:

| Werkzeug | Wofür? |
|---|---|
| **VS Code** | Ein kostenloser Code-Editor. Hier schreibst und bearbeitest du deine Dateien. |
| **Git** | Das Programm zur Versionsverwaltung. Es merkt sich jede Änderung an deinem Projekt. |
| **Git Bash** | Ein Terminal für Windows, das mit Git zusammen installiert wird. Hier tippst du Befehle ein. |
| **Node.js** | Eine Laufzeitumgebung für JavaScript. Sie wird gebraucht, um die Webseite auf deinem Computer zu bauen und zu starten. Mit Node.js kommt auch **npm**, ein Programm zum Installieren von Paketen. |
| **Claude Code** | Ein KI-Assistent, der im Terminal läuft. Mit Claude Code erstellen wir die Webseite: Es schreibt Code, legt Dateien an, führt Befehle aus und hilft bei Fehlern. |
| **GitHub** | Eine Webseite, auf der du deine Git-Projekte online speicherst und mit anderen teilst. |
| **Vercel** | Eine Hosting-Plattform. Sie holt dein Projekt von GitHub und veröffentlicht es als Webseite. |

Die Accounts legen wir zuerst an, danach installieren wir die Programme.

---

## 1.2 Accounts anlegen

### GitHub

1. Öffne [github.com](https://github.com) und klicke auf **Sign up**.
2. Gib deine E-Mail-Adresse ein, wähle ein Passwort und einen **Benutzernamen**.
3. Löse die Sicherheitsabfrage und bestätige deine E-Mail-Adresse mit dem Code, den GitHub dir schickt.

![GitHub-Registrierungsformular mit E-Mail, Passwort und Benutzername](/images/teil-1/01-github-sign-up.png)

> **Tipp:** Dein Benutzername ist öffentlich sichtbar und taucht später in den Adressen deiner Projekte auf, z. B. `github.com/dein-name/mein-projekt`. Wähle einen Namen, den du auch in einer Bewerbung zeigen würdest.

> **Achtung:** Richte die **Zwei-Faktor-Authentifizierung** (2FA) ein. GitHub verlangt das ohnehin nach einiger Zeit. Du findest die Einstellung unter deinem Profilbild → **Settings** → **Password and authentication**. Am einfachsten nutzt du eine Authenticator-App auf dem Handy.

### Vercel

1. Öffne [vercel.com](https://vercel.com) und klicke auf **Sign Up**.
2. Wähle den **Hobby**-Plan („I'm working on personal projects"). Er ist kostenlos.
3. Gib deinen Namen ein und klicke auf **Continue with GitHub**.
4. Melde dich bei GitHub an, falls nötig, und klicke auf **Authorize Vercel**.

![Vercel-Registrierung mit ausgewähltem Hobby-Plan und dem Button „Continue with GitHub"](/images/teil-1/02-vercel-sign-up.png)

> **Tipp:** Weil du dich mit GitHub registrierst, sind Vercel und GitHub von Anfang an miteinander verbunden. Das spart uns in Teil 3 Arbeit.

### Claude

1. Öffne [claude.ai](https://claude.ai) und registriere dich mit deiner E-Mail-Adresse oder deinem Google-Account.
2. Um Claude Code nutzen zu können, brauchst du ein **kostenpflichtiges Abo** (Pro oder Max). 

![Registrierungsseite von claude.ai](/images/teil-1/03-claude-sign-up.png)

---

## 1.3 VS Code installieren

1. Öffne [code.visualstudio.com](https://code.visualstudio.com) und klicke auf **Download for Windows**.
2. Starte die heruntergeladene Datei und akzeptiere die Lizenzvereinbarung.
3. Im Schritt **Select Additional Tasks** setzt du alle Haken:
   - **Add "Open with Code" action to Windows Explorer file context menu**
   - **Add "Open with Code" action to Windows Explorer directory context menu**
   - **Register Code as an editor for supported file types**
   - **Add to PATH** – dieser Haken ist besonders wichtig!
4. Klicke auf **Next** und dann auf **Install**.

![VS-Code-Installer im Schritt „Select Additional Tasks" mit allen gesetzten Haken](/images/teil-1/04-vscode-installer-tasks.png)

> **Warum „Add to PATH"?** Dadurch kannst du VS Code später direkt aus dem Terminal öffnen, zum Beispiel mit `code .` für den aktuellen Ordner.

### Kurze Tour durch VS Code

Starte VS Code. Links siehst du die **Aktivitätsleiste** mit diesen Symbolen:

- **Explorer** – zeigt die Dateien und Ordner deines Projekts
- **Search** – durchsucht alle Dateien
- **Source Control** – hier arbeitest du mit Git (das brauchen wir in Teil 2)
- **Extensions** – hier installierst du Erweiterungen

Unten links findest du das Symbol für **Accounts** (eine Person) und das Zahnrad für die **Einstellungen**.

Mit **Strg + ö** (auf deutscher Tastatur) öffnest du das **integrierte Terminal** unten im Fenster. Alternativ über das Menü **Terminal** → **New Terminal**.

![VS Code mit markierter Aktivitätsleiste, Accounts-Symbol und geöffnetem Terminal](/images/teil-1/05-vscode-tour.png)

> **Tipp:** VS Code ist standardmäßig englisch. Wir bleiben in diesem Tutorial bei der englischen Oberfläche, damit die Bezeichnungen zu den Screenshots passen und du Fehlermeldungen leichter im Internet findest.

---

## 1.4 Git für Windows installieren (inkl. Git Bash)

1. Öffne [git-scm.com](https://git-scm.com) und klicke auf **Download for Windows**.
2. Wähle den Installer für **64-bit Git for Windows Setup**.
3. Starte die Datei. Der Installer stellt dir viele Fragen. Die meisten kannst du mit **Next** bestätigen. Bei diesen Schritten änderst du etwas oder achtest besonders darauf:

**Choosing the default editor used by Git**
Wähle **Use Visual Studio Code as Git's default editor**.

![Git-Installer: Visual Studio Code als Standard-Editor ausgewählt](/images/teil-1/06-git-installer-editor.png)

**Adjusting the name of the initial branch in new repositories**
Wähle **Override the default branch name for new repositories** und trage `main` ein.

![Git-Installer: Standard-Branchname auf „main" gesetzt](/images/teil-1/07-git-installer-branch.png)

**Adjusting your PATH environment**
Lass die empfohlene Option **Git from the command line and also from 3rd-party software** ausgewählt.

**Choose a credential helper**
Lass **Git Credential Manager** ausgewählt. Er kümmert sich später darum, dass du dich bei GitHub anmelden kannst.

4. Klicke zum Schluss auf **Install** und danach auf **Finish**.

### Git Bash kennenlernen

Öffne das Startmenü und suche nach **Git Bash**. Es öffnet sich ein Fenster, in das du Befehle eintippen kannst. Probiere es aus:

```bash
git --version
```

Du solltest eine Ausgabe wie diese sehen:

```
git version 2.51.0.windows.1
```

Die genaue Versionsnummer ist egal – wichtig ist nur, dass eine Version angezeigt wird.

### Git Bash als Standard-Terminal in VS Code

Damit du in VS Code dasselbe Terminal benutzt wie in diesem Tutorial:

1. Öffne VS Code.
2. Drücke **Strg + Shift + P**, um die **Befehlspalette** zu öffnen.
3. Tippe `Terminal: Select Default Profile` und drücke Enter.
4. Wähle **Git Bash**.
5. Schließe alle offenen Terminals (Mülleimer-Symbol) und öffne ein neues.

![VS-Code-Befehlspalette mit der Auswahl „Git Bash" als Standard-Terminal](/images/teil-1/08-vscode-default-terminal.png)

### Git konfigurieren

Git muss wissen, wer du bist, denn dein Name und deine E-Mail-Adresse werden in jedem Commit gespeichert. Tippe diese Befehle in Git Bash ein und ersetze die Beispielwerte durch deine eigenen Daten:

```bash
git config --global user.name "Vorname Nachname"
git config --global user.email "deine-email@beispiel.de"
git config --global init.defaultBranch main
```

> **Tipp:** Verwende dieselbe E-Mail-Adresse wie bei GitHub. Dann ordnet GitHub deine Commits deinem Profil zu.

Prüfe deine Einstellungen mit:

```bash
git config --global --list
```

```
user.name=Vorname Nachname
user.email=deine-email@beispiel.de
init.defaultbranch=main
```

---

## 1.5 Node.js installieren

1. Öffne [nodejs.org](https://nodejs.org).
2. Lade die **LTS**-Version als **Windows Installer (.msi)** herunter.
3. Starte die Datei und klicke dich mit **Next** durch. Den Haken bei **Tools for Native Modules** musst du **nicht** setzen.

![Download-Seite von nodejs.org mit markierter LTS-Version](/images/teil-1/09-nodejs-download.png)

> **LTS oder Current?** **LTS** steht für *Long Term Support*. Diese Version wird lange mit Updates versorgt und ist besonders stabil. **Current** enthält die neuesten Funktionen, kann aber noch Fehler haben. Für uns ist LTS die richtige Wahl.

### Installation prüfen

Schließe Git Bash und öffne es neu, damit die neuen Programme erkannt werden. Tippe dann:

```bash
node -v
npm -v
```

Du solltest zwei Versionsnummern sehen, zum Beispiel:

```
v24.8.0
11.6.0
```

> **Häufiger Fehler:** `bash: node: command not found`
> Das Terminal kennt das neu installierte Programm noch nicht. Schließe **alle** Terminals und auch VS Code komplett und öffne sie neu. Hilft das nicht, starte den Computer neu.

---

## 1.6 Claude Code installieren

> **Hinweis:** Für diesen Schritt brauchst du ein Claude-Abo (siehe 1.2).

Claude Code braucht unter Windows **Git Bash** – deshalb haben wir Git zuerst installiert.

1. Öffne die **PowerShell** über das Startmenü (nicht Git Bash!).
2. Tippe diesen Befehl ein und drücke Enter:

```powershell
irm https://claude.ai/install.ps1 | iex
```

3. Warte, bis die Installation abgeschlossen ist. Falls der Installer dich bittet, einen Ordner zum PATH hinzuzufügen, folge seinen Anweisungen.
4. Schließe die PowerShell, öffne **Git Bash** und prüfe die Installation:

```bash
claude --version
```

> **Alternative:** Da Node.js bereits installiert ist, kannst du Claude Code auch über npm installieren: `npm install -g @anthropic-ai/claude-code`

### Claude Code zum ersten Mal starten

1. Tippe in Git Bash:

```bash
claude
```

2. Wähle ein Farbschema aus.
3. Wähle als Anmeldemethode deinen **Claude-Account**.
4. Es öffnet sich ein Browserfenster. Melde dich an und bestätige den Zugriff.
5. Zurück im Terminal ist Claude Code bereit. Du kannst jetzt Fragen stellen, zum Beispiel:

```
Was ist der Unterschied zwischen Git und GitHub?
```

6. Mit `/exit` oder zweimal **Strg + C** beendest du Claude Code wieder.

![Claude Code nach dem ersten Start im Terminal](/images/teil-1/10-claude-code-start.png)

### Wofür nutzen wir Claude Code?

Mit Claude Code **erstellen wir in Teil 3 die Webseite**. Du beschreibst in ganz normaler Sprache, was du haben möchtest, und Claude Code setzt es um: Es legt das Projekt an, schreibt den Code, erstellt neue Seiten und führt die nötigen Befehle aus. Bevor Claude Code Dateien ändert oder Befehle ausführt, fragt es dich um Erlaubnis.

Außerdem hilft dir Claude Code, wenn du nicht weiterkommst. Du kannst es zum Beispiel bitten,

- einen Befehl zu erklären, den du nicht verstehst,
- eine Fehlermeldung zu übersetzen und eine Lösung vorzuschlagen oder
- eine gute Commit-Nachricht zu formulieren.

---

## 1.7 In VS Code bei GitHub anmelden

Damit VS Code deine Projekte auf GitHub hochladen kann, verbindest du es mit deinem GitHub-Account.

1. Klicke in VS Code unten links auf das **Accounts**-Symbol (die Person).
2. Wähle den Eintrag zum Anmelden mit **GitHub**.
3. VS Code fragt, ob die Erweiterung sich mit GitHub anmelden darf. Klicke auf **Allow**.
4. Es öffnet sich dein Browser. Melde dich bei GitHub an und klicke auf **Authorize Visual-Studio-Code**.
5. Der Browser fragt, ob er VS Code öffnen darf. Bestätige das.

![Accounts-Menü in VS Code mit der Option, sich mit GitHub anzumelden](/images/teil-1/11-vscode-github-login.png)

![GitHub-Seite im Browser zur Autorisierung von Visual Studio Code](/images/teil-1/12-github-authorize-vscode.png)

Klickst du jetzt noch einmal auf das Accounts-Symbol, siehst du deinen GitHub-Benutzernamen. Die Verbindung steht.

> **Hinweis:** Wenn du später im Terminal zum ersten Mal etwas zu GitHub hochlädst (`git push`), öffnet sich zusätzlich ein Fenster des **Git Credential Manager**. Dort meldest du dich ebenfalls über den Browser an. Das passiert nur einmal.

---

## Das solltest du jetzt haben

- einen Account bei **GitHub** (mit Zwei-Faktor-Authentifizierung), **Vercel** und **Claude**
- **VS Code** mit Git Bash als Standard-Terminal
- **Git**, konfiguriert mit deinem Namen und deiner E-Mail-Adresse
- **Node.js** und **npm**
- **Claude Code**, angemeldet mit deinem Claude-Account
- VS Code ist mit deinem **GitHub-Account** verbunden

Diese Befehle funktionieren in Git Bash:

```bash
code --version
git --version
node -v
npm -v
claude --version
```

[← Zur Startseite](/) · [Weiter mit Teil 2: Wie funktioniert Git? →](/teil-2/)
