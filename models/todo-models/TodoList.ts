import { CustomTheme } from "../CustomTheme";
import { Todo } from "./Todo";

export interface NoIdTodoList {
    id?: string;
    name: string;
    description: string;
    userId: string;
    todos?: Todo[];
    themeId?: string;
}

export interface TodoList extends NoIdTodoList {
    id: string;
}

export interface TodoListProperties {
    name?: string;
    description?: string;
    color?: string;
    themeId?: string;
}
