# CLI Tools Documentation

This document provides detailed information about the CLI tools included in the portable Git environment.

## Overview

The portable Git environment includes command-line interfaces for both GitHub and GitLab, allowing you to interact with these platforms directly from the terminal. These tools are configured to work with the portable environment, maintaining their configuration within the Ventoy drive.

## Available CLI Tools

| Tool | Command | Purpose |
|------|---------|---------|
| GitHub CLI | `gh-cli` | Interact with GitHub repositories, issues, PRs, etc. |
| GitLab CLI | `glab-cli` | Interact with GitLab repositories, issues, MRs, etc. |
| Portable Git | `git-portable` | Git with portable configuration |

## Setup and Configuration

### Installation

The CLI tools are automatically installed when you run the initialization script:

```bash
./init.sh
```

This script:
1. Downloads the latest compatible versions of the GitHub and GitLab CLIs
2. Sets up wrapper scripts with proper environment variables
3. Creates configuration directories in the portable environment

### Manual Setup

If you need to manually set up or update the CLI tools:

```bash
./scripts/setup-cli.sh
```

You can customize versions by editing the following variables in `scripts/setup-cli.sh`:

```bash
GH_VERSION="2.42.0"
GLAB_VERSION="1.55.0"
```

### Configuration Files

The CLI tools store their configuration in the following locations:

```
git-workspace/
├── config/
│   ├── gh/        # GitHub CLI config
│   ├── glab/      # GitLab CLI config
│   └── gitconfig  # Git configuration
```

## Authentication Management

### Initial Authentication

After setting up the environment, you need to authenticate with GitHub and GitLab:

#### GitHub Authentication

```bash
gh-cli auth login
```

Authentication options:
- Web browser (recommended)
- Personal access token
- SSH key

#### GitLab Authentication

```bash
glab-cli auth login
```

Authentication options:
- Web browser (recommended)
- Personal access token
- SSH key

### Managing Multiple Accounts

Both CLIs support switching between different accounts:

#### GitHub Accounts

```bash
# List accounts
gh-cli auth status

# Login to another account
gh-cli auth login --hostname github.com

# Switch between accounts
gh-cli auth switch
```

#### GitLab Accounts

```bash
# List accounts
glab-cli auth status

# Login to another account
glab-cli auth login --hostname gitlab.com

# Switch between accounts (manually edit config)
nano $CONFIG_PATH/glab/config.yml
```

### Token Security

Your authentication tokens are stored in the configuration directories. To protect them:

1. Set appropriate permissions:
   ```bash
   chmod 700 config/gh config/glab
   ```

2. Log out when not in use:
   ```bash
   gh-cli auth logout
   glab-cli auth logout
   ```

3. Consider using scoped tokens with minimal permissions

## Advanced Usage Patterns

### GitHub CLI

#### Aliases

Create shortcuts for common commands:

```bash
# Create aliases
gh-cli alias set co pr checkout
gh-cli alias set prc 'pr create --fill'
gh-cli alias set rv 'repo view --web'

# Use aliases
gh-cli co 123
gh-cli prc
gh-cli rv
```

#### Custom API Queries

Access GitHub's GraphQL API directly:

```bash
# Get information about a repository
gh-cli api graphql -f query='
  query($owner:String!, $repo:String!) {
    repository(owner:$owner, name:$repo) {
      name
      description
      stargazerCount
    }
  }' -f owner=cli -f repo=cli
```

#### Scripting with GitHub CLI

Use GitHub CLI in scripts:

```bash
#!/bin/bash
# Create a repository and set up project
repo_name="my-new-project"
gh-cli repo create "$repo_name" --public --clone
cd "$repo_name"
echo "# $repo_name" > README.md
git add README.md
git commit -m "Initial commit"
git push -u origin main
gh-cli repo edit --add-topic automation
```

### GitLab CLI

#### CI/CD Integration

Manage CI/CD pipelines:

```bash
# List pipelines
glab-cli pipeline list

# Run a pipeline
glab-cli pipeline run

# View pipeline logs
glab-cli pipeline ci view

# Download artifacts
glab-cli pipeline ci artifact download
```

#### Project Variables

Manage project variables for CI/CD:

```bash
# Set a variable
glab-cli variable set MY_API_KEY "secret-value" --scope production

# List variables
glab-cli variable list

# Delete a variable
glab-cli variable delete MY_API_KEY
```

#### Structured Output

Get machine-readable output:

```bash
# JSON output
glab-cli repo list --json name,visibility

# Custom format
glab-cli issue list --format "{{.ID}}: {{.Title}}"
```

## Common Workflows

### Repository Management

#### Creating Repositories

```bash
# GitHub - create and clone
gh-cli repo create my-new-repo --public --clone

# GitLab - create and clone
glab-cli repo create my-new-repo --public --clone
```

#### Forking and Contributing

```bash
# GitHub workflow
gh-cli repo fork owner/repo
cd repo
git checkout -b feature-branch
# Make changes
git commit -am "Add feature"
gh-cli pr create --fill

# GitLab workflow
glab-cli repo fork namespace/project
cd project
git checkout -b feature-branch
# Make changes
git commit -am "Add feature"
glab-cli mr create --fill
```

### Issue Management

#### Working with Issues

```bash
# GitHub - create and assign
gh-cli issue create --title "Bug in login" --body "Description" --assignee @me

# GitLab - create and assign
glab-cli issue create --title "Bug in login" --description "Description" --assignee @me
```

#### Issue Workflows

