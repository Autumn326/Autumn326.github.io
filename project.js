const PROJECTS_URL = "data/projects.json";

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function section(title, id) {
    const s = el("section", "project-section");
    s.setAttribute("aria-labelledby", id);
    const h = el("h2", "", title);
    h.id = id;
    s.appendChild(h);
    return s;
}

function normaliseImages(project) {
    return (project.images || []).map((img, i) => {
        const item = typeof img === "string" ? { src: img } : img;
        return {
            kind: "screenshot",
            src: item.src,
            alt: item.alt || `${project.title} screenshot ${i + 1}`,
            caption: item.caption || ""
        };
    }).filter(img => img.src);
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Media items: screenshot, code snippet image, diagram or short clip.
// An item with media is always shown; an empty slot only appears with ?preview=1
// so the live site never shows unfinished boxes.
const KINDS = { screenshot: "Screenshot", code: "Code", diagram: "Diagram", clip: "Clip" };
const KIND_PLURALS = { screenshot: "Screenshots", code: "Code", diagram: "Diagrams", clip: "Clips" };

function mediaKind(item) {
    return KINDS[item.kind] ? item.kind : "screenshot";
}

function buildMedia(item, project, preview) {
    const kind = mediaKind(item);
    if (!item.src && !preview) return null;
    const fig = el("figure", `showcase-item showcase-${kind}`);
    if (kind === "clip" && item.src) {
        // Short local clip (6 s max): muted, looping, autoplays on load with no controls.
        // Visitors who prefer reduced motion get a still first frame plus controls instead.
        const v = document.createElement("video");
        v.src = item.src;
        if (item.poster) v.poster = item.poster;
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.preload = "auto";
        v.disablePictureInPicture = true;
        v.setAttribute("aria-label", item.alt || item.title || `${project.title} clip`);
        if (reducedMotion()) v.controls = true;
        else {
            v.autoplay = true;
            v.play().catch(() => {});
        }
        fig.appendChild(v);
    } else if (item.src) {
        const pic = document.createElement("img");
        pic.src = item.src;
        pic.alt = item.alt || item.title || `${project.title} ${kind}`;
        pic.loading = "lazy";
        fig.appendChild(pic);
    } else {
        const box = el("div", "showcase-placeholder");
        box.appendChild(el("strong", "", `${KINDS[kind]} slot`));
        box.appendChild(el("span", "", item.brief || ""));
        if (item.file) box.appendChild(el("code", "", item.file));
        fig.appendChild(box);
    }
    const caption = item.caption || item.title;
    if (caption) fig.appendChild(el("figcaption", "", caption));
    return fig;
}

// ---------- Design story ----------

function buildStep(step, index, project, byFile, preview) {
    const wrap = el("section", "story-step");
    wrap.id = `step-${step.id}`;
    wrap.setAttribute("aria-labelledby", `step-${step.id}-title`);
    wrap.appendChild(el("span", "step-marker", String(index + 1).padStart(2, "0")));

    const content = el("div", "step-content");
    content.appendChild(el("p", "step-label", step.label || ""));
    const h = el("h2", "", step.title);
    h.id = `step-${step.id}-title`;
    content.appendChild(h);
    (step.body || []).forEach(p => content.appendChild(el("p", "step-text", p)));

    const items = (step.media || []).map(f => byFile.get(f)).filter(Boolean);
    const codeItem = step.notes && step.notes.length ? items.find(i => mediaKind(i) === "code") : null;

    // Screenshots, diagrams and clips for this step
    const figures = items.filter(i => i !== codeItem)
        .map(i => buildMedia(i, project, preview)).filter(Boolean);
    if (figures.length) {
        const row = el("div", "step-media");
        figures.forEach(f => row.appendChild(f));
        content.appendChild(row);
    }

    // Code screenshot with the reasoning beside it
    if (codeItem) {
        const fig = buildMedia(codeItem, project, preview);
        if (fig) {
            const split = el("div", "code-split");
            split.appendChild(fig);
            const notes = el("div", "code-notes");
            notes.appendChild(el("h3", "", "Why it is written this way"));
            step.notes.forEach(n => {
                const note = el("div", "code-note");
                note.appendChild(el("h4", "", n.title));
                note.appendChild(el("p", "", n.text));
                notes.appendChild(note);
            });
            split.appendChild(notes);
            content.appendChild(split);
        }
    }
    wrap.appendChild(content);
    return wrap;
}

function buildProcessNav(story) {
    const nav = el("nav", "process-nav");
    nav.setAttribute("aria-label", "Design process");
    const list = el("ol");
    story.forEach((step, i) => {
        const li = el("li");
        const a = el("a", "", step.label || step.title);
        a.href = `#step-${step.id}`;
        a.dataset.step = `step-${step.id}`;
        li.appendChild(a);
        list.appendChild(li);
    });
    nav.appendChild(list);
    return nav;
}

// Highlights the current step in the process bar while scrolling
function watchSteps(nav) {
    if (!("IntersectionObserver" in window)) return;
    const links = new Map([...nav.querySelectorAll("a")].map(a => [a.dataset.step, a]));
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            links.forEach(a => a.removeAttribute("aria-current"));
            const link = links.get(e.target.id);
            if (link) link.setAttribute("aria-current", "step");
        });
    }, { rootMargin: "-35% 0px -55% 0px" });
    document.querySelectorAll(".story-step").forEach(s => observer.observe(s));
}

