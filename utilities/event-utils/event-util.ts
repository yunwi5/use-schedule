import { Event } from "../../models/Event";
import { Status } from "../../models/task-models/Status";

export function isOverdue(event: Event): boolean {
    if (event.status === Status.OPEN || event.status === Status.OVERDUE) {
        const current = new Date();
        // current time is later than the due date, meaning overdue
        return event.dateTime.getTime() < current.getTime();
    }
    return false;
}

export function adjustIfOverdueEvent(event: Event): void {
    if (!(event.dateTime instanceof Date)) {
        return;
    }
    if (isOverdue(event)) event.status = Status.OVERDUE;
}
