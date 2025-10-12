import {Book, User} from './models';
import {LibraryService} from './services';
import {Validation} from './validation';
import {Modal} from './modal';

class App {
    private libraryService: LibraryService;
    private modal: Modal;
    private selectedBook: Book | null = null;
    private currentBookPage: number = 1;
    private currentUserPage: number = 1;
    private readonly itemsPerPage: number = 5;
    private bookSearchTerm: string = '';
    private userSearchTerm: string = '';

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

        // Search books
        const bookSearchInput = document.getElementById('bookSearch') as HTMLInputElement;
        if (bookSearchInput) {
            bookSearchInput.addEventListener('input', (e) => {
                this.bookSearchTerm = (e.target as HTMLInputElement).value;
                this.currentBookPage = 1;
                this.renderBooks();
            });
        }

        // Search users
        const userSearchInput = document.getElementById('userSearch') as HTMLInputElement;
        if (userSearchInput) {
            userSearchInput.addEventListener('input', (e) => {
                this.userSearchTerm = (e.target as HTMLInputElement).value;
                this.currentUserPage = 1;
                this.renderUsers();
            });
        }

        // Clear search buttons
        const clearBookSearch = document.getElementById('clearBookSearch');
        if (clearBookSearch) {
            clearBookSearch.addEventListener('click', () => {
                this.bookSearchTerm = '';
                const searchInput = document.getElementById('bookSearch') as HTMLInputElement;
                if (searchInput) searchInput.value = '';
                this.currentBookPage = 1;
                this.renderBooks();
            });
        }

