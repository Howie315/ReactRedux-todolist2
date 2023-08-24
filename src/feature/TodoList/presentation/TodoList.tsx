/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { addTodo, fetchTodos, reorderTodos } from "../todoSlice";
import TodoForm from "./TodoForm"; // Import the TodoForm component
import { selectTodos, selectLoadingStates, selectError } from "../todoSelector";
import {
	Box,
	Typography,
	List,
	TextField,
	Button,
	Divider,
} from "@mui/material"; // Import Divider component} from "@mui/material";
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
		const fetchData = async () => {
			await dispatch(fetchTodos());
		};

		void fetchData();
	}, [dispatch]);

	// if (loadingStates) {
	// 	return (
	// 		<Box
	// 			display="flex"
	// 			justifyContent="center"
	// 			alignItems="center"
	// 			height="100vh"
	// 		>
	// 			<CircularProgress />
	// 		</Box>
	// 	);
	// }

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

	// Separate completed and incomplete todos
	const completedTodos = todos.filter((todo) => todo.completed);
	const incompleteTodos = todos.filter((todo) => !todo.completed);

	return (
		<Box className="todo-list-container">
			{error && <Alert severity="error">{error}</Alert>}
			<Typography variant="h2" component="h2" className="todo-list-title">
				Todo List
			</Typography>

			<TodoForm />

			<Box className="todo-list">
				<DragDropContext onDragEnd={onDragEnd}>
					<div className="section">
						<Typography variant="h6" className="section-title">
							Incomplete
						</Typography>

						<div className="incomplete-section">
							<Droppable droppableId="incompleteTodos" direction="vertical">
								{(provided) => (
									<List {...provided.droppableProps} ref={provided.innerRef}>
										{incompleteTodos.map((todo, index) => (
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
						</div>
					</div>

					<div className="section">
						<Typography variant="h6" className="section-title">
							Completed
						</Typography>

						<div className="completed-section">
							<Droppable droppableId="completedTodos" direction="vertical">
								{(provided) => (
									<List {...provided.droppableProps} ref={provided.innerRef}>
										{completedTodos.map((todo, index) => (
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
						</div>
					</div>
				</DragDropContext>
			</Box>
		</Box>
	);
};
export default TodoList;
