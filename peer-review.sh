#!/bin/bash
if [ -d "review" ]; then
    rm -r "review"
fi
if [[ "$1" == ssh://* || "$1" == https://* ]]; then
    REPO_URL="$1"
    git clone "$REPO_URL" review || exit 1
echo
    cd review/src || { echo "review/src directory missing"; exit 1; }
    git switch develop || { echo "develop branch not found"; exit 1; }
echo

REPO_NAME=$(basename "$REPO_URL" .git)
AUTHOR=$(echo "$REPO_URL" | awk -F'/' '{print $(NF-1)}')
TARGET_DIR="$HOME/reviews/${REPO_NAME}-${AUTHOR}"

mkdir -p "$TARGET_DIR"
cp -r ./* "$TARGET_DIR/"
else
    LOCAL_DIR="$1"
    if [ ! -d "$LOCAL_DIR/src" ]; then
        echo "Локальная папка $LOCAL_DIR не содержит директорию src."
echo
        exit 1
    fi
    cd "$LOCAL_DIR/src" || exit 1
fi
echo "Проверка на clang-format и cppcheck..."
echo "Clang format:"
clang-format --style='{BasedOnStyle: Google, IndentWidth: 4, ColumnLimit: 110}' -n *.c
echo
echo "CPP Check:"
cppcheck --enable=all --suppress=missingIncludeSystem *.c
echo
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
	
echo
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
#output_file=$(mktemp)
#./"$file_to_run" > "$output_file" 2>&1
leaks -atExit -- ./"$file_to_run" # | grep LEAK:
#cat "$output_file"
#rm "$output_file"
            else
                echo "Неверный выбор. Попробуйте снова."
            fi
            ;;
    esac
done
