interface Animal {
    // Обов'язкові властивості 
    name: string;
    age: number;
    species: string;
    
    // Опціональні властивості 
    numberOfLegs?: number;      // У риб немає ніг
    canFly?: boolean;           // Тільки деякі птахи літають
    canSwim?: boolean;          // Не всі тварини плавають
    furColor?: string;          // У риб немає хутра
    wingspan?: number;          // Тільки у птахів
    habitat?: string;           // Середовище проживання
    
    // Методи 
    move(): void;
    makeSound(): void;
    eat(food: string): void;
    sleep(): void;
}


class Cat implements Animal {
    name: string;
    age: number;
    species: string;
    numberOfLegs?: number;
    canSwim?: boolean;
    furColor?: string;
    
    constructor(name: string, age: number, furColor: string = "сірий") {
        this.name = name;
        this.age = age;
        this.species = "Felis catus";
        this.numberOfLegs = 4;
        this.canSwim = false; 
        this.furColor = furColor;
    }
    
    move(): void {
        console.log(`${this.name} граційно крокує на своїх ${this.numberOfLegs} лапах`);
    }
    
    makeSound(): void {
        console.log(`${this.name} муркоче: "Мяу-мяу!"`);
    }
    
    eat(food: string): void {
        console.log(`${this.name} їсть ${food} та облизується`);
    }
    
    sleep(): void {
        console.log(`${this.name} згорнувся клубочком і спить`);
    }
    
    // Додатковий метод
    purr(): void {
        console.log(`${this.name} муркоче від задоволення`);
    }
}


class Bird implements Animal {
    name: string;
    age: number;
    species: string;
    numberOfLegs?: number;
    canFly?: boolean;
    wingspan?: number;
    habitat?: string;
    
    constructor(
        name: string, 
        age: number, 
        species: string, 
        canFly: boolean = true,
        wingspan?: number
    ) {
        this.name = name;
        this.age = age;
        this.species = species;
        this.numberOfLegs = 2;
        this.canFly = canFly;
        this.wingspan = wingspan;
        this.habitat = "повітря/дерева";
    }
    
    move(): void {
        if (this.canFly) {
            console.log(`${this.name} летить, розправивши крила на ${this.wingspan || "невідому"} відстань`);
        } else {
            console.log(`${this.name} ходить на своїх ${this.numberOfLegs} ногах`);
        }
    }
    
    makeSound(): void {
        if (this.species === "Corvus") {
            console.log(`${this.name} каркає: "Кар-кар!"`);
        } else if (this.species === "Passer") {
            console.log(`${this.name} цвірінькає: "Чик-чирик!"`);
        } else {
            console.log(`${this.name} співає свою пісню`);
        }
    }
    
    eat(food: string): void {
        console.log(`${this.name} клює ${food}`);
    }
    
    sleep(): void {
        console.log(`${this.name} спить на гілці, сховавши голову під крило`);
    }
    
    // Додатковий метод
    buildNest(): void {
        console.log(`${this.name} будує гніздо`);
    }
}


class Fish implements Animal {
    name: string;
    age: number;
    species: string;
    canSwim?: boolean;
    habitat?: string;
    private waterType: "солона" | "прісна";
    
    constructor(
        name: string, 
        age: number, 
        species: string,
        waterType: "солона" | "прісна" = "прісна"
    ) {
        this.name = name;
        this.age = age;
        this.species = species;
        this.canSwim = true;
        this.habitat = "вода";
        this.waterType = waterType;
        
    }
    
    move(): void {
        console.log(`${this.name} плаває у ${this.waterType} воді, використовуючи свої плавники`);
    }
    
    makeSound(): void {
        console.log(`${this.name} мовчить (риби не видають звуків)`);
    }
    
    eat(food: string): void {
        console.log(`${this.name} ковтає ${food}`);
    }
    
    sleep(): void {
        console.log(`${this.name} завмирає у воді з відкритими очима`);
    }
    
    // Додатковий метод
    blowBubbles(): void {
        console.log(`${this.name} випускає бульбашки`);
    }
}


console.log("=== Демонстрація роботи класів ===\n");


const myCat = new Cat("Мурчик", 3, "рудий");
const myBird = new Bird("Кеша", 2, "Corvus", true, 50);
const myPenguin = new Bird("Пінгі", 5, "Spheniscidae", false); 
const myFish = new Fish("Немо", 1, "Amphiprion", "солона");


console.log("--- Кіт ---");
myCat.move();
myCat.makeSound();
myCat.eat("рибу");
myCat.purr();
console.log(`Вік: ${myCat.age} років, Колір: ${myCat.furColor}`);

console.log("\n--- Птах (ворона) ---");
myBird.move();
myBird.makeSound();
myBird.eat("зерно");
myBird.buildNest();

console.log("\n--- Птах (пінгвін) ---");
myPenguin.move();
myPenguin.makeSound();
console.log(`Чи може літати: ${myPenguin.canFly ? "так" : "ні"}`);

console.log("\n--- Риба ---");
myFish.move();
myFish.makeSound();
myFish.eat("водорості");
myFish.blowBubbles();
console.log(`Середовище: ${myFish.habitat}`);

console.log("\n=== Опціональні властивості ===");
console.log(`${myCat.name} має ${myCat.numberOfLegs} лапи`);
console.log(`${myBird.name} має розмах крил: ${myBird.wingspan} см`);
console.log(`${myFish.name} має ніг:  "немає"`);
console.log(`${myFish.name} має хутро: ${(myFish as any).furColor || "немає"}`);
