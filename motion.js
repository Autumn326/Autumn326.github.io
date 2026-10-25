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
