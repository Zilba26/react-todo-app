import { Priority } from "./Priority";

export class Event {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    reminder: Date;
    category: number;
    priority: Priority;

    constructor(id: number, name: string, description: string, startDate: Date, endDate: Date,
        reminder: Date, category: number, priority: Priority) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reminder = reminder;
        this.category = category;
        this.priority = priority;
    }
}