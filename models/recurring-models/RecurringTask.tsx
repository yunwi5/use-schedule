import { RecurringInterval } from '.';
import { addYears } from '../../utilities/date-utils/date-control';
import { getShortUserTimeFormat } from '../../utilities/date-utils/date-format';
import { min } from '../../utilities/date-utils/date-math';
import {
    decrementRecurringDate,
    getIntervalFormat,
    getPlannerType,
    incrementRecurringDate,
} from '../../utilities/recurring-utils';
import { PlannerMode } from '../planner-models/PlannerMode';
import { Category, SubCategory } from '../task-models/Category';
import { Importance, Status } from '../task-models/Status';
import { AbstractTask } from '../task-models/AbstractTask';
import { NoIdTask } from '../task-models/Task';

export interface NoIdRecurringTask extends NoIdTask {
    id?: string;
    name: string;
    timeString: string;
    description: string;
    duration: number;
    category: Category;
    subCategory: SubCategory;
    status: Status; // Always open
    importance: Importance;
    plannerType: PlannerMode;

    dueDateString?: string;

    userId: string;

    // dateTime: Date; // Date is required for the calendar to display this task
    startDate: Date;
    endDate: Date;
    interval: RecurringInterval;
    lastRecurred?: Date;
}

export class RecurringTask extends AbstractTask {
    status: Status = Status.OPEN; // Event can be opened, cancelled, as well as completed, so Status enum would be relevant

    startDate: Date;
    endDate: Date;
    interval: RecurringInterval;
    lastRecurred?: Date;

    constructor(task: NoIdRecurringTask, id: string) {
        super({ ...task, id, plannerType: getPlannerType(task.interval) });

        // Unique properties only exist in recurring items
        this.startDate = new Date(task.startDate); // can be string type accidently
        this.endDate = new Date(task.endDate);
        this.interval = task.interval;
        this.lastRecurred = task.lastRecurred ? new Date(task.lastRecurred) : undefined;
    }

    get durationFormat(): string {
        let endTime: Date = this.endTime;

        const startTimeFormat = getShortUserTimeFormat(this.dateTime);
        const endTimeFormat = endTime && getShortUserTimeFormat(endTime);
        // ex) 12:15pm ~ 3:35pm
        const timeFormat = endTimeFormat
            ? `${startTimeFormat} ~ ${endTimeFormat}`
            : startTimeFormat;
        return `Every ${timeFormat}`;
    }

    get intervalFormat(): string | JSX.Element {
        return getIntervalFormat(this);
    }

    // Need to send PATCH request after using this function to update recurring task properties
    produceOneOffTasks(): NoIdTask[] {
        // Select starting date for generating recurring events
        let currentDate = !this.lastRecurred
            ? this.startDate
            : // starting currentDate should be the next interval of the last recurred(added) date to prevent overlap.
              incrementRecurringDate(this.lastRecurred, this.interval);

        const now = new Date();
        // Add recurring events up to 1 year forward if the endDate is later than one year.
        const afterOneYear = addYears(now, 1);
        // upper limit
        const untilDate = min(afterOneYear, this.endDate);

        const oneOffEvents: NoIdTask[] = [];
        while (currentDate.getTime() <= untilDate.getTime()) {
            const task: NoIdTask = {
                name: this.name,
                timeString: currentDate.toString(), // incrementing currentDate to adjust the dateTime for each one-off task
                description: this.description,
                duration: this.duration,
                category: this.category,
                subCategory: this.subCategory,
                status: this.status,
                importance: this.importance,
                plannerType: this.plannerType,
                recurringId: this.id,
                userId: this.userId,
            };
            oneOffEvents.push(task);

            // increemnt curentDate
            currentDate = incrementRecurringDate(currentDate, this.interval);
        }

        // Update the lastRecurred property (which then should be patched to the DB)
        this.lastRecurred = decrementRecurringDate(currentDate, this.interval); // last added date
        return oneOffEvents;
    }
}

// For PATCH request
// Recurring task properties that can be edited
export interface RecurringTaskProps {
    name?: string;
    dateTime?: Date; // Date is required for the calendar to display this task
    status?: Status; // Event can be opened, cancelled, as well as completed, so Status enum would be relevant
    description?: string;
    duration?: number;

    category?: Category;
    subCategory?: SubCategory;
    importance?: Importance;

    startDate?: Date;
    endDate?: Date;
    interval?: RecurringInterval;
    lastRecurred?: Date;
}
