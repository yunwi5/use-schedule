import { PlannerMode } from "../../models/planner-models/PlannerMode";

// This is only for a label for different types of tasks (not for functionality use).
export function getTaskType (plannerMode?: PlannerMode) {
	if (!plannerMode) return "? Task";
	switch (plannerMode) {
		case PlannerMode.WEEKLY:
			return "Weekly Task";
		case PlannerMode.MONTLY:
			return "Montly Task";
		case PlannerMode.YEARLY:
			return "Yearly Task";
		case PlannerMode.TEMPLATE:
			return "Template Task";
		default:
			return "Weekly Task";
	}
}
