// ==UserScript==
// @name         Custom Styles for edu.21-school.ru
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Применяет кастомные стили и исключает элементы по XPath
// @author       Your Name
// @match        https://edu.21-school.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Массив XPath-запросов для элементов, которые не должны получать глобальные стили
    const excludeXPaths = [
        "//*[@id=\"custom-message-button\"]",
        '//*[@id="root"]/div[2]/div/section/div[2]/div[1]/div[1]/div[2]/div/a',
        '//*[@id="root"]/div[4]/div',
        '/html/body/div[5]/div[3]'
    ];

    const customStyle = `
    *:not(.no-global-style) {
        background-color: black !important;
        color: white !important;
    }

    `;

    // Добавляем кастомные стили в документ
    function addCustomStyle(css) {
        const styleNode = document.createElement('style');
        styleNode.textContent = css;
        document.head.appendChild(styleNode);
    }

    addCustomStyle(customStyle);

    // Функция для применения исключений по XPath
function applyExclusions() {
    excludeXPaths.forEach(xpath => {
        const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0; i < result.snapshotLength; i++) {
            const node = result.snapshotItem(i);
            // Добавляем класс к самому элементу
            node.classList.add('no-global-style');

            // Рекурсивно добавляем класс ко всем дочерним элементам
            const addClassRecursively = (element) => {
                for (let child of element.children) {
                    child.classList.add('no-global-style');
                    addClassRecursively(child); // Рекурсивный вызов для вложенных элементов
                }
            };

            addClassRecursively(node);
        }
    });
}

    // Наблюдатель за изменениями в DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Применяем исключения к новым элементам
                    applyExclusions();
                }
            });
        });
    });

    // Начинаем наблюдение за изменениями в DOM
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Применяем исключения при начальной загрузке страницы
    applyExclusions();
setInterval(applyExclusions, 1000);
})();