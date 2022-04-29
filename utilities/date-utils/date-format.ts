import { isInvalidDate } from "./date-check";
import { addMinutes } from "./date-control";

const ONE_DAY = 60 * 24;

export function getDurationFormat(minutes: number) {
    const days = Math.floor(minutes / ONE_DAY);

    const remainingMinutes = minutes % ONE_DAY;
    const hrs = Math.floor(remainingMinutes / 60);
    const mins = remainingMinutes % 60;

    const daysSection = days ? `${days} ${days > 1 ? "days" : "day"} ` : "";
    const hrsSection = hrs ? `${hrs} ${hrs > 1 ? "hrs" : "hr"} ` : "";
    const minsSection = mins ? `${mins} ${mins > 1 ? "mins" : "min"} ` : "";

    const durationFormat = `${daysSection} ${hrsSection} ${minsSection}`.trim();
    return durationFormat ? durationFormat : "0 hr";
}

// Not including year
export function getDateMonthFormat(date: Date) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}

// Including year
export function getFullDateFormat(date: Date) {
    if (isInvalidDate(date)) return "";
    const date2 = new Date(date);
    return date2.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function getTimeFormat(time: Date) {
    return `${time.getHours()}:${time.getMinutes()}`;
}

// Used in TaskForm.ts
export function getISODateFormat(date: Date): string {
    const dateCpy = new Date(date);
    dateCpy.setHours(12);
    dateCpy.setDate(dateCpy.getDate() + 1);
    return dateCpy.toISOString().split("T")[0];
}
// Used in TaskForm.ts
export function getISOTimeFormat(date: Date): string {
    if (!date) return "";
    let hours = "" + date.getHours();
    let minutes = "" + date.getMinutes().toString();

    if (hours.length === 1) hours = "0" + hours;
    if (minutes.length === 1) minutes = "0" + minutes;

    return `${hours}:${minutes}`;
}

// More user friendly tiem display
export function getUserTimeFormat(date: Date): string {
    let hours = "" + (date.getHours() % 12 === 0 ? 12 : date.getHours() % 12);
    let minutes = "" + date.getMinutes().toString();
    let suffix = date.getHours() > 12 ? "pm" : "am";

    if (hours.length === 1) hours = "0" + hours;
    if (minutes.length === 1) minutes = "0" + minutes;

    return `${hours}:${minutes} ${suffix}`;
}

// For user display
export function getDateTimeFormat(date: Date | undefined) {
    if (!date) return "N/A";
    const dateFormat = getFullDateFormat(date);
    const timeFormat = getUserTimeFormat(date);
    return `${timeFormat}  ${dateFormat}`;
}

export function getEndDateTimeFormat(startTime: Date, duration: number) {
    const estimatedEndTime = addMinutes(startTime, duration);
    const endTimeFormatted = getDateTimeFormat(estimatedEndTime);
    return endTimeFormatted;
}

// Event dateTime, format: Apr 27 2022 (Wed), 05:00 pm
export function getEventDateTimeFormat(dateTime: Date) {
    return `${dateTime.toDateString().slice(3)} (${dateTime
        .toDateString()
        .slice(0, 3)}), ${getUserTimeFormat(dateTime)}`;
}
