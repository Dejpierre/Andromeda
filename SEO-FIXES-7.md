# SEO-FIXES-7 — Un mot-clé unique par page

Ce document couvre le brief du 21/10 (« un mot-clé unique par page ») et ses deux suites de correction du 25-26/10. Il remplace la version précédente du même nom (brief du 14/10, dont les éléments déjà exécutés — qui-sommes-nous — ont été vérifiés et conservés).

## Résultat final — vérification réelle en ligne

Toutes les valeurs ci-dessous sont lues directement dans le HTML servi par `www.andromedaparis.com` (pas l'API), vérifiées le 26/10 via le navigateur de Pierre après que le site a bloqué mes propres requêtes automatisées pendant plus de 40 minutes (HTTP 429).

| # | URL | Mot-clé attendu | `<title>` | `<h1>` | ✅/❌ |
|---|---|---|---|---|---|
| 1 | `/` | andromeda paris | Andromeda Paris – Masques de sommeil en soie de mûrier | *(non relevé, déjà stable depuis le brief n°3)* | ✅ |
| 2 | `/pages/qui-sommes-nous` | soie de mûrier | Notre histoire — Andromeda Paris : soie de mûrier grade 6A | Notre histoire : la soie de mûrier au service du sommeil | ✅ (+ H2 « La soie de mûrier, c'est quoi ? » confirmé) |
| 3 | `/pages/faq` | — (pas de mot-clé propre) | FAQ Andromeda Paris : soie, entretien, livraison et retours | Questions fréquentes Andromeda Paris | ✅ |
| 4 | `/blogs/actualites` | blog sommeil | Blog sommeil & soie : conseils pour mieux dormir \| Andromeda Paris | Blog sommeil & soie | ✅ |
| 5 | `/collections/masque-de-sommeil-soie` | masque de nuit soie | Masques de nuit en soie de mûrier \| Andromeda Paris | Masque de nuit en soie de mûrier | ✅ (corrigé en cours de vérification, voir plus bas) |
| 6 | `/collections/bandeau-de-sommeil-en-soie` | bandeau pour dormir | Bandeau pour dormir en soie de mûrier \| Andromeda Paris | Bandeaux en soie pour dormir | ✅ |
| 7 | `/collections/chouchou-en-soie` | chouchous en soie | Chouchous en soie de mûrier pour les cheveux \| Andromeda Paris | Chouchous en soie pour les cheveux | ✅ |
| 8 | `/products/masque-de-sommeil-en-soie-de-murier-22-mommes` | masque de sommeil en soie | Masque de sommeil en soie de mûrier 22 mommes 6A \| Andromeda Paris | Masque de sommeil en soie de mûrier 22 mommes — Rituel de sommeil inclus | ✅ |
| 9 | `/products/bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus` | bandeau de sommeil soie | Bandeau de sommeil en soie de mûrier 22 mommes \| Andromeda Paris | Bandeau de sommeil en soie de mûrier 22 mommes | ✅ |
| 10 | `/products/chouchou-pour-cheveux-en-soie-de-murier-22-mommes` | chouchou en soie | Chouchou en soie de mûrier 22 mommes 6A (lot de 2) \| Andromeda Paris | Chouchou en soie de mûrier 22 mommes — lot de 2 | ✅ |
| 11 | `/blogs/actualites/comment-choisir-son-masque-de-sommeil` | meilleur masque de sommeil | Meilleur masque de sommeil : comment bien le choisir ? — Andromeda | Meilleur masque de sommeil : comment bien le choisir ? | ✅ |
| 12 | `/blogs/actualites/masque-contour-yeux-versus-integral` | masque yeux sommeil | Masque yeux sommeil : contour des yeux ou intégral ? — Andromeda | Masque yeux sommeil : contour des yeux ou intégral ? | ✅ |
| 13 | `/blogs/actualites/mulberry-silk-vs-satin-sleep-mask` | soie ou satin | Soie ou satin : quelle différence pour un masque de sommeil ? — Andromeda | Soie ou satin : quelle différence pour un masque de sommeil ? | ✅ |
| 14 | `/blogs/actualites/comment-laver-un-masque-en-soie` | laver soie | Laver la soie : guide pour un masque en soie sans l'abîmer — Andromeda | Comment laver la soie (et un masque en soie) sans l'abîmer | ✅ |
| 15 | `/blogs/actualites/organiser-sommeil-apres-decalage-horaire` | jet lag | Jet lag : retrouver le sommeil après un décalage horaire — Andromeda | Jet lag : comment retrouver le sommeil après un décalage horaire | ✅ |
| 16 | `/blogs/actualites/chouchou-cheveux-en-soie-guide-simple` | comment porter un chouchou en soie | Comment porter un chouchou en soie : coiffures et conseils — Andromeda | Comment porter un chouchou en soie : coiffures et conseils | ✅ |

**16/16 conformes. Aucune cannibalisation détectée entre les pages vérifiées.**

## Bugs trouvés et corrigés pendant la vérification

### 1. Mutation `seo{}` qui remplace tout l'objet au lieu de fusionner

`productUpdate`/`collectionUpdate` avec `seo: { title: "..." }` **efface** `description` si elle n'est pas repassée dans le même appel (et inversement). Deux incidents :
- **Collection masque** : repéré et corrigé dans la foulée pendant le brief du 21/10 (title effacé par un appel description-only).
- **Produit bandeau** : `seo.description` effacée par la mutation title-only de la tâche 2 (brief du 21/10), repérée le 25/10 lors de l'audit systématique de la tâche 1, restaurée avec la valeur du brief n°4.

**Règle désormais appliquée systématiquement** : toujours passer `title` ET `description` ensemble dans `seo: {...}`, même pour ne changer qu'un seul des deux.

### 2. Le thème ne lisait jamais le metafield `global.title_tag` pour les articles

`layout/theme.liquid` → `meta-tags.liquid` utilisait uniquement `article.title | append: ' — Andromeda'`. Toutes les mutations sur ce metafield dans les briefs n°6 et n°7 du 14/10 étaient donc **sans aucun effet** sur le `<title>` réellement affiché.

**Corrigé** : règle générique ajoutée (`article.metafields.global.title_tag.value` si présent, sinon `article.title + " — Andromeda"`). En vérifiant les autres articles avant d'activer cette règle, **3 metafields périmés** ont été trouvés (laissés par d'anciens briefs, jamais relus) — ils auraient fait resurgir un ancien titre dès l'activation : `comment-choisir-son-masque-de-sommeil`, `masque-contour-yeux-versus-integral`, `chouchou-cheveux-en-soie-guide-simple`. Resynchronisés avant déploiement.

### 3. `collection.seo.title` pas fiable côté Liquid (bug déjà documenté au brief n°4, revu ici)

Pendant la vérification en ligne (point 5 du tableau), le `<title>` de la collection masque affichait le fallback générique au lieu de la valeur `seo.title` pourtant correcte côté API — exactement le même symptôme déjà rencontré et contourné pour la collection bandeau au brief n°4. Corrigé en ajoutant un override codé en dur dans `meta-tags.liquid` pour `masque-de-sommeil-soie`, et par précaution pour `chouchou-en-soie` avant de rencontrer le même bug (celle-ci s'est révélée déjà correcte une fois le hardcode en place — impossible de savoir si elle aurait été touchée sans l'override, mais le risque était identique).

**Conséquence pratique à retenir** : pour cette boutique, `collection.seo.title`/`description` natifs ne doivent plus être utilisés seuls pour piloter le `<title>` affiché — toujours accompagner d'un override codé en dur par handle dans `meta-tags.liquid`, comme c'est déjà le cas pour les produits.

## Diff du thème (fichiers modifiés)

- `snippets/meta-tags.liquid` : FAQ (title+H1), blog (title), bandeau/chouchou produits (title codé en dur aligné), règle générique articles + overrides title_tag pour 2 articles, hardcodes collections masque + chouchou (nouveau, suite au bug #3).
- `sections/main-page.liquid` : H1 de la FAQ.
- `templates/collection.bandeau-soie.json` : H2 renommé (« masque de nuit » → « bandeau pour dormir »).
- `templates/product.chouchou.json` : 2 nouvelles questions FAQ (accordéon).
- `seo/keyword-map.json` : réécrit avec le nouveau mapping (un mot-clé par page).

## Tâche 5 bis — Visibilité IA (chouchous cheveux fins) — rappel

- Article chouchou : section « cheveux fins et sensibles » insérée après l'intro.
- Produit chouchou : bloc « Caractéristiques » ajouté en fin de description + 2 nouvelles questions FAQ dans l'accordéon existant (la 3e proposée faisait doublon avec une question déjà là, non ajoutée).

## Tâche 5 — Brouillons

Redirection créée : `comment-entretenir-un-masque-de-sommeil-en-soie` → `comment-laver-un-masque-en-soie`. Les 3 autres brouillons : aucune action (redirections existantes conservées).

## Ce qui reste en attente de Pierre

- Le mot-clé « idée cadeau noël femme » a été assigné à `/blogs/actualites/guide-cadeaux-sommeil-premium` dans le référentiel (tâche 1), mais **l'article n'a pas été retitré** (pas demandé dans la tâche 3) — son title/H1 actuels ne contiennent pas ce mot-clé. L'audit le signale en ❌. À décider : retitrer l'article, ou ajuster le mot-clé du référentiel.
- Décision sur le sort définitif des 3 brouillons encore redirigés (`meilleur-masque-de-sommeil-en-soie`, `masque-de-nuit-7-benefices-prouves-sommeil-profond`, `reduire-frottements-nocturnes-visage`) — inchangée depuis le brief n°6.
