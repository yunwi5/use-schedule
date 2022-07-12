import { getSession } from '@auth0/nextjs-auth0';
import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { getEvents, insertEvent, insertEvents } from '../../../db/event-util';
import { connectDatabase } from '../../../db/mongodb-config';
import { IEvent } from '../../../models/Event';
import { validateEvent } from '../../../schemas/validation';
import { convertToAppObjectList } from '../../../utilities/gen-utils/object-util';

type Data =
    | { message: string }
    | { message: string; insertedId: string }
    | { message: string; events: IEvent[] }
    | {
          message: string;
          insertedIds: {
              [key: number]: ObjectId;
          };
          insertedCount: number;
      };

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
        // new event can be a single event object, or can be an array of event objects
        let newEvent = req.body;

        if (!Array.isArray(newEvent)) {
            const { isValid, message } = validateEvent(newEvent);
            if (!isValid) {
                return res.status(400).json({ message });
            }
        } else {
            // filter out invalid events
            newEvent = newEvent.filter((eventChild) => {
                const { isValid, message } = validateEvent(newEvent);
                if (!isValid) console.log(`invalid event detected:\n${message}\n`, eventChild);
                return isValid;
            });
        }

        let result;
        if (!Array.isArray(newEvent)) {
            let insertedId = '';
            try {
                result = await insertEvent(client, newEvent);
                insertedId = result.insertedId.toString();
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : 'Inserting event(s) did not work.';
                client.close();
                return res.status(500).json({ message });
            }
            return res.status(201).json({
                message: 'Inserting event successful',
                insertedId,
            });
        } else {
            let insertedIds: {
                    [key: number]: ObjectId;
                } = [],
                insertedCount = 0;
            try {
                result = await insertEvents(client, newEvent);
                insertedIds = result.insertedIds;
                insertedCount = result.insertedCount;
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : 'Inserting events did not work.';
                client.close();
                return res.status(500).json({ message });
            }
            return res
                .status(201)
                .json({ message: 'Inserting events successful', insertedIds, insertedCount });
        }
    } else if (req.method === 'GET') {
        let events: IEvent[] = [];
        try {
            const result = await getEvents(client, userId);
            events = convertToAppObjectList(result);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Getting event did not work.';
            client.close();
            return res.status(500).json({ message });
        }
        res.status(200).json({ message: 'Getting events worked', events });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }

    client.close();
}

export default handler;
