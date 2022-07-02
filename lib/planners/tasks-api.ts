import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { NoIdTask, Task } from '../../models/task-models/Task';
import { TaskProperties } from '../../models/task-models/TaskProperties';
import { getTaskCollection } from '../../utilities/tasks-utils/task-util';

const API_DOMAIN = `/api/planners`;

// Error handling is done by react-query, so it would not be needed inside the function
export async function fetchAllTasks() {
    return fetch(`${API_DOMAIN}`).then((res) => res.json());
}

export async function fetchPeriodicTasks(context: any) {
    const [name, collection] = context.queryKey;
    return fetch(`${API_DOMAIN}?collection=${collection}`).then((res) => res.json());
}

export async function postTask(newTask: Task, plannerMode: PlannerMode) {
    const collection = getTaskCollection(plannerMode);

    let insertedId: null | string = null;
    let res;
    try {
        // Send rquest.
        res = await fetch(`${API_DOMAIN}?collection=${collection}`, {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        insertedId = data.insertedId.toString();
    } catch (err) {
        console.error(err);
    }

    if (!res || !res.ok) {
        return { isSuccess: false };
    }
    return { isSuccess: true, insertedId };
}

export async function postTasks(newTasks: NoIdTask[], plannerMode: PlannerMode) {
    const collection = getTaskCollection(plannerMode);
    let res;
    try {
        // Send rquest.
        res = await fetch(`${API_DOMAIN}?collection=${collection}&many=true`, {
            method: 'POST',
            body: JSON.stringify(newTasks),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return {
            isSuccess: true,
            message: `${data.insertedCount} tasks were imported!`,
            insertedCount: data.insertedCount,
        };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Inserting tasks did not work.';
        return { isSuccess: false, message };
    }
}

export async function replaceTask(
    taskId: string,
    updatedTask: Task,
    plannerMode: PlannerMode,
) {
    const collection = getTaskCollection(plannerMode);

    let res;
    try {
        res = await fetch(`${API_DOMAIN}/${taskId}?collection=${collection}`, {
            method: 'PUT',
            body: JSON.stringify(updatedTask),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
    } catch (err) {
        console.error(err);
    }

    if (!res || !res.ok) {
        return { isSuccess: false };
    }
    return { isSuccess: true };
}

export async function deleteTask(taskId: string, plannerMode: PlannerMode) {
    const collection = getTaskCollection(plannerMode);

    let res;
    try {
        res = await fetch(`${API_DOMAIN}/${taskId}?collection=${collection}`, {
            method: 'DELETE',
        });
    } catch (err) {
        console.error(err);
    }

    if (!res || !res.ok) {
        return { isSuccess: false };
    }
    return { isSuccess: true };
}

export async function updateTaskProperties(
    taskId: string,
    updateProps: TaskProperties,
    plannerMode: PlannerMode,
) {
    const collection = getTaskCollection(plannerMode);

    let res,
        message = '';
    try {
        res = await fetch(`${API_DOMAIN}/task-update/${taskId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                updateProps,
                collection,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        message = err instanceof Error ? err.message : 'Patching task props did not work.';
        console.error(message);
    }

    if (!res || !res.ok) {
        return { isSuccess: false, message };
    }
    return { isSuccess: true, message: 'Patching task props successful' };
}
