import {Book, User, IBook, IUser} from './models';
import {Library} from './library';
import {Storage} from './storage';

export class LibraryService {
    private booksLibrary: Library<Book>;
    private usersLibrary: Library<User>;

    constructor() {
        this.booksLibrary = new Library<Book>();
        this.usersLibrary = new Library<User>();
        this.loadFromStorage();
    }

    // Book methods
    addBook(title: string, author: string, year: number): Book {
        const book = new Book(title, author, year);
        this.booksLibrary.add(book);
        this.saveToStorage();
        return book;
    }

    getBooks(): Book[] {
        return this.booksLibrary.getAll();
    }

    findBookById(id: string): Book | undefined {
        return this.booksLibrary.findById(id);
    }

    // User methods
    addUser(id: string, name: string): User | null {
        // Check if user with this ID already exists
        const existingUser = this.usersLibrary.findById(id);
        if (existingUser) {
            return null; // User with this ID already exists
        }

        const user = new User(id, name);
        this.usersLibrary.add(user);
        this.saveToStorage();
        return user;
    }

    getUsers(): User[] {
        return this.usersLibrary.getAll();
    }

    findUserById(id: string): User | undefined {
        return this.usersLibrary.findById(id);
    }

    // Borrow and return methods
    borrowBook(bookId: string, userId: string): { success: boolean; message: string } {
        const book = this.findBookById(bookId);
        const user = this.findUserById(userId);

        if (!book) {
            return { success: false, message: 'Книгу не знайдено' };
        }

        if (!user) {
            return { success: false, message: 'Користувача не знайдено' };
        }

        if (book.isBorrowed) {
            return { success: false, message: 'Книга вже позичена' };
        }

        if (!user.canBorrowMore()) {
            return { success: false, message: 'Користувач вже позичив максимальну кількість книг (3)' };
        }

        book.borrow(userId);
        user.borrowBook(bookId);
        this.saveToStorage();

        return { success: true, message: `Книга "${book.getTitle()}" успішно позичена користувачу ${user.getName()}` };
    }

    returnBook(bookId: string): { success: boolean; message: string } {
        const book = this.findBookById(bookId);

        if (!book) {
            return { success: false, message: 'Книгу не знайдено' };
        }

        if (!book.isBorrowed || !book.borrowedBy) {
            return { success: false, message: 'Книга не була позичена' };
        }

        const user = this.findUserById(book.borrowedBy);
        if (user) {
            user.returnBook(bookId);
        }

        const bookTitle = book.getTitle();
        const userName = user ? user.getName() : 'Невідомий';
        
        book.return();
        this.saveToStorage();

        return { success: true, message: `Книга "${bookTitle}" успішно повернута від користувача ${userName}` };
    }

    // Search methods
    searchBooksByAuthor(author: string): Book[] {
        const searchTerm = author.toLowerCase();
        return this.booksLibrary.findAll((book) => 
            book.getAuthor().toLowerCase().includes(searchTerm)
        );
    }

    searchBooksByTitle(title: string): Book[] {
        const searchTerm = title.toLowerCase();
        return this.booksLibrary.findAll((book) => 
            book.getTitle().toLowerCase().includes(searchTerm)
        );
    }

    // Storage methods
    private loadFromStorage(): void {
        // Load books
        const booksData = Storage.loadBooks();
        booksData.forEach((bookData: any) => {
            const book = new Book(bookData.title, bookData.author, bookData.year);
            book.id = bookData.id;
            book.isBorrowed = bookData.isBorrowed;
            book.borrowedBy = bookData.borrowedBy;
            if (bookData.borrowedDate) {
                book.borrowedDate = new Date(bookData.borrowedDate);
            }
            this.booksLibrary.add(book);
        });

        // Load users
        const usersData = Storage.loadUsers();
        usersData.forEach((userData: any) => {
            const user = new User(userData.id, userData.name);
            user.borrowedBooks = userData.borrowedBooks || [];
            this.usersLibrary.add(user);
        });
    }

    private saveToStorage(): void {
        Storage.saveBooks(this.booksLibrary.getAll());
        Storage.saveUsers(this.usersLibrary.getAll());
    }

    // Clear methods
    clearAll(): void {
        this.booksLibrary.clear();
        this.usersLibrary.clear();
        Storage.clearAll();
    }
}