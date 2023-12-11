import { TaskImportancy } from "./TaskImportancy";
import { TaskState } from "./TaskState";

export class Task {
    id: number;
    name: string;
    description: string;
    duration: number;
    date: Date;
    reminders: Date[];
    category: number;
    state: TaskState;
    importancy: TaskImportancy;

    constructor(id: number, name: string, description: string, duration: number, 
        date: Date, reminders: Date[], category: number, state: TaskState, importancy: TaskImportancy) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.date = date;
        this.reminders = reminders;
        this.category = category;
        this.state = state;
        this.importancy = importancy;
    }
}