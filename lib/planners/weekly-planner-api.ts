import axios from "axios";
import { PlannerMode } from "../../models/planner-models/PlannerMode";
import { PlannerTask } from "../../models/task-models/Task";
import { Collection } from "../../utilities/mongodb-util/mongodb-constant";

function getCollectionOfPlaner (plannerMode: PlannerMode): Collection {
	switch (plannerMode) {
		case PlannerMode.WEEKLY:
			return Collection.WEEKLY_TASKS;
		case PlannerMode.MONTLY:
			return Collection.MONTLY_TASKS;
		case PlannerMode.YEARLY:
			return Collection.YEARLY_TASKS;
		case PlannerMode.TEMPLATE:
			return Collection.TEMPLATE_TASKS;
	}
}

const API_DOMIN = "/api/planners";

export async function postTask (newTask: PlannerTask, plannerMode: PlannerMode) {
	// const collection = getCollectionOfPlaner(plannerMode);

	let insertedId: null | string = null;
	let res;
	try {
		// Send rquest.
		res = await fetch(`${API_DOMIN}/${plannerMode}`, {
			method: "POST",
			body: JSON.stringify(newTask),
			headers: {
				"Content-Type": "application/json"
			}
		});

		const data = await res.json();
		console.log("post data:", data);
		insertedId = data.insertedId.toString();
	} catch (err) {
		console.error(err);
	}

	if (!res || !res.ok) {
		return { isSuccess: false };
	}
	return { isSuccess: true, insertedId };
}

export async function updateTask (
	taskId: string,
	updatedTask: PlannerTask,
	plannerMode: PlannerMode
) {
	// const collection = getCollectionOfPlaner(plannerMode);

	let res;
	try {
		res = await fetch(`${API_DOMIN}/${plannerMode}/${taskId}`, {
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
		res = await fetch(`${API_DOMIN}/task-status-update/${taskId}`, {
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

export async function deleteTask (taskId: string, plannerMode: PlannerMode) {
	// const collection = getCollectionOfPlaner(plannerMode);

	let res;
	try {
		res = await fetch(`${API_DOMIN}/${plannerMode}/${taskId}`, {
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
