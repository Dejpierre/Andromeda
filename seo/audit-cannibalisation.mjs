#!/usr/bin/env node
// Audit anti-cannibalisation — voir seo/README.md pour l'usage.
//
// Usage :
//   node seo/audit-cannibalisation.mjs --base https://www.andromedaparis.com
//   node seo/audit-cannibalisation.mjs --base https://www.andromedaparis.com --cookie "cart=...; ..." --theme-id 123456789
//
// --theme-id (optionnel) ajoute ?preview_theme_id=<id> à chaque URL pour tester
// un thème dupliqué non publié sans avoir à exposer de session interactive.
// --cookie (optionnel) est rejoué tel quel sur chaque requête (utile si le
// thème dupliqué nécessite le cookie de prévisualisation déjà amorcé).

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import * as cheerio from 'cheerio';

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const args = { base: null, cookie: null, themeId: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--base') args.base = argv[++i];
    else if (argv[i] === '--cookie') args.cookie = argv[++i];
    else if (argv[i] === '--theme-id') args.themeId = argv[++i];
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
if (!args.base) {
  console.error('Usage: node seo/audit-cannibalisation.mjs --base <url> [--cookie "..."] [--theme-id <id>]');
  process.exit(2);
}
const BASE = args.base.replace(/\/$/, '');

function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // accents
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Tolère un éventuel "s" final (singulier/pluriel) mot à mot.
function keywordVariants(keyword) {
  const norm = normalize(keyword);
  const words = norm.split(' ');
  const variantsPerWord = words.map((w) => {
    if (w.endsWith('s') && w.length > 3) return [w, w.slice(0, -1)];
    return [w, w + 's'];
  });
  // Produit cartésien limité : on ne varie qu'un mot à la fois pour éviter l'explosion combinatoire.
  const variants = new Set([norm]);
  variantsPerWord.forEach((opts, idx) => {
    opts.forEach((opt) => {
      const copy = [...words];
      copy[idx] = opt;
      variants.add(copy.join(' '));
    });
  });
  return [...variants];
}

function containsKeyword(haystack, keyword) {
  if (!haystack) return false;
  const normHaystack = normalize(haystack);
  return keywordVariants(keyword).some((v) => normHaystack.includes(v));
}

// Variante tolérante : tous les mots significatifs du mot-clé doivent être
// présents quelque part dans le texte, mais pas forcément consécutifs
// (ex. "masque de sommeil" doit matcher "masque de nuit en soie" → non,
// mais matche "masque, pour un sommeil...": utile pour C2 où la formulation
// naturelle du contenu intercale souvent d'autres mots).
const STOPWORDS = new Set(['de', 'en', 'et', 'la', 'le', 'les', 'un', 'une', 'des', 'du', 'pour', 'à', 'a']);
function containsAllWords(haystack, keyword) {
  if (!haystack) return false;
  const normHaystack = normalize(haystack);
  const words = normalize(keyword)
    .split(' ')
    .filter((w) => w.length > 0 && !STOPWORDS.has(w));
  return words.every((w) => {
    const singular = w.endsWith('s') && w.length > 3 ? w.slice(0, -1) : w;
    const plural = w.endsWith('s') ? w : `${w}s`;
    return normHaystack.includes(singular) || normHaystack.includes(plural);
  });
}

function equalsKeyword(text, keyword) {
  if (!text) return false;
  const normText = normalize(text);
  return keywordVariants(keyword).some((v) => normText === v);
}

async function fetchPage(url) {
  const sep = url.includes('?') ? '&' : '?';
  const fullUrl = args.themeId ? `${BASE}${url}${sep}preview_theme_id=${args.themeId}` : `${BASE}${url}`;
  const headers = { 'User-Agent': 'Mozilla/5.0 (compatible; AndromedaAuditBot/1.0)' };
  if (args.cookie) headers['Cookie'] = args.cookie;
  const res = await fetch(fullUrl, { headers, redirect: 'follow' });
  const html = await res.text();
  return { status: res.status, html, fullUrl };
}

function extractPage(html, pageUrl) {
  const $ = cheerio.load(html);
  const title = $('title').first().text().trim();
  const description = $('meta[name="description"]').attr('content') || '';
  const h1s = $('h1')
    .map((_, el) => $(el).text().trim())
    .get()
    .filter((t) => t.length > 0);
  const canonical = $('link[rel="canonical"]').attr('href') || '';
  const links = $('a[href]')
    .map((_, el) => ({
      href: $(el).attr('href'),
      anchor: $(el).text().replace(/\s+/g, ' ').trim(),
    }))
    .get()
    .filter((l) => l.href && !l.href.startsWith('#') && !l.href.startsWith('mailto:') && !l.href.startsWith('tel:'))
    // Les blocs de carte produit (image + titre + prix) remontent comme une seule
    // ancre géante : ce n'est jamais une vraie ancre de navigation textuelle.
    .filter((l) => l.anchor.length <= 60);
  return { title, description, h1s, canonical, links };
}

function absoluteUrl(path) {
  return `https://www.andromedaparis.com${path}`;
}

async function main() {
  const keywordMap = JSON.parse(readFileSync(join(__dirname, 'keyword-map.json'), 'utf8'));
  const pages = [];

  console.log(`Audit de ${keywordMap.length} pages via ${BASE}${args.themeId ? ` (preview_theme_id=${args.themeId})` : ''}...`);

  for (const entry of keywordMap) {
    process.stdout.write(`  ${entry.url} ... `);
    try {
      const { status, html } = await fetchPage(entry.url);
      if (status !== 200) {
        console.log(`HTTP ${status}`);
        pages.push({ ...entry, status, error: `HTTP ${status}` });
        continue;
      }
      const extracted = extractPage(html, entry.url);
      pages.push({ ...entry, status, ...extracted });
      console.log('ok');
    } catch (e) {
      console.log(`ERREUR (${e.message})`);
      pages.push({ ...entry, error: e.message });
    }
  }

  // ---- Contrôles ----
  const results = pages.map((p) => ({ url: p.url, primary: p.primary, checks: {} }));
  const byUrl = Object.fromEntries(results.map((r) => [r.url, r]));

  // Regroupements pour les contrôles croisés
  const titleGroups = new Map();
  const h1Groups = new Map();
  const descGroups = new Map();
  for (const p of pages) {
    if (p.error) continue;
    if (p.title) {
      const key = normalize(p.title);
      if (!titleGroups.has(key)) titleGroups.set(key, []);
      titleGroups.get(key).push(p.url);
    }
    for (const h1 of p.h1s || []) {
      const key = normalize(h1);
      if (!h1Groups.has(key)) h1Groups.set(key, []);
      h1Groups.get(key).push(p.url);
    }
    if (p.description) {
      const key = normalize(p.description);
      if (!descGroups.has(key)) descGroups.set(key, []);
      descGroups.get(key).push(p.url);
    }
  }

  const homePage = pages.find((p) => p.type === 'home');

  for (const p of pages) {
    const r = byUrl[p.url];
    if (p.error) {
      r.checks = { fetch: { ok: false, detail: p.error } };
      r.extracted = null;
      continue;
    }
    r.extracted = { title: p.title, description: p.description, h1s: p.h1s, canonical: p.canonical };

    // C1 — un seul H1
    r.checks.C1_single_h1 = {
      ok: (p.h1s || []).length === 1,
      severity: '🔴',
      detail: `${(p.h1s || []).length} h1 trouvé(s): ${(p.h1s || []).join(' | ')}`,
    };

    // C2 — mot-clé principal dans title ET h1
    // Tolère les mots de liaison intercalés (ex. "masque de nuit en soie"
    // ne contient pas la sous-chaîne exacte "masque de sommeil en soie",
    // mais contient bien chaque mot significatif du mot-clé) : on vérifie
    // que tous les mots significatifs sont présents, pas une sous-chaîne
    // contiguë stricte.
    if (p.primary) {
      const inTitle = containsAllWords(p.title, p.primary);
      const inH1 = (p.h1s || []).some((h) => containsAllWords(h, p.primary));
      r.checks.C2_primary_in_title_h1 = {
        ok: inTitle && inH1,
        severity: '🔴',
        detail: `title: ${inTitle ? 'ok' : 'absent'} | h1: ${inH1 ? 'ok' : 'absent'}`,
      };
    }

    // C3 — pas de doublon de title
    if (p.title) {
      const group = titleGroups.get(normalize(p.title)) || [];
      r.checks.C3_no_duplicate_title = {
        ok: group.length <= 1,
        severity: '🔴',
        detail: group.length > 1 ? `partagé avec: ${group.filter((u) => u !== p.url).join(', ')}` : 'unique',
      };
    }

    // C4 — pas de doublon de H1
    const dupH1 = (p.h1s || []).filter((h) => (h1Groups.get(normalize(h)) || []).length > 1);
    r.checks.C4_no_duplicate_h1 = {
      ok: dupH1.length === 0,
      severity: '🔴',
      detail:
        dupH1.length > 0
          ? dupH1
              .map((h) => `"${h}" partagé avec ${(h1Groups.get(normalize(h)) || []).filter((u) => u !== p.url).join(', ')}`)
              .join(' ; ')
          : 'unique',
    };

    // C5 — cannibalisation title/H1 : le primary d'UNE AUTRE page ne doit pas démarrer ce title / être ce h1 exact
    const cannibalHits = [];
    for (const other of pages) {
      if (other.url === p.url || !other.primary || other.error) continue;
      const titleStartsWithOther = p.title && normalize(p.title).startsWith(normalize(other.primary));
      const h1EqualsOther = (p.h1s || []).some((h) => equalsKeyword(h, other.primary));
      if (titleStartsWithOther || h1EqualsOther) {
        cannibalHits.push(`${other.url} ("${other.primary}")`);
      }
    }
    r.checks.C5_no_cannibalisation = {
      ok: cannibalHits.length === 0,
      severity: '🔴',
      detail: cannibalHits.length > 0 ? `entre en conflit avec: ${cannibalHits.join(' ; ')}` : 'ok',
    };

    // C6 — canonical absolu, propre, vers soi-même
    const expectedCanonical = absoluteUrl(p.url);
    const canonicalOk =
      !!p.canonical &&
      !p.canonical.includes('?') &&
      (p.canonical === expectedCanonical || p.canonical === expectedCanonical.replace(/\/$/, '') || `${p.canonical}/` === expectedCanonical);
    r.checks.C6_canonical = {
      ok: canonicalOk,
      severity: '🔴',
      detail: `canonical="${p.canonical}" attendu≈"${expectedCanonical}"`,
    };

    // C7 — pas de lien /collections/*/products/*
    const badLinks = (p.links || []).filter((l) => /\/collections\/[^/]+\/products\//.test(l.href));
    r.checks.C7_canonical_product_links = {
      ok: badLinks.length === 0,
      severity: '🟠',
      detail: badLinks.length > 0 ? badLinks.map((l) => l.href).join(', ') : 'ok',
    };

    // C8 — ancre contenant le primary d'une page X doit pointer vers X
    const anchorIssues = [];
    for (const l of p.links || []) {
      for (const other of pages) {
        if (!other.primary || other.error) continue;
        if (containsKeyword(l.anchor, other.primary)) {
          const hrefNormalized = l.href.split('?')[0].replace(/\/$/, '');
          const targetNormalized = other.url.replace(/\/$/, '');
          const matches = hrefNormalized === targetNormalized || hrefNormalized.endsWith(targetNormalized);
          if (!matches) {
            anchorIssues.push(`ancre "${l.anchor}" → ${l.href} (attendu ${other.url})`);
          }
        }
      }
    }
    r.checks.C8_anchor_targets = {
      ok: anchorIssues.length === 0,
      severity: '🟠',
      detail: anchorIssues.length > 0 ? anchorIssues.join(' ; ') : 'ok',
    };

    // C9 — home
    if (p.type === 'home') {
      r.checks.C9_home_title = {
        ok: normalize(p.title).startsWith('andromeda paris'),
        severity: '🟠',
        detail: `title="${p.title}"`,
      };
    } else if (homePage && !homePage.error) {
      r.checks.C9_home_title = {
        ok: !normalize(p.title || '').startsWith('andromeda paris'),
        severity: '🟠',
        detail: normalize(p.title || '').startsWith('andromeda paris') ? 'commence aussi par "Andromeda Paris"' : 'ok',
      };
    }

    // C10 — collection bandeau ne doit pas reprendre le singulier exact du produit
    if (p.url === '/collections/bandeau-de-sommeil-en-soie') {
      const singular = 'bandeau de sommeil en soie';
      const titleHas = normalize(p.title || '').includes(normalize(singular));
      const h1Has = (p.h1s || []).some((h) => normalize(h).includes(normalize(singular)));
      r.checks.C10_collection_not_singular = {
        ok: !titleHas && !h1Has,
        severity: '🟠',
        detail: `title contient singulier: ${titleHas} | h1 contient singulier: ${h1Has}`,
      };

      // C11 — lien vers la fiche produit dans la description (approx : cherché dans tout le HTML de la page)
      const productUrl = '/products/bandeau-de-sommeil-en-soie-rituel-de-sommeil-inclus';
      const hasProductLink = (p.links || []).some((l) => l.href.split('?')[0].replace(/\/$/, '') === productUrl);
      r.checks.C11_collection_links_to_product = {
        ok: hasProductLink,
        severity: '🟡',
        detail: hasProductLink ? 'ok' : `aucun lien vers ${productUrl} trouvé`,
      };
    }

    // C12 — meta description unique
    if (p.description) {
      const group = descGroups.get(normalize(p.description)) || [];
      r.checks.C12_no_duplicate_description = {
        ok: group.length <= 1,
        severity: '🟡',
        detail: group.length > 1 ? `partagée avec: ${group.filter((u) => u !== p.url).join(', ')}` : 'unique',
      };
    }
  }

  // ---- Rapport ----
  let md = `# Audit anti-cannibalisation — ${new Date().toISOString().slice(0, 10)}\n\n`;
  md += `Base testée : \`${BASE}\`${args.themeId ? ` (preview_theme_id=${args.themeId})` : ''}\n\n`;

  const allFailures = [];

  for (const r of results) {
    md += `## ${r.url}${r.primary ? ` — mot-clé : *${r.primary}*` : ''}\n\n`;
    if (r.extracted === null) {
      md += `❌ Page non récupérée : ${r.checks.fetch.detail}\n\n`;
      allFailures.push({ url: r.url, check: 'fetch', severity: '🔴', detail: r.checks.fetch.detail });
      continue;
    }
    md += `- Title : \`${r.extracted.title}\`\n`;
    md += `- Description : \`${r.extracted.description}\`\n`;
    md += `- H1 (${r.extracted.h1s.length}) : ${r.extracted.h1s.map((h) => `\`${h}\``).join(', ') || '(aucun)'}\n`;
    md += `- Canonical : \`${r.extracted.canonical}\`\n\n`;
    md += `| Contrôle | Résultat | Détail |\n|---|---|---|\n`;
    for (const [key, check] of Object.entries(r.checks)) {
      md += `| ${key} | ${check.ok ? '✅' : `❌ ${check.severity}`} | ${check.detail} |\n`;
      if (!check.ok) allFailures.push({ url: r.url, check: key, severity: check.severity, detail: check.detail });
    }
    md += `\n`;
  }

  const severityOrder = { '🔴': 0, '🟠': 1, '🟡': 2 };
  allFailures.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  md += `## Récapitulatif des ❌ (triés par sévérité)\n\n`;
  if (allFailures.length === 0) {
    md += `Aucun échec. 🎉\n`;
  } else {
    md += `| Sévérité | Page | Contrôle | Détail |\n|---|---|---|---|\n`;
    for (const f of allFailures) {
      md += `| ${f.severity} | ${f.url} | ${f.check} | ${f.detail} |\n`;
    }
  }

  const counts = { '🔴': 0, '🟠': 0, '🟡': 0 };
  for (const f of allFailures) counts[f.severity]++;
  md += `\n**Total : ${counts['🔴']} 🔴 critique(s), ${counts['🟠']} 🟠 moyen(s), ${counts['🟡']} 🟡 mineur(s).**\n`;

  writeFileSync(join(__dirname, 'audit-report.md'), md);
  console.log(`\nRapport écrit : seo/audit-report.md`);
  console.log(`Total : ${counts['🔴']} 🔴, ${counts['🟠']} 🟠, ${counts['🟡']} 🟡`);

  process.exit(counts['🔴'] > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
