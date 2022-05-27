import { getWeekBeginning, getWeekEnding } from './date-get';
import { WeekDay, WeekDayList } from '../../models/date-models/WeekDay';

export function isInvalidDate(date: Date | null | undefined): boolean {
    if (!date) return true;
    return date.toString() === 'Invalid Date';
}

export function isSunday(date: Date) {
    return date.getDay() === 0;
}

export function isOverdue(d: Date | null | undefined) {
    if (!d) return false;
    const now = new Date();
    return d.getTime() <= now.getTime();
}

export function isCurrentDate(date: Date) {
    const today = new Date();
    return (
        today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate()
    );
}

export function isSameDay(weekDay: WeekDay, date: Date): boolean {
    const day = WeekDayList[date.getDay()];
    return weekDay === day;
}

export function isSameTime(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate() &&
        date1.getHours() === date2.getHours() &&
        date1.getMinutes() === date2.getMinutes()
    );
}

export function isSameDate(date1: Date, date2: Date | null): boolean {
    if (!date1 || isInvalidDate(date1)) return false;
    if (!date2 || isInvalidDate(date2)) return false;
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

export function isSameWeek(begin: Date, date: Date | null): boolean {
    if (!begin || !date) return false;

    let weekBeginning = getWeekBeginning(begin);
    weekBeginning.setSeconds(0);

    const weekEnding = getWeekEnding(weekBeginning);
    return weekBeginning.getTime() <= date.getTime() && date.getTime() <= weekEnding.getTime();
}

export function isSameMonth(monthBeginning: Date, date: Date): boolean {
    monthBeginning.setSeconds(0);
    return monthBeginning.getMonth() === date.getMonth();
}

export function isSameYear(yearBeginning: Date, date: Date): boolean {
    yearBeginning.setSeconds(0);
    return yearBeginning.getFullYear() === date.getFullYear();
}

export function compareDates(date1: Date, date2: Date): boolean {
    return date1.getTime() < date2.getTime();
}

export function dateIsBetween(date: Date, lowerBound: Date, upperBound: Date): boolean {
    if (!date) return false;
    return date.getTime() >= lowerBound.getTime() && date.getTime() <= upperBound.getTime();
}
