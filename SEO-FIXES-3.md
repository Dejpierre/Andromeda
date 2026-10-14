# SEO-FIXES-3 — Ciblage mots-clés home / fiches produit

Suivi Semrush (France, mobile, 15 mots-clés) en place depuis le 13/10/2026. Objectif : un mot-clé principal par page, sans cannibalisation.

Travail fait sur le thème dupliqué (`seo-fixes-2026-10-05`, #201853239631), vérifié, puis poussé en prod avec validation à chaque étape — conformément aux instructions reçues en cours de session.

## Tâche 1 — H1 de la home ✅ (commit `56c9e58`)

Le H1 masqué existait déjà (ajouté lors d'un brief précédent), conformément au cas prévu par le brief : son texte a été mis à jour plutôt que d'en créer un second.

- Avant : *« Andromeda Paris – Masques de sommeil en soie de mûrier 22 mommes »*
- Après : *« Masques de sommeil en soie de mûrier, imaginés à Paris »*

Le H1 reste dans un bloc `custom_liquid` du hero (pas un champ de réglage dédié "titre"), donc éditable via l'éditeur de thème si besoin d'un ajustement rapide, mais pas via un simple champ texte.

**Vérifié** : un seul `<h1>` sur `/`, texte conforme.

## Tâche 2 — Organization + WebSite ✅ (aucun changement nécessaire)

Le thème génère déjà ces deux blocs dans `layout/theme.liquid`, gated sur `request.page_type == 'index'` — plus complets que la suggestion du brief (adresse, contactPoint, foundingDate, 4 `sameAs` au lieu de 2, `SearchAction`). Remplacer par la version minimale du brief aurait été une régression, donc rien touché.

**Écart à faire trancher par Pierre** : le brief donne 2 URLs `sameAs` (Instagram, TikTok) comme "définitives", le code en a 4 (+ Facebook, Pinterest). À confirmer si Facebook/Pinterest doivent être retirés ou si la liste actuelle est la bonne.

**Vérifié en direct** : exactement 1 bloc `Organization` et 1 bloc `WebSite`, JSON valide, uniquement sur `/`.

## Tâche 3 — Liens vers la home ✅ (commit `fbddf03`)

- Logo du header : `href="{{ routes.root_url }}"` déjà correct, `alt="Andromeda Paris"` déjà renseigné côté admin. Il manquait l'`aria-label` sur le lien : ajouté (`"Andromeda Paris – accueil"`).
- Aucun lien restant vers la home via `{{ shop.url }}` sans slash (déjà traité intégralement au brief n°2 — seules occurrences restantes sont dans `email-templates/`, non crawlées, et syntaxiquement correctes de toute façon).

## Tâche 4 — H1 des fiches produit ✅ (aucun changement nécessaire)

Vérifié sur les 3 fiches : un seul H1 par page, identique au titre produit (`product.title`), aucun sous-titre ou texte de section ne vient le remplacer.

## Tâche 5 — Ancres des liens internes vers la fiche masque ⚠️ (rien à coder actuellement)

Recherche exhaustive sur la home : aucun lien **textuel** (hors bouton CTA) ne pointe actuellement vers la fiche masque.
- Le bloc "Guides liés" (brief n°1) ne lie que vers des articles de blog, jamais directement vers un produit — il n'est donc pas concerné par cette tâche telle que décrite.
- Les 2 seuls liens de la home vers la fiche masque sont des boutons CTA (« Shop our mask », « Shop now », « Acheter maintenant ») — explicitement hors scope du brief.

Pas de réglage à ajouter tant qu'aucune section n'a de lien texte vers le masque. À revisiter si une telle section est créée.

## Hors code — à faire par Pierre dans l'admin

- Préférences boutique → titre page d'accueil : `Andromeda Paris – Masques de sommeil en soie de mûrier 22 mommes`
- Préférences boutique → meta description page d'accueil : `Andromeda Paris crée des masques de sommeil, bandeaux et chouchous en soie de mûrier 22 mommes. Une nuit plus douce pour la peau, les cheveux et le sommeil.`
- Fiche masque → titre SEO : `Masque de sommeil en soie de mûrier 22 mommes | Andromeda Paris`
- Fiche bandeau → titre SEO : `Bandeau de sommeil en soie de mûrier – rituel de sommeil inclus | Andromeda Paris`
- Fiche chouchou → titre SEO : `Chouchou en soie de mûrier 22 mommes | Andromeda Paris`
- Articles de blog parlant du masque : ancre « masque de sommeil en soie » vers la fiche masque (pas vers la home).
- **Décision à prendre** : confirmer la liste `sameAs` du schema Organization (garder Facebook/Pinterest ou les retirer).

## URLs à vérifier avant publication

- `/`
- `/products/masque-de-sommeil-en-soie-de-murier-22-mommes`
- `/products/bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus`
- `/products/chouchou-pour-cheveux-en-soie-de-murier-22-mommes`
- Un article de blog, ex. `/blogs/actualites/soie-19-vs-22-mommes-guide`

## Tests à lancer (nécessitent un navigateur, non disponible depuis cet environnement)

- [Rich Results Test](https://search.google.com/test/rich-results) sur `/` → doit détecter Organization.
- Rich Results Test sur la fiche masque → Product doit rester valide (inchangé par ce brief).

## Commits

1. `56c9e58` — H1 de la home (Tâche 1)
2. `fbddf03` — aria-label logo header (Tâche 3)
