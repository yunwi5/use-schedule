export enum WeekDay {
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday',
    ANY = 'Any',
}
// Used for date & day calculation
export const WeekDayList = [
    WeekDay.SUNDAY,
    WeekDay.MONDAY,
    WeekDay.TUESDAY,
    WeekDay.WEDNESDAY,
    WeekDay.THURSDAY,
    WeekDay.FRIDAY,
    WeekDay.SATURDAY,
];

export const WeekdayListMondayToSunday = [
    WeekDay.MONDAY,
    WeekDay.TUESDAY,
    WeekDay.WEDNESDAY,
    WeekDay.THURSDAY,
    WeekDay.FRIDAY,
    WeekDay.SATURDAY,
    WeekDay.SUNDAY,
];

// This is for user interface only
// This includes ANY day
export const WeekDayListFromMonday = [
    WeekDay.MONDAY,
    WeekDay.TUESDAY,
    WeekDay.WEDNESDAY,
    WeekDay.THURSDAY,
    WeekDay.FRIDAY,
    WeekDay.SATURDAY,
    WeekDay.SUNDAY,
    WeekDay.ANY,
];

export function getWeekDay(date: Date): WeekDay {
    const day = date.getDay(); // sun: 0, mon: 1, ..., sat: 6
    return WeekDayList[day];
}

export function getWeekDayFromIndex(index: number): WeekDay {
    if (index < WeekDayListFromMonday.length) return WeekDayListFromMonday[index];
    return WeekDay.ANY;
}
