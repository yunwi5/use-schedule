import { Task } from '../../models/task-models/Task';

export function sortTaskByTime(taskA: Task, taskB: Task) {
    return new Date(taskA.timeString) < new Date(taskB.timeString) ? -1 : 1;
}

interface IDateTime {
    dateTime?: Date;
}
export function compareByDateTime(
    { dateTime: dateTimeA }: IDateTime,
    { dateTime: dateTimeB }: IDateTime,
): number {
    // No datetime so should come last.
    if (!dateTimeA) return -1;
    if (!dateTimeB) return 1;
    return dateTimeA.getTime() - dateTimeB.getTime();
}

// General re-usable sorting standards.
interface IDuration {
    duration?: number;
}
export function compareByDuration(taskA: IDuration, taskB: IDuration): number {
    if (!taskB.duration) return -1;
    if (!taskA.duration) return 1;

    return taskA.duration - taskB.duration;
}

interface IImportanceCompletion {
    isImportant: boolean;
    isCompleted: boolean;
}

export function compareByImportance(
    subTaskA: IImportanceCompletion,
    subTaskB: IImportanceCompletion,
) {
    if (!subTaskA.isImportant && subTaskB.isImportant) return -1;
    return 1;
}

export function compareByCompletion(subA: IImportanceCompletion, subB: IImportanceCompletion) {
    if (!subA.isCompleted && subB.isCompleted) return -1;
    return 1;
}
