import { IEvent, NoIdEvent } from '../../models/Event';
import { NoIdTask } from '../../models/task-models/Task';
import { isInvalidDate } from '../date-utils/date-check';
import { addMonths, addWeeks, addYears } from '../date-utils/date-control';

export enum RRuleFrequency {
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY',
}

const RRuleFrequencyList = [RRuleFrequency.WEEKLY, RRuleFrequency.MONTHLY, RRuleFrequency.YEARLY];

function isValidRRule(rrule: string) {
    return (RRuleFrequencyList as string[]).includes(rrule.trim());
}

function generateRecurringDates(startDate: Date, untilDate: Date, freq: RRuleFrequency) {
    if (isInvalidDate(untilDate)) return [startDate];
    let current = startDate;
    const recurringDates = [];
    while (current.getTime() <= untilDate.getTime()) {
        recurringDates.push(current);
        if (freq === RRuleFrequency.WEEKLY) current = addWeeks(current, 1);
        else if (freq === RRuleFrequency.MONTHLY) current = addMonths(current, 1);
        else if (freq === RRuleFrequency.YEARLY) current = addYears(current, 1);
        else break;
    }
    return recurringDates;
}

function generateRecurringEvents(recurringDates: Date[], item: NoIdEvent): NoIdEvent[] {
    return recurringDates.map((date) => {
        return {
            ...item,
            dateTime: date,
        };
    });
}
function generateRecurringTasks(recurringDates: Date[], task: NoIdTask): NoIdTask[] {
    return recurringDates.map((date) => {
        return {
            ...task,
            timeString: date.toString(),
        };
    });
}

interface IRRuleArgs<T> {
    freq: string;
    startDate: Date;
    untilDate: Date;
    item: T;
}
// rrule frequency of the event from icalendar
// handle the rrule recurring events to produce replicated events across the ranges specified.
// FREQ=WEEKLY;UNTIL=20220412T110030Z;
export function getRRuleRecurringEvents(args: IRRuleArgs<NoIdEvent>): NoIdEvent[] {
    const { freq, startDate, untilDate, item: event } = args;
    if (isValidRRule(freq)) {
        const recurringDates = generateRecurringDates(startDate, untilDate, freq as RRuleFrequency);
        return generateRecurringEvents(recurringDates, event);
    } else {
        return [event];
    }
}

export function getRRuleRecurringTasks(args: IRRuleArgs<NoIdTask>): NoIdTask[] {
    const { freq, startDate, untilDate, item } = args;
    if (isValidRRule(freq)) {
        const recurringDates = generateRecurringDates(startDate, untilDate, freq as RRuleFrequency);
        return generateRecurringTasks(recurringDates, item);
    } else {
        return [item];
    }
}
