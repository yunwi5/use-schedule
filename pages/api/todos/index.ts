import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next/types";

import { Todo } from "../../../models/todo-models/Todo";
import { connectDatabase } from "../../../db/mongodb-util";
import { getTodoItemsByUser } from "../../../db/todos-util";
import { convertToTodos } from "../../../utilities/todos-utils/todo-util";

type Data = { message: string } | { todos: Todo[] };

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = getSession(req, res);

    if (!session) {
        return res.status(404).json({ message: "User not found" });
    }

    const client = await connectDatabase();
    const userId = session.user.sub;

    if (req.method === "GET") {
        let todos: Todo[];
        try {
            let result = await getTodoItemsByUser(client, userId);
            todos = convertToTodos(result);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Gettng all todos did not work.";
            client.close();
            return res.status(500).json({ message });
        }
        res.status(200).json({ todos });
    } else {
        res.status(405).json({ message: "Method not allowed." });
    }
    client.close();
}

export default handler;
