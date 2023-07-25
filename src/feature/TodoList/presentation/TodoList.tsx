/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { addTodo, reorderTodos, selectTodos } from "../todoSlice";
import TodoForm from "./TodoForm"; // Import the TodoForm component
import { Box, Typography, List, TextField, Button } from "@mui/material";
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
	const [newTodoText, setNewTodoText] = useState("");
	const dispatch = useAppDispatch();

	const handleAddTodo = () => {
		if (newTodoText.trim() !== "") {
			dispatch(addTodo(newTodoText));
			setNewTodoText("");
		}
	};

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