/**
 * Cloudflare Worker — API Rituels Moona
 *
 * GET /api/audio?t=TOKEN&c=matin|journee|soir
 *   → valide le token dans Shopify Metaobjects
 *   → retourne { url: "https://cdn.shopify.com/..." }
 *
 * Variables d'environnement à configurer dans Cloudflare :
 *   SHOPIFY_STORE_URL        ex: moona-9413.myshopify.com
 *   SHOPIFY_ADMIN_API_TOKEN  ex: shpss_...
 *   SHOPIFY_API_VERSION      ex: 2024-10
 *   ALLOWED_ORIGIN           ex: https://moona-9413.myshopify.com
 */

const VALID_CATEGORIES = ['sommeil'];

const LLMS_TXT = `# Andromeda Paris

> Masques de sommeil en pure soie de mûrier Grade 6A, 22 mommes — accessoires de sommeil haut de gamme, fabriqués et expédiés depuis Paris.

Andromeda Paris est une marque française fondée en 2024, spécialisée dans les masques de sommeil premium. Nos masques sont fabriqués en soie de mûrier Grade 6A (classification maximale, moins de 5 % de la production mondiale), 22 mommes, certifiés OEKO-TEX® STANDARD 100. Chaque commande est livrée avec un accès exclusif à un espace rituel sonore (sons binauraux, pluie, forêt, océan).

## Produits

- [Masque de sommeil soie de mûrier 22mm Grade 6A](https://www.andromedaparis.com/products/masque-pure-soie-de-murier-22-mommes): Pure soie de mûrier Grade 6A, 22 mommes. Opacité totale, thermorégulation naturelle, hypoallergénique, certifié OEKO-TEX® STANDARD 100. Élastique réglable en soie. Disponible en plusieurs coloris. Prix : 35,99 €.

## Pages utiles

- [FAQ — 15 questions fréquentes](https://www.andromedaparis.com/pages/faq): Réponses complètes sur la soie (grades, mommes, entretien), les certifications, la livraison, les retours et le QR code rituel.
- [Journal Andromeda](https://www.andromedaparis.com/blogs/actualites): Articles sur le sommeil, les propriétés de la soie de mûrier, les rituels de nuit.
- [Contact](https://www.andromedaparis.com/pages/contact): Service client — contact@andromedaparis.com

## Informations clés

- Matière : soie de mûrier (Bombyx mori), Grade 6A, 22 mommes
- Certification : OEKO-TEX® STANDARD 100 — aucune substance nocive, adapté peaux sensibles
- Opacité : 100 % (obscurité totale garantie)
- Élastique : réglable, en soie, sans pression ni marques au réveil
- Entretien : lavage main eau froide ou machine 30 °C cycle délicat, séchage à plat
- Prix : 35,99 €
- Livraison France : 2–4 jours ouvrés, offerte dès 65 €
- Livraison internationale : 5–10 jours ouvrés
- Retours : gratuits sous 30 jours
- Fondée : 2024, Paris, France
- Contact : contact@andromedaparis.com
- Instagram : https://www.instagram.com/andromeda_paris/
`;

// ─── GraphQL query ─────────────────────────────────────────────────────────────

const QUERY = `
  query GetRituelByToken($query: String!) {
    metaobjects(type: "acces_rituel", first: 1, query: $query) {
      nodes {
        fields {
          key
          value
          reference {
            ... on GenericFile {
              url
            }
            ... on MediaImage {
              image { url }
            }
            ... on Video {
              sources { url mimeType }
            }
          }
        }
      }
    }
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function json(data, status = 200, origin = '*') {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store',
    },
  });
}

function corsPreflightResponse(origin) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

function getFieldValue(fields, key) {
  return fields.find(f => f.key === key)?.value ?? null;
}

function getAudioUrl(fields, category) {
  const fieldKey = `audio_${category}`;
  const fallbackKey = 'audio_matin';
  const field = fields.find(f => f.key === fieldKey) || fields.find(f => f.key === fallbackKey);
  if (!field) return null;

  // Fichier générique (mp3, wav, etc.)
  if (field.reference?.url) return field.reference.url;
  // Image (peu probable pour audio, mais au cas où)
  if (field.reference?.image?.url) return field.reference.image.url;
  // Vidéo/audio Shopify
  if (field.reference?.sources?.length) {
    const preferred = field.reference.sources.find(s =>
      s.mimeType?.startsWith('audio/')
    ) || field.reference.sources[0];
    return preferred?.url ?? null;
  }

  return null;
}

// ─── Fetch Shopify metaobject ─────────────────────────────────────────────────

async function fetchRituel(token, env) {
  const url = `https://${env.SHOPIFY_STORE_URL}/admin/api/${env.SHOPIFY_API_VERSION || '2024-10'}/graphql.json`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': env.SHOPIFY_ADMIN_API_TOKEN,
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { query: `token:${token}` },
    }),
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status}`);
  }

  const data = await res.json();

  if (data.errors?.length) {
    throw new Error(`GraphQL: ${JSON.stringify(data.errors)}`);
  }

  return data.data?.metaobjects?.nodes?.[0] ?? null;
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const requestOrigin = request.headers.get('Origin') || '';
    const allowedOrigin = env.ALLOWED_ORIGIN || '*';
    const isLocalhost = requestOrigin.startsWith('http://127.0.0.1') || requestOrigin.startsWith('http://localhost');
    const origin = isLocalhost ? requestOrigin : allowedOrigin;
    const url = new URL(request.url);

    // Preflight CORS
    if (request.method === 'OPTIONS') {
      return corsPreflightResponse(origin);
    }

    // llms.txt — lisible par les AI crawlers
    if (url.pathname === '/llms.txt') {
      return new Response(LLMS_TXT, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Route API rituels
    if (url.pathname !== '/api/audio') {
      return json({ error: 'Not found' }, 404, origin);
    }

    if (request.method !== 'GET') {
      return json({ error: 'Method not allowed' }, 405, origin);
    }

    const token    = url.searchParams.get('t')?.trim();
    const category = url.searchParams.get('c')?.trim().toLowerCase();

    // Validation des paramètres
    if (!token || !category) {
      return json({ error: 'Paramètres manquants (t, c)' }, 400, origin);
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return json({ error: 'Catégorie invalide' }, 400, origin);
    }

    // Sécurité : token ne doit pas contenir de caractères GraphQL dangereux
    if (!/^[a-zA-Z0-9_\-]{8,64}$/.test(token)) {
      return json({ error: 'Token invalide' }, 400, origin);
    }

    try {
      const metaobject = await fetchRituel(token, env);

      // Token introuvable
      if (!metaobject) {
        return json({ error: 'Token non reconnu' }, 401, origin);
      }

      const { fields } = metaobject;

      // Accès désactivé
      const actif = getFieldValue(fields, 'actif');
      if (actif === 'false') {
        return json({ error: 'Accès désactivé' }, 403, origin);
      }

      // Récupère l'URL audio pour la catégorie demandée
      const audioUrl = getAudioUrl(fields, category);

      if (!audioUrl) {
        return json({ error: `Aucun audio disponible pour "${category}"` }, 404, origin);
      }

      return json({ url: audioUrl }, 200, origin);

    } catch (err) {
      console.error('[Worker]', err.message, err.stack);
      return json({ error: 'Erreur serveur', detail: err.message }, 500, origin);
    }
  },
};
