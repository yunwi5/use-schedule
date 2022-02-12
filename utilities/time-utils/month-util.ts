import { Month } from "../../models/date-models/Month";

export function getMonth (date: Date) {
	const month = date.toLocaleDateString("en-US", {
		month: "short"
	});

	return month;
}
