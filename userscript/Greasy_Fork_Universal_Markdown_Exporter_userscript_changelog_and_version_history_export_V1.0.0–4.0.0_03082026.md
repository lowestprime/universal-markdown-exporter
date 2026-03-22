---
title: "Greasy Fork Universal Markdown Exporter – Changelog and Version History V1.0.0–4.0.0"
date: 2026-03-08
source: https://greasyfork.org/en/scripts/568581-universal-markdown-exporter/versions?show_all_versions=1
---

# Universal Markdown Exporter Changelog and Version History V1.0.0–4.0.0 \[Retrieved March 8, 2026\]

Converts most web page elements into clean Markdown with visual element selection and live editor preview support. This Trusted-Types safe script supports extraction and conversion from ChatGPT deep research overlays with sub-element selection inside the maximized panel, including citation/sources/thinking-activity extraction, and Google Gemini deep research reports and canvases, featuring 6 citation styles, YAML frontmatter integration, and exporting to clipboard/file/GitHub/Obsidian.

These are all versions of this script. Each major update includes a description answering the question: what's changed in this version relative to its immediate predecessor?

## Version 4.0.0

| # | Change | Why |
| --- | --- | --- |
| 1 | Added `@match [https://*.web-sandbox.oaiusercontent.com/*](https://*.web-sandbox.oaiusercontent.com/*)` | Explicit iframe domain match (same as reference script) ensures script manager injects into the iframe |
| 2 | `initBridge` rewritten with `getContentDocument()` | Checks for nested same-origin inner iframe first (proven pattern from reference script). Falls back to `document` |
| 3 | `findReportContainer()` uses multi-selector cascade + div-with-heading fallback | Tries `_reportPage_`, `main`, `article`, `.report`, `.content`, then finds the div containing `h1`/`h2` with the most text. Never returns null. |
| 4 | `waitForContent()` uses `getContentDocument()` | Checks nested iframe's body length, not just outer document |
| 5 | Added `iframeFindDoc()` and `iframeFindRoot()` as top-level helpers | Used by `autoExportDR` when `IS_DR_IFRAME` is true for direct local extraction |
| 6 | Added `h2m-auto-export` message type | Parent sends this to all iframes. The iframe receives it and runs `autoExportDR()` locally, showing the modal **inside the iframe itself** |
| 7 | R key handler sends `h2m-auto-export` to all iframes | Triggers local export inside iframe even if bridge fails |
| 8 | DR iframe click sends both `h2m-start-picker` AND `h2m-auto-export` | Activates picker inside iframe AND triggers export |
| 9 | `sendToAllIframes()` helper | Broadcasts a message to every iframe on the page |
| 10 | Parent-side fallback scans conversation turns from newest to oldest | For minimized state, finds the last turn with `.markdown`/`.prose` content |
| 11 | Failure toast gives actionable instructions | "Click into the iframe first, then Ctrl+M" instead of just "not found" |

**How to use (three methods):**

- **Method A**: Press `R` with picker active. The parent sends `h2m-auto-export` to the iframe, which runs local export and shows the modal inside the iframe.

- **Method B**: Click into the iframe to give it focus, then press `Ctrl+M` to activate the picker inside the iframe directly. Hover, arrow-navigate, click to export any sub-element.

- **Method C**: In the parent picker, scroll down on the highlighted iframe to send `h2m-start-picker`, activating the picker inside the iframe.

## Version 3.2.0

| Component | Before (broken) | After (fixed) |
| --- | --- | --- |
| `getReportRoot()` | `[class*="_reportPage_"]` only | Tries `_reportPage_` first, then `#root > main`, then `main` with content check |
| `getContentArea()` | Did not exist | New function: finds `.sticky.z-10.flex.min-w-0.flex-1` scrollable area with headings |
| `getTitle()` | `[class*="_reportPage_"] h1` | Tries `h1`, falls back to `h2`, then `document.title` |
| `waitForContent()` | Waited for `_reportPage_` | Waits for `main` with 200+ chars of text content (20s timeout) |
| `hasDRIframe()` | Two selectors | Three selectors: also matches `connector_openai_deep_research` |
| `getDRIframe()` | Two selectors | Three selectors with same addition |
| `hasDROverlay()` | Did not check iframe | Now returns true if `hasDRIframe()` is true |
| `exportViaIframe()` | Single message, 20s timeout | Retries at 2s, 5s, 10s intervals; 25s total timeout |
| `extractDRReport()` (parent) | `_reportPage_` only | Falls back to last conversation turn's `.markdown`/`.prose` div |
| `autoExportDR()` (parent, minimized) | Required `incCite`/`incScan`/`incAct` prefs | Always tries citations/scanned/activity; also scans all conversation turns |
| `getDROverlayContainer()` | Required `position:fixed` + `z-index>40` | Also accepts `position:absolute` + `z-index>10`; falls back to parent element |
| Tab click sleep | 800ms | 1000ms (more time for React re-render) |
| Activity body selector | Required `[class*="mt-"]` compound | Simplified to `[class*="text-token-text-secondary"]` |
| Source title min length | 5 chars | 3 chars (matches short domain names like `nih.gov`) |

