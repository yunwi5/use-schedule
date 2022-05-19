import { FormTaskObject, Task } from '../../models/task-models/Task';
import { Status } from '../../models/task-models/Status';
import { addDays, addMinutes } from '../date-utils/date-control';
import { getDayOffset, getWeekEnding } from '../date-utils/date-get';
import { getDateTimeFormat, getISODateFormat, getISOTimeFormat } from '../date-utils/date-format';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { WeekDay } from '../../models/date-models/WeekDay';

export interface FormValues {
    name: string;
    description: string;
    importance: string;
    category: string;
    subCategory: string;
    date: string;
    time: string;
    dueDate: string;
    dueTime: string;

    durationDays: number;
    durationHours: number;
    durationMinutes: number;

    // Yearly planner for monthDateOnly
    month: string;
    monthDay: number;

    // Template planner weekday inputs
    day: string;
    dueDay: string;

    // Calendar planner mode choice
    plannerType: string;
}

const DAY_IN_MINS = 60 * 24;

export function userHasInputs(watch: () => any) {
    if (
        watch().name ||
        watch().description ||
        watch().durationDays ||
        watch().durationHours ||
        watch().durationMinutes
    )
        return true;
    return false;
}

export function getDuration(watch: () => FormValues) {
    const currentDuration =
        (watch().durationDays || 0) * (60 * 24) +
        watch().durationHours * 60 +
        watch().durationMinutes;
    return currentDuration;
}

export function getInitialDurationInput(initialTask: Task | undefined) {
    if (!initialTask || !initialTask.duration)
        return { defaultHours: 0, defaultMinutes: 0, defaultDays: 0 };
    const dur = initialTask.duration;
    const defaultDays = Math.floor(dur / DAY_IN_MINS);
    const dayRemaining = dur % DAY_IN_MINS;

    const defaultHours = Math.floor(dayRemaining / 60);
    const defaultMinutes = dayRemaining % 60;
    return { defaultDays, defaultHours, defaultMinutes };
}

export function getInitialDateTimeInput(initialTask: Task | undefined, beginningPeriod: Date) {
    let defaultDateTime = beginningPeriod;
    if (initialTask && initialTask.timeString) {
        defaultDateTime = new Date(initialTask.timeString);
    }
    // bug: somehow day is 1 day forward than it should be.
    defaultDateTime = addDays(defaultDateTime, -1);
    const defaultDate = getISODateFormat(defaultDateTime);
    const defaultTime = getISOTimeFormat(defaultDateTime);
    return { defaultDate, defaultTime };
}

export function getInitialEndtimeInput(beginningPeriod: Date) {
    let weekEnding = getWeekEnding(beginningPeriod);
    // bug: somehow day is 1 day forward than it should be.
    weekEnding = addDays(weekEnding, -1);
    const defaultEndDate = getISODateFormat(weekEnding);
    const defaultEndTime = getISOTimeFormat(weekEnding);
    return { defaultEndDate, defaultEndTime };
}

// Formatting planTime + duration as string just to display to the user.
export function getEndTimeFormatted(watch: () => FormValues): string | null {
    const currentInputDate = watch().date;
    const currentInputTime = watch().time;
    if (!currentInputDate || !currentInputTime) return null;

    const currentDate = new Date(`${currentInputDate} ${currentInputTime}`);
    const currentDuration = getDuration(watch);
    const estimatedEndTime = addMinutes(currentDate, currentDuration);
    const endTimeFormatted = getDateTimeFormat(estimatedEndTime);

    return endTimeFormatted;
}

export function getFormTaskObject(
    data: FormValues,
    beginningPeriod: Date,
    isTemplateTask: boolean,
    monthDateOnly?: boolean,
): FormTaskObject {
    const {
        name,
        description,
        importance,
        category,
        subCategory,
        date,
        time,
        dueDate,
        dueTime,
        durationDays = 0,
        durationHours = 0,
        durationMinutes = 0,
        month, // optional (yearly task)
        monthDay, // optional (yearly task)
        day,
        dueDay,
        plannerType: formPlannerType,
    } = data;

    const duration = durationDays * (24 * 60) + durationHours * 60 + durationMinutes;
    let timeString, dueDateString;

    if (!isTemplateTask) {
        // Not template task obj
        timeString = new Date(
            `${date || beginningPeriod.toDateString()} ${
                time || getISOTimeFormat(beginningPeriod)
            }`,
        ).toString();

        // If only exists
        if (monthDateOnly && month && monthDay) {
            timeString = new Date(
                `${beginningPeriod.getFullYear()} ${month} ${monthDay}`,
            ).toString();
        }

        dueDateString =
            dueDate && dueTime ? new Date(`${dueDate} ${dueTime}`).toString() : undefined;
    } else {
        // Is template task obj
        const planDayOffset = day ? getDayOffset(day as WeekDay) : undefined;
        const planDateString: string = addDays(beginningPeriod, planDayOffset || 0).toDateString();
        timeString = new Date(
            `${planDateString} ${time || getISOTimeFormat(beginningPeriod)}`,
        ).toString();

        const dueDayOffset = dueDay ? getDayOffset(dueDay as WeekDay) : undefined;
        const dueDateStr: string = addDays(beginningPeriod, dueDayOffset).toDateString();
        dueDateString = dueDayOffset
            ? new Date(`${dueDateStr} ${dueTime || getISOTimeFormat(beginningPeriod)}`).toString()
            : undefined;
    }

    // If the user specified planner type for this task (optional select)
    const initialPlannerType = formPlannerType ? (formPlannerType as PlannerMode) : undefined;

    const newTask: FormTaskObject = {
        name,
        description,
        importance,
        category,
        subCategory,
        timeString,
        dueDateString,
        duration,
        status: Status.OPEN,
        plannerType: initialPlannerType,
    };
    return newTask;
}
