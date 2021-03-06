import { resetHoursAndMinutes } from './date-control';
import { WeekDay, WeekDayList } from '../../models/date-models/WeekDay';
import { mod } from '../gen-utils/calc-util';
import { PlannerMode } from '../../models/planner-models/PlannerMode';

const NUM_DAYS_PER_WEEK = 7;

export function getDayName(offset: number): WeekDay {
    offset = offset % 7;
    return WeekDayList[offset];
}
export function getDayNameFromDate(date: Date): WeekDay {
    return getDayName(date.getDay());
}

export function getDayOffset(weekDay: WeekDay): number {
    if (!weekDay) return 0;
    const index = WeekDayList.indexOf(weekDay);
    const offset = mod(index - 1, NUM_DAYS_PER_WEEK);
    return offset;
}

export function getDayIndexFromMonth(date: Date): number {
    const dayIndex = date.getDay(); // sun: 0, mon: 1, ..., sat: 6
    const dayIndexFromMon = dayIndex === 0 ? 6 : dayIndex - 1;
    return dayIndexFromMon;
}

export function getCurrentWeekBeginning() {
    const current = new Date();
    const currentWeekBeginning = getWeekBeginning(current);
    return currentWeekBeginning;
}

export function getWeekBeginning(date: Date): Date {
    const curr = new Date(date);
    let weekBeginning: Date;
    if (curr.getDay() !== 0) {
        // it is Monday to Saturday
        weekBeginning = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
    } else {
        // it is Suanday
        weekBeginning = new Date(curr.setDate(curr.getDate() - 6));
    }
    return resetHoursAndMinutes(weekBeginning);
}

export function getWeekEnding(date: Date): Date {
    const curr = new Date(date);
    let weekEnding: Date;
    if (curr.getDay() !== 0) {
        weekEnding = new Date(curr.setDate(curr.getDate() + (7 - curr.getDay())));
    } else {
        // Sunday is the ending
        weekEnding = new Date(curr);
    }
    weekEnding.setHours(23);
    weekEnding.setMinutes(59);
    weekEnding.setSeconds(59);
    return weekEnding;
}

export function getCurrentMonthBeginning() {
    const current = new Date();
    const currentWeekBeginning = getMonthBeginning(current);
    return currentWeekBeginning;
}

// Needs to be tested
export function getMonthBeginning(date: Date): Date {
    const firstday = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstday;
}

export function getMonthEnding(date: Date): Date {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    lastDay.setHours(23);
    lastDay.setMinutes(59);
    lastDay.setSeconds(59);
    return lastDay;
}

export function getCurrentYearBeginning() {
    const current = new Date();
    const currentYearBeginning = getYearBeginning(current);
    return currentYearBeginning;
}

export function getYearBeginning(date: Date): Date {
    const firstYearDay = new Date(date.getFullYear(), 0, 1);
    return firstYearDay;
}

export function getYearEnding(date: Date): Date {
    const lastYearDay = new Date(date.getFullYear(), 12, 0);
    lastYearDay.setHours(23);
    lastYearDay.setMinutes(59);
    lastYearDay.setSeconds(59);
    return lastYearDay;
}

// Below 3 functions are not being used at the moment.
export function getCurrentMonthWeekBeginning(): Date {
    const current = new Date();
    return getMonthWeekBeginning(current);
}

// Beginning date of a calendar month (e.g. 31th Jan inside Feb calendar section)
export function getMonthWeekBeginning(date: Date): Date {
    const monthBeginning = getMonthBeginning(date);
    const monthWeekBegin = getWeekBeginning(monthBeginning);
    return monthWeekBegin;
}

// Beginning date of a calendar month (e.g. 31th Jan inside Feb calendar section)
export function getMonthWeekEnding(date: Date): Date {
    const monthEnding = getMonthEnding(date);
    const monthWeekEnd = getWeekEnding(monthEnding);
    return monthWeekEnd;
}

// find ending period of the date period based on PlannerMode
export function getPlannerPeriodEnding(plannerMode: PlannerMode | null, period: Date) {
    switch (plannerMode) {
        case PlannerMode.WEEKLY:
            return getWeekEnding(period);
        case PlannerMode.MONTLY:
            return getMonthEnding(period);
        case PlannerMode.YEARLY:
            return getYearEnding(period);
        default:
            return period;
    }
}

const ONE_MIN = 1000 * 60;
// Difference in minutes.
export function getTimeDifferenceInMinutes(date1: Date, date2: Date) {
    const timeDiffInMs = date1.getTime() - date2.getTime();
    return Math.floor(timeDiffInMs / ONE_MIN);
}
