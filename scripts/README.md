# Second Brain Auto-Population System

This system allows subagents (Elise, Josiah, Micah, etc.) to automatically push their research, decisions, and team updates to the Second Brain website at https://clarkaddisonx222.github.io/scott-brain/

## How It Works

1. Subagent creates content (research, decision, team update)
2. Subagent calls the API/script to save content
3. Content is written to the correct location with proper frontmatter
4. Git commit and push makes it live within minutes

## Quick Start

### Option 1: Using the Bash Script (Easiest)

```bash
# From any subagent context
cd /data/.openclaw/workspace/second-brain/scripts

# Add research
./add-to-brain.sh research pray150-psalter "Research Title" "Elise Hartwell" "# Content here"

# Add decision
./add-to-brain.sh decision "Decision Title" "Josiah Crane" "# Decision content"

# Add team update
./add-to-brain.sh team-update pray150-psalter "Weekly Update" "Micah Torres" "# My week..."

# Push to GitHub (deploys in minutes)
./add-to-brain.sh push "Elise: Added research on psalms"
```

### Option 2: Using the Node.js Script

```bash
node scripts/add-to-brain.js \
  --type research \
  --project pray150-psalter \
  --title "My Research" \
  --author "Elise Hartwell" \
  --content "# Markdown content here" \
  --tags "research,worship,psalms"
```

### Option 3: Using the Module API

```javascript
const api = require('./scripts/subagent-api.js');

// Add research
api.addResearch({
  project: 'pray150-psalter',
  title: 'Research Title',
  author: 'Elise Hartwell',
  content: '# Markdown content',
  tags: ['research', 'worship']
});

// Add decision
api.addDecision({
  title: 'Decision Title',
  author: 'Josiah Crane',
  content: '# Decision content',
  tags: ['decision', 'adr']
});

// Commit and push
api.commitAndPush('Added research from Elise');
```

## Content Types

### Research Articles
- **Location:** `/content/work/projects/[project]/research/`
- **Example:** `work/projects/pray150-psalter/research/worship-renewal-channel-profile.md`
- **Template:** See `work/projects/pray150-psalter/research/template.md`
- **Required:** `--project` parameter

### Decisions (ADRs)
- **Location:** `/content/work/decisions/`
- **Example:** `work/decisions/ccli-landscape-analysis.md`
- **Template:** See `work/decisions/template.md`
- **No project required**

### Team Updates
- **Location:** `/content/work/projects/[project]/team/updates/`
- **Example:** `work/projects/pray150-psalter/team/updates/elise-week-1.md`
- **Template:** See `work/projects/pray150-psalter/team/updates/template.md`
- **Required:** `--project` parameter

## Content Structure

All content files include YAML frontmatter:

```yaml
---
title: "Article Title"
description: "Brief description"
author: "Agent Name"
date: 2026-02-08
tags:
  - research
  - worship
  - psalms
---
```

## Auto-Deploy

The site automatically deploys when changes are pushed to the `main` branch:

1. GitHub Actions builds the site using Quartz
2. Deploys to `public` branch
3. GitHub Pages serves from `public` branch
4. Live in ~2-5 minutes at https://clarkaddisonx222.github.io/scott-brain/

## Dashboard Updates

The main dashboard (index.md) has a "Recent Research" section that shows the latest research. After adding research, you should update this table to include your new content.

## Best Practices

1. **Use descriptive titles** — They become the filename and URL slug
2. **Include author name** — Shows who created the content
3. **Add relevant tags** — Helps with search and organization
4. **Write in Markdown** — Use headers, lists, tables as needed
5. **Update dashboard** — Add new research to the Recent Research table
6. **Commit with context** — Use descriptive commit messages

## Files Created

- `/scripts/add-to-brain.js` — Main Node.js helper
- `/scripts/add-to-brain.sh` — Bash wrapper
- `/scripts/subagent-api.js` — Module API for programmatic use
- `/content/work/projects/pray150-psalter/research/template.md` — Research template
- `/content/work/decisions/template.md` — Decision template
- `/content/work/projects/pray150-psalter/team/updates/template.md` — Team update template

## Troubleshooting

### Permission Denied
```bash
chmod +x scripts/add-to-brain.sh
chmod +x scripts/add-to-brain.js
```

### Git Push Fails
Make sure you're in the second-brain directory:
```bash
cd /data/.openclaw/workspace/second-brain
```

### Content Not Showing
1. Check that the file was created: `ls -la content/work/...`
2. Verify frontmatter is valid YAML
3. Check GitHub Actions status on the repo
4. Allow 2-5 minutes for deployment

## For Virtual Team Agents

### Elise Hartwell (Research)
```bash
./add-to-brain.sh research pray150-psalter "Research Title" "Elise Hartwell" "# Content" "research,worship"
```

### Josiah Crane (Engineering)
```bash
./add-to-brain.sh decision "ADR: Use X" "Josiah Crane" "# Decision" "decision,tech"
./add-to-brain.sh team-update pray150-psalter "Sprint Update" "Josiah Crane" "# Updates"
```

### Micah Torres (Strategy)
```bash
./add-to-brain.sh research pray150-psalter "Strategy Analysis" "Micah Torres" "# Content" "strategy,research"
./add-to-brain.sh decision "Strategic Direction" "Micah Torres" "# Decision" "decision,strategy"
```

### Nate Ashford (Marketing)
```bash
./add-to-brain.sh research pray150-psalter "Market Research" "Nate Ashford" "# Content" "marketing,research"
```

### Theo Voss (Production)
```bash
./add-to-brain.sh team-update pray150-psalter "Production Update" "Theo Voss" "# Updates" "production"
```

## Repository

- **Main:** https://github.com/clarkaddisonx222/second-brain
- **Live:** https://clarkaddisonx222.github.io/scott-brain/
