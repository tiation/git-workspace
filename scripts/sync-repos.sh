#!/bin/bash

# Repository sync and management script for portable Git environment
# This script handles syncing, mirroring, and batch operations on repos

# Load environment
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_PATH="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_PATH="$WORKSPACE_PATH/env"

if [ ! -f "$ENV_PATH/.env" ]; then
    echo "Error: .env file not found. Please run setup.sh first."
    exit 1
fi

source "$ENV_PATH/.env"

# Check if required variables are set
check_env() {
    local missing_vars=()
    
    if [ -z "$GITHUB_USERNAME" ] || [ "$GITHUB_USERNAME" == "your_github_username" ]; then
        missing_vars+=("GITHUB_USERNAME")
    fi
    
    if [ -z "$GITHUB_TOKEN" ] || [ "$GITHUB_TOKEN" == "your_github_token" ]; then
        missing_vars+=("GITHUB_TOKEN")
    fi
    
    if [ -z "$GITLAB_USERNAME" ] || [ "$GITLAB_USERNAME" == "your_gitlab_username" ]; then
        missing_vars+=("GITLAB_USERNAME")
    fi
    
    if [ -z "$GITLAB_TOKEN" ] || [ "$GITLAB_TOKEN" == "your_gitlab_token" ]; then
        missing_vars+=("GITLAB_TOKEN")
    fi
    
    if [ ${#missing_vars[@]} -gt 0 ]; then
        echo "Warning: The following variables need to be set in $ENV_PATH/.env:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        echo "Some functionality may be limited."
    fi
}

# Ensure CLI tools exist
check_tools() {
    local has_error=false
    
    if [ ! -f "$GH_CLI_PATH" ]; then
        echo "Warning: GitHub CLI not found at $GH_CLI_PATH"
        has_error=true
    fi
    
    if [ ! -f "$GLAB_CLI_PATH" ]; then
        echo "Warning: GitLab CLI not found at $GLAB_CLI_PATH"
        has_error=true
    fi
    
    if [ "$has_error" = true ]; then
        echo "Some functionality may be limited. Consider running setup-cli.sh first."
    fi
}

# Function to handle GitHub repositories
github_sync() {
    local operation=$1
    local repos=$2
    
    echo "===== GitHub Repository Operations ====="
    
    IFS=',' read -ra REPO_ARRAY <<< "$repos"
    for repo in "${REPO_ARRAY[@]}"; do
        repo=$(echo "$repo" | xargs) # Trim whitespace
        if [ -z "$repo" ]; then continue; fi
        
        repo_path="$GITHUB_REPOS_PATH/$repo"
        
        case "$operation" in
            clone)
                if [ -d "$repo_path" ]; then
                    echo "Repository $repo already exists. Skipping clone."
                else
                    echo "Cloning GitHub repository: $repo"
                    
                    if [ -x "$GH_CLI_PATH" ]; then
                        "$GH_CLI_PATH" repo clone "$GITHUB_USERNAME/$repo" "$repo_path"
                    else
                        # Fallback to git if gh CLI is not available
                        git clone "https://github.com/$GITHUB_USERNAME/$repo.git" "$repo_path"
                    fi
                fi
                ;;
            update)
                if [ -d "$repo_path" ]; then
                    echo "Updating GitHub repository: $repo"
                    (cd "$repo_path" && git pull origin "$(git rev-parse --abbrev-ref HEAD)")
                else
                    echo "Repository $repo doesn't exist. Clone it first."
                fi
                ;;
            status)
                if [ -d "$repo_path" ]; then
                    echo "Status for GitHub repository: $repo"
                    (cd "$repo_path" && git status -s)
                else
                    echo "Repository $repo doesn't exist. Clone it first."
                fi
                ;;
            *)
                echo "Unknown operation: $operation"
                ;;
        esac
    done
}

