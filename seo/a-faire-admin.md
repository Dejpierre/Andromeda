# À faire dans l'admin — Brief n°5 (audit anti-cannibalisation)

Cette liste couvre tous les ❌ de `seo/audit-report.md` qui sont des problèmes de **contenu** (admin Shopify), pas de code. Contrairement aux briefs précédents, **rien n'a été modifié via l'API** pour cette série : tout est à valider et saisir par Pierre.

## 1. Produit — Masque de sommeil en soie (`masque-de-sommeil-en-soie-de-murier-22-mommes`)

Mot-clé cible : *masque de sommeil en soie*. Le titre et le H1 actuels disent « nuit », pas « sommeil » — le mot-clé cible n'apparaît donc littéralement nulle part sur la page.

| Champ admin | Valeur actuelle | Valeur proposée |
|---|---|---|
| Titre produit (= H1) | `Masque de nuit en soie de mûrier 22 mommes — Rituel de sommeil inclus` | `Masque de sommeil en soie de mûrier 22 mommes — Rituel de sommeil inclus` |
| Titre SEO | `Masque de nuit en soie de mûrier 22 mommes 6A \| Andromeda Paris` | `Masque de sommeil en soie de mûrier 22 mommes 6A \| Andromeda Paris` |
| Meta description | `Masque de sommeil 100 % soie de mûrier 22 mommes, grade 6A, occultant, sangle ajustable. Livré en coffret cadeau + rituel sonore d'endormissement. Livraison ...` | Déjà correcte (contient « sommeil »), aucun changement nécessaire. |

## 2. Collection — `masque-de-sommeil-soie`

**🔴 Cannibalisation confirmée (C5)** : le titre de cette collection (`collection.title`, vérifié via l'API : `Masque de sommeil en soie`) est **identique au mot-clé principal du produit masque**. C'est aussi la cause des 40 ❌ 🟠 C8 répétés sur presque toutes les pages : la carte « collection en vedette » du mega-menu / drawer (sitewide) affiche ce titre en ancre et pointe vers la collection, alors que le texte de l'ancre correspond au mot-clé du produit.

| Champ admin | Valeur actuelle | Valeur proposée |
|---|---|---|
| Titre collection (= H1 par défaut) | `Masque de sommeil en soie` | `Masques de sommeil en soie` (pluriel — même logique déjà appliquée à la collection bandeau au brief n°4) |
| Titre SEO | *(vide, `seo.title` null)* | `Masques de sommeil en soie de mûrier \| Andromeda Paris` |
| Meta description | *(vide, `seo.description` null)* | `Découvrez nos masques de sommeil en soie de mûrier 22 mommes : occultation totale, douceur pour la peau et les cheveux, rituel de sommeil inclus.` |
| Description collection (H1 actuellement rendu : « Masque de nuit en soie de mûrier ») | Reprend « nuit », pas « sommeil » | Aligner sur « masques de sommeil en soie » pour cohérence avec le nouveau titre |

**Note :** une fois le titre renommé au pluriel, les 40 ❌ 🟠 C8 doivent disparaître mécaniquement puisque l'ancre du menu n'affichera plus le mot-clé exact du produit.

## 3. Collection — `bandeau-de-sommeil-en-soie` (mineur, optionnel)

Mot-clé cible assigné : *bandeau soie nuit*. Le titre/H1 actuels (`Bandeaux de sommeil en soie`) ne contiennent pas « nuit ». Ce n'est pas une cannibalisation (rien d'autre ne cible ce terme), juste un écart entre le mot-clé visé et le contenu réel.

| Champ admin | Valeur actuelle | Valeur proposée |
|---|---|---|
| Meta description | `Nos bandeaux de sommeil en soie de mûrier 22 mommes pour des nuits plus douces : occultation légère, confort sans pression, bienfaits pour la peau et les cheveux.` | Ajouter « bandeau de nuit » dans la description, ex. : `Nos bandeaux de nuit en soie de mûrier 22 mommes pour des nuits plus douces : occultation légère, confort sans pression...` |

Alternative plus simple : revoir le mot-clé cible dans `keyword-map.json` pour `bandeau de sommeil en soie` plutôt que `bandeau soie nuit`, si Pierre ne souhaite pas toucher au contenu déjà validé au brief n°4.

