import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/redux";
import { TodoList, TodoListProperties } from "../../models/todo-models/TodoList";
import { Todo } from "../../models/todo-models/Todo";
import { todoListActions } from "../../store/redux/todolist-slice";
import { plannerActions } from "../../store/redux/planner-slice";
import { processTodos } from "../../utilities/todos-utils/todo-util";
import TodoIntroPanel from "./todo-support/TodoIntroPanel";
import TodoListForm from "./forms/TodoListForm";
import TodoListSection from "./TodoListSection";
import TodoSummary from "./todo-support/TodoSummary";

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
    const processedTodos = processTodos(todos);

    // Testing theme functionality
    const dispatch = useAppDispatch();
    dispatch(plannerActions.setPlannerMode(null)); // prepare bug
    // dispatch(todoListActions.setActiveTheme(pinkTheme));

    const todoTheme = useAppSelector((state) => state.todoList.currentActiveTheme);
    const themeStyle = todoTheme
        ? { backgroundColor: todoTheme.background, color: todoTheme.textColor }
        : {};

    return (
        <main
            className='py-12 xl:translate-x-[-3.5%] md:px-[6rem] lg:px-[14rem] text-slate-700'
            style={themeStyle}
        >
            <div
                className={`relative flex gap-3 flex-wrap xl:flex-nowrap ${
                    !editingList ? "flex-col" : ""
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
        </main>
    );
};

export default TodoListContainer;
