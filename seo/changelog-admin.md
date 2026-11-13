# Changelog admin — Brief n°6

Chaque champ modifié via l'Admin API GraphQL, avant / après. Aucun handle, prix, variante, stock, image ni statut de publication modifié.

| Ressource | Champ | Avant | Après | Date |
|---|---|---|---|---|
| Produit `masque-de-sommeil-en-soie-de-murier-22-mommes` | `seo.title` | `Masque de nuit en soie de mûrier 22 mommes \| Andromeda Paris` | `Masque de sommeil en soie de mûrier 22 mommes 6A \| Andromeda Paris` | 2026-10-14 |
| Produit `masque-de-sommeil-en-soie-de-murier-22-mommes` | `descriptionHtml` (1 phrase) | `<strong>masque de nuit en soie de mûrier</strong>` | `<strong>masque de sommeil en soie de mûrier</strong>` | 2026-10-14 |
| Collection `masque-de-sommeil-soie` | `seo.title` | *(vide)* | `Masques de nuit en soie de mûrier \| Andromeda Paris` | 2026-10-14 |
| Collection `masque-de-sommeil-soie` | `seo.description` | *(vide)* | `Nos masques de nuit en soie de mûrier 22 mommes : occultation totale, douceur pour la peau et les cheveux, rituel de sommeil inclus.` | 2026-10-14 |
| Article `masque-contour-yeux-versus-integral` | `title` (= H1) | `Masque contour yeux versus intégral : le bon choix` | `Masque de sommeil contour des yeux ou intégral : comment choisir` | 2026-10-14 |
| Article `masque-contour-yeux-versus-integral` | metafield `global.title_tag` | `Masque contour yeux versus intégral : le bon choix` | `Masque de sommeil contour des yeux ou intégral : comment choisir — Andromeda` | 2026-10-14 |
| Article `masque-de-sommeil-en-soie-pour-avion` | `title` (= H1) | `Masque de sommeil en soie pour avion` | `Voyager serein : bien choisir son masque pour dormir en avion` | 2026-10-14 |
| Article `masque-de-sommeil-en-soie-pour-avion` | metafield `global.title_tag` | `Masque de sommeil en soie pour avion` | `Voyager serein : bien choisir son masque pour dormir en avion — Andromeda` | 2026-10-14 |
| Article `masque-de-sommeil-en-soie-pour-avion` | `body` (1re occurrence du texte uniquement) | `Un masque de sommeil en soie pour avion change...` (non lié) | `Un <a href="/products/masque-de-sommeil-en-soie-de-murier-22-mommes">masque de sommeil en soie</a> pour avion change...` | 2026-10-14 |

Toutes les mutations ont renvoyé `userErrors: []`.

## Découverte en cours de route : le produit masque a aussi nécessité un correctif de code

Après la mutation sur `product.seo.title`, le `<title>` live n'a pas bougé : `snippets/meta-tags.liquid` code en dur le titre SEO de ce produit (même pattern que les fiches bandeau/chouchou depuis le brief n°4), ce qui ignore complètement le champ natif. Corrigé dans le même fichier (`Masque de nuit...` → `Masque de sommeil...`, ligne du bloc `if product.handle == 'masque-de-sommeil-en-soie-de-murier-22-mommes'`). Ce changement de code suit le même sort que `templates/page.json` du brief n°5 : **pas encore déployé**, le push a été bloqué (voir `SEO-FIXES-6.md`).

## Ce qui n'a pas été modifié (Tâche 5 — décision éditoriale de Pierre)

Les 4 brouillons et leurs redirections n'ont subi aucune modification, suppression ni publication. État constaté (inchangé) :

| Brouillon | Redirection actuelle (id Shopify) |
|---|---|
| `meilleur-masque-de-sommeil-en-soie` | → `/blogs/actualites/comment-choisir-son-masque-de-sommeil` (`gid://shopify/UrlRedirect/1788780020047`) |
| `masque-de-nuit-7-benefices-prouves-sommeil-profond` | → `/blogs/actualites/lumiere-et-melatonine-sommeil` (`gid://shopify/UrlRedirect/1788780544335`) |
| `reduire-frottements-nocturnes-visage` | → `/blogs/actualites/decouvrez-les-bienfaits-de-la-soie-pour-votre-peau` (`gid://shopify/UrlRedirect/1788780347727`) |
| `comment-entretenir-un-masque-de-sommeil-en-soie` | aucune (404 pur) |

**Contexte découvert en vérifiant ces IDs** : ces 3 redirections font partie d'un ensemble beaucoup plus large (~30 redirections au total) qui consolide systématiquement des dizaines de variantes d'URLs vers un petit nombre d'articles canoniques (ex. 7 variantes différentes redirigent toutes vers `comment-choisir-son-masque-de-sommeil`, 5 vers `lumiere-et-melatonine-sommeil`, etc.). Ce n'est donc probablement pas un oubli isolé mais une stratégie de consolidation SEO délibérée — à confirmer par Pierre, mais cela penche plutôt vers « laisser en l'état » que vers « publier ces brouillons ».

Commandes prêtes à valider, voir `SEO-FIXES-6.md` § Tâche 5.

## Suivi hors-brief — fiche bandeau (demandes directes de Pierre, 2026-10-14)

