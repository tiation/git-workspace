# Quick Reference: Example Commands

This document provides a quick reference of common commands you can use in the portable Git environment.

## Environment Setup

```bash
# Initialize the environment (first-time setup)
./init.sh

# Activate the environment
source ./activate.sh

# Configure GitHub CLI
gh-cli auth login

# Configure GitLab CLI
glab-cli auth login
```

## Project Management

```bash
# List available project templates
dev-tools.sh list-templates

# Create a new project
dev-tools.sh create-project node-js my-app

# Create a project in a specific location
dev-tools.sh create-project python my-python-lib ./repos/github
```

## Repository Management

```bash
# Clone all configured repositories
sync-repos.sh clone-all

# Clone specific GitHub repositories
sync-repos.sh clone-github repo1,repo2

# Clone specific GitLab repositories
sync-repos.sh clone-gitlab project1,project2

# Update all repositories
sync-repos.sh update-all

# Check status of all repositories
sync-repos.sh status-all

# Set up mirroring from GitHub to GitLab
sync-repos.sh mirror github source-repo gitlab target-repo

# Run a command across all repositories
sync-repos.sh batch all "git checkout main && git pull"
```

## Git Workflows

```bash
# Create a feature branch
dev-tools.sh git-feature user-authentication

# Create a hotfix branch
dev-tools.sh git-hotfix critical-bug

# Create a release branch
dev-tools.sh git-release 1.0.0

# Save work in progress
dev-tools.sh git-save "WIP: Implementing login form"

# Create a pull request
dev-tools.sh create-pr

# Clean up merged branches
dev-tools.sh clean-branches
```

## Development Tools

```bash
# Install Node.js
dev-tools.sh install-tool node 16.13.0

# Install Python
dev-tools.sh install-tool python 3.9.7

# Install Go
dev-tools.sh install-tool go 1.17.3

# List installed tools
dev-tools.sh list-tools

# Run linting on a project
dev-tools.sh lint ./my-project

# Run tests on a project
dev-tools.sh test ./my-project
```

## GitHub CLI

```bash
# List your repositories
gh-cli repo list

# Create a new repository
gh-cli repo create my-new-repo --public

# List issues
gh-cli issue list

# Create an issue
gh-cli issue create --title "Bug report" --body "Description of the bug"

# List pull requests
gh-cli pr list

# View a specific PR
gh-cli pr view 123
```

## GitLab CLI

```bash
# List your repositories
glab-cli repo list

# Create a new repository
glab-cli repo create my-new-project --public

# List issues
glab-cli issue list

# Create an issue
glab-cli issue create --title "Feature request" --description "Description of the feature"

# List merge requests
glab-cli mr list

# Create a merge request
glab-cli mr create --title "Add new feature" --description "Description of changes"
```

## Portable Git

```bash
# Check repository status
git-portable status

# Add files
git-portable add .

# Create a commit
git-portable commit -m "Add new feature"

# Push changes
git-portable push origin main

# Pull latest changes
git-portable pull origin main
```

## Common Tasks

```bash
# Initialize project templates
dev-tools.sh init-templates

# Create a new Node.js project and install dependencies
dev-tools.sh create-project node-js new-app
cd new-app
npm install

# Clone a repository and create a feature branch
sync-repos.sh clone-github my-repo
cd repos/github/my-repo
dev-tools.sh git-feature new-feature

# Update all repositories and check status
sync-repos.sh update-all
sync-repos.sh status-all
```

