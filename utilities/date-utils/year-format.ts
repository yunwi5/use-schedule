// Format for an yearly-planner
export function getMonthYearFormat (date: Date) {
	return date.toLocaleDateString("en-US", {
		day: "numeric",
		month: "long"
	});
}
