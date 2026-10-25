const PROJECTS_URL = "data/projects.json";

const state = { projects: [], type: "", tag: "" };

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function buildCard(project, featured) {
    const card = el("article", featured ? "card featured-card" : "card");
    card.dataset.id = project.id;
    card.dataset.theme = project.theme;
    card.appendChild(el("span", "card-badge", project.type.replace("-", " ")));
    if (project.thumbnail) {
        const img = document.createElement("img");
        img.className = "card-thumb";
        img.src = project.thumbnail;
        img.alt = "";
        img.loading = "lazy";
        card.appendChild(img);
    }
    const heading = el("h3");
    const link = el("a", "card-link", project.title);
    link.href = `project.html?id=${encodeURIComponent(project.id)}`;
    heading.appendChild(link);
    card.appendChild(heading);
    const meta = [project.date, project.course].filter(Boolean).join(" · ");
    if (meta) card.appendChild(el("p", "card-meta", meta));
    card.appendChild(el("p", "card-summary", project.summary));
    const tags = el("ul", "tags");
    (project.tags || []).slice(0, 5).forEach(t => tags.appendChild(el("li", "", t)));
    card.appendChild(tags);
    return card;
}

function renderFeatured() {
    const grid = document.getElementById("featured-grid");
    grid.replaceChildren();
    state.projects.filter(p => p.featured).forEach(p => grid.appendChild(buildCard(p, true)));
    revealCards(grid);
}

function revealCards(container) {
    if (window.revealOnScroll) window.revealOnScroll(container.querySelectorAll(".card"));
}

function renderGrid() {
    const grid = document.getElementById("project-grid");
    grid.replaceChildren();
    const shown = state.projects.filter(p =>
        (!state.type || p.type === state.type) &&
        (!state.tag || (p.tags || []).includes(state.tag)));
    shown.forEach(p => grid.appendChild(buildCard(p, false)));
    revealCards(grid);
    document.getElementById("result-count").textContent =
        shown.length === 0 ? "No projects match these filters."
        : `Showing ${shown.length} of ${state.projects.length} projects`;
}

function renderFilters() {
    const types = [...new Set(state.projects.map(p => p.type))].sort();
    const wrap = document.getElementById("type-filters");
    wrap.replaceChildren();
    ["", ...types].forEach(type => {
        const chip = el("button", "chip", type ? type.replace("-", " ") : "All");
        chip.type = "button";
        chip.setAttribute("aria-pressed", String(state.type === type));
        chip.addEventListener("click", () => {
            state.type = type;
            renderFilters();
            renderGrid();
        });
        wrap.appendChild(chip);
    });

    const select = document.getElementById("tag-filter");
    const tags = [...new Set(state.projects.flatMap(p => p.tags || []))]
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    select.replaceChildren(new Option("All", ""));
    tags.forEach(t => select.appendChild(new Option(t, t)));
    select.value = state.tag;
}

async function init() {
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("tag-filter").addEventListener("change", e => {
        state.tag = e.target.value;
        renderGrid();
    });
    try {
        const res = await fetch(PROJECTS_URL);
        if (!res.ok) throw new Error(res.status);
        state.projects = (await res.json()).projects;
        renderFeatured();
        renderFilters();
        renderGrid();
    } catch (err) {
        const msg = "Projects could not be loaded. If you opened this file directly, run a local server (see README).";
        document.getElementById("featured-grid").replaceChildren(el("p", "status", msg));
    }
}

init();
