import React, { useState } from "react";
import { useAppDispatch } from "../../store";
import { addTodo } from "../todoSlice";
import { Box } from "@mui/material";
import Button from "../../../components/common/Button"; // Import the Button component
import Input from "../../../components/common/Input"; // Import the Input component

const TodoForm: React.FC = () => {
	const [newTodoText, setNewTodoText] = useState("");
	const dispatch = useAppDispatch();

	const handleAddTodo = () => {
		if (newTodoText.trim() !== "") {
			dispatch(addTodo(newTodoText));
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
