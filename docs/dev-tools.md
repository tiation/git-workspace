# Development Tools Documentation

This document provides detailed information about the development tools and utilities included in the portable Git environment.

## Overview

The development tools (`dev-tools.sh`) provide a set of utilities to manage your development workflow, including:

- Project creation from templates
- Development workflow automation (feature branches, PRs, etc.)
- Linting and testing tools
- Installation of portable development tools (Node.js, Python, Go)

## Basic Usage

```bash
dev-tools.sh <command> [options]
```

For help with available commands:

```bash
dev-tools.sh
```

## Available Commands

### Project Management

| Command | Description | Example |
|---------|-------------|---------|
| `init-templates` | Initialize project templates | `dev-tools.sh init-templates` |
| `create-project` | Create new project from template | `dev-tools.sh create-project node-js my-app` |
| `list-templates` | List available project templates | `dev-tools.sh list-templates` |

### Development Tasks

| Command | Description | Example |
|---------|-------------|---------|
| `lint` | Run linting on a project | `dev-tools.sh lint ./my-project` |
| `test` | Run tests on a project | `dev-tools.sh test ./my-project` |

### Git Workflow

| Command | Description | Example |
|---------|-------------|---------|
| `git-feature` | Create a feature branch | `dev-tools.sh git-feature user-auth` |
| `git-hotfix` | Create a hotfix branch | `dev-tools.sh git-hotfix bug-123` |
| `git-release` | Create a release branch | `dev-tools.sh git-release 1.0.0` |
| `clean-branches` | Clean up merged branches | `dev-tools.sh clean-branches` |
| `create-pr` | Create a pull request | `dev-tools.sh create-pr` |
| `git-save` | Save work in progress | `dev-tools.sh git-save "WIP: Feature"` |

### Tool Management

| Command | Description | Example |
|---------|-------------|---------|
| `install-tool` | Install a development tool | `dev-tools.sh install-tool node 16.13.0` |
| `list-tools` | List installed tools | `dev-tools.sh list-tools` |

## Project Templates

Templates are used to quickly start new projects with boilerplate code and configuration. For more details on templates, see [Project Templates Documentation](./templates.md).

### Creating a Project from Template

```bash
dev-tools.sh create-project <template> <project-name> [dest-dir]
```

Example:
```bash
dev-tools.sh create-project node-js my-app ./repos/github
```

This will:
1. Create a new directory for your project
2. Copy template files to the new directory
3. Initialize a Git repository
4. Make an initial commit

## Git Workflow Automation

The development tools provide a streamlined Git workflow:

### Feature Development Workflow

1. Create a feature branch:
   ```bash
   dev-tools.sh git-feature user-authentication
   ```

2. Make your changes and save work in progress:
   ```bash
   dev-tools.sh git-save "WIP: Implementing login form"
   ```

3. Create a pull request when finished:
   ```bash
   dev-tools.sh create-pr
   ```

### Hotfix Workflow

1. Create a hotfix branch:
   ```bash
   dev-tools.sh git-hotfix critical-bug
   ```

2. Fix the issue and create a PR:
   ```bash
   dev-tools.sh create-pr
   ```

### Release Workflow

1. Create a release branch:
   ```bash
   dev-tools.sh git-release 1.0.0
   ```

2. Finalize the release and create a PR:
   ```bash
   dev-tools.sh create-pr
   ```

## Development Tool Installation

You can install portable versions of development tools that will be available within the environment.

### Installing Node.js

```bash
dev-tools.sh install-tool node 16.13.0
```

After installation, you can use Node.js through the wrapper scripts:
```bash
./scripts/wrappers/node
./scripts/wrappers/npm
./scripts/wrappers/npx
```

### Installing Python

```bash
dev-tools.sh install-tool python 3.9.7
```

Use Python through:
```bash
./scripts/wrappers/python3
./scripts/wrappers/pip3
```

### Installing Go

```bash
dev-tools.sh install-tool go 1.17.3
```

Use Go through:
```bash
./scripts/wrappers/go
```

## Common Development Tasks

### Linting

Automatically detects project type and runs appropriate linters:

```bash
dev-tools.sh lint ./my-project
```

Supports:
- JavaScript/Node.js (ESLint)
- Python (flake8)
- Go (go vet, golint)

### Testing

Automatically detects project type and runs appropriate tests:

```bash
dev-tools.sh test ./my-project
```

Supports:
- JavaScript/Node.js (npm test)
- Python (pytest)
- Go (go test)

## Troubleshooting

### Script Permissions

If you encounter permission issues, make sure the script is executable:

```bash
chmod +x scripts/dev-tools.sh
```

### Missing Dependencies

If linting or testing fails due to missing dependencies:

1. For Node.js projects:
   ```bash
   npm install --save-dev eslint
   ```

2. For Python projects:
   ```bash
   pip install flake8 pytest
   ```

3. For Go projects:
   ```bash
   go get -u golang.org/x/lint/golint
   ```

### Git Configuration Issues

If Git operations fail, verify your Git configuration:

```bash
git-portable config --list
```

Ensure that your username and email are set correctly in `env/.env`.

