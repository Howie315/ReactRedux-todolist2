import React from "react";
import { useAppDispatch } from "../store/store";
import { toggleTodo, deleteTodo, Todo, reorderTodos } from "../store/todoSlice";
import { Delete, Check, ArrowUpward } from "@mui/icons-material";

import {
	Checkbox,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
} from "@mui/material";

interface Props {
	todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
	const dispatch = useAppDispatch();

	const handleToggleClick = () => {
		dispatch(toggleTodo(todo.id));
	};

	const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		handleToggleClick();
	};
	const handleDeleteClick = () => {
		dispatch(deleteTodo(todo.id));
	};

	return (
		<ListItem
			key={todo.id}
			disablePadding
			button
			onClick={handleToggleClick}
			sx={{
				textDecoration: todo.completed ? "line-through" : "none",
			}}
		>
			<Checkbox checked={todo.completed} onClick={handleCheckboxClick} />

			<ListItemText primary={todo.text} />
			<ListItemSecondaryAction>
				<IconButton edge="end" onClick={handleDeleteClick}>
					<Delete />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default TodoItem;
