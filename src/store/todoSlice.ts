import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";


// interface of the todoitem itself 
interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

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
		addTodo: (state, action: PayloadAction<string>) => {
			const newTodo = {
				id: Date.now(),
				text: action.payload,
				completed: false,
			};
			state.todos.push(newTodo);
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
	},
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;
