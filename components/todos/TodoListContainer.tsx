import React, { useState } from "react";
import { TodoList, TodoListProperties } from "../../models/todo-models/TodoList";
import { Todo } from "../../models/todo-models/Todo";
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

function processTodos(todos: Todo[]): Todo[] {
    return todos.map((todo) => {
        let dt: Date | undefined = undefined;
        if (todo.dateTime) dt = new Date(todo.dateTime);
        let cat: Date = todo.createdAt ? new Date(todo.createdAt) : new Date();
        return { ...todo, dateTime: dt, createdAt: cat };
    });
}

const TodoListContainer: React.FC<Props> = (props) => {
    const { onMutateList, todoList, todos, onInvalidate } = props;
    const [editingList, setEditingList] = useState(!todoList);

    const processedTodos = processTodos(todos);

    return (
        <main className='py-12 md:px-[6rem] lg:px-[14rem] text-slate-700'>
            <div
                className={`relative flex gap-3 flex-wrap xl:flex-nowrap ${
                    !editingList ? "flex-col" : ""
                }`}
            >
                <TodoIntroPanel />
                <TodoListForm
                    initialList={todoList}
                    onSubmit={onMutateList}
                    isEditing={editingList}
                    onEditing={setEditingList}
                />
                <TodoSummary todos={processedTodos} />
            </div>
            <TodoListSection
                todos={processedTodos}
                todoList={todoList}
                onInvalidate={onInvalidate}
            />
        </main>
    );
};

export default TodoListContainer;
