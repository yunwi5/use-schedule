export enum SortingDirection {
	Ascending = 'ASC',
	Descending = 'DES',
}

// TodoSort helper models
export enum TodoSort {
	DATE = 'Date',
	IMPORTANCE = 'Importance',
	COMPLETED = 'Completion',
	ORDER = 'Added Order',
}

export const TodoSortList = [
	TodoSort.DATE,
	TodoSort.COMPLETED,
	TodoSort.IMPORTANCE,
	TodoSort.ORDER,
];

// TaskSort helper models
export enum TaskSort {
	PLAN_DATE = 'Plan Date',
	DUE_DATE = 'Due Date',
	DURATION = 'Duration',
	IMPORTANCE = 'Importance',
}

export const TaskSortList = [
	TaskSort.PLAN_DATE,
	TaskSort.DUE_DATE,
	TaskSort.DURATION,
	TaskSort.IMPORTANCE,
];

// Sorting helper models for SubItems
export enum SubTaskSort {
	IMPORTANCE = 'Importance',
	COMPLETED = 'Completed',
	ORDER = 'Added Order',
}

export const SubTaskSortList = [ SubTaskSort.COMPLETED, SubTaskSort.IMPORTANCE, SubTaskSort.ORDER ];

// More general
export enum SubItemSort {
	IMPORTANCE = 'Importance',
	COMPLETED = 'Completed',
	ORDER = 'Added Order',
}

export const SubItemSortList = [ SubTaskSort.COMPLETED, SubTaskSort.IMPORTANCE, SubTaskSort.ORDER ];
