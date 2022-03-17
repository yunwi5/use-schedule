import { SubTask } from "../../models/task-models/SubTask";

const API_DOMAIN = `${process.env.API_DOMIN_RELATIVE}/planners/sub-tasks`;

export async function getSubTasks (parentTaskId: string) {
	let res;
	let data: SubTask[] = [];
	let message: string = "";
	try {
		res = await fetch(`${API_DOMAIN}/${parentTaskId}`);

		const { message: m, subTasks } = await res.json();
		data = subTasks;
		message = m;
		console.log("Get (sub-tasks) data:", data);
	} catch (err) {
		console.error(err);
	}

	if (!res || !res.ok) {
		return { isSuccess: false, message };
	}
	return { isSuccess: true, message, data };
}

export async function postSubtask (newSubTask: SubTask, parentTaskId: string) {
	let insertedId: string | null = null;
	let res;
	try {
		res = await fetch(`${API_DOMAIN}/${parentTaskId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newSubTask)
		});

		const data = await res.json();
		console.log("post data:", data);
		insertedId = data && data.insertedId ? data.insertedId.toString() : null;
	} catch (err) {
		console.error(err);
	}

	if (!res || !res.ok) {
		return { isSuccess: false };
	}
	return { isSuccess: true, insertedId };
}
