#!/bin/bash

# Portable Git Environment Initialization Script
# This script sets up the complete portable Git development environment on Ventoy

# Detect script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENTOY_PATH="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "============================================================="
echo "  Portable Git Environment Setup"
echo "  Location: $SCRIPT_DIR"
echo "============================================================="
echo ""

# Make script executable
chmod +x "$0"

# Create required directories
setup_directories() {
    echo "Setting up directory structure..."
    
    # Create main directories if they don't exist
    mkdir -p "$SCRIPT_DIR/tools"
    mkdir -p "$SCRIPT_DIR/repos/github"
    mkdir -p "$SCRIPT_DIR/repos/gitlab"
    mkdir -p "$SCRIPT_DIR/scripts"
    mkdir -p "$SCRIPT_DIR/config"
    mkdir -p "$SCRIPT_DIR/env"
    mkdir -p "$SCRIPT_DIR/templates/project-templates"
    
    echo "Directory structure created."
}

# Setup environment file
setup_env_file() {
    echo "Setting up environment configuration..."
    
    if [ ! -f "$SCRIPT_DIR/env/.env" ]; then
        if [ -f "$SCRIPT_DIR/env/.env.template" ]; then
            cp "$SCRIPT_DIR/env/.env.template" "$SCRIPT_DIR/env/.env"
            echo "Created .env file from template."
            echo "Please edit $SCRIPT_DIR/env/.env with your credentials."
        else
            cat > "$SCRIPT_DIR/env/.env.template" << EOF
# Git configuration
GIT_USERNAME="raf astor"
GIT_EMAIL="t115th3on31k@gmail.com"

# GitHub credentials
GITHUB_USERNAME="your_github_username"
GITHUB_TOKEN="your_github_token"
GITHUB_API_URL="https://api.github.com"

# GitLab credentials
GITLAB_USERNAME="your_gitlab_username"
GITLAB_TOKEN="your_gitlab_token"
GITLAB_API_URL="https://gitlab.com/api/v4"

# Repository sync configuration
SYNC_GITHUB_REPOS="repo1,repo2,repo3"
SYNC_GITLAB_REPOS="project1,project2,project3"

# Tool paths
GH_CLI_PATH="${SCRIPT_DIR}/tools/cli/gh/gh"
GLAB_CLI_PATH="${SCRIPT_DIR}/tools/cli/glab/glab"

# Workspace paths
GITHUB_REPOS_PATH="${SCRIPT_DIR}/repos/github"
GITLAB_REPOS_PATH="${SCRIPT_DIR}/repos/gitlab"
SCRIPTS_PATH="${SCRIPT_DIR}/scripts"
EOF
            
            cp "$SCRIPT_DIR/env/.env.template" "$SCRIPT_DIR/env/.env"
            echo "Created .env file from new template."
            echo "Please edit $SCRIPT_DIR/env/.env with your credentials."
        fi
    else
        echo ".env file already exists. Skipping."
    fi
}

# Setup CLI tools
setup_cli_tools() {
    echo "Setting up CLI tools..."
    
    if [ -f "$SCRIPT_DIR/scripts/setup-cli.sh" ]; then
        chmod +x "$SCRIPT_DIR/scripts/setup-cli.sh"
        "$SCRIPT_DIR/scripts/setup-cli.sh"
    else
        echo "Error: setup-cli.sh not found. CLI tools installation skipped."
    fi
}

# Initialize project templates
init_templates() {
    echo "Initializing project templates..."
    
    if [ -f "$SCRIPT_DIR/scripts/dev-tools.sh" ]; then
        chmod +x "$SCRIPT_DIR/scripts/dev-tools.sh"
        "$SCRIPT_DIR/scripts/dev-tools.sh" init-templates
    else
        echo "Error: dev-tools.sh not found. Project templates initialization skipped."
    fi
}

# Create master profile for environment activation
create_master_profile() {
    echo "Creating master profile for environment activation..."
    
    cat > "$SCRIPT_DIR/activate.sh" << EOF
#!/bin/bash
# Master profile for portable Git environment activation

# Detect script location
SCRIPT_DIR="\$(cd "\$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
VENTOY_PATH="\$(cd "\$SCRIPT_DIR/.." && pwd)"

# Source environment files if they exist
if [ -f "\$SCRIPT_DIR/activate-cli.sh" ]; then
    source "\$SCRIPT_DIR/activate-cli.sh"
fi

# Add scripts directory to PATH
export PATH="\$PATH:\$SCRIPT_DIR/scripts"

# Set environment variables
export VENTOY_GIT_WORKSPACE="\$SCRIPT_DIR"
source "\$SCRIPT_DIR/env/.env" 2>/dev/null || echo "Warning: .env file not found"

echo ""
echo "============================================================="
echo "  Portable Git Environment Activated"
echo "============================================================="
echo ""
echo "Available commands:"
echo "  - gh-cli               : GitHub CLI"
echo "  - glab-cli             : GitLab CLI"
echo "  - git-portable         : Git with portable config"
echo "  - dev-tools.sh         : Development tools and project management"
echo "  - sync-repos.sh        : Repository synchronization"
echo ""
echo "Quick usage:"
echo "  - Create a project:    dev-tools.sh create-project <template> <name>"
echo "  - Clone repositories:  sync-repos.sh clone-all"
echo "  - Start a feature:     dev-tools.sh git-feature <feature-name>"
echo "  - Create a PR:         dev-tools.sh create-pr"
echo ""
echo "Git configured as: \$GIT_USERNAME <\$GIT_EMAIL>"
echo "============================================================="
EOF
    
    chmod +x "$SCRIPT_DIR/activate.sh"
    
    echo "Master profile created at: $SCRIPT_DIR/activate.sh"
}

# Print setup instructions
print_instructions() {
    echo ""
    echo "============================================================="
    echo "  Portable Git Environment Setup Complete"
    echo "============================================================="
    echo ""
    echo "To activate your portable Git environment:"
    echo ""
    echo "  source $SCRIPT_DIR/activate.sh"
    echo ""
    echo "Important next steps:"
    echo ""
    echo "1. Edit $SCRIPT_DIR/env/.env with your GitHub and GitLab credentials"
    echo "2. Run the GitHub CLI authentication:"
    echo "   gh-cli auth login"
    echo "3. Run the GitLab CLI authentication:"
    echo "   glab-cli auth login"
    echo ""
    echo "Available tools:"
    echo "  - GitHub CLI (gh-cli)"
    echo "  - GitLab CLI (glab-cli)"
    echo "  - Development tools (dev-tools.sh)"
    echo "  - Repository synchronization (sync-repos.sh)"
    echo ""
    echo "Enjoy your portable Git development environment!"
    echo "============================================================="
}

# Main execution
echo "Starting environment initialization..."
echo ""

# Execute setup steps
setup_directories
setup_env_file
setup_cli_tools
init_templates
create_master_profile
print_instructions

exit 0

