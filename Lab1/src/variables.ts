
let firstName: string = "Іван";
let lastName: string = "Петренко";

let age: number = 25;
let height: number = 175.5;

let isStudent: boolean = true;
let hasJob: boolean = false;

// Змінна типу any 
let dynamicValue: any = "Спочатку рядок";
dynamicValue = 42; 
dynamicValue = true; 

console.log("=== Виведення змінних ===");
console.log("Ім'я:", firstName);
console.log("Прізвище:", lastName);
console.log("Вік:", age);
console.log("Зріст:", height);
console.log("Чи є студентом:", isStudent);
console.log("Чи має роботу:", hasJob);
console.log("Динамічне значення:", dynamicValue);


// Масив рядків
let fruits: string[] = ["яблуко", "банан", "апельсин"];
let cities: Array<string> = ["Київ", "Львів", "Одеса"]; // Альтернативний синтаксис

// Масив чисел
let numbers: number[] = [1, 2, 3, 4, 5];
let scores: Array<number> = [95, 87, 92, 88, 90];

console.log("\n=== Виведення масивів ===");
console.log("Фрукти:", fruits);
console.log("Міста:", cities);
console.log("Числа:", numbers);
console.log("Оцінки:", scores);