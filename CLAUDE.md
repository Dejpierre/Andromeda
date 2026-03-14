# Andromeda — Notes projet

## Shopify Theme Push

**Store :** `andromeda-paris.myshopify.com`

### Pousser uniquement les fichiers rituels (section + template + layout)
```bash
shopify theme push --store andromeda-paris.myshopify.com --theme ID_THEME --nodelete --allow-live --only sections/section-rituels.liquid --only templates/page.rituels.json --only layout/rituels.liquid
```

> ⚠️ Remplacer ID_THEME par l'ID du thème live Andromeda.

### Restaurer le thème complet depuis le dépôt local
```bash
mkdir -p /tmp/andromeda-push
cp -r assets blocks config layout locales sections snippets templates /tmp/andromeda-push/
shopify theme push --path /tmp/andromeda-push --store andromeda-paris.myshopify.com --theme ID_THEME --nodelete --allow-live
```

> ⚠️ Ne jamais faire `shopify theme push --live` sans `--only` — cela tente de supprimer tous les fichiers du thème qui ne sont pas en local.

## Cloudflare Worker

**Worker URL :** `https://andromeda-rituels.dejpierre.workers.dev`

### Déployer le worker
```bash
cd worker
wrangler deploy
wrangler secret put SHOPIFY_ADMIN_API_TOKEN
```

# currentDate
Today's date is 2026-03-13.
