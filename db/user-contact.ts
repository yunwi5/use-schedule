import { ContactCollection } from './collections';
import { NoIdUserContact } from '../models/UserContact';
import { connectDatabase } from './mongodb-config';

export async function insertUserContact(contact: NoIdUserContact) {
    const client = await connectDatabase();
    const db = client.db();
    const res = await db.collection(ContactCollection).insertOne(contact);
    client.close();
    return res;
}
