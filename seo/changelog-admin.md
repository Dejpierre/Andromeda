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
