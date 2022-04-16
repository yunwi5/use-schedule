// Very similar to SubTask def
export interface NoIdSubTodo {
    id?: string;
    name: string;
    order: number; // To arrange subtasks in order in the list.
    isImportant: boolean;
    isCompleted: boolean;
    parentId: string;
}

export interface SubTodo extends NoIdSubTodo {
    id: string;
}
