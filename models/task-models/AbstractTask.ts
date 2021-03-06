import { addMinutes } from '../../utilities/date-utils/date-control';
import {
    getDateTimeFormat,
    getEndDateTimeFormat,
    getFullDateFormat,
    getLongUserTimeFormat,
} from '../../utilities/date-utils/date-format';
import { getDayName } from '../../utilities/date-utils/date-get';
import { WeekDay } from '../date-models/WeekDay';
import { PlannerMode } from '../planner-models/PlannerMode';
import { Category, SubCategory } from './Category';
import { Importance, Status } from './Status';
import { SubTask } from './SubTask';
import { Task } from './Task';

export abstract class AbstractTask implements Task {
    id: string;
    name: string;
    timeString: string;
    description: string;
    duration: number;
    category: Category;
    subCategory: SubCategory;
    status: Status;
    userId: string;
    importance: Importance;
    plannerType: PlannerMode;

    dueDateString?: string;
    isAnyDateTime?: boolean;
    comment?: string;
    subTasks?: SubTask[];

    constructor(taskObj: Task) {
        this.id = taskObj.id;
        this.name = taskObj.name;
        this.timeString = taskObj.timeString;
        this.description = taskObj.description;
        this.duration = taskObj.duration;
        this.category = taskObj.category;
        this.subCategory = taskObj.subCategory;
        this.status = taskObj.status as Status;
        this.userId = taskObj.userId;
        this.importance = taskObj.importance;
        this.dueDateString = taskObj.dueDateString;
        this.comment = taskObj.comment;
        this.isAnyDateTime = taskObj.isAnyDateTime;
        this.subTasks = taskObj.subTasks;
        this.plannerType = taskObj.plannerType;
    }

    abstract get durationFormat(): string;

    // both date & time
    // format: time + ' ' + date
    // ex) 13:30 13 Jun, 2022
    get planDateTimeFormat(): string {
        return getDateTimeFormat(this.dateTime);
    }

    // only date
    // ex 13 Jun, 2022
    get planDateFormat(): string {
        return getFullDateFormat(this.dateTime);
    }

    // only time
    // ex) 13:30
    get planTimeFormat(): string {
        return getLongUserTimeFormat(this.dateTime);
    }

    get dueDateFormat(): string {
        return this.dueDate ? getDateTimeFormat(this.dueDate) : '';
    }

    get endTimeFormat(): string {
        return getEndDateTimeFormat(this.dateTime, this.duration);
    }

    get dateTime() {
        return new Date(this.timeString);
    }

    // Need to validate if this is correct
    get day(): WeekDay {
        const date = new Date(this.timeString);
        return getDayName(date.getDay());
    }

    // This should be used instead of day
    get weekDay(): WeekDay {
        const date = new Date(this.timeString);
        return getDayName(date.getDay());
    }

    get hours() {
        const date = new Date(this.timeString);
        return date.getHours();
    }

    get minutes() {
        return new Date(this.timeString).getMinutes();
    }

    // plan dateTime + duration
    get endTime(): Date {
        const endTime = addMinutes(this.dateTime, this.duration);
        return endTime;
    }

    // Duedate
    get dueDate(): Date | null {
        if (this.dueDateString) return new Date(this.dueDateString);
        return null;
    }

    get dueDateWeekDay(): WeekDay {
        if (!this.dueDateString) return WeekDay.ANY;

        const due = new Date(this.dueDateString);
        return getDayName(due.getDay());
    }

    get dueDateHours(): number | null {
        if (!this.dueDate) return null;

        return this.dueDate.getHours();
    }

    get dueDateMinutes(): number | null {
        if (!this.dueDate) return null;

        return this.dueDate.getMinutes();
    }
}
