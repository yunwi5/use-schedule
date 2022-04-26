import { clientPromise } from "./mongodb-util";
import { deleteItem, getItems, insertItem, updateItem } from "./generic";
import { NoIdEvent } from "../models/Event";
import { EventCollection } from "./mongodb-constant";

export async function insertEvent(event: NoIdEvent) {
    const client = await clientPromise;
    return await insertItem(client, event, EventCollection);
}

export async function getEvents(userId: string) {
    const client = await clientPromise;
    return await getItems(client, {}, null, EventCollection);
}

// need to be implemented
export async function updateEvent(eventId: string, eventProps: any) {
    const client = await clientPromise;
    return await updateItem(client, eventId, eventProps, EventCollection);
}

export async function deleteEvent(eventId: string) {
    const client = await clientPromise;
    return await deleteItem(client, eventId, EventCollection);
}
