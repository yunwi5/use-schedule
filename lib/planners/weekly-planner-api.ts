import axios from "axios";
import { PlannerTask } from "../../models/task-models/Task";
import { Collection } from "../../utilities/mongodb-util/mongodb-constant";

const api = axios.create({
	baseURL: "http://localhost:3000/"
});

const API_DOMIN = "/api/planners";

export async function postTask (newTask: PlannerTask) {
	let insertedId: null | string = null;
	let res;
	try {
		// Send rquest.
		res = await fetch("/api/planners/weekly-planners", {
			method: "POST",
			body: JSON.stringify(newTask),
			headers: {
				"Content-Type": "application/json"
			}
		});

		const data = await res.json();
		insertedId = data.insertedId.toString();
		console.log("insertedId:", insertedId);
	} catch (err) {
		console.error(err);
	}

	if (!res || !res.ok) {
		return { isSuccess: false };
	}
	return { isSuccess: true, insertedId };
}

export async function updateTask (taskId: string, updatedTask: PlannerTask) {
	let res;
	try {
		res = await fetch(`/api/planners/weekly-planners/${taskId}`, {
			method: "PUT",
			body: JSON.stringify(updatedTask),
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await res.json();
		console.log("Put request response:", data);
	} catch (err) {
		console.error(err);
	}

	if (!res || !res.ok) {
		return { isSuccess: false };
	}
	return { isSuccess: true };
}

// Update specific property of the task.
export async function updateTaskStatus (taskId: string, newStatus: string) {
	let res;
	try {
		res = await fetch(`/api/planners/task-status-update/${taskId}`, {
			method: "PATCH",
			body: JSON.stringify({
				status: newStatus,
				collection: Collection.WEEKLY_TASKS
			}),
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await res.json();
		console.log("update data:", data);
	} catch (err) {
		console.error(err);
	}

	if (!res || !res.ok) {
		return { isSuccess: false };
	}
	return { isSuccess: true };
}

export async function deleteTask (taskId: string) {
	let res;
	try {
		res = await fetch(`${API_DOMIN}/weekly-planners/${taskId}`, {
			method: "DELETE"
		});
		const data = await res.json();
		console.log("Delete data:", data);
	} catch (err) {
		console.error(err);
	}

	if (!res || !res.ok) {
		return { isSuccess: false };
	}
	return { isSuccess: true };
}
