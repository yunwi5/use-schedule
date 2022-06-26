import { getSession } from '@auth0/nextjs-auth0';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { connectDatabase } from '../../../db/mongodb-util';
import {
    updateRecurringEvents,
    updateRecurringTasks,
} from '../../../utilities/recurring-utils/recurring-update';

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

    if (req.method === 'GET') {
        try {
            const recEventPromise = updateRecurringEvents(client, userId);
            const recTaskPromise = updateRecurringTasks(client, userId);
            await Promise.all([recEventPromise, recTaskPromise]);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Updating recurring events did not work.';
            client.close();
            return res.status(500).json({ message });
        }
        res.status(200).json({ message: 'Auto generating recurring events successful' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
    client.close();
}

export default handler;
