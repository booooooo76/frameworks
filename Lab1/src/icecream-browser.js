// Спрощена версія для браузера
function calculateIceCreamPriceBrowser() {
    // Отримуємо розмір
    var sizeInput = prompt("Оберіть розмір стаканчика:\n1 - Маленький (10 грн)\n2 - Великий (25 грн)");
    var size = sizeInput === "1" ? "small" : "large";
    var price = size === "small" ? 10 : 25;
    // Отримуємо начинки
    var chocolateInput = prompt("Додати шоколад (+5 грн)? (так/ні)");
    var caramelInput = prompt("Додати карамель (+6 грн)? (так/ні)");
    var berriesInput = prompt("Додати ягоди (+10 грн)? (так/ні)");
    var toppings = [];
    if ((chocolateInput === null || chocolateInput === void 0 ? void 0 : chocolateInput.toLowerCase()) === "так") {
        price += 5;
        toppings.push("шоколад");
    }
    if ((caramelInput === null || caramelInput === void 0 ? void 0 : caramelInput.toLowerCase()) === "так") {
        price += 6;
        toppings.push("карамель");
    }
    if ((berriesInput === null || berriesInput === void 0 ? void 0 : berriesInput.toLowerCase()) === "так") {
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
    var marshmallowInput = prompt("Додати маршмелоу (+5 грн)? (так/ні)");
    if ((marshmallowInput === null || marshmallowInput === void 0 ? void 0 : marshmallowInput.toLowerCase()) === "так") {
        price += 5;
    }
    // Виводимо результат
    alert("\u0412\u0430\u0448\u0435 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F:\n" +
        "\u0420\u043E\u0437\u043C\u0456\u0440: ".concat(size === "small" ? "Маленький" : "Великий", "\n") +
        "\u041D\u0430\u0447\u0438\u043D\u043A\u0438: ".concat(toppings.join(", "), "\n") +
        "\u041C\u0430\u0440\u0448\u043C\u0435\u043B\u043E\u0443: ".concat((marshmallowInput === null || marshmallowInput === void 0 ? void 0 : marshmallowInput.toLowerCase()) === "так" ? "Так" : "Ні", "\n") +
        "\n\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0430 \u0432\u0430\u0440\u0442\u0456\u0441\u0442\u044C: ".concat(price, " \u0433\u0440\u043D"));
}
// Виклик функції
calculateIceCreamPriceBrowser();
