import { UserProfile } from '@auth0/nextjs-auth0';
import { IEvent, Participant } from '../../models/Event';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import { addMinutes } from '../date-utils/date-control';

const VCAL_BEGINNING =
    'BEGIN:VCALENDAR\n' +
    'CALSCALE:GREGORIAN\n' +
    'METHOD:PUBLISH\n' +
    'PRODID:-//Task Manager Calendar//EN\n' +
    'VERSION:2.0\n';

const VCAL_AUCKLAND_BEGINNING =
    'BEGIN:VCALENDAR\n' +
    'VERSION:2.0\n' +
    'PRODID:-//The University of Auckland//UoACal 2.0//EN\n' +
    'METHOD:PUBLISH\n' +
    'X-WR-CALNAME:UoA Timetable\n' +
    'X-WR-CALDESC:UoA Timetable obtained from uoacal.auckland.ac.nz\n' +
    'X-WR-TIMEZONE:Pacific/Auckland\n' +
    'X-PUBLISHED-TTL:PT12H\n' +
    'BEGIN:VTIMEZONE\n' +
    'TZID:Pacific/Auckland\n' +
    'X-LIC-LOCATION:Pacific/Auckland\n' +
    'BEGIN:STANDARD\n' +
    'DTSTART:20230402T030000\n' +
    'TZOFFSETFROM:+1300\n' +
    'TZOFFSETTO:+1200\n' +
    'TZNAME:NZST\n' +
    'END:STANDARD\n' +
    'BEGIN:DAYLIGHT\n' +
    'DTSTART:20220925T020000\n' +
    'TZOFFSETFROM:+1200\n' +
    'TZOFFSETTO:+1300\n' +
    'TZNAME:NZDT\n' +
    'END:DAYLIGHT\n' +
    'END:VTIMEZONE\n';

const VCAL_ENDING = 'END:VCALENDAR';

function getAttendeeFormat(attendee: Participant) {
    // ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=Adam Gibbons:mailto:adam@example.com
    return `ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${attendee.name}:mailto:${attendee.email}`;
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
    return `${datePart}T${timeStr}`;
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
    const icsFileFormat = `${VCAL_AUCKLAND_BEGINNING}${icsContent}${VCAL_ENDING}`;
    return icsFileFormat;
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
            'Z\n' +
            `DTSTART;${getTimeZoneString()}` +
            getICSDateTimeFormat(task.dateTime) +
            '\n' +
            `DTEND;${getTimeZoneString()}` +
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
            'Z\n' +
            `DTSTART;${getTimeZoneString()}` +
            getICSDateTimeFormat(event.dateTime) +
            '\n' +
            `DTEND;${getTimeZoneString()}` +
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
            organizerLine +
            attendeeLines +
            'END:VEVENT\n'
        );
    });
    return vCalendarEvents.join('');
}
