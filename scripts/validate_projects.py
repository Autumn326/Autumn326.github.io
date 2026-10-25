#!/usr/bin/env python3
"""Validate data/projects.json. Exits non-zero on any problem."""
import json
import re
import sys
from pathlib import Path

PATH = Path(__file__).resolve().parent.parent / "data" / "projects.json"
TYPES = {"mobile-app", "ai", "data", "algorithm", "systems", "backend", "database", "security", "early"}
KINDS = {"screenshot", "code", "diagram", "video"}
THEMES = {"apple", "ai-graph", "terminal"}
LINK_KEYS = {"youtube", "github", "writeup", "demo"}
REQUIRED = ["id", "title", "type", "theme", "featured", "date", "summary", "tags", "features", "links"]
ID_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
YT_RE = re.compile(r"^([\w-]{11}|https://(www\.)?(youtube\.com|youtu\.be)/\S+)$")

errors = []
try:
    data = json.loads(PATH.read_text(encoding="utf-8"))
except (OSError, ValueError) as exc:
    sys.exit(f"Cannot read {PATH}: {exc}")

projects = data.get("projects")
if not isinstance(projects, list) or not projects:
    sys.exit("'projects' must be a non-empty list")

seen = set()
for i, p in enumerate(projects):
    name = p.get("id", f"#{i}")
    for key in REQUIRED:
        if key not in p:
            errors.append(f"{name}: missing '{key}'")
    if p.get("id") in seen:
        errors.append(f"{name}: duplicate id")
    seen.add(p.get("id"))
    if "id" in p and not ID_RE.match(p["id"]):
        errors.append(f"{name}: id must be lowercase-with-dashes")
    if p.get("type") not in TYPES:
        errors.append(f"{name}: unknown type {p.get('type')!r}")
    if p.get("theme") not in THEMES:
        errors.append(f"{name}: unknown theme {p.get('theme')!r}")
    if not isinstance(p.get("featured"), bool):
        errors.append(f"{name}: 'featured' must be true or false")
    for key in ("tags", "features"):
        if not isinstance(p.get(key), list):
            errors.append(f"{name}: '{key}' must be a list")
    links = p.get("links", {})
    if not isinstance(links, dict) or set(links) - LINK_KEYS:
        errors.append(f"{name}: links may only contain {sorted(LINK_KEYS)}")
    else:
        yt = links.get("youtube", "")
        if yt and not YT_RE.match(yt):
            errors.append(f"{name}: youtube must be a video ID or a YouTube link")
        for key in ("github", "writeup", "demo"):
            url = links.get(key, "")
            if url and not (url.startswith("https://") or url.startswith("pages/")):
                errors.append(f"{name}: links.{key} must be https:// or a local pages/ path")

    images = p.get("images", [])
    if not isinstance(images, list):
        errors.append(f"{name}: 'images' must be a list")
    else:
        for n, img in enumerate(images, 1):
            src = img if isinstance(img, str) else (img.get("src") if isinstance(img, dict) else None)
            if not src or not isinstance(src, str):
                errors.append(f"{name}: image {n} needs a path (string or object with 'src')")
            elif not src.startswith("images/"):
                errors.append(f"{name}: image {n} path must start with images/")
            elif not (PATH.parent.parent / src).is_file():
                errors.append(f"{name}: image file not found: {src}")
            elif isinstance(img, dict) and not img.get("alt"):
                errors.append(f"{name}: image {n} needs 'alt' text")
    showcase = p.get("showcase", [])
    if not isinstance(showcase, list):
        errors.append(f"{name}: 'showcase' must be a list")
    else:
        for n, item in enumerate(showcase, 1):
            if not isinstance(item, dict) or item.get("kind") not in KINDS:
                errors.append(f"{name}: showcase {n} needs a 'kind' of {sorted(KINDS)}")
                continue
            src = item.get("src", "")
            if src:
                if not src.startswith("images/") or not (PATH.parent.parent / src).is_file():
                    errors.append(f"{name}: showcase {n} src must be an existing file under images/")
                elif not item.get("alt"):
                    errors.append(f"{name}: showcase {n} needs 'alt' text")
            yt = item.get("youtube", "")
            if yt and not YT_RE.match(yt):
                errors.append(f"{name}: showcase {n} youtube must be a video ID or a YouTube link")
    thumb = p.get("thumbnail", "")
    if thumb and not (thumb.startswith("images/") and (PATH.parent.parent / thumb).is_file()):
        errors.append(f"{name}: thumbnail must be an existing file under images/")

if errors:
    print("projects.json problems:")
    print("\n".join(f"  - {e}" for e in errors))
    sys.exit(1)
print(f"projects.json OK ({len(projects)} projects)")
