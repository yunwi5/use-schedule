import { RecurringEvent } from '../../models/recurring-models/RecurringEvent';

export function processRecurringEvents(recEvents: RecurringEvent[]) {
    const eventsList: RecurringEvent[] = recEvents.map((ev) => {
        const recEv = new RecurringEvent(ev, ev.id);
        return recEv;
    });
    return eventsList;
}
