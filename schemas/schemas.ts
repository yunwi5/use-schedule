import Joi from "joi";

export const TaskSchema: Joi.ObjectSchema<any> = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	timeString: Joi.string().required(),
	userId: Joi.string().required(),
	plannerType: Joi.string().required(),
	dueDateString: Joi.string()
});

export const SubTaskSchema: Joi.ObjectSchema<any> = Joi.object({
	name: Joi.string().required(),
	isImportant: Joi.boolean().required(),
	isCompleted: Joi.boolean().required(),
	order: Joi.number().required(),
	parentTaskId: Joi.string().required(),
	isTemplated: Joi.boolean() // optional attribute to indicate if the subtask is a child of template task.
});

export const TemplateSchema: Joi.ObjectSchema<any> = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	importance: Joi.number().required(),
	userId: Joi.string().required()
});
