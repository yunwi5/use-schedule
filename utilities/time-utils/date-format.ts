export function getTimeFormat (time: Date) {
	return `${time.getHours()}:${time.getMinutes()}`;
}

export function getDateFormat (date: Date) {
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	});
}
