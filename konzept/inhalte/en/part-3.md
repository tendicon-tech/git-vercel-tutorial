---
title: Part 3 – Your first Astro project & deployment with Vercel
description: Create an Astro project, publish it on GitHub and put it online automatically through Vercel.
---

# Part 3 – Your first Astro project & deployment with Vercel

**Goal:** You build your first website with Astro, upload it to GitHub and connect GitHub to Vercel. At the end your site is reachable on the internet – and every change you push goes online automatically.

**Requirements:** [Part 1](/en/part-1/) and [Part 2](/en/part-2/) are complete.

> **Note:** We use **Astro** in this tutorial because it is simple and a good fit for content-focused websites. But Vercel works just as well with many other kinds of projects – for example with **Next.js**, a framework for large web applications built with React. The workflow with GitHub and Vercel that you learn here is always the same.

---

## 3.1 What is Astro?

**Astro** is a framework for building fast websites. It is especially suited to sites where the **content** is the main thing: blogs, portfolios, company websites – or tutorials like this one. Visitors read, look and click on links.

The counterpart are **applications**, where the **function** is the main thing: an online shop with a basket, a booking system, an inbox or a dashboard. There people sign in, enter data and are shown new content all the time. For applications like that you would rather use frameworks such as Next.js.

The line between the two is blurry, and you can build individual interactive areas with Astro as well. For our website it is exactly the right choice. By the way, you do not need to know how Astro works in detail – Claude Code writes the code for you.

