# Automated Changelog System

This project uses an automated changelog generation system that updates `CHANGELOG.md` based on git commits and version tags.

## How It Works

The system uses conventional commit messages to automatically categorize and format changelog entries:

### Commit Message Format

Follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Supported Types

- **feat**: A new feature (✨ Features)
- **fix**: A bug fix (🐛 Bug Fixes)
- **perf**: A performance improvement (⚡ Performance Improvements)
- **refactor**: A code change that neither fixes a bug nor adds a feature (🔨 Code Refactoring)
- **docs**: Documentation only changes (📚 Documentation)
- **test**: Adding missing tests or correcting existing tests (🧪 Tests)
- **build**: Changes that affect the build system (🔧 Build System)
- **ci**: Changes to CI configuration files and scripts (🔧 Continuous Integration)
- **style**: Changes that do not affect the meaning of the code (🧹 Code Style)
- **chore**: Other changes that don't modify src or test files (🧹 Maintenance)

### Breaking Changes

Add `!` after the type/scope or include `BREAKING CHANGE:` in the footer:

```
feat!: remove deprecated API
```

or

```
feat: add new feature

BREAKING CHANGE: This feature removes the old API
```

## Usage

### Manual Changelog Update

Update the changelog manually for the current version:

```bash
npm run changelog:update
```

### Version Bump with Changelog

When bumping version, the changelog is automatically updated:

```bash
npm version patch  # Updates changelog automatically
npm version minor
npm version major
```

### Alternative Conventional Changelog

Generate changelog using conventional-changelog-cli:

```bash
npm run changelog:generate
```

## Automated Workflow

### On Version Tags

When you push a version tag, GitHub Actions will:

1. Update the changelog automatically
2. Commit the changes
3. Create a GitHub release with changelog content
4. Publish to npm

### Example Workflow

1. Make changes with conventional commits:
   ```bash
   git commit -m "feat: add loan amount validation"
   git commit -m "fix: correct interest rate calculation"
   git commit -m "docs: update README examples"
   ```

2. Bump version (this automatically updates changelog):
   ```bash
   npm version minor
   ```

3. Push tag to trigger release:
   ```bash
   git push origin main --tags
   ```

## Example Commits

```bash
# Features
git commit -m "feat: add dark theme support"
git commit -m "feat(calculator): add payment frequency options"

# Bug fixes
git commit -m "fix: resolve calculation precision issue"
git commit -m "fix(ui): correct button alignment on mobile"

# Breaking changes
git commit -m "feat!: redesign component API"
git commit -m "feat: update React to v19

BREAKING CHANGE: Minimum React version is now 19.0.0"

# Documentation
git commit -m "docs: add usage examples"
git commit -m "docs(readme): update installation instructions"

# Tests
git commit -m "test: add validation test cases"
git commit -m "test(calculator): increase coverage to 95%"

# Chores
git commit -m "chore: update dependencies"
git commit -m "chore(deps): bump typescript to 5.8.3"
```

## Configuration

The changelog generation is configured in:

- `.changelogrc.json`: Conventional changelog configuration
- `scripts/update-changelog.js`: Custom changelog update script
- `package.json`: NPM scripts for changelog operations
- `.github/workflows/release.yml`: GitHub Actions automation

## Customization

To modify the changelog format, edit:

1. **Categories**: Update `scripts/update-changelog.js` to add/remove commit categories
2. **Styling**: Modify emoji and section headers in the script
3. **Conventional Config**: Update `.changelogrc.json` for conventional-changelog behavior
4. **Workflow**: Adjust `.github/workflows/release.yml` for release automation
