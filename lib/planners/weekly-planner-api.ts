const BASE_URL = "http://localhost:3000";

export async function getWeeklyTasks () {
	const res = await fetch(`${BASE_URL}/api/planners/weekly-planners`);
	const data = await res.json();
	console.log(data.message);
	console.log(data.tasks);

	return data.tasks;
}
