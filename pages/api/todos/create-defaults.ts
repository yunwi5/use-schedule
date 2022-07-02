import { getSession } from '@auth0/nextjs-auth0';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';

import { connectDatabase } from '../../../db/mongodb-config';
import { getAllTodoLists, insertManyTodoLists } from '../../../db/todos';
import { InitialDefaultTodoLists, NoIdTodoList } from '../../../models/todo-models/TodoList';
import { hasDefaultTodoLists } from '../../../utilities/todos-utils/default-todo-list';
import {
    convertToTodoList,
    convertToTodoListArray,
} from '../../../utilities/todos-utils/todo-util';

type Data = { message: string };

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = getSession(req, res);
    const userId = session?.user.sub;
    if (!session || !userId) {
        return res.status(404).json({ message: 'User not found' });
    }

    let client: MongoClient;
    try {
        client = await connectDatabase();
    } catch (err) {
        return res.status(500).json({ message: 'Connect to database did not work.' });
    }

    const userDefaultTodoLists: NoIdTodoList[] = InitialDefaultTodoLists.map((list) => ({
        ...list,
        userId,
    }));

    if (req.method === 'POST' || req.method === 'GET') {
        const existingTodoLists = await getAllTodoLists(client, userId);
        const hasDefault = hasDefaultTodoLists(convertToTodoListArray(existingTodoLists));
        if (hasDefault) {
            client.close();
            return res.status(200).json({ message: 'User already has default todo lists' });
        }

        try {
            const result = await insertManyTodoLists(client, userDefaultTodoLists);
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'Inserting default todo lists did not work.';
            client.close();
            return res.status(500).json({ message });
        }
        res.status(201).json({ message: 'Inserting default todo lists successful' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
    client.close();
}

export default handler;
