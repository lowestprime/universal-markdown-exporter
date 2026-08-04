#!/usr/bin/env python3
"""Inventory a saved ChatGPT Deep Research DOM without external dependencies."""

from __future__ import annotations

import argparse
import json
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path


class DeepResearchInventory(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.report_pages = 0
        self.report_containers = 0
        self.iframes = 0
        self.section_labels: Counter[str] = Counter()
        self.button_labels: Counter[str] = Counter()
        self.tabs = 0
        self.conversation_links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key: value or '' for key, value in attrs}
        class_name = values.get('class', '')
        if '_reportPage_' in class_name:
            self.report_pages += 1
        if '_reportContainer_' in class_name:
            self.report_containers += 1
        if tag == 'iframe':
            self.iframes += 1
        if tag == 'section' and values.get('aria-labelledby'):
            self.section_labels[values['aria-labelledby']] += 1
        if tag == 'button' and values.get('aria-label'):
            self.button_labels[values['aria-label']] += 1
        if values.get('role') == 'tab':
            self.tabs += 1
        if tag == 'a' and '/c/' in values.get('href', ''):
            self.conversation_links.append(values['href'])


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument('html_file', type=Path)
    parser.add_argument('--assert-expanded-report', action='store_true')
    args = parser.parse_args()

    text = args.html_file.read_text(encoding='utf-8', errors='replace')
    inventory = DeepResearchInventory()
    inventory.feed(text)

    result = {
        'file': str(args.html_file),
        'bytes': len(text.encode('utf-8')),
        'lines': text.count('\n') + 1,
        'report_pages': inventory.report_pages,
        'report_containers': inventory.report_containers,
        'iframes': inventory.iframes,
        'sections': dict(inventory.section_labels),
        'sources_and_activity_controls': inventory.button_labels['Sources and activity'],
        'open_source_controls': sum(
            count for label, count in inventory.button_labels.items() if label.startswith('Open source ')
        ),
        'tabs': inventory.tabs,
        'conversation_links': inventory.conversation_links,
    }
    print(json.dumps(result, indent=2, sort_keys=True))

    if args.assert_expanded_report:
        errors = []
        if inventory.report_pages + inventory.report_containers < 1:
            errors.append('no Deep Research report root found')
        if inventory.button_labels['Sources and activity'] < 1:
            errors.append('no explicit Sources and activity control found')
        if inventory.button_labels.total() and not any(
            label.startswith('Open source ') for label in inventory.button_labels
        ):
            errors.append('no citation source controls found')
        if errors:
            for error in errors:
                print(f'ERROR: {error}')
            return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
