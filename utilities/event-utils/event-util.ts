import { IEvent, Participant } from '../../models/Event';
import { Status } from '../../models/task-models/Status';
import { validateEmail } from '../gen-utils/string-util';

export function adjustParticipantsInput(participants: Participant[] | undefined) {
    if (participants == null) return;
    const filtered = participants.filter((p) => p.name.trim() && validateEmail(p.email.trim()));
    return filtered;
}

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
        // adjustIfOverdueEvent(ev);    // may not be a good user experience
        return ev;
    });
    return eventsList;
}
