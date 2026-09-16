---
title: Part 2 – How does Git work?
description: Commits, branches, remote repositories, merges and merge conflicts – in the terminal and in VS Code.
---

# Part 2 – How does Git work?

**Goal:** You understand what commits and branches are, you work with GitHub as a remote repository, and you can merge branches – even when there is a conflict.

**Requirements:** [Part 1 – Setup](/en/part-1/) is complete.

---

## 2.1 Why version control?

Do you know folders like this?

```
project.zip
project_new.zip
project_final.zip
project_final_v2.zip
project_final_v2_really_final.zip
```

Which version is the current one? What changed between `final` and `final_v2`? And what happens when two people work on the same project at the same time?

Those are exactly the problems **Git** solves. Git is like a **time machine for your project**:

- Git remembers every saved state of your project.
- You can see at any time **what** was changed, **when** and **by whom**.
- You can go back to any earlier state.
- Several people can work on the same project at once without overwriting each other's files.

### But why do *we* really need Git?

So far Git sounds like "handy, but not essential". After all, you are working alone on a small website. For what we do in Part 3, however, there is no way around Git. Three reasons:

**1. Without Git your website never reaches the internet.**

For your site to be reachable by everyone, it has to sit on a computer that is always running. Vercel provides that computer for us. But Vercel has no button for uploading your files. Vercel fetches the files itself – from GitHub (we will clear up what GitHub is in the next section). So your website has to get to GitHub first. And for that you need Git.

That is not an oversight, by the way, but deliberate: among software developers, Git is as ordinary as a word processor in an office. Nobody there would want to upload files by hand. So Vercel never built an upload button in the first place.

**2. Git is your reverse gear.**

When you describe to Claude Code what you want, it often changes many files at once. Sometimes you will not like the result. Without Git there is no way back – the old version has been overwritten. With Git, on the other hand, every state is saved: you see exactly what was changed and can bring back the last good state. That is what makes experimenting relaxed.

**3. Git separates "trying things out" from "visible to everyone".**

As soon as your site is on the internet, everyone immediately sees every change – including a half-finished one. With Git you can work on a new version in peace while the old one stays online. You look at the new version yourself first, and only when you like it does it replace the old one. You will learn how that works later in this part.

---

## 2.2 Basic terms

### Git or GitHub?

The two terms are often confused:

| | Git | GitHub |
|---|---|---|
| **What is it?** | A program | A website / platform |
| **Where does it run?** | On your computer | On the internet |
| **What for?** | Version control | Storing, sharing and jointly editing Git projects online |

Git works perfectly well without GitHub. GitHub, however, is useless without Git.

### Repository

A **repository** (**repo** for short) is a project folder whose changes are tracked by Git. Git stores the entire version history in a hidden subfolder called `.git`.

> **Careful:** Do not delete or modify the `.git` folder. It holds the complete history of your project.

### The three areas

Git works with three areas:

```
 Working Directory         Staging Area              Repository
                           (Index)                   (.git)

 Where you edit     ──►   Where you collect   ──►   Where commits are
 your files         add    the changes for     commit stored permanently
                           the next commit
```

1. **Working directory:** Your normal files, exactly as you see them in Explorer or in VS Code.
2. **Staging area:** A kind of shopping basket. With `git add` you put in the changes that should go into the next commit.
3. **Repository:** With `git commit` the contents of the basket are stored permanently as a new state.

> **Why is there a staging area?** So that you can decide for yourself which changes belong together. If you changed three files but only two of them belong to the same topic, you can commit just those two.

### The status of a file

Every file in a repository has a status:

| Status | Meaning |
|---|---|
| **untracked** | The file is new. Git does not know it yet. |
| **modified** | The file has been changed since the last commit. |
| **staged** | The change is in the staging area and goes into the next commit. |
| **committed** | The change is safely stored in the repository. |

### .gitignore

Some files should **never** go into a repository, for example:

- `node_modules/` – a huge folder of installed packages that can be recreated at any time
- `.env` – files with passwords or secret keys
- automatically generated files such as `dist/`

That is what the `.gitignore` file is for. Each line contains a file or folder name that Git should ignore:

```
node_modules/
dist/
.env
```

---

## 2.3 What is a commit?

A **commit** is a saved **snapshot** of your project at a particular point in time. Think of a commit like a save point in a video game.

Every commit contains:

