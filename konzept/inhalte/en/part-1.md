---
title: Part 1 – Setting up your development environment
description: Create accounts at GitHub, Vercel and Claude and install VS Code, Git, Node.js and Claude Code on Windows.
---

# Part 1 – Setting up your development environment

**Goal:** By the end of this part, all accounts are created and all tools are installed. Your computer is ready for Git and your first web project.

**Requirements:** none

---

## 1.1 Overview: which tools do we need?

Before we start, a quick overview of what we are installing and what we need it for:

| Tool | What for? |
|---|---|
| **VS Code** | A free code editor. This is where you write and edit your files. |
| **Git** | The version control program. It remembers every change to your project. |
| **Git Bash** | A terminal for Windows that is installed together with Git. This is where you type commands. |
| **Node.js** | A runtime environment for JavaScript. It is needed to build and run the website on your computer. Node.js also brings **npm**, a program for installing packages. |
| **Claude Code** | An AI assistant that runs in the terminal. We use Claude Code to build the website: it writes code, creates files, runs commands and helps with errors. |
| **GitHub** | A website where you store your Git projects online and share them with others. |
| **Vercel** | A hosting platform. It picks up your project from GitHub and publishes it as a website. |

> **Why Git Bash?** On Windows you normally install Git Bash, because that gives you Git automatically plus a command line in which Git commands are highlighted separately. You could also install Git on its own and type Git commands into the Command Prompt (cmd) or PowerShell – but practically nobody does that.

We create the accounts first, then we install the programs.

---

## 1.2 Creating accounts

### GitHub

