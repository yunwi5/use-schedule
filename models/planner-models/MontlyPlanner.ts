import { Planner } from "./Planner";
import { PlannerTask } from "../task-models/Task";
import { WeekNumber } from "../date-models/WeekNumber";
import { getWeekOfMonth } from "../../utilities/time-utils/month-util";
import { isAnyPlanTime } from "../../utilities/tasks-utils/task-util";

export class MontlyPlanner implements Planner {
	public allTasks: PlannerTask[] = [];

	public firstWeekTasks: PlannerTask[] = [];
	public secondWeekTasks: PlannerTask[] = [];
	public thirdWeekTasks: PlannerTask[] = [];
	public fourthWeekTasks: PlannerTask[] = [];
	public fifthWeekTasks: PlannerTask[] = [];
	public sixthWeekTasks: PlannerTask[] = [];

	public anyTimeTasks: PlannerTask[] = [];

	constructor (public monthBeginning: Date) {}

	addTask (newTask: PlannerTask): void {
		this.allTasks.push(newTask);

		if (newTask.isAnyDateTime) {
			this.anyTimeTasks.push(newTask);
			return;
		}

		const weekNumber = newTask.dateTime && getWeekOfMonth(newTask.dateTime);

		switch (weekNumber) {
			case 1:
				this.firstWeekTasks.push(newTask);
				break;
			case 2:
				this.secondWeekTasks.push(newTask);
				break;
			case 3:
				this.thirdWeekTasks.push(newTask);
				break;
			case 4:
				this.fourthWeekTasks.push(newTask);
				break;
			case 5:
				this.fifthWeekTasks.push(newTask);
				break;
			case 6:
				this.sixthWeekTasks.push(newTask);
				break;
			default:
				this.anyTimeTasks.push(newTask);
		}
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
			case WeekNumber.SIXTH_WEEK:
				return this.sixthWeekTasks;
			case WeekNumber.ANY:
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
