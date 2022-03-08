import { PlannerMode } from "../../models/planner-models/PlannerMode";

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
	}
}
