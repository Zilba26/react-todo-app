import { Task } from "./Task";
import { Event } from "./Event";

export class Notification {
    id: number;
    name: string;
    reminder: Date;
    task: Task | undefined;
    event: Event | undefined;

    constructor(id: number, name: string, task: Task | undefined, event: Event | undefined) {
        this.id = id;
        this.name = name;
        this.reminder = new Date();

        if (task) {
            this.task = task;
            this.reminder = task.date;
        }
        if (event) {
            this.event = event;
            if (event.reminder) {
                this.reminder = event.reminder;
            } else {
                this.reminder = event.startDate;
            }
        }

    }
}
