import { getEndDateTimeFormat } from "../../utilities/date-utils/date-format";
import { getDayName } from "../../utilities/date-utils/date-get";
import { WeekDay } from "../date-models/WeekDay";
import { PlannerMode } from "../planner-models/PlannerMode";
import { SubTask } from "./SubTask";
import { Task } from "./Task";

export abstract class AbstractTask implements Task {
    id: string;
    name: string;
    timeString: string;
    description: string;
    duration: number;
    category: string;
    subCategory: string;
    status: string;
    userId: string;
    importance: string;
    plannerType: PlannerMode;

    dueDateString?: string;
    isAnyDateTime?: boolean;
    comment?: string;
    subTasks?: SubTask[];

    constructor(taskObj: Task) {
        this.id = taskObj.id;
        this.name = taskObj.name;
        this.timeString = taskObj.timeString;
        this.description = taskObj.description;
        this.duration = taskObj.duration;
        this.category = taskObj.category;
        this.subCategory = taskObj.subCategory;
        this.status = taskObj.status;
        this.userId = taskObj.userId;
        this.importance = taskObj.importance;
        this.dueDateString = taskObj.dueDateString;
        this.comment = taskObj.comment;
        this.isAnyDateTime = taskObj.isAnyDateTime;
        this.subTasks = taskObj.subTasks;
        this.plannerType = taskObj.plannerType;
    }

    abstract get planDateFormat(): string;
    abstract get dueDateFormat(): string;
    abstract get durationFormat(): string;

    get endTimeFormat(): string {
        if (!this.duration) return "";
        return getEndDateTimeFormat(this.dateTime, this.duration);
    }

    get dateTime() {
        return new Date(this.timeString);
    }

    // Need to validate if this is correct
    get day(): WeekDay {
        const date = new Date(this.timeString);
        return getDayName(date.getDay());
    }

    // This should be used instead of day
    get weekDay(): WeekDay {
        const date = new Date(this.timeString);
        return getDayName(date.getDay());
    }

    get hours() {
        const date = new Date(this.timeString);
        return date.getHours();
    }

    get minutes() {
        return new Date(this.timeString).getMinutes();
    }

    // Duedate
    get dueDate(): Date | null {
        if (this.dueDateString) return new Date(this.dueDateString);
        return null;
    }

    get dueDateWeekDay(): WeekDay {
        if (!this.dueDateString) return WeekDay.ANY;

        const due = new Date(this.dueDateString);
        return getDayName(due.getDay());
    }

    get dueDateHours(): number | null {
        if (!this.dueDate) return null;

        return this.dueDate.getHours();
    }

    get dueDateMinutes(): number | null {
        if (!this.dueDate) return null;

        return this.dueDate.getMinutes();
    }
}
