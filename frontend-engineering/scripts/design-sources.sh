#!/bin/sh
# Read the design guide or unpack both complete upstream packages for a task.
set -eu
skill_dir=$(CDPATH='' cd "$(dirname "$0")/.." && pwd)
archive="$skill_dir/assets/design-sources.tar.gz"
case "${1:-}" in
    guide)
        exec tar -xzOf "$archive" anthropic-frontend-design/skills/frontend-design/SKILL.md
        ;;
    unpack)
        sources_dir=$(mktemp -d "${TMPDIR:-/tmp}/design-sources.XXXXXXXX")
        tar -xzf "$archive" -C "$sources_dir"
        printf '%s\n' "$sources_dir"
        ;;
    *)
        echo 'Usage: design-sources.sh guide|unpack' >&2
        exit 2
        ;;
esac
