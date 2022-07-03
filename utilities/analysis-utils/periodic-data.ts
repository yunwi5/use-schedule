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
        try {
            const dayPeriod = getDayPeriod(item.dateTime);
            dayPeriodMap[dayPeriod] += 1;
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'err in generateDayPeriodMap()';
            console.log(message);
        }
    });
    return dayPeriodMap;
}

const weekDayList: WeekDay[] = WeekDayListFromMonday.filter((wd) => wd !== WeekDay.ANY);

export function generateWeekDayMap(items: DateTimeItem[]): FrequencyMap {
    const weekDayMap = getInitialFrequencyMap(weekDayList);

    items.forEach((item) => {
        try {
            const weekDay: WeekDay = getWeekDay(item.dateTime);
            if (weekDay in weekDayMap) weekDayMap[weekDay] += 1;
            else weekDayMap[weekDay] = 1;
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'error in generateWeekDayMap()';
            console.log(message);
        }
    });
    return weekDayMap;
}

export function generateMonthMap(items: DateTimeItem[]): FrequencyMap {
    // MonthList from January to December
    const monthMap = getInitialFrequencyMap(MonthList);

    items.forEach((item) => {
        try {
            const month: Month = getMonthMember(new Date(item.dateTime));
            if (month in monthMap) monthMap[month] += 1;
            else monthMap[month] = 1;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'err in generateMonthMap()';
            console.log(message);
        }
    });
    return monthMap;
}
