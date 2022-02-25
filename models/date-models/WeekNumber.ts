export enum WeekNumber {
	FIRST_WEEK = "1st Week",
	SECOND_WEEK = "2nd Week",
	THIRD_WEEK = "3rd Week",
	FOURTH_WEEK = "4th Week",
	FIFTH_WEEK = "5th Week",
	ANY = "Any Week"
}

export const WeekNumberListFromWeek1 = [
	WeekNumber.FIRST_WEEK,
	WeekNumber.SECOND_WEEK,
	WeekNumber.THIRD_WEEK,
	WeekNumber.FOURTH_WEEK,
	WeekNumber.FIFTH_WEEK,
	WeekNumber.ANY
];

export function getWeekFromIndex (index: number) {
	if (index < WeekNumberListFromWeek1.length) return WeekNumberListFromWeek1[index];
	return WeekNumber.ANY;
}
