import React, { useState } from "react";
import { TodoList, TodoListProperties } from "../../models/todo-models/TodoList";
import { Todo } from "../../models/todo-models/Todo";
import TodoIntroPanel from "./TodoIntroPanel";
import TodoListForm from "./forms/TodoListForm";
import TodoListSection from "./TodoListSection";
import TodoForm from "./forms/TodoListForm";

interface Props {
    onMutateList: (newProps: TodoListProperties, isNew: boolean) => Promise<boolean>;
    todoList: TodoList | null;
    todos: Todo[];
    onInvalidate: () => void;
}

const TodoListContainer: React.FC<Props> = (props) => {
    const { onMutateList, todoList, todos, onInvalidate } = props;
    const [editingList, setEditingList] = useState(!todoList);

    return (
        <main className='py-12 md:px-[6rem] lg:px-[14rem] text-slate-700'>
            <div className={`flex gap-3 ${!editingList ? "flex-col" : ""}`}>
                <TodoIntroPanel />
                <TodoListForm
                    initialList={todoList}
                    onSubmit={onMutateList}
                    isEditing={editingList}
                    onEditing={setEditingList}
                />
            </div>
            <TodoListSection todos={todos} todoList={todoList} onInvalidate={onInvalidate} />
        </main>
    );
};

export default TodoListContainer;
