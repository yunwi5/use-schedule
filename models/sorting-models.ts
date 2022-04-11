export enum SortingDirection {
	Ascending = 'ASC',
	Descending = 'DES',
}

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
