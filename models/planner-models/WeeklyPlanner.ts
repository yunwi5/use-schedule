import { Planner } from "./Planner";
import { PlannerTask } from "../task-models/Task";
import { WeekDay } from "../date-models/WeekDay";

export class WeeklyPlanner implements Planner {
    public allTasks: PlannerTask[] = [];
    public mondayTasks: PlannerTask[] = [];
    public tuesdayTasks: PlannerTask[] = [];
    public wednesdayTasks: PlannerTask[] = [];
    public thursdayTasks: PlannerTask[] = [];
    public fridayTasks: PlannerTask[] = [];
    public saturdayTasks: PlannerTask[] = [];
    public sundayTasks: PlannerTask[] = [];
    // Task scheduled at "Any time", but within this week.
    public anyTimeTasks: PlannerTask[] = [];

    constructor(public weekBeginning: Date) {}

    addTask(newTask: PlannerTask): void {
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

    getTasks(day: WeekDay): PlannerTask[] {
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

    copy(newPeriod?: Date): WeeklyPlanner {
        const newPlanner = new WeeklyPlanner(newPeriod || this.weekBeginning);
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
