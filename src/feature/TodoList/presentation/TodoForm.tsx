import React, { useState } from "react";
import { useAppDispatch } from "../store";
import { addTodo } from "../todoSlice";
import { Box } from "@mui/material";
import Button from "../../../components/common/Button"; // Import the Button component
import Input from "../../../components/common/Input"; // Import the Input component
import { Todo } from "../domain/Todo";
import { TodoListRepoImpl } from "../domain/TodoListRepo";

const TodoForm: React.FC = () => {
	const [newTodoText, setNewTodoText] = useState("");
	const dispatch = useAppDispatch();

	const handleAddTodo = async () => {
		if (newTodoText.trim() !== "") {
			const newTodo: Todo = {
				id: Date.now(),
				text: newTodoText,
				completed: false,
			};

			try {
				const addedTodo = await TodoListRepoImpl.addTodo(newTodo);
				dispatch(addTodo(addedTodo)); // Dispatch the addTodo action with the newly added todo
				setNewTodoText("");
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
				onClick={() => {
					void (async () => {
						await handleAddTodo();
					})();
				}}
				sx={{ minWidth: 100, minHeight: 53 }}
			>
				Add Todo
			</Button>
		</Box>
	);
};

export default TodoForm;
