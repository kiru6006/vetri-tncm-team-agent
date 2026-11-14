"""
Inspect structure of secretaries, hod, undertakings, etc.
"""
import re

def inspect_file(filename, label):
    with open(f'data/cache_raw/{filename}') as f:
        text = f.read()
    print(f"=== {label} ({filename}) ===")
    classes = set(re.findall(r'class=[\"\']([^\"\']+)[\"\']', text))
    relevant_classes = [c for c in classes if any(k in c.lower() for k in ['list', 'item', 'row', 'card', 'table', 'inset', 'view', 'hod', 'und', 'dept'])]
    print("Classes:", relevant_classes[:6])

    # Look for patterns with links or names
    links = re.findall(r'<a[^>]*href=[\"\']([^\"\']+)[\"\'][^>]*>(.*?)</a>', text, re.DOTALL)
    meaningful_links = [(re.sub(r'<[^>]+>', '', t).strip(), h) for h, t in links if len(re.sub(r'<[^>]+>', '', t).strip()) > 3]
    print(f"Total meaningful links: {len(meaningful_links)}")
    for t, h in meaningful_links[:5]:
        print(f"  - {t} -> {h}")

for fn, lbl in [
    ('secretaries.html', 'Secretaries to Govt'),
    ('secretariat_depts.html', 'Secretariat Depts'),
    ('all_hod.html', 'All HoDs'),
    ('all_undertakings.html', 'All Undertakings'),
    ('cs.html', 'Chief Secretary'),
    ('vigilance.html', 'Vigilance Commissioner'),
    ('ceo.html', 'Chief Electoral Officer'),
    ('chief_justice.html', 'Chief Justice'),
    ('guest_houses.html', 'Guest Houses'),
    ('tnhouse_delhi.html', 'TN House Delhi')
]:
    inspect_file(fn, lbl)
