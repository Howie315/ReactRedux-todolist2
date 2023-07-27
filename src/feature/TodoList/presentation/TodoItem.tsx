import React from "react";
import { useAppDispatch } from "../store";
import {
	toggleTodo,
	deleteTodo,
	reorderTodos,
	updateTodo,
	removeTodo,
} from "../todoSlice";
import { Delete, Check, ArrowUpward } from "@mui/icons-material";
import { Todo } from "../domain/Todo";

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

	const handleToggleClick = async () => {
		const toggledTodo = { ...todo, completed: !todo.completed };
		try {
			// eslint-disable-next-line @typescript-eslint/await-thenable
			await dispatch(toggleTodo(todo.id));
		} catch (error) {
			console.error("Failed to toggle todo:", error);
		}
	};

	const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		handleToggleClick().catch((error) => {
			console.error("Failed to handle checkbox click:", error);
		});
	};
	const handleDeleteClick = () => {
		dispatch(removeTodo(todo.id)).catch((error) => {
			console.error("Failed to delete todo:", error);
		});
	};

	return (
		<ListItem
			key={todo.id}
			disablePadding
			button
			onClick={() => {
				void (async () => {
					await handleToggleClick();
				})();
			}}
			sx={{
				textDecoration: todo.completed ? "line-through" : "none",
			}}
		>
			<Checkbox
				checked={todo.completed}
				onClick={handleCheckboxClick}
				onChange={(e) => e.stopPropagation()}
			></Checkbox>

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
