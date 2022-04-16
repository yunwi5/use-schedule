import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";

import classes from "./TodoListSection.module.scss";
import { Todo, NoIdTodo, TodoProps } from "../../models/todo-models/Todo";
import TodoCard from "./TodoCard";
import TodoForm from "./forms/TodoForm";
import { TodoList } from "../../models/todo-models/TodoList";
import { useMutation } from "react-query";
import axios from "axios";
import TodoSorter from "./todo-support/TodoSorter";
import { SortingDirection, TodoSort } from "../../models/sorting-models";
import { sortTodos } from "../../utilities/sort-utils/todo-sort";
import { deleteTodo } from "../../lib/todos/todo-list-api";

interface Props {
    todos: Todo[];
    onInvalidate: () => void;
    todoList: TodoList | null;
}

const API_DOMAIN = "/api/todos/todo";

// This component will be responsible for Todo item CRUD operations (except GET)
const TodoListSection: React.FC<Props> = (props) => {
    const { todos, onInvalidate, todoList } = props;
    const [sortedTodos, setSortedTodos] = useState(todos);

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
                console.log("Patch todo successful");
                onInvalidate();
            },
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
        // console.log("new Todo:", newTodo);
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

    const sortHandler = useCallback(
        (sortingStandard: TodoSort, direction: SortingDirection) => {
            const [...newSortedTodos] = sortTodos(todos, sortingStandard, direction);
            setSortedTodos(newSortedTodos);
        },
        [todos],
    );

    useEffect(() => {
        setSortedTodos(todos);
    }, [todos]);

    return (
        <section className='mt-8 flex flex-col gap-5'>
            <div className='flex justify-between'>
                <TodoSorter onSort={sortHandler} />
                <a
                    href='#todo-form'
                    className={`w-10 h-10 md:w-14 md:h-14 text-slate-500 border-2 border-slate-300 rounded-full text-3xl hover:bg-slate-500 hover:text-slate-100 ${classes["add-icon"]}`}
                >
                    <FontAwesomeIcon icon={faPlus} className='max-w-[3rem] max-h-[3rem]' />
                    <span className={`${classes["add-icon-text"]}`}>Add Todo</span>
                </a>
            </div>
            <ul className='flex flex-col gap-3'>
                {sortedTodos.map((todo) => (
                    <TodoCard
                        key={todo.id}
                        listName={todoList ? todoList.name : ""}
                        todo={todo}
                        onInvalidate={onInvalidate}
                        onMutateTodo={todoPatchHandler}
                        onDeleteTodo={todoDeleteHandler}
                    />
                ))}
            </ul>
            <TodoForm onAdd={todoAddHandler} />
        </section>
    );
};

export default TodoListSection;
