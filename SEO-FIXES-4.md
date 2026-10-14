# SEO-FIXES-4 — Collection bandeau & fiche produit bandeau

## Tâche 0 — État des lieux

**Cas A confirmé** : la collection `bandeau-de-sommeil-en-soie` (gid `694716498255`) ne contient **qu'un seul produit** (`bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus`).

Template dédié déjà assigné à cette collection depuis un brief précédent : `templates/collection.bandeau-soie.json` (sections `collection-banner-seo` + `collection-variant-grid` + `collection-seo-content` + `collection-faq`).

## Tâche 1 — H1 de la fiche produit ✅ (aucun changement)

Un seul `<h1>`, égal à `product.title`. Aucune balise H1 dans `product.description`.

## Tâche 2 — H1 et description de la collection ✅ (aucun changement)

`collection-banner-seo.liquid` rend déjà le titre en un seul `<h1>`, et `{{ collection.description }}` sans `strip_html` (le bouton « Lire la suite » masque visuellement via `max-height` CSS, le HTML complet — y compris le lien produit — reste présent dès le chargement initial).

## Tâche 3 — Liens de la collection vers la fiche ✅ (aucun changement)

Le thème (architecture Horizon, pas Dawn) n'utilise jamais le motif `within: collection`. Les cartes produit (`blocks/product-title.liquid`) pointent directement vers `product.selected_or_first_available_variant.url`, qui canonicalise vers l'URL produit. Le titre produit est bien un lien texte cliquable.

## Tâche 4 — Cas A : liens codés en dur vers la collection (commit `230c70c`)

Recherche exhaustive des références à la collection bandeau dans le thème :

- **Hero home** (`templates/index.json`) : pointait déjà vers le produit, rien à changer.
- **Tuile "Collections vedettes" (home)** : pointait vers `/collections/bandeau-de-sommeil-en-soie`. Ajout d'un setting optionnel `link_override` sur le bloc "collection" de `section-collections-vedettes.liquid` (vide par défaut — n'affecte pas les tuiles masque/chouchou), réglé sur l'URL du produit pour cette tuile uniquement.
- **Menu actif du header** (`main-menu-test`, assigné dans `header-group.json`) : son méga-menu contient un lien "Bandeau de sommeil en soie" → `/collections/bandeau-de-sommeil-en-soie`. **Ressource Shopify Navigation, pas du code** — à modifier par Pierre dans l'admin (Navigation) s'il veut qu'il pointe vers le produit.
- Footer : aucun lien vers cette collection.

## Tâche 5 — Non applicable (cas B uniquement)

## Hors code — appliqué directement via l'API Admin

Plutôt que de laisser ces champs à saisir manuellement, je les ai mis à jour directement (cohérent avec le reste des briefs de cette série) :

**Produit bandeau**
- Titre (= H1) : `Bandeau de sommeil en soie de mûrier 22 mommes`
- Titre SEO : `Bandeau de sommeil en soie de mûrier 22 mommes – rituel inclus | Andromeda Paris`
- Meta description : `Bandeau de sommeil en soie de mûrier 22 mommes, doux pour la peau et les cheveux. Occultation douce, maintien sans pression, livré avec son rituel de sommeil.`
- Description restructurée avec 4 H2 : *Pourquoi un bandeau de sommeil en soie ?* / *La soie de mûrier 22 mommes* / *Le rituel de sommeil inclus* / *Entretien*.
- Handle inchangé (URL non modifiée).

**Collection bandeau**
- Titre (= H1) : `Bandeaux de sommeil en soie`
- Titre SEO : `Bandeaux de sommeil en soie de mûrier | Andromeda Paris`
- Meta description : `Nos bandeaux de sommeil en soie de mûrier 22 mommes pour des nuits plus douces : occultation légère, confort sans pression, bienfaits pour la peau et les cheveux.`
- Description HTML avec lien vers la fiche produit, ancre « bandeau de sommeil en soie ».

### ⚠️ Point technique découvert en cours de route

Le champ natif `collection.seo.title`/`collection.seo.description` mis à jour via l'API Admin **ne s'est pas répercuté de façon fiable côté Liquid** (retesté à plusieurs reprises, avec cache-busting, sans succès immédiat). Pour garantir un résultat fiable, le titre/description de cette collection sont maintenant codés en dur par handle dans `snippets/meta-tags.liquid` (même pattern déjà utilisé pour les 3 fiches produit) — à garder en tête si ce champ natif doit être modifié à nouveau : il faudra éditer le code, pas seulement l'admin.

## Encore à faire par Pierre dans l'admin

- **Navigation → menu actif (`main-menu-test`)** : modifier le lien "Bandeau de sommeil en soie" du méga-menu pour qu'il pointe vers `/products/bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus` au lieu de la collection (cohérent avec le cas A).
- **Semrush** : ajouter les mots-clés `bandeaux de sommeil en soie` et `bandeau soie nuit` au suivi de position.

## URLs à vérifier

- `/products/bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus`
- `/collections/bandeau-de-sommeil-en-soie`
- `/` (tuile « Collections vedettes »)

## Commits

1. `230c70c` — tuile home vers la fiche produit (Tâche 4, cas A)
2. `92391c8` — titre/description produit + collection (hors code)
