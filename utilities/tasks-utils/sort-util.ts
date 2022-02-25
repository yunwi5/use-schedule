import { Task } from "../../models/task-models/Task";

export function sortTaskByTime (taskA: Task, taskB: Task) {
	return new Date(taskA.timeString) < new Date(taskB.timeString) ? -1 : 1;
}
