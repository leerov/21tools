#!/bin/bash
if [ ! -f ~/.zshrc ]; then
    touch ~/.zshrc
fi
if ! grep -q "source ~/21tools/zshrc" ~/.zshrc; then
    echo "source ~/21tools/zshrc" >> ~/.zshrc
fi
