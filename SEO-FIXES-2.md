# SEO-FIXES-2 — Correctifs SEO restants andromedaparis.com

Suite à l'audit Semrush du 05/10/2026 (0 lien cassé, 0 erreur 4xx, 0 erreur de données structurées, 0 H1 dupliqué — 1 erreur "meta descriptions dupliquées" restante + avertissements).

Thème de travail : duplicata non publié `seo-fixes-2026-10-05` (#201853239631). Rien n'a été poussé sur le thème live sans instruction explicite.

## 0. Prérequis bloquant découvert en cours de Tâche 1 (commit `4f6944f`)

En travaillant sur les meta descriptions, j'ai découvert que **`snippets/meta-tags.liquid` ne fonctionnait pas du tout** : il faisait `{% render 'seo-content' %}`, et `{% render %}` isole complètement le scope Liquid — tous les `assign seo_title` / `assign seo_description` faits dans `seo-content.liquid` étaient perdus. Résultat : chaque page affichait le même titre/description générique, retombant sur `shop.description` (qui contient déjà en ligne l'ancienne allégation "Bloque 100% de la lumière. Certification OEKO-TEX.").

Ce bug était documenté dans un audit précédent (`audit.md`, 14/09) resté sans suite. Avec ton accord, j'ai récupéré et intégré ce travail :

- **Fusionné** la logique de `seo-content.liquid` directement dans `meta-tags.liquid` (suppression du `render`), puis **supprimé** `seo-content.liquid`.
- **Retiré `shop.description` de toutes les chaînes de fallback** du fichier (y compris Open Graph / Twitter Cards) : ce champ natif contient une allégation non conforme et ne doit plus jamais apparaître. Ajouté une branche dédiée `404` avec un titre/description propres pour que les pages non gérées explicitement (ex. page introuvable) ne retombent plus sur rien de problématique.
- **Retiré les allégations non vérifiables** partout dans le thème : "bloque 100% de la lumière" → "occultation totale grâce à la densité 22 mommes" ; "certifié/certifiée OEKO-TEX®" → "hypoallergénique". Fichiers concernés : footer, `templates/index.json`, `templates/page.faq.json` + `.en.json`, les 3 templates produit, et la page "Qui sommes-nous" (`section-a-propos.liquid` + `templates/page.a-propos.json`, découverte en cours de route — elle affichait encore "Certifiée OEKO-TEX®" trois fois).
- **Supprimé un second schéma FAQPage** : `/pages/faq` affichait DEUX blocs JSON-LD `FAQPage` — un dynamique (généré par `section-faq-page.liquid` à partir du contenu visible, correct) et un codé en dur dans `layout/theme.liquid` qui dupliquait l'ancien contenu (toujours en français même sur la version anglaise, et jamais corrigé par le chantier de septembre). Le bloc en dur est supprimé ; il ne reste que la version dynamique, toujours synchronisée avec le contenu affiché.

## Tâche 1 — Meta descriptions uniques (commit `4f6944f`)

Chaque type de page a maintenant un titre et une description dédiés, générés directement dans `meta-tags.liquid` :

| Page | Titre | Description |
|---|---|---|
| Home | Andromeda Paris — Masques, bandeaux et chouchous en soie de mûrier grade 6A | Masques de nuit, bandeaux et chouchous... Occultation totale... Livraison offerte dès 55 €. |
| `/collections` | Toutes nos collections \| Andromeda Paris | Toutes les collections Andromeda Paris... |
| `/collections/all` | Tous nos accessoires en soie de mûrier \| Andromeda Paris | Découvrez tous nos accessoires... |
| `/pages/qui-sommes-nous` | Qui sommes-nous — L'histoire d'Andromeda Paris | Derrière Andromeda, Marion et Pierre Dejonghe... |
| `/policies/*` (8 pages) | `{{ page_title }} — Andromeda Paris` | Texte dérivé du titre de la politique, distinct par page |

Vérifié en direct (curl sur le thème dupliqué) : home, `/collections`, `/collections/all`, `/pages/qui-sommes-nous`, 2 pages policies, `/pages/faq`, et les 3 pages produit — toutes affichent désormais un titre/description propre et distinct.

## Tâche 2 — Titre `/collections/all` trop court

Résolu de fait par la Tâche 1 : "Tous nos accessoires en soie de mûrier | Andromeda Paris" (56 caractères). Aucun correctif séparé nécessaire.

## Tâche 3 — `?page=1` dans la pagination (commit `c604cd2`)

Le thème a **deux** composants de pagination distincts :
- `snippets/pagination-controls.liquid` (générique, utilisé ailleurs dans le thème)
- `sections/section-andromeda-blog.liquid` (pagination custom du blog, celle réellement vue sur `/blogs/actualites`)

Les deux générait des liens précédent/suivant avec `?page=1` explicite au lieu de l'URL de base. Corrigé via `| remove: '?page=1'` sur les trois liens (précédent, page, suivant) de chaque fichier.

