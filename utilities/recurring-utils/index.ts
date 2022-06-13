import { RecurringInterval } from "../../models/recurring-models";
import { RecurringEvent } from '../../models/recurring-models/RecurringEvent';
import { addDays, addMonths, addWeeks, addYears } from "../date-utils/date-control";

export function processRecurringEvents(recEvents: RecurringEvent[]) {
    const eventsList: RecurringEvent[] = recEvents.map((ev) => {
        const recEv = new RecurringEvent(ev, ev.id);
        return recEv;
    });
    return eventsList;
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
