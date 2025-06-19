#!/bin/bash

# Development tools and automation script
# This provides helper functions for common development tasks

# Load environment
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_PATH="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_PATH="$WORKSPACE_PATH/env"
TOOLS_PATH="$WORKSPACE_PATH/tools"
TEMPLATES_PATH="$WORKSPACE_PATH/templates"

# Make sure we have a templates directory
mkdir -p "$TEMPLATES_PATH/project-templates"

if [ ! -f "$ENV_PATH/.env" ]; then
    echo "Error: .env file not found. Please run setup.sh first."
    exit 1
fi

source "$ENV_PATH/.env"

# --------------------------------------------------
# Project Initialization Helpers
# --------------------------------------------------

# Create project template directories if they don't exist
init_templates() {
    echo "Initializing project templates..."
    
    # Create basic template directories
    mkdir -p "$TEMPLATES_PATH/project-templates/node-js"
    mkdir -p "$TEMPLATES_PATH/project-templates/python"
    mkdir -p "$TEMPLATES_PATH/project-templates/web-basic"
    mkdir -p "$TEMPLATES_PATH/project-templates/golang"
    
    # Create Node.js template
    if [ ! -f "$TEMPLATES_PATH/project-templates/node-js/package.json" ]; then
        cat > "$TEMPLATES_PATH/project-templates/node-js/package.json" << EOF
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "A Node.js project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "${GIT_USERNAME}",
  "license": "MIT"
}
EOF

        cat > "$TEMPLATES_PATH/project-templates/node-js/index.js" << EOF
// Main application entry point
console.log('Hello, world!');
EOF

        cat > "$TEMPLATES_PATH/project-templates/node-js/.gitignore" << EOF
# Node.js
node_modules/
npm-debug.log
package-lock.json

# Environment
.env
.env.local

# IDE
.vscode/
.idea/
*.sublime-*

# OS
.DS_Store
Thumbs.db
EOF
    fi
    
    # Create Python template
    if [ ! -f "$TEMPLATES_PATH/project-templates/python/setup.py" ]; then
        cat > "$TEMPLATES_PATH/project-templates/python/setup.py" << EOF
from setuptools import setup, find_packages

setup(
    name="project-name",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[],
    author="${GIT_USERNAME}",
    author_email="${GIT_EMAIL}",
    description="A Python project",
)
EOF

        mkdir -p "$TEMPLATES_PATH/project-templates/python/project_name"
        
        cat > "$TEMPLATES_PATH/project-templates/python/project_name/__init__.py" << EOF
"""Project initialization module."""

def main():
    """Main entry point."""
    print("Hello, world!")

if __name__ == "__main__":
    main()
EOF

        cat > "$TEMPLATES_PATH/project-templates/python/.gitignore" << EOF
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual Environment
venv/
env/
ENV/

# IDE
.vscode/
.idea/
*.sublime-*

# OS
.DS_Store
Thumbs.db
EOF
    fi
    
    # Create Web Basic template
    if [ ! -f "$TEMPLATES_PATH/project-templates/web-basic/index.html" ]; then
        cat > "$TEMPLATES_PATH/project-templates/web-basic/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Project</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Web Project</h1>
    </header>
    
    <main>
        <p>Hello, world!</p>
    </main>
    
    <footer>
        <p>&copy; $(date +%Y) ${GIT_USERNAME}</p>
    </footer>
    
    <script src="js/main.js"></script>
</body>
</html>
EOF

        mkdir -p "$TEMPLATES_PATH/project-templates/web-basic/css"
        cat > "$TEMPLATES_PATH/project-templates/web-basic/css/style.css" << EOF
/* Basic styles */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
    color: #333;
}

header, footer {
    background: #f4f4f4;
    padding: 20px;
    text-align: center;
}

main {
    padding: 20px;
}
EOF

        mkdir -p "$TEMPLATES_PATH/project-templates/web-basic/js"
        cat > "$TEMPLATES_PATH/project-templates/web-basic/js/main.js" << EOF
// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded');
});
EOF

        cat > "$TEMPLATES_PATH/project-templates/web-basic/.gitignore" << EOF
# IDE
.vscode/
.idea/
*.sublime-*

# OS
.DS_Store
Thumbs.db

# Logs
logs
*.log
EOF
    fi
    
    # Create Golang template
    if [ ! -f "$TEMPLATES_PATH/project-templates/golang/main.go" ]; then
        cat > "$TEMPLATES_PATH/project-templates/golang/main.go" << EOF
package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello, world!")
}
EOF

        cat > "$TEMPLATES_PATH/project-templates/golang/go.mod" << EOF
module github.com/${GITHUB_USERNAME}/project-name

go 1.16
EOF

        cat > "$TEMPLATES_PATH/project-templates/golang/.gitignore" << EOF
# Binaries for programs and plugins
*.exe
*.exe~
*.dll
*.so
*.dylib

# Test binary, built with 'go test -c'
*.test

# Output of the go coverage tool
*.out

# Dependency directories
vendor/

# IDE
.vscode/
.idea/
*.sublime-*

# OS
.DS_Store
Thumbs.db
EOF
    fi
    
    echo "Project templates initialized successfully!"
}

# Create a new project from a template
create_project() {
    local template=$1
    local project_name=$2
    local dest_dir=$3
    
    if [ -z "$template" ] || [ -z "$project_name" ]; then
        echo "Error: Missing template or project name."
        show_usage
        return 1
    fi
    
    if [ -z "$dest_dir" ]; then
        dest_dir="."
    fi
    
    local template_dir="$TEMPLATES_PATH/project-templates/$template"
    
    if [ ! -d "$template_dir" ]; then
        echo "Error: Template '$template' not found."
        echo "Available templates:"
        ls -1 "$TEMPLATES_PATH/project-templates"
        return 1
    fi
    
    local project_dir="$dest_dir/$project_name"
    
    # Check if project directory already exists
    if [ -d "$project_dir" ]; then
        echo "Error: Directory '$project_dir' already exists."
        return 1
    fi
    
    echo "Creating project '$project_name' from template '$template' in '$dest_dir'..."
    
    # Copy template directory
    cp -r "$template_dir" "$project_dir"
    
    # Replace placeholder names
    find "$project_dir" -type f -not -path "*/\.git/*" -exec sed -i "s/project-name/$project_name/g" {} \;
    find "$project_dir" -type f -not -path "*/\.git/*" -exec sed -i "s/project_name/${project_name//-/_}/g" {} \;
    
    # Initialize git repository
    (
        cd "$project_dir"
        git init
        git config user.name "$GIT_USERNAME"
        git config user.email "$GIT_EMAIL"
        git add .
        git commit -m "Initial commit from template"
    )
    
    echo "Project created successfully!"
    echo "Project path: $project_dir"
}

# --------------------------------------------------
# Common Development Tasks Automation
# --------------------------------------------------

# Run linting based on project type
lint_project() {
    local project_dir=$1
    
    if [ -z "$project_dir" ]; then
        project_dir="."
    fi
    
    cd "$project_dir" || return 1
    
    echo "Auto-detecting project type and running linter..."
    
    # Check for package.json (Node.js)
    if [ -f "package.json" ]; then
        echo "Detected Node.js project, running ESLint..."
        if [ -f "node_modules/.bin/eslint" ]; then
            node_modules/.bin/eslint .
        else
            echo "ESLint not found. Install with: npm install eslint --save-dev"
        fi
        return 0
    fi
    
    # Check for Python files
    if [ -f "setup.py" ] || [ -d "venv" ] || find . -maxdepth 1 -name "*.py" | grep -q .; then
        echo "Detected Python project, running flake8..."
        if command -v flake8 >/dev/null 2>&1; then
            flake8 .
        else
            echo "flake8 not found. Install with: pip install flake8"
        fi
        return 0
    fi
    
    # Check for Go files
    if [ -f "go.mod" ] || find . -maxdepth 1 -name "*.go" | grep -q .; then
        echo "Detected Go project, running go vet and golint..."
        if command -v go >/dev/null 2>&1; then
            go vet ./...
            if command -v golint >/dev/null 2>&1; then
                golint ./...
            else
                echo "golint not found. Install with: go get -u golang.org/x/lint/golint"
            fi
        else
            echo "Go not found. Please install Go."
        fi
        return 0
    fi
    
    echo "No recognized project type detected."
}

