import Typed from "typed.js";

let typed: Typed | null = null;

/* ===========================================
   Typewriter
=========================================== */

function initTyped() {
  const element = document.querySelector("#typed-role");

  if (!element) return;

  if (typed) {
    typed.destroy();
  }

  typed = new Typed("#typed-role", {
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
  const elements = document.querySelectorAll<HTMLElement>(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
  );

  if (!elements.length) return;

  // Stagger elements that belong to the same parent
  elements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 80}ms`;
  });

  const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -120px 0px",
    threshold: 0.05,
  }
);

  elements.forEach((element) => observer.observe(element));
}

/* ===========================================
   Skill Card Stagger
=========================================== */

function initSkillCards() {
  const cards =
    document.querySelectorAll<HTMLElement>(".skill-card");

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 80}ms`;
  });
}

/* ===========================================
   Scroll Indicator
=========================================== */

function initScrollIndicator() {
  const indicator =
    document.querySelector<HTMLElement>(".hero-scroll");

  if (!indicator) return;

  const update = () => {
    const opacity = Math.max(0, 1 - window.scrollY / 250);

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
  import.meta.hot.dispose(() => {
    if (typed) {
      typed.destroy();
      typed = null;
    }
  });
}

export {};