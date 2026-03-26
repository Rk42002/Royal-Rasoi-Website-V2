# Royal Rasoi — website & food image prompt tool

This repository hosts **Royal Rasoi** web assets, including a browser-based **food image edit prompt builder** for Gemini and similar editors.

## Live site (GitHub Pages)

After you enable Pages (see below), the app is served at:

**https://rk42002.github.io/Royal-Rasoi-Website/**

Root (`/`) redirects to the prompt wizard (`food-image-edit-prompt.html`).

### Enable GitHub Pages

1. Open the repo on GitHub: [Rk42002/Royal-Rasoi-Website](https://github.com/Rk42002/Royal-Rasoi-Website).
2. **Settings** → **Pages** (under *Code and automation*).
3. **Build and deployment** → **Source**: *Deploy from a branch*.
4. **Branch**: `main`, folder **`/ (root)`**, then **Save**.

Wait a minute for the first build; the site URL appears at the top of the Pages settings.

**Gemini API:** The tool stores your API key only in the browser (`localStorage`). If calls fail from the GitHub Pages URL, allow that origin in [Google AI Studio](https://aistudio.google.com/apikey) API key restrictions.

## Files

| File | Purpose |
|------|--------|
| `food-image-edit-prompt.html` | Step-through form → copy/download the generated prompt |
| `server.js` | Static HTTP server for Railway / `npm start` (not used by GitHub Pages) |
| `index.html` | Redirects `/` → prompt builder |
| `food-image-edit-workflow.md` | Markdown spec for a conversational prompt-engineer workflow |

## Usage

1. Open the GitHub Pages URL above, or clone and open `food-image-edit-prompt.html` in a browser (prefer a local server or HTTPS origin for Gemini API).
2. Complete the steps (base image, framing, platform size, background, etc.).
3. **Generate prompt** → copy or download the `.txt` block for your image model.

Optional **Google AI Studio** key: auto-describe uploads and run **Prompt readiness review** on the last step.

## Deploy on Railway (optional)

The app can also be served with **`node server.js`** (see `package.json`). Point Railway at this repo and run **`npm start`**. Set `PORT` as provided by the platform.

**Local preview:** `npm start` (default port **3000**).

## License

See [LICENSE](LICENSE) (MIT).
