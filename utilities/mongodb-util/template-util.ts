import { MongoClient, ObjectId } from "mongodb";

import { TemplateCollection } from "./mongodb-constant";
import { Template, TemplateProperties } from "../../models/template-models/Template";

export async function insertTemplate (client: MongoClient, template: Template) {
	const db = client.db();
	const res = await db.collection(TemplateCollection).insertOne(template);
	return res;
}

export async function getTemplateById (client: MongoClient, templateId: string) {
	if (!templateId) return "templateId not found.";
	const db = client.db();
	const res = await db.collection(TemplateCollection).findOne({ _id: new ObjectId(templateId) });
	return res;
}

export async function updateTemplateById (
	client: MongoClient,
	templateId: string,
	templateProps: TemplateProperties
) {
	if (!templateId) return "templateId not found.";
	const db = client.db();
	const res = await db
		.collection(TemplateCollection)
		.updateOne({ _id: new ObjectId(templateId) }, { $set: templateProps });
	console.log("Template update result:", res);
	return res;
}
