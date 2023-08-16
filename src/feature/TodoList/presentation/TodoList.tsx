/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { addTodo, fetchTodos, reorderTodos } from "../todoSlice";
import TodoForm from "./TodoForm"; // Import the TodoForm component
import { selectTodos, selectLoadingStates, selectError } from "../todoSelector";
import { Box, Typography, List, TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
	DraggableLocation,
} from "react-beautiful-dnd";

import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList: React.FC = () => {
	const todos = useAppSelector(selectTodos);

	const loadingStates = useAppSelector(selectLoadingStates);
	const error = useAppSelector(selectError);

	const [newTodoText, setNewTodoText] = useState("");
	const dispatch = useAppDispatch();

	const [enableAnimations, setEnableAnimations] = useState(false); // Add this state

	useEffect(() => {
		setEnableAnimations(false); // Disable animations while fetching todos
		void dispatch(fetchTodos());
	}, [dispatch]);

	const onDragEnd = (result: DropResult) => {
		const source: DraggableLocation | undefined = result.source;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const destination: DraggableLocation | null | undefined =
			result.destination;

		// dropped outside the list
		if (
			!destination ||
			(source.droppableId === destination.droppableId &&
				source.index === destination.index)
		) {
			return;
		}

		const newTodos = Array.from(todos);
		const [reorderedItem] = newTodos.splice(source.index, 1);
		newTodos.splice(destination.index, 0, reorderedItem);

		// Update the state with the re-ordered todos
		dispatch(reorderTodos(newTodos));
	};

	return (
		<Box
			className="todo-list-container"
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
		>
			{error && <Alert severity="error">{error}</Alert>}
			<Typography variant="h2" component="h2" className="todo-list-title">
				Todo List
			</Typography>

			<TodoForm />
			<Box className="todo-list">
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="todoList">
						{(provided) => (
							<List
								{...provided.droppableProps}
								ref={provided.innerRef}
								sx={{ width: "100%", maxWidth: 280 }}
							>
								{todos.map((todo, index) => (
									<Draggable
										key={todo.id}
										draggableId={todo.id.toString()}
										index={index}
									>
										{(provided) => (
											<li
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<TodoItem todo={todo} />
											</li>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</List>
						)}
					</Droppable>
				</DragDropContext>
			</Box>
		</Box>
	);
};

export default TodoList;
