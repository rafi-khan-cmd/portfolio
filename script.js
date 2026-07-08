// ==========================================================================
// Portfolio interactions
// ==========================================================================

// --- Navbar background on scroll ---------------------------------------------
const navbar = document.getElementById("navbar");
const onScrollNav = () => {
    if (window.scrollY > 24) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
};
window.addEventListener("scroll", onScrollNav, { passive: true });
onScrollNav();

// --- Mobile menu toggle ------------------------------------------------------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

const closeMenu = () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
};

navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

// --- Smooth scroll with navbar offset ----------------------------------------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#" || targetId.length < 2) return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({ top: offset, behavior: "smooth" });
    });
});

// --- Mailto links ------------------------------------------------------------
document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        event.stopPropagation();
        const href = link.getAttribute("href");
        if (!href) return;
        window.location.href = href;
    });
});

// --- Scroll reveal animations ------------------------------------------------
const revealEls = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
);

// Stagger reveals that share a parent grid/timeline for a cascade effect.
const staggerGroups = document.querySelectorAll(
    ".projects-grid, .skills-grid, .timeline, .hero-inner, .hero-meta, .contact-socials"
);
staggerGroups.forEach((group) => {
    const items = group.querySelectorAll(":scope > [data-reveal]");
    items.forEach((item, i) => {
        item.style.transitionDelay = `${Math.min(i * 80, 400)}ms`;
    });
});

revealEls.forEach((el) => revealObserver.observe(el));

// --- Active nav link based on scroll position --------------------------------
const sections = document.querySelectorAll("section[id], header[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const setActiveLink = () => {
    const pos = window.scrollY + 120;
    let current = "";
    sections.forEach((section) => {
        if (pos >= section.offsetTop) {
            current = section.getAttribute("id");
        }
    });
    navAnchors.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
};
window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

// --- Footer year -------------------------------------------------------------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
