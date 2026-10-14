# SEO-FIXES-6 — Application des correctifs admin

## Résultat

| | 🔴 | 🟠 | 🟡 |
|---|---|---|---|
| Avant (fin brief n°5) | 25 | 40 | 6 |
| Après (ce brief) | **2** | 37 | **0** |

Les 6 🟡 ont disparu grâce à l'exclusion des 4 brouillons de l'audit (Tâche 1/5). Les 23 🔴 résolus viennent des mutations admin (Tâches 2-4) + des exceptions documentées dans le référentiel (home, bandeau, faux positif « vs »/« ou », Tâche 1).

### Ce qui reste (2 🔴, 37 🟠) — tout est déjà identifié, rien de nouveau

- **1 🔴 — `/pages/politique-retour` (C1, H1 absent)** : correctif de code déjà écrit au brief n°5 (`templates/page.json`), **toujours pas déployé** (push bloqué, voir Tâche 6).
- **1 🔴 — produit masque (C2, titre)** : la mutation `productUpdate` sur `seo.title` a réussi côté API, mais le `<title>` live n'a pas bougé car `snippets/meta-tags.liquid` code ce titre en dur (même pattern que les fiches bandeau/chouchou depuis le brief n°4). Corrigé dans ce fichier — **également pas encore déployé**, même blocage.
- **37 🟠 — toutes C8_anchor_targets** : la carte « collection en vedette » du menu sitewide affiche encore l'ancien titre de la collection masque dans le cache CDN du menu, alors que `collection.title` (« Masques de nuit en soie ») est correct depuis avant ce brief. Comportement déjà documenté au brief n°5 pour la collection bandeau (même cause) — se résorbe généralement de lui-même après republication du menu ou expiration du cache. Rien à faire côté code ou admin.

## Tâche 1 — `seo/keyword-map.json` + script

