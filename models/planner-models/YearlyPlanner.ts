import { Planner } from "./Planner";
import { Task, PlannerTask } from "../task-models/Task";
import { MonthListFromJan, Month, getMonthMember } from "../date-models/Month";

export class YearlyPlanner implements Planner {
	public allTasks: PlannerTask[] = [];

	public janTasks: PlannerTask[] = [];
	public febTasks: PlannerTask[] = [];
	public marTasks: PlannerTask[] = [];
	public aprTasks: PlannerTask[] = [];
	public mayTasks: PlannerTask[] = [];
	public junTasks: PlannerTask[] = [];
	public julTasks: PlannerTask[] = [];
	public augTasks: PlannerTask[] = [];
	public sepTasks: PlannerTask[] = [];
	public octTasks: PlannerTask[] = [];
	public novTasks: PlannerTask[] = [];
	public decTasks: PlannerTask[] = [];

	public anyTimeTasks: PlannerTask[] = [];

	constructor (public yearBeginning: Date) {}

	addTask (newTask: PlannerTask) {
		this.allTasks.push(newTask);

		const month = getMonthMember(newTask.dateTime);
		switch (month) {
			case Month.JANUARY:
				this.janTasks.push(newTask);
				break;
			case Month.FEBRUARY:
				this.febTasks.push(newTask);
				break;
			case Month.MARCH:
				this.marTasks.push(newTask);
				break;
			case Month.APRIL:
				this.aprTasks.push(newTask);
				break;
			case Month.MAY:
				this.mayTasks.push(newTask);
				break;
			case Month.JUNE:
				this.junTasks.push(newTask);
				break;
			case Month.JULY:
				this.julTasks.push(newTask);
				break;
			case Month.AUGUST:
				this.augTasks.push(newTask);
				break;
			case Month.SEPTEMBER:
				this.sepTasks.push(newTask);
				break;
			case Month.OCTOBER:
				this.octTasks.push(newTask);
				break;
			case Month.NOVEMBER:
				this.novTasks.push(newTask);
				break;
			case Month.DECEMBER:
				this.decTasks.push(newTask);
			default:
				this.anyTimeTasks.push(newTask);
		}
	}

	getTasks (month: Month): PlannerTask[] {
		switch (month) {
			case Month.JANUARY:
				return this.janTasks;
			case Month.FEBRUARY:
				return this.febTasks;
			case Month.MARCH:
				return this.marTasks;
			case Month.APRIL:
				return this.aprTasks;
			case Month.MAY:
				return this.mayTasks;
			case Month.JUNE:
				return this.junTasks;
			case Month.JULY:
				return this.julTasks;
			case Month.AUGUST:
				return this.augTasks;
			case Month.SEPTEMBER:
				return this.augTasks;
			case Month.OCTOBER:
				return this.octTasks;
			case Month.NOVEMBER:
				return this.novTasks;
			case Month.DECEMBER:
				return this.decTasks;
			default:
				return this.anyTimeTasks;
		}
	}

	copy (newPeriod?: Date): YearlyPlanner {
		const newPlanner = new YearlyPlanner(newPeriod || this.yearBeginning);
		this.allTasks.forEach((task) => {
			newPlanner.addTask(task);
		});
		return newPlanner;
	}
}
