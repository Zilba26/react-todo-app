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
  const tasks = JSON.parse(localStorage.getItem(ls.tasks) || "[]");
  return tasks.map((task: any) => {
    task.category = getCategory(task.category);
    return Task.fromJson(task);
  });
}

export function getTaskById(id: number): Task {
  const tasks = getTasks();
  const task = tasks.find((task: Task) => task.id === id);
  if (task === undefined) {
    throw new Error(`Task with id ${id} not found`);
  }
  return task;
}

export function setTasks(tasks: Task[]) {
  const tasksJson = tasks.map((task: Task) => {
    const jsonTask = task.toJson();
    jsonTask.category = task.category.id;
    return jsonTask;
  });
  localStorage.setItem(ls.tasks, JSON.stringify(tasksJson));
  window.location.reload();
}

export function addTask(task: Task) {
  const tasks = getTasks();
  tasks.push(task);
  setTasks(tasks);

  addNotification(
    new Notification(
      getNotifications().length + 1,
      "Tâche : " + task.name,
      task,
      undefined
    )
  );
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
  const events = JSON.parse(localStorage.getItem(ls.events) || "[]", dateReviver);
  return events.map((event: any) => {
    event.category = getCategory(event.category);
    return Event.fromJson(event);
  });
}

export function getEventsByDay(day: Date) : Event[] {
    const tasks = getEvents();
    const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0);
    const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59);
    return tasks.filter((task) => {
        return task.startDate.getTime() <= dayEnd.getTime() && task.endDate.getTime() >= dayStart.getTime();
    });
}

export function setEvents(events: Event[]) {
  const eventsJson = events.map((event: Event) => {
    const jsonEvent = event.toJson();
    jsonEvent.category = event.category.id;
    return jsonEvent;
  });
  localStorage.setItem(ls.events, JSON.stringify(eventsJson));
  window.location.reload();
}

export function addEvent(event: Event) {
  const events = getEvents();
  events.push(event);
  setEvents(events);
  addNotification(
    new Notification(
      getNotifications().length + 1,
      "Évènement : " + event.name,
      undefined,
      event
    )
  );
}

export function deleteEvent(id: number) {
  const events = getEvents();
  const newEvents = events.filter((event: Event) => event.id !== id);
  setEvents(newEvents);
}

export function updateEvent(event: Event) {
  const events = getEvents();
  const newEvents = events.map((e: Event) => {
    if (e.id == event.id) {
      return event;
    }
    return e;
  });
  setEvents(newEvents);
}

// Categories

export function getCategories(): Category[] {
  return JSON.parse(localStorage.getItem(ls.categories) || "[]");
}

export function getCategory(id: number): Category {
  const categories = getCategories();
  const category = categories.find((category: Category) => category.id === id);
  if (category === undefined) {
    throw new Error(`Category with id ${id} not found`);
  }
  return category;
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

// Categories

export function getNotifications(): Notification[] {
  return JSON.parse(localStorage.getItem(ls.notifications) || "[]");
}

export function setNotifications(notifications: Notification[]) {
  localStorage.setItem(ls.notifications, JSON.stringify(notifications));
  window.location.reload();
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

export function getCurrentNotifications(): string[][] {
  const notifications: Notification[] = getNotifications();

  const nofiticationString: string[][] = [];

  for (let i = 0; i < notifications.length; i++) {
    const notification = notifications[i];

    const reminderDate = new Date(notification.reminder);

    if (reminderDate < new Date()) {
      const hours = String(reminderDate.getHours()).padStart(2, '0');
      const minutes = String(reminderDate.getMinutes()).padStart(2, '0');
      const day = String(reminderDate.getDate()).padStart(2, '0');
      const month = String(reminderDate.getMonth() + 1).padStart(2, '0');
      const year = reminderDate.getFullYear();

      nofiticationString[i] = [notification.id.toString(), `${notification.name} à ${hours}:${minutes} le ${day}/${month}/${year}`];
    }
  }

  return nofiticationString;
}
