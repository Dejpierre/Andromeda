# SEO-FIXES.md

Correctifs apportés suite à l'audit Semrush du 05/10/2026 sur andromedaparis.com.

**Thème de travail :** `seo-fixes-2026-10-05` (#201853239631), unpublished, dupliqué depuis le thème live `Prod` (#199323648335). Rien n'a été touché sur le thème live.

**Adaptation au thème réel :** le brief était rédigé pour un thème Dawn classique (`sections/main-product.liquid`, boucle `{% case block.type %}`). Ce thème est un **Horizon personnalisé** avec un système de blocs natifs (`templates/product.json` + fichiers `blocks/*.liquid`), pas de `main-product.liquid`. Chaque tâche a été adaptée à cette architecture — détaillé ci-dessous tâche par tâche.

**Contrôle qualité :** `shopify theme check` lancé avant chaque commit. Baseline avant tout changement : 366 erreurs / 1427 avertissements (préexistants, sans rapport avec ce brief — essentiellement `AppBlockValidTags` sur les blocs d'apps tierces). Après les 7 tâches : 366 erreurs / 1426 avertissements. **Aucune nouvelle erreur introduite** (le avertissement en moins vient du nettoyage d'une variable morte, tâche 1).

---

## Tâche 1 — Liens internes cassés

**Commit :** `seo: corrige les liens internes cassés vers /pages/rituels`

**1a. `/pages/rituels`**
- `sections/header-group.json` : lien de la tuile promo du menu → `/products/bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus` (tuile actuellement désactivée dans les réglages, corrigé par précaution pour une réactivation future)
- `templates/index.json` : bouton de la section promo vidéo homepage → même produit
- `sections/section-qr-rituel.liquid` : la variable `cta_url` n'était en réalité **jamais utilisée** dans le rendu — supprimée plutôt que mise à jour vers une URL qui ne sert à rien
- **Menus de navigation** : vérifié via l'API (`main-menu`, `footer`, `menu-principal-copie`, `main-menu-test`) — aucun lien vers `/pages/rituels` dans aucun menu. Rien à signaler côté admin pour ce point.

**1b. Liens `/products/` avec handle vide**
- Audit de tous les rendus `product.url` du thème (hotspot produit, hero produit, upsell panier, encart article, grille produit, variant-grid-card) : **tous déjà protégés** par un `{% if ... != blank %}`. Aucune correction nécessaire — probablement déjà résolu par du travail antérieur sur ce thème.

---

## Tâche 2 — Données structurées Product

**Commit :** `seo: refactor les données structurées Product (offers par variante)`

- Nouveau `snippets/product-jsonld.liquid`, appelé une seule fois depuis `layout/theme.liquid` (`{% render 'product-jsonld' %}`)
- Remplace l'ancien bloc `AggregateOffer` unique (avec `shippingDetails`/`hasMerchantReturnPolicy` au niveau `Product`, non imbriqués) par un tableau `offers[]` — une `Offer` par variante, avec `shippingDetails` et `hasMerchantReturnPolicy` correctement imbriqués dans chaque offer, comme attendu par Google pour les rich results produit
- `aggregateRating` (Judge.me) conservé à l'identique
- **TODO laissé en commentaire dans le snippet** : les valeurs retour (30 jours, retour gratuit) sont reprises telles quelles de l'ancien bloc, **non vérifiées avec les CGV actuelles** — à confirmer par Pierre
- Vérifié qu'il n'y a **pas de second bloc Product** ailleurs dans le code (recherche exhaustive). Un bloc Judge.me injecté côté client (JS) n'est pas détectable depuis le code — à vérifier par Pierre en affichant le code source d'une fiche produit (chercher plusieurs `"@type": "Product"`)

**Testé** : JSON valide (`json.loads` en Python, équivalent à `JSON.parse`) sur les 3 fiches produit + une URL `?variant=`, un seul bloc Product par page.

---

## Tâche 3 — ALT manquants

**Commit :** `seo: ajoute les attributs alt manquants`

Audit des 40 fichiers `sections/`/`snippets/` contenant `<img>` ou `image_tag`. **8 emplacements réels** corrigés (le reste de la recherche automatique remontait des faux positifs : mentions dans des commentaires Liquid ou des blocs `@example` de documentation) :

| Fichier | Traitement |
|---|---|
| `sections/quick-order-list.liquid` | alt avec repli variante → produit |
| `sections/section-a-propos.liquid` | alt avec repli sur le titre de section |
| `snippets/variant-grid-card.liquid` | alt avec repli variante → produit |
| `snippets/link-featured-image.liquid` (×4) | alt sur le titre du lien de menu |
| `snippets/background-media.liquid` (×2) | `alt=""` explicite (fond décoratif) |
| `snippets/video.liquid` (×2) | `alt=""` explicite (miniature vidéo, le bouton "Lire la vidéo" porte déjà le libellé accessible) |

---

## Tâche 4 — Plusieurs H1 sur /pages/faq

**Commit :** `seo: corrige le double H1 sur /pages/faq`

- Cause : `sections/main-page.liquid` rend déjà un `<h1 class="visually-hidden">` par page (texte SEO dédié pour `faq`, `contact`, et un repli générique pour les autres pages) ; `sections/section-faq-page.liquid` rendait en plus son propre `<h1>` visible → doublon
- Niveau de titre rendu **configurable** dans le schema (`heading_tag`, options h1/h2/h3, **h2 par défaut**) plutôt que figé en dur
- `templates/page.faq.en.json` utilise la même section → corrigé automatiquement

**Testé** : un seul `<h1>` dans le HTML rendu de `/pages/faq`.

**Vérifié en bonus** : `/pages/contact` n'a pas le même problème (son `main-page` rend aussi un H1 masqué, mais sa section "form" n'a pas de H1 visible en plus).

