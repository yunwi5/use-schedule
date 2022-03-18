import { SubTask } from "../../models/task-models/SubTask";
import { SubTaskSort, SortingDirection } from "../../models/sorting-models";

function compareByImportance (subTaskA: SubTask, subTaskB: SubTask) {
	if (!subTaskA.isImportant && subTaskB.isImportant) return 1;
	return -1;
}

function compareByCompletion (subA: SubTask, subB: SubTask) {
	if (!subA.isCompleted && subB.isCompleted) return 1;
	return -1;
}

function compareByOrder (subA: SubTask, subB: SubTask) {
	if ((!subA.order && !subB.order) || !subB.order) return -1;
	if (!subA.order) return 1;

	return subA.order - subB.order;
}

export function sortSubTasks (
	subTasks: SubTask[],
	sortingStandard: SubTaskSort,
	direction: SortingDirection = SortingDirection.Ascending
): SubTask[] {
	console.log(`direction: ${direction}`);
	switch (sortingStandard) {
		case SubTaskSort.IMPORTANCE:
			return subTasks.sort(
				(a, b) =>
					direction === SortingDirection.Ascending
						? compareByImportance(a, b)
						: compareByImportance(b, a)
			);

		case SubTaskSort.COMPLETED:
			return subTasks.sort(
				(a, b) =>
					direction === SortingDirection.Ascending
						? compareByCompletion(a, b)
						: compareByCompletion(b, a)
			);
		case SubTaskSort.ORDER:
			return subTasks.sort(
				(a, b) =>
					direction === SortingDirection.Ascending
						? compareByOrder(a, b)
						: compareByOrder(b, a)
			);
		default:
			return subTasks;
	}
}
