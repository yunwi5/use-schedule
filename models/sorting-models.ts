export enum SortingDirection {
    Ascending = "ASC",
    Descending = "DESC",
}

// TodoSort helper models
export enum TodoSort {
    DATE = "Date",
    IMPORTANCE = "Importance",
    COMPLETED = "Completion",
    ORDER = "Created Order", // Sort by createdAt
    DURATION = "Duration", // needs testing
}

export const TodoSortList = [
    TodoSort.DATE,
    TodoSort.DURATION,
    TodoSort.COMPLETED,
    TodoSort.IMPORTANCE,
    TodoSort.ORDER,
];

// TaskSort helper models
export enum TaskSort {
    PLAN_DATE = "Plan Date",
    DUE_DATE = "Due Date",
    DURATION = "Duration",
    IMPORTANCE = "Importance",
}

export const TaskSortList = [
    TaskSort.PLAN_DATE,
    TaskSort.DUE_DATE,
    TaskSort.DURATION,
    TaskSort.IMPORTANCE,
];

// More general
export enum SubItemSort {
    IMPORTANCE = "Importance",
    COMPLETED = "Completed",
    ORDER = "Added Order",
}

export const SubItemSortList = [SubItemSort.COMPLETED, SubItemSort.IMPORTANCE, SubItemSort.ORDER];
