import { getDayName } from "../../utilities/time-utils/date-get";
import { WeekDay } from "../date-models/WeekDay";
import { PlannerMode } from "../planner-models/PlannerMode";

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

	dueDateString?: string;
	plannerType?: PlannerMode;
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

	dueDateString?: string;
	plannerType?: PlannerMode;
};

export class PlannerTask implements Task {
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

	dueDateString?: string;
	plannerType?: PlannerMode;

	constructor (taskObj: Task) {
		this.id = taskObj.id;
		this.name = taskObj.name;
		this.timeString = taskObj.timeString;
		this.description = taskObj.description;
		this.duration = taskObj.duration;
		this.category = taskObj.category;
		this.subCategory = taskObj.subCategory;
		this.status = taskObj.status;
		this.userId = taskObj.userId;
		this.importance = taskObj.importance;
		this.dueDateString = taskObj.dueDateString;
		this.plannerType = taskObj.plannerType;
	}

	get dateTime () {
		return new Date(this.timeString);
	}

	get month () {
		const date = new Date(this.timeString);
		return date.toLocaleDateString("en-US", {
			month: "short"
		});
	}

	get date (): number {
		return new Date(this.timeString).getDate();
	}

	// Need to validate if this is correct
	get day (): WeekDay {
		const date = new Date(this.timeString);
		return getDayName(date.getDay());
	}

	get hours (): number {
		const date = new Date(this.timeString);
		return date.getHours();
	}

	get minutes (): number {
		return new Date(this.timeString).getMinutes();
	}

	get dueDate (): Date | null {
		if (this.dueDateString) return new Date(this.dueDateString);
		return null;
	}
}
