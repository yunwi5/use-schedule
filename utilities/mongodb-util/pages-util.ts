import { MongoClient } from "mongodb";

const clientPromise = MongoClient.connect(process.env.MONGODB_URL || "");

// Get tasks from getStaticProps or getServerSideProps
export async function getTasksFromPage (collection: string, userId: string) {
	const client = await clientPromise;
	const db = client.db();
	const data = await db.collection(collection).find({ userId }).toArray();
	return data;
}
