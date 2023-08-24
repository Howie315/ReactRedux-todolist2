import { RootState } from "../../store/store";
import { createSelector } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectTodos = (state: RootState) => state.todo.todos;
export const selectLoadingStates = (state: RootState) => state.todo.isLoading;
export const selectError = (state: RootState) => state.todo.error;
// Example of a more complex selector to filter completed todos
export const selectCompletedTodos = createSelector([selectTodos], (todos) =>
	todos.filter((todo) => todo.completed),
);