        const clearUserSearch = document.getElementById('clearUserSearch');
        if (clearUserSearch) {
            clearUserSearch.addEventListener('click', () => {
                this.userSearchTerm = '';
                const searchInput = document.getElementById('userSearch') as HTMLInputElement;
                if (searchInput) searchInput.value = '';
                this.currentUserPage = 1;
                this.renderUsers();
            });
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

        // Reset to first page and render books
        this.currentBookPage = 1;
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

        // Reset to first page and render users
        this.currentUserPage = 1;
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

    private handleDeleteBook(book: Book): void {
        const confirmed = confirm(`Видалити книгу "${book.getTitle()}"?`);
        if (confirmed) {
            const result = this.libraryService.deleteBook(book.id);
            if (result.success) {
                this.modal.showSuccess(result.message);
                this.renderBooks();
            } else {
                this.modal.showError(result.message);
            }
        }
    }

    private handleDeleteUser(user: User): void {
        const confirmed = confirm(`Видалити користувача "${user.getName()}"?`);
        if (confirmed) {
            const result = this.libraryService.deleteUser(user.id);
            if (result.success) {
                this.modal.showSuccess(result.message);
                this.renderUsers();
            } else {
                this.modal.showError(result.message);
            }
        }
    }

    private renderBooks(): void {
        const container = document.getElementById('booksList');
        const paginationContainer = document.getElementById('booksPagination');
        if (!container || !paginationContainer) return;

        // Filter books based on search term
        let books = this.libraryService.getBooks();
        if (this.bookSearchTerm) {
            books = this.libraryService.searchBooks(this.bookSearchTerm);
        }

        const totalBooks = books.length;
        const totalPages = Math.ceil(totalBooks / this.itemsPerPage);
        
        // Adjust current page if needed
        if (this.currentBookPage > totalPages && totalPages > 0) {
            this.currentBookPage = totalPages;
        }

        // Get books for current page
        const startIndex = (this.currentBookPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const booksToShow = books.slice(startIndex, endIndex);

        // Render books
        if (booksToShow.length === 0) {
            const noBooksMessage = this.bookSearchTerm 
                ? '<p class="text-muted text-center">Книги за вашим запитом не знайдено</p>'
                : '<p class="text-muted text-center">Немає доданих книг</p>';
            container.innerHTML = noBooksMessage;
        } else {
            container.innerHTML = '';
            
            booksToShow.forEach(book => {
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
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm ${isBorrowed ? 'btn-warning' : 'btn-primary'} flex-grow-1 borrow-btn">
                                    ${isBorrowed ? 'Повернути' : 'Позичити'}
                                </button>
                                <button class="btn btn-sm btn-outline-danger delete-btn" title="Видалити книгу">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                const borrowButton = bookCard.querySelector('.borrow-btn');
                const deleteButton = bookCard.querySelector('.delete-btn');
                
                if (borrowButton) {
                    borrowButton.addEventListener('click', () => this.handleBookClick(book));
                }
                
                if (deleteButton) {
                    deleteButton.addEventListener('click', () => this.handleDeleteBook(book));
                }
                
                container.appendChild(bookCard);
            });
        }

        // Render pagination
        this.renderPagination(paginationContainer, this.currentBookPage, totalPages, 'book');
    }

    private renderUsers(): void {
        const container = document.getElementById('usersList');
        const paginationContainer = document.getElementById('usersPagination');
        if (!container || !paginationContainer) return;

        // Filter users based on search term
        let users = this.libraryService.getUsers();
        if (this.userSearchTerm) {
            users = this.libraryService.searchUsers(this.userSearchTerm);
        }

        const totalUsers = users.length;
        const totalPages = Math.ceil(totalUsers / this.itemsPerPage);
        
        // Adjust current page if needed
        if (this.currentUserPage > totalPages && totalPages > 0) {
            this.currentUserPage = totalPages;
        }

        // Get users for current page
        const startIndex = (this.currentUserPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const usersToShow = users.slice(startIndex, endIndex);

        // Render users
        if (usersToShow.length === 0) {
            const noUsersMessage = this.userSearchTerm
                ? '<p class="text-muted text-center">Користувачі за вашим запитом не знайдені</p>'
                : '<p class="text-muted text-center">Немає доданих користувачів</p>';
            container.innerHTML = noUsersMessage;
        } else {
            container.innerHTML = '';
            
            usersToShow.forEach(user => {
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
                            <button class="btn btn-sm btn-outline-danger w-100 delete-user-btn" ${borrowedCount > 0 ? 'disabled' : ''}>
                                ${borrowedCount > 0 ? 'Не можна видалити (є позичені книги)' : 'Видалити'}
                            </button>
                        </div>
                    </div>
                `;
                
                const deleteButton = userCard.querySelector('.delete-user-btn');
                if (deleteButton && borrowedCount === 0) {
                    deleteButton.addEventListener('click', () => this.handleDeleteUser(user));
                }
                
                container.appendChild(userCard);
            });
        }

        // Render pagination
        this.renderPagination(paginationContainer, this.currentUserPage, totalPages, 'user');
    }

    private renderPagination(container: HTMLElement, currentPage: number, totalPages: number, type: 'book' | 'user'): void {
        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }

        let paginationHTML = `
            <nav aria-label="Page navigation">
                <ul class="pagination pagination-sm justify-content-center">
        `;

        // Previous button
        const prevDisabled = currentPage === 1 ? 'disabled' : '';
        paginationHTML += `
            <li class="page-item ${prevDisabled}">
                <a class="page-link" href="#" data-page="${currentPage - 1}">Попередня</a>
            </li>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const active = i === currentPage ? 'active' : '';
            paginationHTML += `
                <li class="page-item ${active}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        }

        // Next button
        const nextDisabled = currentPage === totalPages ? 'disabled' : '';
        paginationHTML += `
            <li class="page-item ${nextDisabled}">
                <a class="page-link" href="#" data-page="${currentPage + 1}">Наступна</a>
            </li>
        `;

        paginationHTML += `
                </ul>
            </nav>
        `;

        container.innerHTML = paginationHTML;

        // Add event listeners to pagination links
        const pageLinks = container.querySelectorAll('.page-link');
        pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(link.getAttribute('data-page') || '1');
                if (type === 'book') {
                    this.currentBookPage = page;
                    this.renderBooks();
                } else {
                    this.currentUserPage = page;
                    this.renderUsers();
                }
            });
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