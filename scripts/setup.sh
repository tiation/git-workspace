#!/bin/bash

# Portable GitHub and GitLab CLI setup script
# This script sets up a portable environment for Git, GitHub CLI, and GitLab CLI

# Detect script location and Ventoy drive path
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENTOY_PATH="$(cd "$SCRIPT_DIR/../.." && pwd)"
WORKSPACE_PATH="$VENTOY_PATH/git-workspace"
TOOLS_PATH="$WORKSPACE_PATH/tools"
ENV_PATH="$WORKSPACE_PATH/env"

echo "Setting up portable Git environment on $VENTOY_PATH"

# Create directories if they don't exist
mkdir -p "$TOOLS_PATH"
mkdir -p "$WORKSPACE_PATH/repos/github"
mkdir -p "$WORKSPACE_PATH/repos/gitlab"
mkdir -p "$WORKSPACE_PATH/config"

# Check for .env or create from template
if [ ! -f "$ENV_PATH/.env" ]; then
    if [ -f "$ENV_PATH/.env.template" ]; then
        echo "Creating .env file from template..."
        cp "$ENV_PATH/.env.template" "$ENV_PATH/.env"
        echo "Please edit $ENV_PATH/.env with your credentials."
    else
        echo "Error: .env.template not found. Cannot create .env file."
        exit 1
    fi
fi

# Download GitHub CLI
download_gh_cli() {
    echo "Downloading portable GitHub CLI..."
    local GH_VERSION="2.42.0"
    local OS="linux"
    local ARCH="amd64"

    if [[ "$(uname -m)" == "aarch64" ]]; then
        ARCH="arm64"
    fi

    local DOWNLOAD_URL="https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_${OS}_${ARCH}.tar.gz"
    local TMP_DIR="$(mktemp -d)"
    
    curl -L "$DOWNLOAD_URL" -o "$TMP_DIR/gh.tar.gz"
    tar -xzf "$TMP_DIR/gh.tar.gz" -C "$TMP_DIR"
    cp "$TMP_DIR/gh_${GH_VERSION}_${OS}_${ARCH}/bin/gh" "$TOOLS_PATH/"
    rm -rf "$TMP_DIR"
    
    echo "GitHub CLI downloaded to $TOOLS_PATH/gh"
}

# Download GitLab CLI
download_glab_cli() {
    echo "Downloading portable GitLab CLI..."
    local GLAB_VERSION="1.55.0"
    local OS="linux"
    local ARCH="amd64"
    
    if [[ "$(uname -m)" == "aarch64" ]]; then
        ARCH="arm64"
    fi

    local DOWNLOAD_URL="https://gitlab.com/gitlab-org/cli/-/releases/v${GLAB_VERSION}/downloads/glab_${GLAB_VERSION}_${OS}_${ARCH}.tar.gz"
    local TMP_DIR="$(mktemp -d)"
    
    curl -L "$DOWNLOAD_URL" -o "$TMP_DIR/glab.tar.gz"
    tar -xzf "$TMP_DIR/glab.tar.gz" -C "$TMP_DIR"
    cp "$TMP_DIR/bin/glab" "$TOOLS_PATH/"
    rm -rf "$TMP_DIR"
    
    echo "GitLab CLI downloaded to $TOOLS_PATH/glab"
}

# Download tools
if [ ! -f "$TOOLS_PATH/gh" ]; then
    download_gh_cli
fi

if [ ! -f "$TOOLS_PATH/glab" ]; then
    download_glab_cli
fi

# Make tools executable
chmod +x "$TOOLS_PATH/gh" "$TOOLS_PATH/glab"

# Update .env with actual paths
sed -i "s|\${VENTOY_PATH}|$VENTOY_PATH|g" "$ENV_PATH/.env"

# Create wrapper scripts for easier tool execution
cat > "$WORKSPACE_PATH/scripts/gh-wrapper.sh" << EOF
#!/bin/bash
source "$ENV_PATH/.env"
"$TOOLS_PATH/gh" "\$@"
EOF

cat > "$WORKSPACE_PATH/scripts/glab-wrapper.sh" << EOF
#!/bin/bash
source "$ENV_PATH/.env"
"$TOOLS_PATH/glab" "\$@"
EOF

chmod +x "$WORKSPACE_PATH/scripts/gh-wrapper.sh" "$WORKSPACE_PATH/scripts/glab-wrapper.sh"

echo "Creating git-environment.sh for sourcing..."
cat > "$WORKSPACE_PATH/git-environment.sh" << EOF
#!/bin/bash
# Source this file to set up your Git environment
export VENTOY_PATH="$VENTOY_PATH"
export PATH="\$PATH:$TOOLS_PATH:$WORKSPACE_PATH/scripts"
source "$ENV_PATH/.env"

# Configure git for this session
if [[ -n "\$GIT_USERNAME" && -n "\$GIT_EMAIL" ]]; then
    git config --global user.name "\$GIT_USERNAME"
    git config --global user.email "\$GIT_EMAIL"
    echo "Git configured with user: \$GIT_USERNAME <\$GIT_EMAIL>"
fi

echo "Git environment loaded. You can use gh-wrapper.sh and glab-wrapper.sh to access the CLI tools."
EOF

chmod +x "$WORKSPACE_PATH/git-environment.sh"

echo "Setup complete!"
echo "To use the environment:"
echo "1. Edit $ENV_PATH/.env with your credentials"
echo "2. Source the environment: source $WORKSPACE_PATH/git-environment.sh"
echo "3. Use the wrapper scripts: gh-wrapper.sh or glab-wrapper.sh"

