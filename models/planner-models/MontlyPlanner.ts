import { Planner } from "./Planner";
import { PlannerTask } from "../task-models/Task";
import { WeekNumber } from "../date-models/WeekNumber";

export class MontlyPlanner implements Planner {
	public allTasks: PlannerTask[] = [];

	public firstWeekTasks: PlannerTask[] = [];
	public secondWeekTasks: PlannerTask[] = [];
	public thirdWeekTasks: PlannerTask[] = [];
	public fourthWeekTasks: PlannerTask[] = [];
	public fifthWeekTasks: PlannerTask[] = [];

	public anyTimeTasks: PlannerTask[] = [];

	constructor (public monthBeginning: Date) {}

	addTask (newTask: PlannerTask): void {
		this.allTasks.push(newTask);
		this.anyTimeTasks.push(newTask);
	}

	getTasks (weekNumber: WeekNumber): PlannerTask[] {
		switch (weekNumber) {
			case WeekNumber.FIRST_WEEK:
				return this.firstWeekTasks;
			case WeekNumber.SECOND_WEEK:
				return this.secondWeekTasks;
			case WeekNumber.THIRD_WEEK:
				return this.thirdWeekTasks;
			case WeekNumber.FOURTH_WEEK:
				return this.fourthWeekTasks;
			case WeekNumber.FIFTH_WEEK:
				return this.fifthWeekTasks;
			case WeekNumber.ANY_WEEK:
				return this.anyTimeTasks;
			default:
				throw new Error(
					"Your week number does not match any of members of WeekNumber enum!"
				);
		}
	}

	copy (newMonthBeginning?: Date): MontlyPlanner {
		const newPlanner = new MontlyPlanner(newMonthBeginning || this.monthBeginning);
		this.allTasks.forEach((task) => {
			newPlanner.addTask(task);
		});
		return newPlanner;
	}
}
