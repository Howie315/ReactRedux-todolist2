import { Todo } from "./Todo";

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
	private todos: Todo[]; // The array should be inside the class

	constructor() {
		this.todos = [
			{ id: 1, text: "Buy groceries", completed: false },
			{ id: 2, text: "Do laundry", completed: false },
			{ id: 3, text: "Walk the dog", completed: false },
		];
	}
	async getTodos(): Promise<Todo[]> {
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay of 1 second
		return Promise.resolve([...this.todos]); // Copy the array to ensure it is extensible
	}

	async addTodo(todo: Todo): Promise<Todo> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
		if (todo.text.toLowerCase() === "apple") {
			// assuming the attribute is 'name'
			throw new Error("The item 'apple' is not correct.");
		}
		const newTodo = { ...todo };

		this.todos.push(newTodo);
		return Promise.resolve(newTodo);
	}

	async toggleTodo(todo: Todo): Promise<Todo> {
		const index = this.todos.findIndex((t) => t.id === todo.id);
		if (index !== -1) {
			this.todos[index] = { ...todo };
			return Promise.resolve(todo);
		}
		return Promise.reject(new Error("Todo not found"));
	}

	async deleteTodo(todoId: number): Promise<void> {
		this.todos = this.todos.filter((t) => t.id !== todoId);
		return Promise.resolve();
	}
}

export default TodoListRepoImpl;
