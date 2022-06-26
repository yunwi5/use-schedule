import React, { useEffect, useMemo } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useQuery, useQueryClient } from 'react-query';

import { useAppDispatch, useAppSelector } from '../../../store/redux';
import { todoListActions } from '../../../store/redux/todolist-slice';
import { TodoList } from '../../../models/todo-models/TodoList';
import { hasDefaultTodoLists } from '../../../utilities/todos-utils/default-todo-list';
import { createDefaultTodoLists } from '../../../lib/todos/todo-list-api';

const API_DOMAIN = '/api/todos/list';

const TodoListProvider: React.FC = (props) => {
    const userContext = useUser();
    const userId = userContext.user ? userContext.user.sub : null;

    const queryClient = useQueryClient();
    const { data, error } = useQuery(
        ['todos', userId],
        async () => {
            return fetch(`${API_DOMAIN}/`)
                .then((res) => res.json())
                .catch((err) => console.log(err.message));
        },
        { enabled: !!userId, refetchInterval: 1000 },
    );
    if (error) console.log(error);

    const todoLists: TodoList[] = useMemo(() => (data ? data.lists : []), [data]);

    const { updateCount } = useAppSelector((state) => state.todoList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        queryClient.invalidateQueries('todos');
    }, [queryClient, updateCount]);

    useEffect(() => {
        dispatch(todoListActions.setTodoLists(todoLists));
    }, [dispatch, todoLists]);

    useEffect(() => {
        if (hasDefaultTodoLists(todoLists)) return;

        // user does not have default todo lists yet, so add them
        // send HTTP Post request to add default todos
        createDefaultTodoLists();
    }, [todoLists]);

    return <>{props.children}</>;
};

export default TodoListProvider;
