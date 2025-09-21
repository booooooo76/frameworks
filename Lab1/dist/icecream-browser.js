"use strict";
// Спрощена версія для браузера
function calculateIceCreamPriceBrowser() {
    // Отримуємо розмір
    const sizeInput = prompt("Оберіть розмір стаканчика:\n1 - Маленький (10 грн)\n2 - Великий (25 грн)");
    const size = sizeInput === "1" ? "small" : "large";
    let price = size === "small" ? 10 : 25;
    // Отримуємо начинки
    const chocolateInput = prompt("Додати шоколад (+5 грн)? (так/ні)");
    const caramelInput = prompt("Додати карамель (+6 грн)? (так/ні)");
    const berriesInput = prompt("Додати ягоди (+10 грн)? (так/ні)");
    let toppings = [];
    if (chocolateInput?.toLowerCase() === "так") {
        price += 5;
        toppings.push("шоколад");
    }
    if (caramelInput?.toLowerCase() === "так") {
        price += 6;
        toppings.push("карамель");
    }
    if (berriesInput?.toLowerCase() === "так") {
        price += 10;
        toppings.push("ягоди");
    }
    // Перевірка на мінімум одну начинку
    if (toppings.length === 0) {
        alert("Потрібна хоча б одна начинка! Додаю шоколад.");
        price += 5;
        toppings.push("шоколад");
    }
    // Маршмелоу
    const marshmallowInput = prompt("Додати маршмелоу (+5 грн)? (так/ні)");
    if (marshmallowInput?.toLowerCase() === "так") {
        price += 5;
    }
    // Виводимо результат
    alert(`Ваше замовлення:\n` +
        `Розмір: ${size === "small" ? "Маленький" : "Великий"}\n` +
        `Начинки: ${toppings.join(", ")}\n` +
        `Маршмелоу: ${marshmallowInput?.toLowerCase() === "так" ? "Так" : "Ні"}\n` +
        `\nЗагальна вартість: ${price} грн`);
}
// Виклик функції
calculateIceCreamPriceBrowser();
//# sourceMappingURL=icecream-browser.js.map