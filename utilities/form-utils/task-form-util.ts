import { FormTaskObject, Task } from '../../models/task-models/Task';
import { Importance, Status } from '../../models/task-models/Status';
import { addDays, addMinutes } from '../date-utils/date-control';
import { getDayOffset, getWeekEnding } from '../date-utils/date-get';
import {
    getDateTimeFormat,
    getISODateFormat,
    getISOTimeFormat,
    getParsedDate,
} from '../date-utils/date-format';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { WeekDay } from '../../models/date-models/WeekDay';
import { Category, SubCategory } from '../../models/task-models/Category';

export interface FormValues {
    name: string;
    description: string;
    importance: string;
    category: string;
    subCategory: string;
    date: string;
    time: string;

    durationDays: number;
    durationHours: number;
    durationMinutes: number;

    // Yearly planner for monthDateOnly
    month: string;
    monthDay: number;

    // Template planner weekday inputs
    day: string;

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
    // bug: somehow day is 1 day forward than it should be when the month is May or forwards.
    // month index 4 => May, month index 8 => September
    if (beginningPeriod.getMonth() >= 4 && beginningPeriod.getMonth() <= 8)
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

    const currentDate = getParsedDate(`${currentInputDate} ${currentInputTime}`);
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
        durationDays = 0,
        durationHours = 0,
        durationMinutes = 0,
        month, // optional (yearly task)
        monthDay, // optional (yearly task)
        day,
        plannerType: formPlannerType,
    } = data;

    const duration = durationDays * (24 * 60) + durationHours * 60 + durationMinutes;
    let timeString;

    if (!isTemplateTask) {
        // Not template task obj
        timeString = getParsedDate(
            `${date || beginningPeriod.toDateString()} ${
                time || getISOTimeFormat(beginningPeriod)
            }`,
        ).toString();

        // If only exists
        if (monthDateOnly && month && monthDay) {
            timeString = getParsedDate(
                `${beginningPeriod.getFullYear()} ${month} ${monthDay}`,
            ).toString();
        }
    } else {
        // Is template task obj
        const planDayOffset = day ? getDayOffset(day as WeekDay) : undefined;
        const planDateString: string = addDays(
            beginningPeriod,
            planDayOffset || 0,
        ).toDateString();
        timeString = getParsedDate(
            `${planDateString} ${time || getISOTimeFormat(beginningPeriod)}`,
        ).toString();
    }

    // If the user specified planner type for this task (optional select)
    const initialPlannerType = formPlannerType ? (formPlannerType as PlannerMode) : undefined;

    const newTask: FormTaskObject = {
        name,
        description,
        importance: importance as Importance,
        category: category as Category,
        subCategory: subCategory as SubCategory,
        timeString,
        duration,
        status: Status.OPEN,
        plannerType: initialPlannerType,
    };
    return newTask;
}
