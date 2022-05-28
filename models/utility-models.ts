// Utility modles for flexible function parameters and operations

// Patching SubTaskProps or SUbTodoItemProps, or anything related to SubItems
export interface SubItemProps {
    name?: string;
    isImportant?: boolean;
    isCompleted?: boolean;
}

export interface SubItem {
    id: string;
    name: string;
    order: number; // To arrange subtasks in order in the list.
    isImportant: boolean;
    isCompleted: boolean;
}
