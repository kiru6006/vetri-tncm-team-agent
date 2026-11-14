"""
Official Tamil Nadu Contact Directory Discovery and Extractor
Fetches live pages from https://www.tn.gov.in/contact_directory.php and linked endpoints.
"""
import urllib.request
import urllib.parse
import re
import json
import os
from html.parser import HTMLParser

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
}

URLS = {
    'master': 'https://www.tn.gov.in/contact_directory.php',
    'governor': 'https://www.tn.gov.in/governor.php',
    'governor_details': 'https://www.tn.gov.in/governor_details.php',
    'ministers': 'https://www.tn.gov.in/minister_list.php',
    'secretaries': 'https://www.tn.gov.in/secret_to_govt.php',
    'district_collectors': 'https://www.tn.gov.in/district_collector.php',
    'secretariat_depts': 'https://www.tn.gov.in/cont_dir_department_list.php',
    'all_hod': 'https://www.tn.gov.in/cont_dir_All_hod_list.php',
    'all_undertakings': 'https://www.tn.gov.in/cont_dir_All_und_tak.php',
    'helpdesk': 'https://www.tn.gov.in/help_desk.php',
}

def fetch_url(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            content_type = resp.headers.get('Content-Type', '')
            encoding = 'utf-8'
            if 'charset=' in content_type:
                encoding = content_type.split('charset=')[-1].split(';')[0].strip()
            raw = resp.read()
            try:
                return raw.decode(encoding)
            except UnicodeDecodeError:
                return raw.decode('latin-1', errors='ignore')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def test_fetches():
    results = {}
    for name, url in URLS.items():
        print(f"Fetching {name} ({url})...")
        html = fetch_url(url)
        if html:
            results[name] = {
                'len': len(html),
                'status': 'OK',
                'url': url
            }
            # Save raw HTML to cache
            cache_dir = 'data/cache_raw'
            os.makedirs(cache_dir, exist_ok=True)
            with open(os.path.join(cache_dir, f"{name}.html"), 'w', encoding='utf-8') as f:
                f.write(html)
        else:
            results[name] = {'status': 'FAILED', 'url': url}
    print(json.dumps(results, indent=2))

if __name__ == '__main__':
    test_fetches()
