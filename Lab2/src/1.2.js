// Клас Rectangle (Прямокутник)
var Rectangle = /** @class */ (function () {
    function Rectangle(width, height) {
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.getArea = function () {
        return this.width * this.height;
    };
    Rectangle.prototype.getPerimeter = function () {
        return 2 * (this.width + this.height);
    };
    // Метод для масштабування прямокутника
    Rectangle.prototype.scale = function (factor) {
        this.width *= factor;
        this.height *= factor;
        console.log("\u041F\u0440\u044F\u043C\u043E\u043A\u0443\u0442\u043D\u0438\u043A \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u043E\u0432\u0430\u043D\u043E \u0432 ".concat(factor, " \u0440\u0430\u0437\u0456\u0432. \u041D\u043E\u0432\u0456 \u0440\u043E\u0437\u043C\u0456\u0440\u0438: ").concat(this.width, "x").concat(this.height));
    };
    return Rectangle;
}());
// Клас Circle (Коло)
var Circle = /** @class */ (function () {
    function Circle(radius) {
        this.radius = radius;
    }
    Circle.prototype.getArea = function () {
        return Math.PI * this.radius * this.radius;
    };
    Circle.prototype.getPerimeter = function () {
        return 2 * Math.PI * this.radius;
    };
    // Метод для масштабування кола
    Circle.prototype.scale = function (factor) {
        this.radius *= factor;
        console.log("\u041A\u043E\u043B\u043E \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u043E\u0432\u0430\u043D\u043E \u0432 ".concat(factor, " \u0440\u0430\u0437\u0456\u0432. \u041D\u043E\u0432\u0438\u0439 \u0440\u0430\u0434\u0456\u0443\u0441: ").concat(this.radius));
    };
    return Circle;
}());
// Клас Triangle (Трикутник)
var Triangle = /** @class */ (function () {
    function Triangle(sideA, sideB, sideC) {
        // Перевірка на можливість існування трикутника
        if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
            throw new Error("Трикутник з такими сторонами не може існувати!");
        }
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
    }
    Triangle.prototype.getArea = function () {
        // Формула Герона для обчислення площі трикутника
        var s = (this.sideA + this.sideB + this.sideC) / 2;
        return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
    };
    Triangle.prototype.getPerimeter = function () {
        return this.sideA + this.sideB + this.sideC;
    };
    // Метод для масштабування трикутника
    Triangle.prototype.scale = function (factor) {
        this.sideA *= factor;
        this.sideB *= factor;
        this.sideC *= factor;
        console.log("\u0422\u0440\u0438\u043A\u0443\u0442\u043D\u0438\u043A \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u043E\u0432\u0430\u043D\u043E \u0432 ".concat(factor, " \u0440\u0430\u0437\u0456\u0432. \u041D\u043E\u0432\u0456 \u0441\u0442\u043E\u0440\u043E\u043D\u0438: ").concat(this.sideA, ", ").concat(this.sideB, ", ").concat(this.sideC));
    };
    return Triangle;
}());
// Функція для обчислення загальної площі всіх фігур
function calculateTotalArea(shapes) {
    return shapes.reduce(function (total, shape) { return total + shape.getArea(); }, 0);
}
// Функція для обчислення загального периметру всіх фігур
function calculateTotalPerimeter(shapes) {
    return shapes.reduce(function (total, shape) { return total + shape.getPerimeter(); }, 0);
}
// Функція для виведення інформації про фігуру
function printShapeInfo(shape, name) {
    console.log("".concat(name, ":"));
    console.log("  \u041F\u043B\u043E\u0449\u0430: ".concat(shape.getArea().toFixed(2)));
    console.log("  \u041F\u0435\u0440\u0438\u043C\u0435\u0442\u0440: ".concat(shape.getPerimeter().toFixed(2)));
}
// ============= ДЕМОНСТРАЦІЯ РОБОТИ =============
console.log("=== Створення фігур ===\n");
// Створюємо різні фігури
var rectangle = new Rectangle(10, 5);
var circle = new Circle(7);
var triangle = new Triangle(3, 4, 5); // Прямокутний трикутник
// Виводимо початкову інформацію про фігури
console.log("Початкові розміри фігур:");
printShapeInfo(rectangle, "Прямокутник (10x5)");
printShapeInfo(circle, "Коло (радіус 7)");
printShapeInfo(triangle, "Трикутник (3, 4, 5)");
// Створюємо масив фігур
var shapes = [
    rectangle,
    circle,
    triangle,
    new Rectangle(8, 3),
    new Circle(4),
    new Triangle(6, 8, 10)
];
console.log("\n=== Масив з усіма фігурами ===");
console.log("\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u0444\u0456\u0433\u0443\u0440 \u0443 \u043C\u0430\u0441\u0438\u0432\u0456: ".concat(shapes.length));
// Обчислюємо загальну площу та периметр
var totalArea = calculateTotalArea(shapes);
var totalPerimeter = calculateTotalPerimeter(shapes);
console.log("\n\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0430 \u043F\u043B\u043E\u0449\u0430 \u0432\u0441\u0456\u0445 \u0444\u0456\u0433\u0443\u0440: ".concat(totalArea.toFixed(2)));
console.log("\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0438\u0439 \u043F\u0435\u0440\u0438\u043C\u0435\u0442\u0440 \u0432\u0441\u0456\u0445 \u0444\u0456\u0433\u0443\u0440: ".concat(totalPerimeter.toFixed(2)));
// Демонстрація масштабування
console.log("\n=== Масштабування фігур ===\n");
console.log("Масштабуємо перший прямокутник в 2 рази:");
rectangle.scale(2);
console.log("\u041D\u043E\u0432\u0430 \u043F\u043B\u043E\u0449\u0430: ".concat(rectangle.getArea()));
console.log("\u041D\u043E\u0432\u0438\u0439 \u043F\u0435\u0440\u0438\u043C\u0435\u0442\u0440: ".concat(rectangle.getPerimeter()));
console.log("\nМасштабуємо коло в 0.5 рази (зменшуємо вдвічі):");
circle.scale(0.5);
console.log("\u041D\u043E\u0432\u0430 \u043F\u043B\u043E\u0449\u0430: ".concat(circle.getArea().toFixed(2)));
console.log("\u041D\u043E\u0432\u0438\u0439 \u043F\u0435\u0440\u0438\u043C\u0435\u0442\u0440: ".concat(circle.getPerimeter().toFixed(2)));
console.log("\nМасштабуємо трикутник в 3 рази:");
triangle.scale(3);
console.log("\u041D\u043E\u0432\u0430 \u043F\u043B\u043E\u0449\u0430: ".concat(triangle.getArea().toFixed(2)));
console.log("\u041D\u043E\u0432\u0438\u0439 \u043F\u0435\u0440\u0438\u043C\u0435\u0442\u0440: ".concat(triangle.getPerimeter()));
// Перераховуємо загальні значення після масштабування
console.log("\n=== Після масштабування ===");
var newTotalArea = calculateTotalArea(shapes);
var newTotalPerimeter = calculateTotalPerimeter(shapes);
console.log("\u041D\u043E\u0432\u0430 \u0437\u0430\u0433\u0430\u043B\u044C\u043D\u0430 \u043F\u043B\u043E\u0449\u0430 \u0432\u0441\u0456\u0445 \u0444\u0456\u0433\u0443\u0440: ".concat(newTotalArea.toFixed(2)));
console.log("\u041D\u043E\u0432\u0438\u0439 \u0437\u0430\u0433\u0430\u043B\u044C\u043D\u0438\u0439 \u043F\u0435\u0440\u0438\u043C\u0435\u0442\u0440 \u0432\u0441\u0456\u0445 \u0444\u0456\u0433\u0443\u0440: ".concat(newTotalPerimeter.toFixed(2)));
// Додатковий приклад: пошук найбільшої фігури
console.log("\n=== Додаткові функції ===");
function findLargestShape(shapes) {
    if (shapes.length === 0)
        return null;
    return shapes.reduce(function (largest, current) {
        return current.getArea() > largest.getArea() ? current : largest;
    });
}
var largestShape = findLargestShape(shapes);
if (largestShape) {
    var index = shapes.indexOf(largestShape);
    console.log("\u041D\u0430\u0439\u0431\u0456\u043B\u044C\u0448\u0430 \u0444\u0456\u0433\u0443\u0440\u0430 \u0437\u0430 \u043F\u043B\u043E\u0449\u0435\u044E - \u0446\u0435 \u0444\u0456\u0433\u0443\u0440\u0430 \u2116".concat(index + 1, " \u0437 \u043F\u043B\u043E\u0449\u0435\u044E ").concat(largestShape.getArea().toFixed(2)));
}
// Фільтрація фігур за площею
var largeShapes = shapes.filter(function (shape) { return shape.getArea() > 50; });
console.log("\n\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u0444\u0456\u0433\u0443\u0440 \u0437 \u043F\u043B\u043E\u0449\u0435\u044E \u0431\u0456\u043B\u044C\u0448\u0435 50: ".concat(largeShapes.length));
