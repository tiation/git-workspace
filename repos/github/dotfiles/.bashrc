# Enhanced ~/.bashrc: executed by bash(1) for non-login shells.
# ================================================================

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# ==========================================
# ENHANCED HISTORY CONFIGURATION
# ==========================================

# History settings for enhanced command history
export HISTFILE=~/.bash_history
export HISTSIZE=100000
export HISTFILESIZE=100000

# History control options
export HISTCONTROL=ignoreboth:erasedups  # Ignore duplicates and commands starting with space
export HISTIGNORE="ls:ll:la:cd:pwd:exit:date:* --help:history:clear"
export HISTTIMEFORMAT="%F %T "  # Add timestamp to history

# Append to the history file, don't overwrite it
shopt -s histappend

# Save and reload the history after each command finishes
export PROMPT_COMMAND="history -a; history -c; history -r; $PROMPT_COMMAND"

# Check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
shopt -s globstar

# Make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# ==========================================
# PROMPT CONFIGURATION
# ==========================================

# Set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

# Uncomment for a colored prompt, if the terminal has the capability
force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
        # We have color support; assume it's compliant with Ecma-48
        # (ISO/IEC-6429). (Lack of such support is extremely rare, and such
        # a case would tend to support setf rather than setaf.)
        color_prompt=yes
    else
        color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# ==========================================
# COLOR SUPPORT
# ==========================================

# Enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# ==========================================
# WORKSPACE ENVIRONMENT VARIABLES
# ==========================================

# Workspace root (from system reference)
export WORKSPACE="$HOME/workspace"
export WORK_ROOT="$HOME/workspace"

# Project paths
export PROJECTS_DIR="$WORKSPACE/10_projects"
export ASSETS_DIR="$WORKSPACE/20_assets"
export DOCS_DIR="$WORKSPACE/30_docs"
export OPS_DIR="$WORKSPACE/40_ops"
export DATA_DIR="$WORKSPACE/70_data"

# Development environment
export PYTHONPATH="$PROJECTS_DIR:$PYTHONPATH"
export NODE_PATH="$PROJECTS_DIR/node_modules:$NODE_PATH"

# Editor preferences
export EDITOR="code"
export VISUAL="code"

# ==========================================
# FZF CONFIGURATION
# ==========================================

# FZF key bindings and fuzzy completion
if [ -f /usr/share/doc/fzf/examples/key-bindings.bash ]; then
    source /usr/share/doc/fzf/examples/key-bindings.bash
fi

if [ -f /usr/share/bash-completion/completions/fzf ]; then
    source /usr/share/bash-completion/completions/fzf
fi

# FZF default options
export FZF_DEFAULT_OPTS='--height 40% --layout=reverse --border --inline-info --preview "[[ $(file --mime {}) =~ binary ]] && echo {} is a binary file || (bat --style=numbers --color=always {} || highlight -O ansi -l {} || coderay {} || rougify {} || cat {}) 2> /dev/null | head -300"'

# FZF default command
export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
export FZF_ALT_C_COMMAND='fd --type d --hidden --follow --exclude .git'

# ==========================================
# CUSTOM FUNCTIONS
# ==========================================

# Enhanced cd with fzf
fcd() {
    local dir
    dir=$(find ${1:-.} -path '*/\.*' -prune -o -type d -print 2> /dev/null | fzf +m) &&
    cd "$dir"
}

# Search and edit file with fzf
fe() {
    local files
    IFS=$'\n' files=($(fzf-tmux --query="$1" --multi --select-1 --exit-0))
    [[ -n "$files" ]] && ${EDITOR:-vim} "${files[@]}"
}

# Kill process with fzf
fkill() {
    local pid
    if [ "$UID" != "0" ]; then
        pid=$(ps -f -u $UID | sed 1d | fzf -m | awk '{print $2}')
    else
        pid=$(ps -ef | sed 1d | fzf -m | awk '{print $2}')
    fi

    if [ "x$pid" != "x" ]; then
        echo $pid | xargs kill -${1:-9}
    fi
}

# Git branch checkout with fzf
fbr() {
    local branches branch
    branches=$(git branch -vv) &&
    branch=$(echo "$branches" | fzf +m) &&
    git checkout $(echo "$branch" | awk '{print $1}' | sed "s/.* //")
}

# Workspace tree creation function
mkws() {
    mkdir -p ~/workspace/{00_org,10_projects,20_assets,30_docs,40_ops,70_data,99_tmp}
    echo "Workspace structure created!"
    if command -v tree &> /dev/null; then
        tree ~/workspace -L 2
    else
        ls -la ~/workspace
    fi
}

# ==========================================
# ALIASES
# ==========================================

# Load bash aliases
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# ==========================================
# PROGRAMMABLE COMPLETION
# ==========================================

# Enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi

# ==========================================
# ADDITIONAL COMPLETIONS
# ==========================================

# Enable completion for kubectl
if command -v kubectl &> /dev/null; then
    source <(kubectl completion bash)
fi

# Enable completion for docker
if command -v docker &> /dev/null; then
    if [ -f /usr/share/bash-completion/completions/docker ]; then
        source /usr/share/bash-completion/completions/docker
    fi
fi

# Enable completion for git
if command -v git &> /dev/null; then
    if [ -f /usr/share/bash-completion/completions/git ]; then
        source /usr/share/bash-completion/completions/git
    fi
fi

# ==========================================
# FINAL CUSTOMIZATIONS
# ==========================================

# Load any local customizations
if [ -f ~/.bashrc.local ]; then
    source ~/.bashrc.local
fi

# Welcome message for interactive shells
if [[ $- == *i* ]]; then
    echo "hello Tia, you're a star"
    echo "🚀 Enhanced Bash environment loaded!"
    echo "📁 Workspace: $WORKSPACE"
    echo "🔍 FZF key bindings: Ctrl+T (files), Ctrl+R (history), Alt+C (dirs)"
    echo "💡 Try: fcd, fe, fkill, fbr functions"
fi

export PATH="$HOME/.local/bin:$PATH"
export WORKSPACE=/home/ryzen/workspace
