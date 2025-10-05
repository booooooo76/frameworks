export class Storage {
    private static readonly BOOKS_KEY = 'library_books';
    private static readonly USERS_KEY = 'library_users';

    static saveBooks(books: any[]): void {
        try {
            localStorage.setItem(this.BOOKS_KEY, JSON.stringify(books));
        } catch (error) {
            console.error('Error saving books to localStorage:', error);
        }
    }

    static loadBooks(): any[] {
        try {
            const data = localStorage.getItem(this.BOOKS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading books from localStorage:', error);
            return [];
        }
    }

    static saveUsers(users: any[]): void {
        try {
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        } catch (error) {
            console.error('Error saving users to localStorage:', error);
        }
    }

    static loadUsers(): any[] {
        try {
            const data = localStorage.getItem(this.USERS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading users from localStorage:', error);
            return [];
        }
    }

    static clearBooks(): void {
        try {
            localStorage.removeItem(this.BOOKS_KEY);
        } catch (error) {
            console.error('Error clearing books from localStorage:', error);
        }
    }

    static clearUsers(): void {
        try {
            localStorage.removeItem(this.USERS_KEY);
        } catch (error) {
            console.error('Error clearing users from localStorage:', error);
        }
    }

    static clearAll(): void {
        try {
            localStorage.removeItem(this.BOOKS_KEY);
            localStorage.removeItem(this.USERS_KEY);
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
}