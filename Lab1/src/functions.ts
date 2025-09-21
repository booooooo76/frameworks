// Функція з параметром за замовчуванням
function greetUser(name: string, age: number = 18): void {
    console.log(`Привіт, ${name}! Тобі ${age} років.`);
}


console.log("=== Тестування функції з параметром за замовчуванням ===");


greetUser("Олена", 25);

// Виклик без другого параметра
greetUser("Петро");