# Run tests based on project type
test_project() {
    local project_dir=$1
    
    if [ -z "$project_dir" ]; then
        project_dir="."
    fi
    
    cd "$project_dir" || return 1
    
    echo "Auto-detecting project type and running tests..."
    
    # Check for package.json (Node.js)
    if [ -f "package.json" ]; then
        echo "Detected Node.js project, running npm test..."
        npm test
        return 0
    fi
    
    # Check for Python files
    if [ -f "setup.py" ] || [ -d "venv" ] || find . -maxdepth 1 -name "*.py" | grep -q .; then
        echo "Detected Python project, running pytest..."
        if command -v pytest >/dev/null 2>&1; then
            pytest
        else
            echo "pytest not found. Install with: pip install pytest"
        fi
        return 0
    fi
    
    # Check for Go files
    if [ -f "go.mod" ] || find . -maxdepth 1 -name "*.go" | grep -q .; then
        echo "Detected Go project, running go test..."
        if command -v go >/dev/null 2>&1; then
            go test ./...
        else
            echo "Go not found. Please install Go."
        fi
        return 0
    fi
    
    echo "No recognized project type detected."
}

# --------------------------------------------------
# Git Workflow Helpers
# --------------------------------------------------

# Create a feature branch
git_feature() {
    local feature_name=$1
    
    if [ -z "$feature_name" ]; then
        echo "Error: Missing feature name."
        echo "Usage: git_feature <feature-name>"
        return 1
    fi
    
    # Make sure we're in a git repository
    if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        echo "Error: Not a git repository."
        return 1
    fi
    
    local branch_name="feature/$feature_name"
    
    # Check if branch already exists
    if git show-ref --verify --quiet refs/heads/"$branch_name"; then
        echo "Branch $branch_name already exists."
        read -p "Do you want to switch to it? (y/n): " switch_branch
        if [[ "$switch_branch" =~ ^[Yy]$ ]]; then
            git checkout "$branch_name"
            echo "Switched to branch $branch_name"
        fi
        return 0
    fi
    
    # Get the default branch (usually main or master)
    local default_branch=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@')
    if [ -z "$default_branch" ]; then
        default_branch="main"
        if git show-ref --verify --quiet refs/heads/master; then
            default_branch="master"
        fi
    fi
    
    # Make sure we have the latest changes
    echo "Updating $default_branch branch..."
    git checkout "$default_branch"
    git pull origin "$default_branch"
    
    # Create and switch to the feature branch
    echo "Creating and switching to branch $branch_name..."
    git checkout -b "$branch_name"
    
    echo "Feature branch $branch_name created."
    echo "When you're done, use 'git push -u origin $branch_name' to push the branch."
}

# Create a hotfix branch
git_hotfix() {
    local hotfix_name=$1
    
    if [ -z "$hotfix_name" ]; then
        echo "Error: Missing hotfix name."
        echo "Usage: git_hotfix <hotfix-name>"
        return 1
    fi
    
    # Make sure we're in a git repository
    if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        echo "Error: Not a git repository."
        return 1
    fi
    
    local branch_name="hotfix/$hotfix_name"
    
    # Check if branch already exists
    if git show-ref --verify --quiet refs/heads/"$branch_name"; then
        echo "Branch $branch_name already exists."
        read -p "Do you want to switch to it? (y/n): " switch_branch
        if [[ "$switch_branch" =~ ^[Yy]$ ]]; then
            git checkout "$branch_name"
            echo "Switched to branch $branch_name"
        fi
        return 0
    fi
    
    # Get the production branch (usually main)
    local prod_branch=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@')
    if [ -z "$prod_branch" ]; then
        prod_branch="main"
        if git show-ref --verify --quiet refs/heads/master; then
            prod_branch="master"
        fi
    fi
    
    # Make sure we have the latest changes
    echo "Updating $prod_branch branch..."
    git checkout "$prod_branch"
    git pull origin "$prod_branch"
    
    # Create and switch to the hotfix branch
    echo "Creating and switching to branch $branch_name..."
    git checkout -b "$branch_name"
    
    echo "Hotfix branch $branch_name created."
    echo "When you're done, use 'git push -u origin $branch_name' to push the branch."
}

