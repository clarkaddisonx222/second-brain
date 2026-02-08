---
title: "Building a Second Brain: Cost Controls, Family Notes & Conversation Archive"
date: 2026-02-08
participants:
  - Scott Vander Ploeg
  - Clark (AI Assistant)
topics:
  - Second Brain setup
  - Cost management
  - Family birthdays
  - Quick capture system
  - Conversation archive
tags:
  - second-brain
  - setup
  - onboarding
  - automation
thread_count: 5
---

# Building a Second Brain: Cost Controls, Family Notes & Conversation Archive

## Summary

Scott and Clark set up a comprehensive Second Brain system using Quartz on GitHub Pages. They implemented cost controls for AI models, added family information, created quick-capture workflows, and established automated daily updates. This conversation also initiated the creation of a conversation archive feature.

## Thread Overview

### Thread 1: Model Cost Management
**Started:** 10:49 AM

Scott reported maxing out AI model credits overnight. Clark reconfigured the system:
- Set Kimi K2.5 as primary default
- Established fallback chain: Kimi → Gemini Flash → Nexos
- Created cost thresholds: $1/day switch trigger, $2/day emergency stop
- Set up 4-hourly cost monitoring alerts
- Configured morning/evening dashboard updates

**Key Decisions:**
- Default to Kimi K2.5 for quality
- Automatic tier-switching based on spend
- Pause all work if Nexos exceeds $2/day

---

### Thread 2: South Florida Psalter Website
**Started:** 12:11 PM

Scott asked for his South Florida Psalter URL. Clark discovered the site was built but not deployed. They discussed deployment options but parked this for later completion.

---

### Thread 3: Building the Second Brain
**Started:** 1:21 PM

Scott requested a Second Brain system for personal and work knowledge management. Clark designed and deployed:

**Structure Created:**
```
📊 Dashboard (pinned items, active projects, quick actions)
🏢 Work/
  └── Projects/
      ├── Pray150 & South Florida Psalter
      ├── 222.Disciple
      └── Sermons (full catalog)
🏠 Personal/
  ├── Travel (parking spots, itineraries)
  ├── Notes (quick capture)
  ├── People (contacts, birthdays)
  ├── Todos (active tasks)
  └── Resources (bookmarks)
📅 Daily/ (auto-generated summaries)
💬 Conversations/ (this archive)
```

**Features Implemented:**
1. ✅ Quartz-based site with warm, readable styling
2. ✅ Full-text search and graph view
3. ✅ Quick-capture system (tell me → auto-saves)
4. ✅ Auto-population from subagents
5. ✅ Daily morning (7 AM) and evening (8 PM) updates
6. ✅ GitHub Pages deployment

---

### Thread 4: First Content Entry
**Started:** 2:18 PM

Scott added his family's birthdays as the first personal entry:
- Andrea: September 10, 1977
- Marissa: March 4, 2004
- Rachel: September 12, 2006
- Kate: April 8, 2010
- Copper (dog): April 15, 2017

This demonstrated the quick-capture workflow.

---

### Thread 5: Conversation Archive
**Started:** 4:02 PM

Scott requested a conversation archive feature. This document represents the implementation — organizing all their conversations into searchable, threaded records with summaries and full transcripts.

---

## Full Transcript

### Opening (10:49 AM)

**Scott:** It appears that we maxed out credits in our available models last night. I just added credits, but I want this openclaw bot to run as efficiently as possible. Could you set up some parameters to make sure that all agents and subagents try to do everything for free. Also we missed our 6am report as a result

**Clark:** I'll check the current configuration and set up an efficient model strategy...

[Clark checks session status and gateway config]

Clark updated the model configuration:
- Primary: Kimi K2.5 (OpenRouter)
- Fallbacks: Nexos Google Gemini 3 Flash Preview → Nexos GPT 4.1 → Nexos Claude Sonnet 4.5
- Restarted gateway to apply changes
- Spawned missed 6 AM dashboard update

**Scott:** [Later] I want to rearrange models: I want Kimi K 2.5 to be the default. But if it goes over $1 per day then I want you to switch to Gemini Flash, and if we use it too much to switch to Nexos. But if Nexos uses more than $2/day then I would like you to pause all work and query me about what to do.

**Clark:** Config updated and gateway is restarting...

Clark set up:
- Kimi K2.5 as primary
- 4-hourly cost monitoring cron job
- Alert thresholds at $0.80, $1.00, $1.80, and $2.00
- Emergency stop protocol

### South Florida Psalter (12:11 PM)

**Scott:** What is my South Florida psalter url

**Clark:** [Searches memory] Let me check the project files...

[Discovers site not deployed]

Clark: The South Florida Psalter website is built and ready but **not yet deployed**...

**Scott:** [1h later] Go for it

[Clark attempts deployment, encounters GitHub Pages issues, creates alternative scott-brain repo]

### Second Brain Design (1:21 PM)

**Scott:** Today I want us to build a second brain. I want this second brain to keep track of all important information and be an easily accessible site for me...

**Clark:** **Quartz** — it's specifically built for this. Beautiful, graph-connected, searchable...

[Detailed discussion of structure, input methods, deployment]

**Scott:** Go for it

[Clark spawns subagent to build Second Brain, encounters issues, completes manually]

**Clark:** It's live! https://clarkaddisonx222.github.io/scott-brain/

**Scott:** [Requests all 5 suggestions be completed]

[Clark implements all 5: test entry, auto-population, sermon import, quick-capture, daily dashboard]

### First Entry (2:18 PM)

**Scott:** I like all 5 suggestions. For my first entry, remember my family's birthdays...

[Clark saves birthdays, deploys to site]

**Clark:** Done! https://clarkaddisonx222.github.io/scott-brain/personal/people/family-birthdays

### Mark Summary (4:02 PM)

**Scott:** Give me a quick summary of Mark 5-8, in bullet points

[Clark provides summary]

### Conversation Archive Request (4:05 PM)

**Scott:** I was just thinking that there should be a place in our second brain that houses all the conversations we have...

**Clark:** Great idea. A conversation archive — searchable, organized by topic, with full transcripts...

[This document created]

---

## Outcomes & Deliverables

1. ✅ **Second Brain deployed** at https://clarkaddisonx222.github.io/scott-brain/
2. ✅ **Cost management system** with tiered fallbacks
3. ✅ **Quick-capture workflow** established
4. ✅ **Sermon catalog** imported (30 sermons)
5. ✅ **Family data** saved and accessible
6. ✅ **Conversation archive** initiated
7. ✅ **Automated daily updates** scheduled

## Links

- **Second Brain:** https://clarkaddisonx222.github.io/scott-brain/
- **Family Birthdays:** /personal/people/family-birthdays
- **Sermons:** /work/sermons/
- **Pray150 Project:** /work/projects/pray150-psalter/

---

*Conversation archived: February 8, 2026*
