import { getSession } from "@auth0/nextjs-auth0";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "../../../../utilities/mongodb-util/mongodb-util";
import { deleteSubTodo, updateSubTodo } from "../../../../utilities/mongodb-util/todos-util";

type Data = { message: string };

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = getSession(req, res);
    if (!session) {
        return res.status(400).json({ message: "User not found" });
    }

    let client: MongoClient;
    try {
        client = await connectDatabase();
    } catch (err) {
        const message = err instanceof Error ? err.message : "Connect to database did not work.";
        return res.status(500).json({ message });
    }

    const { subTodoId: initialId } = req.query;
    const subTodoId = Array.isArray(initialId) ? initialId.join("") : initialId;

    if (req.method === "PATCH") {
        const subTodoProps = req.body;
        try {
            let result = await updateSubTodo(client, subTodoId, subTodoProps);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Patching sub todo did not work.";
            client.close();
            return res.status(500).json({ message });
        }
    } else if (req.method === "DELETE") {
        try {
            let result = await deleteSubTodo(client, subTodoId);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Deleting sub todo did not work.";
            client.close();
            return res.status(500).json({ message });
        }
    }
    client.close();
    res.status(200).json({ message: "Success" });
}

export default handler;
