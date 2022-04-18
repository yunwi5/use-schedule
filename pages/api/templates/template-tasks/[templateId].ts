import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import { getTemplateTasksById } from "../../../../db/template-util";
import { connectDatabase } from "../../../../db/mongodb-util";
import { convertToTasks } from "../../../../utilities/tasks-utils/task-util";
import { Task } from "../../../../models/task-models/Task";

type Data = { message: string; tasks?: Task[] };

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { templateId: initialId } = req.query;
    const templateId = Array.isArray(initialId) ? initialId.join("") : initialId;

    let client: MongoClient;
    try {
        client = await connectDatabase();
    } catch (err) {
        let message = err instanceof Error ? err.message : "Connect to database did not work.";
        console.log(message);
        return res.status(500).json({ message });
    }

    if (req.method === "GET") {
        let result, message, tasks: Task[];
        try {
            result = await getTemplateTasksById(client, templateId);
            tasks = convertToTasks(result);
        } catch (err) {
            message = err instanceof Error ? err.message : "GET template tasks by id did not work.";
            client.close();
            return res.status(500).json({ message });
        }
        res.status(200).json({ message: "GET template tasks successful!", tasks });
    } else {
        res.status(405).json({ message: "Method is not allowed for this api" });
    }
    client.close();
}

export default handler;
