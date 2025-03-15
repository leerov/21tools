// ==UserScript==
// @name         Profile Message Button (Fixed Position)
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Adds fixed SEND MESSAGE button to profiles
// @author       Your Name
// @match        https://edu.21-school.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const DEBUG = true;

    function log(...args) {
        if(DEBUG) console.log('[Profile Button]', ...args);
    }

    const buttonStyles = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '99999',
        WebkitFontSmoothing: 'antialiased',
        textSizeAdjust: '100%',
        whiteSpace: 'nowrap',
        WebkitBoxAlign: 'center',
        WebkitBoxPack: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'transparent',
        outline: '0px',
        border: '0px',
        userSelect: 'none',
        verticalAlign: 'middle',
        appearance: 'none',
        textDecoration: 'none',
        fontFamily: '"SB Sans Text", Helvetica, sans-serif',
        fontWeight: '600',
        fontSize: '0.875rem',
        lineHeight: '1.75',
        cursor: 'pointer',
        display: 'inline-flex',
        minWidth: '24px',
        minHeight: '24px',
        transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        alignItems: 'center',
        borderRadius: '8px',
        textTransform: 'none',
        color: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(68, 235, 153)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            justifyContent: 'center', // Центрирование по осям
    textAlign: 'center', // Явное выравнивание текста
    padding: '8px 16px', // Симметричные отступы слева/справа
    };

    function isProfilePage() {
        return /^https:\/\/edu\.21-school\.ru\/profile\/.*/.test(window.location.href);
    }

    function getNickname() {
        try {
            const path = window.location.pathname;
            const match = path.match(/profile\/([^\/]+)/);
            return match ? match[1] : null;
        } catch (e) {
            log('Error getting nickname:', e);
            return null;
        }
    }

    function createButton() {
        const nickname = getNickname();
        if(!nickname) {
            log('Nickname not found');
            return null;
        }

        const btn = document.createElement('button');
        btn.innerHTML = 'Send message';
        btn.id = 'custom-message-button';

        Object.assign(btn.style, buttonStyles);

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(`https://rocketchat-intensive-nsk.21-school.ru/direct/${nickname}`, '_blank');
        });

        return btn;
    }

    function removeButton() {
        const existingBtn = document.getElementById('custom-message-button');
        if (existingBtn) {
            existingBtn.remove();
            log('Button removed');
        }
    }

    function init() {
        try {
            if (!isProfilePage()) {
                removeButton();
                return;
            }

            const nickname = getNickname();
            if (!nickname) {
                removeButton();
                return;
            }

            // Проверяем, существует ли кнопка
            const existingBtn = document.getElementById('custom-message-button');
            if (existingBtn) {
                log('Button already exists, skipping');
                return;
            }

            const btn = createButton();
            if(btn) {
                document.body.appendChild(btn);
                log('Fixed button added');

                // Анимация появления
                btn.animate([
                    { opacity: 0, transform: 'translateY(20px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 300,
                    easing: 'ease-out'
                });
            }
        } catch (error) {
            log('Initialization error:', error);
        }
    }

    // Инициализация при загрузке
    if(document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init);
    }

    // Для SPA: отслеживаем изменения URL
    let lastUrl = location.href;
    setInterval(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            init();
        }
    }, 500);
})();