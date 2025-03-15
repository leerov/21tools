#!/bin/bash
curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
if [ ! -f ~/.zshrc ]; then
    touch ~/.zshrc
fi
if ! grep -q "source ~/21tools/zshrc" ~/.zshrc; then
    echo "source ~/21tools/zshrc" >> ~/.zshrc
fi
if [ ! -f ~/.vimrc ]; then
    touch ~/.vimrc
fi
if ! grep -q "source ~/21tools/vimrc" ~/.vimrc; then
    echo "source ~/21tools/vimrc" >> ~/.vimrc
fi
echo "=== Russian ===" && cat ~/21tools/russian.txt && echo "=== English ===" && cat ~/21tools/english.txt
