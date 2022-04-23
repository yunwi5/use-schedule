import { Status } from "../../models/task-models/Status";
import { Planner } from "../../models/planner-models/Planner";

export function getTaskStatusCount(planner: Planner) {
    let openedTasks = 0,
        completedTasks = 0,
        progressTasks = 0,
        overDueTasks = 0;

    for (const task of planner.allTasks) {
        const status = task.status.trim().toLowerCase();
        if (status === Status.OPEN.toLowerCase()) {
            openedTasks++;
        } else if (status === Status.COMPLETED.toLowerCase()) {
            completedTasks++;
        } else if (status === Status.IN_PROGRESS.toLowerCase()) {
            progressTasks++;
        } else if (status === Status.OVERDUE.toLowerCase()) {
            overDueTasks++;
        } else {
            openedTasks++;
        }
    }

    return {
        openedTasks,
        completedTasks,
        progressTasks,
        overDueTasks,
    };
}
