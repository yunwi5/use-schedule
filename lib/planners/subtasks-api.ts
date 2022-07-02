import { SubTask } from '../../models/task-models/SubTask';
import { SubTaskProperties } from '../../models/task-models/TaskProperties';

const API_DOMAIN = `/api/planners/sub-tasks`;

const UPDATE_AND_DELETE = 'update-and-delete';

// Replaced by useQuery hook from ReactQuery
export async function getSubTasks(parentTaskId: string) {
    let res;
    let data: SubTask[] = [];
    let message: string = '';
    try {
        res = await fetch(`${API_DOMAIN}/${parentTaskId}`);

        const { message: m, subTasks } = await res.json();
        data = subTasks;
        message = m;
    } catch (err) {
        console.error(err);
        message = err instanceof Error ? err.message : 'Get SubTask Api went wrong.';
    }

    if (!res || !res.ok) {
        return { isSuccess: false, message };
    }
    return { isSuccess: true, message, data };
}

export async function postSubtask(newSubTask: SubTask, parentTaskId: string) {
    let insertedId: string | null = null;
    let res, message;
    try {
        res = await fetch(`${API_DOMAIN}/${parentTaskId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSubTask),
        });

        const data = await res.json();
        insertedId = data && data.insertedId ? data.insertedId.toString() : null;
        message = `Post SubTask successful with insertedId ${insertedId}`;
    } catch (err) {
        console.error(err);
        message = err instanceof Error ? err.message : 'Post SubTask Api went wrong.';
    }

    if (!res || !res.ok) {
        return { isSuccess: false, message };
    }
    return { isSuccess: true, message, insertedId };
}

export async function patchSubTaskProps(subTaskId: string, updatedProps: SubTaskProperties) {
    let res, message;
    let data;
    try {
        if (!subTaskId) throw new Error('SubTaskId should not be empty!');
        res = await fetch(`${API_DOMAIN}/${UPDATE_AND_DELETE}/${subTaskId}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedProps),
        });
        data = await res.json();
        message = 'SubTask Patch successful!';
    } catch (err) {
        console.error(err);
        message = err instanceof Error ? err.message : 'Patch SubTask Properties went wrong.';
    }

    if (!res || !res.ok) {
        return { isSuccess: false, message };
    }
    return { isSuccess: true, message };
}

export async function deleteSubTask(subTaskId: string) {
    let res;
    let message;
    try {
        res = await fetch(`${API_DOMAIN}/${UPDATE_AND_DELETE}/${subTaskId}`, {
            method: 'DELETE',
        });

        const data = await res.json();
        message = 'Deleting SubTask successful!';
    } catch (err) {
        console.error(err);
        message = err instanceof Error ? err.message : 'Deleting SubTask went wrong!';
    }

    if (!res || !res.ok) {
        return { isSuccess: false, message };
    }
    return { isSuccess: true, message };
}
