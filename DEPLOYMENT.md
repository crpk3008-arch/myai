# Deploying Cosmic Relics to Cloudflare Pages

This project is pre-configured for **Cloudflare Pages** with **Cloudflare Pages Functions**:

- **Static frontend (`dist/`)**: Built by Vite (`npm run build`) and served directly from the Cloudflare global CDN.
- **Server-side Gemini endpoint (`functions/api/astronaut-chat.ts`)**: Handles `POST /api/astronaut-chat` inside a Cloudflare Pages Function using `@google/genai` and `context.env.GEMINI_API_KEY`. The API key is never included in `dist/` or sent to the browser.
- **Routing (`public/_routes.json`)**: Sends only `/api/*` requests to Pages Functions while serving all static assets directly from CDN.
- **Runtime config (`wrangler.toml`)**: Sets `pages_build_output_dir = "dist"` and `compatibility_flags = ["nodejs_compat"]`.

---

## Option 1: Deploy via Git Integration (Cloudflare Dashboard)

1. Push this repository to GitHub or GitLab.
2. In the **Cloudflare Dashboard**, go to **Workers & Pages** -> **Create** -> **Pages** -> **Connect to Git**.
3. Select your repository and configure the build settings:
   - **Framework preset**: `Vite` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Add your encrypted secret **before** (or right after) your first deployment:
   - Go to **Settings** -> **Environment variables**.
   - Under **Production** (and **Preview** if desired), click **Add variable**:
     - **Variable name**: `GEMINI_API_KEY`
     - **Value**: your Gemini API key
     - Check **Encrypt** so the value is stored as an encrypted Cloudflare Secret (never plaintext).
5. Trigger a deployment (or **Retry deployment** if you added the secret after the initial deploy).

---

## Option 2: Deploy via Wrangler CLI

1. Install dependencies and build the static frontend:

   ```bash
   npm install
   npm run build
   ```

2. Authenticate Wrangler with your Cloudflare account:

   ```bash
   npx wrangler login
   ```

3. Create the Cloudflare Pages project (first-time setup):

   ```bash
   npx wrangler pages project create cosmic-relics --production-branch main
   ```

4. Upload your encrypted `GEMINI_API_KEY` secret to Cloudflare Pages:

   ```bash
   npx wrangler pages secret put GEMINI_API_KEY --project-name cosmic-relics
   ```

   *(Paste your key when prompted; Cloudflare encrypts it at rest and binds it to `context.env.GEMINI_API_KEY`.)*

5. Deploy `dist/` together with `functions/`:

   ```bash
   npx wrangler pages deploy dist --project-name cosmic-relics
   ```

---

## Local Testing with Cloudflare Pages Functions

To emulate Cloudflare Pages + Pages Functions locally:

1. Copy `.dev.vars.example` to `.dev.vars` (gitignored) and add your key:

   ```bash
   cp .dev.vars.example .dev.vars
   ```

2. Build and run with Wrangler:

   ```bash
   npm run build
   npx wrangler pages dev dist
   ```
