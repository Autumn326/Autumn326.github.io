// Scroll reveal. Adds .reveal to elements and .is-visible once they scroll into view.
// Does nothing for visitors who prefer reduced motion or lack IntersectionObserver,
// and the page works without this file (content is only hidden once JS adds .reveal).
(function () {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const STAGGER_MS = 80;
    const MAX_STEPS = 6;

    window.revealOnScroll = function (nodes) {
        if (reduce || !("IntersectionObserver" in window)) return;
        const observer = new IntersectionObserver(entries => {
            entries.filter(e => e.isIntersecting).forEach((entry, i) => {
                entry.target.style.setProperty("--reveal-delay", `${Math.min(i, MAX_STEPS) * STAGGER_MS}ms`);
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });
        nodes.forEach(node => {
            node.classList.add("reveal");
            observer.observe(node);
        });
    };
})();

// Mobile menu: a burger button toggles the link list (links stay visible without JS)
(function () {
    function initNav() {
        const nav = document.querySelector(".nav");
        const toggle = document.querySelector(".nav-toggle");
        if (!nav || !toggle) return;
        nav.classList.add("js-nav");
        toggle.hidden = false;
        const setOpen = open => {
            toggle.setAttribute("aria-expanded", String(open));
            nav.classList.toggle("menu-open", open);
        };
        toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
        nav.querySelector(".nav-links").addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && nav.classList.contains("menu-open")) {
                setOpen(false);
                toggle.focus();
            }
        });
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initNav);
    else initNav();
})();
