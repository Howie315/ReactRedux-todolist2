/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../store/store";
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
	const [isEntering, setIsEntering] = useState(true); // State for fade-in animation

	// useEffect(() => {
	// 	setIsEntering(false); // Disable entering animation after initial rendering
	// }, []);

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
	// Add a new function for handling entering animation
	const handleEnterAnimation = () => {
		setIsEntering(true);
		setTimeout(() => {
			setIsEntering(false);
		}, 300); // Adjust the timeout based on your animation duration
	};
	// eslint-disable-next-line @typescript-eslint/require-await
	const handleDeleteClick = async () => {
		console.log("Deleting item...");
		setIsExiting(true);
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		setTimeout(async () => {
			try {
				await dispatch(removeTodo(todo.id));
				setIsExiting(false); // Clear the exiting state after the animation completes
			} catch (error) {
				console.error("Failed to delete todo:", error);
			}
		}, 400); // Adjust the timeout based on your animation duration
	};

	return (
		<ListItem
			disablePadding
			button
			onClick={handleToggleClick}
			className={`todo-item ${isExiting ? "exit" : ""}  ${
				completed ? "slide-in-complete" : "slide-in"
			}`}
		>
			<Checkbox
				checked={completed}
				onClick={(e) => e.stopPropagation()}
				onChange={handleToggleClick}
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
