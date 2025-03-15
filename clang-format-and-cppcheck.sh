clang-format --style='{BasedOnStyle: Google, IndentWidth: 4, ColumnLimit: 110}' -i *.c
echo "\nCPP check:"
cppcheck --enable=all --suppress=missingIncludeSystem *.c