# Function to handle GitLab repositories
gitlab_sync() {
    local operation=$1
    local repos=$2
    
    echo "===== GitLab Repository Operations ====="
    
    IFS=',' read -ra REPO_ARRAY <<< "$repos"
    for repo in "${REPO_ARRAY[@]}"; do
        repo=$(echo "$repo" | xargs) # Trim whitespace
        if [ -z "$repo" ]; then continue; fi
        
        repo_path="$GITLAB_REPOS_PATH/$repo"
        
        case "$operation" in
            clone)
                if [ -d "$repo_path" ]; then
                    echo "Repository $repo already exists. Skipping clone."
                else
                    echo "Cloning GitLab repository: $repo"
                    
                    if [ -x "$GLAB_CLI_PATH" ]; then
                        "$GLAB_CLI_PATH" repo clone "$GITLAB_USERNAME/$repo" "$repo_path"
                    else
                        # Fallback to git if glab CLI is not available
                        git clone "https://gitlab.com/$GITLAB_USERNAME/$repo.git" "$repo_path"
                    fi
                fi
                ;;
            update)
                if [ -d "$repo_path" ]; then
                    echo "Updating GitLab repository: $repo"
                    (cd "$repo_path" && git pull origin "$(git rev-parse --abbrev-ref HEAD)")
                else
                    echo "Repository $repo doesn't exist. Clone it first."
                fi
                ;;
            status)
                if [ -d "$repo_path" ]; then
                    echo "Status for GitLab repository: $repo"
                    (cd "$repo_path" && git status -s)
                else
                    echo "Repository $repo doesn't exist. Clone it first."
                fi
                ;;
            *)
                echo "Unknown operation: $operation"
                ;;
        esac
    done
}

# Function to set up mirroring between GitHub and GitLab
setup_mirror() {
    local source_type=$1
    local source_repo=$2
    local target_type=$3
    local target_repo=$4
    
    if [ -z "$source_repo" ] || [ -z "$target_repo" ]; then
        echo "Error: Source and target repository names are required."
        return 1
    fi
    
    echo "Setting up mirroring from $source_type/$source_repo to $target_type/$target_repo"
    
    # Determine source and target paths and URLs
    local source_path=""
    local target_path=""
    local source_url=""
    local target_url=""
    
    if [ "$source_type" == "github" ]; then
        source_path="$GITHUB_REPOS_PATH/$source_repo"
        source_url="https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/$source_repo.git"
    elif [ "$source_type" == "gitlab" ]; then
        source_path="$GITLAB_REPOS_PATH/$source_repo"
        source_url="https://$GITLAB_USERNAME:$GITLAB_TOKEN@gitlab.com/$GITLAB_USERNAME/$source_repo.git"
    else
        echo "Invalid source type: $source_type"
        return 1
    fi
    
    if [ "$target_type" == "github" ]; then
        target_path="$GITHUB_REPOS_PATH/$target_repo"
        target_url="https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/$target_repo.git"
    elif [ "$target_type" == "gitlab" ]; then
        target_path="$GITLAB_REPOS_PATH/$target_repo"
        target_url="https://$GITLAB_USERNAME:$GITLAB_TOKEN@gitlab.com/$GITLAB_USERNAME/$target_repo.git"
    else
        echo "Invalid target type: $target_type"
        return 1
    fi
    
    # Check if source repository exists
    if [ ! -d "$source_path" ]; then
        echo "Source repository doesn't exist: $source_path"
        return 1
    fi
    
    # Make sure we have the target repository
    if [ ! -d "$target_path" ]; then
        echo "Target repository doesn't exist. Creating it first..."
        if [ "$target_type" == "github" ]; then
            # Create repository on GitHub
            if [ -x "$GH_CLI_PATH" ]; then
                "$GH_CLI_PATH" repo create "$target_repo" --public
                # Clone it
                "$GH_CLI_PATH" repo clone "$GITHUB_USERNAME/$target_repo" "$target_path"
            else
                echo "GitHub CLI not available. Cannot create repository automatically."
                return 1
            fi
        elif [ "$target_type" == "gitlab" ]; then
            # Create repository on GitLab
            if [ -x "$GLAB_CLI_PATH" ]; then
                "$GLAB_CLI_PATH" repo create "$target_repo" --public
                # Clone it
                "$GLAB_CLI_PATH" repo clone "$GITLAB_USERNAME/$target_repo" "$target_path"
            else
                echo "GitLab CLI not available. Cannot create repository automatically."
                return 1
            fi
        fi
    fi
    
    # Set up mirroring
    echo "Configuring mirroring..."
    (
        cd "$source_path" || exit 1
        
        # Add target as a remote
        if git remote | grep -q "mirror-target"; then
            git remote set-url mirror-target "$target_url"
        else
            git remote add mirror-target "$target_url"
        fi
        
        # Create a post-commit hook for automatic mirroring
        mkdir -p .git/hooks
        
        cat > .git/hooks/post-commit << EOF
#!/bin/bash
# Auto-mirror hook
echo "Auto-mirroring changes to $target_type/$target_repo..."
git push mirror-target --all
git push mirror-target --tags
EOF
        
        chmod +x .git/hooks/post-commit
        
        # Do an initial push to mirror
        echo "Performing initial mirror push..."
        git push mirror-target --all
        git push mirror-target --tags
    )
    
    echo "Mirroring setup complete!"
    echo "Changes will be automatically mirrored when committing to $source_type/$source_repo."
}

