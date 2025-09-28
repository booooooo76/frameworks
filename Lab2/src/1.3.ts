abstract class Car {
    protected brand!: string;
    protected model!: string;
    protected year!: number;
    protected engineVolume!: number;
    private vin!: string;
    private mileage: number = 0;
    public color!: string;
    public price!: number;

    constructor(brand: string, model: string, year: number, engineVolume: number, vin: string, color: string, price: number) {
        Object.assign(this, { brand, model, year, engineVolume, vin, color, price });
    }

    abstract startEngine(): void;
    abstract getMaxSpeed(): number;
    abstract getFuelConsumption(): number;// витрата палива

    public drive(distance: number): void { 
        this.mileage += distance; 
        console.log(`${this.brand} ${this.model} проїхав ${distance} км`); 
    }

    protected getBasicInfo(): string { return `${this.brand} ${this.model} (${this.year})`; }
    public getMileage(): number { return this.mileage; }
    protected getVin(): string { return this.vin; }
    public getCurrentValue(): number { return Math.max(this.price - this.mileage*0.5, this.price*0.3); }

    public displayFullInfo(): void {
        console.log(`\n=== ${this.brand} ${this.model} ===`);
        console.log(`Інфо: ${this.getBasicInfo()}, Колір: ${this.color}, Двигун: ${this.engineVolume}L`);
        console.log(`Макс. швидкість: ${this.getMaxSpeed()} км/год, Витрата: ${this.getFuelConsumption().toFixed(1)} л/100км`);
        console.log(`Ціна: $${this.price}, Пробіг: ${this.getMileage()} км, Поточна вартість: $${this.getCurrentValue().toLocaleString()}`);
        console.log(`VIN: ${this.getVin().substring(0,5)}***`);
    }
}

// Похідні класи
class BMW extends Car {
    private xDrive!: boolean;
    protected series!: number;

    constructor(model: string, year: number, engineVolume: number, vin: string, color: string, price: number, series: number, xDrive = false) {
        super("BMW", model, year, engineVolume, vin, color, price);
        Object.assign(this, { series, xDrive });
    }
    startEngine(): void { console.log(`BMW ${this.model}: Двигун запущено`); }
    getMaxSpeed(): number { return this.model.includes("M") ? 250 : 210 + this.engineVolume*10; }
    getFuelConsumption(): number { return 5 + this.engineVolume*2 + (this.xDrive ? 1.5 : 0); }
}

class Mercedes extends Car {
    private airmaticSuspension!: boolean;
    protected classType!: string;
    public amgPackage!: boolean;

    constructor(model: string, year: number, engineVolume: number, vin: string, color: string, price: number, classType: string, airmaticSuspension=false, amgPackage=false) {
        super("Mercedes-Benz", model, year, engineVolume, vin, color, price);
        Object.assign(this, { classType, airmaticSuspension, amgPackage });
    }
    startEngine(): void { console.log(`Mercedes ${this.model}: Двигун запущено`); }
    getMaxSpeed(): number { return this.amgPackage ? 280 : 200 + this.engineVolume*12; }
    getFuelConsumption(): number { return 6 + this.engineVolume*1.8 + (this.amgPackage ? 3 : 0); }
}

class Toyota extends Car {
    private hybrid!: boolean;
    protected reliability!: number;
    public ecoMode: boolean = true;

    constructor(model: string, year: number, engineVolume: number, vin: string, color: string, price: number, hybrid=false, reliability=9) {
        super("Toyota", model, year, engineVolume, vin, color, price);
        Object.assign(this, { hybrid, reliability });
    }
    startEngine(): void { console.log(`Toyota ${this.model}: Двигун запущено`); }
    getMaxSpeed(): number { return this.model==="Supra" ? 250 : 180 + this.engineVolume*8; }
    getFuelConsumption(): number { return (5.5 + this.engineVolume*1.5)*(this.hybrid ? 0.6:1)*(this.ecoMode ? 0.9:1); }
}

// Масив екземплярів
const cars: Car[] = [
    new BMW("X5 40i", 2024, 3, "VIN1", "Grey", 75000, 5, true),
    new BMW("330i", 2023, 2, "VIN2", "White", 45000, 3),
    new Mercedes("S500", 2024, 3, "VIN3", "Black", 120000, "S-Class", true),
    new Mercedes("C63 AMG", 2024, 4, "VIN4", "Grey", 95000, "C-Class", false, true),
    new Toyota("Camry Hybrid", 2024, 2.5, "VIN5", "White", 35000, true, 10),
    new Toyota("Supra", 2024, 3, "VIN6", "Red", 55000)
];

// Демонстрація
cars.forEach(car => {
    car.displayFullInfo();
    car.startEngine();
    car.drive(100);
});
