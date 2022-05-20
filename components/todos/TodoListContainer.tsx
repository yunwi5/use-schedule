import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '../../store/redux';
import { TodoList, TodoListProperties } from '../../models/todo-models/TodoList';
import { Todo } from '../../models/todo-models/Todo';
import { todoListActions } from '../../store/redux/todolist-slice';
import { plannerActions } from '../../store/redux/planner-slice';
import { processTodos } from '../../utilities/todos-utils/todo-util';
import TodoIntroPanel from './todo-support/TodoIntroPanel';
import TodoListForm from './forms/TodoListForm';
import TodoListSection from './TodoListSection';
import {
    CustomTheme,
    ThemesList,
    getStaticThemeImagePath,
    isDefaultTheme,
} from '../../models/CustomTheme';
import TodoSummary from './todo-support/TodoSummary';
import TodoThemeSelect from './todo-support/TodoThemeSelect';

import classes from './TodoListContainer.module.scss';

interface Props {
    onMutateList: (newProps: TodoListProperties, isNew: boolean) => Promise<boolean>;
    todoList: TodoList | null;
    todos: Todo[];
    onInvalidate: () => void;
}

const TodoListContainer: React.FC<Props> = (props) => {
    const { onMutateList, todoList, todos, onInvalidate } = props;
    const isNew = !todoList;
    const [editingList, setEditingList] = useState(isNew);
    const initialTheme = todoList ? ThemesList.find((th) => th.name === todoList.themeId) : null;
    const [theme, setTheme] = useState<CustomTheme | null>(initialTheme || null);

    const processedTodos = processTodos(todos);

    const dispatch = useAppDispatch();
    const actTheme = useAppSelector((state) => state.todoList.currentActiveTheme);

    const themeSelectHandler = (newTheme: CustomTheme) => {
        const themeToPatch = isDefaultTheme(newTheme) ? null : newTheme;
        setTheme(themeToPatch);
        onMutateList({ themeId: themeToPatch && themeToPatch.name }, false);
    };

    const themeStyle = theme ? { backgroundColor: theme.background, color: theme.textColor } : {};

    useEffect(() => {
        const th = todoList ? ThemesList.find((th) => th.name === todoList.themeId) : null;
        setTheme(th || null);
    }, [todoList]);

    useEffect(() => {
        dispatch(todoListActions.setActiveTheme(theme));
    }, [dispatch, theme]);

    useEffect(() => {
        dispatch(plannerActions.setPlannerMode(null)); // prepare bug
    }, [dispatch]);

    return (
        <main className={`relative text-slate-700 ${classes.container}`} style={themeStyle}>
            {theme && theme.img && (
                <Image
                    className={classes.img}
                    src={getStaticThemeImagePath(theme)}
                    alt={`Background ${theme.img}`}
                    layout="responsive"
                    width="100%"
                    height="100"
                />
            )}
            <div className="py-12 translate-x-1 xl:translate-x-[-4%] px-6 md:px-[4rem] lg:px-[12rem] xl:px-[14rem]">
                {!isNew && <TodoThemeSelect onSelect={themeSelectHandler} />}
                <div
                    className={`relative flex gap-3 flex-wrap xl:flex-nowrap ${
                        !editingList ? 'flex-col' : ''
                    }`}
                >
                    {isNew && <TodoIntroPanel />}
                    <TodoListForm
                        initialList={todoList}
                        onSubmit={onMutateList}
                        isEditing={editingList}
                        onEditing={setEditingList}
                    />
                    {!isNew && <TodoSummary todos={processedTodos} />}
                </div>
                {!isNew && (
                    <TodoListSection
                        todos={processedTodos}
                        todoList={todoList}
                        onInvalidate={onInvalidate}
                    />
                )}
            </div>
        </main>
    );
};

export default TodoListContainer;
