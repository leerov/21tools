// ==UserScript==
// @name         Hide Elements by XPath
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Скрывает элементы по XPath для соответствующих URL с возможностью обработки динамического контента
// @author       Your Name
// @grant        none
// @match        https://edu.21-school.ru/project/*
// ==/UserScript==

(function() {
    'use strict';

    // Словарь URL:XPath (URL - начало ссылки, XPath - элемент для скрытия)
    const urlXpathMap = {
        'https://edu.21-school.ru/project/': [
            '//*[@id="root"]/div[2]/div/aside/div[1]'
            // Добавьте другие XPath для этого URL
        ]
        // Добавьте другие URL и соответствующие XPath
    };

    // Функция для поиска элемента по XPath
    function getElementByXPath(xpath, context = document) {
        return document.evaluate(xpath, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    // Функция скрытия элемента
    function hideElement(xpath) {
        const element = getElementByXPath(xpath);
        if (element) {
            element.style.display = 'none';
            return true;
        }
        return false;
    }

    // Периодическая проверка и скрытие элементов
    function waitAndHide(xpath) {
        const interval = setInterval(() => {
            if (hideElement(xpath)) clearInterval(interval);
        }, 500);
    }

    // Обработчик мутаций для динамического контента
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                checkAndHideElements();
            }
        });
    });

    // Основная функция проверки и скрытия элементов
    function checkAndHideElements() {
        const currentUrl = window.location.href;

        for (const [urlStart, xpaths] of Object.entries(urlXpathMap)) {
            if (currentUrl.startsWith(urlStart)) {
                xpaths.forEach(xpath => {
                    if (!hideElement(xpath)) waitAndHide(xpath);
                });
                break;
            }
        }
    }

    // Инициализация скрипта
    window.addEventListener('load', () => {
        checkAndHideElements();
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
})();