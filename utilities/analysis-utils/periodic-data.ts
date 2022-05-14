import { FrequencyMap, getInitialFrequencyMap } from '.';
import { DayPeriodList, getDayPeriod } from '../../models/date-models/DayPeriod';
import { getMonthMember, Month, MonthList } from '../../models/date-models/Month';
import { getWeekDay, WeekDay, WeekDayListFromMonday } from '../../models/date-models/WeekDay';

interface DateTimeItem {
    dateTime: Date;
}
export function generateDayPeriodMap(items: DateTimeItem[]): FrequencyMap {
    const dayPeriodMap: FrequencyMap = getInitialFrequencyMap(DayPeriodList);

    items.forEach((item) => {
        const dayPeriod = getDayPeriod(item.dateTime);
        dayPeriodMap[dayPeriod] += 1;
    });
    return dayPeriodMap;
}

const weekDayList: WeekDay[] = WeekDayListFromMonday.filter((wd) => wd !== WeekDay.ANY);

export function generateWeekDayMap(items: DateTimeItem[]): FrequencyMap {
    const weekDayMap = getInitialFrequencyMap(weekDayList);

    items.forEach((item) => {
        const weekDay: WeekDay = getWeekDay(item.dateTime);
        if (weekDay in weekDayMap) weekDayMap[weekDay] += 1;
        else weekDayMap[weekDay] = 1;
    });
    return weekDayMap;
}

export function generateMonthMap(items: DateTimeItem[]): FrequencyMap {
    // MonthList from January to December
    const monthMap = getInitialFrequencyMap(MonthList);

    items.forEach((item) => {
        const month: Month = getMonthMember(new Date(item.dateTime));
        if (month in monthMap) monthMap[month] += 1;
        else monthMap[month] = 1;
    });
    return monthMap;
}
