import { MongoClient } from "mongodb";
import { Task } from "../../models/task-models/Task";

export async function getAllWeeklyTasks (client: MongoClient, userId: string) {
	const db = client.db();
	const data = await db.collection("weekly-tasks").find({ userId }).toArray();
	return data;
}

export async function insertTask (client: MongoClient, collection: string, task: Task) {
	const db = client.db();
	const res = await db.collection(collection).insertOne(task);
	return res;
}
