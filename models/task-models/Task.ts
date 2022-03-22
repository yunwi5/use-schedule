import { AbstractTask } from "./AbstractTask";
import { SubTask } from "./SubTask";
import { PlannerMode } from "../planner-models/PlannerMode";
import { getDateMonthFormat, getISOTimeFormat } from "../../utilities/time-utils/date-format";
import { addMinutes } from "../../utilities/time-utils/date-control";

export interface Task {
	id: string;
	name: string;
	timeString: string;
	description: string;
	duration: number;
	category: string;
	subCategory: string;
	status: string;
	userId: string;
	importance: string;
	plannerType: PlannerMode;

	dueDateString?: string;
	isAnyDateTime?: boolean;
	comment?: string;
	subTasks?: SubTask[];
}

export type FormTaskObject = {
	name: string;
	timeString: string;
	description: string;
	category: string;
	subCategory: string;
	status: string;
	importance: string;
	duration: number;
	plannerType?: PlannerMode;

	dueDateString?: string;
	isAnyDateTime?: boolean;
};

export class PlannerTask extends AbstractTask {
	constructor (taskObj: Task) {
		super(taskObj);
	}

	get planDateFormat (): string {
		if (this.isAnyDateTime) return "Any Time";
		else if (this.plannerType === PlannerMode.WEEKLY) {
			let endTime: null | Date = null;
			if (this.duration) endTime = addMinutes(this.dateTime, this.duration);

			const startTimeFormat = getISOTimeFormat(this.dateTime);
			if (!this.dateTime) {
				console.log(this);
			}
			const endTimeFormat = endTime && getISOTimeFormat(endTime);
			const planDateFormat = endTimeFormat
				? `${startTimeFormat} ~ ${endTimeFormat}`
				: startTimeFormat;
			return planDateFormat;
		}
		return getDateMonthFormat(this.dateTime);
	}

	get dueDateFormat (): string {
		if (!this.dueDate) return "";
		return getDateMonthFormat(this.dueDate);
	}
}
