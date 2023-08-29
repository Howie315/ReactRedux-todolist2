import { Todo } from "./Todo";
import db from "../utils/db";
import { TodoEntity } from "../entity/TodoEntity";
import Dexie from "dexie";
import { mapToDomainModel, mapToEntityModel } from "./todoMappers"; // Import your mapper functions
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
	private todoCache: Todo[] = [];

	constructor() {
		// You can also add data here to prepopulate the database, if needed
		void db.open(); // Open the database
	}

	async getTodos(): Promise<Todo[]> {
		if (this.todoCache.length > 0) {
			return this.todoCache;
		}

		try {
			// await new Promise((resolve) => setTimeout(resolve, 1000));
			const entityTodos = await db.todos.toArray();
			const domainTodos = entityTodos.map((entity) => mapToDomainModel(entity));

			// Update the cache
			this.todoCache = domainTodos;

			return domainTodos;
		} catch (error) {
			console.error("Error while fetching todos:", error);
			throw new Error("Failed to fetch todos");
		}
	}

	async addTodo(todo: Todo): Promise<Todo> {
		try {
			if (todo.text.toLowerCase() === "apple") {
				throw new Error("The item 'apple' is not correct.");
			}
			const entityTodo: TodoEntity = mapToEntityModel(todo);
			const newTodoId = await db.todos.add(entityTodo);

			// this retrieves the eneity with the newTodoid and then we are gonna transform it
			const addedTodo: TodoEntity | undefined = await db.todos.get(newTodoId);

			if (!addedTodo) {
				throw new Error("Failed to retrieve added todo from the database.");
			}

			// Map the fetched entity back to the Todo type
			const newTodo: Todo = mapToDomainModel(addedTodo);

			// Clear the cache after adding a new todo
			this.todoCache = [];

			return newTodo;
		} catch (error) {
			console.error("Error while adding a todo:", error);
			throw new Error("The item is not available to add");
		}
	}

	async toggleTodo(todo: Todo): Promise<Todo> {
		try {
			const updatedEntityTodo = {
				...mapToEntityModel(todo),
				completed: !todo.completed,
			};
			await db.todos.update(todo.id, updatedEntityTodo);

			// Clear the cache after toggling a todo
			this.todoCache = [];
			return { ...todo, completed: !todo.completed };
		} catch (error) {
			console.error("Error while toggling a todo:", error);
			throw new Error("Failed to toggle todo");
		}
	}

	async deleteTodo(todoId: number): Promise<void> {
		try {
			await db.todos.delete(todoId);
			// Clear the cache after deleting a todo
			this.todoCache = [];
		} catch (error) {
			console.error("Error while deleting a todo:", error);
			throw new Error("Failed to delete todo");
		}
	}
}

export default TodoListRepoImpl;
