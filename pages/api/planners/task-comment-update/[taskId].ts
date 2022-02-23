import type {NextApiRequest, NextApiResponse} from 'next';
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {MongoClient } from 'mongodb';

import { connectDatabase } from "../../../../utilities/mongodb-util/mongodb-util";
import { updateTaskComment } from "../../../../utilities/mongodb-util/planner-util";

type Data = { message: string };

export default withApiAuthRequired( async function handler (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	let taskId = req.query.taskId;
    if (Array.isArray(taskId)) taskId = taskId.join('');

	let client: MongoClient;
	try {
		client = await connectDatabase();
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Could not connect to DB" });
	}

	if (req.method === "PATCH") {
        // Client needs to send collection name and new status!
		const {comment, collection} = req.body;
        console.log(`new comment: ${comment}`);
		let result;
		try {
			result = await updateTaskComment(client, collection, taskId, comment);
        } catch (err) {
			console.error(err);
			client.close();
			return res.status(500).json({ message: "Updating task comment went wrong!" });
		}
		res.status(201).json({ message: "Status Update comment successful" });
	}  else {
		res.status(403).json({ message: "Method forbidden" });
	}

	client.close();
});
