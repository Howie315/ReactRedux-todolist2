/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from "react";
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
	Slide,
} from "@mui/material";

import "./TodoItem.css";

interface Props {
	todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
	const dispatch = useAppDispatch();

	const [isExiting, setIsExiting] = useState(false);
	const [completed, setCompleted] = useState(todo.completed);
	const [initialLoad, setInitialLoad] = useState(true); // Add this state

	const handleToggleClick = async () => {
		const updatedTodo = { ...todo, completed: todo.completed };
		try {
			await dispatch(updateTodo(updatedTodo)); // Use the updateTodo action instead
			setCompleted(!completed); // Update the completed status
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
	// eslint-disable-next-line @typescript-eslint/require-await
	const handleDeleteClick = async () => {
		setIsExiting(true);
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		setTimeout(async () => {
			try {
				await dispatch(removeTodo(todo.id));
			} catch (error) {
				console.error("Failed to delete todo:", error);
			}
		}, 300); // Adjust the timeout based on your animation duration
	};

	return (
		<Slide
			direction={isExiting ? "left" : "right"}
			in={!isExiting}
			timeout={300}
		>
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
					textDecoration: completed ? "line-through" : "none",
				}}
			>
				<Checkbox
					checked={completed}
					onClick={(e) => e.stopPropagation()}
					onChange={handleToggleClick} // Call handleToggleClick directly here
				></Checkbox>

				<ListItemText primary={todo.text} />
				<ListItemSecondaryAction>
					<IconButton edge="end" onClick={handleDeleteClick}>
						<Delete />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		</Slide>
	);
};

export default TodoItem;
