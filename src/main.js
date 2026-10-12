/* ============================================================
   REFLET STUDIOS — interactions & animations
   "L'image qui se révèle" — vanilla JS (Web Animations / IntersectionObserver)
   Respecte prefers-reduced-motion.
   ============================================================ */

import { applyImages } from "./images.js";

/* Sécurité : ne JAMAIS laisser les animations masquer le contenu. */
function forceVisible() {
  document.querySelectorAll(".reveal, .hero__label, .hero__title-word, .hero__title-sub, .hero__tagline, .hero__actions, .hero__scroll").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
  const refl = document.querySelector(".hero__title-reflection");
  if (refl) refl.style.opacity = "0.14";
  document.querySelectorAll(".hero__img, .p-card__media, .process__img, .gallery__item-img, .case__media, .service__media, .about-story__media").forEach((el) => {
    el.style.clipPath = "none";
    el.style.opacity = "1";
    el.style.transform = el.classList.contains("hero__img") ? "scale(1.08)" : "";
  });
}

applyImages();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => setTimeout(forceVisible, 2500));
} else {
  setTimeout(forceVisible, 2500);
}

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_INOUT = "cubic-bezier(0.65, 0, 0.35, 1)";

/* ---------- Navigation ---------- */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
});

const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    })
  );
}

/* ---------- Curseur lumière ---------- */
const cursor = document.querySelector(".light-cursor");
if (cursor && !prefersReduced && window.matchMedia("(pointer: fine)").matches) {
  let targetX = innerWidth / 2,
    targetY = innerHeight / 2,
    x = targetX,
    y = targetY;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  const tick = () => {
    x += (targetX - x) * 0.09;
    y += (targetY - y) * 0.09;
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  tick();

  document.querySelectorAll("[data-cursor]").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
  });
}

/* ---------- Hero : rideau de lumière + révélation ---------- */
function heroIntro() {
  const word = document.querySelector(".hero__title-word");
  const reflection = document.querySelector(".hero__title-reflection");
  const img = document.querySelector(".hero__img");
  const sweep = document.querySelector(".hero__sweep");

  if (img) {
    img.animate(
      [
        { transform: "scale(1.22)", opacity: 0 },
        { transform: "scale(1.08)", opacity: 1 },
      ],
      { duration: 2200, easing: "ease-out", fill: "both" }
    );
  }

  if (sweep) {
    sweep.animate(
      [{ transform: "translateX(-110%)" }, { transform: "translateX(110%)" }],
      { duration: 1700, delay: 350, easing: EASE_INOUT, fill: "both" }
    );
  }

  const seq = [
    [".hero__label", 750],
    [".hero__title-sub", 1250],
    [".hero__tagline", 1450],
    [".hero__actions", 1600],
    [".hero__scroll", 1900],
  ];
  seq.forEach(([sel, delay]) => {
    const el = document.querySelector(sel);
    if (el) {
      el.animate(
        [
          { opacity: 0, transform: "translateY(22px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 1000, delay, easing: EASE_OUT, fill: "both" }
      );
    }
  });

  if (word) {
    word.animate(
      [
        { opacity: 0, transform: "translateY(110%)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 1300, delay: 850, easing: EASE_OUT, fill: "both" }
    );
  }

  if (reflection) {
    reflection.animate([{ opacity: 0 }, { opacity: 0.14 }], {
      duration: 1600,
      delay: 1100,
      easing: "ease-out",
      fill: "both",
    });
  }

  const scrollLine = document.querySelector(".hero__scroll-line");
  if (scrollLine && !prefersReduced) {
    scrollLine.animate(
      [{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }],
      {
        duration: 1400,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out",
      }
    );
  }
}

if (prefersReduced) {
  forceVisible();
} else {
  heroIntro();
}

/* ---------- Parallaxe hero au scroll ---------- */
const heroImg = document.querySelector(".hero__img");
if (heroImg && !prefersReduced) {
  window.addEventListener(
    "scroll",
    () => {
      const y = Math.min(window.scrollY, window.innerHeight);
      heroImg.style.transform = `scale(1.08) translateY(${y * 0.12}px)`;
    },
    { passive: true }
  );
}

/* ---------- Révélations au scroll ---------- */
if (!prefersReduced) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { opacity: 0, transform: "translateY(32px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 1100, easing: EASE_OUT, fill: "forwards" }
          );
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  setTimeout(forceVisible, 2500);
  window.addEventListener("load", () => setTimeout(forceVisible, 1500));

  /* ---------- Rideau de lumière sur les médias ---------- */
  const revealMedia = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }],
            { duration: 1300, easing: EASE_INOUT, fill: "both" }
          );
          revealMedia.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document
    .querySelectorAll(".p-card__media, .process__img, .gallery__item-img, .case__media, .service__media, .about-story__media")
    .forEach((el) => revealMedia.observe(el));
}

