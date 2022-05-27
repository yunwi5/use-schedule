import { AbstractTask } from '../task-models/AbstractTask';
import { Task } from '../task-models/Task';
import { PlannerMode } from '../planner-models/PlannerMode';
import {
    getEndDateTimeFormat,
    getISOTimeFormat,
    getLongUserTimeFormat,
} from '../../utilities/date-utils/date-format';
import { addMinutes } from '../../utilities/date-utils/date-control';
import { getDayName } from '../../utilities/date-utils/date-get';

export class TemplateTask extends AbstractTask {
    templateId: string;

    constructor(taskObj: Task, templateId: string) {
        super({ ...taskObj, plannerType: PlannerMode.TEMPLATE });
        this.templateId = templateId;
    }

    get durationFormat(): string {
        if (!this.duration) return getLongUserTimeFormat(this.dateTime);

        let endTime: null | Date = null;
        if (this.duration) endTime = addMinutes(this.dateTime, this.duration);

        const startTimeFormat = getISOTimeFormat(this.dateTime);
        const endTimeFormat = endTime && getISOTimeFormat(endTime);
        const planDateFormat = endTimeFormat
            ? `${startTimeFormat} ~ ${endTimeFormat}`
            : startTimeFormat;

        const durationFormat = `${planDateFormat}`;
        return durationFormat;
    }

    get planDateFormat(): string {
        if (this.isAnyDateTime) return 'Any Time';
        return `${this.weekDay} ${getLongUserTimeFormat(this.dateTime)}`;
    }

    get dueDateFormat(): string {
        if (!this.dueDate) return '';
        return `${this.dueDateWeekDay} ${getLongUserTimeFormat(this.dueDate)}`;
    }

    get endTimeFormat(): string {
        if (!this.duration) return '';
        const endTime = addMinutes(this.dateTime, this.duration);
        return `${getDayName(endTime.getDay())} ${getLongUserTimeFormat(endTime)}`;
    }
}
