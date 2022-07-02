import { Month } from '../../models/date-models/Month';
import { addWeeks } from './date-control';
import {
    getMonthBeginning,
    getMonthEnding,
    getWeekBeginning,
    getWeekEnding,
} from './date-get';
import { compareDates } from './date-check';
import { getIntervalFormat } from './non-user-date-format';

export function getMonthName(date: Date, short: boolean = true) {
    const month = date.toLocaleDateString('en-US', {
        month: short ? 'short' : 'long',
    });
    return month;
}

export function getShorterMonthName(month: Month) {
    return month.substring(0, 3);
}

export function getNumberOfWeeks(date: Date): number {
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const numWeeks = getWeekOfMonth(lastDayOfMonth);
    return numWeeks;
}

// Important function
// Still needs testing
export function getWeekOfMonth(date: Date): number {
    // nth day in the week
    let firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // Sunday should be day 7 in this app.
    if (firstWeekday === 0) firstWeekday = 7;

    // Weekday starting from Monday, so -2
    const offsetDate = date.getDate() + firstWeekday - 2;

    return Math.floor(offsetDate / 7) + 1; // This returns a week number (starting 1).
}

export function getWeekInterval(monthBeginning: Date, weekNumber: number): [Date, Date] {
    const isSameTime =
        monthBeginning.getTime() === getMonthBeginning(monthBeginning).getTime();
    if (!isSameTime) throw new Error('Month beginning does not match!');
    const monthEnding = getMonthEnding(monthBeginning);

    // 28/Feb for March
    const weekBeginning = getWeekBeginning(monthBeginning);
    const weekIndex = Math.max(weekNumber - 1, 0);

    let targetWeekday = addWeeks(weekBeginning, weekIndex);
    // If targetWeekday is less than monthBeginning (like last date of last month)
    if (compareDates(targetWeekday, monthBeginning)) {
        targetWeekday = monthBeginning;
    }
    let targetWeekEnding = getWeekEnding(targetWeekday);
    // If targetWeekEnding is greater than monthEnding (like beginning dates of next month)
    if (compareDates(monthEnding, targetWeekEnding)) {
        targetWeekEnding = monthEnding;
    }

    return [targetWeekday, targetWeekEnding];
}

export function getWeekIntervalFormat(monthBeginning: Date, weekNumber: number): string {
    const [weekBeginning, weekEnding] = getWeekInterval(monthBeginning, weekNumber);
    return getIntervalFormat(weekBeginning, weekEnding);
}
