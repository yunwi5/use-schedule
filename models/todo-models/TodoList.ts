import { Todo } from "./Todo";

export interface NoIdTodoList {
    id?: string;
    name: string;
    description: string;
    userId: string;
    todos?: Todo[];
    color?: string; // experimental
}

export interface TodoList extends NoIdTodoList {
    id: string;
}

export interface TodoListProperties {
    name: string;
    description: string;
    color?: string;
}