- a unique **ID** (also called a *hash*), e.g. `3f2a1c9`
- the **name and email address** of the person who created it
- **date and time**
- a **commit message** describing what was changed
- a reference to the **previous commit**

Because every commit points at its predecessor, a chain is formed – the **version history**:

```
  a1b2c3d ◄── 3f2a1c9 ◄── 8e7d6f5
  Create      Second       Third
  file        line         line
```

### Good commit messages

The commit message is a letter to your future self and to your team. A good message

- is **short** (around 50 characters at most),
- describes **what** was changed – and if necessary **why**,
- is written in the **imperative**, as if you were giving an instruction.

| ❌ Bad | ✅ Good |
|---|---|
| `update` | `Add contact form to the home page` |
| `fix` | `Repair broken link in the footer` |
| `asdf` | `Increase font size on mobile devices` |
| `today's changes` | `Add imprint page` |

### How big should a commit be?

Rule of thumb: **one logical change per commit.** Many small commits beat one huge one. If you can only phrase the commit message with "and" ("change header **and** add imprint **and** fix bug"), it is probably several commits.

---

## 2.4 Committing in the terminal

Now it gets practical. We set up a small practice project and work directly in VS Code.

### Opening the practice project in VS Code

1. In Windows Explorer, create a folder `projects` inside your user folder (`C:\Users\YourName`) and a folder `git-practice` inside it.
2. Open VS Code and choose **File** → **Open Folder...**.
3. Select the folder `git-practice` and click **Select Folder**.
4. VS Code may ask whether you trust the files in this folder. Click **Yes, I trust the authors**.
5. Open the terminal with ``Ctrl + ` ``. If the shortcut does not work, you also find the terminal in the menu under **Terminal** → **New Terminal**. It starts in the `git-practice` folder automatically.

![VS Code with the empty git-uebung folder open and the terminal showing](/images/teil-2/01-vscode-uebungsprojekt.png)

> **Careful:** Do **not** create your projects in a folder that is synchronised with OneDrive (often `Documents` or `Desktop`, for example). OneDrive and Git do not get along. A folder directly in your user folder such as `C:\Users\YourName\projects` is ideal.

You type all the commands in this section into the terminal at the bottom of VS Code.

### Step 1: Create the repository

```bash
git init
```

![Terminal in VS Code with the typed command "git init"](/images/teil-2/02-git-init.png)

```
Initialized empty Git repository in C:/Users/YourName/projects/git-practice/.git/
```

The folder is now a Git repository. Git created the hidden `.git` folder for it – you do not see it in the VS Code explorer, but it is there.

### Step 2: Create a file

1. In the VS Code explorer, hover over the folder name and click the **New File** icon.
2. Name the file `notes.txt`.
3. Write `My first line` in it and save with **Ctrl + S**.

### Step 3: Check the status

```bash
git status
```

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        notes.txt

nothing added to commit but untracked files present (use "git add" to track)
```

Git noticed the new file but is not tracking it yet – it is **untracked**.

> **Tip:** `git status` is your most important command. Whenever you do not know what is going on: `git status`. Git even hints at what you could do next.

### Step 4: Add the file to the staging area

```bash
git add notes.txt
```

```bash
git status
```

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   notes.txt
```

The file is now in the "shopping basket" – it is **staged**.

> **Tip:** With `git add .` you add **all** changed and new files in the current folder at once.

### Step 5: Commit

```bash
git commit -m "Add notes file"
```

```
[main (root-commit) a1b2c3d] Add notes file
 1 file changed, 1 insertion(+)
 create mode 100644 notes.txt
```

Done – your first commit! The `-m` stands for *message* and introduces the commit message.

### Step 6: Make a change and look at it

Add a second line `My second line` to `notes.txt` and save.

With `git diff` you see what has changed since the last commit:

```bash
git diff
```

```diff
diff --git a/notes.txt b/notes.txt
index 5c1b1a2..9d8e7f6 100644
--- a/notes.txt
+++ b/notes.txt
@@ -1 +1,2 @@
 My first line
+My second line
```

Lines with `+` were added, lines with `-` removed.

> **Tip:** When the output of `git diff` or `git log` is very long, Git shows it page by page. Scroll with the arrow keys and leave the view with the **q** key.

Commit the change:

```bash
git add notes.txt
```

```bash
git commit -m "Add second line"
```

### Step 7: Look at the version history

```bash
git log
```

```
commit 3f2a1c9e8b7d6a5f4e3d2c1b0a9f8e7d6c5b4a3f (HEAD -> main)
Author: First Last <your-email@example.com>
Date:   Tue Sep 15 15:12:04 2026 +0200

    Add second line

