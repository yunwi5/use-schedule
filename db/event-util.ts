import { connectDatabase } from './mongodb-util';
import { deleteItem, getItems, insertItem, insertManyItems, updateItem } from './generic';
import { NoIdEvent } from '../models/Event';
import { EventCollection } from './collections';
import { MongoClient } from 'mongodb';

export async function insertEvent(event: NoIdEvent) {
    const client = await connectDatabase();
    const result = await insertItem(client, event, EventCollection);
    client.close();
    return result;
}

export async function insertEvents(client: MongoClient, events: NoIdEvent[]) {
    const insertResult = await insertManyItems(client, events, EventCollection);
    return insertResult;
}

export async function getEvents(userId: string) {
    const client = await connectDatabase();
    const events = await getItems(client, { userId }, null, EventCollection);
    client.close();
    return events;
}

// need to be implemented
export async function updateEvent(eventId: string, eventProps: any) {
    const client = await connectDatabase();
    const result = await updateItem(client, eventId, eventProps, EventCollection);
    client.close();
    return result;
}

export async function deleteEvent(eventId: string) {
    const client = await connectDatabase();
    const result = await deleteItem(client, eventId, EventCollection);
    client.close();
    return result;
}
