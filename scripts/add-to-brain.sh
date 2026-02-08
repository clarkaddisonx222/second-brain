#!/bin/bash
# add-to-brain.sh - Bash wrapper for easy subagent usage
#
# Usage:
#   ./add-to-brain.sh research pray150-psalter "Title" "Author" "# Content"
#   ./add-to-brain.sh decision "Title" "Author" "# Content"
#   ./add-to-brain.sh team-update pray150-psalter "Title" "Author" "# Content"

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TYPE="$1"

if [ -z "$TYPE" ] || [ "$TYPE" == "--help" ]; then
    cat << 'EOF'
add-to-brain.sh - Push content to Second Brain

Usage:
  ./add-to-brain.sh research <project> <title> <author> <content> [tags]
  ./add-to-brain.sh decision <title> <author> <content> [tags]
  ./add-to-brain.sh team-update <project> <title> <author> <content> [tags]
  ./add-to-brain.sh push [message]

Examples:
  ./add-to-brain.sh research pray150-psalter "Psalm Research" "Elise" "# My findings"
  ./add-to-brain.sh decision "Use X" "Josiah" "# We decided..."
  ./add-to-brain.sh push "Added research from Elise"

Environment:
  SECOND_BRAIN_PATH - Path to repo (default: /data/.openclaw/workspace/second-brain)
EOF
    exit 0
fi

case "$TYPE" in
    research)
        PROJECT="$2"
        TITLE="$3"
        AUTHOR="$4"
        CONTENT="$5"
        TAGS="${6:-research}"
        
        node "$SCRIPT_DIR/add-to-brain.js" \
            --type research \
            --project "$PROJECT" \
            --title "$TITLE" \
            --author "$AUTHOR" \
            --content "$CONTENT" \
            --tags "$TAGS"
        ;;
        
    decision)
        TITLE="$2"
        AUTHOR="$3"
        CONTENT="$4"
        TAGS="${5:-decision}"
        
        node "$SCRIPT_DIR/add-to-brain.js" \
            --type decision \
            --title "$TITLE" \
            --author "$AUTHOR" \
            --content "$CONTENT" \
            --tags "$TAGS"
        ;;
        
    team-update)
        PROJECT="$2"
        TITLE="$3"
        AUTHOR="$4"
        CONTENT="$5"
        TAGS="${6:-team-update}"
        
        node "$SCRIPT_DIR/add-to-brain.js" \
            --type team-update \
            --project "$PROJECT" \
            --title "$TITLE" \
            --author "$AUTHOR" \
            --content "$CONTENT" \
            --tags "$TAGS"
        ;;
        
    push)
        MESSAGE="${2:-Auto-update from subagent}"
        cd "${SECOND_BRAIN_PATH:-/data/.openclaw/workspace/second-brain}"
        git add -A
        git commit -m "$MESSAGE" || true
        git push origin main
        echo "✅ Pushed to GitHub: $MESSAGE"
        ;;
        
    *)
        echo "Error: Unknown type '$TYPE'"
        echo "Use: research, decision, team-update, or push"
        exit 1
        ;;
esac
