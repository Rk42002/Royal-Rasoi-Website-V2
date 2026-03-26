# Food image prompt generation tool

A small browser-based wizard that builds **detailed, Gemini-friendly prompts** for editing food and restaurant photos (delivery banners, social posts, menus). It also includes a **markdown spec** for a conversational “prompt engineer” workflow.

## Files

| File | Purpose |
|------|--------|
| `food-image-edit-prompt.html` | Step-through form → copy/download the generated prompt |
| `server.js` | Static HTTP server for Railway / `npm start` |
| `index.html` | Redirects `/` → prompt builder |
| `food-image-edit-workflow.md` | Markdown spec for a conversational prompt-engineer workflow |

## Usage

1. Clone or download this repo.
2. Open `food-image-edit-prompt.html` in a modern browser (double-click or serve locally).
3. Complete the steps (base image description, framing, platform size, background style, enhancements, etc.).
4. **Generate prompt** → copy or download the `.txt` block for your image model.

The generated prompt includes **anti-clutter** composition rules and **output clarity / sharpness** instructions (including for slightly soft or low-res sources). In Step 6 you can optionally tick **Extra clarity & crisp detail** for stronger emphasis.

Optional **Google AI Studio** API key (stored only in your browser): auto-describe the base image after upload, and on the last step run **Prompt readiness review** to have Gemini sanity-check the prompt (and optional image) before you edit.

## Deploy on Railway

The app is served by **`server.js`** (plain Node, no extra deps). Railway sets **`PORT`**; the server listens on **`0.0.0.0`**.

1. Push this repo to GitHub.
2. In [Railway](https://railway.app): **New project** → **Deploy from GitHub repo** → select **`Food-Image-prompt-generation-tool`**.
3. Railway runs **`npm install`** (lockfile is optional) then **`npm start`** → **`node server.js`**.
4. In the service → **Settings** → **Networking** → **Generate domain** (or add a custom domain). Open that **HTTPS** URL — root loads **`index.html`**, which sends you to **`food-image-edit-prompt.html`**.

**If the link doesn’t load**
- Confirm the latest commit is deployed (**Redeploy** after push).
- Ensure a **public domain** is generated (private/internal URLs won’t open in your browser).
- Check **Deploy logs** for crashes (e.g. wrong root directory — root should be the repo root where `server.js` lives).

**Gemini API in production:** Keys stay in the browser (`localStorage`). If API calls fail on your Railway domain, add that origin under API key restrictions in [Google AI Studio](https://aistudio.google.com/apikey).

**Local preview:** `npm start` (uses port **3000** when `PORT` is unset) or `PORT=8080 npm start`.

## License

See [LICENSE](LICENSE) (MIT).
