// TodoListRepo.tsx
import { Todo } from "./Todo";

// Define the interface for the TodoListRepo
export interface TodoListRepo {
	getTodos(): Promise<Todo[]>;
	addTodo(todo: Todo): Promise<Todo>;
	updateTodo(todo: Todo): Promise<Todo>;
	deleteTodo(todoId: number): Promise<void>;
}
