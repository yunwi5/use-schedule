import {
	taskSchema,
	subTaskSchema,
	templateSchema,
	taskPropsSchema,
	subTaskPropsSchema,
	templatePropsSchema
} from "./schemas";
import Joi from "joi";

function doValidation ({ error }: { error?: Joi.ValidationError }, subject: string = "Object") {
	let message: string;
	if (error) {
		message = error.details.map((el) => el.message).join("");
		return { isValid: false, message };
	}
	return { isValid: true, message: `${subject} is(are) valid.` };
}

export function validateTask (task: any) {
	const result = taskSchema.validate(task);
	return doValidation(result, "Task");
}
export function validateTaskProps (taskProps: any) {
	const result = taskPropsSchema.validate(taskProps);
	return doValidation(result, "TaskProps");
}

export function validateSubTask (subTask: any) {
	const result = subTaskSchema.validate(subTask);
	return doValidation(result, "SubTask");
}
export function validateSubTaskProps (subTaskProps: any) {
	const result = subTaskPropsSchema.validate(subTaskProps);
	return doValidation(result, "SubTask properties");
}

export function validateTemplate (template: any) {
	const result = templateSchema.validate(template);
	return doValidation(result, "Template");
}

export function validateTemplateProps (props: any) {
	const result = templatePropsSchema.validate(props);
	return doValidation(result, "Template properties");
}