commit a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0
Author: First Last <your-email@example.com>
Date:   Tue Sep 15 15:08:41 2026 +0200

    Add notes file
```

A more compact view:

```bash
git log --oneline
```

```
3f2a1c9 (HEAD -> main) Add second line
a1b2c3d Add notes file
```

> **Common mistake:** `warning: in the working copy of 'notes.txt', LF will be replaced by CRLF the next time Git touches it`
> No need to worry, this is only a hint and not an error. Windows and other operating systems store line breaks differently. Git handles that automatically. You can ignore the message.

> **Common mistake:** `Author identity unknown` or `Please tell me who you are`
> Git does not know your name and email address. Run the `git config` commands from [Part 1, section 1.4](/en/part-1/#configuring-git).

---

## 2.5 Committing in VS Code

Everything you just did in the terminal also works with a few clicks – without any commands.

### Make a change

1. Open `notes.txt` in the explorer.
2. Add a third line: `This line comes from VS Code`
3. Save with **Ctrl + S**.

A small **1** appears on the **Source Control** icon in the activity bar on the left. That means one file has been changed. In the explorer the file is also marked with an **M** (for *modified*).

### Look at the changes

1. Click **Source Control**. Under **Changes** you see `notes.txt`.

![Source Control view in VS Code with the changed file notizen.txt under "Changes"](/images/teil-2/03-vscode-diff.png)

2. Click the file. VS Code shows the old version on the left and the new one on the right. New lines are highlighted in green.

![Diff view in VS Code: the old version on the left, the new one on the right with the new line in green](/images/teil-2/04-vscode-diff-ansicht.png)

### Stage and commit

1. Hover over the file and click the **+** (**Stage Changes**). The file moves to the **Staged Changes** section.

![Source Control view with the file notizen.txt under "Staged Changes"](/images/teil-2/05-vscode-stage-commit.png)

2. Enter a commit message in the **Message** box at the top: `Add third line from VS Code`
3. Click **✓ Commit**.

> **Note:** If you click **Commit** without staging anything first, VS Code asks whether it should stage all changes automatically. That is convenient, but make sure that all those changes really belong in this commit.

Check in the terminal whether the commit has arrived:

```bash
git log --oneline
```

```
8e7d6f5 (HEAD -> main) Add third line from VS Code
3f2a1c9 Add second line
a1b2c3d Add notes file
```

### Terminal and VS Code side by side

| Task | Terminal | VS Code |
|---|---|---|
| Check the status | `git status` | Source Control → list under **Changes** |
| Look at changes | `git diff` | Click the file under **Changes** |
| Stage a file | `git add file.txt` | **+** next to the file |
| Stage all files | `git add .` | **+** next to **Changes** |
| Unstage a file | `git restore --staged file.txt` | **−** next to the file under **Staged Changes** |
| Commit | `git commit -m "Message"` | Enter a message → **✓ Commit** |

Both ways lead to the same result. Use whichever you prefer – but understand what happens behind the scenes.

### You do not have to memorise every command

In this tutorial you meet a lot of Git commands. You do **not** have to learn them by heart. What matters is that you understand the **principle** – what a commit, a branch or a merge is. Then you can tell Claude Code what you want to achieve, and it takes care of the commands for you.

To do that, start Claude Code in the VS Code terminal with `claude` and describe in plain language what you want, for example:

```prompt
Check what I have changed and commit my changes
with a short, fitting commit message.
```

![Claude Code in the VS Code terminal with a typed prompt for committing](/images/teil-2/06-claude-code-commit.png)

Claude Code shows you which commands it wants to run and asks for permission first. That way you learn along the way which command does what.

> **Tip:** Do ask when you do not understand something: "Explain what `git status` is showing me right now."

---

## 2.6 Branches – what are they and how do you create one?

### The concept

So far all commits have been created in a straight line, on the branch **main**. A **branch** is a **parallel line of development**. On a branch you can make changes without the other branches noticing anything.

Technically a branch is just a **movable pointer to a commit**. When you commit on a branch, the pointer moves along to the new commit.

### Our branch model

In this tutorial – and later on our website – we work with exactly two branches:

| Branch | Meaning | What for? |
|---|---|---|
| `main` | **Our production system** | This holds the **live site** that our users are using right now. |
| `staging` | **Our test system** | This is where we **prepare the new version**. We build and test new features here until everything fits. |

> **Careful, the word has two meanings:** *Staging* appears twice in this tutorial – and means two different things. The **staging area** is the intermediate area in Git where `git add` puts your changes for the next commit (see section 2.2). The branch **`staging`**, on the other hand, is our test system. We chose that name ourselves; it has nothing to do with the staging area.

```
  main      ●──────────●──────────────●     production system (live)
             \          \            /
  staging     ●───●───●──●───●───●──●       test system