// ---------- Gallery ----------

function collectGallery(project, preview) {
    const showcase = project.showcase || [];
    const ordered = [];
    const seen = new Set();
    // Story order first, so scrolling the gallery follows the design process
    (project.story || []).forEach(step => (step.media || []).forEach(f => {
        const item = showcase.find(s => s.file === f);
        if (item && !seen.has(f)) { seen.add(f); ordered.push(item); }
    }));
    showcase.forEach(item => { if (!seen.has(item.file)) ordered.push(item); });
    normaliseImages(project).forEach(img => ordered.push(img));
    return ordered.filter(i => i.src || preview);
}

const lightbox = { dialog: null, items: [], index: 0, opener: null };

function renderLightbox() {
    const { dialog, items, index } = lightbox;
    const item = items[index];
    const stage = dialog.querySelector(".lightbox-stage");
    stage.replaceChildren();
    if (item.kind === "clip") {
        const v = document.createElement("video");
        v.src = item.src;
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.controls = true;
        if (!reducedMotion()) v.autoplay = true;
        v.setAttribute("aria-label", item.alt || item.title || "Clip");
        stage.appendChild(v);
    } else {
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.alt || item.title || "";
        stage.appendChild(img);
    }
    dialog.querySelector(".lightbox-caption").textContent = item.caption || item.title || "";
    dialog.querySelector(".lightbox-count").textContent = `${index + 1} of ${items.length}`;
}

function ensureLightbox() {
    if (lightbox.dialog) return lightbox.dialog;
    const d = el("dialog", "lightbox");
    d.setAttribute("aria-label", "Media viewer");
    const close = el("button", "lightbox-btn lightbox-close", "Close");
    close.type = "button";
    const prev = el("button", "lightbox-btn lightbox-prev", "Previous");
    prev.type = "button";
    const next = el("button", "lightbox-btn lightbox-next", "Next");
    next.type = "button";
    const stage = el("div", "lightbox-stage");
    const info = el("p", "lightbox-info");
    info.appendChild(el("span", "lightbox-caption"));
    info.appendChild(el("span", "lightbox-count"));
    d.append(close, prev, stage, next, info);

    const step = delta => {
        lightbox.index = (lightbox.index + delta + lightbox.items.length) % lightbox.items.length;
        renderLightbox();
    };
    close.addEventListener("click", () => d.close());
    prev.addEventListener("click", () => step(-1));
    next.addEventListener("click", () => step(1));
    d.addEventListener("click", e => { if (e.target === d) d.close(); });
    d.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
    });
    d.addEventListener("close", () => {
        d.querySelector(".lightbox-stage").replaceChildren();
        if (lightbox.opener) lightbox.opener.focus();
    });
    document.body.appendChild(d);
    lightbox.dialog = d;
    return d;
}

