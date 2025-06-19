#!/bin/bash
# Activate CLI tools environment

export VENTOY_PATH="/home/lappy/Desktop/Projects"
export WORKSPACE_PATH="/home/lappy/Desktop/Projects/git-workspace"
export PATH="$PATH:/home/lappy/Desktop/Projects/git-workspace/scripts"
export GIT_CONFIG_GLOBAL="/home/lappy/Desktop/Projects/git-workspace/config/gitconfig"
export GH_CONFIG_DIR="/home/lappy/Desktop/Projects/git-workspace/config/gh"
export GLAB_CONFIG_DIR="/home/lappy/Desktop/Projects/git-workspace/config/glab"
export XDG_CONFIG_HOME="/home/lappy/Desktop/Projects/git-workspace/config"

echo "CLI tools environment activated."
echo ""
echo "Available commands:"
echo "  - gh-cli    : GitHub CLI"
echo "  - glab-cli  : GitLab CLI"
echo "  - git-portable : Git with portable config"
echo ""
echo "Git configured as: raf astor <t115th3on31k@gmail.com>"
