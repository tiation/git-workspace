#!/bin/bash
# ============================================================================
# Git Repository Manager Script
# ============================================================================
# Author: raf astor
# Email: t115th3on31k@gmail.com
# Description: This script helps manage repositories across different Git
#              instances (private GitLab, gitlab.com, GitHub)
# ============================================================================

set -e

WORKSPACE_DIR="$(cd "$(dirname "$0")/../../" && pwd)"
PRIVATE_GITLAB_HOST="145.223.22.14"

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

# Clone repository
clone_repo() {
    local git_host="$1"
    local repo_url="$2"
    local target_dir=""
    
    case "$git_host" in
        "gitlab-private")
            # Extract project path from URL
            if [[ "$repo_url" =~ ^(https?://)?${PRIVATE_GITLAB_HOST}/(.+)(\.git)?$ ]]; then
                project_path="${BASH_REMATCH[2]}"
                target_dir="${WORKSPACE_DIR}/gitlab-private/projects/${project_path}"
                repo_url="git@gitlab-private:${project_path}.git"
            else
                print_error "Invalid private GitLab repository URL"
                return 1
            fi
            ;;
        "gitlab-com")
            # Extract project path from URL
            if [[ "$repo_url" =~ ^(https?://)?gitlab\.com/(.+)(\.git)?$ ]]; then
                project_path="${BASH_REMATCH[2]}"
                target_dir="${WORKSPACE_DIR}/gitlab-com/projects/${project_path}"
                repo_url="git@gitlab.com:${project_path}.git"
            else
                print_error "Invalid GitLab.com repository URL"
                return 1
            fi
            ;;
        "github")
            # Extract project path from URL
            if [[ "$repo_url" =~ ^(https?://)?github\.com/(.+)(\.git)?$ ]]; then
                project_path="${BASH_REMATCH[2]}"
                target_dir="${WORKSPACE_DIR}/github/projects/${project_path}"
                repo_url="git@github.com:${project_path}.git"
            else
                print_error "Invalid GitHub repository URL"
                return 1
            fi
            ;;
        *)
            print_error "Invalid Git host: $git_host"
            print_warning "Supported hosts: gitlab-private, gitlab-com, github"
            return 1
            ;;
    esac
    
    # Create parent directory if it doesn't exist
    mkdir -p "$(dirname "$target_dir")"
    
    # Clone the repository
    print_header "Cloning repository"
    echo "Source: $repo_url"
    echo "Target: $target_dir"
    
    if [ -d "$target_dir" ]; then
        print_warning "Directory already exists: $target_dir"
        read -p "Overwrite? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_warning "Clone aborted"
            return 1
        fi
        rm -rf "$target_dir"
    fi
    
    git clone "$repo_url" "$target_dir"
    
    if [ $? -eq 0 ]; then
        print_success "Repository cloned successfully"
        echo "You can access it at: $target_dir"
    else
        print_error "Failed to clone repository"
    fi
}

# Create new repository
create_repo() {
    local git_host="$1"
    local repo_name="$2"
    local target_dir=""
    
    case "$git_host" in
        "gitlab-private")
            target_dir="${WORKSPACE_DIR}/gitlab-private/projects/${repo_name}"
            ;;
        "gitlab-com")
            target_dir="${WORKSPACE_DIR}/gitlab-com/projects/${repo_name}"
            ;;
        "github")
            target_dir="${WORKSPACE_DIR}/github/projects/${repo_name}"
            ;;
        *)
            print_error "Invalid Git host: $git_host"
            print_warning "Supported hosts: gitlab-private, gitlab-com, github"
            return 1
            ;;
    esac
    
    # Create parent directory if it doesn't exist
    mkdir -p "$(dirname "$target_dir")"
    
    # Check if directory already exists
    if [ -d "$target_dir" ]; then
        print_warning "Directory already exists: $target_dir"
        read -p "Overwrite? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_warning "Creation aborted"
            return 1
        fi
        rm -rf "$target_dir"
    fi
    
    # Create the local repository
    print_header "Creating repository"
    mkdir -p "$target_dir"
    cd "$target_dir"
    git init
    
    # Create basic structure and README
    echo "# $repo_name" > README.md
    mkdir -p src docs
    
    # Create .gitignore file
    cat > .gitignore << EOF
# OS-specific files
.DS_Store
Thumbs.db
.directory

# Editor files
.idea/
.vscode/
*.swp
*~

# Build directories
build/
dist/
target/
out/
bin/

# Dependency directories
node_modules/
vendor/
EOF
    
    # Add and commit
    git add .
    git commit -m "Initial commit"
    
    print_success "Local repository created at: $target_dir"
    print_warning "Remember to push this repository to your remote Git host"
    
    case "$git_host" in
        "gitlab-private")
            print_header "Instructions for private GitLab"
            echo "1. Create a new project at http://${PRIVATE_GITLAB_HOST}/projects/new"
            echo "2. Follow the instructions to push an existing repository"
            echo "   Example commands:"
            echo "     git remote add origin git@gitlab-private:${repo_name}.git"
            echo "     git push -u origin main"
            ;;
        "gitlab-com")
            print_header "Instructions for GitLab.com"
            echo "1. Create a new project at https://gitlab.com/projects/new"
            echo "2. Follow the instructions to push an existing repository"
            echo "   Example commands:"
            echo "     git remote add origin git@gitlab.com:${repo_name}.git"
            echo "     git push -u origin main"
            ;;
        "github")
            print_header "Instructions for GitHub"
            echo "1. Create a new repository at https://github.com/new"
            echo "2. Follow the instructions to push an existing repository"
            echo "   Example commands:"
            echo "     git remote add origin git@github.com:${repo_name}.git"
            echo "     git push -u origin main"
            ;;
    esac
}

