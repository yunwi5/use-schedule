import { Task } from "../../models/task-models/Task";
import { TaskSort, SortingDirection } from "../../models/sorting-models";
import { getImportanceValue } from "../../models/task-models/Status";
import { compareByDuration } from "./sort-util";

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

function comapreByImportance(taskA: Task, taskB: Task): number {
    let importanceA = getImportanceValue(taskA.importance); // not found returns -1
    importanceA = importanceA === -1 ? 1000 : importanceA;
    let importanceB = getImportanceValue(taskB.importance);
    importanceB = importanceB === -1 ? 1000 : importanceB;

    return importanceA - importanceB;
}

export function sortTasks(tasks: Task[], sortingStandard: TaskSort, direction: SortingDirection) {
    switch (sortingStandard) {
        case TaskSort.PLAN_DATE:
            return tasks.sort((taskA, taskB) =>
                direction === SortingDirection.Ascending
                    ? compareByPlanDate(taskA, taskB)
                    : compareByPlanDate(taskB, taskA),
            );
        case TaskSort.DURATION:
            return tasks.sort((taskA, taskB) =>
                direction === SortingDirection.Ascending
                    ? compareByDuration(taskA, taskB)
                    : compareByDuration(taskB, taskA),
            );
        case TaskSort.DUE_DATE:
            return tasks.sort((taskA, taskB) =>
                direction === SortingDirection.Ascending
                    ? compareByDueDate(taskA, taskB)
                    : compareByDueDate(taskB, taskA),
            );
        case TaskSort.IMPORTANCE:
            return tasks.sort((taskA, taskB) =>
                direction === SortingDirection.Ascending
                    ? comapreByImportance(taskA, taskB)
                    : comapreByImportance(taskB, taskA),
            );
        default:
            return tasks;
    }
}
