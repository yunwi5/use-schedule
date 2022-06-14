import { getSession } from '@auth0/nextjs-auth0';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { TaskCollection } from '../../../../db/collections';
import { connectDatabase } from '../../../../db/mongodb-util';
import {
    deleteGeneratedTasks,
    deleteRecurringTask,
    updateGeneratedTasks,
    updateRecurringTaskProps,
} from '../../../../db/recurring-items';
import { RecurringTaskProps } from '../../../../models/recurring-models/RecurringTask';
import { TaskProperties } from '../../../../models/task-models/TaskProperties';
import { parseBooleanQueryParam } from '../../../../utilities/gen-utils/query-util';

type Data = { message: string };

function getUpdatedTaskProps(recurringTaskProps: RecurringTaskProps): TaskProperties {
    const taskProps: any = {};
    Object.entries(recurringTaskProps).forEach(([key, value]) => {
        if (
            key === 'name' ||
            key === 'description' ||
            key === 'duration' ||
            key === 'category' ||
            key === 'subCategory' ||
            key === 'comment' ||
            key === 'importance'
        ) {
            taskProps[key] = value;
        }
    });
    return taskProps;
}

function getTaskCollection(collection: string | string[]): TaskCollection {
    collection = Array.isArray(collection) ? collection.join('') : collection;
    if (!collection) return TaskCollection.WEEKLY_TASKS;
    switch (collection.trim()) {
        case TaskCollection.WEEKLY_TASKS:
        case TaskCollection.MONTLY_TASKS:
        case TaskCollection.YEARLY_TASKS:
            return collection.trim() as TaskCollection;
        default:
            return TaskCollection.WEEKLY_TASKS;
    }
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = getSession(req, res);
    const userId = session?.user.sub;
    if (!session || !userId) {
        return res.status(404).json({ message: 'User not found' });
    }

    let { recurringId, plannerMode } = req.query;
    recurringId = Array.isArray(recurringId) ? recurringId.join('') : recurringId;

    if (!plannerMode) {
        return res.status(404).json({ message: 'Planner mode was not found.' });
    }

    const taskCollection = getTaskCollection(plannerMode);

    let client: MongoClient;
    try {
        client = await connectDatabase();
    } catch (err) {
        return res.status(500).json({ message: 'Connect to database did not work.' });
    }

    if (req.method === 'PATCH') {
        // change the properties of subsequent one-off tasks as well
        const updatedProps = req.body;
        console.log('updatedProps:', updatedProps);

        let result;
        try {
            result = await updateRecurringTaskProps(client, recurringId, updatedProps);
            console.log(result);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Patching recurring tasks did not work.';
            client.close();
            return res.status(500).json({ message });
        }

        // Now, the update is successful. Hence, update all subsequent one-off tasks
        // that were previously generated from this recurring task
        let patchGenerated: boolean = parseBooleanQueryParam(req.query.patchGenerated);
        console.log(`patchGenerated: ${patchGenerated}`);

        if (patchGenerated) {
            try {
                const taskProps = getUpdatedTaskProps(updatedProps);
                let result = await updateGeneratedTasks(
                    client,
                    recurringId,
                    taskProps,
                    taskCollection,
                );
                console.log(result);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : 'Patching suqsequent tasks did not work.';
                console.error(message);
            }
        }

        res.status(200).json({ message: 'Patching recurring task successful' });
    } else if (req.method === 'DELETE') {
        try {
            await deleteRecurringTask(client, recurringId);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Deleting recurring tasks did not work.';
            client.close();
            return res.status(500).json({ message });
        }

        // optionally delete the subsequent one-off tasks as well
        // using the query params
        let deleteGenerated: boolean = parseBooleanQueryParam(req.query.deleteGenerated);
        console.log(`deleteGenerated: ${deleteGenerated}`);

        if (deleteGenerated) {
            try {
                let result = await deleteGeneratedTasks(client, recurringId, taskCollection);
                console.log(result);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : 'Deleting subsequent tasks did not work.';
                // The DELETE request itself did not fail (but subsequent request did)
                console.error(message);
            }
        }

        res.status(200).json({ message: 'Deleting recurring task successful' });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    client.close();
}

export default handler;
