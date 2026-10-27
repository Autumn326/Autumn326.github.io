# Adding a new project

Every project page is generated from one entry in `data/projects.json`. No HTML needs to be written.

1. **Add one entry** to the `projects` list in `data/projects.json`. Copy an existing entry and change it. Required fields: `id`, `title`, `type`, `theme`, `featured`, `date`, `summary`, `tags`, `features`, `links`.
   - `id` is lowercase words joined by dashes (for example `my-new-project`). The page is then available at `project.html?id=my-new-project`.
   - `type` is one of `mobile-app`, `ai`, `data`, `algorithm`, `systems`, `backend`, `database`, `security`, `early`.
   - `theme` is still required by the validator but is not used for styling: every page shares one look (`site.css`). It is kept so per-project themes can be brought back later.
2. **Add images** (optional) to the `images/` folder, for example `images/my-new-project/home.png`. Keep them small (under about 500 KB each) because GitHub Pages serves them as plain files.
3. **Reference the images** in the entry:
   - `"thumbnail": "images/my-new-project/thumb.png"` shows on the home page card.
   - `"images": [{ "src": "images/my-new-project/home.png", "alt": "Home screen showing ...", "caption": "Optional caption" }]` shows in the Screenshots section. Always write `alt` text.
4. **GitHub link** (optional): `links.github` takes an `https://` link. It is kept for later and is not shown on project pages.
5. **Short clips** (optional): see step 7; clips are local files, there are no YouTube or external links.
6. **Fill in `whatILearned`** (optional). Separate paragraphs with a blank line (`\n\n` inside the JSON string).
7. **Media list** (optional): `showcase` is the list of every image, code snippet image, diagram and clip for the project, each `{ "kind": "screenshot|code|diagram|clip", "title", "brief", "file", "src", "alt", "caption" }`. This is what fills the **Gallery** tab. Items without a `src` stay hidden; add `?preview=1` to the page URL to see the empty slots. Code items are images of a short snippet only. `clip` items autoplay muted and looped with no controls (reduced-motion visitors get controls instead); they are local videos of 6 seconds max (MP4 or WebM under `videos/<project>/`, under 5 MB, plus optional `poster`). `docs/showcase-shots.md` lists what to capture.
7b. **Design story** (the main tab): `story` is an ordered list of steps that walks through how the project was designed, so the visitor follows the process while scrolling. Each step is `{ "id", "label", "title", "body": ["paragraph", ...], "media": ["images/....png", ...], "notes": [{ "title", "text" }] }`.
   - `label` is the short name shown in the sticky process bar and `title` is the heading.
   - `media` lists `file` values from `showcase`. Screenshots, diagrams and clips appear under the text.
   - If a step has `notes` and a `code` item in `media`, the code image is shown with the reasoning beside it (why this approach, why that choice). Write each note as a question and its answer.
   - Everything in `story` must also be in `showcase`, so the Gallery tab shows it all, in story order.
8. **Check it**: run `python3 scripts/validate_projects.py`, then `python -m http.server 8000` and open `http://localhost:8000/project.html?id=my-new-project`.

Any section whose field is empty (`summary`, `tags`, `features`, `images`, `story`, `whatILearned`) is hidden automatically.

## Rules

- No full source code: write-ups, diagrams and screenshots only.
- No student ID, no university name, no contact or social links anywhere.
- The `github` link field is not shown on project pages.
