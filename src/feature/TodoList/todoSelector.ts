import { RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";

export const selectTodos = (state: RootState) => state.todo.todos;

// Example of a more complex selector to filter completed todos
export const selectCompletedTodos = createSelector([selectTodos], (todos) =>
	todos.filter((todo) => todo.completed),
);


