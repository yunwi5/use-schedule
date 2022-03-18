import { MongoClient, ObjectId } from "mongodb";

import { Task } from "../../models/task-models/Task";
import { TaskProperties } from "../../models/task-models/TaskProperties";

export async function getTasks (
	client: MongoClient,
	collection: string,
	userId: string,
	search: string = ""
) {
	const db = client.db();

	const searchQuery = ".*" + search + ".*"; //ex) /.*son.*/i
	const searchRegex = new RegExp(searchQuery, "i");

	const data = await db.collection(collection).find({ userId, name: searchRegex }).toArray();
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

	console.log("collection:", collection);

	const res = await db
		.collection(collection)
		.replaceOne({ _id: new ObjectId(task.id) }, taskObjToSend);

	console.log("Replace result:", res);
	return res;

	// 6205f31dce78eeca70b1eb65
	// 6205f31dce78eeca70b1eb65
}

export async function deleteTask (client: MongoClient, collection: string, taskId: string) {
	const db = client.db();
	const res = await db.collection(collection).deleteOne({ _id: new ObjectId(taskId) });

	console.log("Delete result:", res);
	return res;
}

export async function updateTaskProperties (
	client: MongoClient,
	collection: string,
	taskId: string,
	updateProps: TaskProperties
) {
	const db = client.db();
	const res = await db
		.collection(collection)
		.updateOne({ _id: new ObjectId(taskId) }, { $set: { ...updateProps } });

	console.log("Update properties result:", res);
	return res;
}

// Replaced by updateTaskProperties
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

// Replaced by updateTaskProperties
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
