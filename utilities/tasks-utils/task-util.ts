import { Task } from "../../models/task-models/Task";
import { PlannerMode } from "../../models/planner-models/PlannerMode";

export function convertToTasks (data: any[]) {
	const tasks: Task[] = [];
	for (const document of data) {
		const task = {
			id: document._id.toString(),
			...document
		};
		delete task._id;
		// For un-adjusted tasks already added to weekly planner
		if (!task.plannerType) task.plannerType = PlannerMode.WEEKLY;
		tasks.push(task as Task);
	}

	return tasks;
}
