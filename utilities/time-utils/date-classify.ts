import { getWeekEnding } from "./date-get";
import { WeekDay, WeekDayList } from "../../models/date-models/WeekDay";

export function isSameDay (weekDay: WeekDay, date: Date): boolean {
	const day = WeekDayList[date.getDay()];
	return weekDay === day;
}

export function isSameTime (date1: Date, date2: Date): boolean {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate() &&
		date1.getHours() === date2.getHours() &&
		date1.getMinutes() === date2.getMinutes()
	);
}

export function isSameWeek (weekBeginning: Date, date: Date): boolean {
	weekBeginning.setSeconds(0);
	const weekEnding = getWeekEnding(weekBeginning);
	return weekBeginning.getTime() <= date.getTime() && date.getTime() <= weekEnding.getTime();
}

export function isSameMonth (monthBeginning: Date, date: Date): boolean {
	monthBeginning.setSeconds(0);
	return monthBeginning.getMonth() === date.getMonth();
}

export function isSameYear (yearBeginning: Date, date: Date): boolean {
	yearBeginning.setSeconds(0);
	return yearBeginning.getFullYear() === date.getFullYear();
}

export function compareDates (date1: Date, date2: Date): boolean {
	return date1.getTime() < date2.getTime();
}
