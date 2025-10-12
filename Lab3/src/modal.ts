export class Modal {
    private borrowModal: any;
    private returnModal: any;
    private alertModal: any;

    constructor() {
        const borrowModalEl = document.getElementById('borrowModal');
        const returnModalEl = document.getElementById('returnModal');
        const alertModalEl = document.getElementById('alertModal');

        if (borrowModalEl) {
            this.borrowModal = new (window as any).bootstrap.Modal(borrowModalEl);
        }
        if (returnModalEl) {
            this.returnModal = new (window as any).bootstrap.Modal(returnModalEl);
        }
        if (alertModalEl) {
            this.alertModal = new (window as any).bootstrap.Modal(alertModalEl);
        }
    }

    showBorrowModal(bookTitle: string, users: any[]): Promise<string | null> {
        return new Promise((resolve) => {
            const messageEl = document.getElementById('borrowMessage');
            const selectEl = document.getElementById('userSelect') as HTMLSelectElement;
            const confirmBtn = document.getElementById('confirmBorrow');

            if (messageEl && selectEl && confirmBtn) {
                messageEl.textContent = `Ви хочете позичити книгу "${bookTitle}"?`;
                
                selectEl.innerHTML = '<option value="">Оберіть користувача</option>';
                users.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.textContent = `${user.name} (Позичено книг: ${user.borrowedBooks.length}/3)`;
                    selectEl.appendChild(option);
                });

                // Handle confirm button
                const handleConfirm = () => {
                    const selectedUserId = selectEl.value;
                    confirmBtn.removeEventListener('click', handleConfirm);
                    this.borrowModal.hide();
                    resolve(selectedUserId || null);
                };

                // Handle modal close
                const handleClose = () => {
                    confirmBtn.removeEventListener('click', handleConfirm);
                    document.getElementById('borrowModal')?.removeEventListener('hidden.bs.modal', handleClose);
                    resolve(null);
                };

                confirmBtn.addEventListener('click', handleConfirm);
                document.getElementById('borrowModal')?.addEventListener('hidden.bs.modal', handleClose);
            }

            this.borrowModal.show();
        });
    }

    showReturnModal(bookTitle: string, userName: string): Promise<boolean> {
        return new Promise((resolve) => {
            const messageEl = document.getElementById('returnMessage');
            const confirmBtn = document.getElementById('confirmReturn');

            if (messageEl && confirmBtn) {
                messageEl.textContent = `Повернути книгу "${bookTitle}" від користувача ${userName}?`;

                // Handle confirm button
                const handleConfirm = () => {
                    confirmBtn.removeEventListener('click', handleConfirm);
                    this.returnModal.hide();
                    resolve(true);
                };

                // Handle modal close
                const handleClose = () => {
                    confirmBtn.removeEventListener('click', handleConfirm);
                    document.getElementById('returnModal')?.removeEventListener('hidden.bs.modal', handleClose);
                    resolve(false);
                };

                confirmBtn.addEventListener('click', handleConfirm);
                document.getElementById('returnModal')?.addEventListener('hidden.bs.modal', handleClose);
            }

            this.returnModal.show();
        });
    }

    showAlert(message: string, title: string = 'Повідомлення'): void {
        const messageEl = document.getElementById('alertMessage');
        const titleEl = document.querySelector('#alertModal .modal-title');

        if (messageEl) {
            messageEl.textContent = message;
        }
        if (titleEl) {
            titleEl.textContent = title;
        }

        this.alertModal.show();
    }

    showSuccess(message: string): void {
        this.showAlert(message, 'Успіх');
    }

    showError(message: string): void {
        this.showAlert(message, 'Помилка');
    }

    showWarning(message: string): void {
        this.showAlert(message, 'Увага');
    }
}