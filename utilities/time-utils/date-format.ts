import { addMinutes } from "./date-control";

export function getTimeFormat (time: Date) {
	return `${time.getHours()}:${time.getMinutes()}`;
}

export function getDurationFormat (minutes: number) {
	const hrs = Math.floor(minutes / 60);
	const mins = minutes % 60;

	const hrsSection = hrs ? `${hrs} hrs` : "";
	const minsSection = mins ? `${mins} mins` : "";

	return `${hrsSection} ${minsSection}`;
}

// Not including year
export function getDateFormat (date: Date) {
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	});
}

// Including year
export function getFullDateFormat (date: Date) {
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
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

// More user friendly tiem display
export function getUserTimeFormat (date: Date): string {
	let hours = "" + (date.getHours() % 12 === 0 ? 12 : date.getHours() % 12);
	let minutes = "" + date.getMinutes().toString();
	let suffix = date.getHours() > 12 ? "pm" : "am";

	// if (hours === 0) hours = "12";
	if (hours.length === 1) hours = "0" + hours;
	if (minutes.length === 1) minutes = "0" + minutes;

	return `${hours}:${minutes} ${suffix}`;
}

// For user display
export function getDateTimeFormat (date: Date) {
	const dateFormat = getFullDateFormat(date);
	const timeFormat = getUserTimeFormat(date);
	return `${timeFormat}  ${dateFormat}`;
}

export function getEndDateTimeFormat (startTime: Date, duration: number) {
	const estimatedEndTime = addMinutes(startTime, duration);
	const endTimeFormatted = getDateTimeFormat(estimatedEndTime);
	return endTimeFormatted;
}
