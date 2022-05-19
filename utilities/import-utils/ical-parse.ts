import ICalParser, { Attendee, DateTimeObject, EventJSON } from 'ical-js-parser';
import { Participant } from '../../models/Event';

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
    const todos = resultJSON.todos; // not handled at the moment.
    const events = resultJSON.events;

    // errors are retrieved as an array
    if (resultJSON.errors.length > 0) {
        const error = resultJSON.errors.join('\n');
        return { error, events: [] };
    }
    return { events: events };
}

export function parseIcalAttendees(attendees: Attendee[] | undefined): Participant[] {
    if (!attendees) return [];
    return attendees.map((att, idx) => ({
        name: att.CN || att.EMAIL || `Attendee ${idx + 1}`,
        email: att.EMAIL || att.mailto,
    }));
}

export function parseIcalDate(dateObj: DateTimeObject | string): Date {
    let dateStr = typeof dateObj === 'string' ? dateObj : dateObj.value;

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

const ICALDATE_LENGTH = 15;
export function parseRRule({ rrule }: EventJSON) {
    // need to handle every format
    // rrule format1: FREQ=WEEKLY;UNTIL=20210401T103000Z
    // rrule format2: FREQ=WEEKLY;WKST=SU;COUNT=13;INTERVAL=1;BYDAY=FR
    if (rrule) {
        let freqIndex = rrule.indexOf('FREQ=');
        let startIndex = freqIndex + 5;
        let endIndex = rrule.indexOf(';', freqIndex);
        let freqPart = rrule.substring(startIndex, endIndex);

        if (rrule.includes('UNTIL=')) {
            let untilIndex = rrule.indexOf('UNTIL=');
            let startIndex = untilIndex + 6;
            const untilStr = rrule.substring(startIndex, startIndex + ICALDATE_LENGTH);
            const untilDate = parseIcalDate(untilStr);
            return { freq: freqPart, untilDate };
        } else if (rrule.includes('COUNT=')) {
            let countIndex = rrule.indexOf('COUNT=');
            let startIndex = countIndex + 6;
            let endIndex = rrule.indexOf(';', countIndex);
            let count = +rrule.substring(startIndex, endIndex);
            return { freq: freqPart, count };
        }
        return null;
    }
    return null;
}
