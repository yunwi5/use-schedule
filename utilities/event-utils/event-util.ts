import { IEvent } from '../../models/Event';
import { Status } from '../../models/task-models/Status';

export function isOverdue(event: IEvent): boolean {
    if (event.status === Status.OPEN || event.status === Status.OVERDUE) {
        const current = new Date();
        // current time is later than the due date, meaning overdue
        return event.dateTime.getTime() < current.getTime();
    }
    return false;
}

export function adjustIfOverdueEvent(event: IEvent): void {
    if (!(event.dateTime instanceof Date)) {
        return;
    }
    if (isOverdue(event)) event.status = Status.OVERDUE;
}

export function processEvents(events: IEvent[]) {
    const eventsList: IEvent[] = events.map((ev) => {
        ev.dateTime = new Date(ev.dateTime);
        adjustIfOverdueEvent(ev);
        return ev;
    });
    return eventsList;
}
