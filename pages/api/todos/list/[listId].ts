import { TodoList } from "./../../../../models/todo-models/TodoList";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";

import { connectDatabase } from "../../../../db/mongodb-util";
import {
    deleteTodoList,
    getTodoListAndItems,
    updateTodoListProps,
} from "../../../../db/todos-util";
import { Todo } from "../../../../models/todo-models/Todo";
import { convertToTodoList, convertToTodos } from "../../../../utilities/todos-utils/todo-util";
import { validateTodoListProps } from "../../../../schemas/validation";

type Data = { message: string } | { list: TodoList | null; todos: Todo[] };

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = getSession(req, res);

    if (!session) {
        return res.status(400).json({ message: "User not found" });
    }

    const { listId: initialId } = req.query;
    const listId = Array.isArray(initialId) ? initialId.join("") : initialId;

    let client;
    try {
        client = await connectDatabase();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Could not connect to DB" });
    }

    if (req.method === "GET") {
        let list: TodoList | null, todos: Todo[];
        try {
            const [listRes, todosRes] = await getTodoListAndItems(client, listId);
            list = convertToTodoList(listRes);
            todos = convertToTodos(todosRes);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Getting todo list did not work.";
            client.close();
            return res.status(500).json({ message });
        }

        res.status(200).json({ list, todos });
    } else if (req.method === "PATCH") {
        const updatedListProps = req.body;

        const { isValid, message } = validateTodoListProps(updatedListProps);
        if (!isValid) {
            client.close();
            return res.status(400).json({ message });
        }

        let result;
        try {
            result = await updateTodoListProps(client, listId, updatedListProps);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Patching todo list did not work.";
            client.close();
            return res.status(500).json({ message });
        }
        res.status(200).json({ message: "Updating todo list successful!" });
    } else if (req.method === "DELETE") {
        let result;
        try {
            result = await deleteTodoList(client, listId);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Deleting todo list did not work.";
            client.close();
            return res.status(500).json({ message });
        }
        res.status(200).json({ message: "Deleting todo list successful!" });
    } else {
        res.status(405).json({ message: "Request method not allowed." });
    }

    client.close();
}

export default handler;