**Non corrigeable en code** : la balise `<link rel="prev" href="...?page=1">` est injectée nativement par la plateforme Shopify (pas par un fichier du thème) — limitation plateforme, sans impact SEO réel (Google n'utilise plus `rel=prev/next` pour l'indexation).

## Tâche 4 — Audit des `<img>` sans `alt` (commit `b15370d`)

### Découverte en cours d'audit : un bug de précédence Liquid répandu

En vérifiant home + les 3 pages produit en direct, plusieurs images (logo du header, bannière hero de la home, icônes "étoiles") n'avaient **aucun attribut `alt`**, alors que le code source semblait pourtant en définir un, du type :

```liquid
alt: image.alt | default: 'Texte par défaut'
```

En Liquid, à l'intérieur des arguments nommés d'un filtre (`image_tag: ..., alt: X | default: Y`), le `| default: Y` ne s'applique PAS à `X` seul — il se raccroche à toute la chaîne de filtres précédente (`image_url | image_tag: ...`). Comme cette chaîne produit toujours une chaîne non vide (le tag `<img>` lui-même), le `default` ne se déclenche jamais, et quand `X` est vide, Shopify **supprime silencieusement l'attribut `alt` entier** plutôt que d'écrire `alt=""`.

Ce pattern existait dans **16 fichiers, 26 occurrences** à travers tout le thème (pas seulement les 4 pages auditées — logo du header, mega menu, cartes produits/collections, "qui-sommes-nous", panier, etc.). Corrigé partout en pré-calculant l'`alt` via un `assign` séparé avant l'appel du filtre.

En plus de ça, `blocks/image.liquid` (le bloc "image" générique, utilisé sur les 4 pages ciblées) n'avait **carrément aucun** paramètre `alt` dans son appel à `image_tag` — ajouté.

### Résultat vérifié en direct
- Home : 0 `<img>` sans `alt`
- Masque, bandeau, chouchou : 0 `<img>` sans `alt`

### Non corrigeable en code
- Le `<img>` de secours généré par le filtre natif Shopify `video_tag` (snippet vidéo du produit masque) : ce filtre ne permet pas de passer un `alt` personnalisé à son balisage de secours. Limitation de la plateforme.

### Code mort repéré mais non modifié (aucun risque live)
`sections/section-why-masque.liquid`, `sections/section-faq-produit.liquid`, `blocks/_collection-image.liquid`, `blocks/_slide.liquid`, `blocks/_layered-slide.liquid` contiennent encore d'anciennes allégations ou n'ont pas d'`alt`, mais ne sont référencés par aucun template actuel — laissés en l'état, cohérent avec la décision prise en septembre sur ce type de fichiers.

## Hors code — actions à faire dans l'Admin Shopify

- **`shop.description`** (Admin → Préférences) contient encore "Bloque 100% de la lumière. Certification OEKO-TEX." Le code ne l'affiche plus nulle part, mais ce champ reste visible par d'éventuels outils tiers (apps, API) — à corriger directement dans l'Admin.
- **Alt text des images uploadées** (bibliothèque "Fichiers" et médias produit) : plusieurs images (logo, bannière hero, icônes) n'avaient pas d'alt renseigné dans l'Admin — le code retombe maintenant sur un texte générique (`shop.name` ou le titre du produit/variant) à la place de rien, mais un vrai texte descriptif par image reste préférable pour le SEO/accessibilité.
- Reste de la liste du brief d'origine (meta description qui-sommes-nous si tu veux un texte différent du fallback actuel, titre SEO page contact, alt text médias produit en détail, libellés de liens policies, lien footer "Toutes les collections", 8 pages orphelines) — toujours à traiter, inchangé depuis le brief initial.

## À vérifier après publication

- Re-lancer l'audit Semrush pour confirmer 0 erreur sur "Duplicate meta descriptions" et "Title element is too short".
- Vérifier si l'app **SEOAnt** (notée comme installée dans `audit.md`) ré-écrit les champs SEO natifs — non vérifié ce chantier-ci, risque faible puisque le fix du jour est basé sur le code du thème et non sur les champs natifs, mais à garder en tête.
- Point ouvert, hors scope de ce chantier : `/en/pages/faq` affiche le même JSON-LD FAQPage que la version française (le contenu visible anglais, lui, est correct) — à creuser si le marché anglophone est une priorité.

## URLs à tester sur le thème live après publication

- `/`
- `/collections`
- `/collections/all`
- `/pages/qui-sommes-nous`
- `/policies/refund-policy` (ou toute autre page `/policies/*`)
- `/pages/faq`
- `/blogs/actualites?page=2`
- `/products/masque-de-sommeil-en-soie-de-murier-22-mommes`
- `/products/bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus`
- `/products/chouchou-pour-cheveux-en-soie-de-murier-22-mommes`

## Commits

1. `4f6944f` — fix du bug de portée Liquid (Tâche 1) + retrait des allégations non vérifiées
2. `c604cd2` — retrait de `?page=1` de la pagination du blog (Tâche 3)
3. `b15370d` — correctifs des attributs `alt` manquants (Tâche 4)