# Create a release branch
git_release() {
    local version=$1
    
    if [ -z "$version" ]; then
        echo "Error: Missing version number."
        echo "Usage: git_release <version>"
        return 1
    fi
    
    # Make sure we're in a git repository
    if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        echo "Error: Not a git repository."
        return 1
    fi
    
    local branch_name="release/$version"
    
    # Check if branch already exists
    if git show-ref --verify --quiet refs/heads/"$branch_name"; then
        echo "Branch $branch_name already exists."
        read -p "Do you want to switch to it? (y/n): " switch_branch
        if [[ "$switch_branch" =~ ^[Yy]$ ]]; then
            git checkout "$branch_name"
            echo "Switched to branch $branch_name"
        fi
        return 0
    fi
    
    # Get the development branch (usually develop or main)
    local dev_branch="develop"
    if ! git show-ref --verify --quiet refs/heads/develop; then
        dev_branch=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@')
        if [ -z "$dev_branch" ]; then
            dev_branch="main"
            if git show-ref --verify --quiet refs/heads/master; then
                dev_branch="master"
            fi
        fi
    fi
    
    # Make sure we have the latest changes
    echo "Updating $dev_branch branch..."
    git checkout "$dev_branch"
    git pull origin "$dev_branch"
    
    # Create and switch to the release branch
    echo "Creating and switching to branch $branch_name..."
    git checkout -b "$branch_name"
    
    echo "Release branch $branch_name created."
    echo "When you're done, use:"
    echo "1. 'git push -u origin $branch_name' to push the branch"
    echo "2. Create a pull request to merge into main/master"
    echo "3. After merging, tag the release with: git tag -a v$version -m 'Release $version'"
}

# Clean up local branches that have been merged
clean_branches() {
    # Make sure we're in a git repository
    if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        echo "Error: Not a git repository."
        return 1
    fi
    
    # Get the default branch (usually main or master)
    local default_branch=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@')
    if [ -z "$default_branch" ]; then
        default_branch="main"
        if git show-ref --verify --quiet refs/heads/master; then
            default_branch="master"
        fi
    fi
    
    # Make sure we're on the default branch
    git checkout "$default_branch"
    git pull origin "$default_branch"
    
    echo "Fetching latest changes and pruning remote branches..."
    git fetch -p
    
    echo "Listing merged branches that can be deleted:"
    merged_branches=$(git branch --merged | grep -v "\*" | grep -v "$default_branch" | grep -v "master" | grep -v "main" | grep -v "develop")
    
    if [ -z "$merged_branches" ]; then
        echo "No merged branches to delete."
        return 0
    fi
    
    echo "$merged_branches"
    read -p "Do you want to delete these branches? (y/n): " delete_branches
    
    if [[ "$delete_branches" =~ ^[Yy]$ ]]; then
        echo "$merged_branches" | xargs git branch -d
        echo "Branches deleted."
    else
        echo "No branches were deleted."
    fi
    
    echo "Checking for stale remote-tracking branches..."
    git remote prune origin --dry-run
    read -p "Do you want to remove these stale remote-tracking branches? (y/n): " prune_branches
    
    if [[ "$prune_branches" =~ ^[Yy]$ ]]; then
        git remote prune origin
        echo "Stale remote-tracking branches removed."
    else
        echo "No stale remote-tracking branches were removed."
    fi
}

