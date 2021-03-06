import { RecurringInterval } from '.';
import { addDays, addMonths, addWeeks, addYears } from '../../utilities/date-utils/date-control';
import { min } from '../../utilities/date-utils/date-math';
import {
    decrementRecurringDate,
    getIntervalFormat,
    incrementRecurringDate,
} from '../../utilities/recurring-utils';
import { IEvent, NoIdEvent, Participant } from '../Event';
import { Importance, Status } from '../task-models/Status';

export interface NoIdRecurringEvent extends NoIdEvent {
    id?: string;
    name: string;
    dateTime: Date; // Date is required for the calendar to display this event
    description: string;
    duration: number;

    // meeting links and location are unique attributes to Event only.
    meetingLink?: string;
    location?: string;
    participants?: Participant[]; // list of emails of participants

    userId: string;
    importance: Importance;
    status: Status; // Always open

    startDate: Date;
    endDate: Date;
    interval: RecurringInterval;
    lastRecurred?: Date;
}

export class RecurringEvent implements IEvent, NoIdRecurringEvent {
    id: string;
    name: string;
    dateTime: Date; // Date is required for the calendar to display this event
    description: string;
    duration: number;

    // meeting links and location are unique attributes to Event only.
    meetingLink?: string;
    location?: string;
    participants?: Participant[]; // list of emails of participants

    importance: Importance;
    userId: string;
    status: Status = Status.OPEN; // Event can be opened, cancelled, as well as completed, so Status enum would be relevant

    startDate: Date;
    endDate: Date;
    interval: RecurringInterval;
    lastRecurred?: Date;

    constructor(event: NoIdRecurringEvent, id: string) {
        // Common properties that also exist in event types in general
        this.id = id;
        this.name = event.name;
        this.dateTime = new Date(event.dateTime);
        this.description = event.description;
        this.duration = event.duration;
        this.importance = event.importance;
        this.userId = event.userId;
        this.meetingLink = event.meetingLink;
        this.location = event.location;
        this.participants = event.participants;

        // Unique properties only exist in recurring items
        this.startDate = new Date(event.startDate); // can be string type accidently
        this.endDate = new Date(event.endDate);
        this.interval = event.interval;
        this.lastRecurred = event.lastRecurred ? new Date(event.lastRecurred) : undefined;
    }

    get intervalFormat(): string | JSX.Element {
        return getIntervalFormat(this);
    }

    // Need to send PATCH request after using this function to update recurring event properties
    produceOneOffEvents(): NoIdEvent[] {
        // Select starting date for generating recurring events
        let currentDate = !this.lastRecurred
            ? this.startDate
            : // starting currentDate should be the next interval of the last recurred(added) date to prevent overlap.
              incrementRecurringDate(this.lastRecurred, this.interval);

        const now = new Date();
        // Add recurring events up to 1 year forward if the endDate is later than one year.
        const afterOneYear = addYears(now, 1);
        // upper limit
        const untilDate = min(afterOneYear, this.endDate);

        const oneOffEvents: NoIdEvent[] = [];
        while (currentDate.getTime() <= untilDate.getTime()) {
            const event: NoIdEvent = {
                dateTime: currentDate, // incrementing currentDate to adjust the dateTime for each one-off event
                recurringId: this.id,
                name: this.name,
                description: this.description,
                duration: this.duration,
                importance: this.importance,
                meetingLink: this.meetingLink,
                location: this.location,
                participants: this.participants,
                userId: this.userId,
                status: this.status,
            };
            oneOffEvents.push(event);

            // increemnt curentDate
            currentDate = incrementRecurringDate(currentDate, this.interval);
        }

        // Update the lastRecurred property (which then should be patched to the DB)
        this.lastRecurred = decrementRecurringDate(currentDate, this.interval); // last added date
        return oneOffEvents;
    }
}

// For PATCH request
// Recurring event properties that can be edited
export interface RecurringEventProps {
    name?: string;
    dateTime?: Date; // Date is required for the calendar to display this event
    status?: Status; // Event can be opened, cancelled, as well as completed, so Status enum would be relevant
    description?: string;
    duration?: number;

    // meeting links and location are unique attributes to Event only.
    meetingLink?: string;
    location?: string;
    participants?: Participant[]; // list of emails of participants
    importance?: Importance;

    startDate?: Date;
    endDate?: Date;
    interval?: RecurringInterval;
    lastRecurred?: Date;
}
