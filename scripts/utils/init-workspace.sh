#!/bin/bash
# ============================================================================
# Git Workspace Initialization Script
# ============================================================================
# Author: raf astor
# Email: t115th3on31k@gmail.com
# Description: This script initializes the git workspace with proper configurations
#              for both private GitLab instance and gitlab.com
# ============================================================================

set -e

WORKSPACE_DIR="$(cd "$(dirname "$0")/../../" && pwd)"
PRIVATE_GITLAB_HOST="145.223.22.14"
CONFIG_DIR="${WORKSPACE_DIR}/config"

# Color definitions
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print section header
print_header() {
    echo -e "${BLUE}===${NC} $1 ${BLUE}===${NC}"
}

# Print success message
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Print error message
print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Print warning message
print_warning() {
    echo -e "${YELLOW}!${NC} $1"
}

# Check if SSH keys exist
check_ssh_keys() {
    print_header "Checking SSH keys"
    
    if [[ ! -f ~/.ssh/gitlab_ed25519 ]]; then
        print_warning "GitLab.com SSH key not found."
        read -p "Do you want to generate a new SSH key for GitLab.com? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            ssh-keygen -t ed25519 -C "t115th3on31k@gmail.com" -f ~/.ssh/gitlab_ed25519 -N ""
            print_success "SSH key generated at ~/.ssh/gitlab_ed25519"
            echo "Add this public key to your GitLab.com account:"
            cat ~/.ssh/gitlab_ed25519.pub
        fi
    else
        print_success "GitLab.com SSH key found at ~/.ssh/gitlab_ed25519"
    fi
    
    if [[ ! -f ~/.ssh/gitlab_private_ed25519 ]]; then
        print_warning "Private GitLab SSH key not found."
        read -p "Do you want to generate a new SSH key for Private GitLab? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            ssh-keygen -t ed25519 -C "t115th3on31k@gmail.com" -f ~/.ssh/gitlab_private_ed25519 -N ""
            print_success "SSH key generated at ~/.ssh/gitlab_private_ed25519"
            echo "Add this public key to your private GitLab instance:"
            cat ~/.ssh/gitlab_private_ed25519.pub
        fi
    else
        print_success "Private GitLab SSH key found at ~/.ssh/gitlab_private_ed25519"
    fi
}

# Configure SSH
configure_ssh() {
    print_header "Configuring SSH"
    
    # Create SSH config if it doesn't exist
    if [[ ! -f ~/.ssh/config ]]; then
        touch ~/.ssh/config
        print_success "Created new SSH config file"
    fi
    
    # Check if GitLab.com configuration exists in SSH config
    if ! grep -q "Host gitlab.com" ~/.ssh/config; then
        echo -e "\nHost gitlab.com\n  HostName gitlab.com\n  User git\n  IdentityFile ~/.ssh/gitlab_ed25519" >> ~/.ssh/config
        print_success "Added GitLab.com configuration to SSH config"
    else
        print_success "GitLab.com configuration already exists in SSH config"
    fi
    
    # Check if private GitLab configuration exists in SSH config
    if ! grep -q "Host gitlab-private" ~/.ssh/config; then
        echo -e "\nHost gitlab-private\n  HostName ${PRIVATE_GITLAB_HOST}\n  User git\n  IdentityFile ~/.ssh/gitlab_private_ed25519" >> ~/.ssh/config
        print_success "Added private GitLab configuration to SSH config"
    else
        print_success "Private GitLab configuration already exists in SSH config"
    fi
    
    # Add SSH keys to agent
    eval "$(ssh-agent -s)" > /dev/null
    ssh-add ~/.ssh/gitlab_ed25519 2>/dev/null || print_warning "Failed to add GitLab.com key to agent"
    ssh-add ~/.ssh/gitlab_private_ed25519 2>/dev/null || print_warning "Failed to add Private GitLab key to agent"
    print_success "Added SSH keys to agent"
}

# Configure Git
configure_git() {
    print_header "Configuring Git"
    
    # Create global gitconfig if it doesn't exist
    if [[ ! -f ~/.gitconfig ]]; then
        git config --global user.name "raf astor"
        git config --global user.email "t115th3on31k@gmail.com"
        git config --global init.defaultBranch main
        git config --global core.editor nano
        git config --global pull.rebase false
        print_success "Created global Git configuration"
    else
        print_success "Global Git configuration already exists"
    fi
    
    # Create workspace specific Git configuration
    cat > "${CONFIG_DIR}/gitconfig" << EOF
[user]
    name = raf astor
    email = t115th3on31k@gmail.com

[includeIf "gitdir:${WORKSPACE_DIR}/gitlab-private/"]
    path = ${CONFIG_DIR}/gitlab/private.conf
    
[includeIf "gitdir:${WORKSPACE_DIR}/gitlab-com/"]
    path = ${CONFIG_DIR}/gitlab/com.conf
EOF
    print_success "Created workspace Git configuration"
    
    # Create GitLab specific configurations
    cat > "${CONFIG_DIR}/gitlab/private.conf" << EOF
[user]
    name = raf astor
    email = t115th3on31k@gmail.com
[url "git@gitlab-private:"]
    insteadOf = http://${PRIVATE_GITLAB_HOST}/
    insteadOf = https://${PRIVATE_GITLAB_HOST}/
EOF
    
    cat > "${CONFIG_DIR}/gitlab/com.conf" << EOF
[user]
    name = raf astor
    email = t115th3on31k@gmail.com
[url "git@gitlab.com:"]
    insteadOf = https://gitlab.com/
EOF
    print_success "Created GitLab specific configurations"
}

# Test connections
test_connections() {
    print_header "Testing connections"
    
    echo "Testing connection to GitLab.com..."
    if ssh -T git@gitlab.com 2>&1 | grep -q "Welcome to GitLab"; then
        print_success "Successfully connected to GitLab.com"
    else
        print_error "Failed to connect to GitLab.com"
        print_warning "Make sure you've added your SSH key to your GitLab.com account"
    fi
    
    echo "Testing connection to private GitLab..."
    if ssh -T git@${PRIVATE_GITLAB_HOST} 2>&1 | grep -q "Welcome to GitLab"; then
        print_success "Successfully connected to private GitLab"
    else
        print_error "Failed to connect to private GitLab"
        print_warning "Make sure you've added your SSH key to your private GitLab account"
    fi
}

# Main script execution
main() {
    print_header "Initializing Git Workspace"
    echo "Workspace directory: ${WORKSPACE_DIR}"
    
    # Make sure the config directory exists
    mkdir -p "${CONFIG_DIR}/gitlab"
    
    check_ssh_keys
    configure_ssh
    configure_git
    test_connections
    
    print_header "Initialization Complete"
    echo "Your Git workspace is now configured and ready to use."
    echo "You can use the repo-manager.sh script to manage your repositories."
}

# Run the main function
main

