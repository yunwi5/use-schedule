import { TodoList } from './../../../../models/todo-models/TodoList';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

import { connectDatabase } from '../../../../db/mongodb-config';
import { getAllUserTodoLists, insertTodoList } from '../../../../db/todos';
import { convertToTodoListArray } from '../../../../utilities/todos-utils/todo-util';
import { validateTodoList } from '../../../../schemas/validation';

type Data =
    | { message: string }
    | { message: string; insertedId: string }
    | { message: string; lists: TodoList[] };

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = getSession(req, res);

    if (!session) {
        return res.status(400).json({ message: 'User not found' });
    }

    const userId = session.user.sub;

    let client;
    try {
        client = await connectDatabase();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Could not connect to DB' });
    }

    if (req.method === 'GET') {
        let todoListArray: TodoList[];
        try {
            let result: any[] = await getAllUserTodoLists(client, userId);
            todoListArray = convertToTodoListArray(result);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Getting user todo lists did not work.';
            client.close();
            return res.status(500).json({ message });
        }
        res.status(200).json({
            lists: todoListArray,
            message: 'Getting todo lists successful!',
        });
    } else if (req.method === 'POST') {
        const newTodoList: TodoList = req.body;

        const { isValid, message } = validateTodoList(newTodoList);
        if (!isValid) {
            client.close();
            return res.status(400).json({ message });
        }

        let result;
        try {
            result = await insertTodoList(client, newTodoList);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Inserting todo list did not work.';
            client.close();
            return res.status(500).json({ message });
        }
        res.status(201).json({
            message: 'Inserting todo list successful!',
            insertedId: result.insertedId.toString(),
        });
    } else {
        res.status(405).json({ message: 'Request method not allowed.' });
    }

    client.close();
}

export default handler;
