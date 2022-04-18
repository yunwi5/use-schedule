import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";

import useTodoQuery from "../../hooks/useTodoQuery";
import { Todo } from "../../models/todo-models/Todo";
import { TodoList } from "../../models/todo-models/TodoList";
import { SortingDirection, TodoSort } from "../../models/sorting-models";
import { sortTodos } from "../../utilities/sort-utils/todo-sort";
import TodoCard from "./TodoCard";
import TodoForm from "./forms/TodoForm";
import TodoSorter from "./todo-support/TodoSorter";
import classes from "./TodoListSection.module.scss";
import { useAppSelector } from "../../store/redux";
import Link from "next/link";

interface Props {
    todos: Todo[];
    onInvalidate: () => void;
    todoList: TodoList | null;
}

// This component will be responsible for Todo item CRUD operations (except GET)
const TodoListSection: React.FC<Props> = (props) => {
    const { todos, onInvalidate, todoList } = props;
    const [sortedTodos, setSortedTodos] = useState(todos);
    const { postTodo, patchTodo, deleteTodo } = useTodoQuery(onInvalidate, todoList);

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

    const theme = useAppSelector((state) => state.todoList.currentActiveTheme);

    return (
        <section className="mt-8 flex flex-col gap-5">
            <div className="flex justify-between">
                <TodoSorter onSort={sortHandler} />
                <Link href="#todo-form">
                    <a
                        className={`w-10 h-10 md:w-14 md:h-14 text-slate-500 border-2 border-slate-300 rounded-full text-3xl hover:bg-slate-500 hover:text-slate-100 ${
                            classes["add-icon"]
                        } ${theme ? "hover:bg-transparent" : ""}`}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            className={`max-w-[3rem] max-h-[3rem] ${theme ? "text-white" : ""}`}
                        />
                        <span className={`${classes["add-icon-text"]}`}>Add Todo</span>
                    </a>
                </Link>
            </div>
            <ul className="flex flex-col gap-3">
                {sortedTodos.map((todo) => (
                    <TodoCard
                        key={todo.id}
                        listName={todoList ? todoList.name : ""}
                        todo={todo}
                        onMutateTodo={patchTodo}
                        onDeleteTodo={deleteTodo}
                    />
                ))}
            </ul>
            <TodoForm onAdd={postTodo} />
        </section>
    );
};

export default TodoListSection;