---

## Tâche 5 — Noindex sur /collections/frontpage

**Aucune modification de code.**

Cette collection n'existe plus sous le handle `frontpage` : elle a été renommée `masque-de-sommeil-soie` lors d'un travail SEO antérieur sur ce même thème, avec redirection automatique. `/collections/frontpage` renvoie désormais un **301** vers `/collections/masque-de-sommeil-soie** (vérifié par requête HTTP) — c'est une meilleure solution qu'un noindex, puisque le 301 transmet le référencement de l'ancienne URL à la nouvelle au lieu de simplement la désindexer. La finding Semrush est probablement antérieure à ce renommage.

---

## Tâche 6 — H1 de la home

**Commit :** `seo: ajoute un H1 avec mot-clé cible sur la home, sans changer le design`

- La home avait déjà un `<h1>` visible, mais c'était un **texte promotionnel temporaire** ("Le bandeau de sommeil Dolce Vita est disponible dès maintenant"), sans le mot-clé cible — ce n'était pas le cas "hero sans titre" prévu par le brief
- Ajouter un second H1 masqué (comme suggéré littéralement dans le brief) aurait recréé le problème de double H1 de la tâche 4. À la place : le texte promo existant est repassé en `<p>` (classes/style conservés à l'identique, **aucun changement visuel**), et un `<h1 class="visually-hidden">` dédié est ajouté avec le texte suggéré par le brief (équivalent anglais pour la version EN du site)

**Testé** : un seul `<h1>` sur `/`, contenant "masque de sommeil en soie" ; rendu visuel identique à l'avant.

---

## Tâche 7 — Bloc "Guides" (maillage interne)

**Commit :** `seo: ajoute un bloc "Guides liés" pour le maillage interne produit→article`

- Nouveau `blocks/andromeda-product-guides.liquid` (adapté au système de blocs Horizon) : jusqu'à 3 réglages `article`, libellé configurable, rendu en liste de liens simple
- Inséré sur les 3 fiches produit (masque, bandeau, chouchou), juste avant la bannière "Espace rituel"
- Configuré avec l'article **"Soie 19 vs 22 mommes : quel grammage choisir ?"** (déjà publié) comme premier lien

**Non fait, volontairement :** l'article "Meilleur masque de sommeil en soie" (handle `meilleur-masque-de-sommeil-en-soie`) est **en brouillon** — je ne l'ai pas lié pour ne pas recréer un lien cassé. À ajouter dans `article_2` une fois publié (depuis l'éditeur de thème, ou je peux le faire dès que c'est publié).

**Détail technique noté pour référence future** : le réglage de type `article` attend le handle **qualifié par le blog** (`actualites/soie-19-vs-22-mommes-guide`), pas le handle seul — Shopify rejette le handle seul au push.

---

## Hors code — à faire par Pierre dans l'admin

(Repris du brief, inchangé — rien de ceci n'a été touché par ce travail)

- Contenu → Menus → Redirections d'URL : déjà couvert automatiquement pour `/collections/frontpage` (redirection créée par le renommage de handle antérieur). Pas d'action nécessaire pour `/pages/rituels` : vérifié, aucun menu n'y renvoie.
- Créer une collection automatique avec le handle `all` (condition prix > 0) et renseigner son titre SEO et sa meta description.
- Titre SEO de `/pages/contact` : `Contact | Andromeda Paris – Masques de sommeil en soie de mûrier`.
- Préférences de la boutique → titre de la home : `Andromeda Paris – Masques de sommeil en soie de mûrier 22 mommes`.
- Texte alternatif des médias produit (fichiers images eux-mêmes dans la bibliothèque Shopify, distinct des correctifs de code de la tâche 3).
- Translate & Adapt : traduire l'article `soie-19-vs-22-mommes-guide` en EN, ou désactiver l'anglais pour le blog.
- **Publier l'article "Meilleur masque de sommeil en soie"**, puis l'ajouter dans `article_2` du bloc "Guides liés" sur les 3 fiches produit.
- Confirmer les valeurs retour (30 jours / retour gratuit) utilisées dans les données structurées Product — voir TODO dans `snippets/product-jsonld.liquid`.
- Vérifier en affichant le code source d'une fiche produit qu'un plugin d'avis (Judge.me) n'injecte pas un second bloc JSON-LD `Product` côté client.

---

## URLs à tester par Pierre avant publication

Sur le thème `seo-fixes-2026-10-05` (prévisualisable via `?preview_theme_id=201853239631`) :

- `/` (home)
- `/products/masque-de-sommeil-en-soie-de-murier-22-mommes`
- `/products/bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus`
- `/products/chouchou-pour-cheveux-en-soie-de-murier-22-mommes`
- `/products/masque-de-sommeil-en-soie-de-murier-22-mommes?variant=0` (une URL variant)
- `/pages/faq`
- `/collections/frontpage` (doit rediriger en 301)
- un article du blog `/blogs/actualites/...`
