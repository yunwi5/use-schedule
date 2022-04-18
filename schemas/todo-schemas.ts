import { Todo } from "./../models/todo-models/Todo";
import Joi from "joi";
import { TodoList } from "../models/todo-models/TodoList";
import { SubTodo } from "../models/todo-models/SubTodo";

// ID is generated from the server, so does not have to provide from the client.
// Schemas for creation
export const TodoListSchema: Joi.ObjectSchema<TodoList> = Joi.object({
    id: Joi.string(),
    name: Joi.string().required().min(3).max(60),
    description: Joi.string().required(),
    userId: Joi.number().required(),
    theme: Joi.object(),
});

export const TodoSchema: Joi.ObjectSchema<Todo> = Joi.object({
    id: Joi.string(),
    name: Joi.string().required().min(3).max(60),
    isImportant: Joi.boolean().required(),
    isCompleted: Joi.boolean().required(),
    createdAt: Joi.string().required(),
    updatedAt: Joi.string(),
    duration: Joi.number(),
    dateTime: Joi.string(),
    note: Joi.string(),
    listId: Joi.string().required(),
    userId: Joi.string().required(),
});

export const SubTodoSchema: Joi.ObjectSchema<SubTodo> = Joi.object({
    id: Joi.string(),
    name: Joi.string().required().min(3).max(60),
    order: Joi.number().required(),
    isImportant: Joi.boolean().required(),
    isCompleted: Joi.boolean().required(),
    parentId: Joi.string().required(),
});

// Schemas for patch & update
export const TodoListPropsSchema: Joi.ObjectSchema<any> = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    userId: Joi.string(),
    theme: Joi.object(),
});

export const TodoPropsSchema: Joi.ObjectSchema<Todo> = Joi.object({
    name: Joi.string().min(3).max(60),
    isImportant: Joi.boolean(),
    isCompleted: Joi.boolean(),
    createdAt: Joi.string(),
    updatedAt: Joi.string(),
    duration: Joi.number(),
    dateTime: Joi.string(),
    note: Joi.string(),
});

export const SubTodoPropsSchema: Joi.ObjectSchema<any> = Joi.object({
    // id: Joi.string(),
    name: Joi.string(),
    order: Joi.number(),
    isImportant: Joi.boolean(),
    isCompleted: Joi.boolean(),
    parentId: Joi.string(),
});
