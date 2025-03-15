    if [ -z "$1" ]; then
        echo "Ошибка: Укажите файл для компиляции."
        return 1
    fi
    gcc -Wall -Werror -Wextra -o main.out "$1" && ./main.out && rm main.out

