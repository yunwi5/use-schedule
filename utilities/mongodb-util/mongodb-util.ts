import { MongoClient } from "mongodb";

const PASSWORD = "001009jyk";
const DATABASE_NAME = "task-manager";
const MONGODB_URL = `mongodb+srv://yunwi5:${PASSWORD}@cluster0.yhtre.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

export async function connectDatabase () {
	const client = await MongoClient.connect(MONGODB_URL);
	return client;
}