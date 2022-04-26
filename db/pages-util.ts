import { MongoClient, ObjectId } from "mongodb";

import { clientPromise } from "./mongodb-util";
import {
    EventCollection,
    TaskCollection,
    TemplateCollection,
    TodoCollection,
} from "./mongodb-constant";
import { Todo } from "../models/todo-models/Todo";
import { TodoList } from "../models/todo-models/TodoList";
import { convertToTodoList, convertToTodos } from "../utilities/todos-utils/todo-util";
import { getTasks } from "./tasks-util";
import { getItems } from "./generic";
import { getTodoListAndItems } from "./todos-util";

// Get tasks from getStaticProps or getServerSideProps
export async function getTasksFromPage(collection: string, userId: string) {
    const client = await clientPromise;
    const db = client.db();
    const data = await db.collection(collection).find({ userId }).toArray();
    return data;
}

export async function getTasksFromAllCollection(userId: string) {
    const client = await clientPromise;
    const wtPromise = getTasks(client, TaskCollection.WEEKLY_TASKS, userId);
    const mtPromise = getTasks(client, TaskCollection.MONTLY_TASKS, userId);
    const ytPromise = getTasks(client, TaskCollection.YEARLY_TASKS, userId);
    return await Promise.all([wtPromise, mtPromise, ytPromise]);
}

export async function getTodosFromPage(userId: string) {
    const client = await clientPromise;
    return await getItems(client, { userId }, null, TodoCollection);
}

export async function getEventsFromPage(userId: string) {
    const client = await clientPromise;
    return await getItems(client, { userId }, null, EventCollection);
}

export async function getTemplateTasksFromPage(templateId: string) {
    const client = await clientPromise;
    const db = client.db();
    const data = await db.collection(TaskCollection.TEMPLATE_TASKS).find({ templateId }).toArray();
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
