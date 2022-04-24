import { resetHoursAndMinutes } from "./date-control";
import { WeekDay, WeekDayList } from "../../models/date-models/WeekDay";
import { mod } from "../gen-utils/calc-util";

const NUM_DAYS_PER_WEEK = 7;

export function getDayName(offset: number): WeekDay {
    offset = offset % 7;
    return WeekDayList[offset];
}

export function getDayOffset(weekDay: WeekDay): number {
    if (!weekDay) return 0;
    const index = WeekDayList.indexOf(weekDay);
    const offset = mod(index - 1, NUM_DAYS_PER_WEEK);
    return offset;
}

export function getDayIndexFromMon(date: Date): number {
    const dayIndex = date.getDay(); // sun: 0, mon: 1, ..., sat: 6
    const dayIndexFromMon = dayIndex === 0 ? 6 : dayIndex - 1;
    return dayIndexFromMon;
}

export function getCurrentWeekBeginning() {
    const current = new Date();
    const currentWeekBeginning = getWeekBeginning(current);
    return currentWeekBeginning;
}

export function getCurrentMonthBeginning() {
    const current = new Date();
    const currentWeekBeginning = getMonthBeginning(current);
    return currentWeekBeginning;
}

export function getCurrentYearBeginning() {
    const current = new Date();
    const currentYearBeginning = getYearBeginning(current);
    return currentYearBeginning;
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

export function getYearBeginning(date: Date): Date {
    const firstYearDay = new Date(date.getFullYear(), 0, 1);
    return firstYearDay;
}

export function getYearEnding(date: Date): Date {
    const lastYearDay = new Date(date.getFullYear(), 12, 0);
    lastYearDay.setHours(23);
    lastYearDay.setMinutes(59);
    return lastYearDay;
}

// Below 3 functions are not being used at the moment.
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

export function getCurrentMonthWeekBeginning(): Date {
    const current = new Date();
    return getMonthWeekBeginning(current);
}
