import { SubTaskSort, SortingDirection } from '../../models/sorting-models';

interface Sortable {
	isImportant: boolean;
	isCompleted: boolean;
	order: number;
}

function compareByImportance (subTaskA: Sortable, subTaskB: Sortable) {
	if (!subTaskA.isImportant && subTaskB.isImportant) return 1;
	return -1;
}

function compareByCompletion (subA: Sortable, subB: Sortable) {
	if (!subA.isCompleted && subB.isCompleted) return 1;
	return -1;
}

function compareByOrder (subA: Sortable, subB: Sortable) {
	if ((!subA.order && !subB.order) || !subB.order) return -1;
	if (!subA.order) return 1;

	return subA.order - subB.order;
}

export function sortSubItems (
	subTasks: Sortable[],
	sortingStandard: SubTaskSort,
	direction: SortingDirection = SortingDirection.Ascending,
): Sortable[] {
	console.log(`direction: ${direction}`);
	switch (sortingStandard) {
		case SubTaskSort.IMPORTANCE:
			return subTasks.sort(
				(a, b) =>
					direction === SortingDirection.Ascending
						? compareByImportance(a, b)
						: compareByImportance(b, a),
			);

		case SubTaskSort.COMPLETED:
			return subTasks.sort(
				(a, b) =>
					direction === SortingDirection.Ascending
						? compareByCompletion(a, b)
						: compareByCompletion(b, a),
			);
		case SubTaskSort.ORDER:
			return subTasks.sort(
				(a, b) =>
					direction === SortingDirection.Ascending
						? compareByOrder(a, b)
						: compareByOrder(b, a),
			);
		default:
			return subTasks;
	}
}
