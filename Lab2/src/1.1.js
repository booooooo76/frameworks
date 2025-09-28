// Клас Cat (Кіт)
var Cat = /** @class */ (function () {
    function Cat(name, age, furColor) {
        if (furColor === void 0) { furColor = "сірий"; }
        this.name = name;
        this.age = age;
        this.species = "Felis catus";
        this.numberOfLegs = 4;
        this.canSwim = false; // Коти зазвичай не люблять воду
        this.furColor = furColor;
    }
    Cat.prototype.move = function () {
        console.log("".concat(this.name, " \u0433\u0440\u0430\u0446\u0456\u0439\u043D\u043E \u043A\u0440\u043E\u043A\u0443\u0454 \u043D\u0430 \u0441\u0432\u043E\u0457\u0445 ").concat(this.numberOfLegs, " \u043B\u0430\u043F\u0430\u0445"));
    };
    Cat.prototype.makeSound = function () {
        console.log("".concat(this.name, " \u043C\u0443\u0440\u043A\u043E\u0447\u0435: \"\u041C\u044F\u0443-\u043C\u044F\u0443!\""));
    };
    Cat.prototype.eat = function (food) {
        console.log("".concat(this.name, " \u0457\u0441\u0442\u044C ").concat(food, " \u0442\u0430 \u043E\u0431\u043B\u0438\u0437\u0443\u0454\u0442\u044C\u0441\u044F"));
    };
    Cat.prototype.sleep = function () {
        console.log("".concat(this.name, " \u0437\u0433\u043E\u0440\u043D\u0443\u0432\u0441\u044F \u043A\u043B\u0443\u0431\u043E\u0447\u043A\u043E\u043C \u0456 \u0441\u043F\u0438\u0442\u044C"));
    };
    // Додатковий метод специфічний для котів
    Cat.prototype.purr = function () {
        console.log("".concat(this.name, " \u043C\u0443\u0440\u043A\u043E\u0447\u0435 \u0432\u0456\u0434 \u0437\u0430\u0434\u043E\u0432\u043E\u043B\u0435\u043D\u043D\u044F"));
    };
    return Cat;
}());
// Клас Bird (Птах)
var Bird = /** @class */ (function () {
    function Bird(name, age, species, canFly, wingspan) {
        if (canFly === void 0) { canFly = true; }
        this.name = name;
        this.age = age;
        this.species = species;
        this.numberOfLegs = 2;
        this.canFly = canFly;
        this.wingspan = wingspan;
        this.habitat = "повітря/дерева";
    }
    Bird.prototype.move = function () {
        if (this.canFly) {
            console.log("".concat(this.name, " \u043B\u0435\u0442\u0438\u0442\u044C, \u0440\u043E\u0437\u043F\u0440\u0430\u0432\u0438\u0432\u0448\u0438 \u043A\u0440\u0438\u043B\u0430 \u043D\u0430 ").concat(this.wingspan || "невідому", " \u0432\u0456\u0434\u0441\u0442\u0430\u043D\u044C"));
        }
        else {
            console.log("".concat(this.name, " \u0445\u043E\u0434\u0438\u0442\u044C \u043D\u0430 \u0441\u0432\u043E\u0457\u0445 ").concat(this.numberOfLegs, " \u043D\u043E\u0433\u0430\u0445"));
        }
    };
    Bird.prototype.makeSound = function () {
        if (this.species === "Corvus") {
            console.log("".concat(this.name, " \u043A\u0430\u0440\u043A\u0430\u0454: \"\u041A\u0430\u0440-\u043A\u0430\u0440!\""));
        }
        else if (this.species === "Passer") {
            console.log("".concat(this.name, " \u0446\u0432\u0456\u0440\u0456\u043D\u044C\u043A\u0430\u0454: \"\u0427\u0438\u043A-\u0447\u0438\u0440\u0438\u043A!\""));
        }
        else {
            console.log("".concat(this.name, " \u0441\u043F\u0456\u0432\u0430\u0454 \u0441\u0432\u043E\u044E \u043F\u0456\u0441\u043D\u044E"));
        }
    };
    Bird.prototype.eat = function (food) {
        console.log("".concat(this.name, " \u043A\u043B\u044E\u0454 ").concat(food));
    };
    Bird.prototype.sleep = function () {
        console.log("".concat(this.name, " \u0441\u043F\u0438\u0442\u044C \u043D\u0430 \u0433\u0456\u043B\u0446\u0456, \u0441\u0445\u043E\u0432\u0430\u0432\u0448\u0438 \u0433\u043E\u043B\u043E\u0432\u0443 \u043F\u0456\u0434 \u043A\u0440\u0438\u043B\u043E"));
    };
    // Додатковий метод для птахів
    Bird.prototype.buildNest = function () {
        console.log("".concat(this.name, " \u0431\u0443\u0434\u0443\u0454 \u0433\u043D\u0456\u0437\u0434\u043E"));
    };
    return Bird;
}());
// Клас Fish (Риба)
var Fish = /** @class */ (function () {
    function Fish(name, age, species, waterType) {
        if (waterType === void 0) { waterType = "прісна"; }
        this.name = name;
        this.age = age;
        this.species = species;
        this.canSwim = true;
        this.habitat = "вода";
        this.waterType = waterType;
        // Зверніть увагу: numberOfLegs не визначено, бо у риб немає ніг
        // furColor також не визначено - у риб немає хутра
    }
    Fish.prototype.move = function () {
        console.log("".concat(this.name, " \u043F\u043B\u0430\u0432\u0430\u0454 \u0443 ").concat(this.waterType, " \u0432\u043E\u0434\u0456, \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u044E\u0447\u0438 \u0441\u0432\u043E\u0457 \u043F\u043B\u0430\u0432\u043D\u0438\u043A\u0438"));
    };
    Fish.prototype.makeSound = function () {
        console.log("".concat(this.name, " \u043C\u043E\u0432\u0447\u0438\u0442\u044C (\u0440\u0438\u0431\u0438 \u043D\u0435 \u0432\u0438\u0434\u0430\u044E\u0442\u044C \u0437\u0432\u0443\u043A\u0456\u0432)"));
    };
    Fish.prototype.eat = function (food) {
        console.log("".concat(this.name, " \u043A\u043E\u0432\u0442\u0430\u0454 ").concat(food));
    };
    Fish.prototype.sleep = function () {
        console.log("".concat(this.name, " \u0437\u0430\u0432\u043C\u0438\u0440\u0430\u0454 \u0443 \u0432\u043E\u0434\u0456 \u0437 \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0438\u043C\u0438 \u043E\u0447\u0438\u043C\u0430"));
    };
    // Додатковий метод для риб
    Fish.prototype.blowBubbles = function () {
        console.log("".concat(this.name, " \u0432\u0438\u043F\u0443\u0441\u043A\u0430\u0454 \u0431\u0443\u043B\u044C\u0431\u0430\u0448\u043A\u0438"));
    };
    return Fish;
}());
// Приклад використання
console.log("=== Демонстрація роботи класів ===\n");
// Створюємо екземпляри тварин
var myCat = new Cat("Мурчик", 3, "рудий");
var myBird = new Bird("Кеша", 2, "Corvus", true, 50);
var myPenguin = new Bird("Пінгі", 5, "Spheniscidae", false); // Пінгвін не літає
var myFish = new Fish("Немо", 1, "Amphiprion", "солона");
// Демонструємо роботу методів
console.log("--- Кіт ---");
myCat.move();
myCat.makeSound();
myCat.eat("рибу");
myCat.purr();
console.log("\u0412\u0456\u043A: ".concat(myCat.age, " \u0440\u043E\u043A\u0456\u0432, \u041A\u043E\u043B\u0456\u0440: ").concat(myCat.furColor));
console.log("\n--- Птах (ворона) ---");
myBird.move();
myBird.makeSound();
myBird.eat("зерно");
myBird.buildNest();
console.log("\n--- Птах (пінгвін) ---");
myPenguin.move();
myPenguin.makeSound();
console.log("\u0427\u0438 \u043C\u043E\u0436\u0435 \u043B\u0456\u0442\u0430\u0442\u0438: ".concat(myPenguin.canFly ? "так" : "ні"));
console.log("\n--- Риба ---");
myFish.move();
myFish.makeSound();
myFish.eat("водорості");
myFish.blowBubbles();
console.log("\u0421\u0435\u0440\u0435\u0434\u043E\u0432\u0438\u0449\u0435: ".concat(myFish.habitat));
// Демонстрація опціональних властивостей
console.log("\n=== Опціональні властивості ===");
console.log("".concat(myCat.name, " \u043C\u0430\u0454 ").concat(myCat.numberOfLegs, " \u043B\u0430\u043F\u0438"));
console.log("".concat(myBird.name, " \u043C\u0430\u0454 \u0440\u043E\u0437\u043C\u0430\u0445 \u043A\u0440\u0438\u043B: ").concat(myBird.wingspan, " \u0441\u043C"));
console.log("".concat(myFish.name, " \u043C\u0430\u0454 \u043D\u0456\u0433:  \"\u043D\u0435\u043C\u0430\u0454\""));
console.log("".concat(myFish.name, " \u043C\u0430\u0454 \u0445\u0443\u0442\u0440\u043E: ").concat(myFish.furColor || "немає"));
// Функція для перевірки, чи може тварина плавати
function checkSwimming(animal) {
    if (animal.canSwim !== undefined) {
        console.log("".concat(animal.name, " ").concat(animal.canSwim ? "вміє" : "не вміє", " \u043F\u043B\u0430\u0432\u0430\u0442\u0438"));
    }
    else {
        console.log("\u041D\u0435\u0432\u0456\u0434\u043E\u043C\u043E, \u0447\u0438 ".concat(animal.name, " \u0432\u043C\u0456\u0454 \u043F\u043B\u0430\u0432\u0430\u0442\u0438"));
    }
}
console.log("\n=== Перевірка здатності плавати ===");
checkSwimming(myCat);
checkSwimming(myFish);
checkSwimming(myBird);
