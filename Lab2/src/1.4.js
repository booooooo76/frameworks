// Абстрактний клас Employee
class Employee {
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
}
// Клас Developer (Розробник)
class Developer extends Employee {
    constructor(name, age, salary) {
        super(name, age, salary);
    }
    // Реалізація абстрактного методу - бонус 10% від зарплати
    getAnnualBonus() {
        return this.salary * 0.1 * 12; // 10% від річної зарплати
    }
    // Імплементація методу pay() з інтерфейсу Payable
    pay() {
        console.log(`Виплачено зарплату розробнику ${this.name}: ${this.salary} грн`);
    }
}
// Клас Manager (Менеджер)
class Manager extends Employee {
    constructor(name, age, salary) {
        super(name, age, salary);
    }
    // Реалізація абстрактного методу - бонус 20% від зарплати
    getAnnualBonus() {
        return this.salary * 0.2 * 12; // 20% від річної зарплати
    }
    // Імплементація методу pay() з інтерфейсу Payable
    pay() {
        console.log(`Виплачено зарплату менеджеру ${this.name}: ${this.salary} грн`);
    }
}
// ============= ДЕМОНСТРАЦІЯ РОБОТИ =============
console.log("========== СИСТЕМА УПРАВЛІННЯ СПІВРОБІТНИКАМИ ==========\n");
// Створення масиву об'єктів типу Employee
const employees = [
    new Developer("Олександр Коваленко", 28, 45000),
    new Developer("Марія Петренко", 25, 35000),
    new Developer("Іван Шевченко", 32, 55000),
    new Manager("Ольга Бондаренко", 35, 60000),
    new Manager("Петро Мельник", 40, 75000),
    new Developer("Анна Ткаченко", 27, 40000),
    new Manager("Василь Кравченко", 45, 80000)
];
// Виведення інформації про співробітників та їхні бонуси
console.log("Список співробітників та їхні річні бонуси:");
console.log("-".repeat(60));
employees.forEach((employee, index) => {
    const employeeType = employee instanceof Developer ? "Розробник" : "Менеджер";
    const bonus = employee.getAnnualBonus();
    console.log(`${index + 1}. ${employee['name']}`);
    console.log(`   Посада: ${employeeType}`);
    console.log(`   Вік: ${employee['age']} років`);
    console.log(`   Зарплата: ${employee['salary']} грн/міс`);
    console.log(`   Річний бонус: ${bonus.toFixed(2)} грн`);
    console.log("-".repeat(60));
});
// Підрахунок загальної річної суми бонусів для всіх співробітників
const totalAnnualBonuses = employees.reduce((total, employee) => {
    return total + employee.getAnnualBonus();
}, 0);
console.log("\n========== ПІДСУМКИ ==========");
console.log(`Загальна кількість співробітників: ${employees.length}`);
console.log(`Загальна річна сума бонусів: ${totalAnnualBonuses.toFixed(2)} грн`);
// Окремий підрахунок для розробників та менеджерів
const developersBonuses = employees
    .filter(emp => emp instanceof Developer)
    .reduce((total, emp) => total + emp.getAnnualBonus(), 0);
const managersBonuses = employees
    .filter(emp => emp instanceof Manager)
    .reduce((total, emp) => total + emp.getAnnualBonus(), 0);
const developersCount = employees.filter(emp => emp instanceof Developer).length;
const managersCount = employees.filter(emp => emp instanceof Manager).length;
console.log(`\nРозробники (${developersCount} осіб):`);
console.log(`  Загальна сума бонусів: ${developersBonuses.toFixed(2)} грн`);
console.log(`  Середній бонус: ${(developersBonuses / developersCount).toFixed(2)} грн`);
console.log(`\nМенеджери (${managersCount} осіб):`);
console.log(`  Загальна сума бонусів: ${managersBonuses.toFixed(2)} грн`);
console.log(`  Середній бонус: ${(managersBonuses / managersCount).toFixed(2)} грн`);
// Демонстрація роботи методу pay() з інтерфейсу Payable
console.log("\n========== ВИПЛАТА ЗАРПЛАТ ==========");
employees.forEach(employee => {
    // Кожен співробітник імплементує Payable, тому можемо викликати pay()
    if (employee instanceof Developer || employee instanceof Manager) {
        employee.pay();
    }
});
// Альтернативний спосіб - створення масиву Payable
console.log("\n========== РОБОТА З ІНТЕРФЕЙСОМ PAYABLE ==========");
const payableEmployees = [
    new Developer("Тестовий Розробник", 30, 50000),
    new Manager("Тестовий Менеджер", 38, 70000)
];
console.log("Виплата через інтерфейс Payable:");
payableEmployees.forEach(payable => {
    payable.pay();
});