> **Note:** This tutorial site is an Astro project itself. Have a look at the [source code on GitHub](https://github.com/tendicon-tech/git-vercel-tutorial) if you want to see how it is put together.

---

## 3.2 Creating an Astro project

### Opening a new project folder in VS Code

1. Open VS Code and choose **File** → **Open Folder...**.
2. Go to your `projects` folder (`C:\Users\YourName\projects`).
3. Click **New folder** at the top of the window and name it `my-astro-project`.
4. Select the new folder and click **Select Folder**.
5. If VS Code asks whether you trust the files, click **Yes, I trust the authors**.
6. Open the terminal with ``Ctrl + ` `` or via the menu **Terminal** → **New Terminal**. It starts in the `my-astro-project` folder automatically.

### Starting the Astro wizard

Type this in the terminal in VS Code:

```bash
npm create astro@latest
```

> **Note:** The first time round, npm may ask whether it is allowed to install the `create-astro` package (`Ok to proceed? (y)`). Confirm with **Enter**.

The wizard now asks you a few questions. You choose with the **arrow keys** and confirm with **Enter**.

**Where should we create your new project?**
Enter a dot `.`. The dot stands for "the current folder" – so Astro creates the project directly in `my-astro-project`, the folder you just opened.

**How would you like to start your new project?**
Choose **A basic, helpful starter project**. That is a simple home page for us to build on.

**Install dependencies?**
Choose **Yes**. Astro now installs all the packages the project needs.

**Initialize a new git repository?**
Choose **Yes**. Astro runs `git init` for you and creates the first commit right away.

After a moment Astro reports:

```
 next  Liftoff confirmed. Explore your project!

       Run npm run dev to start the dev server. CTRL+C to stop.
```

All the files of your new project now appear in the VS Code explorer.

> **Note:** The exact wording and questions can differ slightly depending on the Astro version. When in doubt, pick the recommended option (*recommended*).

Check briefly in the terminal whether Astro really has committed already:

```bash
git log --oneline
```

```
b4c3d2e (HEAD -> main) Initial commit from Astro
```

---

## 3.3 Running the site locally

You now see a lot of new folders and files in the VS Code explorer. Do not worry – you do not have to understand them in detail. Claude Code will write the code for you in a moment.

Type this in the terminal in VS Code:

```bash
npm run dev
```

```
 astro  v5.x.x ready in 312 ms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose
```

Hold **Ctrl** and click `http://localhost:4321/` – or type the address into your browser. You see the home page that Astro brings along as a template.

> **What is localhost?** `localhost` means "this computer". The site runs on your machine only and is not on the internet yet.

> **Note:** As long as the site is running, this terminal is occupied. Just leave it open. For everything else you open a **second terminal** with the **+** in the terminal area. You stop the site later with **Ctrl + C**.

---

## 3.4 Designing the website with Claude Code

Now for the exciting part: instead of writing code yourself, you describe to Claude Code how your website should look.

### Starting Claude Code

Open a second terminal with the **+** in the terminal area and start Claude Code:

```bash
claude
```

### Describing your website

Enter this prompt and press **Enter**:

```prompt
Delete the Astro template code. Create a hero section with the title
"My first Astro website". Draw an elephant next to it. Create two more
pages: an imprint with placeholders and a privacy policy.
Link to both pages from the home page.
```

> **What is a prompt?** A **prompt** is the instruction you give the AI. The more precisely you describe what you want, the better the result.

### Waiting and allowing changes

Claude Code now looks at your project, plans the changes and gets going. That can take a moment.

Before Claude Code changes or creates files, it asks you for permission. Have a quick look at what it intends to do and confirm with **Yes**. If you do not want to be asked about every single file, you can also choose the option to allow changes for this session in general.

You can watch in the terminal what Claude Code is working on. When it is finished, it summarises what it did.

### Looking at the result

Switch to the browser. The page at `http://localhost:4321/` has **updated automatically**. You see your hero section with the title and the elephant. Click the links to the imprint and the privacy policy as well.

![Finished home page in the browser: the title "My first Astro website", a drawn elephant and the links to the imprint and the privacy policy](/images/teil-3/06-astro-ergebnis.png)

> **Note:** Your result probably looks a little different from the screenshot. The AI comes up with its own solution every time – that is completely normal.

> **Tip:** Not happy with something? Just tell Claude Code, for example: "Make the elephant bigger and give the hero section a light blue background." That is how you improve your site step by step.

> **Careful:** The imprint only contains placeholders. Before you really publish the site, you have to put in your actual details there and check the privacy policy.

### Committing the changes

Now your knowledge from Part 2 comes into play. Since there is no live site to protect yet, we commit this first version straight to `main`. We only create the `staging` branch once the site is online.

You can commit the changes as usual in the **Source Control** view – or you can ask Claude Code to do it:

```prompt
Commit all changes with a fitting commit message.
```

Then quit Claude Code with `/exit`.

---

## 3.5 Publishing the project on GitHub

Exactly as in [Part 2](/en/part-2/), VS Code creates the repository for you:

1. Check in the status bar at the bottom left that you are on `main`.
2. Open the **Source Control** view and click **Publish Branch**.
3. Leave the name `my-astro-project` as it is and choose **Publish to GitHub public repository**.
4. VS Code creates the repository on GitHub and uploads everything. Click **Open on GitHub** in the message at the bottom right.

You now see all the files of your project on GitHub – but **no** `node_modules` folder. Astro put that one in `.gitignore`, because it is huge and can be regenerated at any time.

---

## 3.6 Connecting GitHub to Vercel

Now for the exciting part: we put the site on the internet.

### Importing the project

1. Open [vercel.com](https://vercel.com) and sign in.
2. In the dashboard, click **Add New…** → **Project**.
3. Under **Import Git Repository** you see a list of your GitHub repositories. Click **Import** next to `my-astro-project`.

> **Common mistake:** The repository does not appear in the list.
> Vercel does not have permission to access this repository yet. Click **Adjust GitHub App Permissions** (or **Configure GitHub App**). On GitHub you can then either choose **All repositories** under **Repository access**, or add `my-astro-project` specifically under **Only select repositories**. Click **Save** and go back to Vercel.

### Configuring the project

Vercel shows you the **Configure Project** page. The best part: there is almost nothing for you to do.

- **Project Name:** `my-astro-project` – this name determines the later address.
- **Framework Preset:** Vercel has detected **Astro** automatically.
- **Root Directory:** `./` – the project sits directly in the main folder of the repository.
- **Build and Output Settings:** Vercel already knows that it has to run `npm run build` and publish the `dist` folder.

Click **Deploy**.

### The first deployment

Vercel now fetches your project from GitHub, installs the packages, runs `npm run build` and publishes the result. You can watch along live in the **build log**. This usually takes less than a minute.

Afterwards Vercel greets you with **Congratulations!** and a preview of your site.

Click **Continue to Dashboard**. Under **Domains** you find the address of your website, for example:

```
https://my-astro-project.vercel.app
```

Open it – **your website is online!** You can now send the link to friends and open it on your phone.

> **Note:** If the name is already taken, Vercel automatically appends something to the address, e.g. `my-astro-project-abc123.vercel.app`.

---

## 3.7 The automatic deployment workflow

From now on you never have to upload anything by hand again. Vercel watches your GitHub repository and rebuilds the site automatically on **every push**.

### Step 1: Taking a change live directly

Let us try it straight away. We still take this first change directly to `main`.

Start Claude Code in the VS Code terminal with `claude` and enter a prompt, for example:

```prompt
Replace the elephant with a cat.
```

Look at the result at `http://localhost:4321/`.

![Home page in the browser: a drawn cat is now sitting where the elephant was](/images/teil-3/12-astro-katze.png)

If you like it, commit and push the change – in the Source Control view with **✓ Commit** and **Sync Changes**, or with a prompt:

```prompt
Commit all changes with a fitting commit message and push them.
```

Open the Vercel dashboard. Under **Deployments** you see that a new deployment is running. As soon as it is finished (status **Ready**), reload your `.vercel.app` address: **the cat is online.**

Every push to `main` creates a **production deployment** – in other words an update of the real, public website.

### Step 2: Creating the staging test system

Your site is live now. From here on we work as in Part 2: new changes are made in the test system `staging` and only reach `main` once they are done. That way your users never see a half-finished version.

1. Click `main` in the status bar at the bottom left and choose **Create new branch...**.
2. Enter `staging` and press Enter.
3. Click **Publish Branch** in the Source Control view.

Vercel treats the two branches differently, all by itself:

| Push to … | Kind of deployment | Where do you see it? |
|---|---|---|
| `main` | **Production deployment** | Your real address, e.g. `my-astro-project.vercel.app` – this is what your users see |
| `staging` | **Preview deployment** | A separate preview address for testing – the real site stays unchanged |

```
  staging:  Prompt ──► Commit ──► Push ──► Preview deployment    (test the preview)
                                                  │
                                            Merge into main
                                                  │
                                                  ▼
  main:                                  Production deployment   (live)
```

### Step 3: Making a change in the test system

Check in the status bar at the bottom left that you are on `staging`. Give Claude Code a new prompt – whatever you like, for example:

```prompt
Give the hero section a light blue background and add a short
welcome text below the title.
```

Look at the result locally, then commit and push as usual.

### Step 4: Looking at the preview

Vercel builds the `staging` branch automatically. In the Vercel dashboard under **Deployments** a new deployment appears, marked **Preview** and showing the branch `staging`.

As soon as it is finished (status **Ready**), click it and open the preview address. You see your new change – but your real site at `my-astro-project.vercel.app` is **unchanged**.

> **Note:** Vercel protects preview deployments by default. Whoever opens the preview address may have to be signed in to Vercel. Your real address, on the other hand, is publicly reachable for everyone.

### Step 5: Taking the new version live

Does everything look right in the preview? Then you bring `staging` over to `main` – exactly as in Part 2. You can leave that to Claude Code:

```prompt
Merge the staging branch into main and push main. Then switch back
to staging.
```

Or in the terminal:

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

Vercel notices the push to `main` and starts a **production deployment**. As soon as it is finished, reload your `.vercel.app` address: **the new version is live.**

> **A bug on the live site?** Then you proceed as with the hotfix in Part 2: switch to `main`, have Claude Code fix the bug, commit and push – Vercel brings the fix online immediately. Afterwards you bring the change over to `staging` with `git merge main`.

### Deployment status on GitHub

You can also see directly on GitHub whether a deployment worked. A small icon appears next to every commit:

- 🟡 **yellow dot** – Vercel is building right now
- ✅ **green tick** – deployment successful
- ❌ **red cross** – deployment failed

Clicking the icon takes you straight to the details on Vercel.

---

## 3.8 When something goes wrong

### Reading the build logs

If a deployment fails, you get an email from Vercel and the deployment is marked as **Error** in the dashboard. Click it and open the **Build Logs**. The decisive error message is usually **at the end** of the log – often highlighted in red.

> **Tip:** Copy the error message and ask Claude Code: "My Vercel deployment fails with this error: … What does it mean and how do I fix it?"

> **Don't panic:** A failed deployment does **not** break your website. Vercel only publishes successful builds. Your site stays on the last working state until you have fixed the problem.

### Common problems

> **Common mistake:** `Command "npm run build" exited with 1`
> The build failed – usually because of an error in the code, for example a typo or a missing closing tag. Run `npm run build` locally. There you see the same error message and can fix the problem directly. Then commit and push.

> **Common mistake:** The site shows `404: NOT_FOUND`
> In Vercel, check under **Settings** → **Build and Deployment** whether the **Framework Preset** is set to **Astro** and the **Root Directory** is correct. If your Astro project sits in a subfolder of the repository, you have to enter that folder as the root directory.

> **Common mistake:** Errors because of the Node.js version
> Locally you may be using a different Node.js version than Vercel. Under **Settings** → **Build and Deployment** → **Node.js Version** you can change the version in Vercel. Choose the same major version that `node -v` shows on your machine.

> **Common mistake:** `Port 4321 is in use` when starting with `npm run dev`
> The development server is already running in another terminal. Stop it there with **Ctrl + C**, or use the address Astro shows you instead (port `4322`, for example).

> **Common mistake:** `npm: command not found` or `bash: npm: command not found`
> Node.js is not installed, or the terminal has not been restarted since the installation. See [Part 1, section 1.5](/en/part-1/#15-installing-nodejs).

### Going back to an earlier version: rollback

If a faulty change did make it live after all, you can go back to the previous version in seconds:

1. Open the **Deployments** tab in the Vercel dashboard.
2. Find the last working production deployment.
3. Click the **⋯** menu next to it and choose **Instant Rollback**.

Your site is immediately back to the old state. Then fix the problem in the code at your leisure and push again.

---

## 3.9 What next?

Congratulations – you made it! You have set up a development environment, learned the basics of Git and published your own website that updates itself on every change.

If you want to carry on, here are a few ideas:

- **Connect your own domain:** Under **Settings** → **Domains** in Vercel you can set up your own address such as `www.your-name.com`.
- **Environment variables:** Under **Settings** → **Environment Variables** you store secret values such as API keys – safely and outside your repository.
- **Learn more Astro:** Build more pages, your own components and your own layout. Or create a blog from Markdown files.
- **Work together:** Invite someone as a collaborator to your GitHub repository and work on `staging` together.

### Further reading

- [Astro documentation](https://docs.astro.build/en/getting-started/)
- [Git documentation and the free book "Pro Git"](https://git-scm.com/book/en/v2)
- [GitHub Docs](https://docs.github.com)
- [Vercel documentation](https://vercel.com/docs)
- [VS Code – Source Control](https://code.visualstudio.com/docs/sourcecontrol/overview)
- [Claude Code documentation](https://docs.claude.com/en/docs/claude-code/overview)

---

## What you should have now

- An **Astro project** that runs locally with `npm run dev`
- The project as a **public repository on GitHub**
- Your website **live on the internet** at a `.vercel.app` address
- The branches **`main`** (production system) and **`staging`** (test system) – on GitHub as well
- An understanding that a push to `main` triggers a **production deployment** and a push to `staging` a **preview deployment**
- The complete workflow: **prompt → commit → push to staging → check the preview → merge into main → live**

[← Part 2: How does Git work?](/en/part-2/) · [Back to the start](/en/)
