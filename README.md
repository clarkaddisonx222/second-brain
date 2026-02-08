# 🧠 Scott's Second Brain

A personal knowledge base built with [Quartz](https://quartz.jzhao.xyz), hosted on GitHub Pages.

**Live URL:** https://clarkaddisonx222.github.io/second-brain/

---

## 📁 Content Structure

```
content/
├── index.md                 # Dashboard with pinned items, projects, search
├── work/
│   ├── projects/
│   │   ├── pray150-psalter/   # Pray150 & South Florida Psalter
│   │   │   ├── index.md
│   │   │   ├── research/      # Research articles, analysis
│   │   │   ├── team/          # Virtual agent profiles
│   │   │   └── decisions/     # Strategy docs, ADRs
│   │   └── 222-disciple/      # Digital discipleship platform
│   ├── sermons/               # Teaching notes
│   └── decisions/             # Work decision log
├── personal/
│   ├── travel/                # Trip plans
│   ├── notes/                 # Random thoughts
│   ├── people/                # Contact notes
│   └── resources/             # Books, tools, articles
└── daily/                     # Daily journal entries
```

---

## 📝 How to Add Content

### Option 1: Tell Clark (Easiest)
Just message me with what you want added. I can:
- Add new pages
- Update existing content
- Create daily notes
- Add pinned reminders (like parking spots)

### Option 2: Edit on GitHub
1. Go to https://github.com/clarkaddisonx222/second-brain
2. Navigate to `content/` folder
3. Click any `.md` file → Edit (pencil icon)
4. Make changes and commit
5. **Important:** After editing, message me to rebuild and deploy the site

### Option 3: Clone and Edit Locally
```bash
git clone https://github.com/clarkaddisonx222/second-brain.git
cd second-brain
# Edit content files in the content/ folder
git add .
git commit -m "Update content"
git push origin main
# Then message Clark to rebuild the site
```

---

## 🚀 For Clark: Rebuilding the Site

After content changes are pushed to `main`:

```bash
cd /data/.openclaw/workspace/second-brain
git checkout main
git pull origin main
npm install
npx quartz build
git checkout gh-pages
git rm -rf .
cp -r public/* .
rm -rf public
git add -A
git commit -m "Rebuild site"
git push origin gh-pages
git checkout main
```

---

## 🎨 Theme

Custom warm, readable theme inspired by modern Obsidian:
- **Light mode:** Warm cream background (`#fdfcf8`)
- **Dark mode:** Deep charcoal (`#242220`)
- **Accent:** Warm brown/gold (`#8b7355`)
- **Typography:** Inter (clean, modern)

---

## 🔗 Quick Links

- **Dashboard:** https://clarkaddisonx222.github.io/second-brain/
- **Pray150 Project:** https://clarkaddisonx222.github.io/second-brain/work/projects/pray150-psalter/
- **GitHub Repo:** https://github.com/clarkaddisonx222/second-brain

---

*Built with Quartz v4.5.2*
