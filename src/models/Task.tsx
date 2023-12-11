import { Priority } from "./Priority";

export class Task {
  id: number;
  name: string;
  description: string;
  date: Date;
  priority: Priority;

  constructor(
    id: number,
    name: string,
    description: string,
    date: Date,
    priority: Priority
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.priority = priority;
  }
}
