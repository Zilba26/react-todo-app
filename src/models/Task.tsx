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
}
