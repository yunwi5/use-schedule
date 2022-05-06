import { validateEvent } from "../schemas/validation";
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
    participants?: Participant[]; // list of emails of participants

    importance?: Importance;
    userId: string;
}

export interface Event extends NoIdEvent {
    id: string;
}

// For PATCH request
export interface EventProps {
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
}

export interface Participant {
    name: string;
    email: string;
}

// Bette way is to validate using validation libraries like Joi or Yup
export function isInstanceOfEvent(event: any) {
    const hasId = "id" in event;
    const hasName = "name" in event;
    const hasStatus = "status" in event;
    const hasDateTime = "dateTime" in event;
    const hasDesc = "description" in event;
    const hasDur = "duration" in event;
    const notHavePlannerType = !("plannerType" in event);

    return hasId && hasName && hasStatus && hasDateTime && hasDesc && hasDur && notHavePlannerType;
}

// export function isInstanceOfEvent(event: any) {
//     const { isValid, message } = validateEvent(event);
//     const isValid0 = isInstanceOfEventV0(event);
//     if (isValid !== isValid0) {
//         console.warn(message);
//     }

//     return isValid;
// }
