# Audit SEO technique — Andromeda Paris

Date : 2026-09-14
Périmètre : lecture seule. Aucune modification de fichier, de thème, de produit ou de réglage n'a été faite pendant cet audit.
Thème live audité : **Prod (#199323648335)**, en synchro avec le dépôt git (à une exception près, voir note en bas).

---

## 🔴 Finding critique — le mécanisme de title/meta description du thème est mort depuis le début

C'est la découverte la plus importante de cet audit et elle change l'approche de T3.

**Constat :** `layout/theme.liquid` inclut `snippets/meta-tags.liquid`, qui lui-même fait `{%- render 'seo-content' -%}`. Le fichier `snippets/seo-content.liquid` contient toute la logique de title/meta description par type de page (produit, collection, article, etc.), avec des valeurs différentes par handle.

**Le bug :** en Liquid Shopify, `render` isole complètement la portée des variables — contrairement à `include` (déprécié mais qui partage la portée). Toutes les instructions `assign seo_title = ...`, `assign seo_description = ...` et `assign seo_noindex = true` faites *à l'intérieur* de `seo-content.liquid` sont perdues dès que le `render` se termine. Résultat : dans `meta-tags.liquid`, `seo_title` et `seo_description` sont **toujours vides**, et le `{{ seo_title | default: page_title }}` retombe systématiquement sur `page_title`/`page_description` — les objets natifs Shopify, alimentés par les champs "Titre SEO" / "Description SEO" de l'admin (Réglages produit/page, ou Réglages > Préférences pour la home).

**Vérifié en direct (curl sur le site live, aucune modification faite) :**

| Page | Title attendu par le code | Title réellement servi |
|---|---|---|
| Home | `Masque Sommeil Soie 22 Mommes \| Andromeda Paris` | `Masque de Sommeil Soie \| Andromeda Paris` |
| `/pages/faq` | `FAQ — Masque de Sommeil en Soie \| Andromeda Paris` | `FAQ — Masque de nuit en soie de mûrier \| Andromeda Paris` |
| Fiche masque | `Masque Sommeil Soie de Mûrier 22 Mommes — Andromeda` | `Masque de nuit en soie de mûrier 22 mommes \| Andromeda Paris` |

Confirmé côté Admin API : `product.seo.title` / `product.seo.description` du masque correspondent exactement à ce qui est servi — la preuve que ce sont ces champs natifs qui pilotent tout, pas le thème.

**Conséquence grave — claim interdit déjà en ligne :** la meta description de la **page d'accueil** vient de `shop.description` (Réglages > Préférences) et contient, mot pour mot, **deux formulations interdites par le brief** :
> "Masque de sommeil en soie de mûrier 22 mommes grade 6A. **Certification OEKO-TEX. Bloque 100% de la lumière.** Qualité premium."

C'est ce que Google affiche potentiellement déjà en snippet de recherche pour la requête la plus importante du site. Ce n'est pas un risque théorique dans du code mort : c'est du texte actif, indexable, aujourd'hui.

Autre conséquence : le `assign seo_noindex = true` prévu pour `/pages/rituels` (ligne 45 de `seo-content.liquid`) **n'a jamais été appliqué** — le noindex de cette page n'a probablement jamais fonctionné (je n'ai pas pu confirmer le statut exact de cette page précise, elle répond 404 sur l'URL testée, à vérifier avec le bon handle).

**Ce que ça change pour T3 :** éditer `seo-content.liquid` pour ajouter le bandeau/les chouchous ne servirait à rien tant que le bug de scope n'est pas corrigé. Deux options, à valider avec toi avant d'agir :
1. **Corriger le thème** : remplacer `render` par `include` dans `meta-tags.liquid` (partage la portée, résout tout d'un coup) — mais `include` est déprécié par Shopify et peut un jour disparaître ; ou restructurer pour que `meta-tags.liquid` fasse les `assign` lui-même.
2. **Écrire directement dans les champs natifs Shopify** (`product.seo`, `page.seo`, `shop.description`) via l'API Admin — plus simple, plus robuste, et c'est ce que Google utilise réellement déjà. Risque : si l'app SEOAnt AI SEO est configurée pour ré-écrire ces champs automatiquement, mes changements seraient écrasés — **à vérifier de ton côté dans les réglages de l'app** avant qu'on choisisse cette voie.

Je recommande l'option 2 (plus simple, plus fiable), combinée à un fix mineur du thème (le bug de scope reste un bug à corriger même si on migre vers les champs natifs, pour que `seo_noindex` fonctionne enfin sur les futures pages qui en ont besoin — T8 en dépend).

---

## T1.1 — Thème et apps

**Thème live :** Prod, ID `199323648335`, OS 2.0. Trois thèmes non publiés existent déjà : `Horizon` (#193139212623), `Preprod` (#200546517327), `correction balise test` (#200546681167 — créé lors d'un chantier précédent, sans lien avec ce brief).

**Apps injectant du script (app embeds actifs, `config/settings_data.json`) :**

| App | Bloc | Actif |
|---|---|---|
| Sendwill (email popups) | `app` | ✅ |
| SEOAnt AI SEO | `seoant-core` | ✅ |
| Google & YouTube (Channel) | `store_widget` | ✅ |
| Judge.me Reviews | `judgeme_core` + `cart_drawer_widget` | ✅ |
| Microsoft Clarity | `clarity_js` | ✅ (le bloc `brandAgents_js` est désactivé) |
| SW Back-in-stock | `bis-switch` | ✅ |
| PixieHog (PostHog) | `posthog_js_web` | ✅ |
| Lucky Orange (heatmaps/replay) | `lucky_orange_tracking` | ✅ |
| Inbox (chat) | `chat` | ❌ désactivé |
| Rubik Variant Images | — | ❌ désactivé |

**Constat T7 en germe :** 5 scripts de tracking/analytics tournent en parallèle en plus de GTM + GA4 + Google Ads (Clarity, PostHog, Lucky Orange, Google&YouTube, GTM) — c'est beaucoup de JS tiers pour du Core Web Vitals. À challenger en T7.

Le shop metafield `seoantAppSiteSpeedUpV2.switch` vaut `"0"` — le bloc `{% include 'SEOAnt-SpeedUp' %}` conditionnel dans `theme.liquid` est donc actuellement **inactif**.

**Metafields custom existants :** un seul, `custom.titre_court_panier` (Product, single_line_text_field). **Aucun `custom.faq` n'existe** sur Product ni Collection — à créer pour T4/T5.

**Reviews :** Judge.me est déjà installé et déjà branché dans le JSON-LD (`product.metafields.judgeme.review_widget_data`) et dans `blocks/andromeda-review-highlight.liquid` / `blocks/product-title.liquid`. Pas de Loox détecté. Le brief mentionne "Judge.me / Loox, je m'en occupe côté admin" — Judge.me semble déjà en place, pas d'action requise de mon côté au-delà de ce qui existe.

---

## T1.2 — Extraction theme.liquid

- **Hreflang :** aucune balise `hreflang` nulle part dans le code (confirmé par grep sur tout le repo). Normal : Shopify génère le hreflang automatiquement via `content_for_header`, seulement quand plusieurs marchés/langues avec `webPresence` sont configurés. Voir T1.3 — actuellement un seul marché actif, donc pas de hreflang généré du tout.
- **Canonical :** géré par `snippets/meta-tags.liquid` via l'objet natif `canonical_url` — jamais surchargé ailleurs dans le code (bonne pratique, à vérifier en live que ça exclut bien `?variant=` et que la pagination collection s'auto-référence — comportement standard Shopify, mais à confirmer avec un test réel en T2).
- **Title / meta description :** voir le finding critique ci-dessus — mécanisme cassé, tout part des champs natifs Shopify.
- **JSON-LD présent (6 blocs dans `theme.liquid`) :**
  1. `BreadcrumbList` — product/article/collection/blog. Fonctionne (ne dépend pas du bug render).
  2. `Product` — sur les fiches produit : name, image, description, brand, `AggregateOffer` (prix en euros via `divided_by: 100.0`, correct), `aggregateRating` conditionnel sur Judge.me (bien fait, pas de note fictive), `shippingDetails`, `hasMerchantReturnPolicy`. Solide, déjà proche de ce que T4 demande. Il manque `sku`.
  3. **`FAQPage` sur toutes les fiches produit — 🔴 problème sérieux** : le contenu est **codé en dur et identique pour tous les produits**, pas de branchement par `product.handle`. Sur la fiche du **bandeau** ou des **chouchous**, ce JSON-LD affiche donc des questions/réponses qui parlent du "masque" — et surtout, il contient **littéralement les deux claims interdits** : *"Le masque bloque-t-il vraiment 100% de la lumière ?"* / *"Elle bloque 100% de la lumière"* et *"Le masque est-il certifié ? Oui. Le masque Andromeda est certifié OEKO-TEX® STANDARD 100..."*. C'est actif en ce moment sur le live, dans du Schema.org que Google peut afficher en rich result. À corriger en priorité dans T4 (migration vers le métafield `custom.faq` par produit, avec les formulations autorisées).
  4. `FAQPage` sur `/pages/faq` — même souci, contenu OEKO-TEX + "bloque 100%" en dur, plus long (14 questions). Même remède.
  5. `BlogPosting` — sur les articles. Propre, pas de souci identifié.
  6. `Organization` + `WebSite` — sur la home, dans un `@graph`. Propre : nom, logo, adresse, contactPoint, `sameAs` (Instagram, Facebook, Pinterest, TikTok). **Manque le lien Amazon brand store** mentionné dans le brief T4 — à ajouter si tu me donnes l'URL.
- **Preload :** l'image `product.featured_image` est déjà préchargée en `fetchpriority="high"` avec `imagesrcset` (ligne 45-53) — bon point, T7 est déjà partiellement fait ici.
- **Polices :** `GC Amelie Promised` est chargée via `@font-face` custom (ligne 541) **sans `<link rel="preload">`** — vraie opportunité T7. `Raleway` est configuré via le sélecteur de police natif Shopify (`type_body_font: raleway_n4` dans `settings_data.json`) — Shopify gère lui-même le preload/self-hosting de cette police, rien à faire. **Aucune trace de Sfizia ou Cormorant Garamond** dans le repo — pas de dette de police héritée à supprimer, contrairement à l'hypothèse du brief.

---

## T1.3 — Markets, langues, domaines

Interrogé via l'API Admin (lecture seule) :

- **Un seul marché actif : "France"** (`fr`, primaire, `enabled: true`). Pas de `webPresence` dédié (pas de sous-dossier/domaine séparé configuré).
- **Langues du shop :** `fr` (primaire, publiée) et **`en` (Anglais) existe mais `published: false`**.

**Ça explique le bug rapporté.** Il n'y a pas de "marché EN" actif au sens Shopify Markets — juste une langue anglaise qui a été ajoutée un jour (probablement publiée un temps, générant des URLs `/en/...` que Google a crawlées et indexées), puis dépubliée. Résultat : les vieilles URLs `/en/*` que Google connaît encore renvoient une vraie 404.

**Vérifié en direct :**
```
curl -I https://www.andromedaparis.com/en/products/masque-de-sommeil-en-soie-de-murier-22-mommes
→ HTTP 404 (pas de redirection, 404 sec)
```

**Décision à prendre par toi (T2) :** puisqu'il n'y a pas de "marché à désactiver" à proprement parler (il ne l'est déjà plus), la question est : est-ce que je (a) supprime complètement la langue `en` des réglages du shop pour que Shopify ne la propose plus jamais, en plus de créer les redirections 301 des anciennes URLs `/en/*` vers leur équivalent FR — ou (b) je laisse la langue `en` dormante et je fais uniquement les redirections. Dans les deux cas il me faut la liste exacte des URLs `/en/*` que Google a indexées (Search Console → Pages → filtrer `/en/`, ou le `site:andromedaparis.com` que tu proposais de me coller).

---

## T1.4 — Redirections existantes

35 redirections actives (`urlRedirects`). Aperçu :
- La quasi-totalité concerne déjà la **consolidation blog** (37 → 14 articles) — ce travail semble **déjà largement fait**, avant même la réception du `redirects.csv` annoncé dans le brief. Je vérifierai les doublons quand tu m'enverras le fichier.
- **Aucune redirection `/en/*` n'existe actuellement** — confirme qu'il reste 100% du travail T2/T6 à faire sur ce point.
- Une redirection a une cible suspecte : `/products/masque-de-sommeil-en-soie-22-mommes-biologique` → `/#seogid661639`. Ce format `#seogid...` ressemble à un ancre générée par un outil SEO (probablement SEOAnt) plutôt qu'une vraie URL de destination — à vérifier, ça ressemble à une redirection cassée ou mal configurée. Deux autres redirections ont le même pattern (`/blogs/masque-yeux-pour-dormir-guide-choix-2026-7906-62` et `/blogs/journal`).

Pas de chaîne A→B→C détectée dans les 35 entrées actuelles (je revérifierai une fois le CSV fusionné).

---

## T1.5 — Robots / indexation actuelle

Vérifié en direct, aucune balise `noindex` trouvée sur :
- `/collections/all` → HTTP 200, pas de `noindex`
- `/search?q=...` → HTTP 200, pas de `noindex`

`/sitemap.xml` répond HTTP 200 (généré par Shopify, pas un fichier du thème — je ne peux pas en inspecter le contenu depuis le repo, à vérifier en T8 via l'URL live une fois les nouvelles collections créées).

---

## T1.6 — Collections existantes vs. les 4 collections prévues en T5

Avant de créer quoi que ce soit, un point important : **2 des 4 collections proposées existent probablement déjà, sous un handle différent** :

| Handle proposé (brief) | Collection existante trouvée | Conflit ? |
|---|---|---|
| `masque-de-nuit-soie` | `frontpage` — "Masque de sommeil en soie" (1 produit) | ⚠️ Le produit masque est déjà rattaché à cette collection existante sous un autre handle |
| `bandeau-de-nuit-soie` | `bandeau-de-sommeil-en-soie` — "Bandeau de sommeil en soie" (1 produit) | ⚠️ Quasi doublon exact, juste "nuit" vs "sommeil" |
| `chouchou-en-soie` | `chouchou-en-soie` — "Chouchou en soie" (1 produit) | 🔴 **Handle identique** — la collection existe déjà telle quelle |
| `coffret-cadeau-soie` | aucune trouvée | ✅ Vraiment nouvelle |

Créer les 4 collections telles que décrites dans le brief créerait des doublons/quasi-doublons sur 3 des 4 — ce qui va à l'encontre de l'esprit du chantier (éviter la cannibalisation, ne pas éparpiller le maillage). Je propose qu'on **réutilise/enrichisse les 3 collections existantes** (nouveau title/meta + section de texte SEO + FAQ dessus) plutôt que d'en créer des neuves, et qu'on ne crée que `coffret-cadeau-soie`. À valider avec toi avant de toucher aux collections.

---

## Ce qu'il me manque pour continuer

1. **Le `site:andromedaparis.com`** que tu proposais de coller (T1) — pour repérer précisément les URLs EN orphelines indexées, le blog non redirigé, les doublons `?variant=`.
2. **Le `redirects.csv`** de la consolidation blog (37 → 14) — pour vérifier contre les 35 redirections déjà en place et éviter les doublons/chaînes.
3. **Décision sur le mécanisme title/meta** (finding critique ci-dessus) : je corrige le bug de scope dans le thème, ou je bascule sur les champs natifs Shopify (mon conseil), ou les deux ?
4. **Décision sur les 4 collections T5** : je réutilise les 3 existantes ou je force la création de nouvelles collections dédiées comme littéralement écrit dans le brief ?
5. **Confirmation sur SEOAnt AI SEO** : sais-tu si cette app réécrit automatiquement les champs SEO natifs (title/description produits, description du shop) ? Ça détermine si l'option "champs natifs" tiendra dans le temps.
6. Le lien **Amazon brand store** pour compléter le `sameAs` de l'Organization schema (T4).

Rien n'a été modifié. J'attends ton feu vert sur les points ci-dessus avant de commencer T2.

---

*Note technique : `layout/theme.liquid` a une modification non commitée dans le repo local, sans lien avec ce chantier — un fix GA4 (suppression d'un appel de tracking dupliqué) déjà validé avec toi séparément, poussé uniquement sur le thème de test "correction balise test", jamais sur le live. Je le laisse de côté, il n'affecte aucune des balises SEO auditées ici.*
