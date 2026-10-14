# SEO — un mot-clé par page

Objectif : qu'aucun mot-clé cible n'ait deux pages qui se concurrencent (titre, H1, lien interne) sur Andromeda Paris.

## `keyword-map.json`

Référentiel unique : une ligne par URL indexable du site, avec son mot-clé principal (`primary`) et ses mots-clés secondaires (`secondary`). `primary: null` = page sans mot-clé cible assigné (pages légales, collections génériques, articles non prioritaires...).

**Règle : toute nouvelle page indexable (produit, collection, article, page) doit être ajoutée à `keyword-map.json` avant publication**, même avec `primary: null` si elle ne cible rien de précis. C'est ce fichier qui permet à l'audit de savoir quelles pages comparer entre elles.

## `npm run seo:audit`

```bash
npm run seo:audit -- --base https://www.andromedaparis.com
```

Récupère le HTML rendu de chaque URL du référentiel et vérifie 12 points (H1 unique, mot-clé dans le titre/H1, pas de titre/H1/description dupliqué, canonical propre, pas de lien `/collections/*/products/*`, ancres qui pointent vers la bonne page, etc.). Écrit `seo/audit-report.md` et sort en code 1 s'il reste au moins un ❌ 🔴.

Options :
- `--theme-id <id>` : teste un thème dupliqué non publié via `?preview_theme_id=`.
- `--cookie "..."` : rejoue un cookie de prévisualisation si le thème dupliqué en a besoin.

**Limite connue** : la comparaison de mots-clés est tolérante aux mots de liaison (« masque de nuit en soie » matche « masque ... soie ») mais pas aux synonymes (« vs » ≠ « ou »). Un ❌ peut donc être un faux positif si le mot-clé est exprimé différemment dans le contenu — vérifier manuellement avant de corriger.

## Ce que l'audit ne fait pas

Il ne corrige rien automatiquement et ne touche jamais aux admin (titres SEO, descriptions, H1 produits/collections/articles) — ces changements restent listés dans `seo/a-faire-admin.md` pour validation manuelle.

Il n'est **pas branché en CI ni en git hook** — à faire uniquement si Pierre valide ce choix, car un 🔴 bloquant sur chaque commit/déploiement est une décision d'équipe, pas un défaut par défaut.
