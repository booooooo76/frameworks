interface Course {
    name: string;
    duration: number;
    students: string[];
}

class OnlineCourse implements Course {
    name: string;
    duration: number;
    students: string[];
    
    constructor(name: string, duration: number) {
        this.name = name;
        this.duration = duration;
        this.students = [];
    }
    
    // Метод для реєстрації
    registerStudent(student: string): void {
        if (!this.isStudentRegistered(student)) {
            this.students.push(student);
            console.log(`${student} зареєстровано на курс "${this.name}"`);
        } else {
            console.log(`${student} вже зареєстрований на курс "${this.name}"`);
        }
    }
    
   // Метод для перевірки чи студент зареєстрований
    isStudentRegistered(student: string): boolean {
        return this.students.includes(student);
}
}

class CourseManager {
    private courses: Course[];
    
    constructor() {
        this.courses = [];
    }
    
    addCourse(course: Course): void {
        this.courses.push(course);
        console.log(`Курс "${course.name}" додано до системи`);
    }
    
    removeCourse(courseName: string): void {
        const index = this.courses.findIndex(course => course.name === courseName);
        if (index !== -1) {
            this.courses.splice(index, 1);
            console.log(`Курс "${courseName}" видалено з системи`);
        } else {
            console.log(`Курс "${courseName}" не знайдено`);
        }
    }
    
    // Метод для пошуку курсу за назвою
    findCourse(courseName: string): Course | undefined {
        return this.courses.find(course => course.name === courseName);
    }
    
    // Метод для виведення списку всіх курсів
    displayAllCourses(): void {
        console.log("\n===== СПИСОК УСІХ КУРСІВ =====");
        if (this.courses.length === 0) {
            console.log("Немає доступних курсів");
            return;
        }
        
        this.courses.forEach((course, index) => {
            console.log(`\n${index + 1}. ${course.name}`);
            console.log(`   Тривалість: ${course.duration} годин`);
            console.log(`   Кількість студентів: ${course.students.length}`);
            if (course.students.length > 0) {
                console.log(`   Студенти: ${course.students.join(", ")}`);
            } else {
                console.log(`   Студенти: немає зареєстрованих`);
            }
        });
    }
}


console.log("========== СИСТЕМА УПРАВЛІННЯ КУРСАМИ ==========\n");

// Створення кількох курсів
const jsBasics = new OnlineCourse("JavaScript Basics", 40);
const pythonAdvanced = new OnlineCourse("Python Advanced", 60);
const webDevelopment = new OnlineCourse("Web Development", 80);
const datascience = new OnlineCourse("Data Science Fundamentals", 100);

// Створення менеджера курсів
const courseManager = new CourseManager();

console.log("--- Додавання курсів ---");
courseManager.addCourse(jsBasics);
courseManager.addCourse(pythonAdvanced);
courseManager.addCourse(webDevelopment);
courseManager.addCourse(datascience);

console.log("\n--- Реєстрація студентів ---");
jsBasics.registerStudent("Олександр Коваленко");
jsBasics.registerStudent("Марія Петренко");
jsBasics.registerStudent("Іван Шевченко");
jsBasics.registerStudent("Марія Петренко"); 

pythonAdvanced.registerStudent("Анна Ткаченко");
pythonAdvanced.registerStudent("Петро Мельник");

webDevelopment.registerStudent("Олександр Коваленко");
webDevelopment.registerStudent("Василь Кравченко");
webDevelopment.registerStudent("Ольга Бондаренко");
webDevelopment.registerStudent("Марія Петренко");

datascience.registerStudent("Анна Ткаченко");
datascience.registerStudent("Дмитро Сидоренко");

console.log("\n--- Перевірка реєстрації ---");
console.log(`Чи зареєстрований "Олександр Коваленко" на JavaScript Basics? ${jsBasics.isStudentRegistered("Олександр Коваленко") ? "Так" : "Ні"}`);
console.log(`Чи зареєстрований "Дмитро Сидоренко" на JavaScript Basics? ${jsBasics.isStudentRegistered("Дмитро Сидоренко") ? "Так" : "Ні"}`);

console.log("\n--- Пошук курсу ---");
const foundCourse = courseManager.findCourse("Python Advanced");
if (foundCourse) {
    console.log(`Знайдено курс: ${foundCourse.name}, тривалість: ${foundCourse.duration} годин`);
} else {
    console.log("Курс не знайдено");
}

// Виведення списку всіх курсів
courseManager.displayAllCourses();

console.log("\n--- Видалення курсу ---");
courseManager.removeCourse("Data Science Fundamentals");

// Виведення оновленого списку курсів
courseManager.displayAllCourses();

console.log("\n--- Спроба видалити неіснуючий курс ---");
courseManager.removeCourse("Machine Learning");