// Import all modules
import {Book, User} from './models';
import {LibraryService} from './services';
import {Validation} from './validation';
import {Modal} from './modal';

// Main App class
class App {
    private libraryService: LibraryService;
    private modal: Modal;
    private selectedBook: Book | null = null;

    constructor() {
        this.libraryService = new LibraryService();
        this.modal = new Modal();
        this.init();
    }

    private init(): void {
        this.setupEventListeners();
        this.renderBooks();
        this.renderUsers();
    }

    private setupEventListeners(): void {
        // Add book form
        const bookForm = document.getElementById('addBookForm');
        if (bookForm) {
            bookForm.addEventListener('submit', (e) => this.handleAddBook(e));
        }

        // Add user form
        const userForm = document.getElementById('addUserForm');
        if (userForm) {
            userForm.addEventListener('submit', (e) => this.handleAddUser(e));
        }
    }

    private handleAddBook(e: Event): void {
        e.preventDefault();
        
        const titleInput = document.getElementById('bookTitle') as HTMLInputElement;
        const authorInput = document.getElementById('bookAuthor') as HTMLInputElement;
        const yearInput = document.getElementById('bookYear') as HTMLInputElement;

        if (!titleInput || !authorInput || !yearInput) return;

        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const year = yearInput.value.trim();

        // Validate form
        const validation = Validation.validateBookForm(title, author, year);
        
        // Clear previous errors
        this.clearFormErrors('addBookForm');

        if (!validation.isValid) {
            // Show errors
            if (validation.errors.title) {
                this.showFieldError(titleInput, validation.errors.title);
            }
            if (validation.errors.author) {
                this.showFieldError(authorInput, validation.errors.author);
            }
            if (validation.errors.year) {
                this.showFieldError(yearInput, validation.errors.year);
            }
            return;
        }

        // Add book
        const book = this.libraryService.addBook(title, author, parseInt(year, 10));
        
        // Clear form
        titleInput.value = '';
        authorInput.value = '';
        yearInput.value = '';

        // Render books
        this.renderBooks();
        
        // Show success message
        this.modal.showSuccess(`Книга "${book.getTitle()}" успішно додана!`);
    }

    private handleAddUser(e: Event): void {
        e.preventDefault();
        
        const nameInput = document.getElementById('userName') as HTMLInputElement;
        const idInput = document.getElementById('userId') as HTMLInputElement;

        if (!nameInput || !idInput) return;

        const name = nameInput.value.trim();
        const id = idInput.value.trim();

        // Validate form
        const validation = Validation.validateUserForm(id, name);
        
        // Clear previous errors
        this.clearFormErrors('addUserForm');

        if (!validation.isValid) {
            // Show errors
            if (validation.errors.name) {
                this.showFieldError(nameInput, validation.errors.name);
            }
            if (validation.errors.id) {
                this.showFieldError(idInput, validation.errors.id);
            }
            return;
        }

        // Add user
        const user = this.libraryService.addUser(id, name);
        
        if (!user) {
            this.showFieldError(idInput, 'Користувач з таким ID вже існує');
            return;
        }

        // Clear form
        nameInput.value = '';
        idInput.value = '';

        // Render users
        this.renderUsers();
        
        // Show success message
        this.modal.showSuccess(`Користувач ${user.getName()} успішно доданий!`);
    }

    private async handleBookClick(book: Book): Promise<void> {
        if (book.isBorrowed) {
            // Return book
            const user = this.libraryService.findUserById(book.borrowedBy || '');
            if (user) {
                const confirmed = await this.modal.showReturnModal(book.getTitle(), user.getName());
                if (confirmed) {
                    const result = this.libraryService.returnBook(book.id);
                    if (result.success) {
                        this.modal.showSuccess(result.message);
                        this.renderBooks();
                        this.renderUsers();
                    } else {
                        this.modal.showError(result.message);
                    }
                }
            }
        } else {
            // Borrow book
            const users = this.libraryService.getUsers();
            if (users.length === 0) {
                this.modal.showWarning('Спочатку додайте користувачів!');
                return;
            }

            const selectedUserId = await this.modal.showBorrowModal(book.getTitle(), users);
            if (selectedUserId) {
                const user = this.libraryService.findUserById(selectedUserId);
                if (user && !user.canBorrowMore()) {
                    this.modal.showWarning(`Користувач ${user.getName()} вже позичив максимальну кількість книг (3). Поверніть хоча б одну книгу перед тим як позичити нову.`);
                    return;
                }

                const result = this.libraryService.borrowBook(book.id, selectedUserId);
                if (result.success) {
                    this.modal.showSuccess(result.message);
                    this.renderBooks();
                    this.renderUsers();
                } else {
                    this.modal.showError(result.message);
                }
            }
        }
    }

    private renderBooks(): void {
        const container = document.getElementById('booksList');
        if (!container) return;

        const books = this.libraryService.getBooks();
        
        if (books.length === 0) {
            container.innerHTML = '<p class="text-muted text-center">Немає доданих книг</p>';
            return;
        }

        container.innerHTML = '';
        
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'col-md-4 mb-3';
            
            const isBorrowed = book.isBorrowed;
            const user = book.borrowedBy ? this.libraryService.findUserById(book.borrowedBy) : null;
            
            bookCard.innerHTML = `
                <div class="card book-card ${isBorrowed ? 'borrowed' : ''}" style="position: relative;">
                    ${isBorrowed ? '<span class="badge bg-danger badge-borrowed">Позичена</span>' : ''}
                    <div class="card-body">
                        <h6 class="card-title">${book.getTitle()}</h6>
                        <p class="card-text">
                            <small class="text-muted">Автор: ${book.getAuthor()}</small><br>
                            <small class="text-muted">Рік: ${book.getYear()}</small>
                            ${isBorrowed && user ? `<br><small class="text-danger">Позичив: ${user.getName()}</small>` : ''}
                        </p>
                        <button class="btn btn-sm ${isBorrowed ? 'btn-warning' : 'btn-primary'} w-100">
                            ${isBorrowed ? 'Повернути' : 'Позичити'}
                        </button>
                    </div>
                </div>
            `;
            
            const button = bookCard.querySelector('button');
            if (button) {
                button.addEventListener('click', () => this.handleBookClick(book));
            }
            
            container.appendChild(bookCard);
        });
    }

    private renderUsers(): void {
        const container = document.getElementById('usersList');
        if (!container) return;

        const users = this.libraryService.getUsers();
        
        if (users.length === 0) {
            container.innerHTML = '<p class="text-muted text-center">Немає доданих користувачів</p>';
            return;
        }

        container.innerHTML = '';
        
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'col-md-4 mb-3';
            
            const borrowedCount = user.getBorrowedBooksCount();
            const canBorrowMore = user.canBorrowMore();
            
            userCard.innerHTML = `
                <div class="card user-card">
                    <div class="card-body">
                        <h6 class="card-title">${user.getName()}</h6>
                        <p class="card-text">
                            <small class="text-muted">ID: ${user.getId()}</small><br>
                            <span class="badge ${canBorrowMore ? 'bg-success' : 'bg-danger'}">
                                Позичено книг: ${borrowedCount}/3
                            </span>
                        </p>
                    </div>
                </div>
            `;
            
            container.appendChild(userCard);
        });
    }

    private showFieldError(input: HTMLInputElement, error: string): void {
        input.classList.add('is-invalid');
        const feedback = input.parentElement?.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.textContent = error;
        }
    }

    private clearFormErrors(formId: string): void {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.classList.remove('is-invalid');
        });
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new App();
});