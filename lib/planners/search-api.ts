import { PlannerMode } from "../../models/planner-models/PlannerMode";
import { Task } from "../../models/task-models/Task";
import { TaskCollection } from "../../utilities/mongodb-util/mongodb-constant";

const API_DOMAIN = `${process.env.API_DOMAIN_FULL}/planners`;

export async function getTasksFromCollection(
    collection: TaskCollection,
    cookie: string,
    searchWord: string,
): Promise<Task[]> {
    let searchedTasks: Task[] = [];
    try {
        const response = await fetch(`${API_DOMAIN}?collection=${collection}&q=${searchWord}`, {
            headers: {
                cookie: cookie,
            },
        });
        const data = await response.json();
        searchedTasks = data.tasks || [];
    } catch (err) {
        console.error(err);
    }

    return searchedTasks;
}

// Full url is true by default
export async function getSearchedTasks(searchWord: string, cookie: string = "") {
    const weeklyPromise: Promise<Task[]> = getTasksFromCollection(
        TaskCollection.WEEKLY_TASKS,
        cookie,
        searchWord,
    );
    const montlyPromise: Promise<Task[]> = getTasksFromCollection(
        TaskCollection.MONTLY_TASKS,
        cookie,
        searchWord,
    );
    const yearlyPromise: Promise<Task[]> = getTasksFromCollection(
        TaskCollection.YEARLY_TASKS,
        cookie,
        searchWord,
    );

    const [weeklyTasks, montlyTasks, yearlyTasks] = await Promise.all([
        weeklyPromise,
        montlyPromise,
        yearlyPromise,
    ]);
    weeklyTasks.forEach((task) => (task.plannerType = PlannerMode.WEEKLY));
    montlyTasks.forEach((task) => (task.plannerType = PlannerMode.MONTLY));
    yearlyTasks.forEach((task) => (task.plannerType = PlannerMode.YEARLY));

    const resultTasks = weeklyTasks.concat(montlyTasks).concat(yearlyTasks);
    return resultTasks;
}
