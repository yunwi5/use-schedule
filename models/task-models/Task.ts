import { AbstractTask } from './AbstractTask';
import { SubTask } from './SubTask';
import { PlannerMode } from '../planner-models/PlannerMode';
import {
    getDateMonthFormat,
    getDateTimeFormat,
    getISOTimeFormat,
    getLongUserTimeFormat,
    getShortUserTimeFormat,
} from '../../utilities/date-utils/date-format';
import { addMinutes } from '../../utilities/date-utils/date-control';
import { validateTask } from '../../schemas/validation';
import { Category, SubCategory } from './Category';
import { Importance } from './Status';

export interface NoIdTask {
    id?: string;
    name: string;
    timeString: string;
    description: string;
    duration: number;
    category: Category;
    subCategory: SubCategory;
    status: string;
    userId: string;
    importance: Importance;
    plannerType: PlannerMode;

    dueDateString?: string;
    isAnyDateTime?: boolean;
    comment?: string;
    subTasks?: SubTask[];
    templateId?: string;
    recurringId?: string;
}

export interface Task extends NoIdTask {
    id: string;
}

export class PlannerTask extends AbstractTask {
    constructor(taskObj: Task) {
        super(taskObj);
    }

    get durationFormat(): string {
        if (this.duration == null) return getShortUserTimeFormat(this.dateTime);

        let endTime: null | Date = null;
        if (this.duration) endTime = addMinutes(this.dateTime, this.duration);

        const startTimeFormat = getShortUserTimeFormat(this.dateTime);
        const endTimeFormat = endTime && getShortUserTimeFormat(endTime);
        const planDateFormat = endTimeFormat
            ? `${startTimeFormat} ~ ${endTimeFormat}`
            : startTimeFormat;
        return planDateFormat;
    }

    get planDateFormat(): string {
        if (this.isAnyDateTime) return 'Any Time';
        else if (this.plannerType === PlannerMode.WEEKLY) {
            return getDateTimeFormat(this.dateTime);
        }
        return getDateMonthFormat(this.dateTime);
    }

    get dueDateFormat(): string {
        if (!this.dueDate) return '';
        if (this.plannerType === PlannerMode.WEEKLY) {
            return getDateTimeFormat(this.dueDate);
        }
        return getDateMonthFormat(this.dueDate);
    }
}

export type FormTaskObject = {
    name: string;
    timeString: string;
    description: string;
    category: Category;
    subCategory: SubCategory;
    status: string;
    importance: Importance;
    duration: number;
    plannerType?: PlannerMode;

    dueDateString?: string;
    isAnyDateTime?: boolean;
    templateId?: string;
};

// Old way of validating task. Deprecated.
export function isInstanceOfTaskV0(item: object): boolean {
    const hasId = 'id' in item;
    const hasName = 'name' in item;
    const hasDescription = 'description' in item;
    const hasDuration = 'duration' in item;
    const hasCategory = 'category' in item;
    const hasSubCategory = 'subCategory' in item;
    const hasStatus = 'status' in item;
    const hasUserId = 'userId' in item;
    const hasImportance = 'importance' in item;
    const hasPlannerType = 'plannerType' in item;
    return (
        hasId &&
        hasName &&
        hasDescription &&
        hasDuration &&
        hasCategory &&
        hasSubCategory &&
        hasStatus &&
        hasUserId &&
        hasImportance &&
        hasPlannerType
    );
}

export function isInstanceOfTask(item: object): boolean {
    const { isValid, message } = validateTask(item);
    const isValid0 = isInstanceOfTaskV0(item);

    // if (isValid === isValid0) {
    //     console.log("Task validation Same!");
    // }
    if (isValid !== isValid0) {
        console.log(message);
    }

    return isValid0;
}