/* ---------- Barre de lumière process ---------- */
const lightbar = document.getElementById("lightbar");
if (lightbar && !prefersReduced) {
  window.addEventListener(
    "scroll",
    () => {
      const rect = lightbar.parentElement.getBoundingClientRect();
      const progress = 1 - rect.top / window.innerHeight;
      if (progress > -0.2 && progress < 1.4) {
        lightbar.style.transform = `translateX(${-110 + progress * 220}%)`;
      }
    },
    { passive: true }
  );
}

/* ---------- Lightbox (galerie) : clavier + navigation ---------- */
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-label", "Aperçu de l'image");
lightbox.innerHTML = `
  <button class="lightbox__close" aria-label="Fermer l'aperçu">&times;</button>
  <button class="lightbox__prev" aria-label="Image précédente">&#8592;</button>
  <img src="" alt="Aperçu de l'image sélectionnée" />
  <button class="lightbox__next" aria-label="Image suivante">&#8594;</button>
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");
const btnClose = lightbox.querySelector(".lightbox__close");
const btnPrev = lightbox.querySelector(".lightbox__prev");
const btnNext = lightbox.querySelector(".lightbox__next");

let currentGallery = [];
let currentIndex = 0;

function renderLightbox() {
  if (!currentGallery.length) return;
  const item = currentGallery[currentIndex];
  const img = item.querySelector(".gallery__item-img");
  if (!img) return;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || "Aperçu de l'image sélectionnée";
}

function openLightbox(items, index) {
  currentGallery = items;
  currentIndex = index;
  renderLightbox();
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
  btnClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

function prevImage() {
  if (!currentGallery.length) return;
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  renderLightbox();
}

function nextImage() {
  if (!currentGallery.length) return;
  currentIndex = (currentIndex + 1) % currentGallery.length;
  renderLightbox();
}

document.addEventListener("click", (e) => {
  const item = e.target.closest(".gallery__item");
  if (item) {
    e.preventDefault();
    const items = Array.from(item.parentElement.querySelectorAll(".gallery__item"));
    const index = items.indexOf(item);
    openLightbox(items, index);
    return;
  }
  if (e.target === lightbox || e.target.closest(".lightbox__close")) {
    closeLightbox();
    return;
  }
  if (e.target.closest(".lightbox__prev")) {
    prevImage();
    return;
  }
  if (e.target.closest(".lightbox__next")) {
    nextImage();
  }
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowLeft") {
    prevImage();
  } else if (e.key === "ArrowRight") {
    nextImage();
  }
});

/* ---------- Formulaire (démonstration) ---------- */
const form = document.querySelector(".form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(".form__submit");
    const note = form.querySelector(".form__success");
    if (note) {
      note.hidden = false;
      note.textContent =
        "Merci. Dans la version finale, votre demande sera envoyée directement à Reflet Studios.";
    }
    btn.textContent = "Demande enregistrée (démo)";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Start a conversation";
      btn.disabled = false;
      form.reset();
      if (note) note.hidden = true;
    }, 5000);
  });
}
