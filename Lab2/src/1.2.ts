// Інтерфейс Shape з методами для обчислення площі та периметру
interface Shape {
    getArea(): number;
    getPerimeter(): number;
    scale(factor: number): void; // Додаємо метод scale до інтерфейсу
}

// Клас Rectangle (Прямокутник)
class Rectangle implements Shape {
    width: number;
    height: number;
    
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }       
    
    getArea(): number {
        return this.width * this.height;
    }   
    
    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }
    
    // Метод для масштабування прямокутника
    scale(factor: number): void {
        this.width *= factor;
        this.height *= factor;
        console.log(`Прямокутник масштабовано в ${factor} разів. Нові розміри: ${this.width}x${this.height}`);
    }
}

// Клас Circle (Коло)
class Circle implements Shape {
    radius: number;     

    constructor(radius: number) {
        this.radius = radius;
    }
    
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }   
    
    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
    
    // Метод для масштабування кола
    scale(factor: number): void {
        this.radius *= factor;
        console.log(`Коло масштабовано в ${factor} разів. Новий радіус: ${this.radius}`);
    }
}

// Клас Triangle (Трикутник)
class Triangle implements Shape {
    sideA: number;
    sideB: number;
    sideC: number;
    
    constructor(sideA: number, sideB: number, sideC: number) {
        // Перевірка на можливість існування трикутника
        if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
            throw new Error("Трикутник з такими сторонами не може існувати!");
        }
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
    }   
    
    getArea(): number {
        // Формула Герона для обчислення площі трикутника
        const s = (this.sideA + this.sideB + this.sideC) / 2;
        return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
    }
    
    getPerimeter(): number {
        return this.sideA + this.sideB + this.sideC;
    }
    
    // Метод для масштабування трикутника
    scale(factor: number): void {
        this.sideA *= factor;
        this.sideB *= factor;
        this.sideC *= factor;
        console.log(`Трикутник масштабовано в ${factor} разів. Нові сторони: ${this.sideA}, ${this.sideB}, ${this.sideC}`);
    }
}

// Функція для обчислення загальної площі всіх фігур
function calculateTotalArea(shapes: Shape[]): number {
    return shapes.reduce((total, shape) => total + shape.getArea(), 0);
}

// Функція для обчислення загального периметру всіх фігур
function calculateTotalPerimeter(shapes: Shape[]): number {
    return shapes.reduce((total, shape) => total + shape.getPerimeter(), 0);
}

// Функція для виведення інформації про фігуру
function printShapeInfo(shape: Shape, name: string): void {
    console.log(`${name}:`);
    console.log(`  Площа: ${shape.getArea().toFixed(2)}`);
    console.log(`  Периметр: ${shape.getPerimeter().toFixed(2)}`);
}

// ============= ДЕМОНСТРАЦІЯ РОБОТИ =============

console.log("=== Створення фігур ===\n");

// Створюємо різні фігури
const rectangle = new Rectangle(10, 5);
const circle = new Circle(7);
const triangle = new Triangle(3, 4, 5); // Прямокутний трикутник

// Виводимо початкову інформацію про фігури
console.log("Початкові розміри фігур:");
printShapeInfo(rectangle, "Прямокутник (10x5)");
printShapeInfo(circle, "Коло (радіус 7)");
printShapeInfo(triangle, "Трикутник (3, 4, 5)");

// Створюємо масив фігур
const shapes: Shape[] = [
    rectangle,
    circle,
    triangle,
    new Rectangle(8, 3),
    new Circle(4),
    new Triangle(6, 8, 10)
];

console.log("\n=== Масив з усіма фігурами ===");
console.log(`Кількість фігур у масиві: ${shapes.length}`);

// Обчислюємо загальну площу та периметр
const totalArea = calculateTotalArea(shapes);
const totalPerimeter = calculateTotalPerimeter(shapes);

console.log(`\nЗагальна площа всіх фігур: ${totalArea.toFixed(2)}`);
console.log(`Загальний периметр всіх фігур: ${totalPerimeter.toFixed(2)}`);

// Демонстрація масштабування
console.log("\n=== Масштабування фігур ===\n");

console.log("Масштабуємо перший прямокутник в 2 рази:");
rectangle.scale(2);
console.log(`Нова площа: ${rectangle.getArea()}`);
console.log(`Новий периметр: ${rectangle.getPerimeter()}`);

console.log("\nМасштабуємо коло в 0.5 рази (зменшуємо вдвічі):");
circle.scale(0.5);
console.log(`Нова площа: ${circle.getArea().toFixed(2)}`);
console.log(`Новий периметр: ${circle.getPerimeter().toFixed(2)}`);

console.log("\nМасштабуємо трикутник в 3 рази:");
triangle.scale(3);
console.log(`Нова площа: ${triangle.getArea().toFixed(2)}`);
console.log(`Новий периметр: ${triangle.getPerimeter()}`);

// Перераховуємо загальні значення після масштабування
console.log("\n=== Після масштабування ===");
const newTotalArea = calculateTotalArea(shapes);
const newTotalPerimeter = calculateTotalPerimeter(shapes);

console.log(`Нова загальна площа всіх фігур: ${newTotalArea.toFixed(2)}`);
console.log(`Новий загальний периметр всіх фігур: ${newTotalPerimeter.toFixed(2)}`);

// Додатковий приклад: пошук найбільшої фігури
console.log("\n=== Додаткові функції ===");

function findLargestShape(shapes: Shape[]): Shape | null {
    if (shapes.length === 0) return null;
    
    return shapes.reduce((largest, current) => 
        current.getArea() > largest.getArea() ? current : largest
    );
}

const largestShape = findLargestShape(shapes);
if (largestShape) {
    const index = shapes.indexOf(largestShape);
    console.log(`Найбільша фігура за площею - це фігура №${index + 1} з площею ${largestShape.getArea().toFixed(2)}`);
}

// Фільтрація фігур за площею
const largeShapes = shapes.filter(shape => shape.getArea() > 50);
console.log(`\nКількість фігур з площею більше 50: ${largeShapes.length}`);