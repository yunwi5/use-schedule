import { PlannerMode } from "../planner-models/PlannerMode";

// Interface for updating task obj.
export interface TaskProperties {
	name?: string;
	timeString?: string;
	description?: string;
	duration?: number;
	category?: string;
	subCategory?: string;
	status?: string;
	userId?: string;
	importance?: string;

	dueDateString?: string;
	plannerType?: PlannerMode;
	comment?: string;
}

export interface SubTaskProperties {
	name?: string;
	order?: number; // To arrange subtasks in order in the list.
	isImportant?: boolean;
	isCompleted?: boolean;
	parentTaskId?: string;
}

export function isInstanceofTaskProps (properties: object) {
	Object.keys(properties).forEach((key) => {});
}
