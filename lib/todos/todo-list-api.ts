import axios from "axios";
import { NoIdTodoList, TodoListProperties } from "../../models/todo-models/TodoList";

const TODO_API_DOMAIN = process.env.API_DOMIN_RELATIVE
    ? `${process.env.API_DOMIN_RELATIVE}/todos`
    : "api/todos";

// Todo List APIs
export async function postTodoList(list: NoIdTodoList) {
    let message = "";
    try {
        const { status, data } = await axios.post(`${TODO_API_DOMAIN}/list`, list);
        if (status >= 200 && status < 300)
            return {
                isSuccess: true,
                insertedId: data.insertedId,
                message: "Posting new todo list successful!",
            };
    } catch (err) {
        message = err instanceof Error ? err.message : "";
    }
    return { isSuccess: false, message: message || "Posting todo list did not work." };
}

export async function patchTodoList(listId: string, listProps: TodoListProperties) {
    let message = "";
    try {
        const { status, data } = await axios.patch(`${TODO_API_DOMAIN}/list/${listId}`, listProps);
        if (status >= 200 && status < 300)
            return { isSuccess: true, message: "Patching todo list successful!" };
    } catch (err) {
        message = err instanceof Error ? err.message : "";
    }
    return { isSuccess: false, message: message || "Patching todo lsit did not work." };
}

export async function deleteTodoList(listId: string) {
    let message = "";
    try {
        const { status, data } = await axios.delete(`${TODO_API_DOMAIN}/list/${listId}`);
        if (status >= 200 && status < 300)
            return { isSuccess: true, message: "Deleting todo list successful!" };
    } catch (err) {
        message = err instanceof Error ? err.message : "";
    }
    return { isSuccess: false, message: message || "Deleting todo list did not work." };
}

// Todo Item APIS
export async function deleteTodo(todoId: string) {
    let message = "";
    try {
        const { status } = await axios.delete(`${TODO_API_DOMAIN}/todo/${todoId}`);
        if (status >= 200 && status < 300)
            return { isSuccess: true, message: "Deleting todo successful" };
    } catch (err) {
        message = err instanceof Error ? err.message : "";
    }
    return { isSuccess: false, message: message ?? "Deleting todo did not work." };
}
