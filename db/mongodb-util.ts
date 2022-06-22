import { MongoClient } from 'mongodb';

export async function connectDatabase() {
    const mongodbUrl = process.env.MONGODB_URL;
    if (!mongodbUrl) throw new Error('Mongodb URL was not found.');
    const client = await MongoClient.connect(mongodbUrl);
    return client;
}
