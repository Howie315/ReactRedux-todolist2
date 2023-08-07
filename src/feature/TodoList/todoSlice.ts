import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Todo } from "./domain/Todo"; // Import the Todo interface
import axios from "axios";
import TodoListRepoImpl, { TodoListRepo } from "./domain/TodoListRepo";

//the todo array
interface TodoState {
	todos: Todo[];
	isLoading: boolean;
	error: string | null;
}

// Create an instance of TodoListRepoImpl to use as the implementation
const todoListRepo: TodoListRepo = new TodoListRepoImpl();
// this is explicit typing

// the intial state of the todo array
const initialState: TodoState = {
	todos: [],
	isLoading: false,
	error: null,
};

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
	return await todoListRepo.getTodos();
});

export const saveTodo = createAsyncThunk(
	"todo/saveTodo",
	async (todo: Todo) => {
		return await todoListRepo.addTodo(todo);
	},
);

export const updateTodo = createAsyncThunk(
	"todo/updateTodo",
	async (todo: Todo) => {
		return await todoListRepo.toggleTodo(todo);
	},
);

export const removeTodo = createAsyncThunk(
	"todo/removeTodo",
	async (todoId: number) => {
		await todoListRepo.deleteTodo(todoId);
		return todoId;
	},
);

// the todo list with its functions
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

	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.todos = action.payload;
				state.error = null;
			})
			.addCase(fetchTodos.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || "An error occurred";
			})

			.addCase(saveTodo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(saveTodo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.todos.push(action.payload);
				state.error = null;
			})
			.addCase(saveTodo.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || "An error occurred";
			})

			.addCase(updateTodo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateTodo.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.todos.findIndex(
					(todo) => todo.id === action.payload.id,
				);
				if (index !== -1) {
					state.todos[index] = action.payload;
				}
				state.error = null;
			})
			.addCase(updateTodo.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || "An error occurred";
			})

			.addCase(removeTodo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(removeTodo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.todos = state.todos.filter((todo) => todo.id !== action.payload);
				state.error = null;
			})
			.addCase(removeTodo.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || "An error occurred";
			});
	},
});

export const { addTodo, toggleTodo, deleteTodo, reorderTodos } =
	todoSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectTodos = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;