function openLightbox(items, index, opener) {
    const d = ensureLightbox();
    lightbox.items = items;
    lightbox.index = index;
    lightbox.opener = opener;
    renderLightbox();
    if (typeof d.showModal === "function") d.showModal();
}

function buildGallery(items, project, preview) {
    const wrap = el("div", "gallery-wrap");
    const kinds = Object.keys(KINDS).filter(k => items.some(i => mediaKind(i) === k));
    const grid = el("div", "gallery-grid");
    let current = "";

    const chips = el("div", "chips");
    chips.setAttribute("role", "group");
    chips.setAttribute("aria-label", "Filter media");

    function draw() {
        grid.replaceChildren();
        const shown = items.filter(i => !current || mediaKind(i) === current);
        shown.forEach((item, i) => {
            const fig = buildMedia(item, project, preview);
            if (!fig) return;
            if (!item.src) { grid.appendChild(fig); return; }
            const btn = el("button", "gallery-tile");
            btn.type = "button";
            btn.setAttribute("aria-label", `Open: ${item.caption || item.title || mediaKind(item)}`);
            btn.addEventListener("click", () => openLightbox(shown.filter(s => s.src), shown.filter(s => s.src).indexOf(item), btn));
            btn.appendChild(fig);
            grid.appendChild(btn);
        });
        if (window.revealOnScroll) window.revealOnScroll(grid.querySelectorAll(".gallery-tile, .showcase-item"));
    }
    function drawChips() {
        chips.replaceChildren();
        [["", `All (${items.length})`], ...kinds.map(k => [k, `${KIND_PLURALS[k]} (${items.filter(i => mediaKind(i) === k).length})`])]
            .forEach(([kind, label]) => {
                const chip = el("button", "chip", label);
                chip.type = "button";
                chip.setAttribute("aria-pressed", String(current === kind));
                chip.addEventListener("click", () => { current = kind; drawChips(); draw(); });
                chips.appendChild(chip);
            });
    }
    drawChips();
    draw();
    wrap.append(chips, grid);
    return wrap;
}

// ---------- Tabs ----------

function buildTabs(panels) {
    const bar = el("div", "tabs");
    bar.setAttribute("role", "tablist");
    bar.setAttribute("aria-label", "Project sections");
    const buttons = panels.map(p => {
        const b = el("button", "tab", p.label);
        b.type = "button";
        b.id = `tab-${p.id}`;
        b.setAttribute("role", "tab");
        b.setAttribute("aria-controls", `panel-${p.id}`);
        p.node.id = `panel-${p.id}`;
        p.node.setAttribute("role", "tabpanel");
        p.node.setAttribute("aria-labelledby", b.id);
        bar.appendChild(b);
        return b;
    });
    function select(i, focus) {
        panels.forEach((p, n) => {
            const on = n === i;
            buttons[n].setAttribute("aria-selected", String(on));
            buttons[n].tabIndex = on ? 0 : -1;
            p.node.hidden = !on;
        });
        if (focus) buttons[i].focus();
        const id = panels[i].id;
        history.replaceState(null, "", id === panels[0].id ? location.pathname + location.search : `#${id}`);
    }
    buttons.forEach((b, i) => {
        b.addEventListener("click", () => select(i));
        b.addEventListener("keydown", e => {
            if (e.key === "ArrowRight") select((i + 1) % buttons.length, true);
            if (e.key === "ArrowLeft") select((i - 1 + buttons.length) % buttons.length, true);
        });
    });
    const start = panels.findIndex(p => `#${p.id}` === location.hash);
    select(start < 0 ? 0 : start);
    return bar;
}

// ---------- Page ----------

