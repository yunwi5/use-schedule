import { Importance, Status } from "./task-models/Status";

export interface NoIdEvent {
    id?: string;
    name: string;
    dateTime: Date; // Date is required for the calendar to display this event
    status: Status; // Event can be opened, cancelled, as well as completed, so Status enum would be relevant
    description: string;
    duration: number;

    // meeting links and location are unique attributes to Event only.
    meetingLink?: string;
    location?: string;
    participants?: string[]; // list of emails of participants

    importance?: Importance;
    userId: string;
}

export interface Event extends NoIdEvent {
    id: string;
}
