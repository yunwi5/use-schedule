import { validateTodo } from '../../schemas/validation';

export interface NoIdTodo {
    id?: string;
    name: string;
    isImportant: boolean;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt?: Date;
    dateTime?: Date;
    duration?: number;
    note?: string;
    steps?: any[];
    listId: string; // will never change
    userId: string; // will never change
}

export interface Todo extends NoIdTodo {
    id: string;
}

export interface DateTodo extends Todo {
    dateTime: Date;
}

export interface TodoProps {
    name?: string;
    isImportant?: boolean;
    isCompleted?: boolean;
    dateTime?: Date;
    updatedAt?: Date;
    duration?: number;
    note?: string;
}

export function isInstanceOfTodoV0(item: object) {
    const hasId = 'id' in item;
    const hasName = 'name' in item;
    const hasIsImportant = 'isImportant' in item;
    const hasIsCompleted = 'isCompleted' in item;
    const hasCreatedAt = 'createdAt' in item;
    const hasListId = 'listId' in item;
    const hasUserId = 'userId' in item;

    return (
        hasId &&
        hasName &&
        hasIsImportant &&
        hasIsCompleted &&
        hasCreatedAt &&
        hasListId &&
        hasUserId
    );
}

export function isInstanceOfTodo(item: object) {
    const { isValid, message } = validateTodo(item);
    const isValid0 = isInstanceOfTodoV0(item);

    if (!isValid && isValid0) {
        console.warn(message);
    }

    return isValid0;
}
