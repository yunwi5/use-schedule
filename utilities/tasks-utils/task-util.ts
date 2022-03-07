import { Task } from "../../models/task-models/Task";
import { PlannerMode } from "../../models/planner-models/PlannerMode";
import { TaskStatus } from "../../models/task-models/Status";

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

export function isAnyPlanTime (beginningPeriod: Date, date: Date | string) {
	date = new Date(date);
	return (
		beginningPeriod.getFullYear() === date.getFullYear() &&
		beginningPeriod.getMonth() === date.getMonth() &&
		beginningPeriod.getDate() === date.getDate() &&
		beginningPeriod.getHours() === date.getHours() &&
		beginningPeriod.getMinutes() === date.getMinutes()
	);
}

// Check if the task is overdue.
export function isOverdue (task: Task): boolean {
	if (!task.dueDateString) return false;
	if (
		task.status === TaskStatus.COMPLETED ||
		task.status === TaskStatus.IN_PROGRESS ||
		task.status === TaskStatus.CANCELLED
	)
		return false;
	const current = new Date();
	const dueDate = new Date(task.dueDateString);
	return current.getTime() > dueDate.getTime();
}

export function adjustIfOverdueTask (task: Task): void {
	if (isOverdue(task)) task.status = TaskStatus.OVERDUE;
}
