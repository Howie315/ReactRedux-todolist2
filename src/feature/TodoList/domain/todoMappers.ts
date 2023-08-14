import { TodoEntity } from "../entity/TodoEntity";
import { Todo } from "./Todo";

export const mapToDomainModel = (entityModel: TodoEntity): Todo => ({
	id: entityModel.id,
	text: entityModel.text,
	completed: entityModel.completed,
});

export const mapToEntityModel = (domainModel: Todo): TodoEntity => ({
	id: domainModel.id,
	text: domainModel.text,
	completed: domainModel.completed,
});
