import React, { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import TodoListContainer from '../../components/todos/TodoListContainer';
import { useQuery, useQueryClient } from 'react-query';
import { NoIdTodoList, TodoList, TodoListProperties } from '../../models/todo-models/TodoList';
import { Todo } from '../../models/todo-models/Todo';
import { Claims, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { patchTodoList, postTodoList } from '../../lib/todos/todo-list-api';
import { AppProperty } from '../../constants/global-constants';

const API_TODO_DOMAIN = '/api/todos';

function getTodoList(context: any) {
    const [name, listId] = context.queryKey;
    return fetch(`${API_TODO_DOMAIN}/list/${listId}`).then((res) => res.json());
}

interface Props {
    userId: string;
    user: Claims;
}

// This is the page for "new" todo list, so no fetching from the server.
const NewTodoPage: NextPage<Props> = ({ user, userId }) => {
    const [listId, setListId] = useState<string>('');

    const queryClient = useQueryClient();
    const { data: listData, error: listError } = useQuery(['todo-list', listId], getTodoList, {
        enabled: !!listId,
        refetchInterval: 10000,
    });

    console.log('todolist data:', listData);
    const todoList: TodoList | null = listData ? listData.list : null;
    const todos: Todo[] = listData ? listData.todos : [];

    if (listError) {
        console.error('TodoList query has errors!');
        console.log(listError);
    }

    const mutateList = async (
        todoListObj: TodoListProperties,
        isNew: boolean,
    ): Promise<boolean> => {
        if (isNew) {
            const newList: NoIdTodoList = {
                ...todoListObj,
                userId,
                name: todoListObj.name || '',
                description: todoListObj.description || '',
            };
            // Send POST Request
            if (!newList.name) {
                alert('User list name is empty!');
                return false;
            }
            console.log('new list:', newList);
            const { isSuccess, message, insertedId } = await postTodoList(newList);
            if (isSuccess && insertedId) {
                setListId(insertedId);
            } else return false;
        } else {
            if (!listId) return false;
            // Send PUT Request
            // Invalidate query then.
            const { isSuccess, message } = await patchTodoList(listId, todoListObj);
            console.log('Patch result:', message);
            queryClient.invalidateQueries('todo-list');
            if (!isSuccess) return false;
        }
        return true;
    };

    const invalidateTodoList = () => {
        queryClient.invalidateQueries('todo-list');
    };

    return (
        <>
            <Head>
                <title>New List | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="New user specific custom todo list with all the items related."
                />
            </Head>
            <TodoListContainer
                todoList={todoList}
                todos={todos}
                onMutateList={mutateList}
                onInvalidate={invalidateTodoList}
            />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        const { req, res } = context;
        const session = getSession(req, res);

        if (!session) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }
        const userId = session.user.sub;
        return {
            props: {
                userId,
            },
        };
    },
});

export default NewTodoPage;
