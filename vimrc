set nu
set rnu
syntax on
set noswapfile
set tabstop=4
set mouse=a

call plug#begin() 
    Plug 'preservim/nerdtree'
	Plug 'jiangmiao/auto-pairs'
call plug#end() 

let g:AutoPairs = {'(':')', '[':']', '{':'}', "'":"'", '"':'"', '`':'`'}
let g:AutoPairsMapSpace = 1

nnoremap <silent> \ :NERDTreeToggle<CR> 
nnoremap <silent> ` :shell<CR>
nnoremap <F5> runc % <CR>
nnoremap <F6> form <CR>
