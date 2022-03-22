import { AbstractTask } from "./AbstractTask";
import { PlannerMode } from "../planner-models/PlannerMode";
import { Task } from "./Task";

export class TemplateTask extends AbstractTask {
	templateId: string;

	constructor (taskObj: Task, templateId: string) {
		super({ ...taskObj, plannerType: PlannerMode.TEMPLATE });
		this.templateId = templateId;
	}
	get planDateFormat (): string {
		if (this.isAnyDateTime) return "Any Time";

		let label = "am";
		let planHour = this.hours;
		if (this.hours >= 12) {
			label = "pm";
			planHour = planHour === 12 ? 12 : planHour - 12;
		}

		return `${this.weekDay} ${planHour}:${this.minutes}${label}`;
	}

	get dueDateFormat (): string {
		if (!this.dueDate || !this.dueDateHours || !this.minutes) return "N/A";

		let label = "am";
		let dueHour = this.dueDateHours;
		if (dueHour >= 12) {
			label = "pm";
			dueHour = dueHour === 12 ? 12 : dueHour - 12;
		}

		return `${this.weekDay} ${dueHour}:${this.minutes}${label}`;
	}
}