# Function to perform batch operations on all repos
batch_operation() {
    local operation=$1
    local command=$2
    
    if [ "$operation" == "github" ] || [ "$operation" == "all" ]; then
        echo "===== Batch Operation on GitHub Repositories ====="
        for repo_dir in "$GITHUB_REPOS_PATH"/*; do
            if [ -d "$repo_dir" ]; then
                repo_name=$(basename "$repo_dir")
                echo "Running command in $repo_name..."
                (cd "$repo_dir" && eval "$command")
                echo "Done."
            fi
        done
    fi
    
    if [ "$operation" == "gitlab" ] || [ "$operation" == "all" ]; then
        echo "===== Batch Operation on GitLab Repositories ====="
        for repo_dir in "$GITLAB_REPOS_PATH"/*; do
            if [ -d "$repo_dir" ]; then
                repo_name=$(basename "$repo_dir")
                echo "Running command in $repo_name..."
                (cd "$repo_dir" && eval "$command")
                echo "Done."
            fi
        done
    fi
}

# Function to check status of all repositories
check_all_repos_status() {
    echo "===== GitHub Repositories Status ====="
    if [ -d "$GITHUB_REPOS_PATH" ]; then
        has_repos=false
        for repo_dir in "$GITHUB_REPOS_PATH"/*; do
            if [ -d "$repo_dir" ] && [ -d "$repo_dir/.git" ]; then
                has_repos=true
                repo_name=$(basename "$repo_dir")
                echo "Status for $repo_name:"
                (
                    cd "$repo_dir" || exit 1
                    git status -s
                    # Check for unpushed commits
                    local_branch=$(git rev-parse --abbrev-ref HEAD)
                    if git ls-remote --exit-code origin "$local_branch" &>/dev/null; then
                        local_commit=$(git rev-parse HEAD)
                        remote_commit=$(git rev-parse origin/$local_branch 2>/dev/null || echo "no-remote")
                        
                        if [ "$local_commit" != "$remote_commit" ]; then
                            echo "  ⚠️  Has unpushed changes!"
                        fi
                    else
                        echo "  ⚠️  Branch not pushed to remote yet!"
                    fi
                )
                echo ""
            fi
        done
        
        if [ "$has_repos" = false ]; then
            echo "  No GitHub repositories found."
        fi
    else
        echo "  GitHub repositories directory not found."
    fi
    
    echo "===== GitLab Repositories Status ====="
    if [ -d "$GITLAB_REPOS_PATH" ]; then
        has_repos=false
        for repo_dir in "$GITLAB_REPOS_PATH"/*; do
            if [ -d "$repo_dir" ] && [ -d "$repo_dir/.git" ]; then
                has_repos=true
                repo_name=$(basename "$repo_dir")
                echo "Status for $repo_name:"
                (
                    cd "$repo_dir" || exit 1
                    git status -s
                    # Check for unpushed commits
                    local_branch=$(git rev-parse --abbrev-ref HEAD)
                    if git ls-remote --exit-code origin "$local_branch" &>/dev/null; then
                        local_commit=$(git rev-parse HEAD)
                        remote_commit=$(git rev-parse origin/$local_branch 2>/dev/null || echo "no-remote")
                        
                        if [ "$local_commit" != "$remote_commit" ]; then
                            echo "  ⚠️  Has unpushed changes!"
                        fi
                    else
                        echo "  ⚠️  Branch not pushed to remote yet!"
                    fi
                )
                echo ""
            fi
        done
        
        if [ "$has_repos" = false ]; then
            echo "  No GitLab repositories found."
        fi
    else
        echo "  GitLab repositories directory not found."
    fi
}

# Function to clone all repositories listed in the environment
clone_all_repos() {
    if [ -n "$SYNC_GITHUB_REPOS" ]; then
        github_sync "clone" "$SYNC_GITHUB_REPOS"
    else
        echo "No GitHub repositories configured in .env (SYNC_GITHUB_REPOS)."
    fi
    
    if [ -n "$SYNC_GITLAB_REPOS" ]; then
        gitlab_sync "clone" "$SYNC_GITLAB_REPOS"
    else
        echo "No GitLab repositories configured in .env (SYNC_GITLAB_REPOS)."
    fi
}

# Function to update all repositories
update_all_

#!/bin/bash

# Repository sync and management script for portable Git environment
# This script handles syncing, mirroring, and batch operations on repos

# Load environment
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_PATH="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_PATH="$WORKSPACE_PATH/env"

if [ ! -f "$ENV_PATH/.env" ]; then
    echo "Error: .env file not found. Please run setup.sh first."
    exit 1
fi

source "$ENV_PATH/.env"

# Check if required variables are set
check_env() {
    local missing_vars=()
    
    if [ -z "$GITHUB_USERNAME" ] || [ "$GITHUB_USERNAME" == "your_github_username" ]; then
        missing_vars+=("GITHUB_USERNAME")
    fi
    
    if [ -z "$GITHUB_TOKEN" ] || [ "$GITHUB_TOKEN" == "your_github_token" ]; then
        missing_vars+=("GITHUB_TOKEN")
    fi
    
    if [ -z "$GITLAB_USERNAME" ] || [ "$GITLAB_USERNAME" == "your_gitlab_username" ]; then
        missing_vars+=("GITLAB_USERNAME")
    fi
    
    if [ -z "$GITLAB_TOKEN" ] || [ "$GITLAB_TOKEN" == "your_gitlab_token" ]; then
        missing_vars+=("GITLAB_TOKEN")
    fi
    
    if [ ${#missing_vars[@]} -gt 0 ]; then
        echo "Error: The following variables need to be set in $ENV_PATH/.env:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        exit 1
    fi
}

# Ensure CLI tools exist
check_tools() {
    if [ ! -f "$GH_CLI_PATH" ]; then
        echo "Error: GitHub CLI not found at $GH_CLI_PATH"
        echo "Please run setup.sh first."
        exit 1
    fi
    
    if [ ! -f "$GLAB_CLI_PATH" ]; then
        echo "Error: GitLab CLI not found at $GLAB_CLI_PATH"
        echo "Please run setup.sh first."
        exit 1
    fi
}

# Function to handle GitHub repositories
github_sync() {
    local operation=$1
    local repos=$2
    
    echo "===== GitHub Repository Operations ====="
    
    IFS=',' read -ra REPO_ARRAY <<< "$repos"
    for repo in "${REPO_ARRAY[@]}"; do
        repo=$(echo "$repo" | xargs) # Trim whitespace
        if [ -z "$repo" ]; then continue; fi
        
        repo_path="$GITHUB_REPOS_PATH/$repo"
        
        case "$operation" in
            clone)
                if [ -d "$repo_path" ]; then
                    echo "Repository $repo already exists. Skipping clone."
                else
                    echo "Cloning GitHub repository: $repo"
                    $GH_CLI_PATH repo clone "$GITHUB_USERNAME/$repo" "$repo_path"
                fi
                ;;
            update)
                if [ -d "$repo_path" ]; then
                    echo "Updating GitHub repository: $repo"
                    (cd "$repo_path" && git pull origin "$(git rev-parse --abbrev-ref HEAD)")
                else
                    echo "Repository $repo doesn't exist. Clone it first."
                fi
                ;;
            status)
                if [ -d "$repo_path" ]; then
                    echo "Status for GitHub repository: $repo"
                    (cd "$repo_path" && git status -s)
                else
                    echo "Repository $repo doesn't exist. Clone it first."
                fi
                ;;
            *)
                echo "Unknown operation: $operation"
                ;;
        esac
    done
}

# Function to handle GitLab repositories
gitlab_sync() {
    local operation=$1
    local repos=$2
    
    echo "===== GitLab Repository Operations ====="
    
    IFS=',' read -ra REPO_ARRAY <<< "$repos"
    for repo in "${REPO_ARRAY[@]}"; do
        repo=$(echo "$repo" | xargs) # Trim whitespace
        if [ -z "$repo" ]; then continue; fi
        
        repo_path="$GITLAB_REPOS_PATH/$repo"
        
        case "$operation" in
            clone)
                if [ -d "$repo_path" ]; then
                    echo "Repository $repo already exists. Skipping clone."
                else
                    echo "Cloning GitLab repository: $repo"
                    $GLAB_CLI_PATH repo clone "$GITLAB_USERNAME/$repo" "$repo_path"
                fi
                ;;
            update)
                if [ -d "$repo_path" ]; then
                    echo "Updating GitLab repository: $repo"
                    (cd "$repo_path" && git pull origin "$(git rev-parse --abbrev-ref HEAD)")
                else
                    echo "Repository $repo doesn't exist. Clone it first."
                fi
                ;;
            status)
                if [ -d "$repo_path" ]; then
                    echo "Status for GitLab repository: $repo"
                    (cd "$repo_path" && git status -s)
                else
                    echo "Repository $repo doesn't exist. Clone it first."
                fi
                ;;
            *)
                echo "Unknown operation: $operation"
                ;;
        esac
    done
}

# Function to set up mirroring between GitHub and GitLab
setup_mirror() {
    local source_type=$1
    local source_repo=$2
    local target_type=$3
    local target_repo=$4
    
    if [ -z "$source_repo" ] || [ -z "$target_repo" ]; then
        echo "Error: Source and target repository names are required."
        return 1
    fi
    
    echo "Setting up mirroring from $source_type/$source_repo to $target_type/$target_repo"
    
    # Determine source and target paths and URLs
    local source_path=""
    local target_path=""
    local source_url=""
    local target_url=""
    
    if [ "$source_type" == "github" ]; then
        source_path="$GITHUB_REPOS_PATH/$source_repo"
        source_url="https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/$source_repo.git"
    elif [ "$source_type" == "gitlab" ]; then
        source_path="$GITLAB_REPOS_PATH/$source_repo"
        source_url="https://$GITLAB_USERNAME:$GITLAB_TOKEN@gitlab.com/$GITLAB_USERNAME/$source_repo.git"
    else
        echo "Invalid source type: $source_type"
        return 1
    fi
    
    if [ "$target_type" == "github" ]; then
        target_path="$GITHUB_REPOS_PATH/$target_repo"
        target_url="https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/$target_repo.git"
    elif [ "$target_type" == "gitlab" ]; then
        target_path="$GITLAB_REPOS_PATH/$target_repo"
        target_url="https://$GITLAB_USERNAME:$GITLAB_TOKEN@gitlab.com/$GITLAB_USERNAME/$target_repo.git"
    else
        echo "Invalid target type: $target_type"
        return 1
    fi
    
    # Check if source repository exists
    if [ ! -d "$source_path" ]; then
        echo "Source repository doesn't exist: $source_path"
        return 1
    fi
    
    # Make sure we have the target repository
    if [ ! -d "$target_path" ]; then
        echo "Target repository doesn't exist. Creating it first..."
        if [ "$target_type" == "github" ]; then
            # Create repository on GitHub
            $GH_CLI_PATH repo create "$target_repo" --public
            # Clone it
            $GH_CLI_PATH repo clone "$GITHUB_USERNAME/$target_repo" "$target_path"
        elif [ "$target_type" == "gitlab" ]; then
            # Create repository on GitLab
            $GLAB_CLI_PATH repo create "$target_repo" --public
            # Clone it
            $GLAB_CLI_PATH repo clone "$GITLAB_USERNAME/$target_repo" "$target_path"
        fi
    fi
    
    # Set up mirroring
    echo "Configuring mirroring..."
    (
        cd "$source_path"
        
        # Add target as a remote
        if git remote | grep -q "mirror-target"; then
            git remote set-url mirror-target "$target_url"
        else
            git remote add mirror-target "$target_url"
        fi
        
        # Configure push mirror
        git config --local push.mirror-target "refs/heads/*:refs/heads/*"
        
        echo "Mirror configured. To push to the mirror, run:"
        echo "cd $source_path && git push mirror-target --all"
    )
    
    echo "Mirroring setup complete!"
}

# Function to perform batch operations on all repos
batch_operation() {
    local operation=$1
    local command=$2
    
    if [ "$operation" == "github" ] || [ "$operation" == "all" ]; then
        echo "===== Batch Operation on GitHub Repositories ====="
        for repo_dir in "$GITHUB_REPOS_PATH"/*; do
            if [ -d "$repo_dir" ]; then
                repo_name=$(basename "$repo_dir")
                echo "Running command in $repo_name..."
                (cd "$repo_dir" && eval "$command")
                echo "Done."
            fi
        done
    fi
    
    if [ "$operation" == "gitlab" ] || [ "$operation" == "all" ]; then
        echo "===== Batch Operation on GitLab Repositories ====="
        for repo_dir in "$GITLAB_REPOS_PATH"/*; do
            if [ -d "$repo_dir" ]; then
                repo_name=$(basename "$repo_dir")
                echo "Running command in $repo_name..."
                (cd "$repo_dir" && eval "$command")
                echo "Done."
            fi
        done
    fi
}

# Function to check status of all repositories
check_all_repos_status() {
    echo "===== GitHub Repositories Status ====="
    for repo_dir in "$GITHUB_REPOS_PATH"/*; do
        if [ -d "$repo_dir" ]; then
            repo_name=$(basename "$repo_dir")
            echo "Status for $repo_name:"
            (
                cd "$repo_dir"
                git status -s
                # Check for unpushed commits
                local_branch=$(git rev-parse --abbrev-ref HEAD)
                local_commit=$(git rev-parse HEAD)
                remote_commit=$(git rev-parse origin/$local_branch 2>/dev/null || echo "no-remote")
                
                if [ "$local_commit" != "$remote_commit" ]; then
                    echo "  ⚠️  Has unpushed changes!"
                fi
            )
            echo ""
        fi
    done
    
    echo "===== GitLab Repositories Status ====="
    for repo_dir in "$GITLAB_REPOS_PATH"/*; do
        if [ -d "$repo_dir" ]; then
            repo_name=$(basename "$repo_dir")
            echo "Status for $repo_name:"
            (
                cd "$repo_dir"
                git status -s
                # Check for unpushed commits
                local_branch=$(git rev-parse --abbrev-ref HEAD)
                local_commit=$(git rev-parse HEAD)
                remote_commit=$(git rev-parse origin/$local_branch 2>/dev/null || echo "no-remote")
                
                if [ "$local_commit" != "$remote_commit" ]; then
                    echo "  ⚠️  Has unpushed changes!"
                fi
            )
            echo ""
        fi
    done
}

# Function to clone all repositories listed in the environment
clone_all_repos() {
    if [ -n "$SYNC_GITHUB_REPOS" ]; then
        github_sync "clone" "$SYNC_GITHUB_REPOS"
    fi
    
    if [ -n "$SYNC_GITLAB_REPOS" ]; then
        gitlab_sync "clone" "$SYNC_GITLAB_REPOS"
    fi
}

# Function to update all repositories
update_all_repos() {
    if [ -n "$SYNC_GITHUB_REPOS" ]; then
        github_sync "update" "$SYNC_GITHUB_REPOS"
    fi
    
    if [ -n "$SYNC_GITLAB_REPOS" ]; then
        gitlab_sync "update" "$SYNC_GITLAB_REPOS"
    fi
}

# Show usage information
show_usage() {
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Available commands:"
    echo "  clone-github REPO1,REPO2,...  - Clone GitHub repositories"
    echo "  clone-gitlab REPO1,REPO2,...  - Clone GitLab repositories"
    echo "  update-github REPO1,REPO2,... - Update GitHub repositories"
    echo "  update-gitlab REPO1,REPO2,... - Update GitLab repositories"
    echo "  clone-all                    - Clone all repositories from GitHub and GitLab (as defined in .env)"
    echo "  update-all                   - Update all repositories from GitHub and GitLab (as defined in .env)"
    echo "  status-all                   - Check status of all repositories"
    echo "  mirror SOURCE_TYPE SOURCE_REPO TARGET_TYPE TARGET_REPO"
    echo "                               - Set up mirroring between repositories"
    echo "                                 SOURCE_TYPE and TARGET_TYPE must be 'github' or 'gitlab'"
    echo "  batch PLATFORM COMMAND       - Run a command in all repositories"
    echo "                                 PLATFORM must be 'github', 'gitlab', or 'all'"
    echo "                                 COMMAND is the shell command to execute"
    echo ""
    echo "Examples:"
    echo "  $0 clone-github my-project,another-repo"
    echo "  $0 update-all"
    echo "  $0 mirror github my-project gitlab my-project-mirror"
    echo "  $0 batch all 'git checkout main && git pull'"
    echo ""
}

# Main logic
main() {
    check_env
    check_tools
    
    if [ $# -eq 0 ]; then
        show_usage
        exit 1
    fi
    
    command=$1
    shift
    
    case "$command" in
        clone-github)
            if [ $# -eq 0 ]; then
                echo "Error: No repositories specified."
                exit 1
            fi
            github_sync "clone" "$1"
            ;;
        clone-gitlab)
            if [ $# -eq 0 ]; then
                echo "Error: No repositories specified."
                exit 1
            fi
            gitlab_sync "clone" "$1"
            ;;
        update-github)
            if [ $# -eq 0 ]; then
                echo "Error: No repositories specified."
                exit 1
            fi
            github_sync "update" "$1"
            ;;
                echo "Error: No repositories specified."
                exit 1
            fi
            gitlab_sync "update" "$1"
            ;;
        clone-all)
            clone_all_repos
            ;;
        update-all)
            update_all_repos
            ;;
        status-all)
            check_all_repos_status
            ;;
        mirror)
            if [ $# -lt 4 ]; then
                echo "Error: Missing arguments for mirror command."
                echo "Usage: $0 mirror SOURCE_TYPE SOURCE_REPO TARGET_TYPE TARGET_REPO"
                exit 1
            fi
            setup_mirror "$1" "$2" "$3" "$4"
            ;;
        batch)
            if [ $# -lt 2 ]; then
                echo "Error: Missing arguments for batch command."
                echo "Usage: $0 batch PLATFORM COMMAND"
                exit 1
            fi
            platform="$1"
            shift
            command="$*"
            batch_operation "$platform" "$command"
            ;;
        *)
            echo "Unknown command: $command"
            show_usage
            exit 1
            ;;
    esac
}

# Execute main with all arguments
main "$@"
