import { Todo } from "./Todo";

// Define the interface for the TodoListRepo
export interface TodoListRepo {
	getTodos(): Promise<Todo[]>;
	addTodo(todo: Todo): Promise<Todo>;
	toggleTodo(todo: Todo): Promise<Todo>;
	deleteTodo(todoId: number): Promise<void>;
}

// Mock implementation of the TodoListRepo
let todos: Todo[] = [];

export const TodoListRepoImpl: TodoListRepo = {
	getTodos: () => Promise.resolve(todos),
	addTodo: (todo) => {
		const newTodo = { ...todo };
		todos.push(newTodo);
		return Promise.resolve(newTodo);
	},
	toggleTodo: (todo) => {
		const index = todos.findIndex((t) => t.id === todo.id);
		if (index !== -1) {
			todos[index] = { ...todo };
			return Promise.resolve(todo);
		}
		return Promise.reject(new Error("Todo not found"));
	},
	deleteTodo: (todoId) => {
		todos = todos.filter((t) => t.id !== todoId);
		return Promise.resolve();
	},
};
