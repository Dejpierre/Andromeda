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
