import { getSession } from '@auth0/nextjs-auth0';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { connectDatabase } from '../../../../db/mongodb-util';
import {
    deleteGeneratedEvents,
    deleteRecurringEvent,
    updateGeneratedEvents,
    updateRecurringEventProps,
} from '../../../../db/recurring-items';
import { EventProps } from '../../../../models/Event';
import { RecurringEventProps } from '../../../../models/recurring-models/RecurringEvent';
import { parseBooleanQueryParam } from '../../../../utilities/gen-utils/query-util';

type Data = { message: string };

function getUpdatedEventProps(recurringEventProps: RecurringEventProps): EventProps {
    const eventProps: any = {};
    Object.entries(recurringEventProps).forEach(([key, value]) => {
        if (
            key === 'name' ||
            key === 'description' ||
            key === 'duration' ||
            key === 'meetingLink' ||
            key === 'location' ||
            key === 'participants' ||
            key === 'importance'
        ) {
            eventProps[key] = value;
        }
    });
    return eventProps;
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = getSession(req, res);
    const userId = session?.user.sub;
    if (!session || !userId) {
        return res.status(404).json({ message: 'User not found' });
    }

    let { recurringId } = req.query;
    recurringId = Array.isArray(recurringId) ? recurringId.join('') : recurringId;

    let client: MongoClient;
    try {
        client = await connectDatabase();
    } catch (err) {
        return res.status(500).json({ message: 'Connect to database did not work.' });
    }

    if (req.method === 'PATCH') {
        // change the properties of subsequent one-off events as well
        const updatedProps = req.body;
        console.log('updatedProps:', updatedProps);

        let result;
        try {
            result = await updateRecurringEventProps(client, recurringId, updatedProps);
            console.log(result);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Patching recurring events did not work.';
            client.close();
            return res.status(500).json({ message });
        }

        // Now, the update is successful. Hence, update all subsequent one-off events
        // that were previously generated from this recurring event
        let patchGenerated: boolean = parseBooleanQueryParam(req.query.patchGenerated);
        console.log(`patchGenerated: ${patchGenerated}`);

        if (patchGenerated) {
            try {
                const eventProps = getUpdatedEventProps(updatedProps);
                let result = await updateGeneratedEvents(client, recurringId, eventProps);
                console.log(result);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : 'Patching suqsequent events did not work.';
                console.error(message);
            }
        }

        res.status(200).json({ message: 'Patching recurring event successful' });
    } else if (req.method === 'DELETE') {
        try {
            await deleteRecurringEvent(client, recurringId);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Deleting recurring events did not work.';
            client.close();
            return res.status(500).json({ message });
        }

        // optionally delete the subsequent one-off events as well
        // using the query params
        let deleteGenerated: boolean = parseBooleanQueryParam(req.query.deleteGenerated);
        console.log(`deleteGenerated: ${deleteGenerated}`);

        if (deleteGenerated) {
            try {
                let result = await deleteGeneratedEvents(client, recurringId);
                console.log(result);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : 'Deleting subsequent events did not work.';
                // The DELETE request itself did not fail (but subsequent request did)
                console.error(message);
            }
        }

        res.status(200).json({ message: 'Deleting recurring event successful' });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    client.close();
}

export default handler;
