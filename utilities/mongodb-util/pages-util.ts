import { MongoClient, ObjectId } from "mongodb";
import { Todo } from "../../models/todo-models/Todo";
import { TodoList } from "../../models/todo-models/TodoList";
import { convertToTodoList, convertToTodos } from "../todos-utils/todo-util";

import { Collection, TemplateCollection } from "./mongodb-constant";
import { getTodoListAndItems } from "./todos-util";

const clientPromise = MongoClient.connect(process.env.MONGODB_URL || "");

// Get tasks from getStaticProps or getServerSideProps
export async function getTasksFromPage(collection: string, userId: string) {
    const client = await clientPromise;
    const db = client.db();
    const data = await db.collection(collection).find({ userId }).toArray();
    return data;
}

export async function getTemplateTasksFromPage(templateId: string) {
    const client = await clientPromise;
    const db = client.db();
    const data = await db.collection(Collection.TEMPLATE_TASKS).find({ templateId }).toArray();
    return data;
}

export async function getTemplateFromPage(templateId: string) {
    const client = await clientPromise;
    const db = client.db();
    const data = await db.collection(TemplateCollection).findOne({ _id: new ObjectId(templateId) });
    return data;
}

export async function getTodoListAndItemsFromPage(
    listId: string,
): Promise<[TodoList | null, Todo[]]> {
    const client = await clientPromise;
    const [listRes, todosRes] = await getTodoListAndItems(client, listId);
    const todoList = convertToTodoList(listRes);
    const todos = convertToTodos(todosRes);
    return [todoList, todos];
}
