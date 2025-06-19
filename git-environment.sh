#!/bin/bash
# Source this file to set up your Git environment
export VENTOY_PATH="/media/lacie/exfat"
export PATH="$PATH:/media/lacie/exfat/git-workspace/tools:/media/lacie/exfat/git-workspace/scripts"
source "/media/lacie/exfat/git-workspace/env/.env"

# Configure git for this session
if [[ -n "$GIT_USERNAME" && -n "$GIT_EMAIL" ]]; then
    git config --global user.name "$GIT_USERNAME"
    git config --global user.email "$GIT_EMAIL"
    echo "Git configured with user: $GIT_USERNAME <$GIT_EMAIL>"
fi

echo "Git environment loaded. You can use gh-wrapper.sh and glab-wrapper.sh to access the CLI tools."
