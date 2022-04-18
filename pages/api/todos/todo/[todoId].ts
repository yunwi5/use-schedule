import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";

import { connectDatabase } from "../../../../db/mongodb-util";
import { deleteTodo, getSubTodos, updateTodo } from "../../../../db/todos-util";
import { TodoProps } from "../../../../models/todo-models/Todo";
import { SubTodo } from "../../../../models/todo-models/SubTodo";
import { convertToAppObjectList } from "../../../../utilities/gen-utils/object-util";

type Data = { message: string } | { message: string; subTodos: SubTodo[] };

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = getSession(req, res);

    if (!session) {
        return res.status(400).json({ message: "User not found" });
    }

    const { todoId: initialId } = req.query;
    const todoId = Array.isArray(initialId) ? initialId.join("") : initialId;

    let client;
    try {
        client = await connectDatabase();
    } catch (err) {
        return res.status(500).json({ message: "Could not connect to DB" });
    }

    if (req.method === "GET") {
        // Get all subTodos
        let subTodos: SubTodo[] = [];
        try {
            const result = await getSubTodos(client, todoId);
            subTodos = convertToAppObjectList(result);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Getting sub todos did not work.";
            client.close();
            return res.status(500).json({ message });
        }
        res.status(200).json({ subTodos, message: "Getting sub todos successful" });
    } else if (req.method === "PATCH") {
        // Needs validation here
        const updatedTodoProps: TodoProps = req.body;
        try {
            let result = await updateTodo(client, todoId, updatedTodoProps);
            // console.log(result);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Patching todo item did not work.";
            client.close();
            return res.status(500).json({ message });
        }
        res.status(200).json({ message: "Updating todo item successful" });
    } else if (req.method === "DELETE") {
        try {
            let result = await deleteTodo(client, todoId);
            console.log("Delete result:", result);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Deleting todo item did not work.";
            client.close();
            return res.status(500).json({ message });
        }
        res.status(200).json({ message: "Deleting todo item successful" });
    } else {
        res.status(405).json({ message: "Request method not allowed." });
    }

    client.close();
}

export default handler;
