#!/usr/bin/env python3
"""Synthetic Chromium regression coverage for Deep Research export routing.

Requires Python Playwright and a Chromium executable. The test never accesses the
network and does not include any private report fixture.
"""

from __future__ import annotations

import asyncio
import os
import re
import shutil
from html import escape
from pathlib import Path

try:
    from playwright.async_api import async_playwright
except ImportError as exc:  # pragma: no cover - environment guidance
    raise SystemExit('Install Playwright for Python to run this browser regression test.') from exc

ROOT = Path(__file__).resolve().parents[1]
SCRIPT_PATH = ROOT / 'userscript' / 'Universal_Markdown_Exporter.user.js'


def instrument_for_about_blank(source: str) -> str:
    pattern = re.compile(
        r"const HOSTNAME = location\.hostname;\n"
        r"\s*const IS_DR_SANDBOX_HOST = .*?;\n"
        r"\s*const IS_EMBEDDED_DR_FRAME = .*?;\n"
        r"\s*const IS_TOP_LEVEL_DR_PAGE = .*?;\n"
        r"\s*const IS_CHATGPT = .*?;\n"
        r"\s*const IS_GEMINI = .*?;\n"
        r"\s*const IS_TOP_CONTEXT = .*?;"
    )
    replacement = """const HOSTNAME = location.hostname;
    const IS_DR_SANDBOX_HOST = window.top !== window;
    const IS_EMBEDDED_DR_FRAME = window.top !== window;
    const IS_TOP_LEVEL_DR_PAGE = false;
    const IS_CHATGPT = window.top === window;
    const IS_GEMINI = false;
    const IS_TOP_CONTEXT = window.top === window;"""
    instrumented, count = pattern.subn(replacement, source, count=1)
    if count != 1:
        raise RuntimeError('Could not instrument userscript host flags for the synthetic fixture.')
    return instrumented


def parent_html() -> str:
    child = '<!doctype html><html><body></body></html>'
    return f'''<!doctype html><html><body>
<a id="thread-link" href="#wrong-thread">Wrong thread</a>
<iframe id="stale" title="deep-research" srcdoc="{escape(child, quote=True)}"
        style="display:none;width:900px;height:600px"></iframe>
<iframe id="current" title="deep-research" srcdoc="{escape(child, quote=True)}"
        style="display:block;width:1000px;height:700px"></iframe>
</body></html>'''


async def build_report(frame, title: str, selected_text: str) -> None:
    await frame.evaluate(
        """({title, selectedText}) => {
            document.body.textContent = '';
            const main = document.createElement('main');
            const report = document.createElement('div');
            report.className = '_reportPage_fixture';
            const h1 = document.createElement('h1');
            h1.textContent = title;
            const p = document.createElement('p');
            p.id = 'selection-target';
            p.textContent = selectedText;
            const filler = document.createElement('p');
            filler.textContent = 'Synthetic Deep Research fixture content. '.repeat(12);
            report.append(h1, p, filler);
            main.appendChild(report);

            const tabList = document.createElement('div');
            tabList.setAttribute('role', 'tablist');
            for (const [name, selected] of [['Sources', true], ['Activity', false]]) {
                const tab = document.createElement('button');
                tab.setAttribute('role', 'tab');
                tab.setAttribute('aria-selected', String(selected));
                tab.textContent = name;
                tabList.appendChild(tab);
            }
            main.appendChild(tabList);

            const section = document.createElement('section');
            section.setAttribute('aria-labelledby', 'report-references-citations');
            const heading = document.createElement('p');
            heading.id = 'report-references-citations';
            heading.textContent = 'Citations · 3';
            section.appendChild(heading);
            for (let i = 1; i <= 3; i++) {
                const button = document.createElement('button');
                button.setAttribute('aria-label', `Open source ${i}`);
                const link = document.createElement('a');
                link.href = `https://example${i}.test/source`;
                link.className = 'text-token-text-primary';
                link.textContent = `Fixture source ${i}`;
                button.appendChild(link);
                section.appendChild(button);
            }
            main.appendChild(section);
            document.body.appendChild(main);
        }""",
        {'title': title, 'selectedText': selected_text},
    )