# List repositories
list_repos() {
    local git_host="$1"
    local target_dir=""
    
    case "$git_host" in
        "all")
            print_header "Listing all repositories"
            echo "GitLab Private repositories:"
            find "${WORKSPACE_DIR}/gitlab-private/projects" -type d -name ".git" 2>/dev/null | sed -e 's/\/\.git$//' | sort
            echo
            echo "GitLab.com repositories:"
            find "${WORKSPACE_DIR}/gitlab-com/projects" -type d -name ".git" 2>/dev/null | sed -e 's/\/\.git$//' | sort
            echo
            echo "GitHub repositories:"
            find "${WORKSPACE_DIR}/github/projects" -type d -name ".git" 2>/dev/null | sed -e 's/\/\.git$//' | sort
            ;;
        "gitlab-private")
            print_header "Listing private GitLab repositories"
            find "${WORKSPACE_DIR}/gitlab-private/projects" -type d -name ".git" 2>/dev/null | sed -e 's/\/\.git$//' | sort
            ;;
        "gitlab-com")
            print_header "Listing GitLab.com repositories"
            find "${WORKSPACE_DIR}/gitlab-com/projects" -type d -name ".git" 2>/dev/null | sed -e 's/\/\.git$//' | sort
            ;;
        "github")
            print_header "Listing GitHub repositories"
            find "${WORKSPACE_DIR}/github/projects" -type d -name ".git" 2>/dev/null | sed -e 's/\/\.git$//' | sort
            ;;
        *)
            print_error "Invalid Git host: $git_host"
            print_warning "Supported hosts: all, gitlab-private, gitlab-com, github"
            return 1
            ;;
    esac
}

# Display help message
show_help() {
    cat << EOF
Usage: $(basename "$0") COMMAND [OPTIONS]

Repository Management Commands:
  clone HOST REPO_URL        Clone a repository from the specified host
  create HOST REPO_NAME      Create a new local repository
  list [HOST]                List repositories (default: all)
  
Supported HOSTs:
  gitlab-private             Private GitLab instance (${PRIVATE_GITLAB_HOST})
  gitlab-com                 GitLab.com
  github                     GitHub.com
  all                        All hosts (only valid for 'list' command)

Examples:
  $(basename "$0") clone gitlab-com user/my-project
  $(basename "$0") create gitlab-private my-new-project
  $(basename "$0") list gitlab-com
  $(basename "$0") list all
  
For REPO_URL, you can use either:
  - Full URL: https://gitlab.com/user/project.git
  - Short form: user/project
EOF
}

# Check if repository URL is in short form and convert to full URL
normalize_repo_url() {
    local git_host="$1"
    local repo_url="$2"
    
    # Check if URL is in short form (user/project)
    if [[ "$repo_url" =~ ^[^/]+/[^/]+$ ]]; then
        case "$git_host" in
            "gitlab-private")
                repo_url="http://${PRIVATE_GITLAB_HOST}/${repo_url}"
                ;;
            "gitlab-com")
                repo_url="https://gitlab.com/${repo_url}"
                ;;
            "github")
                repo_url="https://github.com/${repo_url}"
                ;;
        esac
    fi
    
    echo "$repo_url"
}

# Main script execution
main() {
    if [ $# -lt 1 ]; then
        show_help
        exit 1
    fi
    
    local command="$1"
    shift
    
    case "$command" in
        "clone")
            if [ $# -lt 2 ]; then
                print_error "Missing arguments"
                echo "Usage: $(basename "$0") clone HOST REPO_URL"
                exit 1
            fi
            local git_host="$1"
            local repo_url="$(normalize_repo_url "$git_host" "$2")"
            clone_repo "$git_host" "$repo_url"
            ;;
        "create")
            if [ $# -lt 2 ]; then
                print_error "Missing arguments"
                echo "Usage: $(basename "$0") create HOST REPO_NAME"
                exit 1
            fi
            create_repo "$1" "$2"
            ;;
        "list")
            local git_host="all"
            if [ $# -ge 1 ]; then
                git_host="$1"
            fi
            list_repos "$git_host"
            ;;
        "help"|"--help"|"-h")
            show_help
            ;;
        *)
            print_error "Unknown command: $command"
            show_help
            exit 1
            ;;
    esac
}

# Run the main function
main "$@"
