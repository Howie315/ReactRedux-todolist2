import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { addTodo, saveTodo } from "../todoSlice";
import { Box, Slide } from "@mui/material";
import Button from "../../../components/common/Button"; // Import the Button component
import Input from "../../../components/common/Input"; // Import the Input component
import { Todo } from "../domain/Todo";
import "./TodoList.css";
import { unwrapResult } from "@reduxjs/toolkit";
import "./TodoForm.css";
const TodoForm: React.FC = () => {
	const [newTodoText, setNewTodoText] = useState("");
	const addedItemRef = useRef(null);
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

				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
			<div
				ref={addedItemRef}
				className="added-item"
				style={{ opacity: 0 }} // Initially hidden
			>
				{/* Display the added item here */}
			</div>
		</Box>
	);
};

export default TodoForm;
