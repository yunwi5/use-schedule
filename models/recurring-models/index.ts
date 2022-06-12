import { Importance } from '../task-models/Status';

export enum RecurringInterval {
    DAY = 'Day',
    WEEK = 'Week',
    MONTH = 'Month',
    YEAR = 'Year',
}

export const RecurringIntervalList = Object.freeze([
    RecurringInterval.DAY,
    RecurringInterval.WEEK,
    RecurringInterval.MONTH,
    RecurringInterval.YEAR,
]);

export function isRecurringInterval(interval: string) {
    switch (interval.trim()) {
        case RecurringInterval.DAY:
        case RecurringInterval.WEEK:
        case RecurringInterval.MONTH:
        case RecurringInterval.YEAR:
            return true;
        default:
            return false;
    }
}

export enum RecurringItemMode {
    EVENT = 'Event',
    TASK = 'Task',
}

// interface for both RecurringEvent and RecurringTask
export interface RecurringItem {
    id: string;
    name: string;
    dateTime: Date;
    description: string;
    duration: number;
    importance: Importance;
    userId: string;
    startDate: Date;
    endDate: Date;
    intervalFormat: string | JSX.Element;
    lastRecurred?: Date;
}
