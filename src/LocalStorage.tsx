import { Category } from "./models/Category";
import { Task } from "./models/Task";

const ls = {
    tasks: 'tasks',
    categories: 'categories'
}

// Tasks

export function getTasks() : Task[] {
    return JSON.parse(localStorage.getItem(ls.tasks) || '[]');
}

export function setTasks(tasks: Task[]) {
    localStorage.setItem(ls.tasks, JSON.stringify(tasks));
}

export function addTask(task: Task) {
    const tasks = getTasks();
    tasks.push(task);
    setTasks(tasks);
}

export function deleteTask(id: number) {
    const tasks = getTasks();
    const newTasks = tasks.filter((task: Task) => task.id !== id);
    setTasks(newTasks);
}

export function updateTask(task: Task) {
    const tasks = getTasks();
    const newTasks = tasks.map((t: Task) => {
        if (t.id === task.id) {
            return task;
        }
        return t;
    });
    setTasks(newTasks);
}

// Categories

export function getCategories() : Category[] {
    return JSON.parse(localStorage.getItem(ls.categories) || '[]');
}

export function setCategories(categories: Category[]) {
    localStorage.setItem(ls.categories, JSON.stringify(categories));
}

export function addCategory(category: Category) {
    const categories = getCategories();
    categories.push(category);
    setCategories(categories);
}

export function deleteCategory(id: number) {
    const categories = getCategories();
    const newCategories = categories.filter((category: Category) => category.id !== id);
    setCategories(newCategories);
}

export function updateCategory(category: Category) {
    const categories = getCategories();
    const newCategories = categories.map((c: Category) => {
        if (c.id === category.id) {
            return category;
        }
        return c;
    });
    setCategories(newCategories);
}

export function deleteAllCategories() {
    localStorage.removeItem(ls.categories);
}