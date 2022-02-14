export function getTimeFormat (time: Date) {
	return `${time.getHours()}:${time.getMinutes()}`;
}

export function getDateFormat (date: Date) {
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	});
}

// Used in TaskForm.ts
export function getISODateFormat (date: Date): string {
	const dateCpy = new Date(date);
	dateCpy.setHours(12);
	dateCpy.setDate(dateCpy.getDate() + 1);
	return dateCpy.toISOString().split("T")[0];
}
// In testing
export function getISOTimeFormat (date: Date): string {
	let hours = "" + date.getHours();
	let minutes = "" + date.getMinutes().toString();

	if (hours.length === 1) hours = "0" + hours;
	if (minutes.length === 1) minutes = "0" + minutes;

	return `${hours}:${minutes}`;
}

export function getDateTimeFormat (date: Date) {
	const dateFormat = getDateFormat(date);
	const timeFormat = getISOTimeFormat(date);
	return `${timeFormat} ${dateFormat}`;
}
