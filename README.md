# Reflet Studios — Concept digital (version de démonstration)

> **Concept digital conçu pour Reflet Studios — Version de démonstration.**
> Site statique 100 % HTML / CSS / JavaScript natif — aucune dépendance npm, aucun build, aucun backend.

---

## 1. Nature du projet

| | |
|---|---|
| **Type** | Démo / concept — pas un site officiel |
| **Stack** | HTML5 + CSS3 + JavaScript (ES Modules) natif |
| **Build requis** | Non |
| **Dépendances npm** | Aucune |
| **Backend / CMS / Base de données** | Aucun |
| **Direction artistique** | « L'image qui se révèle » — noir profond, ivoire, bronze discret |

---

## 2. Ouvrir le site en local

Le site utilise des **ES Modules**, qui nécessitent d'être servis via `http://`
(pas d'ouverture directe par double-clic en `file://`).

**Option A — Python (le plus simple) :**

```bash
cd reflet-studios-site
python -m http.server 8080
# puis ouvrir http://localhost:8080
```

**Option B — Node.js :**

```bash
npx serve .
```

**Option C — VS Code :** installer l'extension « Live Server »,
clic droit sur `index.html` → *Open with Live Server*.

---

## 3. Déploiement sur Vercel

1. Poussez le dossier sur un dépôt GitHub / GitLab / Bitbucket.
2. Sur [vercel.com](https://vercel.com) : **Add New… → Project** → importez le dépôt.
3. Réglez la configuration ainsi :

| Réglage | Valeur |
|---|---|
| **Framework Preset** | `Other` |
| **Root Directory** | `./` (ou le sous-dossier `reflet-studios-site/` si le dépôt contient aussi autre chose) |
| **Build Command** | *(vide)* |
| **Output Directory** | *(vide)* |
| **Install Command** | *(vide)* |

4. Cliquez **Deploy**. Le site est en ligne sans build.

Une fois le domaine définitif connu, remplacer `https://reflet-studios-concept.vercel.app`
par la nouvelle URL dans :
- `sitemap.xml`
- `robots.txt`
- les `<link rel="canonical">` et balises `og:url` de chaque page.

---

## 4. Structure du projet

```
reflet-studios-site/
├── index.html          # Accueil
├── work.html           # Portfolio (galeries + lightbox)
├── services.html       # Prestations
├── about.html          # À propos
├── contact.html        # Contact + formulaire démo
├── favicon.svg         # Monogramme « R »
├── robots.txt          # Indexation
├── sitemap.xml         # Plan du site
├── README.md           # Ce fichier
└── src/
    ├── style.css       # Design system + animations
    ├── main.js         # Interactions (révélations, lightbox, formulaire…)
    ├── images.js       # ⚠️ Images d'illustration — à remplacer
    └── gallery.js      # Injection des galeries
```

---

## 5. Contenus à remplacer avant mise en ligne officielle

⚠️ **Le site est une démonstration.** Les éléments suivants doivent être validés
et remplacés avec Reflet Studios :

1. **Photographies** — toutes les images actuelles sont des **images d'illustration**
   (Unsplash). Elles doivent être remplacées dans `src/images.js` par les
   **vraies réalisations du studio**. C'est l'étape la plus importante pour la
   crédibilité du site.

2. **Formulaire de contact** — actuellement en mode démonstration : aucune donnée
   n'est envoyée. Il faut connecter un service d'envoi (Formspree, Getform,
   fonction serverless Vercel, ou redirection WhatsApp) avant la mise en ligne.

3. **Coordonnées** — à valider avec le studio :
   - WhatsApp / téléphone : `+229 91 46 03 03`
   - E-mail : `refletcorporation@gmail.com`
   - Zone d'intervention : Abomey-Calavi, Cotonou, Godomey, Porto-Novo
   - Horaires affichés : Lun–Mer & Ven 09:00–18:00 · Jeu fermé · Sam 10:00–15:00

4. **Réseaux sociaux** — les liens Facebook / Instagram / TikTok sont actuellement
   **neutralisés** (« à venir ») car non vérifiés à ce stade. Les remplacer par
   les vrais comptes une fois confirmés.

5. **Textes de la page À propos** — l'histoire du studio est rédigée de façon
   générique. À personnaliser avec la **vraie histoire** de Reflet Studios.

6. **Portfolio** — les galeries sont des placeholders. Remplacer par les
   catégories et les images réelles du studio, avec leurs descriptions.

7. **Aucun tarif n'est affiché** — à définir avec le studio (politique de prix,
   fourchettes, devis sur demande).

---

## 6. Accessibilité & performance

- `lang="fr"` sur chaque page.
- Titres et meta descriptions uniques par page.
- Navigation clavier fonctionnelle (liens, boutons, lightbox avec Échap / ← / →).
- `aria-label` sur les icônes et boutons icon-only.
- Contraste élevé sur fond sombre (texte ivoire sur noir profond).
- `prefers-reduced-motion: reduce` respecté : animations désactivées.
- Images en `loading="lazy"` hors premier écran.
- Palette respectée : Obsidian `#101010` · Warm black `#181716` · Ivory `#F1EEE8` ·
  Soft grey `#A7A39C` · Silver `#C7C5BE` · Bronze `#A98A68`.

---

## 7. Points à valider avec Reflet Studios

- [ ] Vraies photographies du portfolio
- [ ] Histoire et présentation de l'équipe
- [ ] Coordonnées définitives (téléphone, e-mail, adresse siège)
- [ ] Comptes de réseaux sociaux officiels
- [ ] Horaires réels
- [ ] Politique tarifaire (affichage ou devis sur demande)
- [ ] Liste des services et prestations exacts
- [ ] Client / études de cas que le studio souhaite mettre en avant
- [ ] Domaine de production et URL canonique finale

---

*Concept digital conçu pour Reflet Studios — Version de démonstration.*
