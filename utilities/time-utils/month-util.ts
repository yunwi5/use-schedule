import { Month } from "../../models/date-models/Month";

export function getMonth (date: Date) {
	const month = date.toLocaleDateString("en-US", {
		month: "short"
	});

	return month;
}

export function getShorterMonthName (month: Month) {
	if (month.length < 3) throw new Error("Month name is too short (<3)!");
	return month.slice(0, 3);
}
