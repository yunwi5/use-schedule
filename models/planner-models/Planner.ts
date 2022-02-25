import { Task } from "../task-models/Task";

export interface Planner {
	allTasks: Task[];
	anyTimeTasks: Task[];

	addTask(newTask: Task): void;
	getTasks(period: string): Task[];
	copy(newPeriod?: Date): Planner;
}
