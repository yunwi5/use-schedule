import { Todo } from "./../models/todo-models/Todo";
import Joi from "joi";
import { TodoList } from "../models/todo-models/TodoList";
import { SubTodo } from "../models/todo-models/SubTodo";

// ID is generated from the server, so does not have to provide from the client.
// Schemas for creation
export const todoListSchema: Joi.ObjectSchema<TodoList> = Joi.object({
    id: Joi.string(),
    name: Joi.string().required().min(3).max(60),
    description: Joi.string().allow("").required(),
    userId: Joi.string().required(),
    themeId: Joi.string(),
});

export const todoSchema: Joi.ObjectSchema<Todo> = Joi.object({
    id: Joi.string(),
    name: Joi.string().required().min(3).max(60),
    isImportant: Joi.boolean().required(),
    isCompleted: Joi.boolean().required(),
    createdAt: Joi.alternatives().try(Joi.string(), Joi.date()).required(),
    updatedAt: Joi.alternatives().try(Joi.string(), Joi.date()),
    duration: Joi.number(),
    dateTime: Joi.alternatives().try(Joi.string(), Joi.date()),
    note: Joi.string().empty(""),
    listId: Joi.string().required(),
    userId: Joi.string().required(),
});

export const subTodoSchema: Joi.ObjectSchema<SubTodo> = Joi.object({
    id: Joi.string(),
    name: Joi.string().required().min(3).max(60),
    order: Joi.number().required(),
    isImportant: Joi.boolean().required(),
    isCompleted: Joi.boolean().required(),
    parentId: Joi.string().required(),
});

// Schemas for patch & update
export const todoListPropsSchema: Joi.ObjectSchema<any> = Joi.object({
    name: Joi.string(),
    description: Joi.string().empty(""),
    userId: Joi.string(),
    themeId: Joi.string(),
});

export const todoPropsSchema: Joi.ObjectSchema<Todo> = Joi.object({
    name: Joi.string().min(3).max(60),
    isImportant: Joi.boolean(),
    isCompleted: Joi.boolean(),
    createdAt: Joi.string(),
    updatedAt: Joi.string(),
    duration: Joi.number(),
    dateTime: Joi.string(),
    note: Joi.string().empty(""),
});

export const subTodoPropsSchema: Joi.ObjectSchema<any> = Joi.object({
    // id: Joi.string(),
    name: Joi.string(),
    order: Joi.number(),
    isImportant: Joi.boolean(),
    isCompleted: Joi.boolean(),
    parentId: Joi.string(),
});
