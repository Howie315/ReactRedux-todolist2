import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addTodo, reorderTodos, selectTodos } from "../store/todoSlice";
import { Typography, List, TextField, Button } from "@mui/material";
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
		<div className="todo-list-container">
			<Typography variant="h2" component="h2" className="todo-list-title">
				Todo List
			</Typography>
			<div>
				<TextField
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
			</div>
			<div className="todo-list">
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
			</div>
		</div>
	);
};

export default TodoList;