**Point technique à vérifier par Pierre :** le titre de cette collection est bien `Bandeaux de sommeil en soie` côté admin (vérifié via l'API), mais la carte du menu (drawer mobile) affiche encore le singulier `Bandeau de sommeil en soie` lors de nos tests — probablement un cache CDN Shopify en retard sur le menu. Si ça persiste après quelques jours, resauvegarder le menu de navigation (Online Store → Navigation) pour forcer l'invalidation.

## 4. Article — `masque-contour-yeux-versus-integral`

Mot-clé cible : *masque de sommeil contour des yeux*. Le titre/H1 actuels (« Masque contour yeux versus intégral ») ne contiennent ni « sommeil » ni « des yeux ».

| Champ admin | Valeur actuelle | Valeur proposée |
|---|---|---|
| Titre article (= H1) | `Masque contour yeux versus intégral : le bon choix` | `Masque de sommeil contour des yeux ou intégral : comment choisir` |
| Titre SEO | `Masque contour yeux versus intégral : le bon choix — Andromeda` | `Masque de sommeil contour des yeux ou intégral : comment choisir — Andromeda` |

## 5. Article — `masque-de-sommeil-en-soie-pour-avion`

**🔴 Cannibalisation confirmée (C5)** : le titre commence exactement par le mot-clé principal du produit masque (« Masque de sommeil en soie »), ce qui crée une concurrence directe avec la fiche produit sur sa propre requête cible.

| Champ admin | Valeur actuelle | Valeur proposée |
|---|---|---|
| Titre article (= H1) | `Masque de sommeil en soie pour avion` | `Voyager serein : bien choisir son masque pour dormir en avion` |
| Titre SEO | `Masque de sommeil en soie pour avion — Andromeda` | `Voyager serein : bien choisir son masque pour dormir en avion — Andromeda` |

## 6. Articles brouillons / redirections à décider

Quatre articles sont en brouillon (`isPublished: false`). Trois d'entre eux sont malgré tout accessibles en HTTP 200 car une **redirection d'URL** (Online Store → Navigation → Redirections d'URL) les renvoie vers un autre article publié. C'est la cause de tous les ❌ 🔴 C3/C4/C6/C12 restants (titres, H1 et canonical dupliqués entre paires de pages).

| Brouillon | Redirige actuellement vers | Décision à prendre |
|---|---|---|
| `meilleur-masque-de-sommeil-en-soie` *(cible du brief)* | `/blogs/actualites/comment-choisir-son-masque-de-sommeil` | **Action requise avant publication** : rédiger le contenu, publier l'article, **puis supprimer cette redirection** — sinon même publié, l'URL continuera de rediriger vers l'autre article et restera invisible. |
| `masque-de-nuit-7-benefices-prouves-sommeil-profond` | `/blogs/actualites/lumiere-et-melatonine-sommeil` | À Pierre de décider : soit publier ce contenu et supprimer la redirection, soit confirmer que la redirection est volontaire (contenu abandonné, trafic renvoyé vers l'article existant) — dans ce cas, aucune action. |
| `reduire-frottements-nocturnes-visage` | `/blogs/actualites/decouvrez-les-bienfaits-de-la-soie-pour-votre-peau` | Même décision à prendre que ci-dessus. |
| `comment-entretenir-un-masque-de-sommeil-en-soie` | *(aucune — 404 pur)* | À Pierre de décider : publier, ou ajouter une redirection vers un article pertinent existant (ex. `comment-laver-un-masque-en-soie`) pour éviter un 404 si l'URL est encore référencée ailleurs (sitemap, liens externes). |

## 7. Page d'accueil — aucun changement

Le H1 de la home (« Masques de sommeil en soie de mûrier, imaginés à Paris ») ne contient pas « Andromeda Paris » : c'est voulu (choix du brief n°3), le titre et la description portent déjà la marque. L'audit le signale en 🔴 mais ce n'est pas une anomalie à corriger.

## 8. Faux positif connu de l'outil d'audit

`/blogs/actualites/soie-19-vs-22-mommes-guide` : le script signale l'absence du mot-clé *soie 19 ou 22 mommes* car le contenu dit « vs » plutôt que « ou ». C'est une limite de l'outil (voir `seo/README.md`), pas un vrai problème de contenu — aucune action nécessaire.