```

### Why two branches?

Picture this situation:

You are working in `staging` on the new version of the website. Half of it is done, the rest is still a building site. Then someone gets in touch: **there is a bug on the live site!**

If you only had a single branch, you would now have a problem: either you publish the fix together with your half-finished new version – or your users have to live with the bug until everything is done.

With two branches this is no problem at all:

1. You commit your uncommitted changes in `staging`. That way your half-finished work is safe and you can switch branches.
2. You switch to `main`. That holds exactly the state that is live right now – without your building site.
3. You fix the bug directly on `main`. That is called a **hotfix**. The bug is fixed live.
4. You bring the hotfix over to `staging` so it does not reappear in the new version.
5. You carry on working in `staging` exactly where you left off.

Once the new version has been fully tested, you bring `staging` over to `main` – and the new version is live.

> **Remember:** New features are built in `staging`. Directly on `main` you only make **urgent fixes** to the live site.

> **Looking ahead to Part 3:** There we connect this to Vercel. Everything on `main` is published automatically on the real website. Everything on `staging` gets its own preview URL for testing.

### HEAD

**HEAD** is a special pointer. It shows **where you currently are** – that is, which branch you are working on. You have already seen it in the output of `git log --oneline`: `(HEAD -> main)` means "you are on the branch main".

### Creating a branch in the terminal

Show all branches:

```bash
git branch
```

```
* main
```

The asterisk marks the current branch. So far there is only our production system.

Now we create our test system. This command creates a new branch **and** switches to it straight away:

```bash
git switch -c staging
```

```
Switched to a new branch 'staging'
```

The `-c` stands for *create*. The new branch starts from exactly the state you were on – that is, the current state of `main`. Check with `git branch`:

```
  main
* staging
```

Switching between branches:

```bash
git switch main      # switch to the production system
```

```bash
git switch staging   # back to the test system
```

> **Note:** In older guides you often find `git checkout` instead of `git switch`. Both work, but `git switch` is newer and easier to understand.

### Creating a branch in VS Code

1. At the bottom left, click the name of the current branch in the **status bar** (e.g. `main`).
2. A picker opens at the top. Choose **Create new branch...**.
3. Enter the name and press Enter.

The same click on the branch name also lets you switch between branches.

![VS Code with the branch name highlighted in the status bar and the branch picker open](/images/teil-2/07-vscode-branch-erstellen.png)

> **Careful:** Before every change, look at the status bar at the bottom left to see which branch you are on. That way your work does not accidentally end up in the production system.

---

## 2.7 Committing on a branch

### Working in the test system

Make sure you are on `staging`:

```bash
git switch staging
```

The new version of our practice site is going to get a contact file. In VS Code, create the file `contact.txt` with the content `Email: me@example.com`, save it and commit it:

```bash
git add contact.txt
```

```bash
git commit -m "Add contact file"
```

```
[staging 4c5d6e7] Add contact file
 1 file changed, 1 insertion(+)
 create mode 100644 contact.txt
