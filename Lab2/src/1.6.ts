interface LibraryItem {
    title: string;
    author: string;
    borrow(): void;
}

class Book implements LibraryItem {
    title: string;
    author: string;
    pages: number;
    isBorrowed: boolean;
    
    constructor(title: string, author: string, pages: number) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isBorrowed = false;
    }
    
    borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`Книга "${this.title}" позичена`);
        } else {
            console.log(`Книга "${this.title}" вже позичена`);
        }
    }
}

class Magazine implements LibraryItem {
    title: string;
    author: string;
    issueNumber: number;
    isBorrowed: boolean;
    
    constructor(title: string, author: string, issueNumber: number) {
        this.title = title;
        this.author = author;
        this.issueNumber = issueNumber;
        this.isBorrowed = false;
    }
    
    borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`Журнал "${this.title}" випуск №${this.issueNumber} позичено`);
        } else {
            console.log(`Журнал "${this.title}" випуск №${this.issueNumber} вже позичено`);
        }
    }
}

class DVD implements LibraryItem {
    title: string;
    author: string; 
    duration: number; 
    isBorrowed: boolean;
    
    constructor(title: string, author: string, duration: number) {
        this.title = title;
        this.author = author;
        this.duration = duration;
        this.isBorrowed = false;
    }
    
    borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`DVD "${this.title}" позичено`);
        } else {
            console.log(`DVD "${this.title}" вже позичено`);
        }
    }
}

class Library {
    private items: LibraryItem[];
    
    constructor() {
        this.items = [];
    }
    
    addItem(item: LibraryItem): void {
        this.items.push(item);
        console.log(`"${item.title}" додано до бібліотеки`);
    }
    
    findItemByName(name: string): LibraryItem | undefined {
        return this.items.find(item => item.title === name);
    }
    
    // Метод для виведення списку доступних елементів
    displayAvailableItems(): void {
        console.log("\n===== ДОСТУПНІ ЕЛЕМЕНТИ БІБЛІОТЕКИ =====");
        let availableCount = 0;
        
        this.items.forEach((item, index) => {
            if (item instanceof Book && !item.isBorrowed) {
                console.log(`${index + 1}. Книга: "${item.title}" - ${item.author} (${item.pages} сторінок)`);
                availableCount++;
            } else if (item instanceof Magazine && !item.isBorrowed) {
                console.log(`${index + 1}. Журнал: "${item.title}" - ${item.author} (випуск №${item.issueNumber})`);
                availableCount++;
            } else if (item instanceof DVD && !item.isBorrowed) {
                console.log(`${index + 1}. DVD: "${item.title}" - ${item.author} (${item.duration} хвилин)`);
                availableCount++;
            }
        });
        
        if (availableCount === 0) {
            console.log("Немає доступних елементів");
        }
        console.log(`\nВсього доступно: ${availableCount} елементів`);
    }
}

// ============= ДЕМОНСТРАЦІЯ РОБОТИ =============

console.log("========== БІБЛІОТЕЧНА СИСТЕМА ==========\n");

const library = new Library();

const book1 = new Book("Кобзар", "Тарас Шевченко", 350);
const book2 = new Book("Лісова пісня", "Леся Українка", 180);
const book3 = new Book("1984", "Джордж Орвелл", 328);

const magazine1 = new Magazine("National Geographic", "Різні автори", 2024);
const magazine2 = new Magazine("Science", "Наукова спільнота", 1557);

const dvd1 = new DVD("Inception", "Крістофер Нолан", 148);
const dvd2 = new DVD("The Matrix", "Вачовскі", 136);

console.log("--- Додавання елементів до бібліотеки ---");
library.addItem(book1);
library.addItem(book2);
library.addItem(book3);
library.addItem(magazine1);
library.addItem(magazine2);
library.addItem(dvd1);
library.addItem(dvd2);

library.displayAvailableItems();

console.log("\n--- Пошук елементів ---");
const foundItem = library.findItemByName("Кобзар");
if (foundItem) {
    console.log(`Знайдено: "${foundItem.title}" автор: ${foundItem.author}`);
} else {
    console.log("Елемент не знайдено");
}

const notFoundItem = library.findItemByName("Невідома книга");
if (notFoundItem) {
    console.log(`Знайдено: "${notFoundItem.title}"`);
} else {
    console.log("Елемент 'Невідома книга' не знайдено");
}

console.log("\n--- Позичення елементів ---");
book1.borrow();
magazine1.borrow();
dvd1.borrow();

// Спроба позичити вже позичений елемент
book1.borrow();

book3.borrow();
dvd2.borrow();

library.displayAvailableItems();

console.log("\n--- Пошук та позичення ---");
const itemToBorrow = library.findItemByName("Лісова пісня");
if (itemToBorrow) {
    itemToBorrow.borrow();
}

library.displayAvailableItems();