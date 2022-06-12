import { SortingDirection, TodoSort } from '../../models/sorting-models';
import { Todo } from '../../models/todo-models/Todo';
import {
    compareByDuration,
    compareByBooleanImportance,
    compareByBooleanCompletion,
    compareByDateTime,
} from './sort-util';

function compareByCreatedOrder(
    { createdAt: createdAtA }: Todo,
    { createdAt: createdAtB }: Todo,
): number {
    if (!createdAtA) return 1;
    if (!createdAtB) return -1;
    return createdAtA.getTime() - createdAtB.getTime();
}

export function sortTodos(
    todos: Todo[],
    sortingStandard: TodoSort,
    direction: SortingDirection,
): Todo[] {
    const isAsc = direction === SortingDirection.Ascending;
    switch (sortingStandard) {
        case TodoSort.COMPLETED:
            return todos.sort((a, b) =>
                isAsc ? compareByBooleanCompletion(a, b) : compareByBooleanCompletion(b, a),
            );
        case TodoSort.IMPORTANCE:
            return todos.sort((a, b) =>
                isAsc ? compareByBooleanImportance(a, b) : compareByBooleanImportance(b, a),
            );
        case TodoSort.DATE:
            return todos.sort((a, b) =>
                isAsc ? compareByDateTime(a, b) : compareByDateTime(b, a),
            );
        case TodoSort.ORDER:
            return todos.sort((a, b) =>
                isAsc ? compareByCreatedOrder(a, b) : compareByCreatedOrder(b, a),
            );
        case TodoSort.DURATION:
            return todos.sort((a, b) => {
                // If there is no duration, always push it to the end of the list.
                if (!a.duration) return 1; // a should go to end
                if (!b.duration) return -1; // b should go to end
                return isAsc ? compareByDuration(a, b) : compareByDuration(b, a);
            });
        default:
            return todos;
    }
}
