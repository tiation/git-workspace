#!/bin/bash

# CLI Tools Setup Script
# This script downloads and sets up GitHub CLI and GitLab CLI in the portable environment

# Detect script location and Ventoy drive path
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_PATH="$(cd "$SCRIPT_DIR/.." && pwd)"
VENTOY_PATH="$(cd "$WORKSPACE_PATH/.." && pwd)"
TOOLS_PATH="$WORKSPACE_PATH/tools"
ENV_PATH="$WORKSPACE_PATH/env"
CONFIG_PATH="$WORKSPACE_PATH/config"

echo "Setting up portable CLI environment on $VENTOY_PATH"

# Create directories if they don't exist
mkdir -p "$TOOLS_PATH/cli"
mkdir -p "$CONFIG_PATH"

# Detect OS and Architecture
OS="linux"
ARCH="amd64"

if [[ "$(uname -m)" == "aarch64" ]]; then
    ARCH="arm64"
fi

# Set versions
GH_VERSION="2.42.0"
GLAB_VERSION="1.55.0"

# Download GitHub CLI
download_gh_cli() {
    echo "Downloading GitHub CLI v$GH_VERSION for $OS/$ARCH..."
    
    local GH_DIR="$TOOLS_PATH/cli/gh"
    local TMP_DIR="$(mktemp -d)"
    local DOWNLOAD_URL="https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_${OS}_${ARCH}.tar.gz"
    
    curl -L "$DOWNLOAD_URL" -o "$TMP_DIR/gh.tar.gz"
    
    if [ ! -d "$GH_DIR" ]; then
        mkdir -p "$GH_DIR"
    fi
    
    tar -xzf "$TMP_DIR/gh.tar.gz" -C "$TMP_DIR"
    cp -r "$TMP_DIR/gh_${GH_VERSION}_${OS}_${ARCH}/bin/gh" "$GH_DIR/"
    
    # Create config directory for GitHub CLI
    mkdir -p "$CONFIG_PATH/gh"
    
    # Clean up
    rm -rf "$TMP_DIR"
    
    echo "GitHub CLI downloaded successfully to $GH_DIR"
}

# Download GitLab CLI
download_glab_cli() {
    echo "Downloading GitLab CLI v$GLAB_VERSION for $OS/$ARCH..."
    
    local GLAB_DIR="$TOOLS_PATH/cli/glab"
    local TMP_DIR="$(mktemp -d)"
    local DOWNLOAD_URL="https://gitlab.com/gitlab-org/cli/-/releases/v${GLAB_VERSION}/downloads/glab_${GLAB_VERSION}_${OS}_${ARCH}.tar.gz"
    
    curl -L "$DOWNLOAD_URL" -o "$TMP_DIR/glab.tar.gz"
    
    if [ ! -d "$GLAB_DIR" ]; then
        mkdir -p "$GLAB_DIR"
    fi
    
    tar -xzf "$TMP_DIR/glab.tar.gz" -C "$TMP_DIR"
    cp -r "$TMP_DIR/bin/glab" "$GLAB_DIR/"
    
    # Create config directory for GitLab CLI
    mkdir -p "$CONFIG_PATH/glab"
    
    # Clean up
    rm -rf "$TMP_DIR"
    
    echo "GitLab CLI downloaded successfully to $GLAB_DIR"
}

# Create wrapper scripts with environment configuration
create_wrappers() {
    echo "Creating CLI wrapper scripts..."
    
    # GitHub CLI wrapper
    cat > "$SCRIPT_DIR/gh-cli" << EOF
#!/bin/bash
# GitHub CLI wrapper with portable configuration

# Set environment variables
export GH_CONFIG_DIR="$CONFIG_PATH/gh"
export XDG_CONFIG_HOME="$CONFIG_PATH"
export GH_HOST=github.com

# Execute GitHub CLI
"$TOOLS_PATH/cli/gh/gh" "\$@"
EOF
    
    # GitLab CLI wrapper
    cat > "$SCRIPT_DIR/glab-cli" << EOF
#!/bin/bash
# GitLab CLI wrapper with portable configuration

# Set environment variables
export GLAB_CONFIG_DIR="$CONFIG_PATH/glab"
export XDG_CONFIG_HOME="$CONFIG_PATH"
export GITLAB_URI=https://gitlab.com

# Execute GitLab CLI
"$TOOLS_PATH/cli/glab/glab" "\$@"
EOF
    
    # Make wrappers executable
    chmod +x "$SCRIPT_DIR/gh-cli"
    chmod +x "$SCRIPT_DIR/glab-cli"
    
    echo "Wrapper scripts created at:"
    echo "  - $SCRIPT_DIR/gh-cli"
    echo "  - $SCRIPT_DIR/glab-cli"
}

