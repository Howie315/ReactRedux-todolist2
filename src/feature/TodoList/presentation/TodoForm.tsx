import React, { useState } from "react";
import { useAppDispatch } from "../store";
import { addTodo } from "../todoSlice";
import { Box } from "@mui/material";
import Button from "../../../components/common/Button"; // Import the Button component
import Input from "../../../components/common/Input"; // Import the Input component
import { Todo } from "../domain/Todo";

const TodoForm: React.FC = () => {
	const [newTodoText, setNewTodoText] = useState("");
	const dispatch = useAppDispatch();

	const handleAddTodo = () => {
		if (newTodoText.trim() !== "") {
			const newTodo: Todo = {
				id: Date.now(),
				text: newTodoText,
				completed: false,
			};
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			dispatch(addTodo(newTodo)); // Dispatch the addTodo action with the newTodo object
			setNewTodoText("");
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
				onClick={handleAddTodo}
				sx={{ minWidth: 100, minHeight: 53 }}
			>
				Add Todo
			</Button>
		</Box>
	);
};

export default TodoForm;
