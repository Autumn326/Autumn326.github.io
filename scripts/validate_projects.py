#!/usr/bin/env python3
"""Validate data/projects.json. Exits non-zero on any problem."""
import json
import re
import sys
from pathlib import Path

PATH = Path(__file__).resolve().parent.parent / "data" / "projects.json"
TYPES = {"mobile-app", "ai", "data", "algorithm", "systems", "backend", "database", "security", "early"}
KINDS = {"screenshot", "code", "diagram", "clip"}
CLIP_EXT = (".mp4", ".webm")
MAX_CLIP_BYTES = 5 * 1024 * 1024  # a 6 second clip should be well under this
THEMES = {"apple", "ai-graph", "terminal"}
LINK_KEYS = {"github"}
REQUIRED = ["id", "title", "type", "theme", "featured", "date", "summary", "tags", "features", "links"]
ID_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")

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
        url = links.get("github", "")
        if url and not url.startswith("https://"):
            errors.append(f"{name}: links.github must be an https:// link")

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
            if item.get("kind") == "clip":
                if src:
                    f = PATH.parent.parent / src
                    if not (src.startswith("videos/") and src.lower().endswith(CLIP_EXT) and f.is_file()):
                        errors.append(f"{name}: showcase {n} clip src must be an existing .mp4/.webm under videos/")
                    elif f.stat().st_size > MAX_CLIP_BYTES:
                        errors.append(f"{name}: showcase {n} clip is over 5 MB; trim to 6 s or lower the resolution")
                    elif not item.get("alt"):
                        errors.append(f"{name}: showcase {n} needs 'alt' text describing the clip")
                poster = item.get("poster", "")
                if poster and not (poster.startswith("images/") and (PATH.parent.parent / poster).is_file()):
                    errors.append(f"{name}: showcase {n} poster must be an existing file under images/")
            elif src:
                if not src.startswith("images/") or not (PATH.parent.parent / src).is_file():
                    errors.append(f"{name}: showcase {n} src must be an existing file under images/")
                elif not item.get("alt"):
                    errors.append(f"{name}: showcase {n} needs 'alt' text")
    story = p.get("story", [])
    media_files = {i.get("file") for i in showcase if isinstance(i, dict)} if isinstance(showcase, list) else set()
    code_files = {i.get("file") for i in showcase if isinstance(i, dict) and i.get("kind") == "code"} if isinstance(showcase, list) else set()
    if not isinstance(story, list):
        errors.append(f"{name}: 'story' must be a list")
    else:
        step_ids = set()
        for n, step in enumerate(story, 1):
            if not isinstance(step, dict):
                errors.append(f"{name}: story step {n} must be an object")
                continue
            sid = step.get("id", "")
            if not ID_RE.match(sid or ""):
                errors.append(f"{name}: story step {n} needs a lowercase-with-dashes 'id'")
            elif sid in step_ids:
                errors.append(f"{name}: story step {n} duplicate id {sid!r}")
            step_ids.add(sid)
            for key in ("label", "title"):
                if not isinstance(step.get(key), str) or not step.get(key).strip():
                    errors.append(f"{name}: story step {n} needs '{key}'")
            body = step.get("body")
            if not isinstance(body, list) or not body or not all(isinstance(t, str) and t.strip() for t in body):
                errors.append(f"{name}: story step {n} 'body' must be a list of paragraphs")
            media = step.get("media", [])
            if not isinstance(media, list):
                errors.append(f"{name}: story step {n} 'media' must be a list")
                media = []
            for f in media:
                if f not in media_files:
                    errors.append(f"{name}: story step {n} media {f!r} is not a showcase file")
            notes = step.get("notes", [])
            if not isinstance(notes, list):
                errors.append(f"{name}: story step {n} 'notes' must be a list")
            elif notes:
                if not any(f in code_files for f in media):
                    errors.append(f"{name}: story step {n} has notes but no code item in its media")
                for note in notes:
                    if not (isinstance(note, dict) and note.get("title") and note.get("text")):
                        errors.append(f"{name}: story step {n} each note needs 'title' and 'text'")

    thumb = p.get("thumbnail", "")
    if thumb and not (thumb.startswith("images/") and (PATH.parent.parent / thumb).is_file()):
        errors.append(f"{name}: thumbnail must be an existing file under images/")

if errors:
    print("projects.json problems:")
    print("\n".join(f"  - {e}" for e in errors))
    sys.exit(1)
print(f"projects.json OK ({len(projects)} projects)")