async def overlay_count(page) -> int:
    return sum([await frame.locator('#h2m-export-overlay').count() for frame in page.frames])


async def run() -> None:
    source = instrument_for_about_blank(SCRIPT_PATH.read_text(encoding='utf-8'))
    chromium = os.environ.get('CHROMIUM_PATH') or shutil.which('chromium') or shutil.which('google-chrome')

    async with async_playwright() as playwright:
        launch_options = {'headless': True, 'args': ['--no-sandbox']}
        if chromium:
            launch_options['executable_path'] = chromium
        browser = await playwright.chromium.launch(**launch_options)
        page = await browser.new_page(viewport={'width': 1400, 'height': 900})
        errors: list[str] = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        await page.set_content(parent_html(), wait_until='load')
        await page.wait_for_timeout(100)

        frame_by_id = {}
        for frame in page.frames[1:]:
            element = await frame.frame_element()
            frame_id = await element.get_attribute('id')
            frame_by_id[frame_id] = frame
        await build_report(frame_by_id['stale'], 'STALE REPORT', 'Stale selected text')
        await build_report(frame_by_id['current'], 'CURRENT VISIBLE REPORT', 'Nested selection works')

        for frame in list(page.frames)[::-1]:
            await frame.add_script_tag(content=source)
        await page.wait_for_timeout(150)

        # Full export: only the visible active frame may answer, and the parent owns one modal.
        await page.keyboard.press('Control+m')
        await page.keyboard.press('r')
        await page.locator('#h2m-export-overlay textarea').wait_for(timeout=10_000)
        markdown = await page.locator('#h2m-export-overlay textarea').input_value()
        assert 'CURRENT VISIBLE REPORT' in markdown
        assert 'STALE REPORT' not in markdown
        assert '## **Citations [`3` Sources]**' in markdown
        assert await overlay_count(page) == 1
        assert await frame_by_id['current'].locator('#h2m-export-overlay').count() == 0
        await page.locator('#h2m-export-overlay .h2m-close').click()

        # Selecting an anchor must export it without activating its URL.
        before = page.url
        await page.keyboard.press('Control+m')
        await page.locator('#thread-link').click(force=True)
        await page.wait_for_timeout(100)
        assert page.url == before
        assert await overlay_count(page) == 1
        await page.locator('#h2m-export-overlay .h2m-close').click()

        # Cross-origin-style handoff: the child picker exports a nested element to one parent modal.
        await page.keyboard.press('Control+m')
        shield = page.locator('.h2m-frame-shield')
        await shield.wait_for(timeout=2_000)
        box = await shield.bounding_box()
        assert box
        await shield.dispatch_event('mousedown', {
            'clientX': box['x'] + 20,
            'clientY': box['y'] + 20,
            'button': 0,
        })
        await frame_by_id['current'].locator('.h2m-tip').wait_for(timeout=2_000)
        target = frame_by_id['current'].locator('#selection-target')
        target_box = await target.bounding_box()
        assert target_box
        await target.dispatch_event('pointerdown', {
            'clientX': target_box['x'] + 5,
            'clientY': target_box['y'] + 5,
            'button': 0,
            'pointerId': 1,
            'pointerType': 'mouse',
            'isPrimary': True,
        })
        await page.locator('#h2m-export-overlay textarea').wait_for(timeout=3_000)
        selected = await page.locator('#h2m-export-overlay textarea').input_value()
        assert 'Nested selection works' in selected
        assert 'Fixture source 1' not in selected
        assert await overlay_count(page) == 1
        assert await frame_by_id['current'].locator('#h2m-export-overlay').count() == 0
        await page.locator('#h2m-export-overlay .h2m-close').click()

        # Re-injection is a no-op, so one Ctrl+M still creates one picker runtime.
        await page.add_script_tag(content=source)
        await page.keyboard.press('Control+m')
        assert await page.locator('.h2m-tip').count() == 1
        assert await page.locator('.h2m-frame-shield').count() == 1
        await page.keyboard.press('Escape')

        assert not errors, errors
        await browser.close()

    print('PASS: single modal, active-frame routing, no link navigation, nested picker, runtime singleton')


if __name__ == '__main__':
    asyncio.run(run())
