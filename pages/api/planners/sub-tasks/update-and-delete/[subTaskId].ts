import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

import { connectDatabase } from '../../../../../db/mongodb-util';
import { deleteSubTask, updateSubTaskProps } from '../../../../../db/subtask-util';
import { SubTaskCollection } from '../../../../../db/collections';
import { validateSubTaskProps } from '../../../../../schemas/validation';

export default withApiAuthRequired(async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const session = getSession(req, res);
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized. You need to login first.' });
    }

    const { subTaskId: initialSubTaskId, collection: initialCollection } = req.query;
    if (!initialSubTaskId) {
        return res.status(404).json({ message: 'Your subTaskId cannot be found.' });
    }
    const subTaskId = Array.isArray(initialSubTaskId)
        ? initialSubTaskId.join('')
        : initialSubTaskId;

    let collection = Array.isArray(initialCollection)
        ? initialCollection.join('')
        : initialCollection;
    if (!collection) collection = SubTaskCollection; // Default collection is SubTaskCollection

    let client: MongoClient;
    try {
        client = await connectDatabase();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Could not connect to database' });
    }

    if (req.method === 'PATCH') {
        const updateProps = JSON.parse(req.body);
        let result, message: string;

        const { isValid, message: validationMessage } = validateSubTaskProps(updateProps);
        if (!isValid) {
            client.close();
            return res.status(400).json({ message: validationMessage });
        }

        try {
            result = await updateSubTaskProps(client, collection, subTaskId, updateProps);
            // console.log("Patch subTask result:", result);
        } catch (err) {
            message = err instanceof Error ? err.message : 'Patching subTask did not work.';
            return res.status(500).json({ message });
        }

        res.status(201).json({ message: 'Patching subTask successful!' });
    } else if (req.method === 'DELETE') {
        let result;
        try {
            result = await deleteSubTask(client, collection, subTaskId);
            // console.log("Delete result:", result);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Deleting subTask did not work.' });
        }

        res.status(200).json({ message: 'Deleting subTask successful!' });
    }

    client.close();
});
