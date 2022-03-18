export enum TaskSort {
	PLAN_DATE = "Plan Date",
	DUE_DATE = "Due Date",
	DURATION = "Duration",
	IMPORTANCE = "Importance"
}

export const TaskSortList = [
	TaskSort.PLAN_DATE,
	TaskSort.DUE_DATE,
	TaskSort.DURATION,
	TaskSort.IMPORTANCE
];

export enum SubTaskSort {
	IMPORTANCE = "Importance",
	COMPLETED = "Completed",
	ORDER = "Added Order"
}

export const SubTaskSortList = [ SubTaskSort.COMPLETED, SubTaskSort.IMPORTANCE, SubTaskSort.ORDER ];

export enum SortingDirection {
	Ascending = "ASC",
	Descending = "DES"
}