# Create a pull request
create_pr() {
    # Make sure we're in a git repository
    if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        echo "Error: Not a git repository."
        return 1
    fi
    
    # Get current branch
    local current_branch=$(git rev-parse --abbrev-ref HEAD)
    
    # Get the default branch (usually main or master)
    local default_branch=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@')
    if [ -z "$default_branch" ]; then
        default_branch="main"
        if git show-ref --verify --quiet refs/heads/master; then
            default_branch="master"
        fi
    fi
    
    # Check if we're already on the default branch
    if [ "$current_branch" == "$default_branch" ]; then
        echo "Error: You are already on the $default_branch branch."
        echo "Please switch to a feature, hotfix, or release branch to create a PR."
        return 1
    fi
    
    # Make sure the branch is pushed to remote
    if ! git ls-remote --exit-code --heads origin "$current_branch" > /dev/null; then
        echo "Branch $current_branch is not pushed to remote yet."
        read -p "Do you want to push it now? (y/n): " push_branch
        
        if [[ "$push_branch" =~ ^[Yy]$ ]]; then
            git push -u origin "$current_branch"
        else
            echo "Cannot create PR without pushing the branch."
            return 1
        fi
    fi
    
    # Determine which tool to use based on remote URL
    local remote_url=$(git remote get-url origin)
    
    if [[ "$remote_url" == *"github.com"* ]]; then
        echo "Creating GitHub PR from $current_branch to $default_branch..."
        local title="$current_branch"
        read -p "PR Title [$title]: " user_title
        if [ -n "$user_title" ]; then
            title="$user_title"
        fi
        
        read -p "PR Description: " description
        $GH_CLI_PATH pr create --base "$default_branch" --head "$current_branch" --title "$title" --body "$description"
    elif [[ "$remote_url" == *"gitlab.com"* ]]; then
        echo "Creating GitLab MR from $current_branch to $default_branch..."
        local title="$current_branch"
        read -p "MR Title [$title]: " user_title
        if [ -n "$user_title" ]; then
            title="$user_title"
        fi
        
        read -p "MR Description: " description
        $GLAB_CLI_PATH mr create --target-branch "$default_branch" --source-branch "$current_branch" --title "$title" --description "$description"
    else
        echo "Remote URL not recognized as GitHub or GitLab."
        echo "Remote URL: $remote_url"
        return 1
    fi
}

# Git workflow automation - save work in progress
git_save() {
    local message=$1
    
    # Make sure we're in a git repository
    if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        echo "Error: Not a git repository."
        return 1
    fi
    
    if [ -z "$message" ]; then
        message="WIP: Work in progress $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    # Check if there are any changes
    if git diff-index --quiet HEAD --; then
        echo "No changes to save."
        return 0
    fi
    
    # Stage all changes
    git add --all
    
    # Commit changes
    git commit -m "$message"
    
    echo "Changes saved with message: $message"
}

# --------------------------------------------------
# Tool installation and configuration management
# --------------------------------------------------

