import { MongoClient, ObjectId } from 'mongodb';

import { Collection, TemplateCollection } from './mongodb-constant';

const clientPromise = MongoClient.connect(process.env.MONGODB_URL || '');

// Get tasks from getStaticProps or getServerSideProps
export async function getTasksFromPage (collection: string, userId: string) {
	const client = await clientPromise;
	const db = client.db();
	const data = await db.collection(collection).find({ userId }).toArray();
	return data;
}

export async function getTemplateTasksFromPage (templateId: string) {
	const client = await clientPromise;
	const db = client.db();
	const data = await db.collection(Collection.TEMPLATE_TASKS).find({ templateId }).toArray();
	return data;
}

export async function getTemplateFromPage (templateId: string) {
	const client = await clientPromise;
	const db = client.db();
	const data = await db.collection(TemplateCollection).findOne({ _id: new ObjectId(templateId) });
	return data;
}
