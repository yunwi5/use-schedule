import { AbstractTask } from '../task-models/AbstractTask';
import { Task } from '../task-models/Task';
import { PlannerMode } from '../planner-models/PlannerMode';
import {
	getEndDateTimeFormat,
	getISOTimeFormat,
	getUserTimeFormat,
} from '../../utilities/time-utils/date-format';
import { addMinutes } from '../../utilities/time-utils/date-control';
import { getDayName } from '../../utilities/time-utils/date-get';

export class TemplateTask extends AbstractTask {
	templateId: string;

	constructor (taskObj: Task, templateId: string) {
		super({ ...taskObj, plannerType: PlannerMode.TEMPLATE });
		this.templateId = templateId;
	}

	get durationFormat (): string {
		if (!this.duration) return getUserTimeFormat(this.dateTime);

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

	get planDateFormat (): string {
		if (this.isAnyDateTime) return 'Any Time';
		return `${this.weekDay} ${getUserTimeFormat(this.dateTime)}`;
	}

	get dueDateFormat (): string {
		if (!this.dueDate) return '';
		return `${this.dueDateWeekDay} ${getUserTimeFormat(this.dueDate)}`;
	}

	get endTimeFormat (): string {
		if (!this.duration) return '';
		const endTime = addMinutes(this.dateTime, this.duration);
		return `${getDayName(endTime.getDay())} ${getUserTimeFormat(endTime)}`;
	}
}
