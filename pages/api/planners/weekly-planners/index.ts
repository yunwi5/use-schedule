import type {NextApiRequest, NextApiResponse} from 'next';
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { connectDatabase } from "../../../../utilities/mongodb-util/mongodb-util";
import { getTasks } from "../../../../utilities/mongodb-util/planner-util";
import { Task } from "../../../../models/task-models/Task";
import { convertToTasks } from "../../../../utilities/tasks-utils/task-util";

type Data = {message: string} | {tasks: any[], message: string};

const CollectionName = "weekly-tasks";

export default withApiAuthRequired(async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
	const session = getSession(req, res);
	if (!session) {
		return res.status(400).json({ message: "User not found" });
	}
	if (req.method !== "GET") {
		return res.status(403).json({ message: "Request method not allowed" });
	}
	const userId = session.user.sub;

    let client;
    try {       
        client = await connectDatabase();
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Could not connect to DB'});
    }

	let weeklyTasks;
	try {
		let result = await getTasks(client, CollectionName, userId);
        weeklyTasks = convertToTasks(result);
	} catch (err) {
		console.error(err);
		client.close();
		return res.status(500).json({ message: "Get weekly tasks failed" });
	}
	console.log("weekly tasks in api:", weeklyTasks);
	res.status(200).json({ tasks: weeklyTasks, message: "Get weekly tasks successful!" });

	client.close();
});
