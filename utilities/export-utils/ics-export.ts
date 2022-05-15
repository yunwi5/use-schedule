import { IEvent, Participant } from '../../models/Event';

export function createIcsFile() {}

function getDurationFormat(durationMinutes: number) {
    // PT6H30M
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `PT${hours}H${minutes}M`;
}

function getAttendeeFormat(attendee: Participant) {
    // ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=Adam Gibbons:mailto:adam@example.com
    return `ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;CN=${attendee.name}:mailto:${attendee.email}`;
}

function eventParticipantsFormat(participants: Participant[] | undefined) {
    const length = participants?.length || 0;
    return (
        participants
            ?.map((part, idx) => `${getAttendeeFormat(part)}${idx === length - 1 ? '' : '\n'}`)
            .join('') || ''
    );
}

export function createIcsEvents(events: IEvent[]) {
    const event: any = {
        start: [2018, 5, 30, 6, 30],
        duration: { hours: 6, minutes: 30 },
        title: 'Bolder Boulder',
        description: 'Annual 10-kilometer run in Boulder, Colorado',
        location: 'Folsom Field, University of Colorado (finish line)',
        url: 'http://www.bolderboulder.com/',
        geo: { lat: 40.0095, lon: 105.2669 },
        categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
        attendees: [
            {
                name: 'Adam Gibbons',
                email: 'adam@example.com',
                rsvp: true,
                partstat: 'ACCEPTED',
                role: 'REQ-PARTICIPANT',
            },
            {
                name: 'Brittany Seaton',
                email: 'brittany@example2.org',
                dir: 'https://linkedin.com/in/brittanyseaton',
                role: 'OPT-PARTICIPANT',
            },
        ],
    };

    const vCalendarBeginning = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:adamgibbons/ics
METHOD:PUBLISH
X-PUBLISHED-TTL:PT1H`;

    const vCalendarEnding = `\nEND:VCALENDAR`;

    // BEGIN:VCALENDAR
    // VERSION:2.0
    // CALSCALE:GREGORIAN
    // PRODID:adamgibbons/ics
    // METHOD:PUBLISH
    // X-PUBLISHED-TTL:PT1H

    const vCalendarEvents: string[] = events.map((event) => {
        return `
BEGIN:VEVENT
UID:${event.id}
SUMMARY:${event.name}
DTSTAMP:20181017T204900Z
DTSTART:20180530T043000Z
DESCRIPTION:${event.description}
LOCATION:${event.location ?? ''}
STATUS:CONFIRMED${eventParticipantsFormat(event.participants)}
DURATION:${getDurationFormat(event.duration)}
END:VEVENT`;
    });

    const vCalendarFormat = `${vCalendarBeginning}${vCalendarEvents.join('')}${vCalendarEnding}`;

    // const data = new File([vCalendarFormat], 'event.ics');

    return vCalendarFormat;

    // BEGIN:VEVENT
    // UID:d9e5e080-d25e-11e8-806a-e73a41d3e47b
    // SUMMARY:Bolder Boulder
    // DTSTAMP:20181017T204900Z
    // DTSTART:20180530T043000Z
    // DESCRIPTION:Annual 10-kilometer run in Boulder\, Colorado
    // X-MICROSOFT-CDO-BUSYSTATUS:BUSY
    // URL:http://www.bolderboulder.com/
    // GEO:40.0095;105.2669
    // LOCATION:Folsom Field, University of Colorado (finish line)
    // STATUS:CONFIRMED
    // CATEGORIES:10k races,Memorial Day Weekend,Boulder CO
    // ORGANIZER;CN=Admin:mailto:Race@BolderBOULDER.com
    // ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=Adam Gibbons:mailto:adam@example.com
    // ATTENDEE;RSVP=FALSE;ROLE=OPT-PARTICIPANT;DIR=https://linkedin.com/in/brittanyseaton;CN=Brittany
    //   Seaton:mailto:brittany@example2.org
    // DURATION:PT6H30M
    // END:VEVENT
    // END:VCALENDAR
}
