export interface IBook {
    id: string;
    title: string;
    author: string;
    year: number;
    isBorrowed: boolean;
    borrowedBy?: string;
    borrowedDate?: Date;
}

export class Book implements IBook {
    id: string;
    title: string;
    author: string;
    year: number;
    isBorrowed: boolean;
    borrowedBy?: string;
    borrowedDate?: Date;

    constructor(title: string, author: string, year: number) {
        this.id = this.generateId();
        this.title = title;
        this.author = author;
        this.year = year;
        this.isBorrowed = false;
    }

    private generateId(): string {
        return 'book_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }

    getYear(): number {
        return this.year;
    }

    borrow(userId: string): void {
        this.isBorrowed = true;
        this.borrowedBy = userId;
        this.borrowedDate = new Date();
    }

    return(): void {
        this.isBorrowed = false;
        this.borrowedBy = undefined;
        this.borrowedDate = undefined;
    }
}

export interface IUser {
    id: string;
    name: string;
    borrowedBooks: string[];
}

export class User implements IUser {
    id: string;
    name: string;
    borrowedBooks: string[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.borrowedBooks = [];
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getBorrowedBooksCount(): number {
        return this.borrowedBooks.length;
    }

    canBorrowMore(): boolean {
        return this.borrowedBooks.length < 3;
    }

    borrowBook(bookId: string): void {
        if (this.canBorrowMore()) {
            this.borrowedBooks.push(bookId);
        }
    }

    returnBook(bookId: string): void {
        const index = this.borrowedBooks.indexOf(bookId);
        if (index > -1) {
            this.borrowedBooks.splice(index, 1);
        }
    }
}