// Функція з параметром за замовчуванням
function greetUser(name, age) {
    if (age === void 0) { age = 18; }
    console.log("\u041F\u0440\u0438\u0432\u0456\u0442, ".concat(name, "! \u0422\u043E\u0431\u0456 ").concat(age, " \u0440\u043E\u043A\u0456\u0432."));
}
// Тестування функції
console.log("=== Тестування функції з параметром за замовчуванням ===");
// Виклик з обома параметрами
greetUser("Олена", 25);
// Виклик без другого параметра (використається значення за замовчуванням)
greetUser("Петро");
// Додаткові приклади функцій
// Функція, що повертає значення
function addNumbers(a, b) {
    return a + b;
}
// Функція з необов'язковим параметром
function buildName(firstName, lastName) {
    if (lastName) {
        return "".concat(firstName, " ").concat(lastName);
    }
    return firstName;
}
console.log("\n=== Додаткові приклади ===");
console.log("Сума 5 + 3 =", addNumbers(5, 3));
console.log("Повне ім'я:", buildName("Марія", "Шевченко"));
console.log("Тільки ім'я:", buildName("Андрій"));