1. Open [github.com](https://github.com) and click **Sign up**.
2. Enter your email address, choose a password and a **username**, and select your country. Alternatively you can sign up with **Continue with Google** or **Continue with Apple**.
3. Click **Create account**.
4. Solve the security check and confirm your email address with the code GitHub sends you.

![GitHub sign-up form with email, password, username, country and the "Create account" button](/images/teil-1/01-github-sign-up.png)

> **Tip:** Your username is publicly visible and will later appear in the addresses of your projects, for example `github.com/your-name/my-project`. Choose a name you would be happy to put on a job application.

> **Careful:** Set up **two-factor authentication** (2FA). GitHub will require it after a while anyway. You find the setting under your profile picture → **Settings** → **Password and authentication**. The easiest option is an authenticator app on your phone.

### Vercel

1. Open [vercel.com](https://vercel.com) and click **Sign Up**.
2. Click **Continue with GitHub**.
3. Sign in to GitHub if necessary and click **Authorize Vercel**.
4. Then choose the **Hobby** plan ("I'm working on personal projects"). It is free.

![Vercel sign-up page with the login options and the "Continue with GitHub" button](/images/teil-1/02-vercel-sign-up.png)

> **Tip:** Because you sign up with GitHub, Vercel and GitHub are connected from the very beginning. That saves us work in Part 3.

### Claude

1. Open [claude.ai](https://claude.ai) and sign up: either with **Continue with Google** or **Continue with Apple**, or with your email address via **Continue with email**.
2. To use Claude Code you need a **paid subscription** (Pro or Max).

![claude.ai sign-up page with the options "Continue with Google", "Continue with Apple" and "Continue with email"](/images/teil-1/03-claude-sign-up.png)

> **Note:** The tutorial also works with any other AI you can use as an agent inside VS Code. If you already have a ChatGPT account, for example, you can install the **Codex** extension in VS Code and work with that. The screenshots and example prompts in this tutorial show Claude Code, but the process is the same everywhere.

---

## 1.3 Installing VS Code

1. Open [code.visualstudio.com](https://code.visualstudio.com) and click **Download for Windows**.
2. Run the downloaded file and accept the licence agreement.
3. In the step **Select Additional Tasks**, tick every box:
   - **Add "Open with Code" action to Windows Explorer file context menu**
   - **Add "Open with Code" action to Windows Explorer directory context menu**
   - **Register Code as an editor for supported file types**
   - **Add to PATH** – this one is especially important!
4. Click **Next** and then **Install**.

> **Why "Add to PATH"?** It lets you open VS Code straight from the terminal later, for example with `code .` for the current folder.

### A quick tour of VS Code

Start VS Code. On the left you see the **activity bar** with these icons:

- **Explorer** – shows the files and folders of your project
- **Search** – searches through all files
- **Source Control** – this is where you work with Git (we need it in Part 2)
- **Extensions** – this is where you install extensions

At the bottom left you find the **Accounts** icon (a person) and the cog for the **settings**.

Press ``Ctrl + ` `` to open the **integrated terminal** at the bottom of the window. You can also use the menu **Terminal** → **New Terminal**.

![VS Code after startup with the welcome page and the activity bar on the left](/images/teil-1/04-vscode-tour.png)

> **Tip:** VS Code is in English by default. We stay with the English interface in this tutorial so the labels match the screenshots and you can look up error messages more easily.

---

## 1.4 Installing Git for Windows (including Git Bash)

1. Open [git-scm.com](https://git-scm.com) and click **Download for Windows**.
2. Choose the installer for **64-bit Git for Windows Setup**.
3. Run the file. The installer asks a lot of questions. You can confirm most of them with **Next**. In these steps you change something or need to pay attention:

**Choosing the default editor used by Git**
Choose **Use Visual Studio Code as Git's default editor**.

**Adjusting the name of the initial branch in new repositories**
Choose **Override the default branch name for new repositories** and enter `main`.

**Adjusting your PATH environment**
Leave the recommended option **Git from the command line and also from 3rd-party software** selected.

**Choose a credential helper**
Leave **Git Credential Manager** selected. It will take care of signing you in to GitHub later.

4. Finally click **Install** and then **Finish**.

### Getting to know Git Bash

Open the Start menu and search for **Git Bash**. A window opens in which you can type commands. Give it a try:

```bash
git --version
```

You should see output like this:

```
git version 2.51.0.windows.1
```

The exact version number does not matter – all that counts is that a version is shown.

### Git Bash as the default terminal in VS Code

So that you use the same terminal in VS Code as in this tutorial:

1. Open VS Code.
2. Press **Ctrl + Shift + P** to open the **command palette**.
3. Type `Terminal: Select Default Profile` and press Enter.
4. Choose **Git Bash**.
5. Close all open terminals (bin icon) and open a new one.

![VS Code command palette with the typed command "Terminal: Select Default Profile"](/images/teil-1/05-vscode-default-terminal.png)

![List of terminal profiles to choose from in VS Code](/images/teil-1/06-vscode-terminal-profile.png)

> **Note:** Which profiles appear in the list depends on the computer. On Windows you find **Git Bash** there as soon as Git is installed.

### Configuring Git

Git needs to know who you are, because your name and email address are stored in every commit. We set that up right away in VS Code.

Open a terminal via the menu **Terminal** → **New Terminal**. Git Bash opens at the bottom of the window.

![The "Terminal" menu in VS Code with the "New Terminal" entry](/images/teil-1/07-vscode-neues-terminal.png)

> **Tip:** Later this is quicker with ``Ctrl + ` ``.

Now type these commands, replacing the example values with your own details:

```bash
git config --global user.name "First Last"
```

```bash
git config --global user.email "your-email@example.com"
```

```bash
git config --global init.defaultBranch main
```

> **Tip:** Use the same email address as on GitHub. Then GitHub links your commits to your profile.

Check your settings with:

```bash
git config --global --list
```

```
user.name=First Last
user.email=your-email@example.com
init.defaultbranch=main
```

---

## 1.5 Installing Node.js

1. Open [nodejs.org](https://nodejs.org) and click **Get Node.js®**.
2. Download the **LTS** version as a **Windows Installer (.msi)**. At the very bottom of the home page you can see which version is the current LTS version.
3. Run the file and click through with **Next**. You do **not** need to tick **Tools for Native Modules**.

![Home page of nodejs.org with the "Get Node.js®" button](/images/teil-1/08-nodejs-download.png)

> **LTS or Current?** **LTS** stands for *Long Term Support*. This version receives updates for a long time and is especially stable. **Current** contains the newest features but may still have bugs. LTS is the right choice for us.

### Checking the installation

Close Git Bash and open it again so the newly installed programs are recognised. Then type:

```bash
node -v
```

```bash
npm -v
```

You should see two version numbers, for example:

```
v24.8.0
11.6.0
```

> **Common mistake:** `bash: node: command not found`
> The terminal does not know the newly installed program yet. Close **all** terminals and VS Code completely and open them again. If that does not help, restart the computer.

---

## 1.6 Installing Claude Code

> **Note:** For this step you need a Claude subscription (see 1.2).

On Windows, Claude Code needs **Git Bash** – that is why we installed Git first.

1. Open **PowerShell** from the Start menu (not Git Bash!).
2. Type this command and press Enter:

```powershell
irm https://claude.ai/install.ps1 | iex
```

3. Wait until the installation is finished. If the installer asks you to add a folder to the PATH, follow its instructions.
4. Close PowerShell, open **Git Bash** and check the installation:

```bash
claude --version
```

> **Alternative:** Since Node.js is already installed, you can also install Claude Code via npm: `npm install -g @anthropic-ai/claude-code`

### Starting Claude Code for the first time

1. Type this in the terminal in VS Code:

```bash
claude
```

![Terminal in VS Code with the typed command "claude"](/images/teil-1/09-claude-code-start.png)

2. Choose a colour theme.
3. Choose your **Claude account** as the login method.
4. A browser window opens. Sign in and confirm the access.
5. Back in the terminal, Claude Code is ready. You can now ask questions, for example:

```prompt
What is the difference between Git, Git Bash and GitHub?
```

![Claude Code in the terminal with a typed question](/images/teil-1/10-claude-code-frage.png)

6. You quit Claude Code again with `/exit` or by pressing **Ctrl + C** twice.

### What do we use Claude Code for?

We **build the website in Part 3** with Claude Code. You describe in plain language what you want, and Claude Code makes it happen: it sets up the project, writes the code, creates new pages and runs the necessary commands. Before Claude Code changes files or runs commands, it asks you for permission.

Claude Code also helps when you are stuck. You can ask it to

- explain a command you do not understand,
- translate an error message and suggest a fix, or
- write a good commit message.

---

## 1.7 Signing in to GitHub from VS Code

So that VS Code can upload your projects to GitHub, you connect it to your GitHub account.

1. In VS Code, click the **Accounts** icon (the person) at the bottom left.
2. Choose the entry for signing in with **GitHub**.
3. VS Code asks whether the extension may sign in with GitHub. Click **Allow**.
4. Your browser opens. Sign in to GitHub and click **Authorize Visual-Studio-Code**.
5. The browser asks whether it may open VS Code. Confirm that.

If you now click the Accounts icon again, you see your GitHub username. The connection is in place.

![Accounts menu in VS Code with the connected GitHub account](/images/teil-1/11-vscode-github-login.png)

> **Note:** When you later upload something to GitHub from the terminal for the first time (`git push`), a **Git Credential Manager** window opens as well. You sign in there through the browser too. This only happens once.

---

## What you should have now

- an account at **GitHub** (with two-factor authentication), **Vercel** and **Claude**
- **VS Code** with Git Bash as the default terminal
- **Git**, configured with your name and email address
- **Node.js** and **npm**
- **Claude Code**, signed in with your Claude account
- VS Code connected to your **GitHub account**

These commands work in the terminal in VS Code:

```bash
code --version
```

```bash
git --version
```

```bash
node -v
```

```bash
npm -v
```

```bash
claude --version
```

Every command prints a version number. Yours may differ.

![Terminal in VS Code showing the output of all version commands](/images/teil-1/12-versionen-pruefen.png)

> **Tip:** If you make a typo, the terminal answers with `command not found`. That is nothing to worry about – just type the command again.

[← Back to the start](/en/) · [Next up, Part 2: How does Git work? →](/en/part-2/)
