"""Lightweight static checks; no external dependencies."""
from html.parser import HTMLParser
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', 'path', 'circle', 'ellipse'}

class ScreenParser(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.stack = []
        self.ids = set()
        self.errors = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag not in VOID:
            self.stack.append(tag)
        if 'id' in attrs:
            if attrs['id'] in self.ids:
                self.errors.append(f'Duplicate ID: {attrs["id"]}')
            self.ids.add(attrs['id'])
        for attr in ('src', 'href'):
            value = attrs.get(attr, '')
            if value and not value.startswith(('#', 'http:', 'https:', 'data:', 'mailto:', 'tel:')):
                target = self.path.parent / value.split('#')[0].split('?')[0]
                if not target.exists():
                    self.errors.append(f'Missing resource: {value}')
        if tag == 'style' or (tag == 'script' and 'src' not in attrs):
            self.errors.append('Unexpected inline CSS/JS')

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack or self.stack[-1] != tag:
            self.errors.append(f'Unbalanced closing tag: {tag}')
        else:
            self.stack.pop()

failed = False
for path in sorted(ROOT.glob('*.html')):
    parser = ScreenParser(path)
    parser.feed(path.read_text(encoding='utf-8'))
    if parser.stack:
        parser.errors.append(f'Unclosed tags: {parser.stack}')
    if parser.errors:
        failed = True
        print(f'FAIL {path.name}: {parser.errors}')
    else:
        print(f'OK   {path.name}: local resources, IDs and tag nesting')
for name in ('nunito-sans', 'fraunces'):
    path = ROOT / 'assets' / 'fonts' / f'{name}.woff2'
    if not path.exists() or path.read_bytes()[:4] != b'wOF2':
        failed = True
        print(f'FAIL font {name}')
print('Static validation complete. Browser testing is separate.')
sys.exit(1 if failed else 0)
