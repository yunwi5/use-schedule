import { WeekDay } from "../date-models/WeekDay";
import { Task, PlannerTask } from "../task-models/Task";

export class WeeklyPlanner {
	public allTasks: PlannerTask[] = [];
	public mondayTasks: PlannerTask[] = [];
	public tuesdayTasks: PlannerTask[] = [];
	public wednesdayTasks: PlannerTask[] = [];
	public thursdayTasks: PlannerTask[] = [];
	public fridayTasks: PlannerTask[] = [];
	public saturdayTasks: PlannerTask[] = [];
	public sundayTasks: PlannerTask[] = [];

	constructor (public weekBeginning: Date) {}

	addTasks (newTask: PlannerTask): void {
		this.allTasks.push(newTask);
		switch (newTask.day) {
			case WeekDay.MONDAY:
				this.mondayTasks.push(newTask);
				break;
			case WeekDay.TUESDAY:
				this.tuesdayTasks.push(newTask);
				break;
			case WeekDay.WEDNESDAY:
				this.wednesdayTasks.push(newTask);
				break;
			case WeekDay.THURSDAY:
				this.thursdayTasks.push(newTask);
				break;
			case WeekDay.FRIDAY:
				this.fridayTasks.push(newTask);
				break;
			case WeekDay.SATURDAY:
				this.saturdayTasks.push(newTask);
				break;
			case WeekDay.SUNDAY:
				this.sundayTasks.push(newTask);
				break;
		}
	}

	getTasks (day: WeekDay): PlannerTask[] {
		switch (day) {
			case WeekDay.MONDAY:
				return this.mondayTasks;
			case WeekDay.TUESDAY:
				return this.tuesdayTasks;
			case WeekDay.WEDNESDAY:
				return this.wednesdayTasks;
			case WeekDay.THURSDAY:
				return this.thursdayTasks;
			case WeekDay.FRIDAY:
				return this.fridayTasks;
			case WeekDay.SATURDAY:
				return this.saturdayTasks;
			case WeekDay.SUNDAY:
				return this.sundayTasks;
		}
	}

	copy (): WeeklyPlanner {
		const newPlanner = new WeeklyPlanner(this.weekBeginning);
		newPlanner.allTasks = this.allTasks;
		newPlanner.mondayTasks = this.mondayTasks;
		newPlanner.tuesdayTasks = this.tuesdayTasks;
		newPlanner.wednesdayTasks = this.wednesdayTasks;
		newPlanner.thursdayTasks = this.thursdayTasks;
		newPlanner.fridayTasks = this.fridayTasks;
		newPlanner.saturdayTasks = this.saturdayTasks;
		newPlanner.sundayTasks = this.sundayTasks;
		return newPlanner;
	}
}