```

The first line tells you the commit was created on `staging`.

The new version should also get a gallery. Create the file `gallery.txt` with the content `Gallery`, save and commit:

```bash
git add gallery.txt
```

```bash
git commit -m "Add gallery page"
```

### What makes branches special

Now switch to the production system and keep an eye on the VS Code explorer:

```bash
git switch main
```

The files `contact.txt` and `gallery.txt` have **disappeared**! Do not worry – they only exist in the test system `staging`. The production system is unchanged, so our users do not see the new files yet. Switch back:

```bash
git switch staging
```

And there they are again. When you switch branches, Git swaps the files in your folder automatically.

> **Careful:** Commit your changes **before** you switch branches. If you have unsaved changes that would clash with the other branch, Git refuses to switch.

### Viewing the branches as a graph

```bash
git log --oneline --graph --all
```

```
* 5b6c7d8 (HEAD -> staging) Add gallery page
* 4c5d6e7 Add contact file
* 8e7d6f5 (main) Add third line from VS Code
* 3f2a1c9 Add second line
* a1b2c3d Add notes file
```

You can see it: `staging` is two commits ahead of `main`.

### Committing on a branch in VS Code

This works exactly as in section 2.5. Just make sure the right branch is shown in the status bar at the bottom left before you commit.

---

## 2.8 Remote repositories and remote branches

So far your repository only lives on your computer. If the hard drive breaks, everything is gone. On top of that, nobody else can join in. So now we connect the repository to **GitHub**.

### What is a remote?

A **remote** is a copy of your repository on another machine – in our case on GitHub. The default remote is usually called **origin**.

```
   Your computer                          GitHub
  ┌──────────────┐     git push      ┌──────────────┐
  │    local     │  ──────────────►  │    remote    │
  │  repository  │  ◄──────────────  │   (origin)   │
  └──────────────┘  git fetch / pull └──────────────┘
```

### Publishing the repository on GitHub

Because VS Code is already connected to your GitHub account ([Part 1, section 1.7](/en/part-1/)), you do not have to prepare anything on GitHub. VS Code creates the repository for you.

1. Switch to `main` by clicking the branch name in the status bar at the bottom left and choosing `main`.
2. Open the **Source Control** view and click **Publish Branch**.
3. VS Code asks what the repository should be called and whether it should be public. Leave the name `git-practice` as it is and choose **Publish to GitHub private repository** or **Publish to GitHub public repository** – either is fine for the exercise.

![VS Code with the "Publish Branch" button and the choice between a private and a public repository](/images/teil-2/08-vscode-publish-branch.png)
4. VS Code creates the repository on GitHub and uploads `main`. A message with an **Open on GitHub** button appears at the bottom right.

Click **Open on GitHub**. You now see your file `notes.txt` and, under **Commits**, your version history.

![The git-uebung repository on GitHub with the file notizen.txt and three commits](/images/teil-2/09-github-repository.png)

> **What happened behind the scenes?** VS Code created the repository on GitHub, registered it as a remote named `origin` and uploaded the branch. In the terminal that would have looked like this: `git remote add origin https://github.com/your-name/git-practice.git` and `git push -u origin main`.

### Pushing the staging branch

We upload our test system to GitHub as well:

1. Switch to `staging` in the status bar.
2. In the Source Control view, click **Publish Branch**.

Since the repository already exists, VS Code does not ask again and uploads the branch straight away. In the terminal that would be `git push -u origin staging`.

On GitHub you can now switch between the branches using the branch menu (it says `main`).

![Branch menu on GitHub with the branches main and staging](/images/teil-2/10-github-branches.png)

### Local branches and remote branches

Since the push, each branch exists twice:

| Branch | Where? | Meaning |
|---|---|---|
| `staging` | local | Your branch, the one you work on |
| `origin/staging` | local (copy) | Git remembers the state `staging` was in on GitHub last time |

You see all branches, including the remote ones, with:

```bash
git branch -a
```

```
* main
  staging
  remotes/origin/main
  remotes/origin/staging
```

### Getting changes from GitHub: fetch and pull

In real projects other people join in and push changes to GitHub. Let us simulate that: a colleague adds a phone number in the test system. We do it directly on GitHub:

1. Open your repository on GitHub.
2. Choose **staging** in the branch menu.
3. Click `contact.txt` and then the **pencil icon** (*Edit this file*).
4. Add a line: `Phone: 0123 456789`
5. Click **Commit changes…** and enter `Add phone number` as the message. Check that **Commit directly to the `staging` branch** is selected and confirm with **Commit changes**.

Now `staging` on GitHub is one commit ahead of the one on your computer. Your local repository does not know about it yet.

**git fetch** downloads the information about new commits but **does not change your files**:

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

**git pull** downloads the new commits **and** applies them to your current branch:

```bash
git pull
```

Open `contact.txt` in VS Code – the phone number has now reached you as well:

```
Email: me@example.com
Phone: 0123 456789
```

| Command | What happens? |
|---|---|
| `git fetch` | "Have a look at what is new" – your files stay unchanged |
| `git pull` | "Get what is new and apply it" – the same as `git fetch` + `git merge` |
| `git push` | "Upload my new commits" |

