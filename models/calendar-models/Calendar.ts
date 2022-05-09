import { dateIsBetween, isSameDate } from '../../utilities/date-utils/date-check';
import { addDays } from '../../utilities/date-utils/date-control';
import {
    getMonthEnding,
    getWeekBeginning,
    getWeekEnding,
} from '../../utilities/date-utils/date-get';
import { getMonthMember } from '../date-models/Month';
import { CalendarItem } from './CalendarItem';

export class Calendar {
    public calendarStart;
    public calendarEnd;
    public items: CalendarItem[] = [];

    constructor(public beginningPeriod: Date) {
        const calendarStart = getWeekBeginning(beginningPeriod);
        this.calendarStart = calendarStart;

        const monthEnd = getMonthEnding(beginningPeriod);
        // console.log("month ending:", monthEnd);

        const calendarEnd = getWeekEnding(monthEnd);
        // console.log("calendar end:", calendarEnd);
        this.calendarEnd = calendarEnd;
    }

    addItem(item: CalendarItem): void {
        item.dateTime;
        if (item.dateTime && dateIsBetween(item.dateTime, this.calendarStart, this.calendarEnd)) {
            // console.log("name:", item.name, "Pass range test. DateTime:", item.dateTime);
            this.items.push(item);
        }
    }

    getMonthYear(short?: boolean): string {
        const month = getMonthMember(this.beginningPeriod);
        const year = this.beginningPeriod.getFullYear();
        return short ? `${month.slice(0, 3)} ${year}` : `${month} ${year}`;
    }

    // get items of the specified date.
    getItems(date: Date): CalendarItem[] {
        const itemsOfTheDate = this.items.filter((item) => {
            if (!item.dateTime) return false;
            return isSameDate(item.dateTime, date);
        });
        return itemsOfTheDate;
    }

    generateCalendarDays(): Date[] {
        const calendarDates: Date[] = [];
        let currentDate = this.calendarStart;

        // genreate all days between startDate and endDate of this calendar object.
        while (currentDate.getTime() < this.calendarEnd.getTime()) {
            // const dateItem = { date: currentDate, day: currentDate.getDay() };
            calendarDates.push(currentDate);

            // input date is not mutated by its definition.
            currentDate = addDays(currentDate, 1);
        }
        return calendarDates;
    }
}
