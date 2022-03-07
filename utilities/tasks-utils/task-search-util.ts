import { PlannerMode } from "../../models/planner-models/PlannerMode";
import { Task } from "../../models/task-models/Task";
import { searchContains } from "../gen-utils/string-util";

export function getSearchFilteredTasks (
	tasks: Task[],
	searchWord: string,
	plannerMode: PlannerMode
) {
	const resultList: Task[] = [];
	tasks.forEach((t) => {
		if (searchContains(searchWord, t.name)) {
			t.plannerType = plannerMode;
			resultList.push(t);
		}
	});
	return resultList;
}
