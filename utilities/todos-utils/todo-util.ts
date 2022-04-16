import { Todo } from "../../models/todo-models/Todo";
import { TodoList } from "../../models/todo-models/TodoList";

export function convertToTodoList(listObj: any | null): TodoList | null {
    if (!listObj) return null;
    const id = listObj._id.toString();
    delete listObj._id;
    const todoList: TodoList = { ...listObj, id };
    return todoList;
}

export function convertToTodoListArray(todoLists: any[] | null) {
    if (!todoLists) return [];
    return todoLists.map((list) => convertToTodoList(list)) as TodoList[];
}

export function convertToTodos(array: any[] | null): Todo[] {
    if (!array) return [];
    const todos: Todo[] = [];
    for (const document of array) {
        const todo = { ...document, id: document._id.toString() };
        if (todo.dateTime) todo.dateTime = todo.dateTime.toString();
        delete todo._id;
        todos.push(todo as Todo);
    }
    return todos;
}
