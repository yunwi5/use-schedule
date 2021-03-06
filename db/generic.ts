import { MongoClient, ObjectId } from 'mongodb';

export interface SortSpec {
    [key: string]: 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending';
}

// General
export async function getItem(client: MongoClient, filter: object, collection: string) {
    const db = client.db();
    return await db.collection(collection).findOne(filter);
}

export async function getItems(
    client: MongoClient,
    filter: object,
    sortSpec: SortSpec | null,
    collection: string,
) {
    const db = client.db();
    return await db
        .collection(collection)
        .find(filter)
        .sort(sortSpec || {})
        .toArray();
}

export async function insertItem(client: MongoClient, newItem: object, collection: string) {
    const db = client.db();
    const res = await db.collection(collection).insertOne(newItem);
    return res;
}

export async function insertManyItems(
    client: MongoClient,
    newItems: object[],
    collection: string,
) {
    const db = client.db();
    const res = await db.collection(collection).insertMany(newItems);
    return res;
}

export async function deleteItem(client: MongoClient, id: string, collection: string) {
    const db = client.db();
    const res = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    return res;
}

export async function deleteManyItems(
    client: MongoClient,
    condition: object,
    collection: string,
) {
    const db = client.db();
    const res = await db.collection(collection).deleteMany(condition);
    return res;
}

export async function updateItem(
    client: MongoClient,
    id: string,
    updatedProps: object,
    collection: string,
) {
    const db = client.db();
    const res = await db
        .collection(collection)
        .updateOne({ _id: new ObjectId(id) }, { $set: { ...updatedProps } });
    return res;
}
