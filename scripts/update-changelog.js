#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHANGELOG_FILE = 'CHANGELOG.md';

/**
 * Get the current version from package.json
 */
function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return packageJson.version;
}

/**
 * Get the latest git tag
 */
function getLatestTag() {
  try {
    return execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.log('No previous tags found, using initial commit');
    return null;
  }
}

/**
 * Get commit messages since last tag or from beginning
 */
function getCommitsSinceLastTag(lastTag) {
  const command = lastTag 
    ? `git log ${lastTag}..HEAD --pretty=format:"%h|%s|%an|%ad" --date=short`
    : 'git log --pretty=format:"%h|%s|%an|%ad" --date=short';
  
  try {
    const output = execSync(command, { encoding: 'utf8' });
    return output.split('\n').filter(line => line.trim());
  } catch (error) {
    console.log('No commits found');
    return [];
  }
}

/**
 * Categorize commits based on conventional commit format
 */
function categorizeCommits(commits) {
  const categories = {
    breaking: [],
    feat: [],
    fix: [],
    perf: [],
    refactor: [],
    style: [],
    test: [],
    docs: [],
    build: [],
    ci: [],
    chore: [],
    other: []
  };

  commits.forEach(commit => {
    const [hash, message, author, date] = commit.split('|');
    const commitObj = { hash, message, author, date };

    // Parse conventional commit format
    const conventionalMatch = message.match(/^(\w+)(\(.+\))?\!?:\s*(.+)$/);
    
    if (conventionalMatch) {
      const [, type, scope, description] = conventionalMatch;
      const isBreaking = message.includes('!:') || message.toLowerCase().includes('breaking');
      
      if (isBreaking) {
        categories.breaking.push({ ...commitObj, type, scope, description });
      } else if (categories[type]) {
        categories[type].push({ ...commitObj, type, scope, description });
      } else {
        categories.other.push({ ...commitObj, description: message });
      }
    } else {
      categories.other.push({ ...commitObj, description: message });
    }
  });

  return categories;
}

/**
 * Format commits for changelog
 */
function formatCommitsForChangelog(categories) {
  let changelog = '';

  if (categories.breaking.length > 0) {
    changelog += '\n### 💥 BREAKING CHANGES\n\n';
    categories.breaking.forEach(commit => {
      changelog += `- ${commit.description} (${commit.hash})\n`;
    });
  }

  if (categories.feat.length > 0) {
    changelog += '\n### ✨ Features\n\n';
    categories.feat.forEach(commit => {
      changelog += `- ${commit.description} (${commit.hash})\n`;
    });
  }

  if (categories.fix.length > 0) {
    changelog += '\n### 🐛 Bug Fixes\n\n';
    categories.fix.forEach(commit => {
      changelog += `- ${commit.description} (${commit.hash})\n`;
    });
  }

  if (categories.perf.length > 0) {
    changelog += '\n### ⚡ Performance Improvements\n\n';
    categories.perf.forEach(commit => {
      changelog += `- ${commit.description} (${commit.hash})\n`;
    });
  }

  if (categories.refactor.length > 0) {
    changelog += '\n### 🔨 Code Refactoring\n\n';
    categories.refactor.forEach(commit => {
      changelog += `- ${commit.description} (${commit.hash})\n`;
    });
  }

  if (categories.docs.length > 0) {
    changelog += '\n### 📚 Documentation\n\n';
    categories.docs.forEach(commit => {
      changelog += `- ${commit.description} (${commit.hash})\n`;
    });
  }

  if (categories.test.length > 0) {
    changelog += '\n### 🧪 Tests\n\n';
    categories.test.forEach(commit => {
      changelog += `- ${commit.description} (${commit.hash})\n`;
    });
  }

  if (categories.build.length > 0 || categories.ci.length > 0) {
    changelog += '\n### 🔧 Build System & CI\n\n';
    [...categories.build, ...categories.ci].forEach(commit => {
      changelog += `- ${commit.description} (${commit.hash})\n`;
    });
  }

  if (categories.style.length > 0 || categories.chore.length > 0) {
    changelog += '\n### 🧹 Maintenance\n\n';
    [...categories.style, ...categories.chore].forEach(commit => {
      changelog += `- ${commit.description} (${commit.hash})\n`;
    });
  }

  if (categories.other.length > 0) {
    changelog += '\n### Other Changes\n\n';
    categories.other.forEach(commit => {
      changelog += `- ${commit.description} (${commit.hash})\n`;
    });
  }

  return changelog;
}

