import axios from 'axios';
import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { deleteTodo, fetchAllTodos } from '../lib/todos/todo-list-api';
import { NoIdTodo, Todo, TodoProps } from '../models/todo-models/Todo';
import { TodoList } from '../models/todo-models/TodoList';
import { processTodos } from '../utilities/todos-utils/todo-util';

const API_DOMAIN = '/api/todos/todo';

const useTodoQuery = (
    onInvalidate?: (() => void) | null | undefined,
    todoList?: TodoList | null | undefined,
    initialTodos?: Todo[],
) => {
    const queryClient = useQueryClient();

    const {
        data: todoData,
        isError: isTodoError,
        isLoading,
    } = useQuery('todos', fetchAllTodos, {
        initialData: initialTodos ? { todos: initialTodos } : [],
        refetchInterval: 1500,
    });
    if (isTodoError) {
        console.log('Todo error');
    }
    const processedTodos = useMemo(() => {
        const todos: Todo[] = todoData ? todoData.todos : initialTodos;
        return processTodos(todos);
    }, [todoData, initialTodos]);

    const invalidateTodos = () => queryClient.invalidateQueries('todos');

    const postMutation = useMutation(
        (newTodo: NoIdTodo) => {
            return axios.post(`${API_DOMAIN}`, newTodo);
        },
        {
            onSuccess:
                onInvalidate ??
                (() => {
                    console.log('Post mutation succeed');
                }),
        },
    );

    const patchMutation = useMutation(
        ({ todoId, todoProps }: { todoId: string; todoProps: TodoProps }) => {
            return axios.patch(`${API_DOMAIN}/${todoId}`, todoProps);
        },
        {
            onSuccess:
                onInvalidate ??
                (() => {
                    console.log('Patch mutation succeed');
                }),
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
        if (isSuccess && onInvalidate) onInvalidate();
        return { isSuccess, message };
    };

    return {
        postTodo: todoAddHandler,
        patchTodo: todoPatchHandler,
        deleteTodo: todoDeleteHandler,
        invalidateTodos,
        todos: processedTodos,
        isLoading,
    };
};

export default useTodoQuery;
