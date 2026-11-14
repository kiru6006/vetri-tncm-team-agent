"""
Inspect and parse cached raw HTML files from tn.gov.in
"""
import os
import re
import json
from html.parser import HTMLParser

def strip_tags(html):
    return re.sub(r'<[^>]+>', ' ', html).replace('&nbsp;', ' ').replace('&amp;', '&').replace('&#39;', "'")

def parse_collectors():
    path = 'data/cache_raw/district_collectors.html'
    if not os.path.exists(path):
        return []
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    # Search for district table rows or blocks
    # Looking for table patterns:
    # e.g., District Name, Collector Name, Phone, Fax, Email
    # Let's inspect snippet
    print("District Collectors size:", len(html))
    # Look for district names or tables
    dist_matches = re.findall(r'<table[^>]*>(.*?)</table>', html, re.DOTALL | re.IGNORECASE)
    print(f"Total tables in district_collectors: {len(dist_matches)}")

def parse_ministers():
    path = 'data/cache_raw/ministers.html'
    if not os.path.exists(path):
        return []
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    print("Ministers size:", len(html))
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL | re.IGNORECASE)
    print(f"Total tr in ministers: {len(rows)}")

def parse_secretaries():
    path = 'data/cache_raw/secretaries.html'
    if not os.path.exists(path):
        return []
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    print("Secretaries size:", len(html))
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL | re.IGNORECASE)
    print(f"Total tr in secretaries: {len(rows)}")

def parse_hod():
    path = 'data/cache_raw/all_hod.html'
    if not os.path.exists(path):
        return []
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    print("HoD size:", len(html))
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL | re.IGNORECASE)
    print(f"Total tr in all_hod: {len(rows)}")

def parse_undertakings():
    path = 'data/cache_raw/all_undertakings.html'
    if not os.path.exists(path):
        return []
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    print("Undertakings size:", len(html))
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL | re.IGNORECASE)
    print(f"Total tr in all_undertakings: {len(rows)}")

def parse_assembly():
    path = 'data/cache_raw/assembly_17.html'
    if not os.path.exists(path):
        return []
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    print("Assembly size:", len(html))
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL | re.IGNORECASE)
    print(f"Total tr in assembly_17: {len(rows)}")

if __name__ == '__main__':
    parse_collectors()
    parse_ministers()
    parse_secretaries()
    parse_hod()
    parse_undertakings()
    parse_assembly()

