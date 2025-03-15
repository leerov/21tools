if [ -z "$1" ]; then
    echo "Ошибка: Укажите файл для компиляции."
    return 1
fi
FILE="$1"
shift
EXTRA_FLAGS="$@"
gcc -Wall -Werror -Wextra -o main.out "$FILE" $EXTRA_FLAGS && ./main.out && rm main.out
