interface Shape {
    getArea(): number;
    getPerimeter(): number;
    scale(factor: number): void; 
}

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
    
    scale(factor: number): void {
        this.width *= factor;
        this.height *= factor;
        console.log(`Прямокутник масштабовано в ${factor} разів. Нові розміри: ${this.width}x${this.height}`);
    }
}

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
    
    scale(factor: number): void {
        this.radius *= factor;
        console.log(`Коло масштабовано в ${factor} разів. Новий радіус: ${this.radius}`);
    }
}

class Triangle implements Shape {
    sideA: number;
    sideB: number;
    sideC: number;
    
    constructor(sideA: number, sideB: number, sideC: number) {
        if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
            throw new Error("Трикутник з такими сторонами не може існувати!");
        }
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
    }   
    
    getArea(): number {
        // Формула Герона 
        const s = (this.sideA + this.sideB + this.sideC) / 2;
        return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
    }
    
    getPerimeter(): number {
        return this.sideA + this.sideB + this.sideC;
    }
    
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


console.log("=== Створення фігур ===\n");

const rectangle = new Rectangle(10, 5);
const circle = new Circle(7);
const triangle = new Triangle(3, 4, 5); 

console.log("Початкові розміри фігур:");
printShapeInfo(rectangle, "Прямокутник (10x5)");
printShapeInfo(circle, "Коло (радіус 7)");
printShapeInfo(triangle, "Трикутник (3, 4, 5)");

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

const totalArea = calculateTotalArea(shapes);
const totalPerimeter = calculateTotalPerimeter(shapes);

console.log(`\nЗагальна площа всіх фігур: ${totalArea.toFixed(2)}`);
console.log(`Загальний периметр всіх фігур: ${totalPerimeter.toFixed(2)}`);

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

