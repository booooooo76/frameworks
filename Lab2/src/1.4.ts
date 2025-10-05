interface Payable {
    pay(): void;
}

abstract class Employee {
    protected name: string;
    protected age: number;
    protected salary: number; // місячна зарплата
    
    constructor(name: string, age: number, salary: number) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
    
    // Абстрактний метод для розрахунку річного бонусу
    abstract getAnnualBonus(): number;
}

class Developer extends Employee implements Payable {
    constructor(name: string, age: number, salary: number) {
        super(name, age, salary);
    }
    
    // Реалізація абстрактного методу - бонус 10% від зарплати
    getAnnualBonus(): number {
        return this.salary * 0.1 * 12; 
    }
    
    pay(): void {
        console.log(`Виплачено зарплату розробнику ${this.name}: ${this.salary} грн`);
    }
}

class Manager extends Employee implements Payable {
    constructor(name: string, age: number, salary: number) {
        super(name, age, salary);
    }
    
    getAnnualBonus(): number {
        return this.salary * 0.2 * 12; 
    }
    
    pay(): void {
        console.log(`Виплачено зарплату менеджеру ${this.name}: ${this.salary} грн`);
    }
}


console.log("========== СИСТЕМА УПРАВЛІННЯ СПІВРОБІТНИКАМИ ==========\n");

const employees: Employee[] = [
    new Developer("Олександр Коваленко", 28, 45000),
    new Developer("Марія Петренко", 25, 35000),
    new Developer("Іван Шевченко", 32, 55000),
    new Manager("Ольга Бондаренко", 35, 60000),
    new Manager("Петро Мельник", 40, 75000),
    new Developer("Анна Ткаченко", 27, 40000),
    new Manager("Василь Кравченко", 45, 80000)
];

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


// Демонстрація роботи методу pay() з інтерфейсу Payable
console.log("\n========== ВИПЛАТА ЗАРПЛАТ ==========");

employees.forEach(employee => {
    // Кожен співробітник імплементує Payable, тому можемо викликати pay()
    if (employee instanceof Developer || employee instanceof Manager) {
        employee.pay();
    }
});

