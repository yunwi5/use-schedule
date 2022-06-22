import Joi from 'joi';

import { taskSchema, subTaskSchema, taskPropsSchema, subTaskPropsSchema } from './schemas';
import {
    todoListSchema,
    todoSchema,
    subTodoSchema,
    todoListPropsSchema,
    todoPropsSchema,
    subTodoPropsSchema,
} from './todo-schemas';
import { eventSchema, eventPropsSchema, participantSchema } from './event-schemas';
import { templatePropsSchema, templateSchema } from './tempalte-schemas';

function doValidation({ error }: { error?: Joi.ValidationError }, subject: string = 'Object') {
    let message: string;
    if (error) {
        message = error.details.map((el) => el.message).join('');
        return { isValid: false, message };
    }
    return { isValid: true, message: `${subject} is(are) valid.` };
}

export function validateTask(task: any) {
    const result = taskSchema.validate(task);
    return doValidation(result, 'Task');
}
export function validateTaskProps(taskProps: any) {
    const result = taskPropsSchema.validate(taskProps);
    return doValidation(result, 'TaskProps');
}

export function validateSubTask(subTask: any) {
    const result = subTaskSchema.validate(subTask);
    return doValidation(result, 'SubTask');
}
export function validateSubTaskProps(subTaskProps: any) {
    const result = subTaskPropsSchema.validate(subTaskProps);
    return doValidation(result, 'SubTask properties');
}

export function validateTemplate(template: any) {
    const result = templateSchema.validate(template);
    return doValidation(result, 'Template');
}

export function validateTemplateProps(props: any) {
    const result = templatePropsSchema.validate(props);
    return doValidation(result, 'Template properties');
}

// Validate TodoList, Todos, SubTodos
export function validateTodoList(todoList: any) {
    return doValidation(todoListSchema.validate(todoList), 'Todo List');
}

export function validateTodo(todo: any) {
    return doValidation(todoSchema.validate(todo), 'Todo');
}

export function validateSubTodo(subTodo: any) {
    return doValidation(subTodoSchema.validate(subTodo), 'Sub Todo');
}

export function validateTodoListProps(listProps: any) {
    return doValidation(todoListPropsSchema.validate(listProps), 'Todo List properties');
}

export function validateTodoProps(todoProps: any) {
    return doValidation(todoPropsSchema.validate(todoProps), 'Todo List properties');
}

export function validateSubTodoProps(subTodoProps: any) {
    return doValidation(subTodoPropsSchema.validate(subTodoProps), 'Todo List properties');
}

// Validate events / event props
export function validateEvent(event: any) {
    return doValidation(eventSchema.validate(event), 'Event');
}

export function validateEventProps(eventProps: any) {
    return doValidation(eventPropsSchema.validate(eventProps), 'Event properties');
}

export function validateParticipants(participants: any[]) {
    return participants.some((participant) =>
        doValidation(participantSchema.validate(participant), 'Participant'),
    );
}
