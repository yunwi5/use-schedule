import { isInvalidDate } from './date-check';
import { addMinutes, addMonths } from './date-control';

const ONE_DAY = 60 * 24;

function getDurationDayHourMinutes(totalMinutes: number) {
    const days = Math.floor(totalMinutes / ONE_DAY);
    const remainingMinutes = totalMinutes % ONE_DAY;
    const hours = Math.floor(remainingMinutes / 60);
    const minutes = remainingMinutes % 60;
    return { days, hours, minutes };
}

export function getShortDurationFormat(minutes: number) {
    const { days, hours: hrs, minutes: mins } = getDurationDayHourMinutes(minutes);

    const daysSection = days ? `${days} d ` : '';
    const hrsSection = hrs ? `${hrs} h ` : '';
    const minsSection = mins ? `${mins} m` : '';
    const durationFormat = `${daysSection} ${hrsSection} ${minsSection}`.trim();
    return durationFormat ? durationFormat : '0 h';
}

export function getDurationFormat(minutes: number) {
    const { days, hours: hrs, minutes: mins } = getDurationDayHourMinutes(minutes);

    const daysSection = days ? `${days} ${days > 1 ? 'days' : 'day'} ` : '';
    const hrsSection = hrs ? `${hrs} ${hrs > 1 ? 'hrs' : 'hr'} ` : '';
    const minsSection = mins ? `${mins} ${mins > 1 ? 'mins' : 'min'} ` : '';

    const durationFormat = `${daysSection} ${hrsSection} ${minsSection}`.trim();
    return durationFormat ? durationFormat : '0 hr';
}

// Not including year
export function getDateMonthFormat(date: Date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });
}

// Including year
export function getFullDateFormat(date: Date) {
    if (isInvalidDate(date)) return '';
    const date2 = new Date(date);
    return date2.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

// 9:30
export function getTimeFormat(time: Date) {
    return `${time.getHours()}:${time.getMinutes()}`;
}

// 2022-05
export function getISOYearMonthFormat(date: Date) {
    const dateISO = addMonths(date, 1).toISOString();
    return dateISO.split('T')[0].substring(0, 7);
}

// Used in TaskForm.ts
// 2022-05-03
export function getISODateFormat(date: Date): string {
    const dateCpy = new Date(date);
    dateCpy.setHours(12);
    dateCpy.setDate(dateCpy.getDate() + 1);
    return dateCpy.toISOString().split('T')[0];
}

// Used for form inputs (not user friendly)
export function getISOTimeFormat(date: Date): string {
    if (!date) return '';
    let hours = '' + date.getHours();
    let minutes = '' + date.getMinutes().toString();

    if (hours.length === 1) hours = '0' + hours;
    if (minutes.length === 1) minutes = '0' + minutes;

    return `${hours}:${minutes}`;
}

// More user friendly time display
// format: 11:00
export function getLongUserTimeFormat(date: Date): string {
    let hours = '' + (date.getHours() % 12 === 0 ? 12 : date.getHours() % 12);
    let minutes = '' + date.getMinutes().toString();
    let suffix = date.getHours() >= 12 ? 'pm' : 'am';

    if (hours.length === 1) hours = '0' + hours;
    if (minutes.length === 1) minutes = '0' + minutes;

    return `${hours}:${minutes} ${suffix}`;
}

// More user friendly and even shorter time display
// format: 11am (if only hours) | 12:15pm (if both hours and minutes)
export function getShortUserTimeFormat(date: Date) {
    let hours = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
    const minutes = date.getMinutes();
    const format = `${hours}${minutes > 0 ? `:${minutes}` : ''}${ampm}`;
    return format;
}

// For user display
export function getDateTimeFormat(date: Date | undefined) {
    if (!date) return 'N/A';
    const dateFormat = getFullDateFormat(date);
    const timeFormat = getLongUserTimeFormat(date);
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
        .slice(0, 3)}), ${getLongUserTimeFormat(dateTime)}`;
}

export function getShortEventDateTimeFormat(dateTime: Date) {
    return `${dateTime.toDateString().slice(3)} (${dateTime
        .toDateString()
        .slice(0, 3)}), ${getShortUserTimeFormat(dateTime)}`;
}
