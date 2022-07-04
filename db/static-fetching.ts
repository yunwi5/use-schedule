// data fetching for static page generation
import { MongoClient } from 'mongodb';
import { TodoListCollection } from './collections';

export const getAllTodoLists = async (client: MongoClient) => {
    const db = client.db();
    const todoLists = await db.collection(TodoListCollection).find({}, {}).toArray();
    return todoLists;
};
