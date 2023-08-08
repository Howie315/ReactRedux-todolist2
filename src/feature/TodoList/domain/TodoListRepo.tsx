import { Todo } from "./Todo";
import db from "../utils/db";
import Dexie from "dexie";
// Define the interface for the TodoListRepo
export interface TodoListRepo {
	getTodos(): Promise<Todo[]>;
	addTodo(todo: Todo): Promise<Todo>;
	toggleTodo(todo: Todo): Promise<Todo>;
	deleteTodo(todoId: number): Promise<void>;
}

//turn into a class
//use the todointerface to pass into the instance of it into the todolistrepoimpl
//use the array within in the todolistrepoimpl
//
class TodoListRepoImpl implements TodoListRepo {
	constructor() {
		// You can also add data here to prepopulate the database, if needed
		void db.open(); // Open the database
	}

	async getTodos(): Promise<Todo[]> {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// Use the Dexie library to fetch data from the 'todos' table in IndexedDB
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			const todos = await db.todos.toArray();
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return

			return todos;
		} catch (error) {
			console.error("Error while fetching todos:", error);
			throw new Error("Failed to fetch todos");
		}
	}

	async addTodo(todo: Todo): Promise<Todo> {
		try {
			// Use the Dexie library to add a new todo to the 'todos' table in IndexedDB
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			const newTodoId = await db.todos.add(todo);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			return { ...todo, id: newTodoId };
		} catch (error) {
			console.error("Error while adding a todo:", error);
			throw new Error("Failed to add todo");
		}
	}

	async toggleTodo(todo: Todo): Promise<Todo> {
		try {
			// Use the Dexie library to update a todo in the 'todos' table in IndexedDB
			await db.todos.update(todo.id, { completed: !todo.completed });
			return { ...todo, completed: !todo.completed };
		} catch (error) {
			console.error("Error while toggling a todo:", error);
			throw new Error("Failed to toggle todo");
		}
	}

	async deleteTodo(todoId: number): Promise<void> {
		try {
			// Use the Dexie library to delete a todo from the 'todos' table in IndexedDB
			await db.todos.delete(todoId);
		} catch (error) {
			console.error("Error while deleting a todo:", error);
			throw new Error("Failed to delete todo");
		}
	}
}

export default TodoListRepoImpl;
