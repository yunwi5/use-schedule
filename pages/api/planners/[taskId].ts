import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { MongoClient } from 'mongodb';

import { connectDatabase } from '../../../db/mongodb-config';
import { deleteTask, replaceTask } from '../../../db/tasks-util';
import { validateTask } from '../../../schemas/validation';

type Data = { message: string };

export default withApiAuthRequired(async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    let taskId = req.query.taskId;
    let collection = req.query.collection;
    if (Array.isArray(taskId)) taskId = taskId.join('');
    if (Array.isArray(collection)) collection = collection.join('');

    if (!taskId || !collection) {
        return res
            .status(404)
            .json({ message: 'Task id or collection name cannot be found.' });
    }

    let client: MongoClient;
    try {
        client = await connectDatabase();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Could not connect to DB' });
    }

    if (req.method === 'PUT') {
        const taskObj = req.body;

        const { isValid, message } = validateTask(taskObj);
        console.log(`isValid: ${isValid}, ${message}`);
        if (!isValid) {
            client.close();
            return res.status(415).json({ message });
        }

        let result;
        try {
            result = await replaceTask(client, collection, taskObj);
        } catch (err) {
            console.error(err);
            client.close();
            return res.status(500).json({ message: 'Updating task went wrong!' });
        }
        res.status(201).json({ message: 'Update successful' });
    } else if (req.method === 'DELETE') {
        let result;
        try {
            result = await deleteTask(client, collection, taskId);
        } catch (err) {
            console.error(err);
            client.close();
            return res.status(500).json({ message: 'Delete task went wrong!' });
        }
        res.status(201).json({ message: 'Delete task successful!' });
    } else {
        res.status(403).json({ message: 'Method forbidden' });
    }

    client.close();
});
