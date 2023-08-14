import Dexie from "dexie";
import { Todo } from "../domain/Todo";

// Define the database schema
class TodoAppDatabase extends Dexie {
	todos: Dexie.Table<Todo, number>; // Define the 'todos' table

	constructor() {
		super("TodoAppDatabase"); // Database name
		this.version(1).stores({
			todos: "++id,text,completed", // Define the 'todos' table schema
		});
		this.todos = this.table("todos"); // Link the 'todos' table to the class property
	}
}

// Create a new instance of the database
const db = new TodoAppDatabase();

export default db;
