import { MongoClient, ObjectId } from "mongodb";
import { NoIdSubTask, SubTask } from "../models/task-models/SubTask";

export async function getSubTasks(client: MongoClient, collection: string, parentTaskId: string) {
    const db = client.db();
    const data = await db.collection(collection).find({ parentTaskId }).toArray();
    return data;
}

export async function insertSubTask(client: MongoClient, collection: string, subTask: SubTask) {
    const db = client.db();
    const res = await db.collection(collection).insertOne(subTask);
    return res;
}

export async function insertManySubTasks(
    client: MongoClient,
    collection: string,
    subTasks: NoIdSubTask[],
) {
    if (!subTasks || subTasks.length === 0) return;
    const db = client.db();
    const res = await db.collection(collection).insertMany(subTasks);
    return res;
}

export async function updateSubTaskProps(
    client: MongoClient,
    collection: string,
    subTaskId: string,
    updateProps: object,
) {
    const db = client.db();
    const res = await db
        .collection(collection)
        .findOneAndUpdate({ _id: new ObjectId(subTaskId) }, { $set: updateProps });
    return res;
}

export async function deleteSubTask(client: MongoClient, collection: string, subTaskId: string) {
    const db = client.db();
    const res = await db.collection(collection).findOneAndDelete({ _id: new ObjectId(subTaskId) });
    return res;
}

// Confirm it is Working.
export async function deleteAllSubTasksOfParent(
    client: MongoClient,
    collection: string,
    parentTaskId: string,
) {
    const db = client.db();
    const res = await db.collection(collection).deleteMany({ parentTaskId });
    return res;
}
