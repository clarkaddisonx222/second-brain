#!/bin/bash
# Auto-save to Second Brain
# Usage: ./save-to-brain.sh <source-file> <destination-path>

SOURCE_FILE=$1
DEST_PATH=$2
COMMIT_MSG=${3:-"Auto-save from subagent"}

BRAIN_DIR="/data/.openclaw/workspace/second-brain"
CONTENT_DIR="$BRAIN_DIR/content"

# Copy file to destination
cp "$SOURCE_FILE" "$CONTENT_DIR/$DEST_PATH"

# Commit and push
cd "$BRAIN_DIR"
git add "$CONTENT_DIR/$DEST_PATH"
git commit -m "$COMMIT_MSG"
git push origin main

# Rebuild Quartz
cd "$BRAIN_DIR"
npx quartz build

# Deploy to scott-brain
cd "$BRAIN_DIR/public"
git init
git add .
git commit -m "Build: $COMMIT_MSG"
git remote add origin https://clarkaddisonx222:$GITHUB_TOKEN@github.com/clarkaddisonx222/scott-brain.git 2>/dev/null || true
git push -u origin main --force

echo "✅ Saved to Second Brain: https://clarkaddisonx222.github.io/scott-brain/$DEST_PATH"
