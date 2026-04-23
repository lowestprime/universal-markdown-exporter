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