# Install portable development tools
install_dev_tool() {
    local tool=$1
    local version=$2
    
    if [ -z "$tool" ]; then
        echo "Error: Missing tool name."
        echo "Available tools: node, python, go"
        return 1
    fi
    
    mkdir -p "$TOOLS_PATH/dev"
    
    case "$tool" in
        node)
            if [ -z "$version" ]; then
                version="16.13.0"
            fi
            
            local NODE_DIR="$TOOLS_PATH/dev/node-v$version"
            
            if [ -d "$NODE_DIR" ]; then
                echo "Node.js v$version is already installed at $NODE_DIR"
                return 0
            fi
            
            echo "Installing Node.js v$version..."
            
            local OS="linux"
            local ARCH="x64"
            
            if [[ "$(uname -m)" == "aarch64" ]]; then
                ARCH="arm64"
            fi
            
            local TMP_DIR="$(mktemp -d)"
            local DOWNLOAD_URL="https://nodejs.org/dist/v$version/node-v$version-$OS-$ARCH.tar.gz"
            
            echo "Downloading from $DOWNLOAD_URL..."
            curl -L "$DOWNLOAD_URL" -o "$TMP_DIR/node.tar.gz"
            
            mkdir -p "$NODE_DIR"
            tar -xzf "$TMP_DIR/node.tar.gz" -C "$TMP_DIR"
            cp -r "$TMP_DIR/node-v$version-$OS-$ARCH"/* "$NODE_DIR/"
            rm -rf "$TMP_DIR"
            
            echo "Creating wrapper scripts..."
            mkdir -p "$WORKSPACE_PATH/scripts/wrappers"
            
            cat > "$WORKSPACE_PATH/scripts/wrappers/node" << EOF
#!/bin/bash
$NODE_DIR/bin/node "\$@"
EOF
            
            cat > "$WORKSPACE_PATH/scripts/wrappers/npm" << EOF
#!/bin/bash
$NODE_DIR/bin/npm "\$@"
EOF
            
            cat > "$WORKSPACE_PATH/scripts/wrappers/npx" << EOF
#!/bin/bash
$NODE_DIR/bin/npx "\$@"
EOF
            
            chmod +x "$WORKSPACE_PATH/scripts/wrappers/node"
            chmod +x "$WORKSPACE_PATH/scripts/wrappers/npm"
            chmod +x "$WORKSPACE_PATH/scripts/wrappers/npx"
            
            echo "Node.js v$version installed successfully."
            echo "You can use it by calling:"
            echo "  $WORKSPACE_PATH/scripts/wrappers/node"
            echo "  $WORKSPACE_PATH/scripts/wrappers/npm"
            echo "  $WORKSPACE_PATH/scripts/wrappers/npx"
            ;;
            
        python)
            if [ -z "$version" ]; then
                version="3.9.7"
            fi
            
            local PYTHON_DIR="$TOOLS_PATH/dev/python-$version"
            
            if [ -d "$PYTHON_DIR" ]; then
                echo "Python $version is already installed at $PYTHON_DIR"
                return 0
            fi
            
            echo "Installing Python $version..."
            
            local OS="linux"
            local ARCH="x86_64"
            
            if [[ "$(uname -m)" == "aarch64" ]]; then
                ARCH="aarch64"
            fi
            
            local TMP_DIR="$(mktemp -d)"
            local DOWNLOAD_URL="https://www.python.org/ftp/python/$version/Python-$version.tar.xz"
            
            echo "This will build Python from source. It might take some time..."
            echo "Downloading from $DOWNLOAD_URL..."
            curl -L "$DOWNLOAD_URL" -o "$TMP_DIR/python.tar.xz"
            
            mkdir -p "$PYTHON_DIR"
            tar -xJf "$TMP_DIR/python.tar.xz" -C "$TMP_DIR"
            
            cd "$TMP_DIR/Python-$version" || return 1
            
            echo "Configuring Python..."
            ./configure --prefix="$PYTHON_DIR" --enable-optimizations
            
            echo "Building Python (this might take a while)..."
            make -j$(nproc)
            make install
            
            rm -rf "$TMP_DIR"
            
            echo "Creating wrapper scripts..."
            mkdir -p "$WORKSPACE_PATH/scripts/wrappers"
            
            cat > "$WORKSPACE_PATH/scripts/wrappers/python3" << EOF
#!/bin/bash
$PYTHON_DIR/bin/python3 "\$@"
EOF
            
            cat > "$WORKSPACE_PATH/scripts/wrappers/pip3" << EOF
#!/bin/bash
$PYTHON_DIR/bin/pip3 "\$@"
EOF
            
            chmod +x "$WORKSPACE_PATH/scripts/wrappers/python3"
            chmod +x "$WORKSPACE_PATH/scripts/wrappers/pip3"
            
            echo "Installing basic packages..."
            "$PYTHON_DIR/bin/pip3" install pytest flake8 black ipython
            
            echo "Python $version installed successfully."
            echo "You can use it by calling:"
            echo "  $WORKSPACE_PATH/scripts/wrappers/python3"
            echo "  $WORKSPACE_PATH/scripts/wrappers/pip3"
            ;;
            
        go)
            if [ -z "$version" ]; then
                version="1.17.3"
            fi
            
            local GO_DIR="$TOOLS_PATH/dev/go-$version"
            
            if [ -d "$GO_DIR" ]; then
                echo "Go $version is already installed at $GO_DIR"
                return 0
            fi
            
            echo "Installing Go $version..."
            
            local OS="linux"
            local ARCH="amd64"
            
            if [[ "$(uname -m)" == "aarch64" ]]; then
                ARCH="arm64"
            fi
            
            local TMP_DIR="$(mktemp -d)"
            local DOWNLOAD_URL="https://golang.org/dl/go$version.$OS-$ARCH.tar.gz"
            
            echo "Downloading from $DOWNLOAD_URL..."
            curl -L "$DOWNLOAD_URL" -o "$TMP_DIR/go.tar.gz"
            
            mkdir -p "$GO_DIR"
            tar -xzf "$TMP_DIR/go.tar.gz" -C "$TMP_DIR"
            cp -r "$TMP_DIR/go"/* "$GO_DIR/"
            rm -rf "$TMP_DIR"
            
            echo "Creating wrapper scripts..."
            mkdir -p "$WORKSPACE_PATH/scripts/wrappers"
            
            cat > "$WORKSPACE_PATH/scripts/wrappers/go" << EOF
#!/bin/bash
export GOROOT="$GO_DIR"
export GOPATH="$TOOLS_PATH/dev/gopath"
export PATH="\$GOROOT/bin:\$GOPATH/bin:\$PATH"
"$GO_DIR/bin/go" "\$@"
EOF
            
            chmod +x "$WORKSPACE_PATH/scripts/wrappers/go"
            
            # Create GOPATH directory
            mkdir -p "$TOOLS_PATH/dev/gopath/bin"
            mkdir -p "$TOOLS_PATH/dev/gopath/src"
            mkdir -p "$TOOLS_PATH/dev/gopath/pkg"
            
            echo "Go $version installed successfully."
            echo "You can use it by calling:"
            echo "  $WORKSPACE_PATH/scripts/wrappers/go"
            ;;
            
        *)
            echo "Unknown tool: $tool"
            echo "Available tools: node, python, go"
            return 1
            ;;
    esac
}

# Check if a development tool is installed
check_tool_installed() {
    local tool=$1
    
    case "$tool" in
        node)
            if ls "$TOOLS_PATH/dev/node-"* 1> /dev/null 2>&1; then
                return 0
            fi
            ;;
        python)
            if ls "$TOOLS_PATH/dev/python-"* 1> /dev/null 2>&1; then
                return 0
            fi
            ;;
        go)
            if ls "$TOOLS_PATH/dev/go-"* 1> /dev/null 2>&1; then
                return 0
            fi
            ;;
        *)
            return 1
            ;;
    esac
    
    return 1
}

# --------------------------------------------------
# Usage Information
# --------------------------------------------------

show_usage() {
    echo "Development Tools Script"
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Project Commands:"
    echo "  init-templates                 - Initialize project templates"
    echo "  create-project <template> <project-name> [dest-dir]"
    echo "                                 - Create a new project from a template"
    echo "  list-templates                 - List available project templates"
    echo ""
    echo "Development Tasks:"
    echo "  lint [project-dir]             - Run linting on a project"
    echo "  test [project-dir]             - Run tests on a project"
    echo ""
    echo "Git Workflow:"
    echo "  git-feature <feature-name>     - Create a feature branch"
    echo "  git-hotfix <hotfix-name>       - Create a hotfix branch"
    echo "  git-release <version>          - Create a release branch"
    echo "  clean-branches                 - Clean up merged branches"
    echo "  create-pr                      - Create a pull request"
    echo "  git-save [message]             - Save work in progress"
    echo ""
    echo "Tool Management:"
    echo "  install-tool <tool> [version]  - Install a development tool"
    echo "                                  Tools: node, python, go"
    echo "  list-tools                     - List installed tools"
    echo ""
    echo "Examples:"
    echo "  $0 create-project node-js my-app"
    echo "  $0 git-feature user-authentication"
    echo "  $0 install-tool node 16.13.0"
    echo ""
}

# List installed tools
list_tools() {
    echo "Installed Development Tools:"
    
    echo "Node.js versions:"
    if ls "$TOOLS_PATH/dev/node-"* 1> /dev/null 2>&1; then
        for dir in "$TOOLS_PATH/dev/node-"*; do
            version=$(basename "$dir" | sed 's/node-v//')
            echo "  - v$version"
        done
    else
        echo "  None installed"
    fi
    
    echo "Python versions:"
    if ls "$TOOLS_PATH/dev/python-"* 1> /dev/null 2>&1; then
        for dir in "$TOOLS_PATH/dev/python-"*; do
            version=$(basename "$dir" | sed 's/python-//')
            echo "  - v$version"
        done
    else
        echo "  None installed"
    fi
    
    echo "Go versions:"
    if ls "$TOOLS_PATH/dev/go-"* 1> /dev/null 2>&1; then
        for dir in "$TOOLS_PATH/dev/go-"*; do
            version=$(basename "$dir" | sed 's/go-//')
            echo "  - v$version"
        done
    else
        echo "  None installed"
    fi
}

# List available templates
list_templates() {
    echo "Available project templates:"
    
    if ls "$TEMPLATES_PATH/project-templates/"* 1> /dev/null 2>&1; then
        for dir in "$TEMPLATES_PATH/project-templates/"*/; do
            template=$(basename "$dir")
            echo "  - $template"
        done
    else
        echo "  No templates found. Run 'init-templates' first."
    fi
}

