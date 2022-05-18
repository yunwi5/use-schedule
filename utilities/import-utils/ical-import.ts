import ICalParser, { Attendee, DateTimeObject, EventJSON } from 'ical-js-parser';
import { IEvent, NoIdEvent, Participant } from '../../models/Event';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { Category } from '../../models/task-models/Category';
import { Importance, Status } from '../../models/task-models/Status';
import { NoIdTask, Task } from '../../models/task-models/Task';
import { addWeeks } from '../date-utils/date-control';
import { getTimeDifferenceInMinutes } from '../date-utils/date-get';
import { getRRuleRecurringEvents, getRRuleRecurringTasks } from './ical-event-frequency';
import { parseIcalAttendees, parseIcalDate, parseRRule } from './ical-parse';

function generateDatesFromInterval(startDate: Date, count: number) {
    return addWeeks(startDate, count);
}

// Need to update for recurring event!
export function convertToAppEvents(eventJSON: EventJSON, userId: string): NoIdEvent[] {
    let name = eventJSON.summary || 'Event',
        description = eventJSON.description || '',
        meetingLink = '',
        location = eventJSON.location,
        participants = parseIcalAttendees(eventJSON.attendee);

    const startDate = parseIcalDate(eventJSON.dtstart);
    // Careful: dtend can be null
    const endDate: Date = eventJSON.dtend ? parseIcalDate(eventJSON.dtend) : startDate;
    const duration = Math.abs(getTimeDifferenceInMinutes(endDate, startDate));
    // status in this app, and the status in ICalendar are different. Cannot transfer.

    const newEvent: NoIdEvent = {
        name,
        description,
        meetingLink,
        location,
        dateTime: startDate,
        duration,
        participants,
        status: Status.OPEN, // by default
        importance: Importance.IMPORTANT, // by default
        userId,
    };

    // Handle reccurring event
    const rrule = parseRRule(eventJSON);
    if (rrule) {
        // console.log(rrule);
        const { freq, untilDate: ud, count } = rrule;
        let untilDate: Date;
        if (!ud) {
            // console.log('count:', count);
            untilDate = generateDatesFromInterval(startDate, count || 1);
        } else untilDate = ud;

        // console.log('freq:', freq);
        const recurringEvents = getRRuleRecurringEvents({
            freq,
            startDate,
            untilDate,
            item: newEvent,
        });
        return recurringEvents;
    }
    // No recurring event, so just return an array of a single non-recurring event.
    return [newEvent];
}

// Need to update for recurring task!
export function convertToAppTasks(
    eventJSON: EventJSON,
    userId: string,
    category: Category,
): NoIdTask[] {
    let name = eventJSON.summary || 'Event',
        description = eventJSON.description || '';

    const startDate = parseIcalDate(eventJSON.dtstart);
    // Careful: dtend can be null
    const endDate: Date = eventJSON.dtend ? parseIcalDate(eventJSON.dtend) : startDate;
    const duration = Math.abs(getTimeDifferenceInMinutes(endDate, startDate));

    const newTask: NoIdTask = {
        name,
        description,
        timeString: startDate.toString(),
        duration,
        status: Status.OPEN,
        importance: Importance.IMPORTANT,
        category,
        plannerType: PlannerMode.WEEKLY, // by default
        subCategory: 'Others',
        userId,
    };

    //Handle reccurring task
    // const rrule = parseRRule(eventJSON);
    // if (rrule) {
    //     const { freq, untilDate: ud, count } = rrule;
    //     let untilDate: Date;
    //     if (!ud) {
    //         untilDate = generateIntervalDates(startDate, count || 1);
    //     } else untilDate = ud;

    //     const recurringEvents = getRRuleRecurringTasks({
    //         freq,
    //         startDate,
    //         untilDate,
    //         item: newTask,
    //     });
    //     // console.table(recurringEvents);
    //     return recurringEvents;
    // }
    // No recurring event, so just return an array of a single non-recurring task.
    return [newTask];
}

export function convertEventJSONArraytoAppEventArray(
    eventJSONArr: EventJSON[],
    userId: string,
): NoIdEvent[] {
    const resultArr: NoIdEvent[] = [];
    // const rruleCount = eventJSONArr.reduce((acc, curr) => (curr.rrule ? acc + 1 : acc), 0);
    // console.log('rrule count:', rruleCount);
    eventJSONArr.forEach((eventJSON) => {
        try {
            const appEvents = convertToAppEvents(eventJSON, userId);
            resultArr.push(...appEvents);
        } catch (err) {
            console.log('Error occured for event:', eventJSON);
            console.log(err);
        }
    });
    return resultArr;
}

export function convertEventJSONArraytoAppTaskArray(
    eventJSONArr: EventJSON[],
    userId: string,
    category: Category,
): NoIdTask[] {
    const result: NoIdTask[] = [];
    eventJSONArr.forEach((eventJSON) => {
        try {
            result.push(...convertToAppTasks(eventJSON, userId, category));
        } catch (err) {
            console.log('Error occured for event:', eventJSON);
            console.log(err);
        }
    });
    return result;
}
