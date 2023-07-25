import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Todo } from "./domain/Todo"; // Import the Todo interfac
// interface of the todoitem itself

//the todo array
interface TodoState {
	todos: Todo[];
}

// the intial state of the todo array
const initialState: TodoState = {
	todos: [],
};

//the todo list with its functions
// generally it creats a slice of the redux store.
// I gave it a name, the intial state and an object defining several reducers
export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<Todo>) => {
			// Change the payload type to Todo
			state.todos.push(action.payload);
		},
		toggleTodo: (state, action: PayloadAction<number>) => {
			const index = state.todos.findIndex((todo) => todo.id === action.payload);
			if (index !== -1) {
				state.todos[index].completed = !state.todos[index].completed;
			}
		},
		deleteTodo: (state, action: PayloadAction<number>) => {
			const index = state.todos.findIndex((todo) => todo.id === action.payload);
			if (index !== -1) {
				state.todos.splice(index, 1);
			}
		},

		reorderTodos: (state, action: PayloadAction<Todo[]>) => {
			state.todos = action.payload;
		},
	},
});

export const { addTodo, toggleTodo, deleteTodo, reorderTodos } =
	todoSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectTodos = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;