> **Tip:** Make it a habit to run `git pull` **before you start working**. That way you always work on the latest state and avoid conflicts.

> **Common mistake:** `! [rejected] staging -> staging (fetch first)`
> There are commits on GitHub that you do not have locally yet. Run `git pull` first and then `git push` again.

### Push and pull in VS Code

In VS Code the status bar at the bottom left shows, next to the branch name, whether you are up to date:

- **↓1** – there is one commit on GitHub that you do not have yet
- **↑2** – you have two commits that are not on GitHub yet

Clicking that icon, or **Sync Changes** in the Source Control view, runs `git pull` and `git push` one after the other.

---

## 2.9 Merges

At some point changes from one branch should be taken over into the other. That is called **merging**. In our branch model there are two typical merges:

| From | To | When? |
|---|---|---|
| `main` | `staging` | You made a hotfix in the production system and want it in the test system too. |
| `staging` | `main` | The new version has been tested and goes live. |

> **Remember:** You always switch **first to the branch that should receive the changes**, and then pull the other branch in. "I am on `staging` and I merge `main` into it."

### Scenario 1: A hotfix in the production system

The new version in `staging` is not finished yet. Then you notice: **the imprint is missing from the production system!**

Switch to `main`. In the explorer you see that `contact.txt` and `gallery.txt` are gone – you see exactly the state that is live right now.

```bash
git switch main
```

```bash
git pull
```

Create the file `imprint.txt` with the content `Imprint: John Doe, 1 Example Street, 12345 Exampletown`, save it, commit it and push it:

```bash
git add imprint.txt
```

```bash
git commit -m "Add missing imprint"
```

```bash
git push
```

The bug is fixed live. Now you bring the hotfix into the test system – otherwise the imprint would be missing again as soon as the new version goes live:

```bash
git switch staging
```

```bash
git merge main -m "Take over hotfix from main"
```

```bash
git push
```

Because **both branches** have moved on, Git creates a **merge commit** that brings the two strands together:

```
  ●───●───●──────────●              main
           \          \
            ●───●───●──●            staging (● = merge commit)
```

> **Tip:** In VS Code you can see under **Graph** in the Source Control view how the two branches were merged.

### Scenario 2: The new version goes live

The new version has been tested and should go into the production system. To do that, switch to `main` and pull `staging` in:

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
 contact.txt | 2 ++
 gallery.txt | 1 +
 2 files changed, 3 insertions(+)
```

Git reports **Fast-forward**: nothing new has happened on `main` since the last merge – the hotfix is already contained in `staging`, after all. So Git has nothing to bring together and simply moves `main` forward. Production system and test system are now identical, and the new version is live.

> **Careful:** Before this step, check in the status bar that you really are on `main`, and only merge when everything in `staging` has been fully tested. Everything you bring to `main` now is what your users will see.

> **Merging with AI:** Merging in particular is something where you do not have to remember the commands. If you are unsure or suspect conflicts, start Claude Code in the terminal with `claude` and enter something like:
>
> ```prompt
> Help me synchronise the staging and main branches. Check both branches
> and give me the Git commands to merge them together safely.
> ```
>
> Claude Code looks at what changed in both branches, warns you about possible conflicts and explains every step.

---

## 2.10 Merge conflicts

A **merge conflict** arises when **the same line was changed differently in both branches**. Git then cannot know which version is correct and asks you. In our model that happens, for example, when a hotfix on `main` fixes exactly the spot you have just rebuilt in `staging`.

> **Don't panic!** Merge conflicts are completely normal. Nothing breaks, and with `git merge --abort` you can cancel a merge at any time.

### Exercise: create a conflict

1. Switch to `staging`, change the **first line** of `notes.txt` to `# My notes`, save and commit.
2. Switch to `main`. Here the first line still reads `My first line`. Change it to `Notes by Alex`, save and commit.
3. Bring the hotfix over to `staging`:

```bash
git switch staging
```

```bash
git merge main
```

```
Auto-merging notes.txt
CONFLICT (content): Merge conflict in notes.txt
Automatic merge failed; fix conflicts and then commit the result.
```

There it is, your first merge conflict.

### Resolving the conflict

Open `notes.txt`. Git has written both versions into the file and marked them with **conflict markers**:

