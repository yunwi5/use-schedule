import { getMonthMember } from '../../models/date-models/Month';
import { getWeekDay } from '../../models/date-models/WeekDay';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { RecurringInterval, RecurringItem } from '../../models/recurring-models';
import { RecurringEvent } from '../../models/recurring-models/RecurringEvent';
import { addDays, addMonths, addWeeks, addYears } from '../date-utils/date-control';
import { getShortUserTimeFormat } from '../date-utils/date-format';
import { getDaySuffixed } from '../gen-utils/format-util';

export function processRecurringEvents(recEvents: RecurringEvent[]) {
    const eventsList: RecurringEvent[] = recEvents.map((ev) => {
        const recEv = new RecurringEvent(ev, ev.id);
        return recEv;
    });
    return eventsList;
}

export function getIntervalFormat(item: RecurringItem): string | JSX.Element {
    const timeFormat = getShortUserTimeFormat(item.startDate);
    const dateOfMonth: JSX.Element = getDaySuffixed(item.startDate);

    switch (item.interval) {
        case RecurringInterval.DAY: {
            return `Everyday ${timeFormat}`;
        }
        case RecurringInterval.WEEK: {
            const dayName = getWeekDay(item.startDate);
            return `Every ${dayName} ${timeFormat}`;
        }
        case RecurringInterval.MONTH: {
            return (
                <>
                    Every {dateOfMonth} {timeFormat}
                </>
            );
        }
        case RecurringInterval.YEAR: {
            const monthName = getMonthMember(item.startDate);
            return (
                <>
                    Every {monthName} {dateOfMonth}
                </>
            );
        }
    }
}

export const incrementRecurringDate = (date: Date, recurringInterval: RecurringInterval) => {
    switch (recurringInterval) {
        case RecurringInterval.DAY:
            return addDays(date, 1);
        case RecurringInterval.WEEK:
            return addWeeks(date, 1);
        case RecurringInterval.MONTH:
            return addMonths(date, 1);
        case RecurringInterval.YEAR:
            return addYears(date, 1);
        default:
            return date;
    }
};

export const decrementRecurringDate = (date: Date, recurringInterval: RecurringInterval) => {
    switch (recurringInterval) {
        case RecurringInterval.DAY:
            return addDays(date, -1);
        case RecurringInterval.WEEK:
            return addWeeks(date, -1);
        case RecurringInterval.MONTH:
            return addMonths(date, -1);
        case RecurringInterval.YEAR:
            return addYears(date, -1);
        default:
            return date;
    }
};

export function getPlannerType(interval: RecurringInterval): PlannerMode {
    switch (interval) {
        case RecurringInterval.DAY:
        case RecurringInterval.WEEK:
            return PlannerMode.WEEKLY;
        case RecurringInterval.MONTH:
            return PlannerMode.MONTLY;
        case RecurringInterval.YEAR:
            return PlannerMode.YEARLY;
        default:
            return PlannerMode.WEEKLY;
    }
}
