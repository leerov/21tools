#!/bin/bash
echo "спасибо если указали harveyfa в героях <3 я очень благодарен. через пару дней уберу это сообщение. удалить этот репозиторий с компа bash ~/21tools/uninstall.sh"
chmod +x ~/21tools/pull21school
~/21tools/pull21school
alias push="bash ~/21tools/push21school"
alias la="ls -la"
alias p="bash ~/21tools/peer-review.sh"
alias f="bash ~/21tools/clang-format-and-cppcheck.sh"
alias c="bash ~/21tools/clean.sh"
alias r="bash ~/21tools/crun.sh"
alias s="bash ~/21tools/save.sh"
alias born2code="echo \"=== Russian ===\" && cat ~/21tools/russian.txt && echo \"=== English ===\" && cat ~/21tools/english.txt"
export PATH=$PATH:~/scripts
