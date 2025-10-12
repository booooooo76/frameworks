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

    deleteBook(bookId: string): { success: boolean; message: string } {
        const book = this.findBookById(bookId);
        
        if (!book) {
            return { success: false, message: 'Книгу не знайдено' };
        }

        if (book.isBorrowed) {
            return { success: false, message: 'Не можна видалити позичену книгу' };
        }

        const bookIndex = this.booksLibrary.findIndex(b => b.id === bookId);
        if (bookIndex !== -1) {
            this.booksLibrary.remove(bookIndex);
            this.saveToStorage();
            return { success: true, message: `Книга "${book.getTitle()}" успішно видалена` };
        }

        return { success: false, message: 'Помилка при видаленні книги' };
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

    deleteUser(userId: string): { success: boolean; message: string } {
        const user = this.findUserById(userId);
        
        if (!user) {
            return { success: false, message: 'Користувача не знайдено' };
        }

        if (user.getBorrowedBooksCount() > 0) {
            return { success: false, message: 'Не можна видалити користувача з позиченими книгами' };
        }

        const userIndex = this.usersLibrary.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.usersLibrary.remove(userIndex);
            this.saveToStorage();
            return { success: true, message: `Користувач "${user.getName()}" успішно видалений` };
        }

        return { success: false, message: 'Помилка при видаленні користувача' };
    }

    // Search methods
    searchBooks(searchTerm: string): Book[] {
        const term = searchTerm.toLowerCase().trim();
        if (!term) return this.getBooks();

        return this.booksLibrary.findAll((book) => 
            book.getTitle().toLowerCase().includes(term) ||
            book.getAuthor().toLowerCase().includes(term)
        );
    }

    searchUsers(searchTerm: string): User[] {
        const term = searchTerm.toLowerCase().trim();
        if (!term) return this.getUsers();

        return this.usersLibrary.findAll((user) => 
            user.getName().toLowerCase().includes(term) ||
            user.getId().toLowerCase().includes(term)
        );
    }

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