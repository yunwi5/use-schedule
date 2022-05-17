import ICalParser, { Attendee, DateTimeObject, EventJSON } from 'ical-js-parser';
import { IEvent, NoIdEvent, Participant } from '../../models/Event';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { Category } from '../../models/task-models/Category';
import { Importance, Status } from '../../models/task-models/Status';
import { NoIdTask, Task } from '../../models/task-models/Task';
import { getTimeDifferenceInMinutes } from '../date-utils/date-get';

// Parse from JSON to iCal string
// const resultString = ICalParser.toString(someJSONevent);

/*
Example parsed event object:
Object {​
    begin: "VEVENT"
    description: "Computer Graphics & Image Proc"
    dtend: Object { value: "20220301T120000", timezone: "Pacific/Auckland" }
    dtstamp: Object { value: "20220515T162500Z" }
    dtstart: Object { value: "20220301T110000", timezone: "Pacific/Auckland" }
    location: "109-B28"
    rrule: "FREQ=WEEKLY;UNTIL=20220412T120030Z"
    summary: "COMPSCI 373"
    uid: "20220516T042518NZST-3238FMmP70@uoacal.auckland.ac.nz"
    organizer: {
        EMAIL: "buia@test.com",
        mailto: "buia@test.com"
    },
    attendee: [
        {
            PARTSTAT: "ACCEPTED",
            CUTYPE: "INDIVIDUAL",
            ROLE: "REQ-PARTICIPANT",
            EMAIL: "bata123@test2.org",
            mailto: "bata123@test2.org"
        }
    ],
    end: "VEVENT"
}
*/

export function parseIcal(iCalString: string): { error?: string; events: EventJSON[] } {
    // Parse from iCal string to JSON
    const resultJSON = ICalParser.toJSON(iCalString);
    console.log('parsed JSON:', resultJSON);
    const todos = resultJSON.todos; // not handled at the moment.
    const events = resultJSON.events;

    // errors are retrieved as an array
    if (resultJSON.errors.length > 0) {
        const error = resultJSON.errors.join('\n');
        return { error, events: [] };
    }
    return { events: events };
}

export function convertToAppAttendees(attendees: Attendee[] | undefined): Participant[] {
    if (!attendees) return [];
    return attendees.map((att, idx) => ({
        name: att.CN || att.EMAIL || `Attendee ${idx + 1}`,
        email: att.EMAIL || att.mailto,
    }));
}

export function convertToDate(dateObj: DateTimeObject): Date {
    const dateStr = dateObj.value;
    // format: "20210401T103000Z"
    const [datePart, timePart] = dateStr.split('T');
    const year = parseInt(datePart.substring(0, 4));
    // JS date is 0 indexed, while Ical date is 1 indexed.
    const month = parseInt(datePart.substring(4, 6)) - 1;
    const day = parseInt(datePart.substring(6, 8));

    const hour = parseInt(timePart.substring(0, 2));
    const minute = parseInt(timePart.substring(2, 4));
    const second = parseInt(timePart.substring(4, 6));

    const resultDate = new Date(year, month, day);
    resultDate.setHours(hour);
    resultDate.setMinutes(minute);
    resultDate.setSeconds(second);
    return resultDate;
}

// Need to update for recurring event!
export function convertToAppEvent(eventJSON: EventJSON, userId: string): NoIdEvent {
    let name = eventJSON.summary || 'Event',
        description = eventJSON.description || '',
        dateTime = convertToDate(eventJSON.dtstart),
        meetingLink = '',
        location = eventJSON.location,
        participants = convertToAppAttendees(eventJSON.attendee);

    const endTime: Date = convertToDate(eventJSON.dtend);
    const duration = Math.abs(getTimeDifferenceInMinutes(endTime, dateTime));
    console.log('duration:', duration);
    // status in this app, and the status in ICalendar are different. Cannot transfer.

    const newEvent: NoIdEvent = {
        name,
        description,
        meetingLink,
        location,
        dateTime,
        duration,
        participants,
        status: Status.OPEN, // by default
        importance: Importance.IMPORTANT, // by default
        userId,
    };
    return newEvent;
}

export function convertEventJSONArraytoAppEventArray(eventJSONArr: EventJSON[], userId: string) {
    return eventJSONArr.map((eventJSON) => convertToAppEvent(eventJSON, userId));
}

// Need to update for recurring task!
export function convertToAppTask(eventJSON: EventJSON, userId: string, category: Category) {
    let name = eventJSON.summary || 'Event',
        description = eventJSON.description || '',
        dateTime = convertToDate(eventJSON.dtstart);

    const endTime: Date = convertToDate(eventJSON.dtend);
    const duration = Math.abs(getTimeDifferenceInMinutes(endTime, dateTime));

    const newTask: NoIdTask = {
        name,
        description,
        timeString: dateTime.toString(),
        duration,
        status: Status.OPEN,
        importance: Importance.IMPORTANT,
        category,
        plannerType: PlannerMode.WEEKLY, // by default
        subCategory: 'Others',
        userId,
    };
    return newTask;
}

export function convertEventJSONArraytoAppTaskArray(
    eventJSONArr: EventJSON[],
    userId: string,
    category: Category,
): NoIdTask[] {
    return eventJSONArr.map((eventJSON) => convertToAppTask(eventJSON, userId, category));
}
