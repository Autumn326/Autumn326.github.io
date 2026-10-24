# Portfolio

Static portfolio site for GitHub Pages (plain HTML, CSS and JavaScript, no build step).

- `index.html`, `styles.css`, `script.js`: the home page. Colours and fonts are tokens at the top of `styles.css`.
- `data/projects.json`: every project on the site. Featured projects come from `"featured": true`.
- `scripts/`: validation helpers run by CI (`.github/workflows/ci.yml`).
- `docs/`: planning notes.

## Run locally

The page loads `data/projects.json`, so open it through a local server rather than double-clicking:

    python -m http.server 8000

then visit http://localhost:8000.

## Rules

No full source code, no student ID anywhere, videos are YouTube embeds.
