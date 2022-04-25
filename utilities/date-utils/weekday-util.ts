import { WeekDay } from "../../models/date-models/WeekDay";

export function getShortDayName (day: WeekDay) {
	return day.slice(0, 3);
}
