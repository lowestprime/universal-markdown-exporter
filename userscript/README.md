# Universal Markdown Exporter

Converts highlighted html elements from most web pages into clean Markdown, expressly integrating conversion and export support for **ChatGPT Deep Research** reports and similar elements across various web pages, including citation extraction with source URLs from sandboxed iframes and srcdoc-embedded report handling, featuring 6 citation styles, YAML frontmatter support, a visual element picker, live preview editor, and clipboard/file/GitHub/Obsidian export capability.

## Background and Motivation

ChatGPT's Deep Research reports (as of ~March, 2026) are rendered inside sandboxed `<iframe>` elements on `web-sandbox.oaiusercontent.com`. Standard web clippers and HTML-to-Markdown tools cannot access these iframes, causing userscript malfunctions and empty or malformed outputs. Saved/exported ChatGPT pages embed the report as HTML-entity-encoded `srcdoc` attributes with multiple layers of encoding. Citation URLs are stored in React's internal fiber state, invisible in the static HTML. This script rectifies all three challenges, building upon the exceptional work of shiquda and ChinaGodMan's [MarkDown Cloud Cut Notes](https://greasyfork.org/scripts/530139).

## Foundation

This tool is a direct fork of shiquda and ChinaGodMan's [MarkDown Cloud Cut Notes](https://greasyfork.org/scripts/530139) (v2025.03.19), with additional inspiration drawn from Chris Kephart's exemplary [ChatGPT Deep Research Markdown Exporter](https://greasyfork.org/scripts/542065). The source code has been  substantially refactored, introducing the following revisions:

1. **ChatGPT Deep Research iframe bridge** — Uses `postMessage` to communicate with the sandboxed iframe, extracting the full report content including headings, paragraphs, tables, code blocks, and citations
2. **React fiber citation extraction** — Traverses `__reactFiber` internal properties on `<sup data-citation-index>` elements to recover source URLs from `props.item.reference.safe_urls`
3. **srcdoc report parsing** — Decodes nested HTML entity encoding in saved ChatGPT pages to extract deep research content from `<iframe srcdoc="...">` attributes
4. **Custom HTML-to-Markdown converter** — Purpose-built recursive DOM walker for the deep research report structure
5. **6 citation styles** — Parenthesized `([1](url))`, inline `[1](url)`, endnotes `[1]`, footnotes `[^1]`, named `([domain](url))`, or none — with automatic deduplication
6. **YAML frontmatter** — Optional metadata block with title, date, and source URL
7. **Enhanced Turndown rules** — LaTeX/MathJax, KaTeX, `<mark>` highlights, `<details>` blocks, task list checkboxes, iframe skip
8. **Redesigned UI** — Dark-theme preview modal with toolbar, live Markdown editor, synced scrolling
9. **Stripped to English only** — Removed all non-English translations and metadata

## Usage

1. **From target website** — Press `Ctrl+M` (or use the Tampermonkey menu → "Convert to Markdown") to enter element selection mode. Use arrow keys or scroll wheel and cursor to navigate across elements, then click to convert the highlighted element of interest.
2. **ChatGPT Deep Research** — Press `R` during selection mode, or use the Tampermonkey menu → "Export Deep Research" to auto-detect and extract the full report with citations.
3. **Saved ChatGPT HTML files** — Open the saved `.html` file in your browser. The script detects `srcdoc` iframes and extracts the embedded report.

## Export options

- Copy to clipboard
- Download as `.md` file
- Send to GitHub Issues
- Send to Obsidian via Advanced URI
- Modal **Wrap** toggle (persisted) plus horizontal scroll on the editor/preview panes for long lines
- On ChatGPT / Gemini / Deep Research contexts, optional **Citations**, **Scanned**, and **Activity** toggles; on other sites the modal stays minimal unless a Deep Research shell is present

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+M` | Start element selection |
| Arrow keys | Navigate elements (parent/child/sibling) |
| Scroll wheel | Expand/shrink selection |
| `R` | Auto-export Deep Research content |
| `Esc` | Cancel selection or close modal |
| Click | Convert selected element to Markdown |

## Requirements

- [Tampermonkey](https://www.tampermonkey.net/) or compatible userscript manager
- Works on Chrome, Firefox, Edge, Opera, Safari, Brave