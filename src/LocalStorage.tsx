import { Category } from "./models/Category";
import { Event } from "./models/Event";
import { Task } from "./models/Task";
import { Notification } from "./models/Notification";

const ls = {
  events: "events",
  tasks: "tasks",
  categories: "categories",
  notifications: "notifications",
};

const dateReviver = function (key: string, value: any) {
  //transform string value "2023-12-11T00:00:00.000Z" to Date object
  if (typeof value === 'string') {
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

    if (dateRegex.test(value)) {
      return new Date(value);
    }
  }
  return value;
}

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

// Categories

export function getNotifications(): Notification[] {
  return JSON.parse(localStorage.getItem(ls.categories) || "[]");
}

export function setNotifications(notifications: Notification[]) {
  localStorage.setItem(ls.notifications, JSON.stringify(notifications));
}

export function addNotification(notification: Notification) {
  const notifications = getNotifications();
  notifications.push(notification);
  setNotifications(notifications);
}

export function deleteNotification(id: number) {
  const notifications = getNotifications();
  const newNotifications = notifications.filter(
    (notification: Notification) => notification.id !== id
  );
  setNotifications(newNotifications);
}

export function updateNotification(notification: Notification) {
  const notifications = getNotifications();
  const newNotifications = notifications.map((n: Notification) => {
    if (n.id === notification.id) {
      return notification;
    }
    return n;
  });
  setNotifications(newNotifications);
}
