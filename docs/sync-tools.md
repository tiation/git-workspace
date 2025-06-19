# Repository Synchronization Tools Documentation

This document provides detailed information about the repository synchronization and management tools included in the portable Git environment.

## Overview

The sync tools (`sync-repos.sh`) help you manage repositories across GitHub and GitLab, allowing you to:

- Clone repositories from GitHub and GitLab
- Keep repositories up-to-date with remote changes
- Mirror repositories between platforms
- Perform batch operations on multiple repositories
- Monitor repository status

## Basic Usage

```bash
sync-repos.sh <command> [options]
```

For help with available commands:

```bash
sync-repos.sh
```

## Configuration

Repository lists are configured in the `env/.env` file:

```
# Repository sync configuration
SYNC_GITHUB_REPOS="repo1,repo2,repo3"
SYNC_GITLAB_REPOS="project1,project2,project3"
```

Update these comma-separated lists with the repositories you want to manage.

## Available Commands

### Repository Management

| Command | Description | Example |
|---------|-------------|---------|
| `clone-github` | Clone GitHub repositories | `sync-repos.sh clone-github repo1,repo2` |
| `clone-gitlab` | Clone GitLab repositories | `sync-repos.sh clone-gitlab project1,project2` |
| `update-github` | Update GitHub repositories | `sync-repos.sh update-github repo1,repo2` |
| `update-gitlab` | Update GitLab repositories | `sync-repos.sh update-gitlab project1,project2` |
| `clone-all` | Clone all configured repositories | `sync-repos.sh clone-all` |
| `update-all` | Update all repositories | `sync-repos.sh update-all` |
| `status-all` | Check status of all repositories | `sync-repos.sh status-all` |

### Mirroring

| Command | Description | Example |
|---------|-------------|---------|
| `mirror` | Set up repository mirroring | `sync-repos.sh mirror github repo-name gitlab repo-mirror` |

### Batch Operations

| Command | Description | Example |
|---------|-------------|---------|
| `batch` | Run a command in multiple repositories | `sync-repos.sh batch all 'git checkout main && git pull'` |

## Common Workflows

### Initial Repository Setup

To clone all your repositories from GitHub and GitLab:

1. Configure repository lists in `env/.env`:
   ```
   SYNC_GITHUB_REPOS="my-app,utils,documentation"
   SYNC_GITLAB_REPOS="my-lib,my-tool,shared-code"
   ```

2. Run the clone command:
   ```bash
   sync-repos.sh clone-all
   ```

This will clone all repositories from both GitHub and GitLab according to your configuration.

### Regular Updates

To keep all your repositories up-to-date:

```bash
sync-repos.sh update-all
```

### Repository Status Check

To check the status of all repositories (uncommitted changes, unpushed commits, etc.):

```bash
sync-repos.sh status-all
```

### Setting Up Repository Mirroring

To mirror a repository from GitHub to GitLab (or vice versa):

```bash
sync-repos.sh mirror github source-repo gitlab target-repo
```

This sets up:
1. A remote on the source repository pointing to the target
2. A post-commit hook to automatically push changes to the target

### Batch Operations

To run the same command across multiple repositories:

```bash
# Run command on all GitHub repos
sync-repos.sh batch github "git checkout main && git pull"

# Run command on all GitLab repos
sync-repos.sh batch gitlab "git fetch --all"

# Run command on all repos from both platforms
sync-repos.sh batch all "git status"
```

## Advanced Usage

### Adding New Repositories

To add a new repository to your managed list:

1. Edit `env/.env` and add the repository name to the appropriate list
2. Clone the repository using:
   ```bash
   sync-repos.sh clone-github new-repo-name
   # or
   sync-repos.sh clone-gitlab new-repo-name
   ```

### Repository Structure

Repositories are organized by platform:

```
repos/
├── github/
│   ├── repo1/
│   ├── repo2/
│   └── ...
└── gitlab/
    ├── project1/
    ├── project2/
    └── ...
```

### Security Notes

- Authentication tokens for GitHub and GitLab are stored in the `.env` file
- When setting up mirroring, tokens are used in Git remote URLs
- Always ensure your Ventoy drive is physically secure to protect these credentials

## Troubleshooting

### Authentication Issues

If you encounter authentication issues:

1. Verify that your credentials are correct in `env/.env`
2. Ensure you've authenticated with both GitHub and GitLab CLIs:
   ```bash
   gh-cli auth login
   glab-cli auth login
   ```

### Repository Not Found

If a repository cannot be found:

1. Check that the repository exists on the platform
2. Verify that you have access to the repository
3. Ensure the repository name is spelled correctly in your command or in `.env`

### Mirroring Issues

If repository mirroring is not working:

1. Check that both repositories exist
2. Verify that you have write access to both repositories
3. Check for error messages during the initial push
4. Manually test pushing to the target repository

### Sync Failures

If synchronization fails:

1. Check for merge conflicts
2. Ensure you have the necessary permissions
3. Verify that local changes are committed
4. Check network connectivity
