import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";

import classes from "./TodoListSection.module.scss";
import { Todo, NoIdTodo, TodoProps } from "../../models/todo-models/Todo";
import TodoCard from "./TodoCard";
import TodoForm from "./forms/TodoForm";
import { TodoList } from "../../models/todo-models/TodoList";
import { useMutation } from "react-query";
import axios from "axios";

const DEMO_TODOS: Todo[] = [
    {
        id: "todo1",
        name: "Complete section 1 Pyton coding",
        isImportant: false,
        isCompleted: true,
        dateTime: new Date(),
        createdAt: new Date("2022-04-01"),
        listId: "625961cc5a0bdc24d894672d",
        userId: "auth0|62039aa1ea8afc006bd0422b",
    },
    {
        id: "todo2",
        name: "Complete Interaction with OS with Python",
        isImportant: true,
        isCompleted: false,
        dateTime: new Date(),
        createdAt: new Date("2022-04-01"),
        listId: "625961cc5a0bdc24d894672d",
        userId: "auth0|62039aa1ea8afc006bd0422b",
    },
];

interface Props {
    todos: Todo[];
    onInvalidate: () => void;
    todoList: TodoList | null;
}

const API_DOMAIN = "/api/todos/todo";

// This component will be responsible for Todo item CRUD operations (except GET)
const TodoListSection: React.FC<Props> = (props) => {
    const { todos, onInvalidate, todoList } = props;
    const tempTodos = todos.concat(DEMO_TODOS);

    const postMutation = useMutation(
        (newTodo: NoIdTodo) => {
            return axios.post(`${API_DOMAIN}`, newTodo);
        },
        {
            onSuccess: () => {
                console.log("Posting new todo successful!");
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
                console.log("Patching todo successful!");
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
        console.log("new Todo:", newTodo);
        postMutation.mutate(newTodo);
    };

    const todoPatchHandler = (todoId: string, todoProps: TodoProps) => {
        patchMutation.mutate({ todoId, todoProps });
    };

    return (
        <section className='mt-5 flex flex-col gap-5'>
            <div className='flex justify-between'>
                <div>Sorter</div>
                <a
                    href='#todo-form'
                    className={`w-10 h-10 md:w-14 md:h-14 text-slate-500 border-2 border-slate-300 rounded-full text-3xl hover:bg-slate-500 hover:text-slate-100 ${classes["add-icon"]}`}
                >
                    <FontAwesomeIcon icon={faPlus} className='max-w-[3rem] max-h-[3rem]' />
                    <span className={`${classes["add-icon-text"]}`}>Add Todo</span>
                </a>
            </div>
            <ul className='flex flex-col gap-3'>
                {tempTodos.map((todo) => (
                    <TodoCard
                        key={todo.id}
                        todo={todo}
                        onInvalidate={onInvalidate}
                        onMutateTodo={todoPatchHandler}
                    />
                ))}
            </ul>
            <TodoForm onAdd={todoAddHandler} />
        </section>
    );
};

export default TodoListSection;
