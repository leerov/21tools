#!/bin/bash
chmod +x ~/21tools/pull
~/21tools/pull
alias push="bash ~/21tools/push"
alias la="ls -la"
alias p="bash ~/21tools/peer-review.sh"
alias f="bash ~/21tools/clang-format-and-cppcheck.sh"
alias c="bash ~/21tools/clean.sh"

alias r="bash ~/21tools/crun.sh"
alias s="bash ~/21tools/save.sh"

export PATH=$PATH:~/scripts
