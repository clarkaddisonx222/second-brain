#!/usr/bin/env node
/**
 * subagent-api.js - Simple API for subagents to push content to Second Brain
 * 
 * This is a convenience wrapper around add-to-brain.js that provides
 * simpler functions for subagent use.
 * 
 * Can be used as a module or CLI.
 */

const { execSync } = require('child_process');
const path = require('path');

const SCRIPT_DIR = __dirname;
const ADD_TO_BRAIN = path.join(SCRIPT_DIR, 'add-to-brain.js');

/**
 * Push research content to the Second Brain
 * @param {Object} options
 * @param {string} options.project - Project slug (e.g., 'pray150-psalter')
 * @param {string} options.title - Research title
 * @param {string} options.author - Agent name (e.g., 'Elise Hartwell')
 * @param {string} options.content - Markdown content
 * @param {string[]} options.tags - Optional tags
 * @returns {string} Path to created file
 */
function addResearch({ project, title, author, content, tags = [] }) {
  const args = [
    'node', ADD_TO_BRAIN,
    '--type', 'research',
    '--project', project,
    '--title', title,
    '--author', author,
    '--content', content,
    '--tags', tags.join(',')
  ];
  
  const result = execSync(args.join(' '), { encoding: 'utf8' });
  console.log(result);
  return result;
}

/**
 * Push a decision to the Second Brain
 * @param {Object} options
 * @param {string} options.title - Decision title
 * @param {string} options.author - Agent name
 * @param {string} options.content - Markdown content
 * @param {string[]} options.tags - Optional tags
 * @returns {string} Path to created file
 */
function addDecision({ title, author, content, tags = [] }) {
  const args = [
    'node', ADD_TO_BRAIN,
    '--type', 'decision',
    '--title', title,
    '--author', author,
    '--content', content,
    '--tags', tags.join(',')
  ];
  
  const result = execSync(args.join(' '), { encoding: 'utf8' });
  console.log(result);
  return result;
}

/**
 * Push a team update to the Second Brain
 * @param {Object} options
 * @param {string} options.project - Project slug
 * @param {string} options.title - Update title
 * @param {string} options.author - Agent name
 * @param {string} options.content - Markdown content
 * @param {string[]} options.tags - Optional tags
 * @returns {string} Path to created file
 */
function addTeamUpdate({ project, title, author, content, tags = [] }) {
  const args = [
    'node', ADD_TO_BRAIN,
    '--type', 'team-update',
    '--project', project,
    '--title', title,
    '--author', author,
    '--content', content,
    '--tags', tags.join(',')
  ];
  
  const result = execSync(args.join(' '), { encoding: 'utf8' });
  console.log(result);
  return result;
}

/**
 * Commit and push changes to GitHub
 * @param {string} message - Commit message
 */
function commitAndPush(message = 'Auto-update from subagent') {
  const SECOND_BRAIN_PATH = process.env.SECOND_BRAIN_PATH || '/data/.openclaw/workspace/second-brain';
  
  const commands = [
    `cd ${SECOND_BRAIN_PATH}`,
    'git add -A',
    `git commit -m "${message}"`,
    'git push origin main'
  ];
  
  const result = execSync(commands.join(' && '), { encoding: 'utf8' });
  console.log(result);
  return result;
}

// CLI usage
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'research':
      addResearch({
        project: process.argv[3],
        title: process.argv[4],
        author: process.argv[5],
        content: process.argv[6],
        tags: process.argv[7] ? process.argv[7].split(',') : []
      });
      break;
      
    case 'decision':
      addDecision({
        title: process.argv[3],
        author: process.argv[4],
        content: process.argv[5],
        tags: process.argv[6] ? process.argv[6].split(',') : []
      });
      break;
      
    case 'team-update':
      addTeamUpdate({
        project: process.argv[3],
        title: process.argv[4],
        author: process.argv[5],
        content: process.argv[6],
        tags: process.argv[7] ? process.argv[7].split(',') : []
      });
      break;
      
    case 'push':
      commitAndPush(process.argv[3] || 'Auto-update from subagent');
      break;
      
    default:
      console.log(`
Subagent API for Second Brain

Usage:
  node subagent-api.js research <project> <title> <author> <content> [tags]
  node subagent-api.js decision <title> <author> <content> [tags]
  node subagent-api.js team-update <project> <title> <author> <content> [tags]
  node subagent-api.js push [message]

Examples:
  node subagent-api.js research pray150-psalter "My Research" "Elise" "# Content" "research,worship"
  node subagent-api.js decision "Use API" "Josiah" "# Decision" "adr,tech"
  node subagent-api.js push "Added research on psalms"

As a module:
  const api = require('./subagent-api.js');
  api.addResearch({ project: 'pray150-psalter', title: '...', author: '...', content: '...' });
  api.commitAndPush('Research added');
`);
  }
}

module.exports = { addResearch, addDecision, addTeamUpdate, commitAndPush };
