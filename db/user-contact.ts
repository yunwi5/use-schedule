import { clientPromise } from "./mongodb-util";
import { ContactCollection } from "./mongodb-constant";
import { NoIdUserContact } from "../models/UserContact";

export async function insertUserContact(contact: NoIdUserContact) {
    const client = await clientPromise;
    const db = client.db();
    const res = await db.collection(ContactCollection).insertOne(contact);
    return res;
}
