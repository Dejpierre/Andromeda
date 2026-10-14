# SEO-FIXES-5 — Audit anti-cannibalisation

## Objectif du brief

Vérifier qu'aucun mot-clé cible n'a deux pages qui se concurrencent (titre, H1, lien interne), sans toucher aux contenus admin : ceux-ci sont listés pour Pierre dans `seo/a-faire-admin.md`, pas appliqués.

## Tâche 1 — Référentiel + script d'audit

- `seo/keyword-map.json` : 37 URLs indexables recensées (9 mots-clés principaux assignés selon le brief, le reste en `primary: null`). Construit à partir d'une liste exhaustive et vérifiée (`articles(first:100)`, `pages(first:15)`) après une première version contenant des handles d'articles inventés.
- `seo/audit-cannibalisation.mjs` : script Node (cheerio) qui implémente les 12 contrôles C1–C12, paramétrable (`--base`, `--theme-id`, `--cookie`), écrit `seo/audit-report.md`, sort en code 1 si des 🔴 subsistent. Ajouté comme `npm run seo:audit`.
- Deux bugs corrigés en cours de route sur le script lui-même (pas sur le thème) :
  - Les ancres de cartes produit (image + titre + prix) remontaient comme un seul bloc de texte géant, polluant le contrôle C8 sur absolument toutes les pages — corrigé en collapsant les espaces et en ignorant les ancres de plus de 60 caractères.
  - Le contrôle C2 (mot-clé dans titre/H1) faisait une recherche de sous-chaîne stricte, qui échouait dès qu'un mot de liaison s'intercalait (« chouchou**s en** soie » ne contient pas littéralement « chouchou soie »). Une seconde fonction de comparaison, tolérante aux mots de liaison et au singulier/pluriel, a été ajoutée pour ce contrôle spécifiquement.
- Deux pages explicitement exclues du référentiel : `/pages/notre-histoire` (brouillon, `isPublished: false`) et les 6 pages utilitaires `html-sitemap*` générées par l'app de sitemap (hors périmètre éditorial).

## Résultat de l'audit (andromedaparis.com, 2026-10-14)

**Avant corrections : 25 🔴, 40 🟠, 6 🟡.**

Après investigation, ces 71 ❌ se ramènent à un nombre **beaucoup plus restreint de causes racines** (le détail complet reste dans `seo/audit-report.md`) :

| Cause racine | ❌ concernés | Type de correction |
|---|---|---|
| H1 absent sur `/pages/politique-retour` (section `main-page` désactivée dans `templates/page.json`, affiche un hero générique au lieu du vrai contenu) | 1 🔴 | **Code — corrigé** |
| Titre de la collection `masque-de-sommeil-soie` identique au mot-clé du produit masque | 1 🔴 (C5) + 40 🟠 (C8, via la carte « collection en vedette » du menu sitewide) | Admin — listé |
| Titre/H1 du produit masque disent « nuit » au lieu de « sommeil » | 2 🔴 | Admin — listé |
| Titre/H1 de la collection bandeau n'incluent pas « nuit » (mot-clé assigné trop ambitieux) | 1 🔴 | Admin — listé (mineur) |
| Titre de l'article « masque contour yeux vs intégral » n'inclut pas « sommeil »/« des yeux » | 1 🔴 | Admin — listé |
| Titre de l'article « masque de sommeil en soie pour avion » cannibalise le mot-clé du produit | 1 🔴 | Admin — listé |
| 3 brouillons redirigés (301) vers d'autres articles publiés → titre/H1/canonical/description dupliqués en cascade | 18 🔴 + 6 🟡 | Admin — décision à prendre (publier + lever la redirection, ou confirmer qu'elle est volontaire) |
| H1 de la home sans « Andromeda Paris » | 1 🔴 | Aucune (voulu depuis le brief n°3) |
| Faux positif de l'outil (« vs » vs « ou ») | 1 🔴 | Aucune (limite du script, documentée) |

## Tâche 2 — Corrections de code appliquées

- **`templates/page.json`** : la section `main` (type `main-page`, celle qui rend `page.title`/`page.content`, donc le H1) était `"disabled": true`. Conséquence concrète : `/pages/politique-retour` n'affichait **aucun** contenu de politique de retour — juste un hero marketing générique (« La nuit mérite d'être choyée », « Trois engagements, une seule nuit »...) sans rapport avec le sujet de la page. Remis à `"disabled": false`. Corrige aussi incidemment les 6 pages utilitaires `html-sitemap*` qui utilisent le même template par défaut.
- Aucun autre ❌ n'était du code : pas de `within: collection`, pas de canonical cassé, pas d'ancre en dur — les 40 🟠 C8 viennent de `collection.title` (donnée admin), pas d'un lien codé en dur.

⚠️ **Non déployé** : le push vers le thème de dev (`seo-fixes-2026-10-05`, #201853239631) a été bloqué par la classification automatique des commandes (« Production Deploy »), même en ciblant un thème non publié. Il faut relancer manuellement :
```bash
shopify theme push --store andromeda-paris.myshopify.com --theme 201853239631 --nodelete --only templates/page.json
```
puis vérifier visuellement `/pages/politique-retour` sur le thème de dev avant de pousser vers le thème live.

## Tâche 3 — `seo/a-faire-admin.md`

Liste tous les ❌ de contenu ci-dessus avec valeur actuelle / valeur proposée, **sans aucune modification via l'API** (changement de méthode demandé par ce brief, contrairement aux briefs 2 à 4). Inclut aussi la décision à prendre sur les 4 articles brouillons et leurs redirections.

## Tâche 4 — `seo/README.md`

Documente `keyword-map.json`, `npm run seo:audit`, la règle « une page = une entrée dans le référentiel avant publication », et précise explicitement que l'audit n'est pas branché en CI/git hook (à décider par Pierre).

## À faire par Pierre

1. Lire et valider `seo/a-faire-admin.md`, saisir les champs proposés dans l'admin.
2. Décider du sort des 3 articles brouillons redirigés + du brouillon en 404 pur (section 6 de `seo/a-faire-admin.md`).
3. Autoriser le push de `templates/page.json` vers le thème de dev (commande ci-dessus), vérifier `/pages/politique-retour`, puis vers le thème live.
4. Une fois les contenus admin mis à jour : `npm run seo:audit -- --base https://www.andromedaparis.com` pour confirmer 0 🔴.
5. Une semaine après : vérifier l'onglet Cannibalisation de Semrush.

## Point ouvert, non résolu

Écart de comptage des articles : une requête `blogs(first:5) { articlesCount }` renvoie 45, alors que `articles(first:100)` (paginé, exhaustif, `hasNextPage: false`) n'en liste que 21. Le référentiel utilise la liste de 21, qui est la seule vérifiable directement — à signaler si Pierre a connaissance d'articles qui devraient exister mais n'apparaissent pas.
