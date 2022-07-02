import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

import { connectDatabase } from '../../../db/mongodb-config';
import { getTasks, insertManyTasks, insertTask } from '../../../db/tasks-util';
import { convertToTasks } from '../../../utilities/tasks-utils/task-util';
import { validateTask } from '../../../schemas/validation';
import { getTasksFromAllCollection } from '../../../db/pages-util';

type Data =
    | { message: string }
    | { tasks: any[]; message: string }
    | { insertedId: any; message: string }
    | { insertedCount: number; message: string };

export default withApiAuthRequired(async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const session = getSession(req, res);
    if (!session) {
        return res.status(400).json({ message: 'User not found' });
    }

    const userId = session.user.sub;

    let collection = req.query.collection;
    if (Array.isArray(collection)) collection = collection.join('');

    let client;
    try {
        client = await connectDatabase();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Could not connect to DB' });
    }

    // Handle GET request
    if (req.method === 'GET') {
        let q = req.query.q; // Search query
        if (Array.isArray(q)) q = q.join('');

        let tasks = [];
        try {
            let result;
            if (!collection || collection === 'any' || collection === 'all') {
                // Get task from all collections which are weekly, montly and yearly
                const [wTaskDoc, mTaskDoc, yTaskDoc] = await getTasksFromAllCollection(
                    userId,
                    q,
                );
                result = [...wTaskDoc, ...mTaskDoc, ...yTaskDoc];
            } else {
                result = await getTasks(client, collection, userId, q);
            }
            tasks = convertToTasks(result);
        } catch (err) {
            console.error(err);
            client.close();
            return res.status(500).json({ message: 'Get weekly tasks failed' });
        }
        res.status(200).json({ tasks: tasks, message: 'Get weekly tasks successful!' });
    } else if (req.method === 'POST') {
        // Handle POST request
        const newTask = req.body;
        if (!Array.isArray(newTask)) {
            delete newTask['id'];
            const { isValid, message } = validateTask(newTask);
            if (!isValid) {
                client.close();
                return res.status(415).json({ message });
            }
        }

        if (!Array.isArray(newTask)) {
            let result;
            try {
                result = await insertTask(collection, newTask);
            } catch (err) {
                console.error(err);
                client.close();
                return res.status(500).json({ message: 'Inserting weekly task went wrong.' });
            }
            res.status(201).json({
                insertedId: result.insertedId,
                message: 'Inserting weekly task successful!',
            });
        } else {
            let result;
            try {
                result = await insertManyTasks(client, collection, newTask);
            } catch (err) {
                console.error(err);
                client.close();
                return res.status(500).json({ message: 'Inserting weekly task went wrong.' });
            }
            res.status(201).json({
                insertedCount: result.insertedCount,
                message: 'Inserting weekly task successful!',
            });
        }
    }
    client.close();
});
