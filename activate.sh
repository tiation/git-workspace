#!/bin/bash
# Master profile for portable Git environment activation

# Detect script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENTOY_PATH="$(cd "$SCRIPT_DIR/.." && pwd)"

# Source environment files if they exist
if [ -f "$SCRIPT_DIR/activate-cli.sh" ]; then
    source "$SCRIPT_DIR/activate-cli.sh"
fi

# Add scripts directory to PATH
export PATH="$PATH:$SCRIPT_DIR/scripts"

# Set environment variables
export VENTOY_GIT_WORKSPACE="$SCRIPT_DIR"
source "$SCRIPT_DIR/env/.env" 2>/dev/null || echo "Warning: .env file not found"

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
echo "Git configured as: $GIT_USERNAME <$GIT_EMAIL>"
echo "============================================================="
