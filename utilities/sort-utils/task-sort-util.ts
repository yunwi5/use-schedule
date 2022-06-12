import { Task } from '../../models/task-models/Task';
import { TaskSort, SortingDirection } from '../../models/sorting-models';
import { getImportanceValue } from '../../models/task-models/Status';
import { comapreByImportance, compareByAlphabeticalOrder, compareByDuration } from './sort-util';

function compareByPlanDate(taskA: Task, taskB: Task): number {
    // No datetime so should come last.
    if (!taskB.timeString || taskB.isAnyDateTime) return -1;
    if (!taskA.timeString || taskA.isAnyDateTime) return 1;

    const dateTimeA = new Date(taskA.timeString).getTime();
    const dateTimeB = new Date(taskB.timeString).getTime();

    return dateTimeA - dateTimeB;
}

function compareByDueDate(taskA: Task, taskB: Task): number {
    if (!taskB.dueDateString) return -1;
    if (!taskA.dueDateString) return 1;

    const dueDateA = new Date(taskA.dueDateString).getTime();
    const dueDateB = new Date(taskB.dueDateString).getTime();

    return dueDateA - dueDateB;
}

export function sortTasks(tasks: Task[], sortingStandard: TaskSort, direction: SortingDirection) {
    const isAsc = direction === SortingDirection.Ascending;
    switch (sortingStandard) {
        case TaskSort.PLAN_DATE:
            return tasks.sort((taskA, taskB) =>
                isAsc ? compareByPlanDate(taskA, taskB) : compareByPlanDate(taskB, taskA),
            );
        case TaskSort.DURATION:
            return tasks.sort((taskA, taskB) =>
                isAsc ? compareByDuration(taskA, taskB) : compareByDuration(taskB, taskA),
            );
        case TaskSort.DUE_DATE:
            return tasks.sort((taskA, taskB) =>
                isAsc ? compareByDueDate(taskA, taskB) : compareByDueDate(taskB, taskA),
            );
        case TaskSort.IMPORTANCE:
            return tasks.sort((taskA, taskB) =>
                isAsc ? comapreByImportance(taskA, taskB) : comapreByImportance(taskB, taskA),
            );
        case TaskSort.NAME:
            return tasks.sort((a, b) =>
                isAsc
                    ? compareByAlphabeticalOrder(a.name, b.name)
                    : compareByAlphabeticalOrder(b.name, a.name),
            );
        default:
            return tasks;
    }
}