```
<<<<<<< HEAD
# My notes
=======
Notes by Alex
>>>>>>> main
My second line
This line comes from VS Code
```

Between `<<<<<<< HEAD` and `=======` at the top is your version from `staging`; below that, up to `>>>>>>> main`, is the version from `main`.

VS Code highlights both versions in colour and shows these options above them:

- **Accept Current Change** – keep your version (`staging`)
- **Accept Incoming Change** – take the version from `main`
- **Accept Both Changes** – keep both versions, one below the other

We want to keep both and click **Accept Both Changes**. You can also simply edit the file by hand so that it looks the way it should in the end – all that matters is that every conflict marker is gone.

Then finish the merge:

```bash
git add notes.txt
```

```bash
git commit -m "Resolve merge conflict in notes.txt"
```

```bash
git push
```

It works the same way in VS Code: stage the file in the Source Control view with **+** and click **✓ Commit**.

> **Resolving conflicts with AI:** Claude Code helps here too. Enter something like:
>
> ```prompt
> I have a conflict from merging main into staging. Explain to me
> what each of the two versions says and help me resolve the conflict.
> ```

### Avoiding conflicts

- **Pull often**, so you always work on the latest state.
- **Bring hotfixes over to `staging` straight away**, not days later.
- **Publish new versions regularly**, so `staging` and `main` do not drift too far apart.

---

## 2.11 Cheat sheet

### Our branches

| Branch | System | What you do here |
|---|---|---|
| `main` | production system (live) | only urgent fixes (hotfixes) |
| `staging` | test system | new features and the next version |

### Setting up

| Command | Meaning | VS Code |
|---|---|---|
| `git init` | Create a new repository in the current folder | Source Control → **Initialize Repository** |
| `git remote add origin <url>` | Connect the repository to GitHub | **Publish Branch** |

### Committing

| Command | Meaning | VS Code |
|---|---|---|
| `git status` | Show the current state | Source Control |
| `git diff` | Show unstaged changes | Click the file under **Changes** |
| `git add <file>` | Stage a file | **+** next to the file |
| `git add .` | Stage all changes | **+** next to **Changes** |
| `git restore --staged <file>` | Unstage a file | **−** next to the file |
| `git commit -m "Message"` | Create a commit | Enter a message → **✓ Commit** |
| `git log --oneline` | Show the version history compactly | Source Control → **Graph** |
| `git log --oneline --graph --all` | Show all branches as a graph | Source Control → **Graph** |

### Branches

| Command | Meaning | VS Code |
|---|---|---|
| `git branch` | Show local branches | Branch name in the status bar |
| `git branch -a` | Show all branches including remote ones | Branch name in the status bar |
| `git switch -c <name>` | Create a new branch and switch to it | Status bar → **Create new branch...** |
| `git switch <name>` | Switch to a branch | Status bar → choose a branch |

### Working together

| Command | Meaning | VS Code |
|---|---|---|
| `git push -u origin <branch>` | Upload a branch for the first time | **Publish Branch** |
| `git push` | Upload new commits | **Sync Changes** |
| `git fetch` | Fetch news from GitHub | Command palette → **Git: Fetch** |
| `git pull` | Fetch news and apply it | **Sync Changes** |

### Merging

| Command | Meaning | VS Code |
|---|---|---|
| `git merge <branch>` | Merge a branch into the current branch | Command palette → **Git: Merge...** |
| `git merge --abort` | Cancel a merge in progress | Command palette → **Git: Abort Merge** |

---

## What you should have now

- You can explain what a **repository**, a **commit** and a **branch** are.
- You know the three areas **working directory**, **staging area** and **repository**.
- You have committed in the **terminal** and in **VS Code**.
- You know our branch model: **`main`** is the production system, **`staging`** the test system.
- You have **created** the branch `staging`, **committed** on it and **pushed** it to **GitHub**.
- You know the difference between `git fetch`, `git pull` and `git push`.
- You have made a **hotfix** in the production system, brought it over to `staging` and taken a **new version** from `staging` to `main`.
- You know the difference between **fast-forward** and a **merge commit**.
- You have resolved a **merge conflict**.
- You know how to tell **Claude Code** what you want to achieve with Git instead of memorising every command.
- Your practice project `git-practice` is on GitHub.

[← Part 1: Setup](/en/part-1/) · [Next up, Part 3: Astro & Vercel →](/en/part-3/)
