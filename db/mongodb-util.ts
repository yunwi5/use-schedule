import { MongoClient } from "mongodb";

const PASSWORD = "001009jyk";
const DATABASE_NAME = "task-manager";
const DEFAULT_MONGODB_URL = `mongodb+srv://yunwi5:${PASSWORD}@cluster0.yhtre.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

export async function connectDatabase() {
    // console.log(process.env.MONGODB_URL);
    const client = await MongoClient.connect(process.env.MONGODB_URL || DEFAULT_MONGODB_URL);
    return client;
}

// Direct way
export const clientPromise = MongoClient.connect(process.env.MONGODB_URL || "");
