#!/usr/bin/env node
/**
 * add-to-brain.js - Helper script for subagents to push content to Second Brain
 * 
 * Usage: node add-to-brain.js [options]
 * 
 * Options:
 *   --type <type>         Content type: research, decision, team-update
 *   --project <project>   Project slug (e.g., pray150-psalter)
 *   --title <title>       Content title
 *   --author <author>     Author name (e.g., "Elise Hartwell")
 *   --content <content>   Content body (markdown)
 *   --file <path>         Path to file containing content (alternative to --content)
 *   --tags <tags>         Comma-separated tags
 *   --date <date>         Publication date (YYYY-MM-DD, default: today)
 * 
 * Examples:
 *   node add-to-brain.js --type research --project pray150-psalter --title "My Research" --author "Elise" --content "# Research" --tags "research,worship"
 *   node add-to-brain.js --type decision --project pray150-psalter --title "ADR: Use X" --author "Josiah" --file ./decision.md
 * 
 * Environment Variables:
 *   SECOND_BRAIN_PATH - Path to second-brain repo (default: /data/.openclaw/workspace/second-brain)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--type':
        options.type = args[++i];
        break;
      case '--project':
        options.project = args[++i];
        break;
      case '--title':
        options.title = args[++i];
        break;
      case '--author':
        options.author = args[++i];
        break;
      case '--content':
        options.content = args[++i];
        break;
      case '--file':
        options.file = args[++i];
        break;
      case '--tags':
        options.tags = args[++i];
        break;
      case '--date':
        options.date = args[++i];
        break;
      case '--help':
        showHelp();
        process.exit(0);
        break;
    }
  }
  
  return options;
}

function showHelp() {
  console.log(`
add-to-brain.js - Push content to Second Brain

Usage: node add-to-brain.js [options]

Required Options:
  --type <type>         Content type: research, decision, team-update
  --title <title>       Content title
  --author <author>     Author name

Content (one of):
  --content <content>   Content body (markdown)
  --file <path>         Path to file containing content

Optional:
  --project <project>   Project slug (required for research, team-update)
  --tags <tags>         Comma-separated tags
  --date <date>         Publication date (YYYY-MM-DD, default: today)

Examples:
  node add-to-brain.js --type research --project pray150-psalter --title "My Research" --author "Elise" --content "# Research"
  node add-to-brain.js --type decision --title "ADR: Use X" --author "Josiah" --file ./decision.md
`);
}

function validateOptions(options) {
  const errors = [];
  
  if (!options.type) errors.push('Missing required option: --type');
  if (!options.title) errors.push('Missing required option: --title');
  if (!options.author) errors.push('Missing required option: --author');
  if (!options.content && !options.file) errors.push('Missing content: --content or --file required');
  
  const validTypes = ['research', 'decision', 'team-update'];
  if (options.type && !validTypes.includes(options.type)) {
    errors.push(`Invalid type "${options.type}". Must be one of: ${validTypes.join(', ')}`);
  }
  
  if ((options.type === 'research' || options.type === 'team-update') && !options.project) {
    errors.push(`Type "${options.type}" requires --project option`);
  }
  
  if (errors.length > 0) {
    console.error('Error:', errors.join('\nError: '));
    process.exit(1);
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 80);
}

function generateFrontmatter(options) {
  const date = options.date || new Date().toISOString().split('T')[0];
  const tags = options.tags ? options.tags.split(',').map(t => t.trim()) : [];
  
  const fm = {
    title: options.title,
    description: options.title,
    author: options.author,
    date: date,
    tags: tags.length > 0 ? tags : [options.type]
  };
  
  // YAML frontmatter
  let yaml = '---\n';
  yaml += `title: "${fm.title}"\n`;
  yaml += `description: "${fm.description}"\n`;
  yaml += `author: "${fm.author}"\n`;
  yaml += `date: ${fm.date}\n`;
  yaml += 'tags:\n';
  for (const tag of fm.tags) {
    yaml += `  - ${tag}\n`;
  }
  yaml += '---\n\n';
  
  return yaml;
}

function getTargetPath(options) {
  const basePath = process.env.SECOND_BRAIN_PATH || '/data/.openclaw/workspace/second-brain/content';
  const slug = slugify(options.title);
  
  switch (options.type) {
    case 'research':
      return path.join(basePath, 'work', 'projects', options.project, 'research', `${slug}.md`);
    case 'decision':
      return path.join(basePath, 'work', 'decisions', `${slug}.md`);
    case 'team-update':
      return path.join(basePath, 'work', 'projects', options.project, 'team', 'updates', `${slug}.md`);
    default:
      throw new Error(`Unknown type: ${options.type}`);
  }
}

function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function main() {
  const options = parseArgs();
  
  if (process.argv.length <= 2) {
    showHelp();
    process.exit(0);
  }
  
  validateOptions(options);
  
  // Load content from file if specified
  let content = options.content || '';
  if (options.file) {
    if (!fs.existsSync(options.file)) {
      console.error(`Error: File not found: ${options.file}`);
      process.exit(1);
    }
    content = fs.readFileSync(options.file, 'utf8');
  }
  
  // Generate file
  const targetPath = getTargetPath(options);
  ensureDirectoryExists(targetPath);
  
  const frontmatter = generateFrontmatter(options);
  const fullContent = frontmatter + content;
  
  fs.writeFileSync(targetPath, fullContent, 'utf8');
  
  console.log(`✅ Successfully created: ${targetPath}`);
  console.log(`   Type: ${options.type}`);
  console.log(`   Author: ${options.author}`);
  console.log(`   Title: ${options.title}`);
  
  // Return the path for potential further processing
  return targetPath;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
}

export { parseArgs, generateFrontmatter, getTargetPath, slugify };
