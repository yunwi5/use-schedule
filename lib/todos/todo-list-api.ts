import axios from 'axios';
import { Todo } from '../../models/todo-models/Todo';
import { NoIdTodoList, TodoList, TodoListProperties } from '../../models/todo-models/TodoList';

const TODO_API_DOMAIN = process.env.API_DOMIN_RELATIVE
    ? `${process.env.API_DOMIN_RELATIVE}/todos`
    : 'api/todos';

// Error handling is done by react-query, so it would not be needed inside the function
export function fetchAllTodos() {
    return fetch(`${TODO_API_DOMAIN}`).then((res) => res.json());
}

// Todo List APIs
export async function postTodoList(list: NoIdTodoList) {
    let message = '';
    try {
        const { status, data } = await axios.post(`${TODO_API_DOMAIN}/list`, list);
        if (status >= 200 && status < 300)
            return {
                isSuccess: true,
                insertedId: data.insertedId,
                message: 'Posting new todo list successful!',
            };
    } catch (err) {
        message = err instanceof Error ? err.message : '';
    }
    return { isSuccess: false, message: message || 'Posting todo list did not work.' };
}

export async function patchTodoList(listId: string, listProps: TodoListProperties) {
    let message = '';
    try {
        const { status, data } = await axios.patch(`${TODO_API_DOMAIN}/list/${listId}`, listProps);
        if (status >= 200 && status < 300)
            return { isSuccess: true, message: 'Patching todo list successful!' };
    } catch (err) {
        message = err instanceof Error ? err.message : '';
    }
    return { isSuccess: false, message: message || 'Patching todo lsit did not work.' };
}

export async function deleteTodoList(listId: string) {
    let message = '';
    try {
        const { status, data } = await axios.delete(`${TODO_API_DOMAIN}/list/${listId}`);
        if (status >= 200 && status < 300)
            return { isSuccess: true, message: 'Deleting todo list successful!' };
    } catch (err) {
        message = err instanceof Error ? err.message : '';
    }
    return { isSuccess: false, message: message || 'Deleting todo list did not work.' };
}

export async function getTodoListItems(listId: string) {
    let message = '';
    try {
        const { status, data } = await axios.get<{ list: TodoList; todos: Todo[] }>(
            `${TODO_API_DOMAIN}/list/${listId}`,
        );
        if ((status >= 200 && status < 300) || data.list !== null)
            return { isSuccess: true, ...data };
        else throw new Error('list was not found.');
    } catch (err) {
        message = err instanceof Error ? err.message : 'Getting todo items did not work.';
    }
    return { isSuccess: false, message, todos: [] as Todo[] };
}

// Todo Item APIS
export async function deleteTodo(todoId: string) {
    let message = '';
    try {
        const { status } = await axios.delete(`${TODO_API_DOMAIN}/todo/${todoId}`);
        if (status >= 200 && status < 300)
            return { isSuccess: true, message: 'Deleting todo successful' };
    } catch (err) {
        message = err instanceof Error ? err.message : '';
    }
    return { isSuccess: false, message: message ?? 'Deleting todo did not work.' };
}
