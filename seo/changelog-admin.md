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
