import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import TodoListContainer from "../../components/todos/TodoListContainer";
import { useQuery, useQueryClient } from "react-query";
import { useAppDispatch } from "../../store/redux";
import { TodoList, TodoListProperties } from "../../models/todo-models/TodoList";
import { Todo } from "../../models/todo-models/Todo";
import { Claims, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { patchTodoList } from "../../lib/todos/todo-list-api";
import { getTodoListAndItemsFromPage } from "../../utilities/mongodb-util/pages-util";

const API_TODO_DOMAIN = "/api/todos";

function getTodoList(context: any) {
    const [name, listId] = context.queryKey;
    return fetch(`${API_TODO_DOMAIN}/list/${listId}`).then((res) => res.json());
}

interface Props {
    userId: string;
    user: Claims;
    initialList: TodoList;
    initialTodos: Todo[];
}

// This is the page for "new" todo list, so no fetching from the server.
const NewTodoPage: NextPage<Props> = (props) => {
    const { user, userId, initialList, initialTodos } = props;
    const listId = initialList.id;
    const dispatch = useAppDispatch();

    const queryClient = useQueryClient();
    const {
        data: listData,
        isLoading: isListLoading,
        error: listError,
    } = useQuery(["todo-list", listId], getTodoList, {
        initialData: { list: initialList, todos: initialTodos },
    });

    const todoList: TodoList | null = listData ? listData.list : null;
    const todos: Todo[] = listData ? listData.todos : [];

    if (listError) {
        console.error("TodoList query has errors!");
        console.log(listError);
    }

    const mutateList = async (
        todoListObj: TodoListProperties,
        isNew: boolean,
    ): Promise<boolean> => {
        if (isNew) {
            alert("Cannot be new!");
            return false;
        } else {
            // Send PUT Request
            // Invalidate query then.
            const { isSuccess, message } = await patchTodoList(listId, todoListObj);
            console.log("Patch result:", message);
            queryClient.invalidateQueries("todo-list");
            if (!isSuccess) return false;
        }
        // console.log("Call invalidation of todos through redux.");
        // dispatch(templateActions.callUpdate());
        return true;
    };

    const invalidateTodoList = () => {
        queryClient.invalidateQueries("todo-list");
    };

    return (
        <div>
            <Head>
                <title>{initialList.name}</title>
                <meta
                    name='description'
                    content='User defind todo list with custom items and theme for better customization'
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

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        const { req, res, query, params } = context;
        const session = getSession(req, res);

        if (!session) {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                },
            };
        }
        console.log("params:", params);
        console.log("query:", query);

        const { listId: initialId } = query;
        const listId = Array.isArray(initialId) ? initialId.join("") : initialId;

        if (!listId) {
            return { notFound: true };
        }

        const [todoList, todos] = await getTodoListAndItemsFromPage(listId);

        if (!todoList) {
            return { notFound: true };
        }

        console.log(todos);

        const userId = session.user.sub;
        return {
            props: {
                userId,
                initialTodos: todos,
                initialList: todoList,
            },
        };
    },
});

export default NewTodoPage;
