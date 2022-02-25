import { Month } from "../../models/date-models/Month";
import { addWeeks } from "./date-control";
import { getMonthBeginning, getMonthEnding, getWeekBeginning, getWeekEnding } from "./date-get";
import { compareDates } from "./date-classify";
import { getIntervalFormat } from "./non-user-date-format";

export function getMonth (date: Date) {
	const month = date.toLocaleDateString("en-US", {
		month: "short"
	});

	return month;
}

export function getShorterMonthName (month: Month) {
	return month.substring(0, 3);
}

// Important function
export function getWeekOfMonth (date: Date): number {
	var firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	var offsetDate = date.getDate() + firstWeekday - 1;

	// return Math.floor(offsetDate / 7); // This returns a week index (starting 0).
	return Math.floor(offsetDate / 7) + 1; // This returns a week number (starting 1).
}

export function getWeekInterval (monthBeginning: Date, weekNumber: number): [Date, Date] {
	const isSameTime = monthBeginning.getTime() === getMonthBeginning(monthBeginning).getTime();
	if (!isSameTime) throw new Error("Month beginning does not match!");
	const monthEnding = getMonthEnding(monthBeginning);
	// console.log("monthEnding:", getSimpleDateTimeFormat(monthEnding, true));

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

	return [ targetWeekday, targetWeekEnding ];
}

export function getWeekIntervalFormat (monthBeginning: Date, weekNumber: number): string {
	const [ weekBeginning, weekEnding ] = getWeekInterval(monthBeginning, weekNumber);
	return getIntervalFormat(weekBeginning, weekEnding);
}
