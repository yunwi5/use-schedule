import { Task } from "../../models/task-models/Task";

export enum Filter {
	CATEGORY = "Category",
	IMPORTANCE = "Importance",
	STATUS = "Status"
}

export function applyTaskFilter (
	taskList: Task[],
	filterTarget: string | null,
	mainFilter: string | null,
	subFilter: string | null
): Task[] {
	if (!filterTarget || !mainFilter) return taskList;

	let filteredList: Task[] = [];
	switch (filterTarget) {
		case Filter.IMPORTANCE:
			filteredList = taskList.filter((task) => task.importance.trim() === mainFilter.trim());
			return filteredList;
		case Filter.STATUS:
			filteredList = taskList.filter((task) => task.status.trim() === mainFilter.trim());
			return filteredList;
		case Filter.CATEGORY:
			if (!subFilter) {
				filteredList = taskList.filter((task) => task.category === mainFilter.trim());
				return filteredList;
			}
			// If there is subCategory filter to filter again,
			filteredList = taskList.filter((task) => {
				return task.category === mainFilter.trim() && task.subCategory === subFilter.trim();
			});
			return filteredList;
		default:
			throw new Error("Filter is invalid! Check the filter inputs!");
	}
}
