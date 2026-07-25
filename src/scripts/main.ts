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
   Reveal Animation
=========================================== */

function initReveal() {
  const elements = document.querySelectorAll<HTMLElement>(
  ".reveal, .hero-item"
);

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px",
    }
  );

  elements.forEach((element) => observer.observe(element));
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