/**
 * Update the CHANGELOG.md file
 */
function updateChangelog(version, changelogContent) {
  if (!fs.existsSync(CHANGELOG_FILE)) {
    console.error(`${CHANGELOG_FILE} not found!`);
    process.exit(1);
  }

  const existingChangelog = fs.readFileSync(CHANGELOG_FILE, 'utf8');
  const today = new Date().toISOString().split('T')[0];
  
  // Find the unreleased section and replace it
  const unreleasedPattern = /## \[Unreleased\]([\s\S]*?)(?=## \[|\[Unreleased\]:|$)/;
  const match = existingChangelog.match(unreleasedPattern);
  
  let newChangelog;
  
  if (match) {
    // Replace unreleased section with new version
    const newVersionSection = `## [Unreleased]\n\n## [${version}] - ${today}${changelogContent}\n`;
    newChangelog = existingChangelog.replace(unreleasedPattern, newVersionSection);
    
    // Update the links at the bottom
    const repoUrl = getRepoUrl();
    if (repoUrl) {
      const linkPattern = /(\[Unreleased\]: .+?\/compare\/)(.+?)(\.\.\.HEAD)/;
      const versionLinkPattern = /(\[Unreleased\]: .+?\/compare\/)(.+?)(\.\.\.HEAD)([\s\S]*?)$/;
      
      newChangelog = newChangelog.replace(versionLinkPattern, 
        `$1v${version}$3$4\n[${version}]: ${repoUrl}/releases/tag/v${version}`);
    }
  } else {
    console.warn('Could not find [Unreleased] section in changelog');
    // Add new section after the header
    const headerPattern = /(# Changelog[\s\S]*?)(\n## )/;
    const newVersionSection = `\n## [${version}] - ${today}${changelogContent}\n\n## `;
    newChangelog = existingChangelog.replace(headerPattern, `$1${newVersionSection}$2`);
  }
  
  fs.writeFileSync(CHANGELOG_FILE, newChangelog);
  console.log(`✅ Updated ${CHANGELOG_FILE} with version ${version}`);
}

/**
 * Get repository URL from package.json or git
 */
function getRepoUrl() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.repository && packageJson.repository.url) {
      return packageJson.repository.url.replace(/\.git$/, '').replace(/^git\+/, '');
    }
    
    // Try to get from git remote
    const gitRemote = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
    return gitRemote.replace(/\.git$/, '').replace(/^git@github\.com:/, 'https://github.com/');
  } catch (error) {
    return null;
  }
}

/**
 * Main function
 */
function main() {
  console.log('🚀 Updating changelog...');
  
  const currentVersion = getCurrentVersion();
  const lastTag = getLatestTag();
  
  console.log(`📦 Current version: ${currentVersion}`);
  console.log(`🏷️  Last tag: ${lastTag || 'none'}`);
  
  const commits = getCommitsSinceLastTag(lastTag);
  
  if (commits.length === 0) {
    console.log('ℹ️  No new commits found since last tag');
    return;
  }
  
  console.log(`📝 Found ${commits.length} commits since last tag`);
  
  const categorizedCommits = categorizeCommits(commits);
  const changelogContent = formatCommitsForChangelog(categorizedCommits);
  
  if (!changelogContent.trim()) {
    console.log('ℹ️  No significant changes to add to changelog');
    return;
  }
  
  updateChangelog(currentVersion, changelogContent);
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
