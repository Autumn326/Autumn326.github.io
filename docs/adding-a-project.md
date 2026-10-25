# Adding a new project

Every project page is generated from one entry in `data/projects.json`. No HTML needs to be written.

1. **Add one entry** to the `projects` list in `data/projects.json`. Copy an existing entry and change it. Required fields: `id`, `title`, `type`, `theme`, `featured`, `date`, `summary`, `tags`, `features`, `links`.
   - `id` is lowercase words joined by dashes (for example `my-new-project`). The page is then available at `project.html?id=my-new-project`.
   - `type` is one of `mobile-app`, `ai`, `data`, `algorithm`, `systems`, `backend`, `database`, `security`, `early`.
   - `theme` is one of `apple`, `ai-graph`, `terminal`.
2. **Add images** (optional) to the `images/` folder, for example `images/my-new-project/home.png`. Keep them small (under about 500 KB each) because GitHub Pages serves them as plain files.
3. **Reference the images** in the entry:
   - `"thumbnail": "images/my-new-project/thumb.png"` shows on the home page card.
   - `"images": [{ "src": "images/my-new-project/home.png", "alt": "Home screen showing ...", "caption": "Optional caption" }]` shows in the Screenshots section. Always write `alt` text.
4. **GitHub link** (optional): `links.github` takes an `https://` link. It is kept for later and is not shown on project pages.
5. **Short clips** (optional): see step 7; clips are local files, there are no YouTube or external links.
6. **Fill in `whatILearned`** (optional). Separate paragraphs with a blank line (`\n\n` inside the JSON string).
7. **Plan highlights** (optional): `showcase` is a list of slots, each `{ "kind": "screenshot|code|diagram|clip", "title", "brief", "file", "src", "alt", "caption", "youtube" }`. Slots without media stay hidden; add `?preview=1` to the page URL to see them. Code slots are images of a short snippet only. `clip` slots autoplay muted and looped with no controls (reduced-motion visitors get controls instead); they are local videos of 6 seconds max (MP4 or WebM under `videos/<project>/`, under 5 MB, plus optional `poster`). `docs/showcase-shots.md` lists what to capture.
8. **Check it**: run `python3 scripts/validate_projects.py`, then `python -m http.server 8000` and open `http://localhost:8000/project.html?id=my-new-project`.

Any section whose field is empty (`summary`, `tags`, `features`, `images`, `whatILearned`) is hidden automatically.

## Rules

- No full source code: write-ups, diagrams and screenshots only.
- No student ID, no university name, no contact or social links anywhere.
- The `github` link field is not shown on project pages.
