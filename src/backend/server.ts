import express, { Request, Response, NextFunction } from "express";
import TodoListRepoImpl from "../feature/TodoList/domain/TodoListRepo";

// Create an async wrapper
const asyncWrapper =
	(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
	(req: Request, res: Response, next: NextFunction): Promise<void> =>
		Promise.resolve(fn(req, res, next)).catch(next);

const app = express();

const todoListRepo: TodoListRepoImpl = new TodoListRepoImpl();

app.use(express.json());

app.get(
	"/api/todos",
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	asyncWrapper(async (_req: Request, res: Response) => {
		const todos = await todoListRepo.getTodos();
		res.json(todos);
	}),
);

app.post(
	"/api/todos",
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	asyncWrapper(async (req: Request, res: Response) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const newTodo = req.body;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const addedTodo = await todoListRepo.addTodo(newTodo);
		res.status(201).json(addedTodo);
	}),
);

app.put(
	"/api/todos/:id",
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	asyncWrapper(async (req: Request, res: Response) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const updatedTodo = req.body;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const result = await todoListRepo.toggleTodo(updatedTodo);
		res.json(result);
	}),
);

app.delete(
	"/api/todos/:id",
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	asyncWrapper(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		await todoListRepo.deleteTodo(id);
		res.status(204).end();
	}),
);

app.listen(3000, () => {
	console.log(`Server running at http://localhost:3000`);
});
