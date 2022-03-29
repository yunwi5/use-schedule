import { AbstractTask } from '../task-models/AbstractTask';
import { Task } from '../task-models/Task';
import { PlannerMode } from '../planner-models/PlannerMode';
import { getISOTimeFormat } from '../../utilities/time-utils/date-format';
import { addMinutes } from '../../utilities/time-utils/date-control';

export class TemplateTask extends AbstractTask {
	templateId: string;

	constructor (taskObj: Task, templateId: string) {
		super({ ...taskObj, plannerType: PlannerMode.TEMPLATE });
		this.templateId = templateId;
	}

	get durationFormat (): string {
		if (!this.duration) return '';

		let endTime: null | Date = null;
		if (this.duration) endTime = addMinutes(this.dateTime, this.duration);

		const startTimeFormat = getISOTimeFormat(this.dateTime);
		const endTimeFormat = endTime && getISOTimeFormat(endTime);
		const planDateFormat = endTimeFormat
			? `${startTimeFormat} ~ ${endTimeFormat}`
			: startTimeFormat;

		const durationFormat = `${this.weekDay.substring(0, 3)}  ${planDateFormat}`;
		return durationFormat;
	}

	get planDateFormat (): string {
		if (this.isAnyDateTime) return 'Any Time';

		let label = 'am';
		let planHour = this.hours;
		if (this.hours >= 12) {
			label = 'pm';
			planHour = planHour === 12 ? 12 : planHour - 12;
		}

		return `${this.weekDay} ${planHour}:${this.minutes}${label}`;
	}

	get dueDateFormat (): string {
		if (!this.dueDate || !this.dueDateHours || !this.minutes) return '';

		let label = 'am';
		let dueHour = this.dueDateHours;
		if (dueHour >= 12) {
			label = 'pm';
			dueHour = dueHour === 12 ? 12 : dueHour - 12;
		}

		return `${this.weekDay} ${dueHour}:${this.minutes}${label}`;
	}
}
