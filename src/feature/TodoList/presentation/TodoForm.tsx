import React, { useState } from "react";
import { useAppDispatch } from "../store";
import { addTodo, saveTodo } from "../todoSlice";
import { Box } from "@mui/material";
import Button from "../../../components/common/Button"; // Import the Button component
import Input from "../../../components/common/Input"; // Import the Input component
import { Todo } from "../domain/Todo";

import { unwrapResult } from "@reduxjs/toolkit";

const TodoForm: React.FC = () => {
	const [newTodoText, setNewTodoText] = useState("");
	const dispatch = useAppDispatch();

	const handleAddTodo = async () => {
		if (newTodoText.trim()) {
			const newTodo: Todo = {
				id: Date.now(),
				text: newTodoText,
				completed: false,
			};
			try {
				await dispatch(saveTodo(newTodo));
				setNewTodoText(""); // Clear the input only if the todo was successfully saved.
			} catch (error) {
				console.error("Failed to add todo:", error);
			}
		}
	};

	return (
		<Box>
			<Input
				type="text"
				label="New Todo"
				value={newTodoText}
				onChange={(e) => setNewTodoText(e.target.value)}
				multiline
				rows={1}
				sx={{ mr: 1, width: 200 }}
			/>
			<Button
				variant="contained"
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={handleAddTodo}
				sx={{ minWidth: 100, minHeight: 53 }}
			>
				Add Todo
			</Button>
		</Box>
	);
};

export default TodoForm;
