import { MongoClient, ObjectId } from 'mongodb';

import { SubTaskCollection } from './mongodb-constant';
import { NoIdTask, Task } from '../models/task-models/Task';
import { TaskProperties } from '../models/task-models/TaskProperties';
import { deleteAllSubTasksOfParent } from './subtask-util';
import { clientPromise } from './mongodb-util';

export async function getTasks(
    client: MongoClient,
    collection: string,
    userId: string,
    search: string = '',
) {
    const db = client.db();

    const searchQuery = '.*' + search + '.*'; //ex) /.*son.*/i
    const searchRegex = new RegExp(searchQuery, 'i');

    const data = await db.collection(collection).find({ userId, name: searchRegex }).toArray();
    return data;
}

export async function insertTask(collection: string, task: Task | NoIdTask) {
    const client = await clientPromise;
    const db = client.db();
    const res = await db.collection(collection).insertOne(task);
    return res;
}

export async function insertManyTasks(collection: string, tasks: Task[]) {
    const client = await clientPromise;
    const db = client.db();
    const res = await db.collection(collection).insertMany(tasks);
    return res;
}

export async function replaceTask(client: MongoClient, collection: string, task: Task) {
    const db = client.db();

    const taskObjToSend: { id?: string } = { ...task };
    delete taskObjToSend.id;

    console.log('collection:', collection);

    const res = await db
        .collection(collection)
        .replaceOne({ _id: new ObjectId(task.id) }, taskObjToSend);

    console.log('Replace result:', res);
    return res;
}

export async function updateTaskProperties(
    client: MongoClient,
    collection: string,
    taskId: string,
    updateProps: TaskProperties,
) {
    const db = client.db();
    const res = await db
        .collection(collection)
        .updateOne({ _id: new ObjectId(taskId) }, { $set: { ...updateProps } });

    console.log('Update properties result:', res);
    return res;
}

export async function deleteTask(client: MongoClient, collection: string, taskId: string) {
    const db = client.db();
    const res = await db.collection(collection).deleteOne({ _id: new ObjectId(taskId) });

    await deleteAllSubTasksOfParent(client, SubTaskCollection, taskId); // Delete all of its subtasks

    return res;
}
