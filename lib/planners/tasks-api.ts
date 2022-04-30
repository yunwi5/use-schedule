import { PlannerMode } from "../../models/planner-models/PlannerMode";
import { Task } from "../../models/task-models/Task";
import { TaskProperties } from "../../models/task-models/TaskProperties";
import { TaskCollection } from "../../db/mongodb-constant";

const API_DOMAIN = `${process.env.API_DOMIN_RELATIVE}/planners`;

// Error handling is done by react-query, so it would not be needed inside the function
export function fetchAllTasks() {
    return fetch(`${API_DOMAIN}`).then((res) => res.json());
}

function getPlannerCollection(plannerMode: PlannerMode): TaskCollection {
    switch (plannerMode) {
        case PlannerMode.WEEKLY:
            return TaskCollection.WEEKLY_TASKS;
        case PlannerMode.MONTLY:
            return TaskCollection.MONTLY_TASKS;
        case PlannerMode.YEARLY:
            return TaskCollection.YEARLY_TASKS;
        case PlannerMode.TEMPLATE:
            return TaskCollection.TEMPLATE_TASKS;
    }
}

export async function postTask(newTask: Task, plannerMode: PlannerMode) {
    const collection = getPlannerCollection(plannerMode);

    let insertedId: null | string = null;
    let res;
    try {
        // Send rquest.
        res = await fetch(`${API_DOMAIN}?collection=${collection}`, {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": "application/json",
            },
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

export async function replaceTask(taskId: string, updatedTask: Task, plannerMode: PlannerMode) {
    const collection = getPlannerCollection(plannerMode);

    let res;
    try {
        res = await fetch(`${API_DOMAIN}/${taskId}?collection=${collection}`, {
            method: "PUT",
            body: JSON.stringify(updatedTask),
            headers: {
                "Content-Type": "application/json",
            },
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

export async function deleteTask(taskId: string, plannerMode: PlannerMode) {
    const collection = getPlannerCollection(plannerMode);

    let res;
    try {
        res = await fetch(`${API_DOMAIN}/${taskId}?collection=${collection}`, {
            method: "DELETE",
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

export async function updateTaskProperties(
    taskId: string,
    updateProps: TaskProperties,
    plannerMode: PlannerMode,
) {
    const collection = getPlannerCollection(plannerMode);

    let res,
        message = "";
    try {
        res = await fetch(`${API_DOMAIN}/task-update/${taskId}`, {
            method: "PATCH",
            body: JSON.stringify({
                updateProps,
                collection,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        message = err instanceof Error ? err.message : "Patching task props did not work.";
        console.error(message);
    }

    if (!res || !res.ok) {
        return { isSuccess: false, message };
    }
    return { isSuccess: true, message: "Patching task props successful" };
}
