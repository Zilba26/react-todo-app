import { Category } from "./models/Category";
import { Event } from "./models/Event";
import { Reminder } from "./models/Reminder";

const ls = {
  events: "events",
  reminders: "reminders",
  categories: "categories",
};

// Reminders
export function getReminders(): Reminder[] {
  return JSON.parse(localStorage.getItem(ls.reminders) || "[]");
}

export function setReminders(reminders: Reminder[]) {
  localStorage.setItem(ls.reminders, JSON.stringify(reminders));
}

export function addReminder(reminder: Reminder) {
  const reminders = getReminders();
  reminders.push(reminder);
  setReminders(reminders);
}

export function deleteReminder(id: number) {
  const reminders = getReminders();
  const newReminders = reminders.filter(
    (reminder: Reminder) => reminder.id !== id
  );
  setReminders(newReminders);
}

export function updateReminder(reminder: Reminder) {
  const reminders = getReminders();
  const newReminders = reminders.map((r: Reminder) => {
    if (r.id === reminder.id) {
      return reminder;
    }
    return r;
  });
  setReminders(newReminders);
}

// Events

export function getEvents(): Event[] {
  return JSON.parse(localStorage.getItem(ls.events) || "[]");
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
