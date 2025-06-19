# Portable Git Environment Documentation

Welcome to the documentation for the Portable Git Environment on Ventoy. This guide will help you navigate the available documentation and find the information you need.

## Documentation Overview

The documentation is organized into several sections, each covering a specific aspect of the portable Git environment:

| Document | Description |
|----------|-------------|
| [Main README](../README.md) | Overview, quick start, and general information |
| [CLI Tools](./cli-tools.md) | GitHub and GitLab CLI usage and configuration |
| [Development Tools](./dev-tools.md) | Project management and development workflows |
| [Sync Tools](./sync-tools.md) | Repository synchronization and mirroring |
| [Project Templates](./templates.md) | Using and customizing project templates |
| [Example Commands](./example-commands.md) | Quick reference of common commands |

## Quick Links to Key Topics

### Getting Started
- [Environment Initialization](../README.md#quick-start)
- [Authentication Setup](./cli-tools.md#authentication-management)
- [Directory Structure](../README.md#directory-structure)

### Development Workflows
- [Creating a New Project](./dev-tools.md#creating-a-project-from-template)
- [Managing Git Branches](./dev-tools.md#git-workflow-automation)
- [Creating Pull Requests](./cli-tools.md#pull-requestmerge-request-workflow)
- [Working with Issues](./cli-tools.md#issue-management)

### Repository Management
- [Cloning Repositories](./sync-tools.md#repository-management)
- [Syncing Multiple Repositories](./sync-tools.md#common-workflows)
- [Repository Mirroring](./sync-tools.md#setting-up-repository-mirroring)
- [Batch Operations](./sync-tools.md#batch-operations)

### Configuration and Customization
- [Environment Variables](./cli-tools.md#environment-variables-and-configuration)
- [Customizing Templates](./templates.md#customizing-templates)
- [CLI Aliases and Shortcuts](./cli-tools.md#advanced-usage-patterns)
- [Git Configuration](../README.md#user-configuration)

### Troubleshooting
- [Environment Issues](../README.md#troubleshooting)
- [CLI Tool Problems](./cli-tools.md#troubleshooting)
- [Repository Sync Issues](./sync-tools.md#troubleshooting)
- [Project Creation Issues](./templates.md#troubleshooting)

## Documentation by Use Case

### Use Case: Setting Up a New Environment

If you're setting up the portable Git environment for the first time:

1. Read the [Quick Start](../README.md#quick-start) guide
2. Configure your [credentials](./cli-tools.md#authentication-management)
3. Initialize [project templates](./templates.md#available-templates)
4. Set up [repository syncing](./sync-tools.md#configuration)

### Use Case: Starting a New Project

When you're ready to start a new development project:

1. Choose a [project template](./templates.md#available-templates)
2. [Create your project](./dev-tools.md#creating-a-project-from-template)
3. Set up [Git workflow](./dev-tools.md#git-workflow-automation)
4. [Install required tools](./dev-tools.md#development-tool-installation)

### Use Case: Managing Multiple Repositories

For maintaining multiple repositories across GitHub and GitLab:

1. Configure [repository lists](./sync-tools.md#configuration)
2. Use [batch operations](./sync-tools.md#batch-operations) for efficiency
3. Set up [mirroring](./sync-tools.md#setting-up-repository-mirroring) between platforms
4. Monitor [repository status](./sync-tools.md#repository-status-check)

### Use Case: Collaborative Development

For team-based development and collaboration:

1. Set up [branch workflows](./dev-tools.md#git-workflow-automation)
2. Create and manage [pull requests](./cli-tools.md#pull-requestmerge-request-workflow)
3. Work with [issues](./cli-tools.md#issue-management)
4. Implement [project standards](../README.md#team-development-standardization)

### Use Case: Offline Development

For developing in environments with limited connectivity:

1. Ensure [repositories are synced](./sync-tools.md#repository-management)
2. [Install required tools](./dev-tools.md#tool-management) for offline use
3. Use [local project templates](./templates.md#available-templates)
4. Prepare [batch commands](./sync-tools.md#batch-operations) for later sync

## Documentation Organization

The documentation is organized based on the following principles:

1. **Function-based organization**: Documentation is divided by the primary function each component serves (CLI tools, development tools, etc.)

2. **Progressive disclosure**: Basic information is presented first, with more advanced topics appearing later in each document

3. **Use case orientation**: Where possible, documentation is organized around common tasks and workflows

4. **Cross-referencing**: Related topics in different documents are linked to help you find relevant information

5. **Examples**: Practical examples are provided throughout to demonstrate real-world usage

## Contributing to Documentation

If you'd like to improve this documentation:

1. Edit the relevant markdown files
2. Ensure all links remain valid
3. Maintain the existing formatting and organization
4. Add examples for new use cases as appropriate

## Additional Resources

- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [GitLab CLI Documentation](https://gitlab.com/gitlab-org/cli/-/tree/main/docs)
- [Git Documentation](https://git-scm.com/doc)

