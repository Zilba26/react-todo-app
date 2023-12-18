import { Task } from "./Task";
import { Event } from "./Event";

export class Notification {
  id: number;
  name: string;
  task: Task | undefined;
  event: Event | undefined;

  constructor(
    id: number,
    name: string,
    task: Task | undefined,
    event: Event | undefined
  ) {
    this.id = id;
    this.name = name;
    if (task) {
      this.task = task;
    }
    if (event) {
      this.event = event;
    }
  }
}
