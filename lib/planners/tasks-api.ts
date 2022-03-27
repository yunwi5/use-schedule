import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { Task } from '../../models/task-models/Task';
import { TaskProperties } from '../../models/task-models/TaskProperties';
import { Collection } from '../../utilities/mongodb-util/mongodb-constant';

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

const API_DOMAIN = `${process.env.API_DOMIN_RELATIVE}/planners`;

export async function postTask (newTask: Task, plannerMode: PlannerMode) {
	const collection = getCollectionOfPlaner(plannerMode);

	let insertedId: null | string = null;
	let res;
	try {
		// Send rquest.
		res = await fetch(`${API_DOMAIN}?collection=${collection}`, {
			method: 'POST',
			body: JSON.stringify(newTask),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await res.json();
		console.log('post data:', data);
		insertedId = data.insertedId.toString();
	} catch (err) {
		console.error(err);
	}

	if (!res || !res.ok) {
		return { isSuccess: false };
	}
	return { isSuccess: true, insertedId };
}

export async function updateTask (taskId: string, updatedTask: Task, plannerMode: PlannerMode) {
	const collection = getCollectionOfPlaner(plannerMode);

	let res;
	try {
		res = await fetch(`${API_DOMAIN}/${taskId}?collection=${collection}`, {
			method: 'PUT',
			body: JSON.stringify(updatedTask),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await res.json();
		console.log('Put request response:', data);
	} catch (err) {
		console.error(err);
	}

	if (!res || !res.ok) {
		return { isSuccess: false };
	}
	return { isSuccess: true };
}

export async function deleteTask (taskId: string, plannerMode: PlannerMode) {
	const collection = getCollectionOfPlaner(plannerMode);

	let res;
	try {
		res = await fetch(`${API_DOMAIN}/${taskId}?collection=${collection}`, {
			method: 'DELETE'
		});
		const data = await res.json();
		console.log('Delete data:', data);
	} catch (err) {
		console.error(err);
	}

	if (!res || !res.ok) {
		return { isSuccess: false };
	}
	return { isSuccess: true };
}

export async function updateTaskProperties (
	taskId: string,
	updateProps: TaskProperties,
	plannerMode: PlannerMode
) {
	const collection = getCollectionOfPlaner(plannerMode);

	let res;
	try {
		res = await fetch(`${API_DOMAIN}/task-update/${taskId}`, {
			method: 'PATCH',
			body: JSON.stringify({
				updateProps,
				collection
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await res.json();
		console.log('Update data:', data);
	} catch (err) {
		console.error(err);
	}

	if (!res || !res.ok) {
		return { isSuccess: false };
	}
	return { isSuccess: true };
}
