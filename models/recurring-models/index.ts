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
