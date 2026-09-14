# Changelog — Chantier SEO technique

Thème de travail : **seo-tech-2026-09-14** (#200837857615), non publié. Rien n'a été poussé sur le thème live (Prod #199323648335).

## Fichiers modifiés

| Fichier | Pourquoi |
|---|---|
| `snippets/meta-tags.liquid` | Bug critique : `render 'seo-content'` isolait la portée des variables, donc aucun title/meta custom n'a jamais fonctionné. `include` (l'alternative qui partage la portée) est bloqué par Shopify sur ce thème. Fix : logique fusionnée directement dans le fichier. |
| `snippets/seo-content.liquid` | Supprimé — devenu inutile après la fusion ci-dessus. Contenait aussi les title/meta corrigés (T3) avant la fusion. |
| `sections/section-footer-custom.liquid` | Tagline footer (FR + EN, visible sur tout le site) : retrait de la mention "certifiée OEKO-TEX®" (non fondée), remplacée par "hypoallergénique". |
| `templates/index.json` | Home : "Notre masque bloque 100% de la lumière" → "Occultation totale grâce à la densité 22 mommes". |
| `sections/section-seo-text.liquid` | Même texte, version anglaise (bloc affiché seulement si `request.locale == 'en'` — actuellement inactif car la langue EN est dépubliée, corrigé par anticipation). |
| `templates/page.faq.json` / `page.faq.en.json` | Page FAQ visible : 3 corrections par langue — "bloque 100%" reformulé, et 2 questions qui affirmaient une certification OEKO-TEX (une réécrite complètement : "Le masque Andromeda est-il certifié ?" → "...est-il sans danger pour la peau ?"). |
| `templates/product.json` (masque) | FAQ produit + 2 blocs description dupliqués + 1 encart carrousel : "bloque 100%" → formule autorisée. |
| `templates/product.bandeau-de-sommeil.json` | Idem masque (FAQ + 2 blocs description + carrousel). |
| `templates/product.chouchou.json` | FAQ Q1 entièrement réécrite (l'ancienne réponse parlait de bloquer la lumière — aucun sens pour un chouchou) ; encart carrousel "Obscurité totale" remplacé par "Cheveux protégés / Réduit frisottis et casse" (pertinent pour ce produit). |
| `layout/theme.liquid` | JSON-LD `FAQPage` : remplacement du bloc codé en dur (identique et faux sur bandeau/chouchou, claims interdits inclus) par une boucle sur `product.metafields.custom.faq` — génère un schema différent et correct par produit, ne s'affiche pas si le métafield est vide. |

## Métafields et metaobjects créés (Admin API, hors code du thème)

- `custom.faq` (type `list.metaobject_reference`) créé sur **Product** et **Collection**, pointant vers le metaobject natif Shopify `shopify--qa-pair` (question / réponse / sources) — pas de type custom créé, réutilisation de l'existant.
- 18 entrées `shopify--qa-pair` créées (6 par produit réel) et attachées au `custom.faq` de chacun des 3 produits (masque, bandeau, chouchou) — contenu identique à ce qui est déjà visible sur chaque fiche, corrigé des claims interdits.

## Ce qui n'a PAS été touché

- Le thème live (Prod #199323648335) — aucune modification n'y a été poussée.
- Les prix, stocks, checkout, apps de paiement.
- Les fichiers de code mort déjà identifiés (`snippets/faq-en-content.liquid`, `sections/section-faq-produit.liquid`) qui contiennent encore les mêmes claims interdits mais ne s'affichent jamais sur le site — laissés en l'état, à nettoyer si tu le souhaites.
- Le seuil de livraison offerte : plusieurs textes (FAQ, descriptions produit) disent encore "dès 55€" alors que le badge produit affiche "dès 65€" — incohérence réelle mais hors périmètre des claims interdits, signalée ici pour arbitrage.

## Vérifications faites (thème de travail seo-tech-2026-09-14, via preview_theme_id)

- Title/meta description conformes au brief sur : home, masque, bandeau, chouchou (curl + Playwright).
- Recherche de claims interdits sur ces 5 pages : aucune occurrence trouvée.
- JSON-LD `FAQPage` : contenu vérifié différent et correct sur les 3 fiches produit (plus aucune confusion masque/bandeau/chouchou).
- Aucune erreur JS introduite (vérifié via `page.on('pageerror')`).
- Capture d'écran de la fiche masque : rendu visuel identique à l'avant, aucune régression.

## Reste à faire (T5 à T8, en attente de ta validation pour lancer)

- T5 : enrichir les 3 collections existantes (masque, bandeau, chouchou) au lieu d'en créer des doublons + créer `coffret-cadeau-soie`.
- T6 : redirections `/en/*` — en attente du `site:` / export Search Console que tu dois m'envoyer.
- T7 : preload de la police GC Amelie Promised (actuellement chargée sans preload), audit de l'impact des 5 scripts de tracking actifs (Clarity, PostHog, Lucky Orange, Google&YouTube, GTM+GA4).
- T8 : noindex sur `/collections/all` et `/search` (actuellement indexables), maillage footer/produit.
