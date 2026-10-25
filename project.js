const PROJECTS_URL = "data/projects.json";
const YT_ID_RE = /^[\w-]{11}$/;

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

// Accepts a bare 11-character ID or a youtube.com / youtu.be link.
function youtubeId(value) {
    if (!value) return null;
    if (YT_ID_RE.test(value)) return value;
    try {
        const url = new URL(value);
        if (url.hostname === "youtu.be") return url.pathname.slice(1).split("/")[0] || null;
        if (/(^|\.)youtube\.com$/.test(url.hostname)) {
            const id = url.searchParams.get("v") || url.pathname.split("/").pop();
            return YT_ID_RE.test(id) ? id : null;
        }
    } catch (e) { /* not a URL */ }
    return null;
}

// Only https links or local pages/ paths are allowed as hrefs.
function safeHref(value) {
    if (!value) return null;
    if (value.startsWith("pages/") || value.startsWith("https://")) return value;
    return null;
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
            src: item.src,
            alt: item.alt || `${project.title} screenshot ${i + 1}`,
            caption: item.caption || ""
        };
    }).filter(img => img.src);
}


// Showcase slots: planned highlights (screenshot, code snippet image, diagram, video).
// A slot with media is always shown; an empty slot only appears with ?preview=1 so
// the live site never shows unfinished boxes.
const SHOWCASE_KINDS = { screenshot: "Screenshot", code: "Code snippet", diagram: "Diagram", video: "Video" };

function renderShowcaseItem(item, project, preview) {
    const kind = SHOWCASE_KINDS[item.kind] ? item.kind : "screenshot";
    const vid = kind === "video" ? youtubeId(item.youtube) : null;
    const hasMedia = vid || (kind !== "video" && item.src);
    if (!hasMedia && !preview) return null;

    const fig = el("figure", `showcase-item showcase-${kind}`);
    if (vid) {
        const wrap = el("div", "video-frame");
        const frame = document.createElement("iframe");
        frame.src = `https://www.youtube-nocookie.com/embed/${vid}`;
        frame.title = item.title || `${project.title} video`;
        frame.loading = "lazy";
        frame.allow = "encrypted-media; picture-in-picture";
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        frame.allowFullscreen = true;
        wrap.appendChild(frame);
        fig.appendChild(wrap);
    } else if (hasMedia) {
        const pic = document.createElement("img");
        pic.src = item.src;
        pic.alt = item.alt || item.title || `${project.title} ${kind}`;
        pic.loading = "lazy";
        fig.appendChild(pic);
    } else {
        const box = el("div", "showcase-placeholder");
        box.appendChild(el("strong", "", `${SHOWCASE_KINDS[kind]} slot`));
        box.appendChild(el("span", "", item.brief || ""));
        if (item.file) box.appendChild(el("code", "", item.file));
        fig.appendChild(box);
    }
    const caption = item.caption || item.title;
    if (caption) fig.appendChild(el("figcaption", "", caption));
    return fig;
}

function renderProject(project, root) {
    root.replaceChildren();
    document.title = `${project.title} | Michael Chen`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = project.summary;
    if (project.theme) document.body.dataset.theme = project.theme;

    // Header: always shown
    const head = el("header", "project-head");
    head.appendChild(el("span", "card-badge", project.type.replace("-", " ")));
    head.appendChild(el("h1", "", project.title));
    const meta = [project.date, project.course].filter(Boolean).join(" · ");
    if (meta) head.appendChild(el("p", "card-meta", meta));
    root.appendChild(head);

    // Summary
    if (project.summary) root.appendChild(el("p", "project-summary", project.summary));

    // Tech tags
    if (project.tags && project.tags.length) {
        const s = section("Technology", "tech-title");
        const tags = el("ul", "tags");
        project.tags.forEach(t => tags.appendChild(el("li", "", t)));
        s.appendChild(tags);
        root.appendChild(s);
    }

    // Video
    const vid = youtubeId((project.links || {}).youtube);
    if (vid) {
        const s = section("Demo video", "video-title");
        const wrap = el("div", "video-frame");
        const frame = document.createElement("iframe");
        frame.src = `https://www.youtube-nocookie.com/embed/${vid}`;
        frame.title = `${project.title} demo video`;
        frame.loading = "lazy";
        frame.allow = "encrypted-media; picture-in-picture";
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        frame.allowFullscreen = true;
        wrap.appendChild(frame);
        s.appendChild(wrap);
        root.appendChild(s);
    }

    // Features
    if (project.features && project.features.length) {
        const s = section("Key features", "features-title");
        const list = el("ul", "feature-list");
        project.features.forEach(f => list.appendChild(el("li", "", f)));
        s.appendChild(list);
        root.appendChild(s);
    }

    // Highlights (showcase slots)
    const preview = new URLSearchParams(location.search).get("preview") === "1";
    const slots = (project.showcase || [])
        .map(item => renderShowcaseItem(item, project, preview))
        .filter(Boolean);
    if (slots.length) {
        const s = section("Highlights", "highlights-title");
        const grid = el("div", "showcase");
        slots.forEach(f => grid.appendChild(f));
        s.appendChild(grid);
        root.appendChild(s);
    }

    // Screenshots
    const images = normaliseImages(project);
    if (images.length) {
        const s = section("Screenshots", "shots-title");
        const gallery = el("div", "gallery");
        images.forEach(img => {
            const fig = el("figure", "gallery-item");
            const pic = document.createElement("img");
            pic.src = img.src;
            pic.alt = img.alt;
            pic.loading = "lazy";
            fig.appendChild(pic);
            if (img.caption) fig.appendChild(el("figcaption", "", img.caption));
            gallery.appendChild(fig);
        });
        s.appendChild(gallery);
        root.appendChild(s);
    }

    // What I learned
    if (project.whatILearned) {
        const s = section("What I learned", "learned-title");
        project.whatILearned.split(/\n{2,}/).forEach(p => s.appendChild(el("p", "", p)));
        root.appendChild(s);
    }

    // Links: write-up and live demo (source repositories are not linked from project pages)
    const writeup = safeHref((project.links || {}).writeup);
    const demo = safeHref((project.links || {}).demo);
    if (writeup || demo) {
        const s = section("Links", "links-title");
        const row = el("div", "hero-actions project-links");
        if (writeup) {
            const a = el("a", "button button-solid", "Read the write-up");
            a.href = writeup;
            row.appendChild(a);
        }
        if (demo) {
            const a = el("a", "button button-solid", "Try the demo");
            a.href = demo;
            a.rel = "noopener";
            row.appendChild(a);
        }
        s.appendChild(row);
        root.appendChild(s);
    }
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
