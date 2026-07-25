"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typed_js_1 = require("typed.js");
var typed = null;
/* ===========================================
   Typewriter
=========================================== */
function initTyped() {
    var element = document.querySelector("#typed-role");
    if (!element)
        return;
    if (typed) {
        typed.destroy();
    }
    typed = new typed_js_1.default("#typed-role", {
        strings: [
            "Full Stack Developer",
            "Frontend Developer",
            "Backend Developer",
            "Problem Solver",
        ],
        typeSpeed: 60,
        backSpeed: 35,
        backDelay: 1800,
        smartBackspace: true,
        loop: true,
        showCursor: true,
        cursorChar: "|",
    });
}
/* ===========================================
   Scroll Reveal Animations
=========================================== */
function initReveal() {
    var elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    if (!elements.length)
        return;
    // Stagger elements that belong to the same parent
    elements.forEach(function (element, index) {
        element.style.transitionDelay = "".concat(index * 80, "ms");
    });
    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting)
                return;
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -80px 0px",
    });
    elements.forEach(function (element) { return observer.observe(element); });
}
/* ===========================================
   Skill Card Stagger
=========================================== */
function initSkillCards() {
    var cards = document.querySelectorAll(".skill-card");
    cards.forEach(function (card, index) {
        card.style.transitionDelay = "".concat(index * 80, "ms");
    });
}
/* ===========================================
   Scroll Indicator
=========================================== */
function initScrollIndicator() {
    var indicator = document.querySelector(".hero-scroll");
    if (!indicator)
        return;
    var update = function () {
        var opacity = Math.max(0, 1 - window.scrollY / 250);
        indicator.style.opacity = opacity.toString();
    };
    update();
    window.addEventListener("scroll", update, {
        passive: true,
    });
}
/* ===========================================
   Initialize
=========================================== */
function init() {
    initHeroEntrance();
    initTyped();
    initReveal();
    initSkillCards();
    initScrollIndicator();
}
document.addEventListener("DOMContentLoaded", init);
// Re-run after Astro view transitions
document.addEventListener("astro:page-load", init);
/* ===========================================
   Cleanup
=========================================== */
if (import.meta.hot) {
    import.meta.hot.dispose(function () {
        if (typed) {
            typed.destroy();
            typed = null;
        }
    });
}
