

if [ -z "$1" ]; then
        echo "Ошибка: Укажите название коммита."
        return 1
    fi

    commit_message="$*"

    git checkout -b develop 2>/dev/null || git checkout develop

    git add *.c 
git add *.h
    git commit -m "$commit_message"

    git push --set-upstream origin develop

