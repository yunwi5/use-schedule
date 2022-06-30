import React, { useCallback, useEffect, useState } from 'react';

import useTodoQuery from '../../hooks/useTodoQuery';
import { Todo } from '../../models/todo-models/Todo';
import { TodoList } from '../../models/todo-models/TodoList';
import { SortingDirection, TodoSort } from '../../models/sorting-models';
import { sortTodos } from '../../utilities/sort-utils/todo-sort';
import TodoCard from './cards/TodoCard';
import TodoForm from './forms/TodoForm';
import TodoSorter from './todo-support/TodoSorter';
import { useAppSelector } from '../../store/redux';
import AddItemIcon from '../ui/icons/AddItemIcon';

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
