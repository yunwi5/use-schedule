import axios from "axios";
import { useMutation } from "react-query";

import { deleteTodo } from "../lib/todos/todo-list-api";
import { NoIdTodo, TodoProps } from "../models/todo-models/Todo";
import { TodoList } from "../models/todo-models/TodoList";

const API_DOMAIN = "/api/todos/todo";

const useTodoQuery = (onInvalidate: () => void, todoList: TodoList | null | undefined) => {
    const postMutation = useMutation(
        (newTodo: NoIdTodo) => {
            return axios.post(`${API_DOMAIN}`, newTodo);
        },
        {
            onSuccess: onInvalidate,
        },
    );

    const patchMutation = useMutation(
        ({ todoId, todoProps }: { todoId: string; todoProps: TodoProps }) => {
            return axios.patch(`${API_DOMAIN}/${todoId}`, todoProps);
        },
        {
            onSuccess: onInvalidate,
        },
    );

    const todoAddHandler = (text: string) => {
        if (!todoList) return;
        const userId = todoList.userId;
        const listId = todoList.id;
        const newTodo: NoIdTodo = {
            name: text,
            userId,
            listId,
            createdAt: new Date(),
            isImportant: false,
            isCompleted: false,
        };
        postMutation.mutate(newTodo);
    };

    const todoPatchHandler = (todoId: string, todoProps: TodoProps) => {
        patchMutation.mutate({ todoId, todoProps });
    };

    const todoDeleteHandler = async (todoId: string) => {
        const { isSuccess, message } = await deleteTodo(todoId);
        if (isSuccess) onInvalidate();
        return { isSuccess, message };
    };

    return {
        postTodo: todoAddHandler,
        patchTodo: todoPatchHandler,
        deleteTodo: todoDeleteHandler,
    };
};

export default useTodoQuery;
