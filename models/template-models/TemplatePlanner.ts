import { Planner } from "../planner-models/Planner";
import { Template } from "./Template";
import { TemplateTask } from "./TemplateTask";
import { WeekDay } from "../date-models/WeekDay";

export class TemplatePlanner implements Planner {
	// Template planner cannot be initialized without Template object.
	public template?: Template;

	public allTasks: TemplateTask[] = [];
	public mondayTasks: TemplateTask[] = [];
	public tuesdayTasks: TemplateTask[] = [];
	public wednesdayTasks: TemplateTask[] = [];
	public thursdayTasks: TemplateTask[] = [];
	public fridayTasks: TemplateTask[] = [];
	public saturdayTasks: TemplateTask[] = [];
	public sundayTasks: TemplateTask[] = [];
	// Task scheduled at "Any time", but within the week.
	public anyTimeTasks: TemplateTask[] = [];

	constructor (public weekBeginning: Date, template?: Template) {
		this.template = template;
	}

	addTask (newTask: TemplateTask): void {
		this.allTasks.push(newTask);

		if (newTask.isAnyDateTime) {
			this.anyTimeTasks.push(newTask);
			return;
		}

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
			default:
				this.anyTimeTasks.push(newTask);
		}
	}

	getTasks (day: WeekDay): TemplateTask[] {
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
			case WeekDay.ANY:
				return this.anyTimeTasks;
			default:
				throw new Error("Invalid Weekday received by weekly planner");
		}
	}

	copy (newPeriod?: Date): TemplatePlanner {
		const newPlanner = new TemplatePlanner(newPeriod || this.weekBeginning, this.template);
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
