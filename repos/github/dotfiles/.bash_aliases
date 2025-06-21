# Enhanced Bash Aliases
# ===================

# Navigation aliases
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias ~='cd ~'
alias -- -='cd -'

# Workspace navigation (from system reference)
alias ws='cd ~/workspace'
alias org='cd ~/workspace/00_org'
alias proj='cd ~/workspace/10_projects'
alias assets='cd ~/workspace/20_assets'
alias docs='cd ~/workspace/30_docs'
alias ops='cd ~/workspace/40_ops'
alias data='cd ~/workspace/70_data'
alias tmp='cd ~/workspace/99_tmp'

# Enhanced ls aliases
alias ls='ls --color=auto'
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias lt='ls -altr'  # Sort by modification time
alias lh='ls -alh'   # Human readable sizes

# Git aliases
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git log --oneline'
alias gd='git diff'
alias gb='git branch'
alias gco='git checkout'
alias gcm='git commit -m'
alias gph='git push origin HEAD'
alias gpl='git pull'

# Docker aliases
alias dk='docker'
alias dkc='docker-compose'
alias dkps='docker ps'
alias dki='docker images'
alias dkrm='docker rm'
alias dkrmi='docker rmi'
alias dkl='docker logs'
alias dke='docker exec -it'

# System aliases
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'
alias h='history'
alias j='jobs -l'
alias path='echo -e ${PATH//:/\\n}'
alias now='date +"%T"'
alias nowtime=now
alias nowdate='date +"%d-%m-%Y"'

# Safety aliases
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
alias ln='ln -i'

# Network aliases
alias ping='ping -c 5'
alias fastping='ping -c 100 -s.2'
alias ports='netstat -tulanp'
alias myip='curl -s ipinfo.io/ip'

# System monitoring
alias df='df -H'
alias du='du -ch'
alias free='free -h'
alias ps='ps auxf'
alias psg='ps aux | grep -v grep | grep -i -e VSZ -e'
alias top='htop'

# Archive aliases
alias tarc='tar -czvf'
alias tarx='tar -xzvf'
alias untar='tar -xvf'

# FZF enhanced aliases
alias fcd='cd $(find . -type d | fzf)'
alias fvim='vim $(find . -type f | fzf)'
alias fcat='cat $(find . -type f | fzf)'

# Tailscale aliases (from system reference)
alias tss='tailscale status'
alias tsup='tailscale up'
alias tsdown='tailscale down'

# Quick edits
alias zshrc='${EDITOR:-vim} ~/.zshrc'
alias bashrc='${EDITOR:-vim} ~/.bashrc'
alias aliases='${EDITOR:-vim} ~/.bash_aliases'

# Tree with nice defaults
alias tree='tree -C -I ".git|node_modules|.next|dist|build"'

# Quick server
alias serve='python3 -m http.server 8000'

# Memory and CPU info
alias meminfo='free -m -l -t'
alias cpuinfo='lscpu'

# Date and time
alias week='date +%V'
alias timer='echo "Timer started. Stop with Ctrl-D." && date && time cat && date'

# Custom functions as aliases
alias mkcd='function _mkcd(){ mkdir -p "$1" && cd "$1"; }; _mkcd'
alias backup='function _backup(){ cp "$1"{,.bak}; }; _backup'
alias extract='function _extract(){ 
    case "$1" in 
        *.tar.bz2) tar xjf "$1" ;;
        *.tar.gz) tar xzf "$1" ;;
        *.bz2) bunzip2 "$1" ;;
        *.rar) unrar x "$1" ;;
        *.gz) gunzip "$1" ;;
        *.tar) tar xf "$1" ;;
        *.tbz2) tar xjf "$1" ;;
        *.tgz) tar xzf "$1" ;;
        *.zip) unzip "$1" ;;
        *.Z) uncompress "$1" ;;
        *.7z) 7z x "$1" ;;
        *) echo "Unknown archive format" ;;
    esac
}; _extract'

