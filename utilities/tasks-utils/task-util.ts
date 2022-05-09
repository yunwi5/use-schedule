import { PlannerTask, Task } from '../../models/task-models/Task';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { Status } from '../../models/task-models/Status';
import { SubTask } from '../../models/task-models/SubTask';

export function convertToTasks(data: any[], plannerMode?: PlannerMode): Task[] {
    const tasks: Task[] = [];
    for (const document of data) {
        try {
            const task = {
                // For un-adjusted tasks already added to weekly planner
                plannerType: document.plannerType || plannerMode || PlannerMode.WEEKLY,
                ...document,
                id: document._id.toString(),
            };
            delete task._id;
            tasks.push(task as Task);
        } catch (err) {
            console.log(err);
        }
    }
    return tasks;
}

export function covertToSubTasks(data: any[]): SubTask[] {
    const subTasks: SubTask[] = [];
    for (const document of data) {
        const subTask = {
            ...document,
            id: document._id.toString(),
        };
        delete subTask._id;
        subTasks.push(subTask);
    }

    return subTasks;
}

// This fn is used in ...
export function isAnyPlanTime(beginningPeriod: Date, date: Date | string) {
    date = new Date(date);
    return (
        beginningPeriod.getFullYear() === date.getFullYear() &&
        beginningPeriod.getMonth() === date.getMonth() &&
        beginningPeriod.getDate() === date.getDate() &&
        beginningPeriod.getHours() === date.getHours() &&
        beginningPeriod.getMinutes() === date.getMinutes()
    );
}

// Check if the task is overdue.
export function isOverdue(task: Task): boolean {
    if (!task.dueDateString) return false;
    if (
        task.status === Status.COMPLETED ||
        task.status === Status.IN_PROGRESS ||
        task.status === Status.CANCELLED
    )
        return false;
    const current = new Date();
    const dueDate = new Date(task.dueDateString);
    return current.getTime() > dueDate.getTime();
}

export function adjustIfOverdueTask(task: Task): void {
    if (isOverdue(task)) task.status = Status.OVERDUE;
}

export function adjustOverdueTasks(tasks: Task[]): void {
    tasks.forEach((task) => adjustIfOverdueTask(task));
}

export function processTasks(tasks: Task[]): PlannerTask[] {
    const plannerTaskList: PlannerTask[] = [];
    for (const task of tasks) {
        const convertedTask = new PlannerTask(task);
        adjustIfOverdueTask(convertedTask);
        plannerTaskList.push(convertedTask);
    }
    return plannerTaskList;
}
