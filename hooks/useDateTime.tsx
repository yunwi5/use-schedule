import { useState, useEffect } from "react";
import { addMonths, addWeeks, addYears } from "../utilities/time-utils/date-control";
import {
	getCurrentMonthBeginning,
	getCurrentWeekBeginning,
	getCurrentYearBeginning,
	getMonthEnding,
	getWeekEnding,
	getYearEnding,
	getMonthWeekBeginning,
	getMonthWeekEnding
} from "../utilities/time-utils/date-get";

export enum ResetPeriod {
	WEEK = "week",
	MONTH = "month",
	YEAR = "year"
}

function getNewTimeStamp (resetPeriod: ResetPeriod) {
	switch (resetPeriod) {
		case ResetPeriod.WEEK:
			return getCurrentWeekBeginning();
		case ResetPeriod.MONTH:
			return getCurrentMonthBeginning();
		case ResetPeriod.YEAR:
			return getCurrentYearBeginning();
		default:
			return getCurrentWeekBeginning();
	}
}

const useDateTime = (beginningPeriod: Date, resetPeriod?: ResetPeriod) => {
	const [ currentTimeStamp, setCurrentTimeStamp ] = useState<Date>(beginningPeriod);

	// Handle navigation
	const addWeekHandler = (weeksToAdd: number) => {
		if (!currentTimeStamp) throw new Error("Current local Datetime is null!");
		const addedPeriod = addWeeks(currentTimeStamp, weeksToAdd);
		setCurrentTimeStamp(addedPeriod);
	};

	const addMonthHandler = (monthsToAdd: number) => {
		if (!currentTimeStamp) throw new Error("Current local Datetime is null!");
		const addedTimestamp = addMonths(currentTimeStamp, monthsToAdd);
		setCurrentTimeStamp(addedTimestamp);
	};

	const addYearHandler = (yearsToAdd: number) => {
		if (!currentTimeStamp) throw new Error("Current local Datetime is null!");
		const addedTimestamp = addYears(currentTimeStamp, yearsToAdd);
		setCurrentTimeStamp(addedTimestamp);
	};

	useEffect(() => {
		const storedDate = localStorage.getItem("dateTime");
		if (!storedDate) {
			const newTimeStamp = getNewTimeStamp(resetPeriod || ResetPeriod.WEEK);
			setCurrentTimeStamp(newTimeStamp);
		} else {
			const current = new Date(storedDate);
			setCurrentTimeStamp(current);
		}
	}, []);

	useEffect(
		() => {
			if (currentTimeStamp) localStorage.setItem("dateTime", currentTimeStamp.toString());
			console.log(`Save timestamp ${currentTimeStamp}`);
			// console.log(`weekEd: ${weekEnding}, monthEd: ${monthEnding}, yearEd: ${yearEnding}`);
			// console.log(`CMWB: ${monthWeekBeginning}, CMWE: ${monthWeekEnding}`);
		},
		[ currentTimeStamp ]
	);

	// const weekEnding = currentTimeStamp ? getWeekEnding(currentTimeStamp) : null;
	const weekEnding = getWeekEnding(currentTimeStamp);
	// const monthEnding = currentTimeStamp ? getMonthEnding(currentTimeStamp) : null;
	const monthEnding = getMonthEnding(currentTimeStamp);
	// const yearEnding = currentTimeStamp ? getYearEnding(currentTimeStamp) : null;
	const yearEnding = getYearEnding(currentTimeStamp);

	// const monthWeekBeginning = currentTimeStamp ? getMonthWeekBeginning(currentTimeStamp) : null;
	const monthWeekBeginning = getMonthWeekBeginning(currentTimeStamp);
	// const monthWeekEnding = currentTimeStamp ? getMonthWeekEnding(currentTimeStamp) : null;
	const monthWeekEnding = getMonthWeekEnding(currentTimeStamp);

	return {
		currentTimeStamp: currentTimeStamp,
		addWeeks: addWeekHandler,
		addMonths: addMonthHandler,
		addYears: addYearHandler,
		weekEnding,
		monthEnding,
		yearEnding,
		monthWeekBeginning,
		monthWeekEnding
	};
};

export default useDateTime;
