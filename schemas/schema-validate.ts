import { TaskSchema, SubTaskSchema, TemplateSchema } from "./schemas";

export function validateSubTask () {
	const { error } = TaskSchema.validate({});
}

export function validateTask () {}

export function validateTemplate () {}
