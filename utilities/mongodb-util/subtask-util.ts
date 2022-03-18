import { MongoClient, ObjectId } from "mongodb";
import { SubTask } from "../../models/task-models/SubTask";
import { SubTaskCollection } from "./mongodb-constant";

export async function getSubTasks (client: MongoClient, collection: string, parentTaskId: string) {
	const db = client.db();
	const data = await db.collection(collection).find({ parentTaskId }).toArray();
	return data;
}

export async function insertSubTask (client: MongoClient, collection: string, subTask: SubTask) {
	const db = client.db();
	const res = await db.collection(collection).insertOne(subTask);
	return res;
}

export async function updateSubTaskProps (
	client: MongoClient,
	collection: string,
	subTaskId: string,
	updateProps: object
) {
	const db = client.db();
	const res = await db
		.collection(collection)
		.findOneAndUpdate({ _id: new ObjectId(subTaskId) }, { $set: updateProps });
	return res;
}

export async function deleteSubTask (client: MongoClient, collection: string, subTaskId: string) {
	const db = client.db();
	const res = await db.collection(collection).findOneAndDelete({ _id: new ObjectId(subTaskId) });
	return res;
}

// Confirm it is Working.
export async function deleteAllSubTasksOfParent (client: MongoClient, parentTaskId: string) {
	const db = client.db();
	const res = await db.collection(SubTaskCollection).deleteMany({ parentTaskId });
	console.log("Delete Many:", res);
	return res;
}