# Configure git settings
configure_git() {
    echo "Configuring portable Git environment..."
    
    # Create git config file
    cat > "$CONFIG_PATH/gitconfig" << EOF
[user]
    name = raf astor
    email = t115th3on31k@gmail.com

[core]
    autocrlf = input
    editor = nano

[init]
    defaultBranch = main

[pull]
    rebase = false

[push]
    default = simple
EOF
    
    # Create Git wrapper script
    cat > "$SCRIPT_DIR/git-portable" << EOF
#!/bin/bash
# Portable Git configuration wrapper

# Use our custom gitconfig
export GIT_CONFIG_GLOBAL="$CONFIG_PATH/gitconfig"

# Run git with the provided arguments
git "\$@"
EOF
    
    chmod +x "$SCRIPT_DIR/git-portable"
    
    echo "Git configured with user: raf astor <t115th3on31k@gmail.com>"
    echo "Git wrapper script created at: $SCRIPT_DIR/git-portable"
}

# Configure GitHub CLI authentication
configure_gh_auth() {
    echo "To configure GitHub CLI authentication, run:"
    echo "  $SCRIPT_DIR/gh-cli auth login"
    echo ""
    echo "This will prompt you to log in to your GitHub account."
}

# Configure GitLab CLI authentication
configure_glab_auth() {
    echo "To configure GitLab CLI authentication, run:"
    echo "  $SCRIPT_DIR/glab-cli auth login"
    echo ""
    echo "This will prompt you to log in to your GitLab account."
}

# Create a profile script to easily set up the environment
create_profile() {
    echo "Creating environment profile script..."
    
    cat > "$WORKSPACE_PATH/activate-cli.sh" << EOF
#!/bin/bash
# Activate CLI tools environment

export VENTOY_PATH="$VENTOY_PATH"
export WORKSPACE_PATH="$WORKSPACE_PATH"
export PATH="\$PATH:$SCRIPT_DIR"
export GIT_CONFIG_GLOBAL="$CONFIG_PATH/gitconfig"
export GH_CONFIG_DIR="$CONFIG_PATH/gh"
export GLAB_CONFIG_DIR="$CONFIG_PATH/glab"
export XDG_CONFIG_HOME="$CONFIG_PATH"

echo "CLI tools environment activated."
echo ""
echo "Available commands:"
echo "  - gh-cli    : GitHub CLI"
echo "  - glab-cli  : GitLab CLI"
echo "  - git-portable : Git with portable config"
echo ""
echo "Git configured as: raf astor <t115th3on31k@gmail.com>"
EOF
    
    chmod +x "$WORKSPACE_PATH/activate-cli.sh"
    
    echo "Environment profile created at: $WORKSPACE_PATH/activate-cli.sh"
    echo "To activate the environment in a terminal session, run:"
    echo "  source $WORKSPACE_PATH/activate-cli.sh"
}

# Main execution
echo "Starting CLI tools setup..."

# Download CLI tools
if [ ! -f "$TOOLS_PATH/cli/gh/gh" ]; then
    download_gh_cli
else
    echo "GitHub CLI already downloaded. Skipping."
fi

if [ ! -f "$TOOLS_PATH/cli/glab/glab" ]; then
    download_glab_cli
else
    echo "GitLab CLI already downloaded. Skipping."
fi

# Create wrapper scripts
create_wrappers

# Configure git
configure_git

# Create profile
create_profile

echo ""
echo "CLI tools setup complete!"
echo ""
echo "Next steps:"
configure_gh_auth
echo ""
configure_glab_auth
echo ""
echo "Then you can start using the CLI tools with the wrapper scripts."

