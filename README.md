# Universal Markdown Exporter

A Trusted-Types-safe userscript for converting web content into clean Markdown, with first-class support for ChatGPT Deep Research reports, Google Gemini deep research pages, citation/source extraction, live Markdown preview, and export targets including clipboard, Markdown download, GitHub Issues, and Obsidian.

- Greasy Fork: <https://greasyfork.org/en/scripts/568581-universal-markdown-exporter>
- Current public version: `4.2.1`
- Author: `lowestprime`
- License: MIT
- Userscript manager: Tampermonkey, Violentmonkey, Greasemonkey, or compatible

## Why this exists

Standard browser clippers and generic HTML-to-Markdown converters often fail on modern AI research pages because the visible report is split across nested iframes, sandboxed documents, React state, dynamically mounted side panels, and citation widgets that do not exist as ordinary static HTML. Universal Markdown Exporter provides a browser-native workflow for selecting page elements and exporting high-fidelity Markdown while preserving structure, citations, scanned sources, and thinking/activity panels where available.

The script began as a Trusted-Types-safe rewrite and substantial extension of earlier Markdown clipping approaches, with specific hardening for ChatGPT Deep Research, saved `srcdoc` exports, and Gemini deep research reports.

## Core features

### Universal element-to-Markdown export

- Press `Ctrl+M` to enter visual selection mode.
- Hover to highlight a page element.
- Click to convert the selected element into Markdown.
- Use arrow keys and the mouse wheel to move between parent, child, and sibling elements.
- Preview and edit Markdown before copying or downloading.

### ChatGPT Deep Research support

- Detects Deep Research report shells and sandboxed report iframes.
- Extracts the main report body from the iframe or saved `srcdoc` content.
- Recovers citations, scanned sources, connector scanned sources, and research activity when those panels are mounted.
- Uses robust parent/iframe fallback paths so exports do not depend on a single brittle DOM layout.
- Supports maximized report views, side-panel extraction, and sub-element selection where browser origin rules permit it.

### Gemini support

- Extracts Gemini deep research report content.
- Handles source lists, unused/read source sections, and thought/activity items where present.
- Strips favicon and thumbnail noise from exported Markdown.

### Markdown quality controls

- Custom DOM-walker conversion path designed for strict Content Security Policy and Trusted Types environments.
- Enhanced handling for headings, paragraphs, lists, tables, code blocks, math/KaTeX/MathJax, details blocks, checkboxes, and highlighted text.
- Citation modes including inline links, parenthesized links, endnotes, footnotes, named-domain links, and no-citation mode.
- Optional YAML frontmatter with title, date, and source URL.
- Optional title-as-H1 formatting.
- Live Markdown editor and rendered preview with wrap toggle.

### Export targets

- Copy Markdown to clipboard.
- Download Markdown as `.md`.
- Send Markdown to a GitHub Issue.
- Send Markdown to Obsidian through Advanced URI.

## Installation

1. Install a userscript manager such as Tampermonkey or Violentmonkey.
2. Open the Greasy Fork page: <https://greasyfork.org/en/scripts/568581-universal-markdown-exporter>
3. Install the latest version.
4. Reload the target page before using the keyboard shortcuts.

## Usage

### General page clipping

1. Open any supported webpage.
2. Press `Ctrl+M` or use the userscript manager menu command named `Convert to Markdown`.
3. Hover over the content you want to export.
4. Click the highlighted element.
5. Review the Markdown in the modal.
6. Copy, download, or send the Markdown to a supported destination.

### ChatGPT Deep Research export

1. Open a ChatGPT conversation containing a Deep Research report.
2. Open or maximize the report if needed.
3. Press `Ctrl+M` to enter selection mode.
4. Press `R` to auto-export the report, citations, scanned sources, and activity panels according to the modal toggles.
5. If a right-side Sources or Activity panel is not mounted yet, the script attempts to open and switch the needed tabs before extraction.

### Saved ChatGPT HTML exports

1. Open the saved `.html` file in a browser with the userscript manager enabled.
2. Press `Ctrl+M` or `R`.
3. The script searches nested entity-encoded `srcdoc` iframes and chooses the best report-like document it can recover.

### Gemini deep research export

1. Open the Gemini deep research page.
2. Press `Ctrl+M` and select content, or use the Gemini-aware export shortcut where available.
3. Review the Markdown preview and export.

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| `Ctrl+M` | Start element selection mode |
| `R` | Auto-export Deep Research content when available |
| `G` | Gemini-focused extraction path where available |
| `Esc` | Cancel selection or close the modal |
| Arrow keys | Navigate to parent, child, or sibling elements |
| Mouse wheel | Expand or shrink the selected DOM region |
| Click | Convert the highlighted element to Markdown |

## Project structure

```text
userscript/
  Universal_Markdown_Exporter.user.js        Main userscript source
  ChatGPT_Deep_Research_Markdown_Exporter.user.js
  CHANGELOG.md                               Version history
  README.md                                  Userscript-specific notes

tools/                                       Local development helpers
README.md                                    Repository overview
AGENTS.md                                    Agent/development instructions, if retained
```

Local screenshots, raw HTML captures, `.wacz` archives, medical/genetic example exports, browser console logs, and one-off debugging artifacts are intentionally excluded from the public repository by default. Keep those files local unless they are sanitized and intentionally added as fixtures.

## Development notes

This project is intentionally dependency-light inside the userscript runtime. UI is constructed with DOM APIs instead of unsafe `innerHTML` insertion patterns, preserving compatibility with strict CSP and Trusted Types contexts.

Recommended public repository policy:

- Track the userscript source, docs, changelog, safe helper tools, and sanitized fixtures only.
- Do not track private exports, health/genetic examples, browser profile data, console logs, large single-file captures, or `.wacz` archives.
- Prefer synthetic fixtures for reproducible bug reports.
- Keep the Greasy Fork script version, `@version` metadata, `CHANGELOG.md`, and GitHub release tags synchronized.

## Release checklist

1. Update `@version` in `userscript/Universal_Markdown_Exporter.user.js`.
2. Update `userscript/CHANGELOG.md` and the root README if user-facing behavior changed.
3. Run any local validation tools in `tools/`.
4. Commit the release.
5. Tag the commit, for example: `v4.2.1`.
6. Push the branch and tag to GitHub.
7. Update Greasy Fork with the same script source.
8. Verify the public install URL points to the expected version.

## Privacy and security

This script operates in the browser on pages where it is enabled by the userscript manager. It is designed for local extraction and user-initiated export. Review any exported Markdown before sharing it publicly, especially when exporting research reports, account pages, medical content, genetic content, or conversations containing personal data.

## License

MIT. See `LICENSE` once added to the repository.

## Acknowledgments

Universal Markdown Exporter builds on the ideas and prior work of Markdown clipping and Deep Research export userscripts, including MarkDown Cloud Cut Notes and ChatGPT Deep Research Markdown Exporter, with substantial additional architecture for Trusted Types safety, iframe bridging, side-panel extraction, Gemini support, and export workflow improvements.
