import { getImportanceValue, Importance } from '../../models/task-models/Status';
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
export function compareByDuration(itemA: IDuration, itemB: IDuration): number {
    if (itemB.duration == null) return -1;
    if (itemA.duration == null) return 1;

    return itemA.duration - itemB.duration;
}

interface IImportance {
    importance: string;
}
export function comapreByImportance(imp1: IImportance, imp2: IImportance): number {
    let importanceA = getImportanceValue(imp1.importance); // not found returns -1
    importanceA = importanceA === -1 ? 1000 : importanceA;
    let importanceB = getImportanceValue(imp2.importance);
    importanceB = importanceB === -1 ? 1000 : importanceB;

    return importanceA - importanceB;
}

export function compareByAlphabeticalOrder(word1: string, word2: string) {
    // all lowercase letters are greater than all uppercase letters
    // due to ASCII character encoding
    // Hence, convert them to lowercase for more user friendly alphabetical sorting
    return word1.trim().toLowerCase() < word2.trim().toLowerCase() ? -1 : 1;
}

// Todo & sub tasks related sorting helpers
interface IImportanceCompletion {
    isImportant: boolean;
    isCompleted: boolean;
}

export function compareByBooleanImportance(
    subA: IImportanceCompletion,
    subB: IImportanceCompletion,
) {
    if (!subA.isImportant && subB.isImportant) return -1;
    return 1;
}

export function compareByBooleanCompletion(
    subA: IImportanceCompletion,
    subB: IImportanceCompletion,
) {
    if (!subA.isCompleted && subB.isCompleted) return -1;
    return 1;
}