function renderProject(project, root) {
    root.replaceChildren();
    document.title = `${project.title} | Michael Chen`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = project.summary;
    const preview = new URLSearchParams(location.search).get("preview") === "1";

    // Header: always shown
    const head = el("header", "project-head");
    head.appendChild(el("span", "card-badge", project.type.replace("-", " ")));
    head.appendChild(el("h1", "", project.title));
    const meta = [project.date, project.course].filter(Boolean).join(" · ");
    if (meta) head.appendChild(el("p", "card-meta", meta));
    if (project.summary) head.appendChild(el("p", "project-summary", project.summary));
    root.appendChild(head);

    // Story tab: overview, then the design process step by step
    const storyPanel = el("div", "tab-panel story-panel");
    const byFile = new Map((project.showcase || []).map(s => [s.file, s]));

    const glance = el("div", "glance");
    if (project.tags && project.tags.length) {
        const s = section("Technology", "tech-title");
        const tags = el("ul", "tags");
        project.tags.forEach(t => tags.appendChild(el("li", "", t)));
        s.appendChild(tags);
        glance.appendChild(s);
    }
    if (project.features && project.features.length) {
        const s = section("Key features", "features-title");
        const list = el("ul", "feature-list");
        project.features.forEach(f => list.appendChild(el("li", "", f)));
        s.appendChild(list);
        glance.appendChild(s);
    }
    if (glance.children.length) storyPanel.appendChild(glance);

    const story = project.story || [];
    if (story.length) {
        const nav = buildProcessNav(story);
        storyPanel.appendChild(nav);
        const steps = el("div", "story");
        story.forEach((step, i) => steps.appendChild(buildStep(step, i, project, byFile, preview)));
        storyPanel.appendChild(steps);
    }

    if (project.whatILearned) {
        const s = section("What I learned", "learned-title");
        s.classList.add("learned");
        project.whatILearned.split(/\n{2,}/).forEach(p => s.appendChild(el("p", "", p)));
        storyPanel.appendChild(s);
    }

    const panels = [{ id: "story", label: "Design story", node: storyPanel }];

    // Gallery tab: every image and clip in one place
    const items = collectGallery(project, preview);
    if (items.length) {
        const galleryPanel = el("div", "tab-panel");
        const title = el("h2", "visually-hidden", `${project.title} gallery`);
        galleryPanel.append(title, buildGallery(items, project, preview));
        panels.push({ id: "gallery", label: `Gallery (${items.length})`, node: galleryPanel });
    }

    if (panels.length > 1) root.appendChild(buildTabs(panels));
    panels.forEach(p => root.appendChild(p.node));
    if (panels.length === 1) panels[0].node.hidden = false;

    if (window.revealOnScroll) {
        window.revealOnScroll(storyPanel.querySelectorAll(".story-step, .glance .project-section, .learned"));
    }
    const nav = storyPanel.querySelector(".process-nav");
    if (nav) watchSteps(nav);
}

function renderNotFound(root, message) {
    document.title = "Project not found | Michael Chen";
    const box = el("div", "project-missing");
    box.appendChild(el("h1", "", "Project not found"));
    box.appendChild(el("p", "", message));
    const a = el("a", "button button-solid", "Back to all projects");
    a.href = "index.html#projects";
    box.appendChild(a);
    root.replaceChildren(box);
}

async function init() {
    document.getElementById("year").textContent = new Date().getFullYear();
    const root = document.getElementById("project-root");
    const id = new URLSearchParams(location.search).get("id");
    if (!id) {
        renderNotFound(root, "No project was selected.");
        return;
    }
    try {
        const res = await fetch(PROJECTS_URL);
        if (!res.ok) throw new Error(res.status);
        const project = (await res.json()).projects.find(p => p.id === id);
        if (project) renderProject(project, root);
        else renderNotFound(root, "There is no project with that name.");
    } catch (err) {
        renderNotFound(root, "Projects could not be loaded. If you opened this file directly, run a local server (see README).");
    }
}

init();
