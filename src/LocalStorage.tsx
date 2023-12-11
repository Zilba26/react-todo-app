import { Category } from "./models/Category";
import { Event } from "./models/Event";

const ls = {
  events: "events",
  categories: "categories",
};

// Events

export function getEvents(): Event[] {
  return JSON.parse(localStorage.getItem(ls.events) || "[]");
}

export function getEventsByDay(day: Date) : Event[] {
    const tasks = getEvents();
    return tasks
    // .filter((task: Event) => {
    //     return task.date.getFullYear() === day.getFullYear() &&
    //         task.date.getMonth() === day.getMonth() &&
    //         task.date.getDate() === day.getDate();
    // });

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

export function deleteAllCategories() {
  localStorage.removeItem(ls.categories);
}
