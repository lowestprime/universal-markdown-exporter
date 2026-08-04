## Deep Research export routing and picker reliability patch (2026-08-03)

### Scope
- Stop element selection from activating ChatGPT links/routes.
- Guarantee a single export modal owned by the top-level page.
- Correlate iframe requests to the active visible Deep Research frame.
- Restore nested/full-page Deep Research subelement selection.
- Narrow Sources/Activity automation to explicit controls.
- Add reproducible browser regression coverage and update release documentation.

### Root causes
- Selection ended on `mousedown`, so the following `click` escaped the guard and activated anchors/React routes.
- Parent full export sent `h2m-auto-export` to every frame while also requesting bridge data; both parent and child opened modals.
- Bridge responses had neither request IDs nor `event.source` validation, so the first response from any stale/hidden report frame could win.
- The parent treated any non-iframe Deep Research element as a full-export trigger, preventing targeted subelement conversion.
- Right-panel discovery clicked broad icon-only controls instead of the explicit `Sources and activity` control.

### Implementation checklist
- [x] Add runtime/modal singleton guards.
- [x] Replace broadcast bridge traffic with active-frame, request-correlated messaging.
- [x] Make embedded frames data/picker workers and forward preview ownership to the parent.
- [x] Add durable pointer/click suppression across the complete activation sequence.
- [x] Permit normal conversion of Deep Research subelements; reserve `R` for full export.
- [x] Narrow side-panel/tab selectors and visible-frame selection.
- [x] Remove shadowed legacy extractor declarations.
- [x] Add Node/static and Playwright browser regression tests.
- [x] Update version, changelog, and README.
- [x] Run syntax, regression, and fixture validation.

### Validation target
- Selecting an anchor must not change the page URL.
- Full export from a parent with an embedded report must create exactly one modal total.
- Two report iframes must return data only from the selected active frame.
- Clicking a report subelement must export that element instead of triggering full report export.
- The supplied expanded Deep Research DOM must yield one report root, 45 citations, and explicit Sources/Activity controls.

### Validation completed
- `node tools/validate_userscript.mjs` — passed.
- `python tools/browser_regression.py` — passed in Chromium.
- `python tools/inspect_deep_research_dom.py <expanded-dom.html> --assert-expanded-report` — passed: one report root, 45 source controls, three report-reference sections, two `Sources and activity` controls, and two tabs.
- `node --check userscript/Universal_Markdown_Exporter.user.js` — passed.
- `git diff --check` — passed.

---

## Deep Research reliability patch plan (2026-04-22)

### Scope
- Fix ChatGPT Deep Research iframe subelement picking/handoff.
- Auto-open right-side Sources/Activity panel before extraction.
- Ensure Research Activity exports include nested body bullets under each heading.
- Update changelog for the patch release.

### Findings
- Parent-page picker could only see the cross-origin iframe shell and would immediately trigger full export on DR iframe click, preventing real subelement handoff inside the iframe context.
- Bridge results can contain the report body while side-panel extras are missing when the right panel is not already mounted/open.
- Activity extraction relied on strict body selectors; some entries in the latest markup did not match, causing headings-only output.

### Implementation checklist
- [x] Add explicit right-panel open helper plus robust tab activation retries.
- [x] Keep report extraction doc and panel extraction doc split so panel selectors run on chat DOM.
- [x] Add bridge-success fallback to parent-side panel extraction for missing sections.
- [x] Improve activity extraction fallback by cloning entry and stripping title/controls to recover body text.
- [x] Change DR iframe click behavior in picker to handoff-only (no forced full export).
- [x] Add repeated iframe picker postMessage retries for slower sandbox readiness.
- [x] Bump userscript version and update changelog.
- [x] Run syntax validation.

### Validation
- `node --check userscript/Universal_Markdown_Exporter.user.js` passed.