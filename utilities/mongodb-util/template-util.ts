import { MongoClient, ObjectId } from "mongodb";

import { TemplateCollection } from "./mongodb-constant";
import { Template } from "../../models/template-models/Template";

export async function insertTemplate (client: MongoClient, template: Template) {
	const db = client.db();
	const res = await db.collection(TemplateCollection).insertOne(template);
	return res;
}
