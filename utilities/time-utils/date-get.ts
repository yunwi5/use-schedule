import { resetHoursAndMinutes } from "./date-control";
import { WeekDay, WeekDayList } from "../../models/date-models/WeekDay";
import { mod } from "../gen-utils/calc-util";

const NUM_DAYS_PER_WEEK = 7;

export function getDayName (offset: number): WeekDay {
	offset = offset % 7;
	return WeekDayList[offset];
}

export function getDayOffset (weekDay: WeekDay): number {
	const index = WeekDayList.indexOf(weekDay);
	const offset = mod(index - 1, NUM_DAYS_PER_WEEK);
	return offset;
}

export function getCurrentWeekBeginning () {
	const current = new Date();
	const currentWeekBeginning = getWeekBeginning(current);
	return currentWeekBeginning;
}

export function getWeekBeginning (date: Date): Date {
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

export function getWeekEnding (date: Date): Date {
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
	return weekEnding;
}

export function getTaskPlanTime (
	weekBeginning: Date,
	day: WeekDay,
	hours: number,
	minutes: number
): Date {
	const dayOffset = getDayOffset(day);
	const planDate = new Date(weekBeginning);
	planDate.setDate(planDate.getDate() + dayOffset);
	planDate.setHours(hours);
	planDate.setMinutes(minutes);
	return planDate;
}
