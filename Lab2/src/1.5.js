// Клас OnlineCourse
class OnlineCourse {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
        this.students = [];
    }
    // Метод для реєстрації студента на курс
    registerStudent(student) {
        if (!this.isStudentRegistered(student)) {
            this.students.push(student);
            console.log(`${student} зареєстровано на курс "${this.name}"`);
        }
        else {
            console.log(`${student} вже зареєстрований на курс "${this.name}"`);
        }
    }
    // Метод для перевірки чи студент зареєстрований
    isStudentRegistered(student) {
        return this.students.indexOf(student) !== -1;
    }
}
// Клас CourseManager
class CourseManager {
    constructor() {
        this.courses = [];
    }
    // Метод для додавання курсу
    addCourse(course) {
        this.courses.push(course);
        console.log(`Курс "${course.name}" додано до системи`);
    }
    // Метод для видалення курсу
    removeCourse(courseName) {
        const index = this.courses.findIndex(course => course.name === courseName);
        if (index !== -1) {
            this.courses.splice(index, 1);
            console.log(`Курс "${courseName}" видалено з системи`);
        }
        else {
            console.log(`Курс "${courseName}" не знайдено`);
        }
    }
    // Метод для пошуку курсу за назвою
    findCourse(courseName) {
        return this.courses.find(course => course.name === courseName);
    }
    // Метод для виведення списку всіх курсів
    displayAllCourses() {
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
            }
            else {
                console.log(`   Студенти: немає зареєстрованих`);
            }
        });
    }
}
// ============= ДЕМОНСТРАЦІЯ РОБОТИ =============
console.log("========== СИСТЕМА УПРАВЛІННЯ КУРСАМИ ==========\n");
// Створення кількох курсів
const jsBasics = new OnlineCourse("JavaScript Basics", 40);
const pythonAdvanced = new OnlineCourse("Python Advanced", 60);
const webDevelopment = new OnlineCourse("Web Development", 80);
const datascience = new OnlineCourse("Data Science Fundamentals", 100);
// Створення менеджера курсів
const courseManager = new CourseManager();
// Додавання курсів до менеджера
console.log("--- Додавання курсів ---");
courseManager.addCourse(jsBasics);
courseManager.addCourse(pythonAdvanced);
courseManager.addCourse(webDevelopment);
courseManager.addCourse(datascience);
// Реєстрація студентів на курси
console.log("\n--- Реєстрація студентів ---");
jsBasics.registerStudent("Олександр Коваленко");
jsBasics.registerStudent("Марія Петренко");
jsBasics.registerStudent("Іван Шевченко");
jsBasics.registerStudent("Марія Петренко"); // Спроба повторної реєстрації
pythonAdvanced.registerStudent("Анна Ткаченко");
pythonAdvanced.registerStudent("Петро Мельник");
webDevelopment.registerStudent("Олександр Коваленко"); // Той самий студент на іншому курсі
webDevelopment.registerStudent("Василь Кравченко");
webDevelopment.registerStudent("Ольга Бондаренко");
webDevelopment.registerStudent("Марія Петренко");
datascience.registerStudent("Анна Ткаченко");
datascience.registerStudent("Дмитро Сидоренко");
// Перевірка реєстрації студентів
console.log("\n--- Перевірка реєстрації ---");
console.log(`Чи зареєстрований "Олександр Коваленко" на JavaScript Basics? ${jsBasics.isStudentRegistered("Олександр Коваленко") ? "Так" : "Ні"}`);
console.log(`Чи зареєстрований "Дмитро Сидоренко" на JavaScript Basics? ${jsBasics.isStudentRegistered("Дмитро Сидоренко") ? "Так" : "Ні"}`);
// Пошук курсу за назвою
console.log("\n--- Пошук курсу ---");
const foundCourse = courseManager.findCourse("Python Advanced");
if (foundCourse) {
    console.log(`Знайдено курс: ${foundCourse.name}, тривалість: ${foundCourse.duration} годин`);
}
else {
    console.log("Курс не знайдено");
}
// Виведення списку всіх курсів
courseManager.displayAllCourses();
// Видалення курсу
console.log("\n--- Видалення курсу ---");
courseManager.removeCourse("Data Science Fundamentals");
// Виведення оновленого списку курсів
courseManager.displayAllCourses();
// Спроба видалити неіснуючий курс
console.log("\n--- Спроба видалити неіснуючий курс ---");
courseManager.removeCourse("Machine Learning");