```bash
# GitHub - view, checkout, and close
gh-cli issue list
gh-cli issue view 123
gh-cli issue develop 123 --branch fix-123
# Make changes
git commit -am "Fix issue #123"
gh-cli pr create --fill
gh-cli issue close 123

# GitLab - similar workflow
glab-cli issue list
glab-cli issue view 123
glab-cli issue checkout 123
# Make changes
git commit -am "Fix issue #123"
glab-cli mr create --fill
glab-cli issue close 123
```

### Pull Request/Merge Request Workflow

```bash
# GitHub PR workflow
gh-cli pr create --title "Add feature" --body "Description"
gh-cli pr list
gh-cli pr checks
gh-cli pr review --approve
gh-cli pr merge --squash

# GitLab MR workflow
glab-cli mr create --title "Add feature" --description "Description"
glab-cli mr list
glab-cli mr pipeline
glab-cli mr approve
glab-cli mr merge --squash
```

## Environment Variables and Configuration

### GitHub CLI Environment Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `GH_CONFIG_DIR` | Configuration directory | `config/gh` |
| `GH_HOST` | Default GitHub host | `github.com` |
| `GH_REPO` | Repository override | - |
| `GH_TOKEN` | Authentication token | - |
| `GH_EDITOR` | Editor for creating issues/PRs | System default |

To set a variable:

```bash
export GH_EDITOR=nano
```

### GitLab CLI Environment Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `GLAB_CONFIG_DIR` | Configuration directory | `config/glab` |
| `GITLAB_URI` | GitLab instance URL | `https://gitlab.com` |
| `GITLAB_TOKEN` | Authentication token | - |
| `GLAB_REPO` | Repository override | - |
| `GLAB_EDITOR` | Editor for creating issues/MRs | System default |

To set a variable:

```bash
export GLAB_EDITOR=nano
```

### Configuration Files

#### GitHub CLI Config

Located at `config/gh/config.yml`:

```yaml
# This is a sample - your file will be different
git_protocol: https
editor: nano
aliases:
  co: pr checkout
  prc: pr create
  rv: repo view --web
```

#### GitLab CLI Config

Located at `config/glab/config.yml`:

```yaml
# This is a sample - your file will be different
git_protocol: https
editor: nano
api_host: https://gitlab.com
token: your-token-here
```

### Customizing with .env

You can also set environment variables in `env/.env` for persistent configuration:

```
# GitHub settings
GITHUB_TOKEN="your-token-here"
GH_EDITOR="nano"

# GitLab settings
GITLAB_TOKEN="your-token-here"
GLAB_EDITOR="nano"
```

## Troubleshooting

### Authentication Issues

#### Problem: Authentication fails

**Symptoms**:
- "Authentication failed" error messages
- 401 Unauthorized errors
- "Token not found" errors

**Solutions**:
1. Check if token is still valid:
   ```bash
   gh-cli auth status
   glab-cli auth status
   ```

2. Re-authenticate:
   ```bash
   gh-cli auth login
   glab-cli auth login
   ```

3. Check token scopes (GitHub):
   ```bash
   gh-cli auth status --show-token
   ```
   Ensure the token has appropriate scopes (repo, read:org, etc.)

#### Problem: Token expiration

**Symptoms**:
- Authentication suddenly stops working

**Solution**:
1. Generate a new token on GitHub/GitLab website
2. Re-authenticate with the new token

### Command Execution Issues

#### Problem: Command not found

**Symptoms**:
- "Command not found" errors when trying to use `gh-cli` or `glab-cli`

**Solutions**:
1. Ensure environment is activated:
   ```bash
   source ./activate.sh
   ```

2. Check if tools are installed:
   ```bash
   ls -la tools/cli/gh/
   ls -la tools/cli/glab/
   ```

3. Repair installation:
   ```bash
   ./scripts/setup-cli.sh
   ```

#### Problem: Connection issues

**Symptoms**:
- "Connection refused" errors
- Timeouts

**Solutions**:
1. Check network connectivity:
   ```bash
   ping github.com
   ping gitlab.com
   ```

2. Check proxy settings (if applicable):
   ```bash
   export HTTPS_PROXY=http://proxy.example.com:8080
   ```

3. Check firewall rules

### Repository Issues

#### Problem: Repository not found

**Symptoms**:
- "Repository not found" errors
- 404 errors

**Solutions**:
1. Check repository exists and you have access:
   ```bash
   gh-cli repo view owner/repo
   glab-cli repo view owner/repo
   ```

2. Ensure you're authenticated with the correct account

#### Problem: Permission denied

**Symptoms**:
- "Permission denied" errors
- 403 Forbidden errors

**Solutions**:
1. Check if token has correct permissions
2. Verify you have appropriate access to the repository
3. Request access from repository owner

### Operation-Specific Issues

#### Problem: PR/MR creation fails

**Symptoms**:
- Error creating pull/merge requests

**Solutions**:
1. Ensure branch exists and has commits:
   ```bash
   git status
   ```

2. Push branch to remote:
   ```bash
   git push -u origin branch-name
   ```

3. Check if PR/MR already exists:
   ```bash
   gh-cli pr list
   glab-cli mr list
   ```

#### Problem: Issue with API rate limits

**Symptoms**:
- "API rate limit exceeded" errors

**Solutions**:
1. Check current rate limit status:
   ```bash
   gh-cli api rate_limit
   ```

2. Authenticate to increase limits:
   ```bash
   gh-cli auth login
   ```

3. Wait for rate limit to reset

## Additional Resources

- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [GitLab CLI Documentation](https://gitlab.com/gitlab-org/cli/-/tree/main/docs)
- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [GitLab API Documentation](https://docs.gitlab.com/ee/api/)