## Version 3.1.0

1. **Removed the early `return`** (line 94): `initBridge()` is still called inside the iframe to set up the bridge for parent-page automated exports, but execution now **continues** to initialize the full script -- styles, element picker, modal, `h2m` converter, and all keyboard shortcuts -- inside the iframe's own document context. This means `Ctrl+M` inside the iframe activates the picker, hovering highlights sub-elements, clicking exports them, arrow keys navigate the DOM tree, and `R` triggers the full Deep Research export with sources and activity -- all running natively inside the iframe with direct DOM access.

2. **`autoExportDR()` now handles the iframe-local case first**: When `IS_DR_IFRAME` is true, it extracts the report, clicks the Sources tab, extracts sources, clicks the Activity tab, extracts activity -- all directly from the local DOM without any `postMessage` round-trip. This is the most reliable path.

3. **Cross-frame picker activation via `postMessage`**: Added `h2m-start-picker` / `h2m-stop-picker` message handlers. When the parent page's picker highlights an iframe and the user scrolls down into it (or clicks a non-DR iframe), the parent sends a message to activate the picker inside that iframe. This works for **any** iframe on **any** website where the script is running, not just Deep Research.

4. **`sendPickerToIframe()` function**: New helper that posts `h2m-start-picker` to an iframe's `contentWindow` and shows a toast. Called when scrolling down on an iframe element or clicking a non-DR iframe.

5. **Smarter mousedown handler**: Clicking an iframe now distinguishes between DR iframes (triggers `autoExportDR`) and generic iframes (sends picker activation message). Clicking any non-iframe element inside the iframe does a normal `h2m` conversion and shows the modal.

6. **Robust `fmtOut` for iframe context**: Uses `document.referrer` (the ChatGPT URL) as the source URL in YAML frontmatter when running inside the iframe, instead of the sandbox URL.

7. **Robust download filename**: Falls back to `h1` text content when `document.title` is empty (common inside iframes).

8. **Updated tip text**: Concise instructions including the new "scroll down on iframe to enter" interaction.

**How to use inside the maximized Deep Research panel:**

- **Method A (recommended):** Press `Ctrl+M` on the parent page, hover the iframe, scroll down to "enter" it. The picker activates inside the iframe. Now hover, click, arrow-navigate, and scroll to select any sub-element of the report, aside panel, individual citations, etc.

- **Method B:** Click into the iframe first (to give it focus), then press `Ctrl+M` directly inside the iframe. The picker activates natively.

- **Method C:** Press `R` (with picker active, from either parent or iframe) for a full automated Deep Research export including report + sources + activity.

## Version 3.0.0

**Complete rewrite of `initBridge()`** (the code that runs inside the iframe):

- `getReportRoot()` finds `[class*="_reportPage_"]` directly in the iframe's `document`

- `getAside()` finds the `<aside>` element containing the tab panel

- `clickTab(name)` clicks the Sources or Activity tab button (`button[role="tab"]`) to switch the visible panel content

- `extractSourcesFromAside()` extracts all `a[href][target="_blank"]` links from the aside after the Sources tab is active

- `extractActivityFromAside()` extracts thinking activity entries from the aside after the Activity tab is active

- The `message` handler is now `async` so it can `await sleep(800)` after tab clicks to let React re-render

- The response now includes `sources` and `activity` fields alongside the report `md`

**Updated `exportViaIframe()`**: Passes `incSources` and `incActivity` flags to the bridge, receives the new response fields, timeout increased to 20s to accommodate tab-switching delays.

**Updated `autoExportDR()`**: Assembles the report + sources + activity from the bridge response with proper headings. Falls back to parent-side extractors only if the iframe bridge returns nothing (for the non-maximized case).

