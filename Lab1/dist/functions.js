"use strict";
// Функція з параметром за замовчуванням
function greetUser(name, age = 18) {
    console.log(`Привіт, ${name}! Тобі ${age} років.`);
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
        return `${firstName} ${lastName}`;
    }
    return firstName;
}
console.log("\n=== Додаткові приклади ===");
console.log("Сума 5 + 3 =", addNumbers(5, 3));
console.log("Повне ім'я:", buildName("Марія", "Шевченко"));
console.log("Тільки ім'я:", buildName("Андрій"));
//# sourceMappingURL=functions.js.map