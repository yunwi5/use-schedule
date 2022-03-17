import { MongoClient, ObjectId } from "mongodb";
import { SubTask } from "../../models/task-models/SubTask";

export async function insertSubTask (client: MongoClient, collection: string, subTask: SubTask) {
	const db = client.db();
	const res = await db.collection(collection).insertOne(subTask);
	return res;
}

export async function getSubTasks (client: MongoClient, collection: string, parentTaskId: string) {
	const db = client.db();
	const data = await db.collection(collection).find({ parentTaskId }).toArray();
	return data;
}
