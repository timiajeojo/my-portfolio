import Typed from "typed.js";

let typed: Typed | null = null;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* --------------------------------------------------
   Typed.js
--------------------------------------------------- */

function initTyped() {
  const element = document.querySelector("#typed-role");

  if (!element || prefersReducedMotion) return;

  if (typed) {
    typed.destroy();
  }

  typed = new Typed("#typed-role", {
    strings: [
      "Full Stack Developer",
      "Frontend Engineer",
      "Backend Developer",
      "UI Enthusiast"
    ],

    typeSpeed: 60,
    backSpeed: 35,
    backDelay: 1800,
    loop: true,
    smartBackspace: true,
    showCursor: true,
    cursorChar: "|"
  });
}

/* --------------------------------------------------
   Reveal Animation
--------------------------------------------------- */

function initReveal() {
  const items = document.querySelectorAll<HTMLElement>(".hero-item");

  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const delay =
          Number(entry.target.getAttribute("data-delay")) || 0;

        setTimeout(() => {
          entry.target.classList.add("show");
        }, delay);

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15
    }
  );

  items.forEach((item) => observer.observe(item));
}

/* --------------------------------------------------
   Mouse Glow
--------------------------------------------------- */

function initGlow() {
  const glow =
    document.getElementById("hero-glow");

  const hero =
    document.querySelector(".hero");

  if (!glow || !hero) return;

  let mouseX = 0;
  let mouseY = 0;

  let currentX = 0;
  let currentY = 0;

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();

    mouseX = event.clientX - rect.left;

    mouseY = event.clientY - rect.top;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.12;

    currentY += (mouseY - currentY) * 0.12;

    glow.style.transform =
      `translate(${currentX}px, ${currentY}px)`;

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------
   Floating Orbs
--------------------------------------------------- */

function initParallax() {

  const orb1 =
    document.querySelector<HTMLElement>(".hero-orb-1");

  const orb2 =
    document.querySelector<HTMLElement>(".hero-orb-2");

  if (!orb1 || !orb2) return;

  window.addEventListener("mousemove", (event) => {

    const x =
      (event.clientX / window.innerWidth - 0.5) * 40;

    const y =
      (event.clientY / window.innerHeight - 0.5) * 40;

    orb1.style.transform =
      `translate(${x}px, ${y}px)`;

    orb2.style.transform =
      `translate(${-x}px, ${-y}px)`;

  });

}
/* --------------------------------------------------
   Magnetic Buttons
--------------------------------------------------- */

function initMagneticButtons() {
  const buttons = document.querySelectorAll<HTMLElement>(".magnetic");

  if (!buttons.length || prefersReducedMotion) return;

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}

/* --------------------------------------------------
   Scroll Indicator
--------------------------------------------------- */

function initScrollIndicator() {
  const indicator =
    document.querySelector<HTMLElement>(".hero-scroll");

  if (!indicator) return;

  function update() {
    const opacity = Math.max(0, 1 - window.scrollY / 250);

    indicator.style.opacity = opacity.toString();

    indicator.style.transform =
      `translateX(-50%) translateY(${window.scrollY * 0.2}px)`;
  }

  update();

  window.addEventListener("scroll", update, {
    passive: true
  });
}

/* --------------------------------------------------
   Hero Initializer
--------------------------------------------------- */

function initHero() {
  initTyped();
  initReveal();
  initGlow();
  initParallax();
  initMagneticButtons();
  initScrollIndicator();
}

/* --------------------------------------------------
   Astro View Transitions Support
--------------------------------------------------- */

function start() {
  requestAnimationFrame(() => {
    initHero();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

document.addEventListener("astro:page-load", start);

/* --------------------------------------------------
   Hot Module Reload Cleanup (Development)
--------------------------------------------------- */

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    if (typed) {
      typed.destroy();
      typed = null;
    }
  });
}

export {};