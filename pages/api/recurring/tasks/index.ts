import { getSession } from '@auth0/nextjs-auth0';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../../db/mongodb-util';
import {
    getRecurringTasks,
    insertRecurringTask,
    updateRecurringTaskProps,
} from '../../../../db/recurring-items';
import { insertManyTasks } from '../../../../db/tasks-util';
import { RecurringTask } from '../../../../models/recurring-models/RecurringTask';
import { NoIdTask } from '../../../../models/task-models/Task';
import { convertToAppObjectList } from '../../../../utilities/gen-utils/object-util';
import { getPlannerCollection } from '../../../../utilities/tasks-utils/task-util';

type Data = { message: string } | { message: string; insertedId: string } | RecurringTask[];

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

    if (req.method === 'POST') {
        // no id yet
        const newRecTask = req.body;

        let result;
        try {
            result = await insertRecurringTask(client, newRecTask);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Inserting recurring task did not work.';
            console.error(message);
            client.close();
            return res.status(500).json({ message });
        }
        const insertedId: string = result.insertedId.toString();
        console.log(`recTask insertedId: ${insertedId}`);

        const recTask = new RecurringTask(newRecTask, insertedId);
        const generatedTasks: NoIdTask[] = recTask.produceOneOffTasks();

        console.log(`Generated tasks: ${generatedTasks.length}`);

        // add bunch of generated tasks to tasks collections
        // then update last recurred (last added) date of this recurring task object
        try {
            const collection = getPlannerCollection(recTask.plannerType);
            const insertManyPromise = insertManyTasks(client, collection, generatedTasks);
            const propUpdatePromise = updateRecurringTaskProps(client, recTask.id, {
                lastRecurred: recTask.lastRecurred,
            });

            const [insertManyResult, propUpdateResult] = await Promise.all([
                insertManyPromise,
                propUpdatePromise,
            ]);

            console.log(`generated tasks insertion result: ${insertManyResult}`);
            console.log(propUpdateResult);
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'Inserting generated recurring tasks and then updating last recurring date of the recurring task did not work.';
            console.error(message);
        }
        res.status(201).json({ message: 'Inserting recurring tasks successful', insertedId });
    } else if (req.method === 'GET') {
        let result;
        try {
            result = await getRecurringTasks(client, userId);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Getting recurring task did not work.';
            client.close();
            return res.status(500).json({ message });
        }
        const recTasks: RecurringTask[] = convertToAppObjectList(result);
        res.status(200).json(recTasks);
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    client.close();
}

export default handler;
