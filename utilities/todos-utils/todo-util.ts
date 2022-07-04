import { Importance, Status } from '../../models/task-models/Status';
import { Todo } from '../../models/todo-models/Todo';
import { TodoList } from '../../models/todo-models/TodoList';
import { isOverdue } from '../date-utils/date-check';

export function convertToTodoList(listObj: any | null): TodoList | null {
    if (!listObj) return null;
    const id = listObj?._id?.toString();
    if (!id) return null;
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

// Convert string type createdAt and dateTime to Date object
export function processTodos(todos: Todo[]): Todo[] {
    if (!todos) return [];
    return todos.map((todo) => {
        let dt: Date | undefined = undefined;
        if (todo.dateTime) dt = new Date(todo.dateTime);
        let cat: Date = todo.createdAt ? new Date(todo.createdAt) : new Date();
        return { ...todo, dateTime: dt, createdAt: cat };
    });
}

export function isTodoOverdue(todo: Todo): boolean {
    const overdue = !todo.isCompleted && isOverdue(todo.dateTime);
    return overdue;
}

export function getTodoStatus(todo: Todo): Status {
    if (isTodoOverdue(todo)) return Status.OVERDUE;
    return todo.isCompleted ? Status.COMPLETED : Status.OPEN;
}

export function getTodoImportance(todo: Todo): Importance {
    if (todo.isImportant) return Importance.IMPORTANT;
    return Importance.EXTRA;
}
