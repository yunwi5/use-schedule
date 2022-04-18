import { getSession } from "@auth0/nextjs-auth0";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "../../../../db/mongodb-util";
import { insertSubTodo, updateSubTodo } from "../../../../db/todos-util";

type Data = { message: string } | { message: string; insertedId: string };

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

    if (req.method === "POST") {
        const newSubTodo = req.body;
        let result;
        try {
            result = await insertSubTodo(client, newSubTodo);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Inserting sub todo did not work.";
            client.close();
            return res.status(500).json({ message });
        }
        res.status(201).json({
            message: "Inserting sub todo successful",
            insertedId: result.insertedId.toString(),
        });
    } else {
        res.status(405).json({ message: "Request method not allowed." });
    }
    client.close();
}

export default handler;
