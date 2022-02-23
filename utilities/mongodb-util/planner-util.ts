import { MongoClient, ObjectId } from "mongodb";
import { Task } from "../../models/task-models/Task";

export async function getTasks (client: MongoClient, collection: string, userId: string) {
	const db = client.db();
	const data = await db.collection(collection).find({ userId }).toArray();
	return data;
}

export async function insertTask (client: MongoClient, collection: string, task: Task) {
	const db = client.db();
	const res = await db.collection(collection).insertOne(task);
	return res;
}

export async function replaceTask (client: MongoClient, collection: string, task: Task) {
	const db = client.db();

	const taskObjToSend: { id?: string } = { ...task };
	delete taskObjToSend.id;

	const res = await db
		.collection(collection)
		.replaceOne({ _id: new ObjectId(task.id) }, taskObjToSend);
	console.log("Replace result:", res);
	return res;
}

export async function deleteTask (client: MongoClient, collection: string, taskId: string) {
	const db = client.db();
	const res = await db.collection(collection).deleteOne({ _id: new ObjectId(taskId) });

	console.log("Delete result:", res);
	return res;
}

export async function updateTaskStatus (
	client: MongoClient,
	collection: string,
	taskId: string,
	newStatus: string
) {
	const db = client.db();
	const res = await db.collection(collection).updateOne(
		{ _id: new ObjectId(taskId) },
		{
			$set: {
				status: newStatus
			}
		}
	);
	console.log("Update result:", res);
	return res;
}

export async function updateTaskComment (
	client: MongoClient,
	collection: string,
	taskId: string,
	newComment: string
) {
	const db = client.db();
	const res = await db
		.collection(collection)
		.updateOne({ _id: new ObjectId(taskId) }, { $set: { comment: newComment } });

	console.log("Update result:", res);
	return res;
}
