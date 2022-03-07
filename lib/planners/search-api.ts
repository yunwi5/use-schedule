import { PlannerMode } from "../../models/planner-models/PlannerMode";
import { Task } from "../../models/task-models/Task";
import { Collection } from "../../utilities/mongodb-util/mongodb-constant";
import { getSearchFilteredTasks as getFilteredTasks } from "../../utilities/tasks-utils/task-search-util";

const API_DOMAIN = `${process.env.API_DOMAIN_FULL}/planners`;

export async function getTasksFromCollection (
	collection: Collection,
	cookie: string
): Promise<Task[]> {
	let searchedTasks: Task[] = [];
	try {
		const response = await fetch(`${API_DOMAIN}?collection=${collection}`, {
			headers: {
				cookie: cookie
			}
		});
		const data = await response.json();
		searchedTasks = data.tasks || [];
	} catch (err) {
		console.error(err);
	}

	return searchedTasks;
}

// Full url is true by default
export async function getSearchedTasks (searchWord: string, cookie: string = "") {
	const weeklyPromise: Promise<Task[]> = getTasksFromCollection(Collection.WEEKLY_TASKS, cookie);
	const montlyPromise: Promise<Task[]> = getTasksFromCollection(Collection.MONTLY_TASKS, cookie);
	const yearlyPromise: Promise<Task[]> = getTasksFromCollection(Collection.YEARLY_TASKS, cookie);

	const [ weeklyTasks, montlyTasks, yearlyTasks ] = await Promise.all([
		weeklyPromise,
		montlyPromise,
		yearlyPromise
	]);

	const filteredWeeklyTasks = getFilteredTasks(weeklyTasks, searchWord, PlannerMode.WEEKLY);
	const filteredMontlyTasks = getFilteredTasks(montlyTasks, searchWord, PlannerMode.MONTLY);
	const filteredYearlyTasks = getFilteredTasks(yearlyTasks, searchWord, PlannerMode.YEARLY);

	const resultTasks = filteredWeeklyTasks.concat(filteredMontlyTasks).concat(filteredYearlyTasks);
	return resultTasks;
}
