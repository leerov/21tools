// ==UserScript==
// @name         Replace Avatar Images
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Replace avatar images on edu.21-school.ru profile page and coalition members
// @author       You
// @match        https://edu.21-school.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const getNicknameFromUrl = () => window.location.pathname.split('/').pop();

    // Массив локаций для замены аватаров
    const avatarLocations = [

        {
            type: 'xpath',
            path: '//*[@id="root"]/div[2]/div/section/div[1]/div[1]/div/div[1]/img',
            getLogin: () => getNicknameFromUrl()
        },

        {
            type: 'selector',
            container: '[data-testid^="Coalition.MembersList.Member.login."]',
            avatarSelector: '.MuiAvatar-img',
            getLogin: (container) => container.getAttribute('data-testid').split('.').pop()
        },
         {
            type: 'selector',
            container: '[components.teamMembersList.teamUser"]',
            avatarSelector: '.MuiAvatar-img',
            getLogin: (container) => container.getAttribute('data-testid').split('.').pop()
        },
        {
    type: 'selector',
    container: '[data-testid="components.teamMembersList.teamUser"]',
    avatarSelector: '.MuiAvatar-img',
    getLogin: (container) => {
        const loginElement = container.querySelector(
            '[data-testid="components.teamMembersList.userLogin"]'
        );
        return loginElement ? loginElement.textContent.trim() : null;
    }
},
        {
    type: 'xpath',
    path: '//*[@data-testid="Coalition.CoalitionList.Member.avatar"]/ancestor::div[1]',
    getLogin: (container) => {
        const loginElement = container.querySelector(
            '[data-testid="Coalition.CoalitionList.Member.login"]'
        );
        return loginElement ? loginElement.textContent.trim() : null;
    },
    avatarSelector: 'img'
}
    ];

    // Основная функция для замены аватаров
    function replaceAvatars() {
        avatarLocations.forEach(location => {
            try {
                if (location.type === 'xpath') {
                    const node = document.evaluate(location.path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    if (node) {
                        node.src = `https://rocketchat-intensive-nsk.21-school.ru/avatar/${location.getLogin()}`;
                    }
                }
                else if (location.type === 'selector') {
                    const containers = document.querySelectorAll(location.container);
                    containers.forEach(container => {
                        const login = location.getLogin(container);
                        const avatar = location.avatarSelector ?
                            container.querySelector(location.avatarSelector) :
                            container;
                        if (avatar) {
                            avatar.src = `https://rocketchat-intensive-nsk.21-school.ru/avatar/${login}`;
                        }
                    });
                }
            } catch (error) {
                console.error('Error processing location:', location, error);
            }
        });
    }

    // Запускаем сразу
    replaceAvatars();

    // Наблюдаем за изменениями в DOM
    const observer = new MutationObserver(replaceAvatars);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
})();