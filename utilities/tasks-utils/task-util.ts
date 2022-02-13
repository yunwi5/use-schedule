import { Task } from "../../models/task-models/Task";

export function convertToTasks (data: any[]) {
	const tasks: Task[] = [];
	for (const document of data) {
		const task = {
			id: document._id.toString(),
			...document
		};
		delete task._id;
		tasks.push(task as Task);
	}

	return tasks;
}
