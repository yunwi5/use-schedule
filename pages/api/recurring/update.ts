import { getSession } from '@auth0/nextjs-auth0';
import { InsertManyResult, MongoClient, UpdateResult } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { insertEvents } from '../../../db/event-util';
import { connectDatabase } from '../../../db/mongodb-util';
import { getRecurringEvents, updateRecurringEventProps } from '../../../db/recurring-items';
import { RecurringEvent } from '../../../models/recurring-models/RecurringEvent';
import { convertToAppObjectList } from '../../../utilities/gen-utils/object-util';
import { processRecurringEvents } from '../../../utilities/recurring-utils';

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
        let recurringEvents: RecurringEvent[] = [];
        try {
            let result = await getRecurringEvents(client, userId);
            let convertedArray: RecurringEvent[] = convertToAppObjectList(result);
            recurringEvents = processRecurringEvents(convertedArray);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Getting recurring events did not work.';
            client.close();
            return res.status(500).json({ message });
        }
        console.log('Reached the update end point!');

        try {
            const generatedEventsQuery: Promise<InsertManyResult<Document> | UpdateResult>[] =
                recurringEvents.reduce(
                    (
                        accPromise: Promise<InsertManyResult<Document> | UpdateResult>[],
                        recEvent,
                    ) => {
                        const generatedEvents = recEvent.produceOneOffEvents();
                        console.log(`generated events: ${generatedEvents.length}`);
                        if (!generatedEvents.length) return accPromise;

                        // Items in insertMany operations should not be empty list!
                        const eventsInsertionPromise = insertEvents(client, generatedEvents);
                        const propUpdatePromise = updateRecurringEventProps(client, recEvent.id, {
                            lastRecurred: recEvent.lastRecurred,
                        });
                        const resultPromise = [eventsInsertionPromise, propUpdatePromise];
                        return accPromise.concat(resultPromise);
                    },
                    [],
                );
            const result = await Promise.all(generatedEventsQuery);
            console.log(result);
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'Generating and inserting recurring events did not work.';
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