# --------------------------------------------------
# Main Execution
# --------------------------------------------------

# Check if a command was provided
if [ $# -eq 0 ]; then
    show_usage
    exit 1
fi

# Process commands
command=$1
shift

case "$command" in
    init-templates)
        init_templates
        ;;
    create-project)
        if [ $# -lt 2 ]; then
            echo "Error: Missing template or project name."
            echo "Usage: $0 create-project <template> <project-name> [dest-dir]"
            exit 1
        fi
        template=$1
        project_name=$2
        dest_dir=$3
        create_project "$template" "$project_name" "$dest_dir"
        ;;
    list-templates)
        list_templates
        ;;
    lint)
        project_dir=$1
        lint_project "$project_dir"
        ;;
    test)
        project_dir=$1
        test_project "$project_dir"
        ;;
    git-feature)
        if [ $# -lt 1 ]; then
            echo "Error: Missing feature name."
            echo "Usage: $0 git-feature <feature-name>"
            exit 1
        fi
        git_feature "$1"
        ;;
    git-hotfix)
        if [ $# -lt 1 ]; then
            echo "Error: Missing hotfix name."
            echo "Usage: $0 git-hotfix <hotfix-name>"
            exit 1
        fi
        git_hotfix "$1"
        ;;
    git-release)
        if [ $# -lt 1 ]; then
            echo "Error: Missing version number."
            echo "Usage: $0 git-release <version>"
            exit 1
        fi
        git_release "$1"
        ;;
    clean-branches)
        clean_branches
        ;;
    create-pr)
        create_pr
        ;;
    git-save)
        message=$1
        git_save "$message"
        ;;
    install-tool)
        if [ $# -lt 1 ]; then
            echo "Error: Missing tool name."
            echo "Usage: $0 install-tool <tool> [version]"
            echo "Available tools: node, python, go"
            exit 1
        fi
        tool=$1
        version=$2
        install_dev_tool "$tool" "$version"
        ;;
    list-tools)
        list_tools
        ;;
    *)
        echo "Unknown command: $command"
        show_usage
        exit 1
        ;;
esac

exit 0
