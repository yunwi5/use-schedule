import { RecurringEvent } from '../../models/recurring-models/RecurringEvent';

export function processRecurringEvents(events: RecurringEvent[]) {
    const eventsList: RecurringEvent[] = events.map((ev) => {
        ev.dateTime = new Date(ev.dateTime);
        ev.startDate = new Date(ev.startDate);
        ev.endDate = new Date(ev.endDate);
        ev.lastRecurred = ev.lastRecurred ? new Date(ev.lastRecurred) : undefined;
        return ev;
    });
    return eventsList;
}
