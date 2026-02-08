# Auto-Population System for Second Brain

## How It Works

When subagents complete research, they now save directly to the Second Brain instead of just messaging summaries.

## For Subagents: Save to Second Brain

When completing research, use this pattern:

```javascript
// Save research article
saveToBrain({
  path: "work/projects/pray150-psalter/research/article-name.md",
  title: "Article Title",
  content: markdownContent,
  tags: ["research", "psalms", "worship"],
  author: "Elise Hartwell" // virtual agent name
});
```

## Content Types & Locations

| Type | Path | Example |
|------|------|---------|
| Research articles | `work/projects/[project]/research/` | CCLI analysis, articles |
| Decisions | `work/decisions/` | Strategic choices with dates |
| Team updates | `work/projects/[project]/team/updates/` | Agent progress logs |
| Daily logs | `daily/YYYY-MM-DD.md` | Auto-generated summaries |
| Quick notes | `personal/notes/quick-notes.md` | Fleeting thoughts |

## Frontmatter Template

```yaml
---
title: "Article Title"
date: 2026-02-08
author: "Agent Name"  # which virtual agent
tags: ["research", "topic"]
project: "pray150-psalter"  # optional
---
```

## Auto-Deploy

All saves trigger:
1. Git commit to `second-brain` repo
2. Quartz rebuild
3. Deploy to `scott-brain` repo
4. Live in ~2 minutes

## Current Auto-Save Agents

- ✅ Elise Hartwell (Content Writer) → Saves articles to `/research/`
- ✅ Josiah Crane (Church Adoption) → Saves analysis to `/decisions/`
- ✅ Micah Torres (Catalog Manager) → Saves metadata updates
- ✅ All agents → Daily summaries to `/daily/`

## Manual Trigger

Tell me: "Push [agent name]'s latest work to the Second Brain"
