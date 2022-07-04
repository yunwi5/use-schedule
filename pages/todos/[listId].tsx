import React, { useEffect } from 'react';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useQuery, useQueryClient } from 'react-query';

import TodoListContainer from '../../components/todos/TodoListContainer';
import { TodoList, TodoListProperties } from '../../models/todo-models/TodoList';
import { Todo } from '../../models/todo-models/Todo';
import { patchTodoList } from '../../lib/todos/todo-list-api';
import { getTodoListAndItemsFromPage } from '../../db/pages-util';
import { AppProperty } from '../../constants/global-constants';
import { getAllTodoLists } from '../../db/static-fetching';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { getLoginLink } from '../../utilities/link-utils';

const API_TODO_DOMAIN = '/api/todos';

function getTodoList(context: any) {
    const [name, listId] = context.queryKey;
    return fetch(`${API_TODO_DOMAIN}/list/${listId}`).then((res) => res.json());
}

interface Props {
    initialList: TodoList;
    initialTodos: Todo[];
}

// This is the page for "new" todo list, so no fetching from the server.
const NewTodoPage: NextPage<Props> = (props) => {
    const userId = useUser().user?.sub;
    const router = useRouter();

    const { initialList, initialTodos } = props;
    const listId = initialList.id;

    const queryClient = useQueryClient();
    const { data: listData, error: listError } = useQuery(['todo-list', listId], getTodoList, {
        initialData: { list: initialList, todos: initialTodos },
    });

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
            return false;
        } else {
            // Send PUT request and then invalidate query
            const { isSuccess, message } = await patchTodoList(listId, todoListObj);
            queryClient.invalidateQueries('todo-list');
            if (!isSuccess) return false;
        }
        return true;
    };

    const invalidateTodoList = () => queryClient.invalidateQueries('todo-list');

    useEffect(() => {
        if (!userId) router.replace(getLoginLink());
    }, [userId, router]);

    return (
        <div style={{ height: '100%' }}>
            <Head>
                <title>
                    {initialList.name} | {AppProperty.APP_NAME}
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
    const todoLists = await getAllTodoLists();
    const ids = todoLists.map((list) => list._id.toString());
    const pathWithParams = ids.map((id) => ({ params: { listId: id } }));

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

    if (!todoList) return { notFound: true, message: 'Your list is not found.' };
    return {
        props: {
            initialTodos: todos,
            initialList: todoList,
        },
        revalidate: 60,
    };
};

export default NewTodoPage;
