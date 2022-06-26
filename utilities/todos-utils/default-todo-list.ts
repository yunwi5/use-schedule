import { DefaultTodoList, TodoList } from '../../models/todo-models/TodoList';

export const hasDefaultTodoLists = (userTodoLists: TodoList[]) => {
    const hasDefault = userTodoLists.some((list) =>
        Object.values(DefaultTodoList).includes(list.name as any),
    );
    return hasDefault;
};

export const isDefaultTodoList = (todoList: TodoList | null | undefined) => {
    if (!todoList) return false;
    return Object.values(DefaultTodoList).includes(todoList.name as any);
};
