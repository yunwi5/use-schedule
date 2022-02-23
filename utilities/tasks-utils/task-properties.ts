import { PlannerMode } from "../../models/planner-models/PlannerMode";

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

export function isInstanceofTaskProps (properties: object) {
	Object.keys(properties).forEach((key) => {});
}
