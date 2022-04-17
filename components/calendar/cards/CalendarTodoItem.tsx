import axios from "axios";
import React, { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { deleteTodo } from "../../../lib/todos/todo-list-api";
import { NoIdTodo, Todo, TodoProps } from "../../../models/todo-models/Todo";
import { useAppSelector } from "../../../store/redux";

import { getShortNameWithRest } from "../../../utilities/gen-utils/string-util";
import TodoDetail from "../../todos/todo-detail/TodoDetail";
import CalendarItemCard from "./CalendarItemCard";

interface Props {
    todo: Todo;
    onInvalidate: () => void;
}

const API_DOMAIN = "/api/todos/todo";

const CalendarTodoItem: React.FC<Props> = ({ todo, onInvalidate }) => {
    const [showDetail, setShowDetail] = useState(false);

    const lists = useAppSelector((state) => state.todoList.lists);
    const parentList = lists.find((list) => list.id === todo.listId);

    /* 
    TodoDetail props: 
    todo: Todo;
    listName: string;
    onClose: () => void;
    onMutateTodo: (id: string, todoProps: TodoProps) => void;
    onDeleteTodo: (id: string) => Promise<{
        isSuccess: boolean;
        message: string;
    }>;
    */

    // too many duplications. Need to be refactored to a custom hook.
    const postMutation = useMutation(
        (newTodo: NoIdTodo) => {
            return axios.post(`${API_DOMAIN}`, newTodo);
        },
        {
            onSuccess: () => {
                onInvalidate();
            },
        },
    );

    const patchMutation = useMutation(
        ({ todoId, todoProps }: { todoId: string; todoProps: TodoProps }) => {
            return axios.patch(`${API_DOMAIN}/${todoId}`, todoProps);
        },
        {
            onSuccess: () => {
                onInvalidate();
            },
        },
    );

    const todoPatchHandler = (todoId: string, todoProps: TodoProps) => {
        patchMutation.mutate({ todoId, todoProps });
    };

    const todoDeleteHandler = async (todoId: string) => {
        const { isSuccess, message } = await deleteTodo(todoId);
        if (isSuccess) onInvalidate();
        return { isSuccess, message };
    };
    // All above needs to be refactored to custom hook.

    return (
        <>
            {showDetail && (
                <TodoDetail
                    todo={todo}
                    listName={parentList ? parentList.name : ""}
                    onClose={setShowDetail.bind(null, false)}
                    onMutateTodo={todoPatchHandler}
                    onDeleteTodo={todoDeleteHandler}
                />
            )}
            <CalendarItemCard
                bgClass={"bg-white"}
                textClass={"text-slate-700"}
                hoverBgClass={"hover:bg-slate-400"}
                hoverTextClass={"hover:text-slate-50"}
                borderClass={"border-2 border-slate-300"}
                isCompleted={todo.isCompleted}
                dueDate={todo.dateTime}
                onClick={setShowDetail.bind(null, true)}
            >
                {getShortNameWithRest(todo.name, 10, 2)}
            </CalendarItemCard>
        </>
    );
};

export default CalendarTodoItem;
