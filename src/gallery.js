/* Injection des galeries Work — images d'illustration, à remplacer
   par les réalisations réelles de Reflet Studios. */
import { GALLERY, GALLERY_ALT } from "./images.js";

const TITLES = {
  portraits: ["Portrait studio", "Portrait éditorial", "Portrait corporate", "Portrait lifestyle", "Portrait artiste", "Portrait express"],
  events: ["Gala & cérémonie", "Conférence", "Lancement de marque", "Concert", "Soirée privée", "Événement corporate"],
  weddings: ["Cérémonie civile", "Traditionnel", "Couple", "Préparatifs", "Réception", "Détails"],
  brands: ["Produit", "Lifestyle", "Food & beverage", "Mode", "Institution", "Campagne"],
};

const PHRASES = {
  portraits: ["Abomey-Calavi", "Cotonou", "Godomey", "Studio", "Sur site", "Express"],
  events: ["District 9103", "Cotonou", "Abomey-Calavi", "Porto-Novo", "Corporate", "Live"],
  weddings: ["Bénin", "Cotonou", "Abomey-Calavi", "Cérémonie", "Réception", "Intime"],
  brands: ["Bio Drunks", "Retail", "Local", "Éditorial", "Campagne", "Digital"],
};

Object.keys(GALLERY).forEach((key) => {
  const grid = document.getElementById(`grid-${key}`);
  if (!grid) return;
  GALLERY[key].forEach((src, i) => {
    const a = document.createElement("a");
    a.className = "gallery__item";
    a.href = "javascript:void(0)";
    a.setAttribute("data-cursor", "View");
    a.setAttribute("role", "button");
    a.setAttribute("aria-label", `Agrandir : ${TITLES[key][i]}`);
    const alt = GALLERY_ALT[key][i] || `${TITLES[key][i]} — image d'illustration`;
    a.innerHTML = `
      <img class="gallery__item-img" src="${src}" alt="${alt}" loading="lazy" decoding="async" />
      <div class="gallery__item-meta">
        <p class="label" style="color: var(--bronze)">${TITLES[key][i]}</p>
        <p class="label" style="margin-top: 0.45rem">${PHRASES[key][i]}</p>
      </div>
    `;
    grid.appendChild(a);
  });
});
