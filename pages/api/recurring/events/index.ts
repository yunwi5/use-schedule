import { getSession } from '@auth0/nextjs-auth0';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { insertEvents } from '../../../../db/event-util';
import { connectDatabase } from '../../../../db/mongodb-config';
import {
    getRecurringEvents,
    insertRecurringEvent,
    updateRecurringEventProps,
} from '../../../../db/recurring-items';
import { RecurringEvent } from '../../../../models/recurring-models/RecurringEvent';
import { convertToAppObjectList } from '../../../../utilities/gen-utils/object-util';

type Data = { message: string } | { message: string; insertedId: string } | RecurringEvent[];

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
        const newRecEvent = req.body;

        let result;
        try {
            result = await insertRecurringEvent(client, newRecEvent);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Inserting recurring event did not work.';
            console.error(message);
            client.close();
            return res.status(500).json({ message });
        }
        const insertedId: string = result.insertedId.toString();
        console.log(`recEvent insertedId: ${insertedId}`);

        const recEvent = new RecurringEvent(newRecEvent, insertedId);
        const generatedEvents = recEvent.produceOneOffEvents();

        console.log(`Generated events: ${generatedEvents.length}`);

        // add bunch of generated events to events collections
        // then update last recurred (last added) date of this recurring event object
        try {
            const eventsInsertionPromise = insertEvents(client, generatedEvents);
            const propUpdatePromise = updateRecurringEventProps(client, recEvent.id, {
                lastRecurred: recEvent.lastRecurred,
            });

            const [eventsInsertionResult, propUpdateResult] = await Promise.all([
                eventsInsertionPromise,
                propUpdatePromise,
            ]);

            console.log(`generated events insertion result: ${eventsInsertionResult}`);
            console.log(propUpdateResult);
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'Inserting generated recurring events and then updating last recurring date of the recurring event did not work.';
            console.error(message);
        }
        res.status(201).json({ message: 'Inserting recurring events successful', insertedId });
    } else if (req.method === 'GET') {
        let result;
        try {
            result = await getRecurringEvents(client, userId);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Getting recurring event did not work.';
            client.close();
            return res.status(500).json({ message });
        }
        const recEvents: RecurringEvent[] = convertToAppObjectList(result);
        res.status(200).json(recEvents);
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    client.close();
}

export default handler;
