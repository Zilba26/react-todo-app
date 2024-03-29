import { Category } from "./Category";
import { Priority } from "./Priority";

export class Task {
  id: number;
  name: string;
  description: string;
  date: Date;
  category: Category;
  priority: Priority;

  constructor(
    id: number,
    name: string,
    description: string,
    date: Date,
    category: Category,
    priority: Priority
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.category = category;
    this.priority = priority;
  }

  static fromJson(json: any): Task {
    return new Task(
      json.id,
      json.name,
      json.description,
      new Date(json.date),
      json.category,
      json.priority
    );
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      date: this.date,
      category: this.category,
      priority: this.priority,
    };
  }
}
