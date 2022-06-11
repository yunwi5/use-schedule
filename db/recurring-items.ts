import { MongoClient } from 'mongodb';
import { NoIdRecurringEvent, RecurringEventProps } from '../models/recurring-models/RecurringEvent';
import { RecurringCollection } from './collections';
import { deleteItem, getItems, insertItem, updateItem } from './generic';

export async function insertRecurringEvent(client: MongoClient, recEvent: NoIdRecurringEvent) {
    const result = await insertItem(client, recEvent, RecurringCollection.RECURRING_EVENTS);
    return result;
}

export async function getRecurringEvents(client: MongoClient, userId: string) {
    const recEvents = await getItems(
        client,
        { userId },
        null,
        RecurringCollection.RECURRING_EVENTS,
    );
    return recEvents;
}

export async function updateRecurringEventProps(
    client: MongoClient,
    recurringId: string,
    recEventProps: RecurringEventProps,
) {
    const result = await updateItem(
        client,
        recurringId,
        recEventProps,
        RecurringCollection.RECURRING_EVENTS,
    );
    return result;
}

export async function deleteRecurringEvent(client: MongoClient, recId: string) {
    const result = await deleteItem(client, recId, RecurringCollection.RECURRING_EVENTS);
    return result;
}
