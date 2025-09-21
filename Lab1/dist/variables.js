"use strict";
// === ЗМІННІ РІЗНИХ ТИПІВ ===
// Рядкова змінна
let firstName = "Іван";
let lastName = "Петренко";
// Числова змінна
let age = 25;
let height = 175.5;
// Булева змінна
let isStudent = true;
let hasJob = false;
// Змінна типу any (може містити будь-який тип)
let dynamicValue = "Спочатку рядок";
dynamicValue = 42; // Тепер число
dynamicValue = true; // Тепер булеве значення
// Виведення всіх змінних у консоль
console.log("=== Виведення змінних ===");
console.log("Ім'я:", firstName);
console.log("Прізвище:", lastName);
console.log("Вік:", age);
console.log("Зріст:", height);
console.log("Чи є студентом:", isStudent);
console.log("Чи має роботу:", hasJob);
console.log("Динамічне значення:", dynamicValue);
// === МАСИВИ ===
// Масив рядків
let fruits = ["яблуко", "банан", "апельсин"];
let cities = ["Київ", "Львів", "Одеса"]; // Альтернативний синтаксис
// Масив чисел
let numbers = [1, 2, 3, 4, 5];
let scores = [95, 87, 92, 88, 90];
console.log("\n=== Виведення масивів ===");
console.log("Фрукти:", fruits);
console.log("Міста:", cities);
console.log("Числа:", numbers);
console.log("Оцінки:", scores);
//# sourceMappingURL=variables.js.map