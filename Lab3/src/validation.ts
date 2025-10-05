export class Validation {
    static validateBookTitle(title: string): { isValid: boolean; error?: string } {
        if (!title || title.trim().length === 0) {
            return { isValid: false, error: 'Назва книги обов\'язкова' };
        }
        return { isValid: true };
    }

    static validateBookAuthor(author: string): { isValid: boolean; error?: string } {
        if (!author || author.trim().length === 0) {
            return { isValid: false, error: 'Автор обов\'язковий' };
        }
        return { isValid: true };
    }

    static validateBookYear(year: string): { isValid: boolean; error?: string } {
        if (!year || year.trim().length === 0) {
            return { isValid: false, error: 'Рік видання обов\'язковий' };
        }

        // Перевірка, що це тільки цифри
        if (!/^\d+$/.test(year)) {
            return { isValid: false, error: 'Рік має містити тільки цифри' };
        }

        // Перевірка на валідний рік (від 1000 до поточного року)
        const yearNum = parseInt(year, 10);
        const currentYear = new Date().getFullYear();
        
        if (yearNum < 1000 || yearNum > currentYear) {
            return { isValid: false, error: `Рік має бути між 1000 та ${currentYear}` };
        }

        return { isValid: true };
    }

    static validateUserName(name: string): { isValid: boolean; error?: string } {
        if (!name || name.trim().length === 0) {
            return { isValid: false, error: 'Ім\'я користувача обов\'язкове' };
        }
        return { isValid: true };
    }

    static validateUserId(id: string): { isValid: boolean; error?: string } {
        if (!id || id.trim().length === 0) {
            return { isValid: false, error: 'ID користувача обов\'язковий' };
        }

        // Перевірка, що це тільки цифри
        if (!/^\d+$/.test(id)) {
            return { isValid: false, error: 'ID має містити тільки цифри' };
        }

        return { isValid: true };
    }

    static validateBookForm(title: string, author: string, year: string): { 
        isValid: boolean; 
        errors: { [key: string]: string } 
    } {
        const errors: { [key: string]: string } = {};

        const titleValidation = this.validateBookTitle(title);
        if (!titleValidation.isValid && titleValidation.error) {
            errors.title = titleValidation.error;
        }

        const authorValidation = this.validateBookAuthor(author);
        if (!authorValidation.isValid && authorValidation.error) {
            errors.author = authorValidation.error;
        }

        const yearValidation = this.validateBookYear(year);
        if (!yearValidation.isValid && yearValidation.error) {
            errors.year = yearValidation.error;
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    static validateUserForm(id: string, name: string): { 
        isValid: boolean; 
        errors: { [key: string]: string } 
    } {
        const errors: { [key: string]: string } = {};

        const idValidation = this.validateUserId(id);
        if (!idValidation.isValid && idValidation.error) {
            errors.id = idValidation.error;
        }

        const nameValidation = this.validateUserName(name);
        if (!nameValidation.isValid && nameValidation.error) {
            errors.name = nameValidation.error;
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
}