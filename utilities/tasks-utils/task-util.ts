import { Task } from '../../models/task-models/Task';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { TaskStatus } from '../../models/task-models/Status';
import { SubTask } from '../../models/task-models/SubTask';

export function convertToTasks (data: any[]): Task[] {
	const tasks: Task[] = [];
	for (const document of data) {
		const task = {
			id: document._id.toString(),
			// For un-adjusted tasks already added to weekly planner
			plannerType: document.plannerType || PlannerMode.WEEKLY,
			...document
		};
		delete task._id;

		tasks.push(task as Task);
	}

	return tasks;
}

export function covertToSubTasks (data: any[]): SubTask[] {
	const subTasks: SubTask[] = [];
	for (const document of data) {
		const subTask = {
			id: document._id.toString(),
			...document
		};
		delete subTask._id;
		subTasks.push(subTask);
	}

	return subTasks;
}

// This fn is used in ...
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
