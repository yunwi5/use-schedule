import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { MongoClient } from "mongodb";

import { connectDatabase } from "../../../../utilities/mongodb-util/mongodb-util";
import { updateTaskProperties } from "../../../../utilities/mongodb-util/tasks-util";
import { validateTaskProps } from "../../../../schemas/schema-validate";

type Data = { message: string };

export default withApiAuthRequired(async function handler (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	let taskId = req.query.taskId;
	if (Array.isArray(taskId)) taskId = taskId.join("");

	let client: MongoClient;
	try {
		client = await connectDatabase();
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Could not connect to DB" });
	}

	if (req.method === "PATCH") {
		// Client needs to send collection name and new status!
		const { updateProps, collection } = req.body;
		console.log(`new updateProps:`, updateProps);

		const { isValid, message } = validateTaskProps(updateProps);
		if (!isValid) {
			client.close();
			return res.status(415).json({ message });
		}

		let result;
		try {
			result = await updateTaskProperties(client, collection, taskId, updateProps);
		} catch (err) {
			console.error(err);
			client.close();
			return res.status(500).json({ message: "Updating task went wrong!" });
		}
		res.status(201).json({ message: "Status Update successful" });
	} else {
		res.status(403).json({ message: "Method forbidden" });
	}

	client.close();
});
