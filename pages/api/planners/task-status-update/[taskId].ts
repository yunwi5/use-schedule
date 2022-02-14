import type {NextApiRequest, NextApiResponse} from 'next';
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {MongoClient } from 'mongodb';

import { connectDatabase } from "../../../../utilities/mongodb-util/mongodb-util";
import { updateTaskStatus } from "../../../../utilities/mongodb-util/planner-util";

type Data = { message: string };

export default async function handler (
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
		const {status, collection} = req.body;
        console.log(`new status: ${status}`);
		let result;
		try {
			result = await updateTaskStatus(client, collection, taskId, status);
        } catch (err) {
			console.error(err);
			client.close();
			return res.status(500).json({ message: "Updating task went wrong!" });
		}
		res.status(201).json({ message: "Status Update successful" });
	}  else {
		res.status(403).json({ message: "Method forbidden" });
	}

	client.close();
};
