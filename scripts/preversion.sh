#!/bin/sh

# Pre-version hook to update changelog before version bump
# This runs before npm version command

echo "🔄 Pre-version: Updating changelog..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not in a git repository"
    exit 1
fi

# Run the changelog update script
npm run changelog:update

# Add the updated changelog to git
git add CHANGELOG.md

echo "✅ Changelog updated and staged"
