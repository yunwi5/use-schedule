import type {NextApiRequest, NextApiResponse} from 'next';
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

import { connectDatabase } from "../../../utilities/mongodb-util/mongodb-util";
import { getTasks, insertTask } from "../../../utilities/mongodb-util/planner-util";
import { convertToTasks } from "../../../utilities/tasks-utils/task-util";

type Data =
	| { message: string }
	| { tasks: any[]; message: string }
	| { insertedId: any; message: string };

export default withApiAuthRequired(async function handler (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const session = getSession(req, res);
	if (!session) {
		return res.status(400).json({ message: "User not found" });
	}

	const userId = session.user.sub;

	let collection = req.query.collection;
	if (Array.isArray(collection)) collection = collection.join("");

	let client;
	try {
		client = await connectDatabase();
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Could not connect to DB" });
	}

	// Handle GET request
	if (req.method === "GET") {
		let q = req.query.q; // Search query
		if (Array.isArray(q)) q = q.join("");

		let tasks;
		try {
			let result = await getTasks(client, collection, userId, q);
			tasks = convertToTasks(result);
		} catch (err) {
			console.error(err);
			client.close();
			return res.status(500).json({ message: "Get weekly tasks failed" });
		}
		res.status(200).json({ tasks: tasks, message: "Get weekly tasks successful!" });
		
	} else if (req.method === "POST") {
		// Handle POST request
		const taskToAdd = req.body;
		delete taskToAdd["id"];
		let result;
		try {
			result = await insertTask(client, collection, taskToAdd);
			console.log("result:", result);
		} catch (err) {
			console.error(err);
			client.close();
			return res.status(500).json({ message: "Inserting weekly task went wrong." });
		}
		res
			.status(201)
			.json({ insertedId: result.insertedId, message: "Inserting weekly task successful!" });
	}

	client.close();
});
