import { RecurringCollection } from './collections';
import { MongoClient } from 'mongodb';
import {
    EventCollection,
    SubTaskCollection,
    SubTodoCollection,
    TaskCollection,
    TemplateCollection,
    TodoCollection,
    TodoListCollection,
} from './collections';
import { deleteManyItems } from './generic';
import { connectDatabase } from './mongodb-util';

// This script will delete 1) tasks 2) sub-tasks 3) events
// 4) templates 5) todo-lists 6) todos 7) recurring events/tasks
export async function deleteUserRecord(userId: string) {
    const mongoUrl = process.env.MONGODB_URL;
    console.log('userId:', userId);
    console.log('mongoUrl:', mongoUrl);

    const client: MongoClient = await connectDatabase();

    const tasksPromise = deleteAllUserTasks(client, userId);
    const eventPromise = deleteAllEvents(client, userId);
    const subTaskPromise = deleteAllSubTasks(client, userId);
    const templatePromise = deleteAllTemplates(client, userId);
    const todoPromise = deleteAllTodos(client, userId);
    const recEventPromise = deleteRecurringEvents(client, userId);
    const recTaskPromise = deleteRecurringTasks(client, userId);

    const result = await Promise.all([
        tasksPromise,
        eventPromise,
        subTaskPromise,
        templatePromise,
        todoPromise,
        recEventPromise,
        recTaskPromise,
    ]);
    console.log(result);

    client.close();
}

async function deleteAllEvents(client: MongoClient, userId: string) {
    return await deleteManyItems(client, { userId }, EventCollection);
}

async function deleteAllSubTasks(client: MongoClient, userId: string) {
    return await deleteManyItems(client, { userId }, SubTaskCollection);
}

async function deleteAllTemplates(client: MongoClient, userId: string) {
    const tablePromise = deleteManyItems(client, { userId }, TemplateCollection);
    const itemPromise = deleteManyItems(client, { userId }, TaskCollection.TEMPLATE_TASKS);
    return await Promise.all([tablePromise, itemPromise]);
}

async function deleteAllUserTasks(client: MongoClient, userId: string) {
    const wPromise = deleteManyItems(client, { userId }, TaskCollection.WEEKLY_TASKS);
    const mPromise = deleteManyItems(client, { userId }, TaskCollection.MONTLY_TASKS);
    const yPromise = deleteManyItems(client, { userId }, TaskCollection.YEARLY_TASKS);

    const result = await Promise.all([wPromise, mPromise, yPromise]);
    return result;
}

async function deleteAllTodos(client: MongoClient, userId: string) {
    const listPromise = deleteManyItems(client, { userId }, TodoListCollection);
    const todoPromise = deleteManyItems(client, { userId }, TodoCollection);
    const subTodoPromise = deleteManyItems(client, { userId }, SubTodoCollection);
    return await Promise.all([listPromise, todoPromise, subTodoPromise]);
}

async function deleteRecurringEvents(client: MongoClient, userId: string) {
    return await deleteManyItems(client, { userId }, RecurringCollection.RECURRING_EVENTS);
}

async function deleteRecurringTasks(client: MongoClient, userId: string) {
    return await deleteManyItems(client, { userId }, RecurringCollection.RECURRING_TASKS);
}
