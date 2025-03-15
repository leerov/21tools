#!/bin/bash
if grep -q "source ~/21tools/zshrc" ~/.zshrc; then
    sed -i '/source ~\/21tools\/zshrc/d' ~/.zshrc
fi
if grep -q "source ~/21tools/vimrc" ~/.vimrc; then
    sed -i '/source ~\/21tools\/vimrc/d' ~/.vimrc
fi
if [ -d ~/21tools ]; then
    rm -rf ~/21tools
    echo "Папка ~/21tools удалена."
else
    echo "Папка ~/21tools не существует."
fi
if [ -f ~/.vim/autoload/plug.vim ]; then
    rm -f ~/.vim/autoload/plug.vim
    echo "Файл ~/.vim/autoload/plug.vim удален."
else
    echo "Файл ~/.vim/autoload/plug.vim не существует."
fi
echo "Все изменения отменены."
