import { TodoList } from "./../../../../models/todo-models/TodoList";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";

import { connectDatabase } from "../../../../utilities/mongodb-util/mongodb-util";
import { postTodo } from "../../../../utilities/mongodb-util/todos-util";

type Data = { message: string } | { message: string; insertedId: string };

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = getSession(req, res);

    if (!session) {
        return res.status(400).json({ message: "User not found" });
    }

    const userId = session.user.sub;

    let client;
    try {
        client = await connectDatabase();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Could not connect to DB" });
    }

    if (req.method === "POST") {
        // Need to add validation soon

        const newTodo = req.body;
        console.log("newTodo:", newTodo);
        // Just in case if the parsed date is not type Date
        if (newTodo.dateTime) newTodo.dateTime = new Date(newTodo.dateTime.toString());
        let result;
        try {
            result = await postTodo(client, newTodo);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Inserting new todo did not work.";
            client.close();
            return res.status(500).json({ message });
        }
        console.log(result);
        res.status(201).json({
            message: "Inserting new todo successful",
            insertedId: result.insertedId.toString(),
        });
    } else {
        res.status(405).json({ message: "Request method not allowed." });
    }

    client.close();
}

export default handler;
