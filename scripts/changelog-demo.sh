#!/bin/bash

# Demo script for automated changelog generation
# This script demonstrates the changelog workflow

set -e

echo "🎯 Changelog Automation Demo"
echo "============================="
echo

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

echo "📝 Current changelog status:"
echo "• Current version: $(node -p "require('./package.json').version")"
echo "• Last tag: $(git describe --tags --abbrev=0 2>/dev/null || echo 'none')"
echo "• Commits since last tag: $(git rev-list $(git describe --tags --abbrev=0 2>/dev/null || echo '--all') --count HEAD 2>/dev/null || echo 'all')"
echo

echo "🔍 Available commands:"
echo "1. npm run changelog:update      - Update changelog manually"
echo "2. npm run changelog:generate    - Generate with conventional-changelog"
echo "3. npm version patch/minor/major - Bump version + update changelog"
echo

echo "📋 Example conventional commits:"
echo "• feat: add new feature"
echo "• fix: resolve bug issue"
echo "• docs: update documentation"
echo "• test: add test cases"
echo "• chore: update dependencies"
echo "• feat!: breaking change"
echo

read -p "Would you like to update the changelog now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Updating changelog..."
    npm run changelog:update
    echo
    echo "✅ Changelog updated! Check CHANGELOG.md for changes."
else
    echo "ℹ️  Skipping changelog update."
fi

echo
echo "🎉 Demo complete!"
echo "📖 See docs/CHANGELOG_AUTOMATION.md for full documentation."
