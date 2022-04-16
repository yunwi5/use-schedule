export interface NoIdTodo {
    id?: string;
    name: string;
    isImportant: boolean;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt?: Date;
    dateTime?: Date;
    duration?: number;
    note?: string;
    steps?: any[];
    listId: string; // will never change
    userId: string; // will never change
}

export interface Todo extends NoIdTodo {
    id: string;
}

export interface TodoProps {
    name?: string;
    isImportant?: boolean;
    isCompleted?: boolean;
    dateTime?: Date;
    updatedAt?: Date;
    duration?: number;
    note?: string;
}
