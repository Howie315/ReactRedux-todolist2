import React, { useState } from "react";
import { useAppDispatch } from "./store/store";
import { addTodo } from "./store/todoSlice";
import TodoList from "./components/TodoList";
import { TextField, Button } from "@mui/material";
import "./App.css";

const App: React.FC = () => {
	const [newTodoText, setNewTodoText] = useState("");
	const dispatch = useAppDispatch();

	const handleAddTodo = () => {
		if (newTodoText.trim() !== "") {
			dispatch(addTodo(newTodoText));
			setNewTodoText("");
		}
	};

	return (
		<div>
			<TodoList />
		</div>
	);
};

export default App;
