import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import useTodoQuery from '../../hooks/useTodoQuery';
import { Todo, TodoProps } from '../../models/todo-models/Todo';
import { TodoList } from '../../models/todo-models/TodoList';
import { SortingDirection, TodoSort } from '../../models/sorting-models';
import { sortTodos } from '../../utilities/sort-utils/todo-sort';
import TodoCard from './cards/TodoCard';
import TodoForm from './forms/TodoForm';
import TodoSorter from './todo-support/TodoSorter';
import { useAppSelector } from '../../store/redux';
import AddItemIcon from '../ui/icons/AddItemIcon';
import useArray from '../../hooks/useArray';
import { useUser } from '@auth0/nextjs-auth0';

interface Props {
    todos: Todo[];
    onInvalidate: () => void;
    todoList: TodoList | null;
}

// This component will be responsible for Todo item CRUD operations (except GET)
const TodoListSection: React.FC<Props> = (props) => {
    const { todos, onInvalidate, todoList } = props;
    const userId = useUser().user?.sub;
    const theme = useAppSelector((state) => state.todoList.currentActiveTheme);

    const { postTodo, patchTodo, deleteTodo } = useTodoQuery(onInvalidate, todoList);
    // local state management for much better performance.
    // In production environment, updacing todos from the server is slow.
    // Need to update locally to see immediate changes to the user.
    const {
        array: localTodos,
        setArray: setLocalTodos,
        addItem,
        editItem,
        deleteItem,
    } = useArray(todos);

    const [sortingStandard, setSortingStandard] = useState<TodoSort | null>(null);
    const [sortingDirection, setSortingDirection] = useState<SortingDirection | undefined>(
        undefined,
    );

    const sortHandler = useCallback(
        (sortingStandard: TodoSort, direction: SortingDirection) => {
            setSortingStandard(sortingStandard);
            setSortingDirection(direction);
        },
        [setSortingStandard, setSortingDirection],
    );

    const sortedTodos = useMemo(() => {
        if (sortingStandard == null) return localTodos;
        return sortTodos(localTodos, sortingStandard, sortingDirection);
    }, [localTodos, sortingStandard, sortingDirection]);

    const addHandler = (text: string) => {
        if (!userId || !todoList) return;
        const newTodo: Todo = {
            id: uuidv4(),
            name: text,
            userId,
            listId: todoList.id,
            createdAt: new Date(),
            isImportant: false,
            isCompleted: false,
        };
        // local update
        addItem(newTodo);

        // api call
        postTodo(text);
    };

    const editHandler = (id: string, todoProps: TodoProps) => {
        // local state update
        editItem(id, todoProps);

        // api call
        patchTodo(id, todoProps);
    };

    const deleteHandler = async (id: string) => {
        // lcoal state update
        deleteItem(id);

        // api call
        const promise = await deleteTodo(id);
        return promise;
    };

    useEffect(() => {
        // Change only if the todoList.id changes.
        console.log('Effect: todos changed. Reset local todos.');
        if (todos.length === localTodos.length) {
            setLocalTodos(todos);
        }
    }, [todos, setLocalTodos, localTodos]);

    useEffect(() => {
        setLocalTodos(todos);
    }, [todoList]);

    return (
        <section className="mt-8 flex flex-col gap-5">
            <div className="flex justify-between">
                <TodoSorter onSort={sortHandler} />
                <AddItemIcon
                    href={`#todo-form`}
                    text={
                        <>
                            Add <span className="hidden sm:inline">Todo</span>
                        </>
                    }
                    theme={theme}
                />
            </div>
            <ul className="flex flex-col gap-3">
                {sortedTodos.map((todo) => (
                    <TodoCard
                        key={todo.id}
                        listName={todoList ? todoList.name : ''}
                        todo={todo}
                        onMutateTodo={editHandler}
                        onDeleteTodo={deleteHandler}
                    />
                ))}
            </ul>
            <TodoForm onAdd={addHandler} />
        </section>
    );
};

export default TodoListSection;
