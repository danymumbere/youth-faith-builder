import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
// BLOQUANT (::error::) = l'application est cassée ; AVERTISSEMENT (::warning::) = amélioration conseillée, jamais bloquante à vie
const H = [], S = [];
const hard = m => { m = m.slice(0, 380); if (!H.includes(m) && H.length < 12) { H.push(m); console.log('::error::' + m); } };
const soft = m => { m = m.slice(0, 380); if (!S.includes(m) && S.length < 12) { S.push(m); console.log('::warning::' + m); } };
const walk = d => readdirSync(d).flatMap(f => f === 'node_modules' || f[0] === '.' ? [] : statSync(d + '/' + f).isDirectory() ? walk(d + '/' + f) : [d + '/' + f]);
for (const f of walk('.').filter(f => f.endsWith('.js'))) try { execSync('node --check ' + f, { stdio: 'pipe' }); } catch (e) { const L = String(e.stderr).split('\n'), n = (L[0].match(/:(\d+)$/) || [])[1]; hard(f.slice(2) + ': erreur de syntaxe' + (n ? ' ligne ' + n : '') + ' : ' + (L.find(l => /Error/.test(l)) || '') + ' — « ' + (L[1] || '').trim().slice(0, 110) + ' »'); }
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };
const srv = createServer((q, s) => { const u = q.url.split('?')[0], p = '.' + (u === '/' ? '/index.html' : u); if (!existsSync(p)) { s.statusCode = 404; return s.end(); } s.setHeader('content-type', mime[path.extname(p)] || 'application/octet-stream'); s.end(readFileSync(p)); }).listen(8123);
const b = await chromium.launch(), pg = await b.newPage({ viewport: { width: 390, height: 800 } });
await pg.addInitScript(() => { // mémorise qui écoute quoi : distingue « bouton mort » de « bouton sans effet visible »
  const L = new WeakSet(), o = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (t, ...a) { if (/^(click|pointerup|pointerdown|mousedown|mouseup|touchend|keydown|keyup|change|input|submit)$/.test(t)) L.add(this); return o.call(this, t, ...a); };
  window.__hasL = el => { for (let n = el; n; n = n.parentNode || (n === document ? window : null)) if (L.has(n) || typeof n.onclick === 'function') return true; return false; };
});
pg.on('pageerror', e => { const m = String(e.stack || '').match(/8123\/(js\/[\w-]+\.js):(\d+)/); hard((m ? m[1] : 'js/app.js') + ': erreur JS à l’exécution : ' + e.message + (m ? ' (ligne ' + m[2] + ')' : '')); });
pg.on('console', m => { const t = m.text(); if (m.type() === 'error' && !/Failed to load resource|net::ERR|Failed to fetch|NetworkError|CORS|HTTP \d{3}/i.test(t)) soft('js/app.js: console.error : ' + t); });
pg.on('response', r => { const u = new URL(r.url()); if (u.origin === 'http://localhost:8123' && r.status() >= 400 && u.pathname !== '/favicon.ico') (/\.(js|css)$/.test(u.pathname) ? hard : soft)('index.html: ressource introuvable (' + r.status() + ') : ' + u.pathname); });
await pg.goto('http://localhost:8123/'); await pg.waitForTimeout(2000);
const F = JSON.parse(readFileSync('qa/features.json', 'utf8')), crashed = () => H.some(m => /à l’exécution|erreur de syntaxe/.test(m));
for (const f of F) if (!(await pg.locator('[data-feature="' + f.id + '"]').count())) hard('index.html: fonction ' + f.id + ' absente du HTML (attribut data-feature="' + f.id + '")');
let budget = 160, dlg = false; pg.on('dialog', d => { dlg = true; d.accept().catch(() => {}); });
const SEL = 'button:visible, [role=tab]:visible, summary:visible, a[href^="#"]:visible';
const sig = () => pg.evaluate(() => { const s = document.documentElement.outerHTML + '|' + JSON.stringify(localStorage) + '|' + location.hash + '|' + (document.activeElement && document.activeElement.id) + '|' + scrollY + '|' + document.title; let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h; });
const vis = () => pg.evaluate(() => [...document.querySelectorAll('[data-feature]')].filter(e => e.checkVisibility({ checkVisibilityCSS: true }) && e.getBoundingClientRect().height > 0).map(e => e.dataset.feature));
const btns = () => pg.locator(SEL).evaluateAll(es => es.map(e => ({ id: e.id || '', label: (e.innerText || e.getAttribute('aria-label') || e.getAttribute('href') || '').trim().slice(0, 40) })).filter(b => b.id !== 'tlm-share'));
const loc = b => b.id ? pg.locator('[id="' + b.id + '"]') : pg.locator(SEL).filter({ hasText: b.label }).first();
const seen = new Set(await vis());
const step = async l => { const s0 = await sig(), v0 = await vis(); dlg = false; await l.click({ timeout: 1500 }).catch(() => {}); await pg.waitForTimeout(350); const s1 = await sig(), v1 = await vis(); v1.forEach(f => seen.add(f)); return dlg || s0 !== s1 || v1.length !== v0.length || v1.some(f => !v0.includes(f)); };
const restore = async path => { await pg.goto('http://localhost:8123/'); await pg.waitForTimeout(600); budget--; for (const p of path) { await loc(p).click({ timeout: 1500 }).catch(() => {}); await pg.waitForTimeout(250); } };
const noEffect = new Set();
async function explore(path) { // parcourt jusqu'à 3 clics de profondeur
  for (const b of (await btns()).slice(0, 20)) {
    b.k = b.id || b.label; if (budget <= 0) return; if (path.some(p => p.k === b.k)) continue;
    await restore(path);
    if (!(await step(loc(b)))) {
      if (!path.length && !noEffect.has(b.k) && !crashed()) { noEffect.add(b.k); const live = await loc(b).evaluate(el => window.__hasL(el)).catch(() => true), n = (b.id ? '#' + b.id + ' ' : '') + '« ' + b.label + ' »'; live ? soft('js/app.js: le bouton ' + n + ' a un écouteur mais son clic ne change rien de visible (vérifie qu’il modifie bien l’interface)') : hard('js/app.js: le bouton ' + n + ' n’a AUCUN écouteur de clic (ni lui ni ses parents) : branche-le avec addEventListener'); }
      continue;
    }
    if (path.length < 2) await explore([...path, b]);
  }
}
if (!crashed()) await explore([]); // inutile d'explorer une page plantée : les boutons morts ne seraient qu'une conséquence
if (!crashed()) for (const f of F) if (!seen.has(f.id)) soft('index.html: fonction ' + f.id + ' jamais visible, même après clic sur les boutons (section masquée sans bouton pour l’ouvrir, ou élément factice)');
await restore([]); await pg.waitForTimeout(800);
if ((await pg.innerText('body')).length < 400) hard('index.html: page quasi vide');
if (await pg.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2)) soft('style.css: débordement horizontal sur mobile');
await b.close(); srv.close(); process.exit(H.length ? 1 : 0);
