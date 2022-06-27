import { connectDatabase } from './mongodb-config';
import { deleteItem, getItems, insertItem, insertManyItems, updateItem } from './generic';
import { NoIdEvent } from '../models/Event';
import { EventCollection } from './collections';
import { MongoClient } from 'mongodb';

export async function insertEvent(client: MongoClient, event: NoIdEvent) {
    const result = await insertItem(client, event, EventCollection);
    return result;
}

export async function insertEvents(client: MongoClient, events: NoIdEvent[]) {
    const insertResult = await insertManyItems(client, events, EventCollection);
    return insertResult;
}

export async function getEvents(client: MongoClient, userId: string, search: string = '') {
    const searchQuery = '.*' + search + '.*';
    const searchRegex = new RegExp(searchQuery, 'i');

    const events = await getItems(
        client,
        { userId, name: searchRegex },
        null,
        EventCollection,
    );
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
