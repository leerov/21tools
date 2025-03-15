// ==UserScript==
// @name         Auto-Click Buttons by XPath
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Автоматически нажимает на элементы по XPath с обработкой динамического контента
// @author       Your Name
// @match        https://edu.21-school.ru/project/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Массив XPath кнопок для нажатия (в порядке последовательности)
    const buttonXPaths = [
        '//*[@id="root"]/div[2]/div/main/div/div[4]/div[2]/div/div/div[1]/button',
        '/html/body/div[4]/div[3]/ul/li[3]'
        // Добавьте другие XPath при необходимости
    ];

    // Функция для поиска элемента по XPath
    function getElementByXPath(xpath) {
        return document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
    }

    // Попытка клика с возвратом статуса
    function tryClick(xpath) {
        const element = getElementByXPath(xpath);
        if (element) {
            element.click();
            console.log(`Успешный клик: ${xpath}`);
            return true;
        }
        return false;
    }

    // Ожидание элемента и выполнение клика
    function waitAndClick(xpath, callback) {
        const interval = setInterval(() => {
            if (tryClick(xpath)) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 500);
    }

    // Основная логика кликов
    function performClicks() {
        buttonXPaths.reduce((prevPromise, xpath, index) => {
            return prevPromise.then(() => new Promise(resolve => {
                if (index === 0) {
                    waitAndClick(xpath, resolve);
                } else {
                    setTimeout(() => {
                        waitAndClick(xpath, resolve);
                    }, 1000);
                }
            }));
        }, Promise.resolve());
    }

    // MutationObserver для динамического контента
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) performClicks();
        });
    });

    // Инициализация
    window.addEventListener('load', () => {
        performClicks();
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });

    // Повторная проверка при изменении DOM
    document.addEventListener('DOMContentLoaded', performClicks);
})();