| Ressource | Champ | Avant | Après |
|---|---|---|---|
| Produit `bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus` | `descriptionHtml` | 4 sections (`<h2>`) : Pourquoi / Soie / Rituel inclus / Entretien | 2 sections (`<h4>`, 24px — même style que l'accordéon) : Pourquoi / Soie. Rituel et Entretien retirés car déjà couverts par la FAQ du bas de page ("C'est quoi le QR code inclus dans ma commande ?" / "Comment laver mon bandeau Andromeda ?") |

Fichier de thème touché : `templates/product.bandeau-de-sommeil.json` (sous-titres de l'accordéon Description passés de h3 à h4, voir commit `143e1b7`).

## Brief n°7 — page qui-sommes-nous, articles soie/satin et chouchou (2026-10-15)

| Ressource | Champ | Avant | Après |
|---|---|---|---|
| Article `mulberry-silk-vs-satin-sleep-mask` | `title` (= H1) | `Mulberry silk vs satin sleep mask : le vrai choix` | `Soie ou satin : quelle différence pour un masque de sommeil ?` |
| Article `mulberry-silk-vs-satin-sleep-mask` | metafield `global.title_tag` | `Mulberry silk vs satin sleep mask : le vrai choix` | `Soie ou satin : quelle différence pour un masque de sommeil ? — Andromeda` |
| Article `chouchou-cheveux-en-soie-guide-simple` | `body` (1 occurrence) | `un chouchou en soie qu'avec un élastique noir` (non lié ; un autre lien existait plus loin avec l'ancre « chouchous en soie de mûrier », différente de celle demandée) | Lien ajouté sur cette occurrence vers `/products/chouchou-pour-cheveux-en-soie-de-murier-22-mommes` avec l'ancre exacte « chouchou en soie » |
| Article `chouchou-cheveux-en-soie-guide-simple` | `title` (= H1) | `Chouchou cheveux en soie : guide simple` | `Comment porter un chouchou en soie ?` (option choisie par Pierre parmi 2 propositions) |
| Article `chouchou-cheveux-en-soie-guide-simple` | metafield `global.title_tag` | `Guide Chouchou Cheveux en Soie : Élégance et Protection` (déjà différent du titre avant modification) | `Comment porter un chouchou en soie ? — Andromeda` |

Toutes les mutations ont renvoyé `userErrors: []`.

### Modifications de code associées (theme, pas admin API)

- `templates/page.a-propos.json` (commit `d734624`) : H1 (`hero_title`) → « Notre histoire : la soie de mûrier au service du sommeil » ; section « Une soie de mûrier grade 6A, hypoallergénique » remplacée par « La soie de mûrier, c'est quoi ? » (3 paragraphes, 6 liens internes). Déployé et vérifié en prod.
- `snippets/meta-tags.liquid` : titre SEO de `qui-sommes-nous` mis à jour deux fois — d'abord vers la formulation demandée par Pierre (« Andromeda Paris : notre histoire et notre soie de mûrier grade 6A »), puis reformulé (« Notre histoire — Andromeda Paris : soie de mûrier grade 6A ») après que l'audit a signalé une cannibalisation avec le mot-clé de la home (le titre commençait par « Andromeda Paris »). Déployé et vérifié en prod.
- `seo/audit-cannibalisation.mjs` : ajout d'un délai de 350ms entre requêtes et d'un ré-essai avec backoff exponentiel sur HTTP 429, après que des passages répétés de l'audit ont déclenché le rate-limit de Shopify pendant ce brief.

### keyword-map.json

- `/pages/qui-sommes-nous` → `primary: "soie de mûrier"`, `secondary: ["mûrier soie"]`
- `/blogs/actualites/comment-choisir-son-masque-de-sommeil` → `primary: "meilleur masque de sommeil"`
- `/blogs/actualites/soie-6a-c-est-quoi` → `primary: "soie 6a"`
- `/blogs/actualites/mulberry-silk-vs-satin-sleep-mask` → `primary: "soie ou satin"`, `secondary: ["satin ou soie", "différence soie satin"]`
- `/blogs/actualites/masque-en-soie-pour-proteger-les-cheveux` → `primary: "soie pour les cheveux"`
- `/blogs/actualites/chouchou-cheveux-en-soie-guide-simple` → `primary: "comment porter un chouchou en soie"`
- Handle de la fiche chouchou vérifié (`chouchou-pour-cheveux-en-soie-de-murier-22-mommes`) : déjà correct dans le référentiel, aucune correction nécessaire.
- `/blogs/actualites/meilleur-masque-de-sommeil-en-soie` avait déjà `status: "draft-redirect"` depuis le brief n°6, rien à changer.

Détail complet dans `SEO-FIXES-7.md`.

## Brief n°7 bis — un mot-clé unique par page (2026-10-21, exécuté le 2026-10-25)

### Tâche 0 — Écarts constatés vs changelog

Les deux écarts signalés par l'inventaire du 21/10 se sont révélés **déjà corrects côté API** lors de la vérification (`collection.seo.title` = "Masques de nuit en soie de mûrier | Andromeda Paris", `article.title` = "Masque de sommeil contour des yeux ou intégral : comment choisir") — probablement un cache CDN pas encore propagé au moment de l'inventaire. Aucune réapplication nécessaire pour ces deux-là.

**Découverte importante en creusant la tâche 0** : la mutation `collectionUpdate`/`productUpdate` sur le champ `seo { ... }` **remplace tout l'objet SEO**, elle ne fusionne pas. Passer uniquement `seo: { description: "..." }` sans `title` a effacé le titre SEO de la collection masque pendant ce brief (immédiatement détecté et recorrigé). C'est probablement la cause réelle d'un écart similaire dans un brief antérieur — toujours passer `title` ET `description` ensemble désormais.

**Découverte sur le champ lu pour le `<title>` des articles** : `layout/theme.liquid` → `snippets/meta-tags.liquid` lit `article.title | append: ' — Andromeda'` pour les articles — **jamais** le metafield `global.title_tag`. Toutes les mutations sur ce metafield faites dans les briefs précédents (n°6, n°7 du 14/10) n'ont donc eu **aucun effet** sur le `<title>` réellement affiché. À partir de ce brief, le titre des articles est fixé via `article.title` uniquement (qui pilote aussi le H1). Pour 2 articles où le brief demande un title SEO différent du H1 (`comment-laver-un-masque-en-soie`, `organiser-sommeil-apres-decalage-horaire`), un override codé en dur a été ajouté dans `snippets/meta-tags.liquid`, même pattern que pour les produits.

### Tâche 2 — Produits et collections

| Ressource | Champ | Avant | Après |
|---|---|---|---|
| Produit bandeau | `seo.title` (admin) | `Bandeau de sommeil en soie de mûrier 22 mommes – rituel inclus \| Andromeda Paris` | `Bandeau de sommeil en soie de mûrier 22 mommes \| Andromeda Paris` |
| Produit bandeau | `seo.title` codé en dur (`meta-tags.liquid`) | idem ancien | aligné sur la nouvelle valeur |
| Produit chouchou | `title` (H1) | `Lot de 2 Chouchous en soie de mûrier 22 mommes` | `Chouchou en soie de mûrier 22 mommes — lot de 2` |
| Produit chouchou | `seo.title` (admin) | *(vide)* | `Chouchou en soie de mûrier 22 mommes 6A (lot de 2) \| Andromeda Paris` |
| Produit chouchou | `seo.title` codé en dur (`meta-tags.liquid`) | `Chouchous en soie de mûrier 22 mommes 6A \| Andromeda Paris` | `Chouchou en soie de mûrier 22 mommes 6A (lot de 2) \| Andromeda Paris` |
| Collection masque | `seo.description` | `...occultation totale, douceur pour la peau...` | `...un masque pour dormir dans l'obscurité totale, doux pour la peau...` |
| Collection bandeau | `title` (H1) | `Bandeaux de sommeil en soie` | `Bandeaux en soie pour dormir` |
| Collection bandeau | `seo.title` (admin) | `Bandeaux de sommeil en soie de mûrier \| Andromeda Paris` | `Bandeau pour dormir en soie de mûrier \| Andromeda Paris` |
| Collection bandeau | `seo.title` codé en dur (`meta-tags.liquid`) | idem ancien | aligné sur la nouvelle valeur |
| Collection chouchou | `title` (H1) | `Chouchou en soie` | `Chouchous en soie pour les cheveux` |
| Collection chouchou | `seo.title` | `Chouchous en soie de mûrier — Andromeda Paris` | `Chouchous en soie de mûrier pour les cheveux \| Andromeda Paris` |
| Collection chouchou | `seo.description` | `Chouchous 100% soie de mûrier grade 6A...` | `Nos chouchous en soie de mûrier 22 mommes protègent vos cheveux de la casse et des frisottis, jour et nuit. Livrés prêts à offrir.` |
| Collection chouchou | `descriptionHtml` | 3 paragraphes (~130 mots) | + 2 sections H2 ("Pourquoi un chouchou en soie pour les cheveux ?", "Jour et nuit") avec liens produit/article |
| `templates/collection.bandeau-soie.json` | H2 (text_block) | `Un masque de nuit bandeau pour un sommeil profond` | `Un bandeau pour dormir et retrouver un sommeil profond` |

**Collection masque — H1 non modifié (comme demandé)** : le H1 rendu (`Masque de nuit en soie de mûrier`) vient du setting `h1_override` dans `templates/collection.masque-soie.json`, distinct de `collection.title` (`Masques de nuit en soie`). Contient déjà le mot-clé, laissé tel quel.

### Tâche 3 — Articles

| Handle | `title` (= H1) avant | `title` (= H1) après | Title SEO affiché |
|---|---|---|---|
| `comment-choisir-son-masque-de-sommeil` | `Comment choisir son masque de sommeil` | `Meilleur masque de sommeil : comment bien le choisir ?` | = titre + « — Andromeda » (défaut thème) |
| `masque-contour-yeux-versus-integral` | `Masque de sommeil contour des yeux ou intégral : comment choisir` | `Masque yeux sommeil : contour des yeux ou intégral ?` | = titre + « — Andromeda » |
| `comment-laver-un-masque-en-soie` | `Comment laver un masque en soie sans l'abîmer` | `Comment laver la soie (et un masque en soie) sans l'abîmer` | override codé en dur : `Laver la soie : guide pour un masque en soie sans l'abîmer — Andromeda` |
| `organiser-sommeil-apres-decalage-horaire` | `Organiser son sommeil après décalage horaire` | `Jet lag : comment retrouver le sommeil après un décalage horaire` | override codé en dur : `Jet lag : retrouver le sommeil après un décalage horaire — Andromeda` |
| `chouchou-cheveux-en-soie-guide-simple` | `Comment porter un chouchou en soie ?` | `Comment porter un chouchou en soie : coiffures et conseils` | = titre + « — Andromeda » |
| `mulberry-silk-vs-satin-sleep-mask` | déjà conforme | inchangé | titre sans suffixe « — Andromeda » demandé par le brief, mais le thème l'ajoute automatiquement pour tous les articles sans exception codée — écart mineur assumé (texte quasi identique), non codé en dur pour éviter une exception de plus |
| `masque-de-sommeil-pour-meditation` | déjà conforme (« masque » + « méditation » présents) | non touché | — |

Lien ancre « chouchou en soie » vers la fiche produit : déjà présent dans `chouchou-cheveux-en-soie-guide-simple` depuis le brief du 14/10, vérifié toujours en place.

### Tâche 4 — Pages

| Ressource | Champ | Avant | Après |
|---|---|---|---|
| `/pages/faq` | title SEO (codé en dur) | `FAQ — Masque de Sommeil en Soie \| Andromeda Paris` | `FAQ Andromeda Paris : soie, entretien, livraison et retours` |
| `/pages/faq` | H1 (codé en dur, `sections/main-page.liquid`) | `FAQ — Questions fréquentes sur le masque de sommeil en soie Andromeda` | `Questions fréquentes Andromeda Paris` |
| `/pages/qui-sommes-nous` | — | déjà appliqué au brief du 14/10 (vérifié dans le thème pullé), rien à refaire | — |
| Blog `actualites` | `title` (objet Blog, pilote le H1 via `blog.title`) | `Actualités` | `Blog sommeil & soie` |
| Blog `actualites` | title SEO (codé en dur) | `Blog Sommeil & Bien-être — Andromeda Paris` | `Blog sommeil & soie : conseils pour mieux dormir \| Andromeda Paris` |

### Tâche 5 — Brouillons

Redirection créée : `/blogs/actualites/comment-entretenir-un-masque-de-sommeil-en-soie` → `/blogs/actualites/comment-laver-un-masque-en-soie` (`gid://shopify/UrlRedirect/1877160198479`). Les 3 autres brouillons : aucune action, redirections existantes conservées.

### Tâche 5 bis — Visibilité IA (chouchous cheveux fins)

- Article `chouchou-cheveux-en-soie-guide-simple` : section « Quel chouchou en soie choisir pour des cheveux fins et sensibles ? » insérée juste après l'introduction, avant « Les différents types de chouchous en soie ». Reste du texte inchangé.
- Produit chouchou : section « Caractéristiques » ajoutée en fin de `descriptionHtml`.
- FAQ produit chouchou (accordéon existant, 6 questions) : **fusion au lieu de duplication**. Une question du brief (« Laisse-t-il une marque dans les cheveux ? ») faisait doublon avec une question déjà présente (« Les chouchous marquent-ils les cheveux ? », déjà bien répondue) — non ajoutée. Les 2 autres questions du brief (cheveux fins, dormir) ajoutées comme nouvelles lignes d'accordéon (7 et 8), même format que les 6 existantes, plutôt qu'en bloc FAQ statique séparé dans `descriptionHtml` — cohérence avec le pattern déjà établi sur cette page. Pas de JSON-LD `FAQPage` généré par ce bloc accordéon (vérifié dans `blocks/accordion.liquid`), donc rien à éviter de dupliquer sur ce point.

Toutes les mutations ont renvoyé `userErrors: []`.

## Brief n°7 ter — corrections avant clôture (2026-10-26)

### Tâche 1 — Dégâts du bug seo{} (remplacement de l'objet entier)

Listé tous les produits/collections via l'API, comparé à l'historique du changelog :

| Ressource | Champ | Dégât constaté | Restauré |
|---|---|---|---|
| Produit bandeau | `seo.description` | Effacé par la mutation title-only de la tâche 2 du brief n°7 bis (ce même jour) | `Bandeau de sommeil en soie de mûrier 22 mommes, doux pour la peau et les cheveux. Occultation douce, maintien sans pression, livré avec son rituel de sommeil.` (valeur du brief n°4) |

Aucun autre dégât trouvé : le produit masque et le produit chouchou n'ont jamais eu de `seo.description` écrite via l'API dans l'historique (toujours `null`, pas une régression — ces deux fiches utilisent exclusivement le hardcode de `meta-tags.liquid` pour leur description, comme pour leur titre).

Pages et articles : vérifié que `Page` et `Article` **n'ont pas de champ `seo{}`** dans le schéma Admin API (confirmé via introspection) — ce bug ne peut donc pas les affecter.

### Tâche 2 — Règle générique pour le `<title>` des articles

- `snippets/meta-tags.liquid` : les 2 overrides codés en dur (`comment-laver-un-masque-en-soie`, `organiser-sommeil-apres-decalage-horaire`) remplacés par une règle générique : `article.metafields.global.title_tag.value` si présent, sinon `article.title | append: ' — Andromeda'`.
- Les 2 titles SEO prévus écrits dans le metafield `global.title_tag`.
- **3 metafields `title_tag` périmés trouvés et resynchronisés** (laissés par les briefs n°6 et n°7 du 14/10, jamais relus jusqu'à l'activation de cette règle, auraient fait resurgir un ancien titre) : `comment-choisir-son-masque-de-sommeil`, `masque-contour-yeux-versus-integral`, `chouchou-cheveux-en-soie-guide-simple`.
- Pages (`Page`) et collections (`Collection`) vérifiées : les collections ont un vrai champ `seo.title` natif (contrairement aux pages/articles) — voir le point suivant pour un problème distinct trouvé dessus.

### Vérification en ligne (navigateur de Pierre, le site bloquait mes propres requêtes ce jour-là — HTTP 429 pendant plus de 40 minutes)

**Bug trouvé sur la collection masque** : le `<title>` affichait le fallback générique (`Masques de nuit en soie — Andromeda`) au lieu de la valeur de `seo.title` pourtant correcte côté API (`Masques de nuit en soie de mûrier | Andromeda Paris`). Même défaut de propagation déjà documenté dans `SEO-FIXES-4.md` pour les collections (`collection.seo.title` pas fiable côté Liquid). Corrigé en ajoutant un override codé en dur dans `meta-tags.liquid` (même remède que pour la collection bandeau depuis le brief n°4), et par précaution la collection chouchou a reçu le même override avant de rencontrer le même bug.

Toutes les autres pages vérifiées en ligne étaient déjà conformes du premier coup (voir le tableau dans `SEO-FIXES-7.md`).

## Brief n°8a — Article "Idée cadeau femme enceinte" (2026-10-26)

| Ressource | Champ | Avant | Après |
|---|---|---|---|
| Article (nouveau) | création | — | `idee-cadeau-femme-enceinte`, blog `actualites`, brouillon (`isPublished: false`), auteur "Andromeda Paris", tags `cadeaux, noël, grossesse`, id `gid://shopify/Article/1004503007567` |
| Article `idee-cadeau-femme-enceinte` | `title` (H1) | — | `Idée cadeau femme enceinte : 9 cadeaux douceur pour Noël et au-delà` |
| Article `idee-cadeau-femme-enceinte` | metafield `global.title_tag` | — | `Idée cadeau femme enceinte : 9 idées douceur pour Noël \| Andromeda` |
| Article `idee-cadeau-femme-enceinte` | metafield `global.description_tag` | — | `Idée cadeau femme enceinte pour Noël : 9 cadeaux utiles et doux pour mieux dormir, se détendre et se sentir chouchoutée, de la soie de mûrier au coussin de grossesse.` |
| Article `idee-cadeau-femme-enceinte` | `body` | — | Corps HTML fourni par Pierre (fichier `article-idee-cadeau-femme-enceinte.html`), intégré tel quel, liens absolus conservés, aucune image (manquantes, voir ci-dessous) |

Mutation `articleCreate`, `userErrors: []`.

**Images (tâche 2)** : aucune des 2 images (`idee-cadeau-femme-enceinte.jpg`, `coffret-future-maman.jpg`) n'était disponible — ni dans `seo/images-articles/` (dossier inexistant), ni déjà uploadée dans Shopify → Contenu → Fichiers (vérifié via l'API). **Article resté en brouillon, images à fournir par Pierre avant publication.**

**Maillage interne (tâche 3)** : non fait, comme demandé — à faire uniquement une fois l'article publié par Pierre (sinon lien cassé depuis `guide-cadeaux-sommeil-premium`).

**`seo/keyword-map.json`** : entrée ajoutée pour `/blogs/actualites/idee-cadeau-femme-enceinte`, `primary: "idée cadeau femme enceinte"`. Vérifié : aucune autre page du référentiel n'a ce mot-clé en primary ni en secondary conflictuel (le plus proche est `guide-cadeaux-sommeil-premium` → `idée cadeau noël femme`, suffisamment distinct).

## Brief n°9 — ajustements mots-clés bandeau / chouchou / momme (2026-10-29)

`seo/keyword-map.json` mis à jour pour 9 URL (remplacement des entrées existantes) : accueil (secondaire retiré), masque produit (2 secondaires ajoutés), **bandeau produit (primary changé : `bandeau de sommeil soie` → `bandeau yeux nuit`)**, chouchou produit (secondaire ajouté), masque collection (primary affiné : `masque de nuit soie` → `masque de nuit en soie`), bandeau collection (1 secondaire retiré), **chouchou collection (primary/secondary inversés : `chouchou soie cheveux` devient primary)**, **article momme (primary changé : `soie 19 ou 22 mommes` → `momme soie`)**, article lavage (2 secondaires ajoutés).

| Ressource | Champ | Avant | Après |
|---|---|---|---|
| Produit `bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus` | `title` (H1) | `Bandeau de sommeil en soie de mûrier 22 mommes` | `Bandeau yeux nuit en soie de mûrier 22 mommes — rituel de sommeil inclus` |
| Produit `bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus` | `seo.title` | `Bandeau de sommeil en soie de mûrier 22 mommes \| Andromeda Paris` | `Bandeau yeux nuit en soie de mûrier 22 mommes \| Andromeda Paris` |
| Produit `bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus` | `seo.description` | inchangé | inchangé (renvoyé avec le titre pour éviter le bug de remplacement du champ `seo{}`) |
| Collection `chouchou-en-soie` | `seo.title` | `Chouchous en soie de mûrier pour les cheveux \| Andromeda Paris` | `Chouchou soie cheveux : chouchous en soie de mûrier \| Andromeda Paris` |
| Collection `chouchou-en-soie` | `seo.description` | inchangé | inchangé (renvoyé avec le titre) |
| Collection `chouchou-en-soie` | `title` (H1) | `Chouchous en soie pour les cheveux` | inchangé (brief : H1 non modifié) |
| Article `soie-19-vs-22-mommes-guide` | `title` (H1) | `Soie 19 vs 22 mommes : quel grammage choisir ?` | `Momme soie : 19 ou 22 mommes, quel grammage choisir ?` |
| Article `soie-19-vs-22-mommes-guide` | metafield `global.title_tag` | `Soie 19 vs 22 mommes : quel grammage choisir ?` | `Momme soie : 19 ou 22 mommes, quel grammage choisir ? — Andromeda` |

Toutes les mutations ont renvoyé `userErrors: []`.

**Code thème (`snippets/meta-tags.liquid`)** : les deux hardcodes existants (bug connu `collection.seo.title`/produit non lu en Liquid, cf. briefs précédents) mis à jour en miroir des champs API ci-dessus — bandeau produit ligne du bloc `product.handle == 'bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus'`, chouchou collection ligne du bloc `collection.handle == 'chouchou-en-soie'`. Poussé en live (`shopify theme push --only snippets/meta-tags.liquid`, thème `#199323648335`), `theme check` RAS (pas de nouvelle erreur/warning vs. baseline).

**Script d'audit (`seo/audit-cannibalisation.mjs`)** : alias `WORD_ALIASES = { ou: ['ou', 'vs'] }` supprimé. Il ne servait qu'à faire matcher un `<title>`/`<h1>` contenant littéralement « vs » avec un mot-clé contenant « ou » — nécessaire tant que l'article momme avait `title_tag` = "Soie 19 **vs** 22 mommes..." et que l'article `mulberry-silk-vs-satin-sleep-mask` portait encore ce schéma. Vérifié que les deux pages ont désormais « ou » en toutes lettres dans leur H1 et leur `<title>` (le second l'avait déjà depuis un brief antérieur) → l'alias ne servait plus aucune page du référentiel, retiré avec sa logique de candidats.

**Vérification live (tâche 5, partielle — 3 des 4 pages)** :

| Page | `<title>` live | `<h1>` live |
|---|---|---|
| `/products/bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus` | `Bandeau yeux nuit en soie de mûrier 22 mommes \| Andromeda Paris` | `Bandeau yeux nuit en soie de mûrier 22 mommes — rituel de sommeil inclus` |
| `/collections/chouchou-en-soie` | `Chouchou soie cheveux : chouchous en soie de mûrier \| Andromeda Paris` | `Chouchous en soie pour les cheveux` (inchangé, comme demandé) |
| `/blogs/actualites/soie-19-vs-22-mommes-guide` | `Momme soie : 19 ou 22 mommes, quel grammage choisir ? — Andromeda` | `Momme soie : 19 ou 22 mommes, quel grammage choisir ?` |

| Article `comment-laver-un-masque-en-soie` | `body` (insertion d'un H2) | — | H2 « Quelle lessive pour la soie ? » + paragraphe (texte fourni par Pierre le 26/10), inséré juste avant « Les erreurs qui abîment la soie » |

**Vérification live — 4e page (tâche 5, complétée) :**

| Page | `<title>` live | `<h1>` live |
|---|---|---|
| `/blogs/actualites/comment-laver-un-masque-en-soie` | `Laver la soie : guide pour un masque en soie sans l'abîmer — Andromeda` (inchangé) | `Comment laver la soie (et un masque en soie) sans l'abîmer` (inchangé) — H2 « Quelle lessive pour la soie ? » confirmé présent dans le HTML live, juste avant « Les erreurs qui abîment la soie » |

Les 4 pages du brief n°9 sont désormais vérifiées en live.

## Point en attente du brief n°7 bis, traité le 2026-10-29

L'article `guide-cadeaux-sommeil-premium` avait été décidé à retitrer le 26/10 pour matcher son mot-clé primary `idée cadeau noël femme` (cf. `SEO-FIXES-7.md`, point resté « en attente »), mais la décision n'avait jamais été exécutée : à cette date, `title`/`title_tag` live étaient toujours « Guide cadeaux sommeil premium à offrir avec goût ».

| Ressource | Champ | Avant | Après |
|---|---|---|---|
| Article `guide-cadeaux-sommeil-premium` | `title` (H1) | `Guide cadeaux sommeil premium à offrir avec goût` | `Idées cadeaux de Noël pour femme` |
| Article `guide-cadeaux-sommeil-premium` | metafield `global.title_tag` | `Guide cadeaux sommeil premium à offrir avec goût` | `Idées cadeaux de Noël pour femme — Andromeda` |

Vérifié en live : `<title>` = `Idées cadeaux de Noël pour femme — Andromeda`, `<h1>` = `Idées cadeaux de Noël pour femme`. `userErrors: []` sur les deux mutations.

## Brief n°10 — changement de cible de guide-cadeaux-sommeil-premium (décision de Pierre, 2026-10-29)

Le titre précédent (« Idées cadeaux de Noël pour femme ») s'est révélé incohérent avec le contenu : l'article ne mentionne jamais Noël explicitement et ne cible la femme qu'en une seule phrase d'intro, le reste étant neutre. Décision de Pierre : repositionner l'article sur « cadeau bien-être femme » (plus fidèle au contenu réel) plutôt que de réécrire tout le corps pour coller à « Noël ». Handle inchangé.

| Ressource | Champ | Avant | Après |
|---|---|---|---|
| Article `guide-cadeaux-sommeil-premium` | `title` (H1) | `Idées cadeaux de Noël pour femme` | `Cadeau bien-être femme : des idées douceur autour du sommeil` |
| Article `guide-cadeaux-sommeil-premium` | metafield `global.title_tag` | `Idées cadeaux de Noël pour femme — Andromeda` | `Cadeau femme bien-être : idées douceur pour bien dormir \| Andromeda` |
| Article `guide-cadeaux-sommeil-premium` | metafield `global.description_tag` | `Notre Guide cadeaux sommeil premium réunit des attentions en soie, lumière douce et rituels raffinés pour offrir des nuits plus calmes et réparatrices.` | `Idées de cadeau bien-être pour femme autour du sommeil : masque en soie, rituel du soir, cocooning. Des cadeaux douceur à offrir à Noël, pour un anniversaire ou la fête des mères.` |
| Article `guide-cadeaux-sommeil-premium` | `body` | — | 3 insertions (voir ci-dessous), rien d'autre réécrit |

**Insertions dans le corps :**
1. Paragraphe d'intro ajouté en tout début (avant le 1er paragraphe existant) : « Quel cadeau bien-être offrir à une femme ? [...] »
2. Nouveau H2 « Cadeau bien-être pour femme : nos idées pour Noël » inséré juste avant le H2 « Questions fréquentes », avec lien vers `idee-cadeau-femme-enceinte`. **Lien vers `cadeau-soie-homme` non ajouté** : cet article n'existe pas dans la boutique (vérifié via l'API, aucun résultat sur ce handle) — la dernière proposition de la phrase a donc été retirée, comme prévu par le brief si l'article n'est pas publié.
3. Nouvelle question FAQ « Quel cadeau cocooning offrir à une femme ? » ajoutée après la dernière question existante, avant le paragraphe de clôture.

**Article `idee-cadeau-femme-enceinte` (brouillon)** : ancre « guide des idées cadeaux de Noël pour femme » → « idées cadeaux bien-être pour femme » (même lien vers `guide-cadeaux-sommeil-premium`). **Pas de fichier local `article-idee-cadeau-femme-enceinte.html` trouvé dans le repo** (recherché, absent) — seul le corps Shopify a donc été mis à jour ; rien à synchroniser côté dépôt.

**`seo/keyword-map.json`** : `guide-cadeaux-sommeil-premium` → `primary: "cadeau femme bien être"`, secondaires `["cadeaux bien être pour femme", "cadeau bien être pour femme", "bien être cadeaux", "cadeau cocooning femme", "idée cadeau cocooning femme", "cadeau sommeil"]`. Anciens `"idée cadeau noël femme"` et `"cadeau noël sœur"` retirés.

**Vérification live :**

| Élément | Valeur live |
|---|---|
| `<title>` | `Cadeau femme bien-être : idées douceur pour bien dormir \| Andromeda` |
| `<h1>` | `Cadeau bien-être femme : des idées douceur autour du sommeil` |
| Intro ajoutée | présente (« ...ralentir et à mieux dormir... ») |
| H2 Noël ajouté | présent (« Cadeau bien-être pour femme : nos idées pour Noël ») |
| FAQ cocooning ajoutée | présente (« Quel cadeau cocooning offrir à une femme ? ») |

Toutes les mutations ont renvoyé `userErrors: []`.

## Correction mineure — article idee-cadeau-femme-enceinte (2026-10-29)

| Ressource | Champ | Avant | Après |
|---|---|---|---|
| Article `idee-cadeau-femme-enceinte` | `body` (1 mot) | « Découvrez aussi **notre** idées cadeaux bien-être pour femme » | « Découvrez aussi **nos** idées cadeaux bien-être pour femme » |

`userErrors: []`. **Vérification navigateur impossible** : l'article est toujours en brouillon (`isPublished: false`), l'URL live renvoie une 404 (comportement normal, sans lien avec cette correction). Vérifié à la place via une relecture du `body` par l'Admin API : la correction est bien en place, rien d'autre n'a changé.

## Ouverture Belgique & Suisse (2026-11-04)

Avant ce changement, un seul Market actif existait (« France », FR uniquement) : même si les zones de livraison couvraient déjà la Belgique (zone « UE », 22 €) et la Suisse (zone « Internationale », 29 €), aucun client de ces pays ne pouvait finaliser un achat — l'absence de Market les concernant bloquait le checkout. Décision de Pierre (04/11) : ouvrir l'achat pour ces deux pays, tarif de livraison unique à 14,50 €, Suisse facturée en CHF.

**Zones de livraison** (`DeliveryProfile` « Profil général », `gid://shopify/DeliveryProfile/137884762447`) :

| Action | Détail |
|---|---|
| Retiré | Belgique retirée de la zone « UE (Union Européenne) » (reste à 22 € pour les 25 autres pays UE, inchangé) |
| Retiré | Suisse retirée de la zone « International » (reste à 29 € pour les 13 autres pays, inchangé) |
| Créé | Nouvelle zone « Belgique & Suisse » (`gid://shopify/DeliveryZone/712795455823`), méthode « Livraison standard » à **14,50 € EUR** |

**Markets créés :**

| Market | Pays | Devise | Statut |
|---|---|---|---|
| Belgique (`gid://shopify/Market/117776351567`) | BE | EUR (devise par défaut de la boutique, pas de réglage séparé) | ACTIVE |
| Suisse (`gid://shopify/Market/117776384335`) | CH | CHF (conversion automatique au taux de change courant, pas de prix fixes locaux) | ACTIVE |

Aucun catalogue restreint par Market n'existe sur cette boutique (vérifié : aucun `MarketCatalog`, seulement des catalogues de canaux de vente) → tous les produits déjà publiés sur la boutique en ligne sont automatiquement disponibles pour ces deux nouveaux Markets, sans action supplémentaire.

**Vérifié via l'Admin API** : les 3 Markets (France, Belgique, Suisse) sont `ACTIVE`, la zone « Belgique & Suisse » contient bien BE + CH à 14,50 €, et les zones UE/International ne contiennent plus ces deux pays. `userErrors: []` sur toutes les mutations.

**Non traité, à signaler à Pierre :**
- **Taxes/TVA** : la boutique facture TTC (`taxesIncluded: true`), configuré pour la TVA française. Vendre vers la Belgique (UE) relève en principe du régime OSS (TVA du pays de destination) et vers la Suisse (hors UE) de la TVA à l'importation suisse — aucun réglage fiscal n'a été modifié ici, c'est un point de conformité à traiter séparément (déclaration OSS, immatriculation TVA suisse le cas échéant) avant un volume de ventes significatif dans ces pays.
- **Paiement** : pas de vérification que Shopify Payments règle correctement en CHF pour la Suisse — à confirmer lors d'une première commande test.
- Aucune vérification « navigateur réel » possible pour ce type de changement (pas de page HTML à charger) : confirmé uniquement via l'Admin API.

## Audit anglais désactivé + bandeau cookies/apps (2026-11-09)

**Diagnostic anglais** : `shopLocales` confirme `en` présent mais `published: false` → `/en/*` renvoie 404 en live, confirmé. En creusant les `translatableResources`, le travail de traduction est en réalité substantiel mais incomplet :
- Traduit : page FAQ, page Politique de retour, 6 articles de blog, le produit masque.
- Non traduit : produits bandeau et chouchou, 2 des 3 collections (bandeau, chouchou).
- Bug trouvé : la collection masque (`masque-de-sommeil-soie`) a une traduction de titre anglais erronée : « Home page » au lieu d'un vrai titre — à corriger si l'anglais est repris plus tard.

Décision de Pierre (09/11) : **ne pas réactiver l'anglais maintenant**, rediriger `/en/*` vers l'équivalent français à la place.

**Fix appliqué (`layout/theme.liquid`)** : script inline en tout début de `<head>`, exécuté sur CHAQUE page, qui détecte côté navigateur si `window.location.pathname` commence par `/en/` (ou vaut `/en`) et redirige (`location.replace`) vers le même chemin sans le préfixe, en conservant query string et hash.

```js
(function(){var p=window.location.pathname;if(p==='/en'||p.indexOf('/en/')===0){var n=p.replace(/^\/en\/?/,'/');if(n===''){n='/';}window.location.replace(n+window.location.search+window.location.hash);}})();
```

**Pourquoi côté navigateur et pas via `request.path` en Liquid** : première tentative basée sur `request.path` en Liquid (avec `<meta http-equiv="refresh">` généré côté serveur) — ne fonctionne pas : sur une page 404 issue d'une locale désactivée, `request.path` ne reflète pas l'URL réellement demandée côté serveur (vérifié : la balise `og:url` générée pour `/en/blogs/actualites/soie-6a-c-est-quoi` pointait vers `/404`, pas l'URL réelle). `window.location.pathname` côté navigateur, lui, reste fiable car c'est le navigateur qui connaît l'URL réellement tapée/cliquée, indépendamment de ce que Shopify expose en Liquid sur une 404. D'où le script JS inconditionnel, sans dépendance à Liquid.

**Limite connue** : fonctionne pour tout visiteur humain (JS activé) et pour les crawlers qui exécutent le JavaScript (Googlebot le fait). Ne produit pas un vrai code HTTP 301 — Shopify ne permet pas de changer le code de statut d'une page 404 depuis le thème. Pas de solution serveur possible pour un préfixe générique `/en/*` : les redirections natives Shopify (`urlRedirectCreate`) n'acceptent que des chemins exacts, pas de wildcard.

**Vérifié en live** : `shopify theme check` RAS, poussé sur le thème live (`#199323648335`, `layout/theme.liquid` seul). Script confirmé présent dans le HTML brut de `/`, `/en/` et `/en/blogs/actualites/soie-6a-c-est-quoi` (toutes avec statut 404 côté serveur pour les URL `/en/*`, comme attendu — seul le comportement JS côté navigateur change).

**Bandeau cookies / app / thème autour du 3-4 novembre** : revue de l'historique `updatedAt` de l'intégralité des ~400 fichiers du thème live — aucun fichier modifié après le 29 octobre (mes propres commits SEO). Le bandeau cookies est le bandeau natif Shopify (`privacy-banner.js`), personnalisé en CSS/JS dans `layout/theme.liquid` (pas une app tierce), présent et chargé normalement en live. Pas pu vérifier la liste des apps installées ni le statut ON/OFF du bandeau via l'Admin API (scopes `read_apps`/`read_privacy_settings` manquants sur ce connecteur) — à vérifier manuellement par Pierre dans Admin > Apps et Admin > Paramètres > Confidentialité des clients si un doute persiste.

## Meilleur masque de sommeil — amélioration de position (2026-11-10)

Article `comment-choisir-son-masque-de-sommeil` (primaire : *meilleur masque de sommeil*, 10e position).

**Doublons signalés avant insertion, tranchés par Pierre** :
- BLOC B (nouveau H2 « Quel est le meilleur masque de sommeil en soie ? ») faisait doublon exact avec une question existante de la FAQ de l'article → **FAQ retirée**, BLOC B inséré à sa place en haut de l'article (meilleur emplacement SEO).
- BLOC A (tableau par type de masque) chevauche partiellement le tableau existant en section 02 (comparatif par matière) → **gardé tel quel**, angle différent jugé complémentaire.

**Contenu inséré** (`articleUpdate`) : `<p><em>Mis à jour en novembre 2026.</em></p>` en tête de corps, puis BLOC A (tableau comparatif 5 types de masques) + BLOC B (5 critères du meilleur masque en soie) juste après l'introduction, avant la section « 01 — Les fondements ». FAQ « Quel est le meilleur masque de sommeil en soie ? » supprimée (doublon).

**`dateModified`** : déjà exposé par le thème (`layout/theme.liquid:169`, basé sur `article.updated_at`) — aucune modification de thème nécessaire, confirmé en live : `"dateModified":"2026-11-10T10:43:49+01:00"`.

**Meta description** (`metafieldsSet`, `global.description_tag`) : *"Quel est le meilleur masque de sommeil ? Soie, satin, coton, 3D ou pondéré : notre comparatif, les 5 critères pour bien choisir et notre verdict. Mis à jour en novembre 2026."* — confirmé en live dans `<meta name="description">`.

**Maillage entrant ajouté** (une phrase chacun, sans réécrire le reste) :
- Fiche produit masque (`productUpdate`) et collection masque (`collectionUpdate`) : phrase "Vous hésitez ? Lisez notre guide du meilleur masque de sommeil." en fin de description.
- Articles `masque-de-sommeil-en-soie-pour-avion`, `masque-contour-yeux-versus-integral`, `mulberry-silk-vs-satin-sleep-mask` (`articleUpdate`) : une phrase de lien chacun, insérée à un endroit naturel (sections "comment choisir" de chaque article). Confirmé en live via curl : présent sur les 3 articles.

**`keyword-map.json`** : ajout de "meilleur masque de sommeil en soie" et "meilleur masque de nuit" aux secondaires de la page. Vérifié : aucune autre page du site ne porte ces 3 expressions en primaire/secondaire.

**Vérification croisée (tâche 8)** : ancres "soie et satin" → `mulberry-silk-vs-satin-sleep-mask` et "contour des yeux" → `masque-contour-yeux-versus-integral` confirmées en live, aucune ne pointe vers `comment-choisir-son-masque-de-sommeil`.

**Vérifié en live (curl)** : BLOC A présent (1 occurrence), FAQ doublon absent (0 occurrence), `dateModified`, meta description, ancres croisées, et les 3 liens entrants vers le guide — tout confirmé avant que le site ne commence à renvoyer des 429 (voir note rate-limit ci-dessous).

## Nouvelle collection « Idées cadeaux en soie » + mise en avant coffret (2026-11-10)

Décision de Pierre (10/11). Nouvelle collection manuelle + bloc coffret sur les 3 fiches produit pure soie.

**Collection créée** (`collectionCreate` + `publishablePublish`) :
- Handle `idees-cadeaux-soie`, titre H1 "Idées cadeaux en soie, livrées dans leur coffret", SEO title/description fournis par le brief, tri manuel (masque, bandeau, chouchou dans cet ordre), image = photo actuelle de la collection masque (pas de photo de coffret ouvert fournie par Pierre — **à signaler : image à remplacer dès que Pierre la fournit**).
- Description (`descriptionHtml`) = BLOC COLLECTION du brief, **avec la phrase vers l'article `idee-cadeau-femme-enceinte` retirée** : cet article est toujours en brouillon (`isPublished: false`) → **à rajouter dès sa publication**.
- Publiée sur le canal "Boutique en ligne" (`publishablePublish`, confirmé `publishedOnPublication: true`).

**Bug trouvé et corrigé en cours de route** : la nouvelle collection n'avait pas de template dédié et retombait sur le template générique `templates/collection.json` (celui normalement utilisé par `/collections/all`), qui contient un H1 et une description codés en dur ("Tous nos accessoires en soie de mûrier") sans rapport avec la nouvelle collection — confirmé en live avant correction. Fix : nouveau fichier `templates/collection.idees-cadeaux-soie.json` (section `collection-banner-seo` sans override, pour que H1/image retombent sur les vraies valeurs de la collection, + `collection-variant-grid`), poussé en live (`shopify theme check` : 368 erreurs / 1415 warnings, identique à la référence), puis `templateSuffix` assigné à la collection via `collectionUpdate`.

**3 fiches produit** (`productUpdate`) — bloc `<h2>Livré dans son coffret, prêt à offrir</h2>` + phrase avec lien vers `/collections/idees-cadeaux-soie` :
- **Masque** et **chouchou** : un paragraphe "livré dans son coffret + QR code sons apaisants" existait déjà dans leur description → **fusionné** dans le nouveau bloc structuré plutôt que dupliqué, comme demandé.
- **Bandeau** : aucun bloc existant → ajouté proprement en fin de description.
- **Chouchou en coffret** : sa description (déjà en ligne avant ce brief) affirmait déjà "livrés dans leur coffret" → hypothèse retenue sur cette base, mais **non reconfirmée avec Pierre en direct** comme demandé par le brief — à confirmer.

**Image coffret** : seule la fiche bandeau avait déjà une photo du produit dans son coffret, déjà en 2e position (`bandeau-glamour-avec-coffret-andromeda-paris.png`) → ALT text corrigé (`fileUpdate`) en "Bandeau yeux nuit en soie Andromeda Paris dans son coffret cadeau". Masque et chouchou : aucune photo coffret trouvée dans leur médias → rien ajouté/réordonné, aucune image supprimée.

**Navigation** (`menuUpdate`) — "Idées cadeaux" → `/collections/idees-cadeaux-soie` ajouté après "Nos produits pure soie" dans le menu principal, et après "Rechercher" dans le footer.

Menu principal avant : Accueil, Nos produits pure soie, FAQ, Blog, Contact.
Menu principal après : Accueil, Nos produits pure soie, **Idées cadeaux**, FAQ, Blog, Contact.
Footer avant : Rechercher.
Footer après : Rechercher, **Idées cadeaux**.

**`keyword-map.json`** : ajout de l'entrée collection (primaire "cadeau en soie"). Vérifié : aucune autre page n'a "cadeau en soie" ou "cadeau soie" en tête de title/H1. `cadeau-soie-homme` n'existe toujours pas (confirmé absent) — notée pour différenciation future.

**Limite de vérification — rate-limit persistant** : après le fix du template, le site a commencé à renvoyer `HTTP 429` (header `retry-after: 60`) sur toutes les requêtes curl vers les pages concernées (collection, fiches produit), y compris après plusieurs minutes d'attente sans aucune requête — chaque nouvelle tentative semblait réinitialiser la fenêtre. Après plusieurs cycles d'attente (jusqu'à 2 min sans requête), le blocage persistait. **Toutes les modifications ci-dessus sont confirmées par les réponses des mutations Admin API elles-mêmes (`userErrors: []` partout, contenu final renvoyé par chaque mutation)**, mais la vérification visuelle finale en navigateur n'a pas pu être complétée pour la collection et les 3 fiches produit de ce brief — **à vérifier par Pierre en navigateur dès que le rate-limit se lève**.

## Fix contraste texte noir sur bannière collection (2026-11-10)

Signalé par Pierre (capture d'écran) : dans la description de la collection `idees-cadeaux-soie`, le texte de la liste à puces (`<ul><li>`) s'affichait en noir sur le fond photo sombre de la bannière, donc illisible — alors que les paragraphes `<p>` et le `<h2>` juste au-dessus étaient bien en blanc.

**Cause** : `sections/collection-banner-seo.liquid` ne définissait la couleur blanche que pour `.cbs__text p`, `.cbs__text h2` et `.cbs__text a` — aucune règle pour `ul`/`li`/`strong`, qui retombaient donc sur la couleur de texte par défaut du thème (noire). Bug latent dans la section : invisible jusqu'ici car aucune description de collection n'utilisait de liste à puces avant le BLOC COLLECTION de ce brief.

**Fix** : ajout de `color: #FFFFFF` sur le conteneur `.cbs__text`, plus des règles explicites pour `.cbs__text li` et `.cbs__text strong/b` (et `ul/ol` pour la marge/indentation). `shopify theme check` : 368 erreurs / 1415 warnings, identique à la référence. Poussé en live (`sections/collection-banner-seo.liquid` seul).

Affecte potentiellement d'autres collections si elles ajoutent une liste à puces dans leur description à l'avenir — corrigé une fois pour toutes au niveau de la section, pas seulement pour `idees-cadeaux-soie`.

**Non vérifié en navigateur** : rate-limit toujours actif au moment du fix (voir note ci-dessus) — à confirmer visuellement par Pierre.

## Fix couleur des liens au survol sur bannière collection (2026-11-10)

Signalé par Pierre : les liens de la description (bannière sombre) redevenaient noirs au survol, alors qu'ils étaient blancs au repos.

**Cause** : la classe globale `.rte` du thème (présente sur `.cbs__text`) applique une règle `a:hover { color: var(--color-primary-hover) }` plus spécifique que la règle `.cbs__text a` ajoutée au fix précédent — elle l'emportait donc au survol.

**Fix** : règle reciblée sur l'id unique de la section (`#cbs-text-{{ section.id }} a:hover`, `:focus` inclus), dont la spécificité (sélecteur ID) l'emporte sur la règle globale par classe, quel que soit l'ordre de chargement des CSS. `shopify theme check` : 368 erreurs / 1415 warnings, inchangé. Poussé en live (`sections/collection-banner-seo.liquid` seul).

**Non vérifié en navigateur** : rate-limit toujours actif — à confirmer visuellement par Pierre.

## Hero homepage — habillage Noël (2026-11-12)

Demande de Pierre : nouvelle image, nouveau titre et nouveau CTA sur la section hero de la page d'accueil (`templates/index.json`, section `hero_jVaWmY`).

- **Image** (desktop + mobile) : photo fournie par Pierre (femme avec masque de sommeil en soie devant un sapin de Noël illuminé), uploadée dans Shopify (`fileCreate`, `gid://shopify/MediaImage/76979855524175`) avec ALT "Femme portant un masque de sommeil en soie Andromeda Paris, blottie devant un sapin de Noël illuminé".
- **Titre** : "Le bandeau de sommeil Dolce Vita est disponible dès maintenant." → **"Le masque en soie de mûrier qui fait de chaque nuit un cadeau"**.
- **CTA** : "Découvrir notre bandeau" (lien vers le bandeau) → **"Offrir un masque pour Noël"** (lien repointé vers la fiche masque, cohérent avec le nouveau titre et l'image).
- Branche anglaise du hero (masquée depuis la redirection `/en/`) laissée inchangée, non demandée.

`shopify theme check` : 365 erreurs / 1415 warnings (légèrement sous la référence de 368, aucune régression). Poussé en live (`templates/index.json` seul). **Vérifié en live** : titre, CTA et image confirmés présents dans le HTML de la page d'accueil.

## Idées cadeaux dans le méga-menu (2026-11-12)

Demande de Pierre : ajouter la collection « Idées cadeaux en soie » dans le méga-menu du header.

**Découverte en cours de tâche** : le header (`sections/header-group.json`, bloc `header-menu`) n'utilise pas le linklist `main-menu` (sur lequel le brief précédent avait ajouté "Idées cadeaux" le 2026-11-10) mais un linklist distinct, `main-menu-test` (gid `334858551631`, "Main menu (test méga-menu)"). Vérifié par curl sur `https://www.andromedaparis.com/` : seuls "Accueil", "Nos produits", "FAQ", "Qui sommes-nous", "Blog", "Contact" apparaissaient — "Idées cadeaux" n'avait donc jamais été visible dans la barre de navigation du header malgré la mise à jour du 10/11 (le lien dans `main-menu` existe toujours, mais ce menu n'est affiché nulle part sur le site live à ce jour). Seul le footer (qui utilise bien le linklist `footer`) affichait correctement "Idées cadeaux" depuis le 10/11.

**Fix navigation** (`menuUpdate` sur `main-menu-test`) : "Idées cadeaux" ajouté comme 4e lien enfant du menu "Nos produits" (type CATALOG, méga-menu `featured_collections`), aux côtés de "Masque de sommeil en soie", "Bandeau de sommeil en soie", "Chouchou en soie".

Sous-menu "Nos produits" avant : Masque de sommeil en soie, Bandeau de sommeil en soie, Chouchou en soie.
Sous-menu "Nos produits" après : Masque de sommeil en soie, Bandeau de sommeil en soie, Chouchou en soie, **Idées cadeaux**.

**Fix layout** (`blocks/_header-menu.liquid`) : le calcul de grille du méga-menu (`snippets/mega-menu-list.liquid`) limitait l'affichage à 3 cartes de collection au maximum sur cette largeur de grille (8 colonnes) — la 4e carte était calculée mais jamais rendue. Grille élargie à 9 colonnes uniquement quand le sous-menu `featured_collections` a plus de 3 liens enfants (condition scoping le changement à ce cas précis, sans toucher les autres styles de méga-menu ni le tablette). `shopify theme check` : 365 erreurs / 1415 warnings, inchangé. Poussé en live (`blocks/_header-menu.liquid` seul).

**Vérifié en live** : les 4 cartes ("Masques de nuit en soie", "Bandeaux en soie pour dormir", "Chouchous en soie pour les cheveux", "Idées cadeaux en soie, livrées dans leur coffret") s'affichent bien dans le méga-menu desktop.

**Non vérifié** : affichage mobile/tablette (le méga-menu n'est de toute façon limité qu'à 1 collection vedette sur cette largeur, limite préexistante non liée à ce changement) — à confirmer par Pierre si besoin sur mobile.

## Vignette méga-menu + bannière collection — photo de Noël (2026-11-12)

Demande de Pierre : utiliser une photo (cadeaux emballés sous un sapin de Noël illuminé de bougies) comme vignette dans le méga-menu et comme image de bannière de la collection « Idées cadeaux en soie », avec texte alt, et raccourcir le nom affiché dans le méga-menu en « Idées cadeaux en soie ».

- **Image** : uploadée (`fileCreate`, `gid://shopify/MediaImage/76981358952783`, 1434×1872) avec ALT "Cadeaux emballés sous un sapin de Noël illuminé de bougies, idée cadeau en soie Andromeda Paris". Affectée au champ `image` de la collection `idees-cadeaux-soie` (`collectionUpdate`) — ce champ alimente à la fois la vignette du méga-menu (`resource-card`) et l'image de bannière (`sections/collection-banner-seo.liquid` retombe sur `collection.image` quand aucune image n'est définie au niveau de la section, ce qui est le cas ici) : un seul changement couvre les deux emplacements demandés. Ancienne image (photo du masque, utilisée en attendant une vraie photo du coffret) remplacée, non supprimée du fichier media library.
- **Nom dans le méga-menu** : `collection.title` raccourci de "Idées cadeaux en soie, livrées dans leur coffret" à **"Idées cadeaux en soie"** (le méga-menu affiche le titre réel de la collection, sans champ dédié séparé).
- **H1 / SEO de la page collection préservé** : comme `collection.title` sert aussi de H1 par défaut sur la bannière (`h1_override | default: collection.title`), un `h1_override` explicite ("Idées cadeaux en soie, livrées dans leur coffret") a été ajouté à `templates/collection.idees-cadeaux-soie.json` pour que le raccourci demandé pour le méga-menu ne change pas silencieusement le H1/texte de la page — non demandé par ce brief. `seo.title`/`seo.description` de la collection non touchés.
- `shopify theme check` : total combiné inchangé (365 erreurs / 1415 warnings), zéro offense sur le fichier modifié. Poussé en live (`templates/collection.idees-cadeaux-soie.json` seul).

**Vérifié en live** : méga-menu — la carte "Idées cadeaux en soie" avec la nouvelle photo s'affiche bien (confirmé par curl sur la page d'accueil).

**Non vérifié en navigateur** : la page `/collections/idees-cadeaux-soie` elle-même (bannière + H1) — deux tentatives de vérification curl (espacées de 65s) ont toutes deux échoué en `HTTP 429` (rate-limit Cloudflare persistant sur cette URL spécifique, déjà rencontré lors du brief du 10/11). Conformément à la consigne de ne pas insister, la vérification s'appuie à la place sur la confirmation Admin API : `collectionUpdate`/requery confirment `title: "Idées cadeaux en soie"` et `image` pointant vers le nouveau fichier (1434×1872, alt correct), et le `theme check` confirme l'absence de régression sur le template poussé — **à confirmer visuellement par Pierre dès que le rate-limit se lève**.

## Fix structure des titres (H2 avant le H1) sur la homepage (2026-11-13)

Signalé par Pierre (capture d'écran d'une extension d'outline de titres) : sur `/`, deux `<h2>` ("Country/Region") apparaissaient dans le DOM avant le premier `<h1>` de la page, cassant la hiérarchie des titres.

**Cause** : `snippets/localization-form.liquid` (sélecteur pays/langue du header, rendu une fois pour le dropdown desktop et une fois pour le tiroir mobile) utilisait un `<h2>` pour étiqueter le bloc "pays" du formulaire, visuellement masqué (`visually-hidden`) et jamais réellement référencé par un `aria-labelledby` (vérifié : aucun autre fichier ne pointe vers cet id). Comme le header est rendu avant le contenu principal, ce `<h2>` orphelin apparaissait dans l'ordre du DOM avant le vrai `<h1>` de la page. Bug secondaire trouvé au passage : le texte était codé en dur en anglais ("Country/Region") au lieu d'utiliser la clé de traduction existante `accessibility.country_region` (déjà utilisée ailleurs dans le header) — le `<h2>` frère juste en dessous, pour la langue, utilisait déjà correctement sa clé de traduction.

**Fix** : `<h2>` remplacé par un `<span>` (élément non structurant, cohérent avec le pattern déjà utilisé pour un autre libellé caché du header) + texte codé en dur remplacé par `{{ 'accessibility.country_region' | t }}`. Corrige les deux occurrences (dropdown desktop et tiroir mobile) en un seul changement, car les deux rendent le même snippet partagé. Aucun impact fonctionnel : cet id n'étant référencé nulle part, aucune perte d'accessibilité réelle (l'élément reste visuellement masqué, avec son id et sa classe inchangés si un `aria-labelledby` venait à l'utiliser plus tard).

`shopify theme check` : total combiné inchangé (365 erreurs / 1415 warnings). Poussé en live (`snippets/localization-form.liquid` seul). **Vérifié en live** : plus aucun `<h2>` avant le premier `<h1>` sur `/`, et le libellé caché affiche désormais "Pays/région" (au lieu de l'anglais).

## Homepage : title/meta pilotés depuis l'admin (2026-11-13)

Signalé par Pierre (capture d'écran Admin → Préférences) : le titre et la méta-description configurés dans Admin ("Andromeda Paris – Masque, bandeau et chouchou en soie de mûrier" / "Masques, bandeaux et chouchous en soie de mûrier 22 mommes, certifiée OEKO-TEX...") ne correspondaient pas à ce qui s'affichait réellement sur `/` ("Andromeda Paris – Masques de sommeil en soie de mûrier" / "Andromeda Paris crée des masques de sommeil...").

**Cause** : `snippets/meta-tags.liquid` codait en dur le titre et la meta-description de la homepage (`if request.page_type == 'index'`), ignorant totalement `page_title`/`page_description` (les objets Liquid alimentés par Admin → Préférences). Ce n'est pas un bug généralisé : toutes les autres pages (produits, collections, articles) utilisent délibérément des title/meta codés en dur dans ce même fichier depuis les briefs SEO précédents — seule la homepage est concernée par ce changement, à la demande explicite de Pierre de piloter **cette page précise** depuis l'admin.

**Fix** : la branche `index` utilise maintenant `page_title | default: shop.name` et `page_description | default: [description de secours existante]`, au lieu des chaînes codées en dur. Les title/meta de la homepage sont donc modifiables directement depuis Admin → Boutique en ligne → Préférences, sans intervention sur le thème.

`shopify theme check` : total combiné inchangé (365 erreurs / 1415 warnings). Poussé en live (`snippets/meta-tags.liquid` seul). **Vérifié en live** : `<title>` et `<meta name="description">` de `/` correspondent désormais exactement aux valeurs saisies dans Admin → Préférences.

## Refonte SEO de la page d'accueil (2026-11-13)

Brief complet de Pierre : structure de titres H1→H4, textes SEO, images et JSON-LD de la homepage, sans changement visuel. 13 fichiers modifiés.

**Structure de titres** (conforme au brief, vérifié en live via extraction de tous les `<h1>`–`<h6>` du HTML) :
- H1 : "Masques de sommeil en soie de mûrier, imaginés à Paris" → **"Masques, bandeaux et chouchous en soie de mûrier"** (texte seul, toujours `visually-hidden` dans le bloc hero — position/style inchangés, hero visible non touché comme demandé).
- Collections vedettes (`templates/index.json` + `sections/section-collections-vedettes.liquid`) : nouveau H2 "Nos accessoires en soie de mûrier 22 mommes" (réglage `heading`, mécanisme déjà prévu par la section) ; `<span class="collections-showcase__title">` → `<h3>` sur les 3 cartes ; titres → "Bandeau de sommeil en soie" / "Masque de sommeil en soie" / "Chouchou en soie" ; ordre changé en Bandeau → Masque → Chouchou.
- `section_R7Vhzp` ("Le sommeil est un luxe...") : `<h2>` → `<p>` (FR + EN), texte remplacé par "Nos accessoires en soie de mûrier accompagnent vos nuits, vos siestes et vos voyages, avec élégance."
- QR code (`sections/section-qr-rituel.liquid`) : texte réparti sur les 2 lignes stylées existantes → "Un espace sonore pour s'endormir," / "offert avec chaque commande".
- Blog : H2 "Vous le saviez ?" → "Le journal Andromeda" (3 articles déjà corrects : Marie Claire, chouchou, masque yeux — vérifiés, aucun changement nécessaire).
- Texte SEO bas de page (`sections/section-seo-text.liquid` + bloc dans `templates/index.json`) : nouveau H2 "Pourquoi la soie de mûrier 22 mommes ?" + texte intégralement remplacé (5 paragraphes), avec liens internes vers `/collections/bandeau-de-sommeil-en-soie`, `/collections/masque-de-sommeil-soie`, `/collections/chouchou-en-soie` et l'article `/blogs/actualites/soie-19-vs-22-mommes-guide`.
- Interface dé-titrée (sitewide, voulu) : newsletter footer (`sections/section-footer-custom.liquid`), popup newsletter (`sections/footer-group.json` — **2e occurrence trouvée en cours de tâche**, pas dans le fichier initialement repéré), panier vide (`snippets/cart-drawer.liquid`), "Craquez aussi pour..." (`snippets/cart-upsell.liquid`), recherche (`snippets/search-modal.liquid`), "Récemment consulté(s)" et "Produits" (`snippets/predictive-search-products-list.liquid`).
- **Point technique découvert en cours de tâche** : plusieurs éléments n'avaient pas de classe CSS propre et s'appuyaient entièrement sur la typographie native du thème liée à leur balise (`h2`/`h3`/`h4` stylés globalement via `var(--font-hN--*)`). Un simple changement de balise aurait changé le rendu visuel. Corrigé soit en ajoutant la classe utilitaire `.h4` déjà utilisée ailleurs dans le thème pour ce cas précis, soit en recopiant explicitement les propriétés manquantes (poids, interlignage, letter-spacing, casse, marge) via `var(--font-hN--*)` pour un rendu identique. Sens inverse pour `.collections-showcase__title` (span→h3) : neutralisation explicite du style H3 hérité pour revenir à l'apparence du span d'origine.

**Performance** :
- Hero : `fetchpriority="high"` + `width`/`height` déjà présents nativement dans `sections/hero.liquid` (aucune modification nécessaire).
- 7 images sans `width`/`height` trouvées et corrigées en passant d'un `<img src="...">` manuel à `image_url | image_tag` (auto-calcul des dimensions) : carte QR + 3 pictos rituel (`section-qr-rituel.liquid`), 3 vignettes d'articles (`section-homepage-blog.liquid`).
- `og:image` forcé en `https://` (`snippets/meta-tags.liquid`), `og:image:secure_url` l'était déjà.

**JSON-LD** (`layout/theme.liquid`) : `potentialAction`/`SearchAction` retiré du bloc `WebSite`, Organization/WebSite conservés intacts. JSON validé après coup.

**Écarts avec les chiffres du brief** :
- Mon audit du DOM réellement rendu ne trouve ni 75/133 images sans dimensions, ni 12 images avec un ALT identique, ni 13 ALT vides (39 `<img>` au total, 0 manquant après fix). Le carrousel évoqué (§4.4) est très probablement le widget Instagram **Instafeed** (app nfcube) : chargé en JS asynchrone après le `load` de la page, ses images n'existent pas dans le HTML servi par Shopify — pas modifiable depuis le thème. À confirmer visuellement par Pierre, mais pas d'action possible côté code si c'est bien la source.
- "H3 vide dans le tiroir recherche" (§3.7) : introuvable, ni dans le code ni dans le HTML rendu (aucun heading vide sur la page). Possible état dynamique JS non observable en navigateur statique — non traité faute de l'avoir localisé.

**Scripts tiers homepage (§6, rapport uniquement, rien retiré)** : GTM (bloquant, snippet classique) + gtag.js (`async`) — `layout/theme.liquid`. Lucky Orange (`defer`, bloc d'app). Microsoft Clarity (async, snippet standard, bloc d'app) — **doublon fonctionnel avec Lucky Orange** (les deux font de l'enregistrement de session), à trancher par Pierre. Ecomsend (`defer`, extension d'app). Conversion Bear (trust badge) + Instafeed/nfcube : chargés ensemble via un loader JS asynchrone commun, déclenché après l'événement `load`. Affilae : async, auto-injecté juste après `<body>`. Pas de tag DoubleClick isolé — le remarketing passe par gtag/Google Ads.

**Processus** : brief initialement traité sur le thème non publié "Preprod" (#200546517327) pour validation avant publication, conformément à la consigne "je valide et je publie moi-même". Sur confirmation explicite de Pierre ("pousse direct en prod"), poussé directement sur le thème live 'Prod' (#199323648335) à la place.

`shopify theme check` : 362 erreurs / 1413 warnings (légèrement sous la référence 365/1415, aucune régression — écarts pré-existants sans lien avec les fichiers modifiés). **Vérifié en live** : structure de titres exacte au §2 du brief (un seul H1, extraction complète de tous les headings conforme), ordre des cartes, 4 liens internes, og:image https, SearchAction absent, 2 occurrences newsletter corrigées, 0 image sans dimensions.

**Non vérifié** : captures desktop/mobile avant/après, test Lighthouse, Rich Results Test (pas d'outil navigateur disponible dans cette session pour les exécuter) — à faire par Pierre ou lors d'une prochaine session outillée pour ça.

## SEO de la fiche « Bandeau de sommeil en soie » (2026-11-13)

Brief complet de Pierre : structure de titres du gabarit produit (partagé avec masque/chouchou, voulu), JSON-LD Product unique, nettoyage de 8 formulations interdites, SEO produit + collection. Travail fait **directement sur le thème live 'Prod' (#199323648335), à la demande explicite de Pierre** (brief §0.1) — pas de passage par un thème de préproduction cette fois. 8 fichiers modifiés + Admin API (produit + collection).

**Sauvegarde préalable** (brief §0.2, obligatoire) : `shopify theme pull` du thème #199323648335 complet dans `/Users/dejonghe/Documents/GitHub/andromeda-backups/20261113-232603/` avant toute modification.

**Structure de titres** (gabarit produit, donc répercuté aussi sur masque et chouchou — voulu par le brief) :
- Barre sticky d'ajout au panier (`sections/product-information.liquid`) : `<h3>` (nom du produit, avant le H1 de la page) → `<p>`, avec recopie explicite de `font-family/line-height/letter-spacing/text-transform/color` du preset H3 sur la classe `.sticky-add-to-cart__title` pour préserver le rendu.
- "Les plus d'Andromeda" (`text_wygLa9`) : `<h4>` → `<p>` dans les 3 templates produit.
- 4 pictos ("Rituel de sommeil exclusif inclus", "Soie de mûrier 22 mommes", "Packaging premium", "Satisfaction client") : `<h6>` → `<p>` dans les 3 templates produit.
- "Vous aimerez aussi..." (`text_cbcgyb`) : `<h3>` → `<h2>`, texte → "Vous aimerez aussi" (wrapper `type_preset: "h4"` : aucun impact visuel, la classe `.text-block.h4` régit déjà l'apparence indépendamment de la balise interne).
- "Foire aux questions" (`text_kPXt6y`) : `<h3>` → `<h2>`, texte → "Questions fréquentes".
- **Limitation technique découverte** : le réglage "texte" des blocs produit est de type `richtext` (`blocks/text.liquid`), un format assaini par Shopify qui **rejette l'attribut `style` sur n'importe quelle balise** (erreur de push confirmée sur `<h2>` et `<p>`). Contrairement aux champs utilisés sur la homepage, impossible d'ajouter un style inline pour compenser un changement de balise. Conséquence concrète : pour "Les plus d'Andromeda" et les 4 pictos (wrapper `type_preset` "custom"/"rte", sans classe de style dédiée au contenu), le passage en `<p>` fait disparaître le style H4/H6 global qui s'appliquait avant — les réglages typographiques "custom" déjà configurés sur ces blocs (et jusqu'ici masqués par la règle CSS plus spécifique sur la balise H4/H6) s'appliquent enfin, ce qui peut légèrement changer l'apparence. Écart réel et incontournable avec la consigne "aucun changement visuel" du brief §0.3, à vérifier visuellement par Pierre.
- "Avis clients" et "Rejoignez-nous sur instagram" : aucun wrapper de titre trouvé côté thème — rendus entièrement par les apps Judge.me et Instafeed respectivement, hors de portée d'une modification thème.
- Titres vides (§2) : recherchés dans les sections produit, les onglets Description/Livraison et les blocs d'icônes — aucun trouvé en l'état du code (les deux sections suspectées, `section-stories.liquid` et `section-comparatif-soie.liquid`, ont déjà un garde-fou `{% if section.settings.title != blank %}`). Le relevé "H1/H4/H2 vides" du brief §6 n'a pas pu être reproduit depuis le code — possible état dynamique JS non observable statiquement.
- Section "Pourquoi la soie ?" (tableau comparatif, `section_comparatif`) : confirmé `"disabled": true` dans le gabarit bandeau, donc pas rendue en live — non prise en compte dans la structure de titres cible (confirmé avec Pierre).

**JSON-LD Product unique** (`snippets/product-jsonld.liquid`) : ajout de `"@id": {{ product.url | append: '#product' | json }}` au bloc Product du thème, pour qu'il partage le même `@id` que le JSON-LD généré par l'app Judge.me (`/products/{handle}#product`, confirmé via le metafield `judgeme.review_widget_json_ld`). Aucun moyen trouvé de désactiver le JSON-LD de Judge.me depuis le thème (aucun réglage visible dans son bloc d'app embed) — l'approche de repli du brief (fusion par `@id` identique) a été appliquée à la place.

**Bug corrigé au passage (hors brief, approuvé par Pierre)** : `sections/section-accordeon-seo.liquid` générait un faux balisage `FAQPage` en traitant les onglets "Description"/"Livraison & Retours" comme de fausses questions-réponses. Supprimé. Sans effet live actuel (section parente `accordeon_produit` désactivée), mais corrige un piège qui se serait activé si la section est un jour réactivée.

**Nettoyage des 8 formulations interdites (§4.5)** — trouvées à 4 emplacements, pas un seul comme le laissait supposer le brief :
- `templates/product.bandeau-de-sommeil.json`, `text_desc` (accordéon Description/Livraison, **en direct**) : contenait tout un paragraphe doublon obsolète (H4 "Un bandeau de sommeil hors du commun", "Obscurité totale pour un sommeil profond", "Confort & élégance", "Le rituel Andromeda"...) en plus de la vraie description produit. Simplifié à `{{ closest.product.description }}` seul.
- `accordeon_produit` (section désactivée, donc sans effet live, mais nettoyée par précaution) : champ `contenu` de l'item "desc" reformulé en paragraphe statique court (impossible d'y mettre `{{ closest.product.description }}` : ce champ est de type `html`, qui n'accepte pas la syntaxe Liquid — confirmé par une erreur de push).
- 2 réponses de FAQ **en direct** (`section_pX6aLk` → `accordion_RLpVzU`, lignes 1 et 2 — "différence 22 vs 19 mommes" et "grade 6A") : reformulées pour retirer "occultation totale grâce à la densité 22 mommes" et "Moins de 5% de la production mondiale", sans rien enlever du sens utile de la réponse. Les 4 autres questions (lavage, QR code, confort dormeur latéral, délais de livraison) ne contenaient aucune formulation interdite — non touchées.
- Vérification finale par recherche textuelle : 0 occurrence restante des 8 formulations dans `templates/product.bandeau-de-sommeil.json`.

**SEO produit** (Admin API, produit `bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus`) :
- Titre (H1) et description complète (§4.1, §4.4) : déjà à jour avant cette session (fait par Pierre le 13/11 à 23h25) — vérifié conforme au brief, non modifié.
- SEO meta-description (§4.3) mise à jour. **Incident lors de la mutation** : un premier appel ne passant que `description` a mis `seo.title` à `null` (le champ `seo` de `productUpdate` remplace l'objet entier, il ne fusionne pas) — détecté immédiatement par requête de contrôle, corrigé dans la foulée en repassant `title` + `description` ensemble. Titre et description confirmés corrects après coup.
- `snippets/meta-tags.liquid` (branche produit `bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus`) : titre/description codés en dur mis à jour pour correspondre exactement au brief (l'ancien texte codé en dur était différent, plus ancien, ni conforme au brief ni à l'admin pré-mise à jour).
- Non touché (hors scope, sans effet live) : les metafields `global.title_tag`/`global.description_tag` du produit contiennent encore l'ancien texte "coffret premium" — vérifié qu'ils ne sont référencés nulle part dans le thème pour les produits (seulement pour les articles), donc sans impact SEO réel. Signalé à Pierre comme nettoyage mineur facultatif.

**Collection "Bandeau pour dormir en soie"** (`bandeau-de-sommeil-en-soie`) :
- Admin API (`collectionUpdate`, un seul appel) : titre "Bandeaux en soie pour dormir" → "Bandeau pour dormir en soie" ; `descriptionHtml` remplacée par le paragraphe court du brief (lien interne vers la fiche bandeau) ; `seo.title` inchangé, `seo.description` mise à jour — titre et description passés ensemble cette fois pour éviter l'incident du nullage.
- `templates/collection.bandeau-soie.json`, section `seo_content` : les 4 blocs à titre ("Pourquoi choisir...", "Pourquoi 22 mommes ?", etc., chacun avec son propre `<h2>`) remplacés par un seul bloc sans titre portant le nouveau texte court, cohérent avec la description Admin.
- Section FAQ séparée (`collection-faq`, balisage `FAQPage` légitime, 4 vraies questions) : **conservée sans modification**, sur choix explicite de Pierre — aucune des 4 questions ne contient de formulation interdite.
- `snippets/meta-tags.liquid` (branche collection `bandeau-de-sommeil-en-soie`) : description codée en dur mise à jour ; titre déjà correct, inchangé.
- Handle non touché, conformément à la consigne.

`shopify theme check` : aucune régression constatée (total inchangé avant/après sur les fichiers modifiés). Tous les fichiers poussés individuellement via `--only` (jamais de push complet du thème).

**Vérification live non concluante** : `/products/bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus`, `/collections/bandeau-de-sommeil-en-soie` et même `/products/masque-de-sommeil-en-soie-de-murier-22-mommes` (non modifié) renvoient `HTTP 429` (rate-limit Cloudflare) de façon persistante sur toute cette session, y compris après une seconde tentative espacée. Le rate-limit semble affecter les pages `/products/` plus largement, pas une URL précise. Confirmation obtenue autrement : `shopify theme check` sans régression, tous les pushes réussis sans erreur, confirmation des valeurs via Admin API pour le titre/description/SEO produit et collection.

**Non vérifié** (pas d'outil navigateur dans cette session) : extraction live des headings (script console), vérification croisée masque/chouchou (régression potentielle du gabarit partagé), captures desktop/mobile avant/après, validation JSON-LD en conditions réelles (Rich Results Test) — à faire par Pierre ou lors d'une prochaine session outillée pour ça.

## Fiche bandeau, 2e passe SEO (2026-11-14)

Suite du brief précédent : FAQ en H3, titre « Avis clients », ordre des sections, taille des titres de la description, tableau comparatif bandeau/masque. Gabarit produit partagé (masque/chouchou impactés, voulu). Travail fait **directement sur le thème live 'Prod' (#199323648335)**, à la demande explicite de Pierre. 5 fichiers modifiés + Admin API (description produit).

**Sauvegarde préalable** : `shopify theme pull` complet du thème #199323648335 dans `/Users/dejonghe/Documents/GitHub/andromeda-backups/20261114-000147/` avant toute modification.

**FAQ en H3** (`blocks/_accordion-row.liquid`) : ce bloc est **partagé** par tous les accordéons du thème, y compris l'accordéon Description/Livraison du produit — envelopper systématiquement le titre dans un `<h3>` aurait donc aussi ajouté un H3 autour de « Description » et « Livraison & Retours », non prévu par la structure cible. Ajout d'un réglage optionnel `heading_tag` (checkbox, désactivé par défaut partout) : seul le titre de chaque ligne FAQ l'active. Rendu HTML conditionnel (`<h3 class="details__header-heading">` seulement si l'option est activée) + classe CSS de reset (`display:contents; font:inherit; letter-spacing:inherit; text-transform:inherit; color:inherit; margin:0`) pour conserver exactement le rendu et la mise en page actuels (icône + texte + chevrons alignés comme avant). Activé sur les 6 questions de la FAQ bandeau/masque et les 8 de la FAQ chouchou, dans les 3 gabarits produit (`templates/product.json`, `product.chouchou.json`, `product.bandeau-de-sommeil.json`).

**Titre « Avis clients »** : ajout d'un bloc `text` natif (`<h2>Avis clients</h2>`, `type_preset: "h4"`, même pattern que le titre « Vous aimerez aussi » du bloc recommandations) juste avant le widget d'avis Judge.me, dans les 3 gabarits. Le bloc d'app Judge.me (`shopify://apps/judge-me-reviews/blocks/review_widget/...`) n'expose aucun réglage de titre dans son schéma — impossible de savoir depuis le thème s'il affiche lui-même un titre en double ; à vérifier visuellement par Pierre (non vérifiable cette session, voir plus bas).

**« Rejoignez-nous sur instagram »** : confirmé à nouveau non modifiable depuis le thème — ce texte est un réglage de l'app Instafeed (`title`), mais la balise HTML qui l'entoure est générée par le code de l'extension de l'app, inaccessible à une modification théhème. Même conclusion que la 1ʳᵉ passe.

**Ordre des sections** (3 gabarits) : la séquence était Recommandations → Avis clients → FAQ. Repositionné en Avis clients → FAQ → Recommandations, conformément à la structure cible §1. Masque utilise `templates/product.json` (gabarit par défaut, `templateSuffix` vide), chouchou `templates/product.chouchou.json` — les deux ont la même structure de sections que le bandeau et ont donc reçu le même changement d'ordre.

**Taille des titres dans la description produit** (`assets/base.css`, règle `[data-template="product"] accordion-custom .details-content h2/h3`) : la règle existante (ajoutée en avril/septembre, avant cette session) forçait déjà une taille réduite (20px/17px) mais en police Raleway, pas en police de marque. **Point soumis à Pierre** : son brief demandait de garder la police de marque GC Amelie Promised, ce qui contredisait ce qui était réellement en ligne. Sur son choix explicite (« Passer en GC Amelie Promised »), la règle a été réécrite : police GC Amelie Promised, taille en `clamp()` responsive (H2 : ≈22px mobile → 28px desktop ; H3 : ≈19px → 24px, par souci d'harmonie avec le H2), poids 400 (cohérent avec les autres titres GC Amelie du site), couleur inchangée (#1C1A18), marges ajustées (1.75em / 0.5em, 0 sur le premier enfant). Portée strictement limitée à l'intérieur de l'onglet Description de la fiche produit (ne touche aucun autre H1-H6 du site).

**Nouveau tableau comparatif « Bandeau ou masque de nuit : lequel choisir ? »** (Admin API, `descriptionHtml` du produit bandeau) : section ajoutée juste avant `<h2>Livré dans son coffret, prêt à offrir</h2>`, conforme au brief. Prix vérifiés dans Shopify avant insertion : bandeau 39,99 €, masque 35,99 € — identiques à ceux du brief, aucune correction nécessaire. Ajout de styles CSS minimaux pour le tableau (`assets/base.css`, même sélecteur scoping que les H2/H3 de la description) : bordures fines, padding, et `overflow-x: auto` (table en `display: block` scrollable horizontalement) pour la lisibilité sur mobile — aucun autre changement de style.

`shopify theme check` : 362 erreurs / 1413 warnings avant et après (aucune régression). Tous les fichiers poussés individuellement via `--only` : `assets/base.css`, `blocks/_accordion-row.liquid`, `templates/product.json`, `templates/product.chouchou.json`, `templates/product.bandeau-de-sommeil.json`.

**Vérification live bloquée, cause confirmée différente de la 1ʳᵉ passe** : le `HTTP 429` sur `/products/bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus` persiste, mais cette fois confirmé par un fetch indépendant (agent dédié, chemin réseau différent de celui de cette session) qui reçoit un vrai `429` du site avec en-tête `Retry-After: 60` — ce n'est donc pas qu'un artefact du sandbox local, le rate-limit est bien côté site/Cloudflare. Une nouvelle tentative après le délai indiqué n'a pas pu être relancée dans cette session. Confirmation obtenue autrement : `shopify theme check` sans régression, tous les pushes réussis sans erreur, `descriptionHtml` du produit relu et confirmé correct via Admin API après la mutation.

**Non vérifié** (conséquence du point ci-dessus, et absence d'outil navigateur) : extraction live des headings (un seul H1, FAQ bien en H3, ordre des sections), absence de doublon de titre sur le widget Judge.me, rendu du tableau comparatif sur mobile, vérification croisée masque/chouchou, captures desktop/mobile avant/après, validation JSON-LD en conditions réelles. À faire par Pierre ou lors d'une prochaine session dès que le rate-limit se lève.
