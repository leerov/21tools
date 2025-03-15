#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: $0 <repository_url>"
    exit 1
fi

REPO_URL="$1"
git clone "$REPO_URL" review || exit 1
cd review/src || { echo "review/src directory missing"; exit 1; }
git switch develop || { echo "develop branch not found"; exit 1; }

REPO_NAME=$(basename "$REPO_URL" .git)
AUTHOR=$(echo "$REPO_URL" | sed -E 's%^[^:]+://[^/]+/%%')
TARGET_DIR="$HOME/reviews/${REPO_NAME}-${AUTHOR}"

mkdir -p "$TARGET_DIR"
cp -r ./* "$TARGET_DIR/"

echo "Проверка на clang-format и cppcheck..."
clang-format --style='{BasedOnStyle: Google, IndentWidth: 4, ColumnLimit: 110}' -n *.c
cppcheck --enable=all --suppress=missingIncludeSystem *.c

compiled_files=()
for file in *.c; do
    if [ -f "$file" ]; then
        output_name="${file%.c}.out"
        if gcc -Wall -Werror -Wextra -o "$output_name" "$file"; then
            compiled_files+=("$output_name")
        fi
    fi
done

while true; do
    echo "0. Exit and cleanup"
    for i in "${!compiled_files[@]}"; do
        echo "$((i+1)). Run ${compiled_files[$i]}"
    done
    
    read -p "Choice: " choice

    case $choice in
        0)
            cd ../..
            rm -rf review
            exit 0
            ;;
        *)
            if [[ $choice -gt 0 && $choice -le ${#compiled_files[@]} ]]; then
                index=$((choice-1))
                file_to_run="${compiled_files[$index]}"
                echo "Запуск $file_to_run..."
                leaks -atExit -- ./"$file_to_run"
            else
                echo "Неверный выбор. Попробуйте снова."
            fi
            ;;
    esac
done
