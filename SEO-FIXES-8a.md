# SEO-FIXES-8a — Article « Idée cadeau femme enceinte »

## État : brouillon créé, publication bloquée par les images manquantes

## Tâche 1 — Article créé ✅

- Blog `actualites`, handle `idee-cadeau-femme-enceinte`, statut **brouillon** (`isPublished: false`).
- ID admin : `gid://shopify/Article/1004503007567`.
- Titre (H1) : « Idée cadeau femme enceinte : 9 cadeaux douceur pour Noël et au-delà ».
- Title SEO et meta description écrits dans les metafields `global.title_tag` / `global.description_tag`.
- Corps intégré depuis le fichier HTML final fourni par Pierre (liens absolus conservés tels quels, aucun texte réécrit).

**Pour prévisualiser** : Admin Shopify → Contenu → Articles de blog → « Idée cadeau femme enceinte... » → bouton Aperçu. Je n'ai pas de lien de prévisualisation direct à donner (pas de champ API pour ça sur un brouillon) ; l'URL publique une fois publié sera `https://www.andromedaparis.com/blogs/actualites/idee-cadeau-femme-enceinte`.

## Tâche 2 — Images ❌ bloquant

Aucune des 2 images n'est disponible :
- `idee-cadeau-femme-enceinte.jpg` (image à la une)
- `coffret-future-maman.jpg` (dans le corps, après le H2 « Composer un coffret future maman soi-même »)

Vérifié dans `seo/images-articles/` (dossier inexistant) et dans Shopify → Contenu → Fichiers (aucun résultat via l'API). **Comme demandé, l'article reste en brouillon tant qu'elles ne sont pas fournies.**

Dès que Pierre les dépose (dans l'un ou l'autre emplacement), je :
1. Définis l'image à la une de l'article.
2. Insère `<img>` avec l'ALT fourni, juste après le H2 « Composer un coffret future maman soi-même ».

## Tâche 3 — Maillage interne : non fait (volontairement)

À faire uniquement une fois l'article publié par Pierre — sinon le lien ajouté dans `guide-cadeaux-sommeil-premium` pointerait vers une page inexistante (404).

## Tâche 4 — Référentiel ✅

`/blogs/actualites/idee-cadeau-femme-enceinte` ajouté à `seo/keyword-map.json` avec `primary: "idée cadeau femme enceinte"`. Aucune autre page du site ne porte ce mot-clé en tête de title ou en H1 — l'article le plus proche (`guide-cadeaux-sommeil-premium`, mot-clé « idée cadeau noël femme ») cible une audience différente (cadeaux femmes en général vs. femme enceinte spécifiquement).

## Tâche 5 — Vérification après publication : en attente

À faire une fois l'article publié et les liens ajoutés : vérifier en ligne `<title>`, `<h1>`, meta description, affichage + ALT des 2 images, et tous les liens internes sur les deux pages concernées.

## Ce qu'il faut de Pierre pour avancer

1. Les 2 images (`idee-cadeau-femme-enceinte.jpg`, `coffret-future-maman.jpg`), déposées dans `seo/images-articles/` ou directement dans Shopify → Contenu → Fichiers.
2. Une fois les images reçues et insérées : ton feu vert pour publier (ou tu publies toi-même depuis l'admin, à toi de voir).
3. Après publication : je termine le maillage interne (tâche 3) et la vérification finale (tâche 5).

Échéance rappelée : en ligne avant le 5 novembre — large marge si les images arrivent dans les prochains jours.
