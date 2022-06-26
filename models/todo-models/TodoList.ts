import { cloudRainbowTheme, metropolitanSkylineTheme, skyCloudTheme } from '../CustomTheme';
import { Todo } from './Todo';

export interface NoIdTodoList {
    id?: string;
    name: string;
    description: string;
    userId: string;
    todos?: Todo[];
    themeId?: string | null;
    // default list given to the user can only be deleted, and should not be editted.
    isImmutable?: boolean;
}

export interface TodoList extends NoIdTodoList {
    id: string;
}

export interface TodoListProperties {
    name?: string;
    description?: string;
    color?: string;
    themeId?: string | null;
}

export enum DefaultTodoList {
    PERSONAL = 'Personal',
    WORK = 'Work',
    GROCERIES = 'Groceries',
}

// default todo lists when the user starts after registration
export const InitialDefaultTodoLists = [
    {
        name: DefaultTodoList.PERSONAL,
        description: 'My personal todos',
        themeId: skyCloudTheme.name,
        isImmutable: true,
    },
    {
        name: DefaultTodoList.WORK,
        description: 'My work todos',
        themeId: metropolitanSkylineTheme.name,
        isImmutable: true,
    },
    {
        name: DefaultTodoList.GROCERIES,
        description: 'Groceries to buy',
        themeId: cloudRainbowTheme.name,
        isImmutable: true,
    },
];
