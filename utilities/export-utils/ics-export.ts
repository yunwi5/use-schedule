import { UserProfile } from '@auth0/nextjs-auth0';
import { IEvent, Participant } from '../../models/Event';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import { addMinutes } from '../date-utils/date-control';
import { VACL_GOOGLE_CALENDAR_BEGINNING, VCAL_ENDING } from './contstants';

/* Google Calendar attendee format
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=yj
 o827@aucklanduni.ac.nz;X-NUM-GUESTS=0:mailto:yjo827@aucklanduni.ac.nz
*/
function getAttendeeFormat(attendee: Participant) {
    return `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=${attendee.name};X-NUM-GUESTS=1:mailto:${attendee.email}`;
}

function getEventParticipantsFormat(participants: Participant[] | undefined) {
    return participants?.map((part) => `${getAttendeeFormat(part)}\n`).join('') || '';
}

// format derived from ISO format
export function getICSDateTimeFormat(date: Date) {
    // 2022-05-15T16:46:27.214Z
    const isoString = date.toISOString();
    const datePart = isoString.split('T')[0].split('-').join('');
    const timeStr = isoString.split('T')[1].split('.')[0].split(':').join('');
    return `${datePart}T${timeStr}Z`;
}

function getCategoryFormat(task: AbstractTask): string {
    const categoryFormat = `CATEGORIES:${task.category}${
        task.subCategory ? ',' + task.subCategory : ''
    }`;
    return categoryFormat;
}

function getDescriptionFormat(desc: string): string {
    // line length should not exceed 75 characters (warning)
    return desc.trim();
}

function getTimeZoneString() {
    // This will need to be fixed.
    return 'TZID=Pacific/Auckland:';
}

export function createIcsFile(
    events: IEvent[] | null,
    tasks: AbstractTask[] | null,
    user: UserProfile | undefined,
): string {
    let icsContent = '';
    if (tasks) {
        const icsTaskContent = createIcsTasks(tasks, user);
        icsContent += icsTaskContent;
    }
    if (events) {
        const icsEventContent = createIcsEvents(events, user);
        icsContent += icsEventContent;
    }
    const icsFileFormat = `${VACL_GOOGLE_CALENDAR_BEGINNING}${icsContent}${VCAL_ENDING}`;
    return icsFileFormat;
}

export function createIcsEvents(events: IEvent[], user: UserProfile | undefined) {
    const organizerLine: string = user?.email ? `ORGANIZER;CN=User:mailto:${user.email}\n` : '';
    // ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=Adam Gibbons:mailto:adam@example.com
    // ATTENDEE;RSVP=FALSE;ROLE=OPT-PARTICIPANT;DIR=https://linkedin.com/in/brittanyseaton;CN=Brittany
    //   Seaton:mailto:brittany@example2.org

    const vCalendarEvents: string[] = events.map((event) => {
        const attendeeLines = getEventParticipantsFormat(event.participants);

        return (
            'BEGIN:VEVENT\n' +
            'UID:' +
            event.id +
            '\n' +
            'DTSTAMP:' +
            getICSDateTimeFormat(new Date()) +
            '\n' +
            `DTSTART:` +
            getICSDateTimeFormat(event.dateTime) +
            '\n' +
            `DTEND:` +
            getICSDateTimeFormat(addMinutes(event.dateTime, event.duration)) +
            '\n' +
            'LOCATION:' +
            (event.location || 'place') +
            '\n' +
            'SUMMARY:' +
            event.name +
            '\n' +
            'DESCRIPTION:' +
            getDescriptionFormat(event.description) +
            '\n' +
            'STATUS:CONFIRMED' +
            '\n' +
            organizerLine +
            attendeeLines +
            'END:VEVENT\n'
        );
    });
    return vCalendarEvents.join('');
}

export function createIcsTasks(tasks: AbstractTask[], user: UserProfile | undefined) {
    const organizerLine: string = user?.email ? `ORGANIZER;CN=User:mailto:${user.email}\n` : '';
    // ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=Adam Gibbons:mailto:adam@example.com
    // ATTENDEE;RSVP=FALSE;ROLE=OPT-PARTICIPANT;DIR=https://linkedin.com/in/brittanyseaton;CN=Brittany
    //   Seaton:mailto:brittany@example2.org

    const vCalendarEvents: string[] = tasks.map((task) => {
        const taskCategory = getCategoryFormat(task);

        return (
            'BEGIN:VEVENT\n' +
            'UID:' +
            task.id +
            '\n' +
            'DTSTAMP:' +
            getICSDateTimeFormat(new Date()) +
            '\n' +
            `DTSTART:` +
            getICSDateTimeFormat(task.dateTime) +
            '\n' +
            `DTEND:` +
            getICSDateTimeFormat(addMinutes(task.dateTime, task.duration)) +
            '\n' +
            'SUMMARY:' +
            task.name +
            '\n' +
            'DESCRIPTION:' +
            getDescriptionFormat(task.description) +
            '\n' +
            taskCategory +
            '\n' +
            organizerLine +
            'END:VEVENT\n'
        );
    });
    return vCalendarEvents.join('');
}