- Collection masque : `primary: "masque de nuit soie"`, `secondary: ["masques de nuit en soie"]`.
- Retiré `"masque de nuit soie"` des `secondary` du produit masque (évite un faux doublon avec la collection).
- Exception C2 home documentée (vérifie la marque dans `<title>` uniquement) — implémentée dans le script (`p.type === 'home'`).
- Exception C2 bandeau documentée via `"accepted_gaps": ["C2"]` — implémentée dans le script (un contrôle en échec listé dans `accepted_gaps` s'affiche `✅ (accepté)` et ne compte plus dans le total).
- Alias `ou`/`vs` ajouté (`WORD_ALIASES` dans le script) pour le faux positif `soie-19-vs-22-mommes-guide`.
- Les 4 brouillons marqués `"status": "draft-redirect"` : le script les exclut désormais de la boucle de fetch/contrôles.

## Tâche 2-4 — Mutations admin

Détail complet avant/après dans `seo/changelog-admin.md`. Résumé : titre + descriptionHtml du produit masque, seo.title/description de la collection masque, titre + title_tag + (pour l'article avion) lien body des 2 articles. Toutes les mutations ont renvoyé `userErrors: []`.

**Découverte non prévue** : la mutation sur le produit masque n'a pas suffi à changer le `<title>` live à cause d'un override en dur dans le thème — voir `snippets/meta-tags.liquid`, corrigé dans ce brief (fichiers touchés ci-dessous).

## Tâche 5 — Brouillons / redirections : non modifié, commandes prêtes

Aucune publication, suppression ni redirection exécutée. Contexte découvert en vérifiant les redirections existantes : les 3 redirections actuelles font partie d'un ensemble plus large (~30 redirections) qui consolide systématiquement des dizaines de variantes d'URL vers un petit nombre d'articles canoniques — ça ressemble à une stratégie délibérée, pas à un oubli.

Pour chaque brouillon, une seule des options ci-dessous à valider par Pierre :

### `meilleur-masque-de-sommeil-en-soie`
```graphql
# Option A — publier l'article puis supprimer la redirection qui l'empêche d'être visible
mutation { articleUpdate(id: "gid://shopify/Article/<ID_A_RETROUVER>", article: { isPublished: true }) { article { id } userErrors { field message } } }
mutation { urlRedirectDelete(id: "gid://shopify/UrlRedirect/1788780020047") { deletedUrlRedirectId userErrors { field message } } }
```
```graphql
# Option B — ne rien faire (la redirection reste, le brouillon reste un brouillon)
```

### `masque-de-nuit-7-benefices-prouves-sommeil-profond`
```graphql
# Option A — publier puis supprimer la redirection
mutation { articleUpdate(id: "gid://shopify/Article/<ID_A_RETROUVER>", article: { isPublished: true }) { article { id } userErrors { field message } } }
mutation { urlRedirectDelete(id: "gid://shopify/UrlRedirect/1788780544335") { deletedUrlRedirectId userErrors { field message } } }
```
```graphql
# Option B — ne rien faire
```

### `reduire-frottements-nocturnes-visage`
```graphql
# Option A — publier puis supprimer la redirection
mutation { articleUpdate(id: "gid://shopify/Article/<ID_A_RETROUVER>", article: { isPublished: true }) { article { id } userErrors { field message } } }
mutation { urlRedirectDelete(id: "gid://shopify/UrlRedirect/1788780347727") { deletedUrlRedirectId userErrors { field message } } }
```
```graphql
# Option B — ne rien faire
```

### `comment-entretenir-un-masque-de-sommeil-en-soie` (404 pur, aucune redirection)
```graphql
# Option A — publier l'article (aucune redirection à supprimer)
mutation { articleUpdate(id: "gid://shopify/Article/<ID_A_RETROUVER>", article: { isPublished: true }) { article { id } userErrors { field message } } }
```
```graphql
# Option B — créer une redirection vers un article existant pertinent (ex. l'entretien est déjà abordé dans comment-laver-un-masque-en-soie)
mutation { urlRedirectCreate(urlRedirect: { path: "/blogs/actualites/comment-entretenir-un-masque-de-sommeil-en-soie", target: "/blogs/actualites/comment-laver-un-masque-en-soie" }) { urlRedirect { id } userErrors { field message } } }
```

(IDs d'articles à retrouver via `articles(first: 5, query: "handle:<handle>")` le jour où Pierre valide une option — je ne les ai pas requêtés pour éviter de suggérer une publication accidentelle.)

## Tâche 6 — Thème non déployé

Deux fichiers de thème modifiés mais **non poussés** (push bloqué par le classificateur auto-mode, même en ciblant le thème de dev non publié) :
- `templates/page.json` (brief n°5 — H1 de `/pages/politique-retour`)
- `snippets/meta-tags.liquid` (ce brief — titre SEO du produit masque)

Commande à lancer manuellement :
```bash
shopify theme push --store andromeda-paris.myshopify.com --theme 201853239631 --nodelete --only templates/page.json --only snippets/meta-tags.liquid
```
Vérifier `/pages/politique-retour` et le `<title>` de la fiche masque sur ce thème avant de pousser vers le live.

## Tâche 7 — Vérification

`npm run seo:audit -- --base https://www.andromedaparis.com` relancé après les mutations : voir tableau en haut. Les 2 🔴 restants dépendent du déploiement du thème (Tâche 6) ; les 37 🟠 sont un cache CDN du menu qui doit se résorber de lui-même.

## Fichiers touchés

- `seo/keyword-map.json`, `seo/audit-cannibalisation.mjs`, `seo/audit-report.md` (régénéré)
- `seo/changelog-admin.md` (nouveau)
- `seo/a-faire-admin.md` (annoté, pointe vers le changelog)
- `snippets/meta-tags.liquid` (correctif de code, non déployé)
- Admin Shopify : 1 produit, 1 collection, 2 articles (voir `seo/changelog-admin.md`)

## À faire par Pierre

1. Autoriser et lancer le push de `templates/page.json` + `snippets/meta-tags.liquid` vers le thème de dev, vérifier, puis vers le live.
2. Décider du sort des 4 brouillons (Tâche 5 ci-dessus) — commandes prêtes, aucune n'a été exécutée.
3. Après déploiement : relancer `npm run seo:audit -- --base https://www.andromedaparis.com`, objectif 0 🔴 / 0 🟠.
