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
		this.todos = [];
	}
	getTodos(): Promise<Todo[]> {
		return Promise.resolve(this.todos);
	}

	addTodo(todo: Todo): Promise<Todo> {
		const newTodo = { ...todo };
		this.todos.push(newTodo);
		return Promise.resolve(newTodo);
	}

	toggleTodo(todo: Todo): Promise<Todo> {
		const index = this.todos.findIndex((t) => t.id === todo.id);
		if (index !== -1) {
			this.todos[index] = { ...todo };
			return Promise.resolve(todo);
		}
		return Promise.reject(new Error("Todo not found"));
	}

	deleteTodo(todoId: number): Promise<void> {
		this.todos = this.todos.filter((t) => t.id !== todoId);
		return Promise.resolve();
	}
}

export default TodoListRepoImpl;
