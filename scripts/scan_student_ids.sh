#!/usr/bin/env bash
# Fail if anything that looks like a Westminster student ID (w + 7 digits) is committed.
set -u
hits=$(git ls-files -z | xargs -0 grep -nIiE '\bw[0-9]{7}\b' 2>/dev/null || true)
if [ -n "$hits" ]; then
    echo "Possible student ID found:"
    echo "$hits" | sed -E 's/w[0-9]{7}/w*******/Ig'
    exit 1
fi
echo "No student IDs found."
