import { Importancy } from "./Importancy";

export class Event {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    reminder: Date;
    category: number;
    importancy: Importancy;

    constructor(id: number, name: string, description: string, startDate: Date, endDate: Date,
        reminder: Date, category: number, importancy: Importancy) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reminder = reminder;
        this.category = category;
        this.importancy = importancy;
    }
}