import { SubItemSort, SortingDirection } from "../../models/sorting-models";
import { compareByCompletion, compareByImportance } from "./sort-util";

interface Sortable {
    isImportant: boolean;
    isCompleted: boolean;
    order: number;
}

function compareByOrder(subA: Sortable, subB: Sortable) {
    if ((!subA.order && !subB.order) || !subB.order) return -1;
    if (!subA.order) return 1;

    return subB.order - subA.order;
}

export function sortSubItems(
    subTasks: Sortable[],
    sortingStandard: SubItemSort,
    direction: SortingDirection = SortingDirection.Descending,
): Sortable[] {
    const isAsc = direction === SortingDirection.Ascending;
    switch (sortingStandard) {
        case SubItemSort.IMPORTANCE:
            return subTasks.sort((a, b) =>
                isAsc ? compareByImportance(a, b) : compareByImportance(b, a),
            );
        case SubItemSort.COMPLETED:
            return subTasks.sort((a, b) =>
                isAsc ? compareByCompletion(a, b) : compareByCompletion(b, a),
            );
        case SubItemSort.ORDER:
            return subTasks.sort((a, b) => (isAsc ? compareByOrder(a, b) : compareByOrder(b, a)));
        default:
            return subTasks;
    }
}