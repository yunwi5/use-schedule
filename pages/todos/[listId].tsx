import React, { useEffect, useRef, useState } from 'react';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useQuery, useQueryClient } from 'react-query';

import TodoListContainer from '../../components/todos/TodoListContainer';
import { TodoList, TodoListProperties } from '../../models/todo-models/TodoList';
import { Todo } from '../../models/todo-models/Todo';
import { patchTodoList } from '../../lib/todos/todo-list-api';
import { getTodoListAndItemsFromPage } from '../../db/pages-util';
import { AppProperty } from '../../constants/global-constants';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { getLoginLink } from '../../utilities/link-utils';
import { getAllTodoLists } from '../../db/static-fetching';
import { connectDatabase } from '../../db/mongodb-config';

const API_TODO_DOMAIN = '/api/todos';

function getTodoList(context: any) {
    const [name, listId] = context.queryKey;
    return fetch(`${API_TODO_DOMAIN}/list/${listId}`).then((res) => res.json());
}

interface Props {
    initialList: TodoList | null;
    initialTodos: Todo[];
}

// This is the page for "new" todo list, so no fetching from the server.
const NewTodoPage: NextPage<Props> = (props) => {
    const userId = useUser().user?.sub;
    const router = useRouter();

    const { initialList = null, initialTodos } = props;

    const listId = initialList?.id || '';

    const queryClient = useQueryClient();
    const {
        data: listData,
        error: listError,
        refetch,
    } = useQuery(['todo-list', listId], getTodoList, {
        initialData: { list: initialList, todos: initialTodos },
        enabled: false,
    });

    const todoList: TodoList | null = listData ? listData.list : null;
    const todos: Todo[] = listData ? listData.todos : [];

    if (listError) {
        console.error('TodoList query has errors!');
        console.log(listError);
    }

    const invalidateTodoList = async () => {
        refetch();
    };

    const mutateList = async (
        todoListObj: TodoListProperties,
        isNew: boolean,
    ): Promise<boolean> => {
        if (isNew) {
            return false;
        } else {
            // Send PUT request and then invalidate query
            const { isSuccess, message } = await patchTodoList(listId, todoListObj);
            queryClient.invalidateQueries('todo-list');
            if (!isSuccess) return false;
        }
        return true;
    };

    useEffect(() => {
        if (!userId) router.replace(getLoginLink());
    }, [userId, router]);

    return (
        <div style={{ height: '100%' }}>
            <Head>
                <title>
                    {initialList?.name || ''} | {AppProperty.APP_NAME}
                </title>
                <meta
                    name="description"
                    content="User defind todo list with custom items and theme for better customization"
                />
            </Head>
            <TodoListContainer
                todoList={todoList}
                todos={todos}
                onMutateList={mutateList}
                onInvalidate={invalidateTodoList}
            />
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // const API_DOMAIN = process.env.API_DOMAIN;
    // const res = await fetch(`${API_DOMAIN}/todos/static`);
    // const ids = await res.json();
    const client = await connectDatabase();
    const todoLists = await getAllTodoLists(client);
    client.close();

    let ids = todoLists.map((list) => list?._id?.toString());
    ids = ids.filter((id) => !!id);
    let pathWithParams: Array<{ params: { listId: string } }> = [];

    if (!Array.isArray(ids)) {
        console.log('list ids are not array:', ids);
    } else {
        pathWithParams = ids.map((id) => ({ params: { listId: id } }));
    }

    return {
        paths: pathWithParams,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context;
    if (!params)
        return {
            notFound: true,
        };

    let listId = params.listId;
    listId = Array.isArray(listId) ? listId.join('') : listId;

    if (!listId) return { notFound: true, message: 'List id is required.' };

    const [todoList, todos] = await getTodoListAndItemsFromPage(listId);

    if (!todoList || !todoList?.id)
        return { notFound: true, message: 'Your list is not found.' };

    return {
        props: {
            initialTodos: todos,
            initialList: todoList || null,
        },
        revalidate: 60,
    };
};

export default NewTodoPage;
