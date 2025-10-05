export class Library<T> {
    private items: T[] = [];

    constructor() {
        this.items = [];
    }

    add(item: T): void {
        this.items.push(item);
    }

    remove(index: number): void {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
    }

    find(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
    }

    findAll(predicate?: (item: T) => boolean): T[] {
        if (!predicate) {
            return [...this.items];
        }
        return this.items.filter(predicate);
    }

    findById(id: string): T | undefined {
        return this.items.find((item: any) => item.id === id);
    }

    getAll(): T[] {
        return [...this.items];
    }

    count(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = [];
    }

    update(index: number, item: T): void {
        if (index >= 0 && index < this.items.length) {
            this.items[index] = item;
        }
    }

    findIndex(predicate: (item: T) => boolean): number {
        return this.items.findIndex(predicate);
    }
}