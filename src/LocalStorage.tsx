import { Category } from "./models/Category";
import { Event } from "./models/Event";
import { Priority } from "./models/Priority";
import { Task } from "./models/Task";

const ls = {
  events: "events",
  tasks: "tasks",
  categories: "categories",
};

const dateReviver = function (key: string, value: any) {
  //transform string value "2023-12-11T00:00:00.000Z" to Date object
  if (typeof value === "string") {
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

    if (dateRegex.test(value)) {
      return new Date(value);
    }
  }
  return value;
};

// Tasks
export function getTasks(): Task[] {
  return JSON.parse(localStorage.getItem(ls.tasks) || "[]");
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
  const newTasks = tasks.map((r: Task) => {
    if (r.id === task.id) {
      return task;
    }
    return r;
  });
  setTasks(newTasks);
}

// Events

export function getEvents(): Event[] {
  return JSON.parse(localStorage.getItem(ls.events) || "[]", dateReviver);
}

export function getEventsByDay(day: Date) : Event[] {
    const tasks = getEvents();
    const mockEvent = new Event(1, "test", "description", new Date(), new Date(Date.now() + 1000 * 60 * 60 * 2), new Date(), new Category(1, "test", "#AA0000"), Priority.NORMAL);
    const mockEvent2 = new Event(2, "test", "description2", new Date(Date.now() + 1000 * 60 * 60), new Date(Date.now() + 1000 * 60 * 60 * 3), new Date(), new Category(1, "test", "#AA0000"), Priority.NORMAL);
    tasks.push(mockEvent);
    tasks.push(mockEvent2);
    return tasks
    .filter((task: Event) => {
        return task.startDate.getFullYear() === day.getFullYear() &&
            task.startDate.getMonth() === day.getMonth() &&
            task.startDate.getDate() === day.getDate();
    });

}

export function setEvents(events: Event[]) {
  localStorage.setItem(ls.events, JSON.stringify(events));
}

export function addEvent(event: Event) {
  const events = getEvents();
  events.push(event);
  setEvents(events);
}

export function deleteEvent(id: number) {
  const events = getEvents();
  const newEvents = events.filter((event: Event) => event.id !== id);
  setEvents(newEvents);
}

export function updateEvent(event: Event) {
  const events = getEvents();
  const newEvents = events.map((t: Event) => {
    if (t.id === event.id) {
      return event;
    }
    return t;
  });
  setEvents(newEvents);
}

// Categories

export function getCategories(): Category[] {
  return JSON.parse(localStorage.getItem(ls.categories) || "[]");
}

export function getCategoryByName(name: string): Category {
  const categories = getCategories();
  const category = categories.find(
    (category: Category) => category.name === name
  );
  if (category === undefined) {
    throw new Error(`Category with name ${name} not found`);
  }
  return category;
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
  const newCategories = categories.filter(
    (category: Category) => category.id !== id
  );
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