## Version v2.4.0 Changes

### Root Cause: The DOM is Split Across Two Origins

The previous versions had a fundamental architectural misunderstanding. By testing the actual HTML example files, I confirmed:

| Content | Where it lives | Accessible from parent? |
| --- | --- | --- |
| **Report body** (`_reportPage_` div) | Inside the cross-origin iframe (`web-sandbox.oaiusercontent.com`) | No - cross-origin blocked |
| **Citations** (`section[aria-labelledby="report-references-citations"]`) | **Parent page** (`chatgpt.com`) | Yes |
| **Scanned sources** (`section[aria-labelledby="report-references-sources-scanned"]`) | **Parent page** (`chatgpt.com`) | Yes |
| **Research activity** (`section[aria-labelledby="report-activity-title"]`) | **Parent page** (`chatgpt.com`) | Yes |
| **Duration** (`.text-token-text-secondary.mb-3.text-sm`) | **Parent page** (`chatgpt.com`) | Yes |

v2.2.0 and v2.3.0 tried to extract citations/scanned/activity **from inside the iframe bridge**, but these elements don't exist there. They exist in the parent page's DOM and are directly queryable.

### What v2.4.0 Changes

1. **Removed bridge extraction functions** -- `bridgeExtractCitations`, `bridgeExtractScanned`, `bridgeExtractActivity` were deleted from `initBridge()`. The bridge now only extracts the report body (which IS inside the iframe).

2. **Fixed `autoExportDR()`** -- Now correctly: (a) gets the report body via the iframe bridge, then (b) extracts citations/scanned/activity directly from the parent page DOM using the existing `extractDRCitations()`, `extractDRScanned()`, `extractDRActivity()` functions.

