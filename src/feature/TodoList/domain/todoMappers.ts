import { TodoAPIModel } from "../api/TodoApiModel";
import { Todo } from "./Todo";

export const mapToDomainModel = (apiModel: TodoAPIModel): Todo => ({
	id: apiModel.todo_id,
	text: apiModel.description,
	completed: apiModel.is_done,
});

export const mapToApiModel = (domainModel: Todo): TodoAPIModel => ({
	todo_id: domainModel.id,
	description: domainModel.text,
	is_done: domainModel.completed,
});
