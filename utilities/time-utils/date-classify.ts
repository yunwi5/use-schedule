import { getWeekEnding } from "./date-get";
import { WeekDay, WeekDayList } from "../../models/date-models/WeekDay";

export function isSameDay (weekDay: WeekDay, date: Date): boolean {
	const day = WeekDayList[date.getDay()];
	return weekDay === day;
}

export function isSameWeek (weekBeginning: Date, date: Date): boolean {
	const weekEnding = getWeekEnding(weekBeginning);
	return weekBeginning.getTime() <= date.getTime() && date.getTime() <= weekEnding.getTime();
}

export function compareDates (date1: Date, date2: Date): boolean {
	return date1.getTime() < date2.getTime();
}
