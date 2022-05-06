import { WeekDay, WeekDayListFromMonday } from '../../models/date-models/WeekDay';

export function getShortDayName(day: WeekDay) {
    return day.slice(0, 3);
}

export function getShortWeekDayList() {
    const weekdayList = WeekDayListFromMonday.filter((day) => day !== WeekDay.ANY);
    const shortWeekDays = weekdayList.map((day) => day.slice(0, 3).toUpperCase());
    return shortWeekDays;
}
