// Абстрактний батьківський клас Car
class Car {
    constructor(brand, model, year, engineVolume, vin, color, price) {
        this.mileage = 0; // пробіг
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.engineVolume = engineVolume;
        this.vin = vin;
        this.color = color;
        this.price = price;
    }
    // Звичайні методи
    drive(distance) {
        this.mileage += distance;
        console.log(`${this.brand} ${this.model} проїхав ${distance} км`);
    }
    // Protected метод - доступний в похідних класах
    getBasicInfo() {
        return `${this.brand} ${this.model} (${this.year})`;
    }
    // Getter для приватної властивості
    getMileage() {
        return this.mileage;
    }
    // Protected getter для VIN (доступний тільки в похідних класах)
    getVin() {
        return this.vin;
    }
    // Публічний метод для отримання вартості з урахуванням пробігу
    getCurrentValue() {
        const depreciationPerKm = 0.5; // знецінення на км
        return Math.max(this.price - (this.mileage * depreciationPerKm), this.price * 0.3);
    }
}
// Похідний клас BMW
class BMW extends Car {
    constructor(model, year, engineVolume, vin, color, price, series, xDrive = false) {
        // Виклик конструктора батьківського класу
        super("BMW", model, year, engineVolume, vin, color, price);
        this.sportMode = false;
        this.series = series;
        this.xDrive = xDrive;
    }
    // Реалізація абстрактних методів
    startEngine() {
        console.log(`BMW ${this.model}: *Натискаємо кнопку Start/Stop*`);
        console.log("Двигун запущено з характерним звуком BMW");
    }
    getMaxSpeed() {
        // Максимальна швидкість залежить від моделі
        if (this.model.includes("M")) {
            return 250; // M-серія з обмежувачем
        }
        return 210 + (this.engineVolume * 10); // базова формула
    }
    getFuelConsumption() {
        // Витрата палива залежить від об'єму двигуна та приводу
        let consumption = 5 + (this.engineVolume * 2);
        if (this.xDrive) {
            consumption += 1.5; // повний привід споживає більше
        }
        return consumption;
    }
    // Власний метод для активації спортивного режиму
    activateSportMode() {
        this.sportMode = true;
        console.log("Sport Mode активовано! Підвіска стала жорсткішою, двигун агресивнішим");
    }
    // Метод для виведення всіх властивостей
    displayFullInfo() {
        console.log("\n=== BMW " + this.model + " ===");
        console.log("Базова інформація: " + this.getBasicInfo());
        console.log(`Серія: ${this.series}`);
        console.log(`Колір: ${this.color}`);
        console.log(`Об'єм двигуна: ${this.engineVolume}L`);
        console.log(`Повний привід (xDrive): ${this.xDrive ? "Так" : "Ні"}`);
        console.log(`Максимальна швидкість: ${this.getMaxSpeed()} км/год`);
        console.log(`Витрата палива: ${this.getFuelConsumption()} л/100км`);
        console.log(`Ціна: $${this.price.toLocaleString()}`);
        console.log(`Пробіг: ${this.getMileage()} км`);
        console.log(`Поточна вартість: $${this.getCurrentValue().toLocaleString()}`);
        console.log(`VIN: ${this.getVin().substring(0, 5)}***`); // Показуємо частково для безпеки
    }
}
// Похідний клас Mercedes
class Mercedes extends Car {
    constructor(model, year, engineVolume, vin, color, price, classType, airmaticSuspension = false, amgPackage = false) {
        super("Mercedes-Benz", model, year, engineVolume, vin, color, price);
        this.classType = classType;
        this.airmaticSuspension = airmaticSuspension;
        this.amgPackage = amgPackage;
    }
    startEngine() {
        console.log(`Mercedes-Benz ${this.model}: *Повертаємо ключ запалювання*`);
        console.log("Двигун запущено майже безшумно");
        if (this.amgPackage) {
            console.log("AMG вихлоп гарчить!");
        }
    }
    getMaxSpeed() {
        if (this.amgPackage) {
            return 280; // AMG версії швидші
        }
        return 200 + (this.engineVolume * 12);
    }
    getFuelConsumption() {
        let consumption = 6 + (this.engineVolume * 1.8);
        if (this.amgPackage) {
            consumption += 3; // AMG споживає більше
        }
        return consumption;
    }
    // Власний метод для активації режиму комфорт
    activateComfortMode() {
        if (this.airmaticSuspension) {
            console.log("AIRMATIC підвіска переведена в режим Comfort");
            console.log("Тепер ви пливете по дорозі!");
        }
        else {
            console.log("Режим Comfort активовано");
        }
    }
    displayFullInfo() {
        console.log("\n=== Mercedes-Benz " + this.model + " ===");
        console.log("Базова інформація: " + this.getBasicInfo());
        console.log(`Клас: ${this.classType}`);
        console.log(`Колір: ${this.color}`);
        console.log(`Об'єм двигуна: ${this.engineVolume}L`);
        console.log(`AIRMATIC підвіска: ${this.airmaticSuspension ? "Так" : "Ні"}`);
        console.log(`AMG пакет: ${this.amgPackage ? "Так" : "Ні"}`);
        console.log(`Максимальна швидкість: ${this.getMaxSpeed()} км/год`);
        console.log(`Витрата палива: ${this.getFuelConsumption()} л/100км`);
        console.log(`Ціна: $${this.price.toLocaleString()}`);
        console.log(`Пробіг: ${this.getMileage()} км`);
        console.log(`Поточна вартість: $${this.getCurrentValue().toLocaleString()}`);
        console.log(`VIN: ${this.getVin().substring(0, 5)}***`);
    }
}
// Похідний клас Toyota
class Toyota extends Car {
    constructor(model, year, engineVolume, vin, color, price, hybrid = false, reliability = 9) {
        super("Toyota", model, year, engineVolume, vin, color, price);
        this.ecoMode = true;
        this.hybrid = hybrid;
        this.reliability = reliability;
    }
    startEngine() {
        if (this.hybrid) {
            console.log(`Toyota ${this.model}: *Натискаємо кнопку Power*`);
            console.log("Гібридна система активована. Працює на електриці");
        }
        else {
            console.log(`Toyota ${this.model}: *Повертаємо ключ*`);
            console.log("Двигун запущено надійно і тихо");
        }
    }
    getMaxSpeed() {
        // Toyota зазвичай не орієнтована на максимальну швидкість
        if (this.model === "Supra") {
            return 250;
        }
        return 180 + (this.engineVolume * 8);
    }
    getFuelConsumption() {
        let consumption = 5.5 + (this.engineVolume * 1.5);
        if (this.hybrid) {
            consumption *= 0.6; // гібриди економніші на 40%
        }
        if (this.ecoMode) {
            consumption *= 0.9; // еко-режим економить 10%
        }
        return consumption;
    }
    // Власний метод для активації еко-режиму
    toggleEcoMode() {
        this.ecoMode = !this.ecoMode;
        console.log(`ECO Mode ${this.ecoMode ? "увімкнено" : "вимкнено"}`);
        if (this.ecoMode) {
            console.log("Витрата палива оптимізована");
        }
    }
    // Метод для перевірки надійності
    checkReliability() {
        console.log(`Рейтинг надійності: ${this.reliability}/10`);
        if (this.reliability >= 9) {
            console.log("Цей автомобіль прослужить вам десятиліття!");
        }
    }
    displayFullInfo() {
        console.log("\n=== Toyota " + this.model + " ===");
        console.log("Базова інформація: " + this.getBasicInfo());
        console.log(`Колір: ${this.color}`);
        console.log(`Об'єм двигуна: ${this.engineVolume}L`);
        console.log(`Гібрид: ${this.hybrid ? "Так" : "Ні"}`);
        console.log(`Рейтинг надійності: ${this.reliability}/10`);
        console.log(`ECO режим: ${this.ecoMode ? "Увімкнено" : "Вимкнено"}`);
        console.log(`Максимальна швидкість: ${this.getMaxSpeed()} км/год`);
        console.log(`Витрата палива: ${this.getFuelConsumption().toFixed(1)} л/100км`);
        console.log(`Ціна: $${this.price.toLocaleString()}`);
        console.log(`Пробіг: ${this.getMileage()} км`);
        console.log(`Поточна вартість: $${this.getCurrentValue().toLocaleString()}`);
        console.log(`VIN: ${this.getVin().substring(0, 5)}***`);
    }
}
// ============= СТВОРЕННЯ ЕКЗЕМПЛЯРІВ ТА ДЕМОНСТРАЦІЯ =============
console.log("========== АВТОСАЛОН ==========");
// Створюємо екземпляри BMW
const bmwX5 = new BMW("X5 40i", 2024, 3.0, "WBA5J7C05RG123456", "Space Grey", 75000, 5, true);
const bmw330i = new BMW("330i", 2023, 2.0, "WBA5J7C05RG654321", "Alpine White", 45000, 3, false);
const bmwM5 = new BMW("M5 Competition", 2024, 4.4, "WBA5J7C05RG789012", "Marina Bay Blue", 110000, 5, true);
// Створюємо екземпляри Mercedes
const mercedesS500 = new Mercedes("S500", 2024, 3.0, "WDD2220561A123456", "Obsidian Black", 120000, "S-Class", true, false);
const mercedesGLE = new Mercedes("GLE 450", 2023, 3.0, "WDD2220561A654321", "Polar White", 85000, "GLE-Class", true, false);
const mercedesC63AMG = new Mercedes("C63 AMG", 2024, 4.0, "WDD2220561A789012", "Selenite Grey", 95000, "C-Class", false, true);
// Створюємо екземпляри Toyota
const camryHybrid = new Toyota("Camry Hybrid", 2024, 2.5, "4T1B11HK5JU123456", "Pearl White", 35000, true, 10);
const rav4 = new Toyota("RAV4", 2023, 2.5, "4T1B11HK5JU654321", "Magnetic Grey", 38000, false, 9);
const supra = new Toyota("Supra", 2024, 3.0, "4T1B11HK5JU789012", "Renaissance Red", 55000, false, 8);
// Демонструємо роботу з BMW
console.log("\n========== BMW ==========");
bmwX5.displayFullInfo();
bmwX5.startEngine();
bmwX5.activateSportMode();
bmwX5.drive(150);
console.log(`Пробіг після поїздки: ${bmwX5.getMileage()} км`);
console.log("\n--- BMW 330i ---");
bmw330i.displayFullInfo();
bmw330i.startEngine();
console.log("\n--- BMW M5 Competition ---");
bmwM5.displayFullInfo();
// Демонструємо роботу з Mercedes
console.log("\n========== MERCEDES-BENZ ==========");
mercedesS500.displayFullInfo();
mercedesS500.startEngine();
mercedesS500.activateComfortMode();
mercedesS500.drive(200);
console.log("\n--- Mercedes GLE 450 ---");
mercedesGLE.displayFullInfo();
console.log("\n--- Mercedes C63 AMG ---");
mercedesC63AMG.displayFullInfo();
mercedesC63AMG.startEngine();
// Демонструємо роботу з Toyota
console.log("\n========== TOYOTA ==========");
camryHybrid.displayFullInfo();
camryHybrid.startEngine();
camryHybrid.checkReliability();
camryHybrid.drive(500);
console.log(`Економія палива на 500 км: ${(500 * camryHybrid.getFuelConsumption() / 100).toFixed(1)} літрів`);
console.log("\n--- Toyota RAV4 ---");
rav4.displayFullInfo();
rav4.toggleEcoMode(); // Вимикаємо еко-режим
console.log(`Витрата після вимкнення ECO: ${rav4.getFuelConsumption().toFixed(1)} л/100км`);
console.log("\n--- Toyota Supra ---");
supra.displayFullInfo();
supra.startEngine();
// Порівняння автомобілів
console.log("\n========== ПОРІВНЯННЯ ==========");
const cars = [bmwX5, mercedesS500, camryHybrid];
cars.forEach(car => {
    console.log(`${car.brand} ${car.model}:`);
    console.log(`  Макс. швидкість: ${car.getMaxSpeed()} км/год`);
    console.log(`  Витрата палива: ${car.getFuelConsumption().toFixed(1)} л/100км`);
    console.log(`  Поточна вартість: $${car.getCurrentValue().toLocaleString()}`);
});
// Демонстрація поліморфізму
console.log("\n========== ПОЛІМОРФІЗМ ==========");
function testDrive(car) {
    console.log(`\nТест-драйв ${car.brand} ${car.model}:`);
    car.startEngine();
    car.drive(50);
    console.log(`Витрата на тест-драйв: ${(50 * car.getFuelConsumption() / 100).toFixed(1)} літрів`);
}
testDrive(bmw330i);
testDrive(mercedesGLE);
testDrive(rav4);
