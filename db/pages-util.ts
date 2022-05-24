import { ObjectId } from 'mongodb';

import { connectDatabase } from './mongodb-util';
import { EventCollection, TaskCollection, TemplateCollection, TodoCollection } from './collections';
import { Todo } from '../models/todo-models/Todo';
import { TodoList } from '../models/todo-models/TodoList';
import { convertToTodoList, convertToTodos } from '../utilities/todos-utils/todo-util';
import { getTasks } from './tasks-util';
import { getItems } from './generic';
import { getTodoListAndItems } from './todos-util';

// Get tasks from getStaticProps or getServerSideProps
export async function getTasksFromPage(collection: string, userId: string) {
    const client = await connectDatabase();
    const db = client.db();
    const data = await db.collection(collection).find({ userId }).toArray();
    client.close();
    return data;
}

export async function getTasksFromAllCollection(userId: string, search?: string) {
    const client = await connectDatabase();
    const wtPromise = getTasks(client, TaskCollection.WEEKLY_TASKS, userId, search);
    const mtPromise = getTasks(client, TaskCollection.MONTLY_TASKS, userId, search);
    const ytPromise = getTasks(client, TaskCollection.YEARLY_TASKS, userId, search);
    const allTasks = await Promise.all([wtPromise, mtPromise, ytPromise]);
    client.close();
    return allTasks;
}

export async function getTodosFromPage(userId: string) {
    const client = await connectDatabase();
    const items = await getItems(client, { userId }, null, TodoCollection);
    client.close();
    return items;
}

export async function getEventsFromPage(userId: string) {
    const client = await connectDatabase();
    const items = await getItems(client, { userId }, null, EventCollection);
    client.close();
    return items;
}

export async function getTemplateTasksFromPage(templateId: string) {
    const client = await connectDatabase();
    const db = client.db();
    const data = await db.collection(TaskCollection.TEMPLATE_TASKS).find({ templateId }).toArray();
    client.close();
    return data;
}

export async function getTemplateFromPage(templateId: string) {
    const client = await connectDatabase();
    const db = client.db();
    const data = await db.collection(TemplateCollection).findOne({ _id: new ObjectId(templateId) });
    client.close();
    return data;
}

export async function getTodoListAndItemsFromPage(
    listId: string,
): Promise<[TodoList | null, Todo[]]> {
    const client = await connectDatabase();
    const [listRes, todosRes] = await getTodoListAndItems(client, listId);
    const todoList = convertToTodoList(listRes);
    const todos = convertToTodos(todosRes);
    client.close();
    return [todoList, todos];
}