3. **Added `tryDirectIframeAccess()` fallback** -- If the `postMessage` bridge times out (e.g., the userscript hasn't loaded in the iframe yet), attempts direct DOM access via `iframe.contentDocument` (works if `allow-same-origin` grants access).

4. **Improved `initBridge()`** -- Better content detection: looks for `_reportPage_` class specifically, handles nested iframes, more robust `wr()` readiness check.

5. **Broadened `hasDROverlay()`** -- Also detects `_reportContainer_` and `section[aria-labelledby^="report-"]` elements in the parent DOM.

6. **Improved `exportViaIframe()`** -- Broadcasts `postMessage` to all iframes (handles triple-nesting where the userscript might run in a different iframe than expected).

7. **Element picker** -- Side panel elements (citations, activity) are in the parent DOM and CAN be highlighted/selected normally. Only the iframe content itself is opaque to `elementFromPoint`. Clicking any element detected as DR-related triggers `autoExportDR()`.

## V2.3.0 Changelog

### Root Cause

When the ChatGPT Deep Research panel is **maximized**, the entire report (including citations, scanned sources, and research activity) renders inside a **cross-origin iframe** at `web-sandbox.oaiusercontent.com`. This is a fundamental browser security boundary:

- `document.elementFromPoint()` from the parent page returns the `<iframe>` element itself, never its children

- `document.querySelector(...)` on the parent page cannot find `section[aria-labelledby="report-references-citations"]` or any other DR elements because they exist only inside the iframe's DOM

- The existing `initBridge()` function ran inside the iframe but only extracted the report body, not citations/scanned/activity

### Improvements

**1. Enhanced iframe bridge** (lines 100-149) - The bridge running inside the iframe now includes full duplicates of the citation, scanned source, and activity extraction logic (`bridgeExtractCitations`, `bridgeExtractScanned`, `bridgeExtractActivity`). When the parent sends a `postMessage` request with `incCite`/`incScan`/`incAct` flags, the bridge extracts all requested data from within the iframe DOM and sends it back.

**2. Fixed `exportViaIframe()`** (lines 473-491) - Now passes the user's citation/scanned/activity preferences to the iframe and receives the extracted data back in the response.

**3. Fixed `autoExportDR()`** (lines 504-542) - Now checks for the iframe **first** (maximized case), assembles report + citations + scanned + activity from the bridge response. Falls back to same-origin overlay extraction only if no iframe is found.

**4. Fixed `isDRElement()`** (lines 458-471) - Now recognizes the iframe element itself (by `title` or `src` attributes) and any element within the iframe's parent container as a DR element, so clicking it triggers `autoExportDR()`.

**5. Fixed element picker** (lines 670-701) - `findDRIframeAt()` detects when the mouse is over the DR iframe and redirects highlighting to the iframe element. Both `mousemove` and `mousedown` handlers use this, so hovering over the maximized panel highlights the iframe and clicking it triggers the full Deep Research export.

**6. Broader iframe detection** - `hasDRIframe()` and `getDRIframe()` now also match by `src*="web-sandbox.oaiusercontent.com"` as a fallback, in case the `title` attribute changes.

## Universal Markdown Exporter v2.2.0

### Critical Bugs Fixed

**1. `extractDRCitations` - Typo and broken selector**

The v2.1.0 code had a fatal typo on line 242: `urlUrl.getAttribute('href')` instead of `urlEl.getAttribute('href')`. This would cause a crash during citation extraction attempts. Additionally, the selector strategy was restructured as follows:

- Citation groups (`div.flex.flex-col.gap-0`) are now queried first, falling back to direct `button[aria-label^="Open source"]` queries as necessary.

- Each citation button contains its own `a[href]` with the individual source URL.

- Confirmed via DOM API testing that React's `createElement`-based DOM allows nested buttons to work correctly (unlike HTML parser behavior in JSDOM).

**2. `extractDRScanned` - Broken structure assumption**

The v2.1.0 code assumed scanned items had individual URLs. Audit of the real HTML revealed:

- Scanned sources are grouped by **domain** (206 domain groups for 554 items)

- Each domain group has ONE `a[href]` at the domain level

- Individual scanned items have only titles and snippets, **no individual URLs**

- Rewrote to: iterate domain groups -> get domain href -> list each item's title linked to domain URL, with snippet as sub-item

**3. `extractDRActivity` - Broken selectors and wrong entry type handling**

- Title selector used `'.text-token-text-primary.text-\\[14px\\]'` -- the escaped bracket syntax doesn't work in `querySelector`. Changed to `.text-token-text-primary` (sufficient and correct).

- Body selector `.text-token-text-secondary.mt-2` was wrong for "Searching" entries which use `.mt-1` for their link container.

- The code assumed all "Searching" entries have links. Audit revealed two types:

- **Bare "Searching"** (19 entries): have links in `div.mt-1 > div.flex-wrap > a[href]`, no body text.

- **"Searching for X"** (6 entries): have body text in `.text-token-text-secondary.mt-2`, no links.

- Rewrote to handle both cases correctly, with proper link extraction from the `.mt-1` container.

**4. `extractDRDuration` - Numbers were garbled from animated spans**

The duration div uses animated CSS number roller spans (`span[role="img"]`). Calling `.textContent` on these returns all digits 0-9 concatenated. Fixed to use `aria-label` attributes which contain the clean numeric values (verified: `aria-label="n"` for citations, `aria-label="n"` for searches).

### Element Picker Fixes

**1. `mousemove` handler - elementFromPoint accuracy**

The v2.1.0 code hid only the tip element before calling `elementFromPoint`. But the `.h2m-sel` outline on the currently selected element could also interfere with hit-testing. Now temporarily removes the `.h2m-sel` class from the current element before `elementFromPoint` and restores it after.

**2. `mousedown` handler - DR-aware click behavior**

Previously, clicking any element inside the DR overlay would just convert that single element to markdown (often a single paragraph). Now detects if the clicked element is inside a DR overlay via `isDRElement()` and automatically triggers the full `autoExportDR()` flow with all panel extractors.

### Enhancements

**1. Gemini extraction** - Added `extractGemini()` function for `gemini.google.com` conversations and canvases, with `G` keyboard shortcut.

**2. Obsidian export** - Added purple "Obsidian" button to the modal toolbar with `obsidian://advanced-uri` integration, plus a configuration dialog for vault name and folder.

**3. `stripUtm` helper** - Centralized UTM parameter stripping to avoid repetition across extractors.

### Output Format Alignment

The extractors now produce markdown matching the following template:

### **Citations [`x` Sources]**

1. [citation 1](citation%20url%201)
...

### **Scanned [`y` Sources]**

1. [source 1](source%20url%201)

1. content 1 if present
...

### **Thinking Activity [Research completed in `z`]**

1. *thought subtitle 1***

1. thought summary 1
...

zx. **Searching**

1. [citation title 1](url%201)

2. [citation title 2](url%202)

3. [citation title 3](url%203)
...
zx. [citation title zx](url%20zx)
...

## Universal Markdown Exporter v2.1.0

### 1. Element picker now works INSIDE the maximized Deep Research overlay

The root cause was that ChatGPT's React synthetic event system calls `stopPropagation()` on pointer events within the overlay, preventing `pointermove` from reaching document-level listeners.

**Fix**: Replaced `pointermove` with native `mousemove` + `document.elementFromPoint(x, y)`. This bypasses React's event interception entirely -- `elementFromPoint` queries the rendering tree directly regardless of what React does with events. The tip overlay is temporarily hidden during the query so it does not intercept the hit test. Combined with `mousedown` (instead of `click`) with `stopImmediatePropagation()`, this ensures the export fires before React's handlers can mask the event.

You can now hover over individual paragraphs, headings, list items, and citations **inside** the maximized deep research panel, and click to export just that element.

### 2. Deep Research panel extractors (Citations, Sources Scanned, Thinking Activity)

Three new dedicated extractors parse the same-origin DOM panels directly:

- **`extractDRCitations()`** -- Parses `section[aria-labelledby="report-references-citations"]`, extracts each numbered citation with title and URL into the format `1. [title](url)`

- **`extractDRScanned()`** -- Parses `section[aria-labelledby="report-references-sources-scanned"]`, extracts grouped sources with snippets

- **`extractDRActivity()`** -- Parses `section[aria-labelledby="report-activity-title"]`, extracts thinking steps with titles, summaries, and "Searching" entries with their source links

### 3. Toggleable export options in the modal toolbar

The preview modal now has checkboxes for **Citations**, **Scanned**, and **Activity** that persist via `GM_setValue`. When pressing **R** or using the menu command, the export automatically appends whichever panels are toggled on.

## Universal Markdown Exporter v2.0.0 \[Trusted-Types Safe Rewrite\]

### Architecture: 100% Trusted-Types Safe

The script was rewritten from scratch with **zero `innerHTML`**, **zero jQuery**, **zero Turndown**, and **zero `insertAdjacentHTML`**. Every UI element is constructed via the DOM API using a compact `el()` helper function. This means it can function normally, even on strict Content Security Policy sites like **gemini.google.com** without requiring a separate "Trusted Types safe" variant.

### Removed Dependencies:

1. jQuery (3 files: jquery, jqueryui, turndown-plugin-gfm)

2. Turndown.js

3. All `\$()`, `.html()`, `.append(\$(...))` patterns

### Retained Dependency:

- `marked.js` -- however, the preview renderer now uses `DOMParser().parseFromString()` + `document.adoptNode()` instead of `innerHTML`, in full compliance with Trusted Types Content Security Policies.

### Universal Element Selection

The element picker (`Ctrl+M` or Tampermonkey menu) uses native `pointermove`/`click`/`wheel`/`keydown` event listeners with the `capture: true` phase, enabling versatile and consistent performance across diverse web pages.

- **Hover** highlights elements with a red dashed outline

- **Click** exports the highlighted element to markdown

- **Arrow keys** navigate parent/child/sibling

- **Scroll wheel** zooms parent/child

- **R key** auto-detects and exports Deep Research or Gemini content

- **Esc** cancels

When clicking an element that contains or IS a Deep Research iframe, the script automatically routes to the `postMessage` bridge pathway instead of trying to convert the opaque iframe container.

### Deep Research Support

- **Live iframe bridge**: Inside `web-sandbox.oaiusercontent.com`, the script runs as a bridge listener, extracting content via the custom converter and passing it back to the parent via `postMessage`

- **React fiber traversal**: Recovers citation URLs from `__reactFiber` nodes (`props.item.reference.safe_urls`)

- **Srcdoc parsing**: Handles saved/exported HTML pages with nested entity-encoded `srcdoc` content

### Gemini Support

Detects `gemini.google.com`, extracts conversation turns (`message-content` elements, `[data-message-id]`), canvas content, and routes through the same markdown converter.

### Preview Modal

Built entirely from DOM nodes -- dark theme, split-pane with editable textarea on the left and live rendered preview on the right, synced scrolling, toolbar with Copy/Download/GitHub Issue/Obsidian export, citation style selector, frontmatter toggle, and title-as-H1 toggle.

# [v1.0.1](/en/scripts/568581-universal-markdown-exporter?version=1767794)
2026-03-06

# [v1.0.1](/en/scripts/568581-universal-markdown-exporter?version=1767788)
2026-03-06

# [v1.0.0](/en/scripts/568581-universal-markdown-exporter?version=1767785)
2026-03-06
