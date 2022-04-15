import React, { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import TodoListContainer from "../../components/todos/TodoListContainer";
import { useQuery, useQueryClient } from "react-query";
import { useAppDispatch } from "../../store/redux";
import { TodoList, TodoListProperties } from "../../models/todo-models/TodoList";
import { Todo } from "../../models/todo-models/Todo";
import { Claims, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { patchTodoList, postTodoList } from "../../lib/todos/todo-list-api";

const API_TODO_DOMAIN = "/api/todos";

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
    const [listId, setListId] = useState<string>("");
    const dispatch = useAppDispatch();

    const queryClient = useQueryClient();
    const {
        data: listData,
        isLoading: isListLoading,
        error: listError,
    } = useQuery(["todo-list", listId], getTodoList, { enabled: !!listId, refetchInterval: 10000 });

    console.log("todolist data:", listData);
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
            const newList = { ...todoListObj, userId };
            console.log("newList:", newList);
            // Send POST Request
            // Unique Id will be retried as a reponse from the server.
            const { isSuccess, message, insertedId } = await postTodoList(newList);
            console.log(message);
            if (isSuccess && insertedId) {
                setListId(insertedId);
            } else return false;
        } else {
            if (!listId) return false;
            // Send PUT Request
            // Invalidate query then.
            const { isSuccess, message } = await patchTodoList(listId, todoListObj);
            console.log("Patch result:", message);
            queryClient.invalidateQueries("todo-list");
            if (!isSuccess) return false;
        }

        console.log("Call invalidation of templates through redux.");
        // dispatch(templateActions.callUpdate());
        return true;
    };

    const invalidateTodoList = () => {
        queryClient.invalidateQueries("todo-list");
    };

    return (
        <div>
            <Head>
                <title>New Custom List</title>
                <meta
                    name='description'
                    content='New user specific custom todo list with all the items related.'
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
        const { req, res } = context;
        const session = getSession(req, res);

        if (!session) {
            return {
                redirect: {
                    destination: "/login",
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
