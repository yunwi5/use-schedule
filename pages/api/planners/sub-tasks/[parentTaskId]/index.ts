import { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { MongoClient } from "mongodb";

import { SubTask } from "../../../../../models/task-models/SubTask";
import { connectDatabase } from "../../../../../utilities/mongodb-util/mongodb-util";
import { getSubTasks, insertSubTask } from "../../../../../utilities/mongodb-util/subtask-util";
import { SubTaskCollection } from "../../../../../utilities/mongodb-util/mongodb-constant";
import { covertToSubTasks } from "../../../../../utilities/tasks-utils/task-util";
import { validateSubTask } from "../../../../../schemas/schema-validate";

type Data =
	| { message: string }
	| { message: string; insertedId: string }
	| { message: string; subTasks: SubTask[] };

export default withApiAuthRequired(async function handler (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const session = getSession(req, res);
	if (!session) {
		return res.status(400).json({ message: "User not found" });
	}

	const { parentTaskId: initialParentTaskId, collection: initialCollection } = req.query;
	let parentTaskId = Array.isArray(initialParentTaskId)
		? initialParentTaskId.join("")
		: initialParentTaskId;

	let collection = Array.isArray(initialCollection)
		? initialCollection.join("")
		: initialCollection;
	if (!collection) collection = SubTaskCollection; // Default collection is SubTaskCollection

	let client: MongoClient;
	try {
		client = await connectDatabase();
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Could not connect to database" });
	}

	// Handle GET request
	if (req.method === "GET") {
		let data: SubTask[];
		try {
			let result = await getSubTasks(client, collection, parentTaskId);
			data = covertToSubTasks(result);
		} catch (err) {
			console.error(err);
			client.close();
			return res.status(500).json({ message: "Getting subTasks did not work." });
		}

		res.status(200).json({ message: "Getting subTasks successful!", subTasks: data });
	} else if (req.method === "POST") {
		const subTask = req.body;
		delete subTask["id"];
		subTask.parentTaskId = parentTaskId; // Double check

		const { isValid, message } = validateSubTask(subTask);
		// console.log(`isValid: ${isValid}, message: ${message}`);
		if (!isValid) {
			client.close();
			return res.status(400).json({ message });
		}

		let result;
		try {
			result = await insertSubTask(client, collection, subTask); // client, collection, subtask
		} catch (err) {
			console.error(err);
			client.close();
			return res.status(500).json({ message: "Inserting subTask item did not work." });
		}

		res.status(201).json({
			message: "Successfully post a new subTask!",
			insertedId: result.insertedId.toString()
		});
	} else {
		return res.status(403).json({ message: "Invalid request method." });
	}

	client.close();
});
