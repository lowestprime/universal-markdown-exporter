// ==UserScript==
// @name              Universal Markdown Exporter
// @description       Converts most web page elements into clean Markdown with visual element selection and live editor preview support. This Trusted-Types safe script supports extraction and conversion from ChatGPT deep research overlays with sub-element selection inside the maximized panel, including citation/sources/thinking-activity extraction, and Google Gemini deep research reports and canvases, featuring 6 citation styles, YAML frontmatter integration, and exporting to clipboard/file/GitHub/Obsidian.
// @author            lowestprime x Claude Opus 4.6 Max Agent
// @namespace         https://greasyfork.org/en/users/823161-lowestprime
// @license           MIT
// @grant             GM_addStyle
// @grant             GM_registerMenuCommand
// @grant             GM_setClipboard
// @grant             GM_setValue
// @grant             GM_getValue
// @require           https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.0/marked.min.js
// @match             *://*/*
// @match             https://*.web-sandbox.oaiusercontent.com/*
// @exclude           https://accounts.google.com/*
// @exclude           https://accounts.youtube.com/*
// @exclude           https://ogs.google.com/*
// @exclude           https://accountchooser.google.com/*
// @run-at            document-idle
// @icon              data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABHNCSVQICAgIfAhkiAAABBdJREFUaIHtmluIVlUUx39pMup4Q1FrRi1CrMAaREUS75KlBhKKSGAKzkPRQ0lBPngjkIZeBMWHAccH8VIKJQTSIAgWVBQKglco7YYiitrYjONtjg/7G2bPPmt/nvOdtc8ndn5wQM/+77X+i73PnrPP/qCgoKCg4P/Bi8CGAHFfAj4JEDcTc4GodM1Ujt1aintcOW4mTtFT8GnFuAusuBGwSjF2xdQCdwlj7LwTt1kpbiYGAh30NtauEHe1EzMCtivEVeEEcXObM8bsFGIuyxhTjY3EzUXA4ArjNQmxHmSIp86zwH3iJvdWEGuoECcC9qs4VWQ3stGXU8b52hNnoppTJcYjG/05RYxJnhiHVZ0qcgjZ8OKE/X/x9J+t7lQJ3wj9lqDvUk/fNDOkKhxDNv5+mT5PAb97+r0d0qwG9nu1fV3DvKRIrPX0+SOwVzVOIxfQJGgHA20e/eocvKrwFnIBETDa0W716P7Ny6wWl5AL+cLS1Hs0EfBpnmY1eId4EfeBkZbmsKCJgHu5OlXkBr0Lsb+ITME/uo352tTjA3qKuATUWG1nkYv9M2ePqvSjZwV+17q/HP/ozsvZozpbgAvOvevIxR7N11oYRgLTrP+vxz+6r+TuLjBDkffNEdBSRV/B2IVcbCe9/1w9ETTgn8obq+grGEeQi70MPF1FX0FYiH90V5Y09Zht4hPBGeRi7VOKc8CM/K3pswb/6L7maB6r86NK6APcIl7oAWB6SdMPuGK1rcjfpg79MdNUGlmbz4X2N0OZ0lgkhmCOSF8FxgF1mDPdCR79JuCz0r/7Yz791Aq6m5gp/jdm43EO+J4qbi4WAD/ifz6lqwMY4MRpThnjH2Ad5lHIhT7Alx4zt/FvDHwvGGMw50aSvgv5UK278IYA9cU4KCQ/CyzBTOfhwPOY00Nb04aZ/hLuKF8HFgEvAGMxq/leIe8N4t/IVJkjJD3k0W5zdJvLxB2H+axj6/sKusVC/j3pSkjHN06yyx5dnaO7hdkplWMnyQr50NHdIdAo12CeGzvZex7tt44uyRfIsZhn1u5X79G6W8zXE1WQkjriC4hkaKqjuYZZ6JLgjnKrR/edo/soYfxUPEd8BKRpetzRrE2R4xmnb0TP66fNV47m4xQ5EjMC8zJgJ5ruaJY47TcryNPixDgmaH51NOUO6ipmIPHThIOOxv2ZUZrR7WY48VF+w2qvFdqDvYoeFZLNKrU1Ovc7MuRxPwWdsNpanbYuzIIXhFXEC76D2d795dzPspAME/I0In8T+yFDnkdS7uDavm4r5NqRII873YMwHv/7bfc1VynX1UfkCfHrXZFBwD7BQAfmtxpajAJOCnkuAPMrCZh1P1wDTMZsCv4DfsLsfLSZiNlItGOKvRggR0FBQcHjx0Ng/VhKUt8K3AAAAABJRU5ErkJggg==
// @compatible        chrome
// @compatible        firefox
// @compatible        edge
// @compatible        opera
// @compatible        safari
// @compatible        brave
// @version           4.2.0
// @downloadURL       https://update.greasyfork.org/scripts/530139/Universal%20Markdown%20Exporter.user.js
// @updateURL         https://update.greasyfork.org/scripts/530139/Universal%20Markdown%20Exporter.meta.js
// ==/UserScript==
// -----------------------------------------------------------------------
// Based on "MarkDown Cloud Cut Notes" (v2025.03.19) by shiquda and
// ChinaGodMan (https://greasyfork.org/scripts/530139).
//
// Substantially rewritten by lowestprime. 100% Trusted-Types safe.
// -----------------------------------------------------------------------
(function () {
    'use strict';

    const HOSTNAME = location.hostname;
    const IS_DR_IFRAME = HOSTNAME.includes('web-sandbox.oaiusercontent.com');
    const IS_CHATGPT = HOSTNAME === 'chatgpt.com' || HOSTNAME === 'chat.openai.com';
    const IS_GEMINI = HOSTNAME === 'gemini.google.com';

    // =====================================================================
    // TRUSTED-TYPES SAFE GM WRAPPERS
    // =====================================================================
    const _style = (css) => { try { if (typeof GM_addStyle === 'function') return GM_addStyle(css); } catch (_) {} const s = document.createElement('style'); s.textContent = css; (document.head || document.documentElement).appendChild(s); };
    const _clip = (t) => { try { if (typeof GM_setClipboard === 'function') return GM_setClipboard(t); } catch (_) {} try { navigator.clipboard.writeText(t); } catch (_) { const a = document.createElement('textarea'); a.value = String(t || ''); a.style.cssText = 'position:fixed;left:-9999px'; document.body.appendChild(a); a.select(); document.execCommand('copy'); a.remove(); } };
    const _get = (k, d) => { try { if (typeof GM_getValue === 'function') return GM_getValue(k, d); } catch (_) {} try { const v = localStorage.getItem('h2m_' + k); return v != null ? JSON.parse(v) : d; } catch (_) { return d; } };
    const _set = (k, v) => { try { if (typeof GM_setValue === 'function') return GM_setValue(k, v); } catch (_) {} try { localStorage.setItem('h2m_' + k, JSON.stringify(v)); } catch (_) {} };
    const _menu = (l, f) => { try { if (typeof GM_registerMenuCommand === 'function') GM_registerMenuCommand(l, f); } catch (_) {} };

    // =====================================================================
    // CITATION TRACKING
    // =====================================================================
    const cit = {
        m: new Map(), r: new Map(), n: 1,
        reset() { this.m.clear(); this.r.clear(); this.n = 1; },
        add(url, name) {
            const k = normUrl(url);
            if (!this.m.has(k)) { this.m.set(k, this.n); this.r.set(this.n, { href: url, name, k }); this.n++; }
            return this.m.get(k);
        }
    };
    function normUrl(u) { if (!u) return null; try { const o = new URL(u); o.hash = ''; o.searchParams.delete('utm_source'); return o.toString(); } catch (_) { return u.split('#')[0]; } }
    function getDomain(u) { if (!u) return null; try { let d = new URL(u).hostname.toLowerCase().replace(/^www\./, ''); const p = d.split('.'); return p.length >= 2 ? (p.length > 2 && p[p.length - 2].length <= 3 ? p[p.length - 3] : p[p.length - 2]) : p[0]; } catch (_) { return null; } }
    function fc(n, h, s) { const d = getDomain(h) || 'source'; switch (s) { case 'none': return ''; case 'endnotes': return `[${n}]`; case 'footnotes': return `[^${n}]`; case 'inline': return `[${n}](${h})`; case 'parenthesized': return `([${n}](${h}))`; case 'named': return `([${d}](${h}))`; default: return `[${n}]`; } }

    // =====================================================================
    // REACT FIBER CITATION EXTRACTION
    // =====================================================================
    function fiberCites(doc) {
        const map = new Map();
        for (const sup of doc.querySelectorAll('sup')) {
            if (!sup.getAttribute('data-citation-index') && !sup.getAttribute('data-citation-interactive') && !/^\d+$/.test(sup.textContent.trim())) continue;
            const fk = Object.keys(sup).find(k => k.startsWith('__reactFiber'));
            if (!fk) continue;
            let nd = sup[fk];
            for (let i = 0; i < 8 && nd; i++) {
                const p = nd.memoizedProps || nd.pendingProps;
                if (p && p.item) {
                    const urls = [], it = p.item;
                    if (it.reference && Array.isArray(it.reference.safe_urls)) for (const u of it.reference.safe_urls) if (typeof u === 'string' && /^https?:\/\//.test(u)) urls.push(u.replace(/[?&]utm_source=chatgpt\.com/, ''));
                    if (!urls.length && it.url) urls.push(it.url.replace(/[?&]utm_source=chatgpt\.com/, ''));
                    if (!urls.length && it.reference && it.reference.url) urls.push(it.reference.url.replace(/[?&]utm_source=chatgpt\.com/, ''));
                    const uq = [...new Set(urls)];
                    if (uq.length) { map.set(sup, uq); break; }
                }
                nd = nd.return;
            }
        }
        return map;
    }

    // =====================================================================
    // IFRAME BRIDGE (inside web-sandbox)
    // =====================================================================
    if (IS_DR_IFRAME) { initBridge(); }
    function initBridge() {
        function hasContent() {
            const doc = getDeepResearchContentDocument(document);
            return !!(doc && doc.body && doc.body.textContent.trim().length > 200);
        }

        function waitForContent() {
            return new Promise(r => {
                if (hasContent()) { r(); return; }
                const iv = setInterval(() => { if (hasContent()) { clearInterval(iv); r(); } }, 500);
                setTimeout(() => { clearInterval(iv); r(); }, 20000);
            });
        }

        waitForContent().then(() => {
            window.addEventListener('message', async ev => {
                if (!ev.data || ev.data.type !== 'h2m-req') return;
                const req = ev.data || {};
                const pref = {
                    cs: req.cs || 'parenthesized',
                    incCitations: typeof req.incCitations === 'boolean' ? req.incCitations : !!req.incSources,
                    incScanned: typeof req.incScanned === 'boolean' ? req.incScanned : !!req.incSources,
                    incActivity: typeof req.incActivity === 'boolean' ? req.incActivity : false
                };
                cit.reset();
                const doc = getDeepResearchContentDocument(document);
                const sections = await collectDeepResearchSections(doc, pref, { expand: true });
                const cd = {}; for (const [n, d2] of cit.r) cd[n] = d2;
                const extras = {
                    citations: sections && sections.citations ? sections.citations : null,
                    scanned: sections && sections.scanned ? sections.scanned : null,
                    connectorScanned: sections && sections.connectorScanned ? sections.connectorScanned : null,
                    activity: sections && sections.activity ? sections.activity : null
                };
                window.parent.postMessage({
                    type: 'h2m-res',
                    md: sections && sections.report ? sections.report : '',
                    t: sections && sections.title ? sections.title : (extractDRTitleFromDoc(doc) || ''),
                    c: cd,
                    sources: {
                        citations: extras.citations,
                        scanned: extras.scanned,
                        connectorScanned: extras.connectorScanned
                    },
                    activity: extras.activity,
                    extras
                }, '*');
            });
        });
    }

    // =====================================================================
    // HTML-TO-MARKDOWN (custom, Trusted-Types safe)
    // =====================================================================
    function h2m(root, cs, cm) {
        const sty = cs || _get('h2m_citationStyle', 'parenthesized');
        function p(n) {
            if (n.nodeType === Node.TEXT_NODE) return n.textContent.replace(/\$/g, '\\$');
            if (n.nodeType !== Node.ELEMENT_NODE) return '';
            const t = n.tagName.toLowerCase();
            if ('script style svg path noscript button nav footer input select label'.split(' ').includes(t)) return '';
            if (t === 'span' && n.getAttribute('data-state') === 'closed' && n.querySelector('sup[data-citation-index]')) return cs2(n.querySelector('sup[data-citation-index]'));
            if (t === 'sup' && (n.getAttribute('data-citation-index') || n.getAttribute('data-citation-interactive'))) return cs2(n);
            if (t === 'sup' && /^\d+$/.test(n.textContent.trim()) && cm && cm.has(n)) return cs2(n);
            if (t === 'a' && n.getAttribute('href')) {
                if (n.closest('sup[data-citation-index]')) return '';
                const h = n.getAttribute('href'), tx = k(n), iS = n.parentElement && n.parentElement.tagName.toLowerCase() === 'sup';
                if (iS && /^\d+$/.test(tx.trim())) return fc(cit.add(h), h, sty);
                return `[${tx}](${h})`;
            }
            if (t === 'mjx-container') { const tx = n.querySelector('img')?.title || n.getAttribute('data-formula') || ''; if (!tx) return k(n); return n.getAttribute('display') ? `$$${tx}$$` : `$${tx}$`; }
            if (n.classList && (n.classList.contains('katex') || n.classList.contains('math'))) { const a = n.querySelector('annotation[encoding="application/x-tex"]'); if (a) { const tx = a.textContent; return n.classList.contains('katex-display') ? `$$${tx}$$` : `$${tx}$`; } }
            const ch = k(n);
            switch (t) {
                case 'h1': return `\n# ${ch.trim()}\n\n`; case 'h2': return `\n## ${ch.trim()}\n\n`; case 'h3': return `\n### ${ch.trim()}\n\n`; case 'h4': return `\n#### ${ch.trim()}\n\n`; case 'h5': return `\n##### ${ch.trim()}\n\n`; case 'h6': return `\n###### ${ch.trim()}\n\n`;
                case 'p': return `\n${ch.trim()}\n\n`; case 'strong': case 'b': return `**${ch}**`; case 'em': case 'i': return `*${ch}*`; case 'del': case 's': case 'strike': return `~~${ch}~~`; case 'mark': return `==${ch}==`;
                case 'ul': return `\n${ch}\n`; case 'ol': return k(n) + '\n';
                case 'li': { const pr = n.parentElement; if (pr && pr.tagName.toLowerCase() === 'ol') { const its = Array.from(pr.children).filter(c => c.tagName.toLowerCase() === 'li'); return `${its.indexOf(n) + 1}. ${k(n).trim()}\n`; } const cb = n.querySelector('input[type="checkbox"]'); if (cb) return `- [${cb.checked ? 'x' : ' '}] ${k(n).trim()}\n`; return `- ${k(n).trim()}\n`; }
                case 'blockquote': return ch.trim().split('\n').map(l => `> ${l}`).join('\n') + '\n\n';
                case 'code': return (n.parentElement && n.parentElement.tagName.toLowerCase() === 'pre') ? ch : `\`${ch}\``;
                case 'pre': { const ce = n.querySelector('code'); let lg = ''; if (ce) { const lc = Array.from(ce.classList).find(c => c.startsWith('language-') || c.startsWith('lang-')); if (lc) lg = lc.replace(/^(language-|lang-)/, ''); } return `\`\`\`${lg}\n${(ce || n).textContent}\n\`\`\`\n\n`; }
                case 'br': return '\n'; case 'hr': return '\n---\n\n';
                case 'table': return pTbl(n); case 'thead': case 'tbody': case 'tr': case 'th': case 'td': return ch;
                case 'img': { const a2 = n.getAttribute('alt') || '', s2 = n.getAttribute('src') || ''; return s2 ? `![${a2}](${s2})` : ''; }
                case 'details': { const sm = n.querySelector('summary'), st = sm ? sm.textContent.trim() : 'Details', bd = Array.from(n.childNodes).filter(x => x !== sm).map(x => p(x)).join(''); return `<details>\n<summary>${st}</summary>\n\n${bd.trim()}\n\n</details>\n\n`; }
                case 'summary': return ''; case 'iframe': return '';
                default: return ch;
            }
        }
        function k(n) { let r = ''; for (const c of n.childNodes) r += p(c); return r; }
        function cs2(sup) { if (cm && cm.has(sup)) return cm.get(sup).map(u => { const n2 = cit.add(u); return fc(n2, u, sty); }).join(''); const lk = sup.querySelector('a[href]'); if (lk) { const n2 = cit.add(lk.getAttribute('href')); return fc(n2, lk.getAttribute('href'), sty); } if (sty === 'none') return ''; return `[${sup.textContent.trim()}]`; }
        function pTbl(tbl) { const rows = []; for (const tr of tbl.querySelectorAll('thead tr')) { const c = Array.from(tr.querySelectorAll('th,td')).map(x => k(x).replace(/\n/g, ' ').trim() || ' '); if (c.length) { rows.push(`| ${c.join(' | ')} |`); rows.push(`| ${c.map(() => '---').join(' | ')} |`); } } for (const tr of tbl.querySelectorAll('tbody tr')) { const c = Array.from(tr.querySelectorAll('td')).map(x => k(x).replace(/\n/g, ' ').trim() || ' '); if (c.length) rows.push(`| ${c.join(' | ')} |`); } if (!rows.length) { let f = true; for (const tr of tbl.querySelectorAll('tr')) { const c = Array.from(tr.querySelectorAll('th,td')).map(x => k(x).replace(/\n/g, ' ').trim() || ' '); if (c.length) { rows.push(`| ${c.join(' | ')} |`); if (f) { rows.push(`| ${c.map(() => '---').join(' | ')} |`); f = false; } } } } return rows.length ? `\n${rows.join('\n')}\n\n` : ''; }
        let txt = p(root);
        return txt.replace(/\n{3,}/g, '\n\n').replace(/[ \t]+$/gm, '').trim();
    }

    // =====================================================================
    // PREFERENCES
    // =====================================================================
    function gP() { return { cs: _get('h2m_citationStyle', 'parenthesized'), fm: _get('h2m_frontmatter', true), t1: _get('h2m_titleH1', false), incCite: _get('h2m_incCitations', true), incScan: _get('h2m_incScanned', false), incAct: _get('h2m_incActivity', false), wrap: _get('h2m_wrapText', true) }; }

    // =====================================================================
    // STYLES
    // =====================================================================
    _style(`
.h2m-sel{outline:3px dashed #ff2d2d!important;outline-offset:-2px!important;background:rgba(255,30,30,.12)!important;box-shadow:inset 0 0 0 1px rgba(255,0,0,.25)!important;z-index:2147483640!important;position:relative}
.h2m-no-scroll{overflow:hidden!important}
.h2m-tip{position:fixed;top:20%;right:12px;background:rgba(22,22,26,.96);color:#e0e0e4;border:1px solid #555;padding:14px 16px;z-index:2147483647;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.45);font:13px/1.5 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;max-width:340px;white-space:pre-wrap;pointer-events:none}
.h2m-tip b,.h2m-tip strong{color:#78c6f0}
.h2m-toast{position:fixed;bottom:20px;right:20px;background:#0e639c;color:#fff;padding:10px 18px;border-radius:8px;z-index:2147483647;font:13px system-ui,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,.35);transition:opacity .3s;pointer-events:none}
.h2m-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:2147483000;display:flex;align-items:safe center;justify-content:safe center;padding:min(12px,2vw);overflow:auto;box-sizing:border-box}
.h2m-modal{width:min(1060px,calc(100vw - 24px));max-width:100%;min-width:0;height:min(780px,calc(100vh - 24px));max-height:100%;background:#1e1e1e;border-radius:12px;overflow:hidden;display:grid;grid-template-rows:auto 1fr;box-shadow:0 24px 80px rgba(0,0,0,.5);font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#d4d4d4;box-sizing:border-box}
.h2m-toolbar{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:#2d2d2d;border-bottom:1px solid #3a3a3a;gap:6px;flex-wrap:wrap}
.h2m-toolbar-left,.h2m-toolbar-right{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.h2m-btn{padding:5px 12px;border:1px solid #555;border-radius:6px;background:#3c3c3c;color:#d4d4d4;font-size:12px;cursor:pointer;transition:all .15s;white-space:nowrap;font-family:inherit}
.h2m-btn:hover{background:#505050;border-color:#777}
.h2m-btn-primary{background:#0e639c;border-color:#1177bb;color:#fff}
.h2m-btn-primary:hover{background:#1177bb}
.h2m-btn-success{background:#16825d;border-color:#1ea97c;color:#fff}
.h2m-btn-success:hover{background:#1ea97c}
.h2m-btn-danger{background:#c72e2e;border-color:#e04848;color:#fff}
.h2m-btn-danger:hover{background:#e04848}
.h2m-btn-obsidian{background:#7c3aed;border-color:#8b5cf6;color:#fff}
.h2m-btn-obsidian:hover{background:#8b5cf6}
.h2m-select{padding:4px 8px;border:1px solid #555;border-radius:6px;background:#3c3c3c;color:#d4d4d4;font-size:12px;cursor:pointer;font-family:inherit}
.h2m-lbl{font-size:11px;color:#999;margin-right:2px}
.h2m-body{display:flex;flex:1;min-height:0;min-width:0;overflow:hidden}
.h2m-body textarea{width:50%;min-width:0;height:100%;padding:16px;box-sizing:border-box;overflow-y:auto;overflow-x:auto;background:#1e1e1e;color:#d4d4d4;border:none;border-right:1px solid #333;font:13px/1.6 'Cascadia Code','Fira Code',Consolas,monospace;resize:none;outline:none}
.h2m-body.h2m-wrap-text textarea,.h2m-body.h2m-wrap-text .h2m-preview{white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word}
.h2m-body:not(.h2m-wrap-text) textarea{white-space:pre}
.h2m-preview{width:50%;min-width:0;height:100%;padding:16px 20px;box-sizing:border-box;overflow-y:auto;overflow-x:auto;background:#252526;color:#d4d4d4;font:14px/1.7 system-ui,sans-serif}
.h2m-preview h1,.h2m-preview h2,.h2m-preview h3{color:#569cd6;border-bottom:1px solid #333;padding-bottom:4px}
.h2m-preview a{color:#4ec9b0}.h2m-preview code{background:#333;padding:2px 5px;border-radius:3px;font-size:12px}
.h2m-preview pre{background:#1e1e1e;padding:12px;border-radius:6px;overflow-x:auto}
.h2m-preview blockquote{border-left:3px solid #569cd6;padding-left:12px;color:#9cdcfe;margin:8px 0}
.h2m-preview table{border-collapse:collapse;width:100%}.h2m-preview th,.h2m-preview td{border:1px solid #444;padding:6px 10px;text-align:left}.h2m-preview th{background:#333}
.h2m-preview img{max-width:100%;height:auto}
.h2m-close{position:absolute;top:6px;right:12px;cursor:pointer;width:28px;height:28px;background:#c72e2e;color:#fff;font-size:16px;border-radius:50%;display:flex;justify-content:center;align-items:center;border:none;z-index:10;transition:background .15s;font-family:inherit}
.h2m-close:hover{background:#e04848}
    `);

    // =====================================================================
    // DOM HELPERS
    // =====================================================================
    function el(tag, attrs) {
        const e = document.createElement(tag);
        if (attrs) for (const [k, v] of Object.entries(attrs)) {
            if (k === 'style' && typeof v === 'object') Object.assign(e.style, v);
            else if (k === 'className') e.className = v;
            else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v);
            else e.setAttribute(k, v);
        }
        for (let i = 2; i < arguments.length; i++) { const c = arguments[i]; if (typeof c === 'string') e.appendChild(document.createTextNode(c)); else if (c) e.appendChild(c); }
        return e;
    }
    let _tt = null;
    function toast(m, ms) { ms = ms || 2500; let t = document.querySelector('.h2m-toast'); if (!t) { t = el('div', { className: 'h2m-toast' }); document.body.appendChild(t); } t.textContent = m; t.style.opacity = '1'; t.style.display = 'block'; if (_tt) clearTimeout(_tt); _tt = setTimeout(() => { t.style.opacity = '0'; setTimeout(() => { t.style.display = 'none'; }, 300); }, ms); }

    function stripUtm(href) {
        if (!href) return '';
        return href.replace(/[?&]utm_source=chatgpt\.com/g, '');
    }

    // =====================================================================
    // CHATGPT DEEP RESEARCH PANEL EXTRACTORS
    // These work on the SAME-ORIGIN overlay DOM (not iframe)
    // =====================================================================

    function extractDRReport() {
        const page = document.querySelector('[class*="_reportPage_"]')
            || document.querySelector('[class*="_reportContainer_"]');
        if (page) { cit.reset(); return h2m(page, gP().cs, fiberCites(document)); }
        const turns = document.querySelectorAll('article[data-testid^="conversation-turn"]');
        if (turns.length) {
            const last = turns[turns.length - 1];
            const prose = last.querySelector('div.markdown, div.prose');
            if (prose && prose.textContent.trim().length > 200) {
                cit.reset();
                return h2m(prose, gP().cs, fiberCites(document));
            }
        }
        return null;
    }

    function extractDRDuration() {
        const el2 = document.querySelector('.text-token-text-secondary.mb-3.text-sm');
        if (!el2) return null;
        const raw = el2.textContent.trim();
        const m = raw.match(/Research completed in\s+(\S+)/);
        const ariaSpan = el2.querySelector('span[role="img"][aria-label]');
        const citNum = ariaSpan ? ariaSpan.getAttribute('aria-label') : null;
        const searchSpans = el2.querySelectorAll('span[role="img"][aria-label]');
        let searchNum = null;
        if (searchSpans.length > 1) searchNum = searchSpans[1].getAttribute('aria-label');
        let line = 'Research completed';
        if (m) line += ` in ${m[1]}`;
        if (citNum) line += ` \u00B7 ${citNum} citations`;
        if (searchNum) line += ` \u00B7 ${searchNum} searches`;
        return line;
    }

    function extractDRCitations() {
        const sec = document.querySelector('section[aria-labelledby="report-references-citations"]');
        if (!sec) return null;
        const header = sec.querySelector('#report-references-citations');
        const countMatch = header ? header.textContent.match(/(\d+)/) : null;
        const count = countMatch ? countMatch[1] : '?';
        let md = `## **Citations [\`${count}\` Sources]**\n\n`;
        let idx = 1;
        const citGroups = sec.querySelectorAll('div.flex.flex-col.gap-0');
        for (const group of citGroups) {
            const buttons = group.querySelectorAll('button[aria-label^="Open source"]');
            for (const btn of buttons) {
                const titleLink = btn.querySelector('a.text-token-text-primary');
                const anyLink = btn.querySelector('a[href]');
                const title = titleLink ? titleLink.textContent.trim() : (anyLink ? anyLink.textContent.trim() : `Source ${idx}`);
                const href = anyLink ? stripUtm(anyLink.getAttribute('href')) : '';
                md += `${idx}. [${title}](${href})\n`;
                idx++;
            }
        }
        if (idx === 1) {
            const buttons = sec.querySelectorAll('button[aria-label^="Open source"]');
            for (const btn of buttons) {
                const titleLink = btn.querySelector('a.text-token-text-primary');
                const anyLink = btn.querySelector('a[href]');
                const title = titleLink ? titleLink.textContent.trim() : (anyLink ? anyLink.textContent.trim() : `Source ${idx}`);
                const href = anyLink ? stripUtm(anyLink.getAttribute('href')) : '';
                md += `${idx}. [${title}](${href})\n`;
                idx++;
            }
        }
        return md.trim();
    }

    function extractDRScanned() {
        const sec = document.querySelector('section[aria-labelledby="report-references-sources-scanned"]');
        if (!sec) return null;
        const header = sec.querySelector('#report-references-sources-scanned');
        const countMatch = header ? header.textContent.match(/(\d+)/) : null;
        const count = countMatch ? countMatch[1] : '?';
        let md = `## **Scanned [\`${count}\` Sources]**\n\n`;
        const outerContainer = sec.querySelector('.flex.w-full.flex-col');
        if (!outerContainer) return md.trim();
        const domainGroups = outerContainer.querySelectorAll(':scope > .flex.flex-col.gap-4');
        let idx = 1;
        for (const group of domainGroups) {
            const domainLink = group.querySelector('.flex.items-center.justify-between a[href]');
            const domainHref = domainLink ? stripUtm(domainLink.getAttribute('href')) : '';
            const domainName = domainLink ? (domainLink.querySelector('span') || domainLink).textContent.trim() : '';
            const itemContainers = group.querySelectorAll('.flex.flex-col.gap-1');
            for (const itemC of itemContainers) {
                const titleP = itemC.querySelector('p.text-token-text-primary');
                if (!titleP) continue;
                const title = titleP.textContent.trim();
                const scannedBtn = itemC.querySelector('button[aria-label^="Open scanned source"]');
                const snippetSpan = scannedBtn ? scannedBtn.querySelector('span.text-token-text-secondary') : null;
                const snippet = snippetSpan ? snippetSpan.textContent.trim() : '';
                md += `${idx}. [${title}](${domainHref})\n`;
                if (snippet) {
                    const trimmed = snippet.length > 200 ? snippet.substring(0, 200) + '...' : snippet;
                    md += `   - ${trimmed}\n`;
                }
                idx++;
            }
        }
        return md.trim();
    }

    function extractDRActivity() {
        const sec = document.querySelector('section[aria-labelledby="report-activity-title"]');
        if (!sec) return null;
        const dur = extractDRDuration();
        const durText = dur ? (dur.match(/in\s+(\S+)/)?.[1] || '?') : '?';
        let md = `## **Research Activity [Research completed in \`${durText}\`]**\n\n`;
        let entries = sec.querySelectorAll('.space-y-4.py-1 > .flex.items-stretch.gap-1, .space-y-4 > .flex.items-stretch.gap-1');
        if (!entries.length) entries = sec.querySelectorAll('.flex.items-stretch.gap-1');
        let idx = 1;
        for (const entry of entries) {
            const flex1 = entry.querySelector('.flex-1');
            if (!flex1) continue;
            const titleDiv = flex1.querySelector('.text-token-text-primary');
            if (!titleDiv) continue;
            const title = titleDiv.textContent.trim();
            if (!title) continue;
            const isSearchEntry = /^Searching\b/.test(title);
            const linkContainer = flex1.querySelector('.mt-1');
            const bodyContainer = flex1.querySelector('.text-token-text-secondary.mt-2');
            if (isSearchEntry && linkContainer) {
                const links = linkContainer.querySelectorAll('a[href]');
                if (links.length > 0) {
                    md += `${idx}. **${title}**\n`;
                    let li = 1;
                    for (const a of links) {
                        const href = stripUtm(a.getAttribute('href'));
                        let text = a.textContent.trim();
                        const img = a.querySelector('img');
                        if (img) text = text.replace(img.textContent || '', '').trim();
                        text = text.replace(/^(https?:\/\/)?(www\.)?/, '');
                        if (!text) text = href;
                        md += `   ${li}. [${text}](${href})\n`;
                        li++;
                    }
                    idx++;
                    continue;
                }
            }
            md += `${idx}. **${title}**\n`;
            if (bodyContainer) {
                const bodyPs = bodyContainer.querySelectorAll('p');
                if (bodyPs.length > 0) {
                    let si = 1;
                    for (const bp of bodyPs) {
                        const bodyText = bp.textContent.trim();
                        if (bodyText) {
                            const trimmed = bodyText.length > 300 ? bodyText.substring(0, 300) + '...' : bodyText;
                            md += `   ${si}. ${trimmed}\n`;
                            si++;
                        }
                    }
                } else {
                    const bodyText = bodyContainer.textContent.trim();
                    if (bodyText) {
                        const trimmed = bodyText.length > 300 ? bodyText.substring(0, 300) + '...' : bodyText;
                        md += `   1. ${trimmed}\n`;
                    }
                }
            }
            idx++;
        }
        return md.trim();
    }



    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
    function textCompact(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
    function mdCode(v) { const t = String.fromCharCode(96); return t + v + t; }
    function normalizeHref(href) {
        if (!href) return '';
        const cleaned = stripUtm(String(href));
        try {
            const u = new URL(cleaned, location.href);
            u.hash = '';
            u.searchParams.delete('utm_source');
            return u.toString();
        } catch (_) {
            return cleaned;
        }
    }

    function getIframeDocument(iframe) {
        if (!iframe) return null;
        try {
            return iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document) || null;
        } catch (_) {
            return null;
        }
    }

    function scoreDeepResearchDocument(doc) {
        if (!doc || !doc.body) return 0;
        const text = (doc.body.textContent || '').trim();
        let score = Math.min(24, text.length / 1400);
        if (doc.querySelector('[class*="_reportPage_"], [class*="_reportContainer_"]')) score += 30;
        if (doc.querySelector('section[aria-labelledby="report-references-citations"]')) score += 18;
        if (doc.querySelector('section[aria-labelledby="report-references-sources-scanned"]')) score += 18;
        if (doc.querySelector('section[aria-labelledby="report-references-connector-sources-scanned"]')) score += 12;
        if (doc.querySelector('section[aria-labelledby="report-activity-title"]')) score += 14;
        if (doc.querySelector('main h1, article h1, h1')) score += 10;
        if (/research activity/i.test(text)) score += 4;
        return score;
    }

    function getDeepResearchContentDocument(baseDoc) {
        const start = baseDoc || document;
        let best = start;
        let bestScore = scoreDeepResearchDocument(start);
        const seen = new Set();
        function walk(doc, depth) {
            if (!doc || seen.has(doc) || depth > 4) return;
            seen.add(doc);
            const score = scoreDeepResearchDocument(doc);
            if (score > bestScore) {
                best = doc;
                bestScore = score;
            }
            for (const frame of doc.querySelectorAll('iframe')) {
                const child = getIframeDocument(frame);
                if (child && child !== doc) walk(child, depth + 1);
            }
        }
        walk(start, 0);
        return best;
    }

    function isDeepResearchIframeEl(frame) {
        if (!frame || frame.tagName !== 'IFRAME') return false;
        const s = frame.getAttribute('src') || '', t = frame.getAttribute('title') || '';
        return s.includes('web-sandbox.oaiusercontent.com') || s.includes('connector_openai_deep_research') || t.toLowerCase().includes('deep-research');
    }

    function postMessageToDeepResearchIframes(msg) {
        for (const f of document.querySelectorAll('iframe')) {
            if (!isDeepResearchIframeEl(f)) continue;
            try { if (f.contentWindow) f.contentWindow.postMessage(msg, '*'); } catch (_) {}
        }
    }

    function removeOpenH2mModals() {
        for (const n of document.querySelectorAll('.h2m-overlay')) {
            try { n.remove(); } catch (_) {}
        }
    }

    async function ensureChatGPTDRRightTab(doc, which) {
        const d = doc || document;
        const tabs = [...d.querySelectorAll('[role="tab"]')].filter(b => textCompact(b.textContent || '').length < 80);
        if (tabs.length < 2) return false;
        const wantSources = which === 'sources';
        const pick = () => tabs.find(b => {
            const t = textCompact(b.textContent || '');
            if (wantSources) return /^sources$/i.test(t) || /^citations\b/i.test(t);
            return /^activity\b/i.test(t);
        });
        const tb = pick();
        if (!tb) return false;
        try { tb.click(); } catch (_) {}
        await sleep(160);
        return true;
    }

    function decodeHtmlEntities(raw) {
        const t = document.createElement('textarea');
        t.innerHTML = String(raw || '');
        return t.value;
    }

    function decodeNestedEntities(raw, rounds) {
        let out = String(raw || '');
        const maxRounds = rounds || 8;
        for (let i = 0; i < maxRounds; i++) {
            const next = decodeHtmlEntities(out);
            if (next === out) break;
            out = next;
        }
        return out;
    }

    function collectSrcdocDocuments(baseDoc, maxDepth) {
        const docs = [];
        const seen = new Set();
        const depthLimit = maxDepth || 6;
        function add(doc) {
            if (!doc || !doc.body || seen.has(doc)) return;
            seen.add(doc);
            docs.push(doc);
        }
        function walk(doc, depth) {
            if (!doc || depth > depthLimit) return;
            add(doc);
            for (const frame of doc.querySelectorAll('iframe')) {
                const child = getIframeDocument(frame);
                if (child && child !== doc) walk(child, depth + 1);
                const raw = frame.getAttribute('srcdoc');
                if (!raw) continue;
                const decoded = decodeNestedEntities(raw, 10);
                if (!/<(html|body|main|section|div)/i.test(decoded)) continue;
                try {
                    const parsed = new DOMParser().parseFromString(decoded, 'text/html');
                    if (parsed && parsed.body) walk(parsed, depth + 1);
                } catch (_) {}
            }
        }
        walk(baseDoc || document, 0);
        return docs;
    }

    function findBestSrcdocDocument(baseDoc) {
        const docs = collectSrcdocDocuments(baseDoc || document, 6);
        let best = null;
        let bestScore = 0;
        for (const doc of docs) {
            const score = scoreDeepResearchDocument(doc);
            if (score > bestScore) {
                best = doc;
                bestScore = score;
            }
        }
        return bestScore >= 18 ? best : null;
    }

    function stripLeadingNonHeading(md) {
        const txt = String(md || '');
        const hm = txt.match(/^(#{1,6}\s)/m);
        if (!hm) return txt.trim();
        return txt.substring(txt.indexOf(hm[0])).trim();
    }

    function sectionCountFromHeader(section, headerId) {
        if (!section) return '?';
        const head = headerId ? section.querySelector('#' + headerId) : section.querySelector('p, h2, h3');
        const txt = textCompact(head ? head.textContent : section.textContent);
        const m = txt.match(/(\d[\d,]*)/);
        return m ? m[1].replace(/,/g, '') : '?';
    }

    function getDRSection(doc, kind) {
        const d = doc || document;
        const ids = {
            citations: 'report-references-citations',
            scanned: 'report-references-sources-scanned',
            connectorScanned: 'report-references-connector-sources-scanned',
            activity: 'report-activity-title'
        };
        const id = ids[kind];
        if (id) {
            const strict = d.querySelector('section[aria-labelledby="' + id + '"]');
            if (strict) return strict;
            const byId = d.getElementById(id);
            if (byId && byId.closest) {
                const sec = byId.closest('section');
                if (sec) return sec;
            }
        }
        if (kind === 'citations') {
            for (const sec of d.querySelectorAll('section')) {
                if (sec.querySelector('button[aria-label^="Open source"], [aria-label^="Open source"]')) return sec;
            }
        }
        if (kind === 'scanned') {
            for (const sec of d.querySelectorAll('section')) {
                if (sec.querySelector('button[aria-label^="Open scanned source"]')) return sec;
            }
        }
        if (kind === 'connectorScanned') {
            for (const sec of d.querySelectorAll('section')) {
                if (/connector sources scanned/i.test(textCompact(sec.textContent || ''))) return sec;
            }
        }
        if (kind === 'activity') {
            for (const sec of d.querySelectorAll('section')) {
                const txt = textCompact(sec.textContent || '');
                if (/research activity/i.test(txt) && sec.querySelector('.items-stretch, .gap-1')) return sec;
            }
        }
        return null;
    }

    function findDRReportRoot(doc) {
        const d = doc || document;
        const direct = d.querySelector('[class*="_reportPage_"], [class*="_reportContainer_"]');
        if (direct) return direct;

        const main = d.querySelector('main');
        if (main) {
            const page = main.querySelector('[class*="_reportPage_"], [class*="_reportContainer_"]');
            if (page) return page;
            const candidates = [];
            for (const el2 of main.querySelectorAll('article, section, div')) {
                if (el2.closest('aside')) continue;
                if (!el2.querySelector('h1, h2, h3, p')) continue;
                const len = textCompact(el2.textContent).length;
                if (len < 250) continue;
                candidates.push({ el2, len });
            }
            if (candidates.length) {
                candidates.sort((a, b) => b.len - a.len);
                return candidates[0].el2;
            }
            if (textCompact(main.textContent).length > 250) return main;
        }

        for (const sel of ['article', '.report', '.content']) {
            const el2 = d.querySelector(sel);
            if (el2 && textCompact(el2.textContent).length > 250) return el2;
        }
        return d.body || null;
    }

    function extractDRTitleFromDoc(doc) {
        const d = doc || document;
        const h1 = Array.from(d.querySelectorAll('h1')).find(x => !x.closest('aside'));
        if (h1 && textCompact(h1.textContent).length > 3) return textCompact(h1.textContent);
        const h2 = Array.from(d.querySelectorAll('h2')).find(x => !x.closest('aside'));
        if (h2 && textCompact(h2.textContent).length > 3) return textCompact(h2.textContent);
        return d.title || 'Research';
    }

    function extractDRReportFromDoc(doc, prefs) {
        const d = getDeepResearchContentDocument(doc || document);
        const root = findDRReportRoot(d);
        if (!root) return null;
        cit.reset();
        const cs = prefs && prefs.cs ? prefs.cs : gP().cs;
        const cm = fiberCites(d);
        const md = stripLeadingNonHeading(h2m(root, cs, cm));
        return md || null;
    }

    function extractDRDurationFromDoc(doc) {
        const d = doc || document;
        let el2 = d.querySelector('.text-token-text-secondary.mb-3.text-sm');
        if (!el2) {
            el2 = Array.from(d.querySelectorAll('div, p, span')).find(x => /Research completed in/i.test(textCompact(x.textContent || '')));
        }
        if (!el2) return null;

        const raw = textCompact(el2.textContent || '');
        const m = raw.match(/Research completed in\s+([^\u00B7]+?)(?:\s*\u00B7|$)/i);
        const spans = el2.querySelectorAll('span[role="img"][aria-label]');
        const citNum = spans.length > 0 ? spans[0].getAttribute('aria-label') : null;
        const searchNum = spans.length > 1 ? spans[1].getAttribute('aria-label') : null;

        let line = 'Research completed';
        if (m) line += ' in ' + textCompact(m[1]);
        if (citNum) line += ' \u00B7 ' + citNum + ' citations';
        if (searchNum) line += ' \u00B7 ' + searchNum + ' searches';
        return line;
    }

    function isMoreToggleControl(el2) {
        if (!el2) return false;
        const aria = textCompact(el2.getAttribute && el2.getAttribute('aria-label')).toLowerCase();
        const txt = textCompact(el2.textContent).toLowerCase();
        if (!txt && !aria) return false;
        if (/open source|open scanned source|scroll report to citation|close/.test(aria)) return false;
        if (/^\d+\s+more$/.test(txt)) return true;
        if (/\bsee more\b|\bshow more\b/.test(txt)) return true;
        if (/\bsee more\b|\bshow more\b|\bmore\b/.test(aria)) return true;
        return false;
    }

    async function expandDRMoreControls(doc, prefs) {
        const d = doc || document;
        const roots = [];
        if (prefs.incCitations) {
            const c2 = getDRSection(d, 'citations');
            if (c2) roots.push(c2);
        }
        if (prefs.incScanned) {
            const s2 = getDRSection(d, 'scanned');
            if (s2) roots.push(s2);
            const cs2 = getDRSection(d, 'connectorScanned');
            if (cs2) roots.push(cs2);
        }
        if (prefs.incActivity) {
            const a2 = getDRSection(d, 'activity');
            if (a2) roots.push(a2);
        }
        if (!roots.length) return;

        for (let round = 0; round < 6; round++) {
            const clicked = new Set();
            for (const root of roots) {
                for (const btn of root.querySelectorAll('button, [role="button"]')) {
                    if (!btn || btn.disabled) continue;
                    if (!isMoreToggleControl(btn)) continue;
                    if (clicked.has(btn)) continue;
                    try {
                        btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: d.defaultView || window }));
                        clicked.add(btn);
                    } catch (_) {}
                }
            }
            if (!clicked.size) break;
            await sleep(120);
        }
    }

    function extractDRCitationsFromDoc(doc) {
        const d = doc || document;
        const sec = getDRSection(d, 'citations');
        if (!sec) return null;

        const lines = [];
        const seen = new Set();
        let idx = 1;

        const btns = sec.querySelectorAll('button[aria-label^="Open source"], [aria-label^="Open source"]');
        for (const btn of btns) {
            const link = btn.querySelector('a[href]') || null;
            const href = normalizeHref(link ? link.getAttribute('href') : '');
            let title = textCompact((btn.querySelector('a.text-token-text-primary, .text-token-text-primary') || link || btn).textContent || '');
            if (!title || /^https?:\/\//i.test(title)) title = href ? href.replace(/^https?:\/\/(www\.)?/i, '').split('/')[0] : ('Source ' + idx);
            const key = (href || title).toLowerCase();
            if (!key || seen.has(key)) continue;
            seen.add(key);
            lines.push(href ? (idx + '. [' + title + '](' + href + ')') : (idx + '. ' + title));
            idx++;
        }

        if (!lines.length) {
            for (const a of sec.querySelectorAll('a[href]')) {
                const href = normalizeHref(a.getAttribute('href'));
                if (!href || seen.has(href.toLowerCase())) continue;
                seen.add(href.toLowerCase());
                let title = textCompact(a.textContent);
                if (!title || /^https?:\/\//i.test(title)) title = href.replace(/^https?:\/\/(www\.)?/i, '').split('/')[0];
                lines.push(idx + '. [' + title + '](' + href + ')');
                idx++;
            }
        }

        if (!lines.length) return null;
        const headerCount = sectionCountFromHeader(sec, 'report-references-citations');
        const count = lines.length ? String(lines.length) : (headerCount !== '?' ? headerCount : '?');
        return '## **Citations [' + mdCode(count) + ' Sources]**\n\n' + lines.join('\n');
    }

    function extractDRScannedFromDoc(doc, kind) {
        const d = doc || document;
        const isConnector = kind === 'connector';
        const sec = getDRSection(d, isConnector ? 'connectorScanned' : 'scanned');
        if (!sec) return null;

        const emptyText = Array.from(sec.querySelectorAll('[aria-hidden="true"], .text-token-text-tertiary')).map(x => textCompact(x.textContent)).find(x => /no .*sources scanned/i.test(x));
        const lines = [];
        const seen = new Set();
        let idx = 1;

        const btns = sec.querySelectorAll('button[aria-label^="Open scanned source"]');
        for (const btn of btns) {
            const group = btn.closest('.flex.flex-col.gap-4') || btn.closest('section');
            const groupLink = group ? group.querySelector('.flex.items-center.justify-between a[href]') : null;
            const innerLink = btn.querySelector('a[href]');
            const href = normalizeHref((innerLink || groupLink) ? (innerLink || groupLink).getAttribute('href') : '');

            let title = '';
            const parent = btn.closest('.flex.flex-col.gap-1');
            const titleEl = (parent ? parent.querySelector('p.text-token-text-primary, .text-token-text-primary') : null) || btn.querySelector('p.text-token-text-primary, .text-token-text-primary');
            if (titleEl) title = textCompact(titleEl.textContent);
            if (!title) title = textCompact((btn.getAttribute('aria-label') || '').replace(/^Open (scanned )?source\s*/i, ''));
            if (!title) title = href ? href.replace(/^https?:\/\/(www\.)?/i, '').split('/')[0] : ('Source ' + idx);

            const key = (href || title).toLowerCase();
            if (!key || seen.has(key)) continue;
            seen.add(key);

            lines.push(href ? (idx + '. [' + title + '](' + href + ')') : (idx + '. ' + title));
            const snippetEl = btn.querySelector('p.text-token-text-secondary, span.text-token-text-secondary, .text-token-text-secondary');
            const snippet = textCompact(snippetEl ? snippetEl.textContent : '');
            if (snippet && snippet !== title) {
                const trimmed = snippet.length > 300 ? snippet.substring(0, 300) + '...' : snippet;
                lines.push('   - ' + trimmed);
            }
            idx++;
        }

        if (!lines.length) {
            for (const a of sec.querySelectorAll('a[href]')) {
                const href = normalizeHref(a.getAttribute('href'));
                if (!href || seen.has(href.toLowerCase())) continue;
                seen.add(href.toLowerCase());
                let title = textCompact(a.textContent);
                if (!title || /^https?:\/\//i.test(title)) title = href.replace(/^https?:\/\/(www\.)?/i, '').split('/')[0];
                lines.push(idx + '. [' + title + '](' + href + ')');
                idx++;
            }
        }

        const label = isConnector ? 'Connector scanned' : 'Scanned';
        if (!lines.length) {
            if (!emptyText) return null;
            return '## **' + label + ' [' + mdCode('0') + ' Sources]**\n\n' + emptyText;
        }

        const headerId = isConnector ? 'report-references-connector-sources-scanned' : 'report-references-sources-scanned';
        const headerCount = sectionCountFromHeader(sec, headerId);
        const primaryCount = lines.filter(x => /^\d+\.\s/.test(x)).length;
        const count = primaryCount ? String(primaryCount) : (headerCount !== '?' ? headerCount : '?');
        return '## **' + label + ' [' + mdCode(count) + ' Sources]**\n\n' + lines.join('\n');
    }

    function extractDRActivityFromDoc(doc, durationLine) {
        const d = doc || document;
        const sec = getDRSection(d, 'activity');
        if (!sec) return null;

        const dur = durationLine || extractDRDurationFromDoc(d) || '';
        const m = dur.match(/in\s+([^\u00B7]+?)(?:\s*\u00B7|$)/i);
        const durText = m ? textCompact(m[1]) : '';
        const lines = [];
        let idx = 1;

        let entries = sec.querySelectorAll('.space-y-4.py-1 > .flex.items-stretch.gap-1, .space-y-4 > .flex.items-stretch.gap-1');
        if (!entries.length) entries = sec.querySelectorAll('.text-token-text-secondary.flex.items-stretch.gap-1, .flex.items-stretch.gap-1');
        for (const entry of entries) {
            const title = textCompact((entry.querySelector('.text-token-text-primary') || {}).textContent || '');
            if (!title) continue;
            lines.push(idx + '. **' + title + '**');
            let sub = 1;
            const isSearch = /^Searching\b/i.test(title);

            if (isSearch) {
                const seen = new Set();
                for (const a of entry.querySelectorAll('a[href]')) {
                    const href = normalizeHref(a.getAttribute('href'));
                    if (!href || seen.has(href)) continue;
                    seen.add(href);
                    let text = textCompact(a.textContent || a.getAttribute('aria-label') || '');
                    if (!text || /^https?:\/\//i.test(text)) text = href.replace(/^https?:\/\/(www\.)?/i, '');
                    lines.push('   ' + sub + '. [' + text + '](' + href + ')');
                    sub++;
                }
                const more = Array.from(entry.querySelectorAll('button, [role="button"]')).map(x => textCompact(x.textContent)).find(x => /^\d+\s+more$/i.test(x) || /\bsee more\b|\bshow more\b/i.test(x));
                if (more) {
                    lines.push('   ' + sub + '. ' + more);
                    sub++;
                }
            }

            if (!isSearch) {
                const bodyRoot = entry.querySelector('.text-token-text-secondary.mt-2, .text-token-text-secondary.space-y-2, .text-token-text-secondary');
                if (bodyRoot) {
                    const ps = bodyRoot.querySelectorAll('p');
                    if (ps.length) {
                        for (const p2 of ps) {
                            const t = textCompact(p2.textContent);
                            if (!t) continue;
                            const trimmed = t.length > 350 ? t.substring(0, 350) + '...' : t;
                            lines.push('   ' + sub + '. ' + trimmed);
                            sub++;
                        }
                    } else {
                        const t = textCompact(bodyRoot.textContent);
                        if (t) {
                            const trimmed = t.length > 350 ? t.substring(0, 350) + '...' : t;
                            lines.push('   ' + sub + '. ' + trimmed);
                            sub++;
                        }
                    }
                }
            }

            idx++;
        }

        if (!lines.length) return null;
        const head = durText ? ('## **Research Activity [Research completed in ' + mdCode(durText) + ']**') : '## **Research Activity**';
        return head + '\n\n' + lines.join('\n');
    }

    async function collectDeepResearchSections(doc, prefs, options) {
        const d = getDeepResearchContentDocument(doc || document);
        const p = {
            cs: prefs && prefs.cs ? prefs.cs : gP().cs,
            incCitations: prefs ? !!prefs.incCitations : true,
            incScanned: prefs ? !!prefs.incScanned : false,
            incActivity: prefs ? !!prefs.incActivity : false
        };
        const opts = options || {};

        let sourceDoc = d;
        let report = extractDRReportFromDoc(sourceDoc, p);
        if ((!report || !report.trim()) && opts.allowSrcdocFallback !== false) {
            const fallbackDoc = findBestSrcdocDocument(sourceDoc);
            if (fallbackDoc && fallbackDoc !== sourceDoc) {
                sourceDoc = fallbackDoc;
                report = extractDRReportFromDoc(sourceDoc, p);
            }
        }

        const duration = extractDRDurationFromDoc(sourceDoc);
        let citations = null;
        let scanned = null;
        let connectorScanned = null;
        let activity = null;

        if (opts.expand !== false && (p.incCitations || p.incScanned)) {
            await ensureChatGPTDRRightTab(sourceDoc, 'sources');
            await expandDRMoreControls(sourceDoc, { ...p, incActivity: false });
        }

        if (p.incCitations) citations = extractDRCitationsFromDoc(sourceDoc);
        if (p.incScanned) {
            scanned = extractDRScannedFromDoc(sourceDoc, 'scanned');
            connectorScanned = extractDRScannedFromDoc(sourceDoc, 'connector');
        }

        if (opts.expand !== false && p.incActivity) {
            await ensureChatGPTDRRightTab(sourceDoc, 'activity');
            await expandDRMoreControls(sourceDoc, { incCitations: false, incScanned: false, incActivity: true });
        }
        if (p.incActivity) activity = extractDRActivityFromDoc(sourceDoc, duration);

        return {
            doc: sourceDoc,
            title: extractDRTitleFromDoc(sourceDoc),
            report: report || '',
            citations,
            scanned,
            connectorScanned,
            activity,
            duration: duration || null
        };
    }

    function appendDRSectionsToParts(parts, sections, prefs) {
        if (!sections || !parts) return;
        if (sections.report && sections.report.trim()) parts.push(sections.report.trim());
        if (prefs.incCite && sections.citations) parts.push(sections.citations.trim());
        if (prefs.incScan && sections.scanned) parts.push(sections.scanned.trim());
        if (prefs.incScan && sections.connectorScanned) parts.push(sections.connectorScanned.trim());
        if (prefs.incAct && sections.activity) parts.push(sections.activity.trim());
    }

    function extractBridgeSections(result) {
        const out = { citations: null, scanned: null, connectorScanned: null, activity: null };
        if (!result) return out;
        if (result.extras && typeof result.extras === 'object') {
            if (typeof result.extras.citations === 'string') out.citations = result.extras.citations;
            if (typeof result.extras.scanned === 'string') out.scanned = result.extras.scanned;
            if (typeof result.extras.connectorScanned === 'string') out.connectorScanned = result.extras.connectorScanned;
            if (typeof result.extras.activity === 'string') out.activity = result.extras.activity;
        }
        if (result.sources && typeof result.sources === 'object') {
            if (!out.citations && typeof result.sources.citations === 'string') out.citations = result.sources.citations;
            if (!out.scanned && typeof result.sources.scanned === 'string') out.scanned = result.sources.scanned;
            if (!out.connectorScanned && typeof result.sources.connectorScanned === 'string') out.connectorScanned = result.sources.connectorScanned;
        } else if (!out.citations && typeof result.sources === 'string') {
            out.citations = result.sources;
        }
        if (!out.activity && typeof result.activity === 'string') out.activity = result.activity;
        return out;
    }

    function extractDRReport(doc) { return extractDRReportFromDoc(doc || document, { cs: gP().cs }); }
    function extractDRDuration(doc) { return extractDRDurationFromDoc(doc || document); }
    function extractDRCitations(doc) { return extractDRCitationsFromDoc(doc || document); }
    function extractDRScanned(doc) { return extractDRScannedFromDoc(doc || document, 'scanned'); }
    function extractDRActivity(doc) { return extractDRActivityFromDoc(doc || document); }
    // =====================================================================
    // GEMINI EXTRACTION
    // =====================================================================
    function extractGeminiLegacy() {
        const turns = document.querySelectorAll('message-content, .conversation-container .response-container, model-response .response-container');
        if (!turns.length) return null;
        let md = '';
        for (const turn of turns) {
            const content = h2m(turn, gP().cs, new Map());
            if (content.trim()) md += content.trim() + '\n\n---\n\n';
        }
        const canvas = document.querySelector('.canvas-content, .immersive-container .content-area');
        if (canvas) {
            const canvasMd = h2m(canvas, gP().cs, new Map());
            if (canvasMd.trim()) md += '## Canvas\n\n' + canvasMd.trim() + '\n\n';
        }
        return md.trim() || null;
    }

    function geminiParseSourceList(listEl) {
        const lines = [];
        if (!listEl) return lines;
        let idx = 1;
        const rows = listEl.querySelectorAll('browse-file-item, browse-tool-item');
        for (const fi of rows) {
            const btn = fi.querySelector('button[data-test-id="view-file-button"]');
            const a = fi.querySelector('a[href]');
            let title = '';
            let href = '';
            if (btn) {
                const lab = btn.getAttribute('aria-label') || '';
                const m = lab.match(/^Link to document,\s*(.+)/i) || lab.match(/^Link to page,\s*(.+)/i) || lab.match(/^Link to\s+\w+,\s*(.+)/i);
                title = textCompact(m ? m[1] : lab.replace(/^Link to\s+\w+,\s*/i, ''));
            }
            if (a) {
                href = normalizeHref(a.getAttribute('href'));
                if (!title) title = textCompact(a.textContent || '');
            }
            if (!href && !title) continue;
            if (href) lines.push(idx + '. [' + (title || href) + '](' + href + ')');
            else lines.push(idx + '. ' + title);
            idx++;
        }
        return lines;
    }

    function extractGeminiThoughtsMd() {
        const headers = document.querySelectorAll('thought-item [data-test-id="thought-header"]');
        if (!headers.length) return null;
        const lines = [];
        lines.push('## **Thoughts**');
        lines.push('');
        let idx = 1;
        for (const h of headers) {
            const item = h.closest('thought-item');
            const title = textCompact(h.textContent || '');
            const body = item ? item.querySelector('[data-test-id="thought-body"]') : null;
            lines.push(idx + '. **' + title + '**');
            lines.push('');
            let si = 1;
            if (body) {
                const links = body.querySelectorAll('a[href]');
                if (links.length) {
                    for (const a of links) {
                        const href = normalizeHref(a.getAttribute('href'));
                        let tt = textCompact(a.textContent || '');
                        const im = a.querySelector('img');
                        if (im) tt = tt.replace(textCompact(im.getAttribute('alt') || ''), '').trim();
                        lines.push('   ' + si + '. [' + (tt || href) + '](' + href + ')');
                        si++;
                    }
                } else {
                    const t = textCompact(body.textContent || '');
                    if (t) lines.push('   ' + si + '. ' + t);
                }
            }
            lines.push('');
            idx++;
        }
        return lines.join('\n').trim();
    }

    function extractGeminiReportBody() {
        const candidates = document.querySelectorAll('message-content, model-response message-content');
        for (const r of candidates) {
            if (!r.querySelector('deep-research-source-lists')) continue;
            const clone = r.cloneNode(true);
            clone.querySelectorAll('deep-research-source-lists, thinking-panel, tool-call-display').forEach(n => n.remove());
            clone.querySelectorAll('mat-icon, img[src*="favicon"], img[alt*="favicon"]').forEach(n => n.remove());
            const md = stripLeadingNonHeading(h2m(clone, gP().cs, new Map()).trim());
            if (md.length > 120) return md;
        }
        return null;
    }

    async function extractGeminiMarkdown() {
        const dr = document.querySelector('deep-research-source-lists');
        if (!dr) return extractGeminiLegacy();

        const ub = dr.querySelector('[data-test-id="unused-sources-button"] button');
        if (ub && ub.getAttribute('aria-expanded') === 'false') {
            try { ub.click(); } catch (_) {}
            await sleep(320);
        }

        const usedEl = dr.querySelector('.source-list.used-sources');
        const unusedEl = dr.querySelector('.source-list.unused-sources');
        const usedLines = geminiParseSourceList(usedEl);
        const unusedLines = geminiParseSourceList(unusedEl);

        const parts = [];
        const report = extractGeminiReportBody();
        if (report) parts.push(report);
        if (usedLines.length) parts.push('## **Sources used in the report**\n\n' + usedLines.join('\n\n'));
        if (unusedLines.length) parts.push('## **Sources read but not used in the report**\n\n' + unusedLines.join('\n\n'));
        const th = extractGeminiThoughtsMd();
        if (th) parts.push(th);

        if (!parts.length) return extractGeminiLegacy();
        return parts.join('\n\n---\n\n').trim();
    }

    // =====================================================================
    // DEEP RESEARCH EXPORT (combined)
    // =====================================================================
    function hasDROverlay() {
        if (document.querySelector('[class*="_reportPage_"]')) return true;
        if (document.querySelector('[class*="_reportContainer_"]')) return true;
        if (document.querySelectorAll('section[aria-labelledby^="report-"]').length > 0) return true;
        if (hasDRIframe()) return true;
        return false;
    }
    function hasDRIframe() {
        if (document.querySelector('iframe[title*="deep-research"]')) return true;
        if (document.querySelector('iframe[src*="web-sandbox.oaiusercontent.com"]')) return true;
        if (document.querySelector('iframe[src*="connector_openai_deep_research"]')) return true;
        return false;
    }
    function getDRIframe() {
        return document.querySelector('iframe[title*="deep-research"]')
            || document.querySelector('iframe[src*="web-sandbox.oaiusercontent.com"]')
            || document.querySelector('iframe[src*="connector_openai_deep_research"]');
    }

    function getDROverlayContainer() {
        const iframe = getDRIframe();
        if (!iframe) return null;
        let el2 = iframe.parentElement;
        while (el2 && el2 !== document.body) {
            try {
                const cs = window.getComputedStyle(el2);
                if ((cs.position === 'fixed' || cs.position === 'absolute') && cs.zIndex && parseInt(cs.zIndex) > 10) return el2;
            } catch (_) {}
            el2 = el2.parentElement;
        }
        return iframe.parentElement;
    }

    function isDRElement(el2) {
        if (!el2) return false;
        if (el2.tagName === 'IFRAME') {
            const t = el2.getAttribute('title') || '', s = el2.getAttribute('src') || '';
            if (t.includes('deep-research') || s.includes('web-sandbox.oaiusercontent.com') || s.includes('connector_openai_deep_research')) return true;
        }
        if (!el2.closest) return false;
        if (el2.closest('section[aria-labelledby^="report-"]')) return true;
        if (el2.closest('[class*="_reportPage_"]')) return true;
        if (el2.closest('[class*="_reportContainer_"]')) return true;
        const overlay = getDROverlayContainer();
        if (overlay && overlay.contains(el2)) return true;
        return false;
    }

    function exportViaIframe() {
        return new Promise(resolve => {
            const iframe = getDRIframe();
            if (!iframe) { resolve(null); return; }
            let done = false;
            const pr = gP();
            function onMsg(ev) {
                if (done || !ev.data || ev.data.type !== 'h2m-res') return;
                done = true; window.removeEventListener('message', onMsg);
                const { md, t, c, sources, activity, extras } = ev.data;
                cit.reset();
                if (c) for (const [ns, d] of Object.entries(c)) { const n = parseInt(ns, 10); cit.m.set(d.k, n); cit.r.set(n, d); if (n >= cit.n) cit.n = n + 1; }
                const srcObj = sources && typeof sources === 'object' ? sources : null;
                const ex = extras && typeof extras === 'object' ? extras : {};
                resolve({
                    md: md || '',
                    t: t || '',
                    sources: srcObj || sources || null,
                    activity: typeof activity === 'string' ? activity : null,
                    extras: {
                        citations: typeof ex.citations === 'string' ? ex.citations : (srcObj && typeof srcObj.citations === 'string' ? srcObj.citations : null),
                        scanned: typeof ex.scanned === 'string' ? ex.scanned : (srcObj && typeof srcObj.scanned === 'string' ? srcObj.scanned : null),
                        connectorScanned: typeof ex.connectorScanned === 'string' ? ex.connectorScanned : (srcObj && typeof srcObj.connectorScanned === 'string' ? srcObj.connectorScanned : null),
                        activity: typeof ex.activity === 'string' ? ex.activity : (typeof activity === 'string' ? activity : null)
                    }
                });
            }
            window.addEventListener('message', onMsg);
            const msg = {
                type: 'h2m-req',
                cs: pr.cs,
                incCitations: pr.incCite,
                incScanned: pr.incScan,
                incActivity: pr.incAct,
                incSources: pr.incCite || pr.incScan
            };
            function sendMsg() {
                postMessageToDeepResearchIframes(msg);
            }
            sendMsg();
            setTimeout(() => { if (!done) sendMsg(); }, 2000);
            setTimeout(() => { if (!done) sendMsg(); }, 5000);
            setTimeout(() => { if (!done) sendMsg(); }, 10000);
            setTimeout(() => { if (!done) { done = true; window.removeEventListener('message', onMsg); resolve(null); } }, 25000);
        });
    }

    function fmtOut(content, title) {
        const pr = gP();
        let md = '';
        const srcUrl = IS_DR_IFRAME ? (document.referrer || location.href) : location.href;
        if (pr.fm) { const t = (title || document.title || document.querySelector('h1')?.textContent || 'Export').replace(/"/g, '\\"'); md += `---\ntitle: "${t}"\ndate: ${new Date().toISOString().split('T')[0]}\nsource: ${srcUrl}\n---\n\n`; }
        if (pr.t1 && title) md += `# ${title}\n\n`;
        md += content;
        if (pr.cs === 'endnotes' && cit.r.size > 0) { md += '\n\n---\n\n### Sources\n\n'; for (const [n, { href }] of cit.r) md += `[${n}] ${href}\n`; }
        if (pr.cs === 'footnotes' && cit.r.size > 0) { md += '\n\n'; for (const [n, { href }] of cit.r) md += `[^${n}]: ${href}\n`; }
        return md.trim();
    }

    async function tryDirectIframeAccess() {
        const iframe = getDRIframe();
        if (!iframe) return null;
        try {
            let idoc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
            if (!idoc || !idoc.body) return null;
            idoc = getDeepResearchContentDocument(idoc);
            const pr = gP();
            const sections = await collectDeepResearchSections(idoc, {
                cs: pr.cs,
                incCitations: pr.incCite,
                incScanned: pr.incScan,
                incActivity: pr.incAct
            }, { expand: false });
            if (!sections) return null;
            return {
                md: sections.report || '',
                t: sections.title || '',
                extras: {
                    citations: sections.citations || null,
                    scanned: sections.scanned || null,
                    connectorScanned: sections.connectorScanned || null,
                    activity: sections.activity || null
                }
            };
        } catch (_) {
            return null;
        }
    }

    function iframeFindDoc() {
        return getDeepResearchContentDocument(document);
    }
    function iframeFindRoot() {
        return findDRReportRoot(iframeFindDoc());
    }

    async function autoExportDR() {
        toast('Extracting Deep Research...', 6000);
        const pr = gP();
        const pref = {
            cs: pr.cs,
            incCitations: pr.incCite,
            incScanned: pr.incScan,
            incActivity: pr.incAct
        };
        let parts = [];
        let title = '';

        if (IS_DR_IFRAME) {
            const sections = await collectDeepResearchSections(iframeFindDoc(), pref, { expand: true });
            if (sections) {
                appendDRSectionsToParts(parts, sections, pr);
                title = sections.title || title;
            }
        }

        if (!parts.length && !IS_DR_IFRAME && hasDRIframe()) {
            sendToAllIframes({ type: 'h2m-auto-export' });
            const result = await exportViaIframe();
            if (result && result.md && result.md.trim()) {
                parts.push(result.md.trim());
                title = result.t || title;
                const bridge = extractBridgeSections(result);
                if (pr.incCite && bridge.citations) parts.push(bridge.citations.trim());
                if (pr.incScan && bridge.scanned) parts.push(bridge.scanned.trim());
                if (pr.incScan && bridge.connectorScanned) parts.push(bridge.connectorScanned.trim());
                if (pr.incAct && bridge.activity) parts.push(bridge.activity.trim());
            }
            if (!parts.length) {
                const direct = await tryDirectIframeAccess();
                if (direct && direct.md && direct.md.trim()) {
                    parts.push(direct.md.trim());
                    title = direct.t || title;
                    const bridge = extractBridgeSections(direct);
                    if (pr.incCite && bridge.citations) parts.push(bridge.citations.trim());
                    if (pr.incScan && bridge.scanned) parts.push(bridge.scanned.trim());
                    if (pr.incScan && bridge.connectorScanned) parts.push(bridge.connectorScanned.trim());
                    if (pr.incAct && bridge.activity) parts.push(bridge.activity.trim());
                }
            }
        }

        if (!parts.length && !IS_DR_IFRAME && hasDROverlay()) {
            const sections = await collectDeepResearchSections(document, pref, { expand: true });
            if (sections) {
                appendDRSectionsToParts(parts, sections, pr);
                title = sections.title || title;
            }
        }

        if (!parts.length && !IS_DR_IFRAME) {
            const srcdocDoc = findBestSrcdocDocument(document);
            if (srcdocDoc) {
                const sections = await collectDeepResearchSections(srcdocDoc, pref, { expand: false, allowSrcdocFallback: false });
                if (sections) {
                    appendDRSectionsToParts(parts, sections, pr);
                    title = sections.title || title;
                }
            }
        }

        if (!parts.length && IS_CHATGPT) {
            const turns = document.querySelectorAll('article[data-testid^="conversation-turn"]');
            for (let i = turns.length - 1; i >= 0 && !parts.length; i--) {
                const divs = turns[i].querySelectorAll('div.markdown, div.prose, [class*="markdown"], [class*="prose"]');
                for (const d of divs) {
                    if (d.textContent.trim().length > 100) {
                        cit.reset();
                        const md = h2m(d, pr.cs, fiberCites(document));
                        if (md.trim()) parts.push(md.trim());
                    }
                }
            }
        }

        if (!parts.length && IS_GEMINI) {
            const gemini = await extractGeminiMarkdown();
            if (gemini) parts.push(gemini);
        }

        if (!title) title = document.querySelector('h1')?.textContent?.trim() || document.querySelector('h2')?.textContent?.trim() || document.title.replace(/ | ChatGPT$/, '').trim();

        if (parts.length) {
            showModal(fmtOut(parts.join('\n\n---\n\n'), title), { drToolbar: true });
        } else if (!IS_DR_IFRAME && hasDRIframe()) {
            toast('Export triggered inside iframe. If no modal appears, click into the iframe and press Ctrl+M then R.', 5000);
        } else {
            toast('No content found. Try clicking into the iframe first, then Ctrl+M to activate picker.', 5000);
        }
    }

    // =====================================================================
    // PREVIEW MODAL (DOM-built, Trusted-Types safe)
    // =====================================================================
    function showModal(markdown, options) {
        removeOpenH2mModals();
        const opt = options || {};
        const showDROpts = opt.drToolbar !== undefined ? opt.drToolbar : (IS_CHATGPT || IS_GEMINI || IS_DR_IFRAME || hasDROverlay() || hasDRIframe());
        const pr = gP();
        const cOpts = [{ v: 'parenthesized', l: 'Parenthesized' }, { v: 'inline', l: 'Inline' }, { v: 'endnotes', l: 'Endnotes' }, { v: 'footnotes', l: 'Footnotes' }, { v: 'named', l: 'Named' }, { v: 'none', l: 'None' }];
        const ov = el('div', { className: 'h2m-overlay' });
        const md = el('div', { className: 'h2m-modal', style: { position: 'relative' } });
        const tbL = el('div', { className: 'h2m-toolbar-left' });
        const tbR = el('div', { className: 'h2m-toolbar-right' });
        const tb = el('div', { className: 'h2m-toolbar' }, tbL, tbR);

        const cpB = el('button', { className: 'h2m-btn h2m-btn-primary', type: 'button' }, 'Copy');
        const dlB = el('button', { className: 'h2m-btn h2m-btn-success', type: 'button' }, 'Download .md');
        const ghB = el('button', { className: 'h2m-btn', type: 'button' }, 'GitHub Issue');
        const obB = el('button', { className: 'h2m-btn h2m-btn-obsidian', type: 'button' }, 'Obsidian');
        tbL.appendChild(cpB); tbL.appendChild(dlB); tbL.appendChild(ghB); tbL.appendChild(obB);

        const cSel = el('select', { className: 'h2m-select' });
        for (const o of cOpts) { const op = el('option', { value: o.v }, o.l); if (o.v === pr.cs) op.selected = true; cSel.appendChild(op); }
        const mkCb = (lbl, key, def) => { const lb = el('label', { className: 'h2m-lbl', style: { marginLeft: '6px' } }); const cb = el('input', { type: 'checkbox' }); cb.checked = _get(key, def); lb.appendChild(cb); lb.appendChild(document.createTextNode(' ' + lbl)); cb.addEventListener('change', function () { _set(key, this.checked); }); return lb; };

        tbR.appendChild(el('span', { className: 'h2m-lbl' }, 'Cite:')); tbR.appendChild(cSel);
        tbR.appendChild(mkCb('FM', 'h2m_frontmatter', true));
        tbR.appendChild(mkCb('H1', 'h2m_titleH1', false));
        const wrapLb = el('label', { className: 'h2m-lbl', style: { marginLeft: '6px' } });
        const wrapCb = el('input', { type: 'checkbox' });
        wrapCb.checked = !!pr.wrap;
        wrapLb.appendChild(wrapCb);
        wrapLb.appendChild(document.createTextNode(' Wrap'));
        tbR.appendChild(wrapLb);
        if (showDROpts) {
            tbR.appendChild(mkCb('Citations', 'h2m_incCitations', true));
            tbR.appendChild(mkCb('Scanned', 'h2m_incScanned', false));
            tbR.appendChild(mkCb('Activity', 'h2m_incActivity', false));
        }

        const body = el('div', { className: 'h2m-body' });
        if (pr.wrap) body.classList.add('h2m-wrap-text');
        const ta = el('textarea'); ta.value = markdown;
        const pv = el('div', { className: 'h2m-preview' });
        function rp() {
            if (typeof marked !== 'undefined' && marked.parse) {
                const h = marked.parse(ta.value);
                const tmp = new DOMParser().parseFromString(h, 'text/html');
                pv.textContent = '';
                while (tmp.body.firstChild) pv.appendChild(document.adoptNode(tmp.body.firstChild));
            } else { pv.textContent = ta.value; }
        }
        rp(); ta.addEventListener('input', rp);
        wrapCb.addEventListener('change', function () {
            _set('h2m_wrapText', this.checked);
            if (this.checked) body.classList.add('h2m-wrap-text');
            else body.classList.remove('h2m-wrap-text');
        });
        let sc = false;
        ta.addEventListener('scroll', function () { if (sc) { sc = false; return; } const p2 = this.scrollTop / (this.scrollHeight - this.offsetHeight || 1); pv.scrollTop = p2 * (pv.scrollHeight - pv.offsetHeight || 1); sc = true; });
        pv.addEventListener('scroll', function () { if (sc) { sc = false; return; } const p2 = this.scrollTop / (this.scrollHeight - this.offsetHeight || 1); ta.scrollTop = p2 * (ta.scrollHeight - ta.offsetHeight || 1); sc = true; });
        body.appendChild(ta); body.appendChild(pv);
        const clB = el('button', { className: 'h2m-close', type: 'button' }, '\u00D7');
        md.appendChild(tb); md.appendChild(body); md.appendChild(clB); ov.appendChild(md);
        const rm = () => { try { ov.remove(); } catch (_) {} document.removeEventListener('keydown', esc, true); };
        const esc = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                if (typeof e.stopPropagation === 'function') e.stopPropagation();
                if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
                rm();
            }
        };
        document.addEventListener('keydown', esc, true); clB.addEventListener('click', rm); ov.addEventListener('click', e => { if (e.target === ov) rm(); });
        cpB.addEventListener('click', () => { _clip(ta.value); cpB.textContent = 'Copied!'; setTimeout(() => { cpB.textContent = 'Copy'; }, 1500); });
        dlB.addEventListener('click', () => { const b = new Blob([ta.value], { type: 'text/markdown' }); const u = URL.createObjectURL(b); const fn = (document.title || document.querySelector('h1')?.textContent || 'Export').replace(/[\\/:*?"<>|]/g, '_'); const a = el('a', { href: u, download: fn + '.md' }); a.click(); URL.revokeObjectURL(u); });
        ghB.addEventListener('click', () => { const tk = _get('github_token', ''), ow = _get('OWNER', ''), rp2 = _get('REPO', ''); if (!tk || !ow || !rp2) { showGHCfg(); return; } ghIssue(tk, ow, rp2, ta.value.split('\n')[0] || 'Export', ta.value, ['web-clipper']); });
        obB.addEventListener('click', () => {
            const vault = _get('obsidian_vault', '');
            const folder = _get('obsidian_folder', '');
            const name = document.title.replace(/[\\/:*?"<>|]/g, '_') || 'Export';
            if (!vault) { showObsidianCfg(); return; }
            const params = new URLSearchParams({ vault: vault, filepath: (folder ? folder + '/' : '') + name + '.md', data: ta.value, mode: 'new' });
            const link = el('a', { href: 'obsidian://advanced-uri?' + params.toString() }); link.click();
            toast('Sent to Obsidian!', 1500);
        });
        cSel.addEventListener('change', function () { _set('h2m_citationStyle', this.value); });
        document.body.appendChild(ov); ta.focus();
    }

    // =====================================================================
    // OBSIDIAN CONFIG
    // =====================================================================
    function showObsidianCfg() {
        const ov = el('div', { className: 'h2m-overlay' }), md2 = el('div', { className: 'h2m-modal', style: { height: 'min(400px,70vh)', position: 'relative' } }), tb = el('div', { className: 'h2m-toolbar' }, el('span', { style: { fontWeight: '700', fontSize: '14px' } }, 'Obsidian Config')), bd = el('div', { style: { padding: '16px', overflow: 'auto' } });
        const mk = (l, k) => { const lb = el('div', { style: { fontWeight: '600', fontSize: '13px', color: '#ccc', marginTop: '12px' } }, l), ip = el('input', { type: 'text', style: { width: '100%', padding: '8px', border: '1px solid #555', borderRadius: '6px', background: '#2d2d2d', color: '#d4d4d4', fontSize: '13px', marginTop: '4px', boxSizing: 'border-box' } }); ip.value = _get(k, ''); bd.appendChild(lb); bd.appendChild(ip); return ip; };
        const vi = mk('Vault Name', 'obsidian_vault'), fi = mk('Folder (optional)', 'obsidian_folder');
        const ac = el('div', { style: { padding: '12px', display: 'flex', gap: '8px', justifyContent: 'flex-end', borderTop: '1px solid #3a3a3a' } }), sv = el('button', { className: 'h2m-btn h2m-btn-primary', type: 'button' }, 'Save'), cn = el('button', { className: 'h2m-btn h2m-btn-danger', type: 'button' }, 'Close');
        ac.appendChild(sv); ac.appendChild(cn); md2.appendChild(tb); md2.appendChild(bd); md2.appendChild(ac); ov.appendChild(md2);
        const rm = () => ov.remove(); cn.addEventListener('click', rm); ov.addEventListener('click', e => { if (e.target === ov) rm(); });
        sv.addEventListener('click', () => { if (!vi.value.trim()) { toast('Vault name required.'); return; } _set('obsidian_vault', vi.value.trim()); _set('obsidian_folder', fi.value.trim()); toast('Saved.', 1200); rm(); });
        document.body.appendChild(ov);
    }

    // =====================================================================
    // GITHUB
    // =====================================================================
    function showGHCfg() { const ov = el('div', { className: 'h2m-overlay' }), md2 = el('div', { className: 'h2m-modal', style: { height: 'min(520px,80vh)', position: 'relative' } }), tb = el('div', { className: 'h2m-toolbar' }, el('span', { style: { fontWeight: '700', fontSize: '14px' } }, 'GitHub Config')), bd = el('div', { style: { padding: '16px', overflow: 'auto' } });
        const mk = (l, t, k) => { const lb = el('div', { style: { fontWeight: '600', fontSize: '13px', color: '#ccc', marginTop: '12px' } }, l), ip = el('input', { type: t, style: { width: '100%', padding: '8px', border: '1px solid #555', borderRadius: '6px', background: '#2d2d2d', color: '#d4d4d4', fontSize: '13px', marginTop: '4px', boxSizing: 'border-box' } }); ip.value = _get(k, ''); bd.appendChild(lb); bd.appendChild(ip); return ip; };
        const ti = mk('Token', 'password', 'github_token'), oi = mk('Owner', 'text', 'OWNER'), ri = mk('Repo', 'text', 'REPO');
        const ac = el('div', { style: { padding: '12px', display: 'flex', gap: '8px', justifyContent: 'flex-end', borderTop: '1px solid #3a3a3a' } }), sv = el('button', { className: 'h2m-btn h2m-btn-primary', type: 'button' }, 'Save'), cn = el('button', { className: 'h2m-btn h2m-btn-danger', type: 'button' }, 'Close');
        ac.appendChild(sv); ac.appendChild(cn); md2.appendChild(tb); md2.appendChild(bd); md2.appendChild(ac); ov.appendChild(md2);
        const rm = () => ov.remove(); cn.addEventListener('click', rm); ov.addEventListener('click', e => { if (e.target === ov) rm(); });
        sv.addEventListener('click', () => { if (!ti.value.trim() || !oi.value.trim() || !ri.value.trim()) { toast('All fields required.'); return; } _set('github_token', ti.value.trim()); _set('OWNER', oi.value.trim()); _set('REPO', ri.value.trim()); toast('Saved.', 1200); rm(); });
        document.body.appendChild(ov);
    }
    function ghIssue(tk, ow, rp, ti, bd, lb) { const x = new XMLHttpRequest(); x.open('POST', `https://api.github.com/repos/${ow}/${rp}/issues`, true); x.setRequestHeader('Authorization', `token ${tk}`); x.setRequestHeader('Accept', 'application/vnd.github+json'); x.setRequestHeader('Content-Type', 'application/json'); x.onreadystatechange = function () { if (x.readyState === 4) { if (x.status >= 200 && x.status < 300) toast('Issue created!'); else toast(`Error: ${x.status}`, 3500); } }; x.send(JSON.stringify({ title: ti, body: bd, labels: lb })); }

    // =====================================================================
    // ELEMENT SELECTION
    // Uses ranked elementsFromPoint + same-origin iframe descent
    // =====================================================================
    let selecting = false, selEl = null, tipEl = null, _raf = null;
    let _lastX = 0, _lastY = 0;
    let _pickerOriginWarnAt = 0;
    const PICKER_STYLE_ID = 'h2m-picker-style';
    const PICKER_STYLE_CSS = '.h2m-sel{outline:3px dashed #ff2d2d!important;outline-offset:-2px!important;background:rgba(255,30,30,.12)!important;box-shadow:inset 0 0 0 1px rgba(255,0,0,.25)!important;z-index:2147483640!important;position:relative}';

    function sendToAllIframes(msg) {
        postMessageToDeepResearchIframes(msg);
    }

    function walkSameOriginDocs(baseDoc, fn, depth, seen) {
        const doc = baseDoc || document;
        const d = depth || 0;
        const s = seen || new Set();
        if (!doc || s.has(doc) || d > 6) return;
        s.add(doc);
        try { fn(doc); } catch (_) {}
        for (const f of doc.querySelectorAll('iframe')) {
            const child = getIframeDocument(f);
            if (child && child !== doc) walkSameOriginDocs(child, fn, d + 1, s);
        }
    }

    function ensurePickerStyleInDoc(doc) {
        if (!doc) return;
        try {
            if (doc.getElementById(PICKER_STYLE_ID)) return;
            const styleHost = doc.head || doc.documentElement || null;
            if (!styleHost) return;
            const s = doc.createElement('style');
            s.id = PICKER_STYLE_ID;
            s.textContent = PICKER_STYLE_CSS;
            styleHost.appendChild(s);
        } catch (_) {}
    }

    function clearPickerHighlights() {
        walkSameOriginDocs(document, d => {
            for (const el2 of d.querySelectorAll('.h2m-sel')) {
                try { el2.classList.remove('h2m-sel'); } catch (_) {}
            }
        });
    }

    function isUs(n) {
        if (!n || !n.closest) return false;
        if (n.classList && (n.classList.contains('h2m-overlay') || n.classList.contains('h2m-modal') || n.classList.contains('h2m-tip') || n.classList.contains('h2m-toast'))) return true;
        return !!(n.closest('.h2m-overlay,.h2m-modal,.h2m-tip,.h2m-toast'));
    }

    function showCrossOriginPickerGuidance() {
        const now = Date.now();
        if (now - _pickerOriginWarnAt < 8000) return;
        _pickerOriginWarnAt = now;
        toast('Subelement picking is origin-isolated here. Try entering the iframe picker; if it still fails, press R for full Deep Research export.', 6500);
    }

    function viewportSize(doc) {
        const w = (doc && doc.defaultView) ? doc.defaultView : window;
        const width = Math.max(1, (w && w.innerWidth) || (doc && doc.documentElement && doc.documentElement.clientWidth) || 1);
        const height = Math.max(1, (w && w.innerHeight) || (doc && doc.documentElement && doc.documentElement.clientHeight) || 1);
        return { width, height };
    }

    function isGiantViewportWrapper(el2, doc) {
        if (!el2 || !el2.getBoundingClientRect) return false;
        const tag = (el2.tagName || '').toUpperCase();
        if (/^(P|SPAN|A|H1|H2|H3|H4|H5|H6|LI|TD|TH|CODE|PRE|BLOCKQUOTE)$/.test(tag)) return false;
        let rect;
        try { rect = el2.getBoundingClientRect(); } catch (_) { return false; }
        if (!rect || rect.width <= 0 || rect.height <= 0) return false;
        const vp = viewportSize(doc || el2.ownerDocument || document);
        const coverW = rect.width >= vp.width * 0.9;
        const coverH = rect.height >= vp.height * 0.9;
        if (!coverW || !coverH) return false;
        const cls = typeof el2.className === 'string' ? el2.className : '';
        const role = textCompact(el2.getAttribute ? el2.getAttribute('role') : '').toLowerCase();
        if (/overlay|wrapper|container|viewport|page|panel|root|dialog|scroll/i.test(cls)) return true;
        if (role === 'presentation' || role === 'dialog' || role === 'none') return true;
        const childCount = el2.children ? el2.children.length : 0;
        return childCount > 6;
    }

    function pointCandidates(doc, x, y) {
        const out = [];
        const seen = new Set();
        let arr = [];
        try {
            if (doc && typeof doc.elementsFromPoint === 'function') arr = doc.elementsFromPoint(x, y) || [];
        } catch (_) {}
        if (!arr.length) {
            try {
                const one = doc && doc.elementFromPoint ? doc.elementFromPoint(x, y) : null;
                if (one) arr = [one];
            } catch (_) {}
        }
        const shadowExtras = [];
        for (const top of arr) {
            if (!top || !top.shadowRoot || typeof top.shadowRoot.elementsFromPoint !== 'function') continue;
            try {
                const inner = top.shadowRoot.elementsFromPoint(x, y) || [];
                for (const z of inner) shadowExtras.push(z);
            } catch (_) {}
        }
        arr = shadowExtras.concat(arr);
        for (const el2 of arr) {
            if (!el2 || seen.has(el2)) continue;
            seen.add(el2);
            const tag = (el2.tagName || '').toUpperCase();
            if (tag === 'HTML' || tag === 'BODY') continue;
            if (isUs(el2)) continue;
            out.push(el2);
        }
        return out;
    }

    function hasDeeperSpecificCandidate(cands, idx, doc) {
        for (let i = idx + 1; i < cands.length; i++) {
            const c = cands[i];
            if (!c) continue;
            const tag = (c.tagName || '').toUpperCase();
            if (tag === 'HTML' || tag === 'BODY') continue;
            if (isUs(c)) continue;
            if (!isGiantViewportWrapper(c, doc)) return true;
        }
        return false;
    }

    function rankPointCandidates(doc, x, y) {
        const cands = pointCandidates(doc, x, y);
        const ranked = [];
        for (let i = 0; i < cands.length; i++) {
            const el2 = cands[i];
            if (!el2) continue;
            const wrapper = isGiantViewportWrapper(el2, doc);
            const skipWrapper = wrapper && hasDeeperSpecificCandidate(cands, i, doc);
            let score = 1000 - (i * 30);
            const tag = (el2.tagName || '').toUpperCase();
            if (wrapper) score -= skipWrapper ? 950 : 220;
            if (tag === 'IFRAME') score += 140;
            if (/^(P|LI|A|SPAN|H1|H2|H3|H4|H5|H6|TD|TH|CODE|PRE|BLOCKQUOTE)$/.test(tag)) score += 120;
            if (el2.closest && el2.closest('section[aria-labelledby^="report-"]')) score += 80;
            const txtLen = textCompact(el2.textContent || '').length;
            if (txtLen > 0 && txtLen < 1600) score += 20;
            ranked.push({ el2, score, skipWrapper });
        }
        ranked.sort((a, b) => b.score - a.score);
        return ranked;
    }

    function pickTargetAtPoint(doc, x, y, depth) {
        const d = doc || document;
        const level = depth || 0;
        if (level > 6) return { element: null, blockedCrossOrigin: false };

        const ranked = rankPointCandidates(d, x, y);
        let blockedCrossOrigin = false;

        for (const item of ranked) {
            const target = item.el2;
            if (!target) continue;
            const tag = (target.tagName || '').toUpperCase();

            if (tag === 'IFRAME') {
                const childDoc = getIframeDocument(target);
                if (childDoc) {
                    ensurePickerStyleInDoc(childDoc);
                    let rect = null;
                    try { rect = target.getBoundingClientRect(); } catch (_) { rect = null; }
                    if (rect) {
                        const nx = x - rect.left;
                        const ny = y - rect.top;
                        if (nx >= 0 && ny >= 0 && nx <= rect.width && ny <= rect.height) {
                            const nested = pickTargetAtPoint(childDoc, nx, ny, level + 1);
                            if (nested.element) return nested;
                            blockedCrossOrigin = blockedCrossOrigin || nested.blockedCrossOrigin;
                        }
                    }
                } else {
                    blockedCrossOrigin = true;
                }
                if (!item.skipWrapper) return { element: target, blockedCrossOrigin };
                continue;
            }

            if (item.skipWrapper) continue;
            return { element: target, blockedCrossOrigin };
        }

        return { element: null, blockedCrossOrigin };
    }

    function showTip() {
        if (tipEl) tipEl.remove();
        tipEl = el('div', { className: 'h2m-tip' });
        const lines = [
            'Element Picker Active', '',
            '\u2022 Hover to highlight elements',
            '\u2022 Click to select and export',
            '\u2022 Arrow keys: navigate DOM tree',
            '\u2022 Scroll: Up=parent, Down=child',
            '\u2022 Scroll down on iframe: enter iframe',
            '\u2022 R = full Deep Research export',
            '\u2022 G = Gemini export',
            '\u2022 Esc = cancel'
        ];
        for (const l of lines) { if (l === 'Element Picker Active') { tipEl.appendChild(el('strong', null, l)); tipEl.appendChild(document.createTextNode('\n')); } else { tipEl.appendChild(document.createTextNode(l + '\n')); } }
        document.body.appendChild(tipEl);
    }

    function startSel() {
        ensurePickerStyleInDoc(document);
        document.body.classList.add('h2m-no-scroll');
        selecting = true;
        showTip();
    }

    function endSel() {
        selecting = false;
        clearPickerHighlights();
        document.body.classList.remove('h2m-no-scroll');
        if (tipEl) { tipEl.remove(); tipEl = null; }
        selEl = null;
        if (_raf) { cancelAnimationFrame(_raf); _raf = null; }
    }

    function hl(t) {
        if (!t || !t.classList || selEl === t) return;
        ensurePickerStyleInDoc(t.ownerDocument || document);
        if (selEl && selEl.classList) {
            try { selEl.classList.remove('h2m-sel'); } catch (_) {}
        }
        selEl = t;
        selEl.classList.add('h2m-sel');
    }

    function isCrossOriginIframe(iframe) {
        return !!(iframe && iframe.tagName === 'IFRAME' && !getIframeDocument(iframe));
    }

    window.addEventListener('message', function (ev) {
        if (!ev.data) return;
        if (ev.data.type === 'h2m-start-picker') { if (!selecting) startSel(); }
        if (ev.data.type === 'h2m-stop-picker') { if (selecting) endSel(); }
        if (ev.data.type === 'h2m-auto-export') { autoExportDR(); }
    });

    document.addEventListener('mousemove', function (e) {
        if (!selecting) return;
        _lastX = e.clientX; _lastY = e.clientY;
        if (_raf) return;
        _raf = requestAnimationFrame(() => {
            _raf = null;
            if (!selecting) return;
            if (tipEl) tipEl.style.display = 'none';
            const picked = pickTargetAtPoint(document, _lastX, _lastY, 0);
            if (tipEl) tipEl.style.display = '';
            if (!picked || !picked.element) {
                if (picked && picked.blockedCrossOrigin) showCrossOriginPickerGuidance();
                return;
            }
            hl(picked.element);
            if (picked.blockedCrossOrigin && picked.element.tagName === 'IFRAME') showCrossOriginPickerGuidance();
        });
    }, true);

    function sendPickerToIframe(iframe) {
        let posted = false;
        try {
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage({ type: 'h2m-start-picker' }, '*');
                posted = true;
            }
        } catch (_) {}

        if (!posted) {
            toast('Unable to send picker to this iframe. Press R for full Deep Research export.', 5000);
            return;
        }

        if (isCrossOriginIframe(iframe)) {
            toast('Origin-isolated iframe detected. Attempted iframe handoff; if no highlight appears, press R for full Deep Research export.', 6500);
        } else {
            toast('Picker activated inside iframe. Click into the iframe to select elements.', 3000);
        }
    }

    document.addEventListener('wheel', function (e) {
        if (!selecting) return;
        e.preventDefault();
        if (!selEl) return;
        if (e.deltaY < 0) {
            const p = selEl.parentElement;
            if (p && p.tagName !== 'HTML' && p.tagName !== 'BODY') hl(p);
        } else {
            if (selEl.tagName === 'IFRAME') {
                sendPickerToIframe(selEl);
                endSel();
                return;
            }
            const c = selEl.firstElementChild;
            if (c) hl(c);
        }
    }, { passive: false, capture: true });

    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'm') { e.preventDefault(); if (selecting) endSel(); else startSel(); return; }
        if (!selecting) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            if (typeof e.stopPropagation === 'function') e.stopPropagation();
            if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
            try { window.parent.postMessage({ type: 'h2m-stop-picker' }, '*'); } catch (_) {}
            endSel();
            return;
        }
        if (e.key.toUpperCase() === 'R') {
            e.preventDefault(); endSel();
            if (!IS_DR_IFRAME && hasDRIframe()) sendToAllIframes({ type: 'h2m-auto-export' });
            autoExportDR();
            return;
        }
        if (e.key.toUpperCase() === 'G' && IS_GEMINI) {
            e.preventDefault();
            endSel();
            extractGeminiMarkdown().then(g => {
                if (g) showModal(fmtOut(g, document.title), { drToolbar: true });
                else toast('No Gemini content found.', 3000);
            });
            return;
        }
        if (!selEl) return;
        const nav = { ArrowUp: 'p', ArrowDown: 'c', ArrowLeft: 'l', ArrowRight: 'r' }[e.key];
        if (!nav) return;
        e.preventDefault();
        let nx = null;
        switch (nav) { case 'p': nx = selEl.parentElement; break; case 'c': nx = selEl.firstElementChild; break; case 'l': nx = selEl.previousElementSibling; break; case 'r': nx = selEl.nextElementSibling; break; }
        if (nx && nx.tagName !== 'HTML' && nx.tagName !== 'BODY') hl(nx);
    }, true);

    document.addEventListener('mousedown', function (e) {
        if (!selecting) return;
        if (isUs(e.target)) return;
        e.preventDefault();
        e.stopImmediatePropagation();

        if (tipEl) tipEl.style.display = 'none';
        const picked = pickTargetAtPoint(document, e.clientX, e.clientY, 0);
        if (tipEl) tipEl.style.display = '';
        if (picked && picked.element && picked.element !== selEl) hl(picked.element);
        if (picked && picked.blockedCrossOrigin && (!picked.element || picked.element.tagName === 'IFRAME')) showCrossOriginPickerGuidance();
        if (!selEl) return;

        const clickedEl = selEl;
        endSel();

        if (clickedEl.tagName === 'IFRAME' && isDRElement(clickedEl)) {
            sendPickerToIframe(clickedEl);
            sendToAllIframes({ type: 'h2m-auto-export' });
            autoExportDR();
        } else if (clickedEl.tagName === 'IFRAME') {
            sendPickerToIframe(clickedEl);
        } else if (IS_CHATGPT && !IS_DR_IFRAME && isDRElement(clickedEl)) {
            autoExportDR();
        } else {
            const ownerDoc = clickedEl.ownerDocument || document;
            cit.reset();
            const md2 = h2m(clickedEl, gP().cs, fiberCites(ownerDoc));
            const drToolbar = IS_CHATGPT || IS_GEMINI || IS_DR_IFRAME || hasDROverlay() || hasDRIframe();
            showModal(fmtOut(md2, ownerDoc.title || document.title), { drToolbar });
        }
    }, true);

    document.addEventListener('click', function (e) { if (selecting) { e.preventDefault(); e.stopImmediatePropagation(); } }, true);
    document.addEventListener('mouseup', function (e) { if (selecting) { e.stopImmediatePropagation(); } }, true);

    // =====================================================================
    // MENU COMMANDS
    // =====================================================================
    _menu('Convert to Markdown', () => { if (selecting) endSel(); else startSel(); });
    _menu('GitHub Configuration', () => showGHCfg());
    _menu('Obsidian Configuration', () => showObsidianCfg());
    if (IS_CHATGPT || IS_GEMINI || IS_DR_IFRAME) _menu('Export Deep Research', () => autoExportDR());

    // =====================================================================
    // URL CHANGE DETECTION
    // =====================================================================
    if (IS_CHATGPT || IS_GEMINI) { let lu = location.href; setInterval(() => { if (location.href !== lu) lu = location.href; }, 1000); }

})();
