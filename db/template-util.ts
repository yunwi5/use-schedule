import { MongoClient, ObjectId, WithId } from 'mongodb';

import { TemplateCollection, TaskCollection, SubTaskCollection } from './collections';
import { Template, TemplateProperties } from '../models/template-models/Template';
import { Task } from '../models/task-models/Task';
import { convertToTasks, covertToSubTasks } from '../utilities/tasks-utils/task-util';

// Template Task CRUD operations
export async function getTemplateTasksById(client: MongoClient, templateId: string) {
    const db = client.db();
    const data = await db
        .collection(TaskCollection.TEMPLATE_TASKS)
        .find({ templateId })
        .toArray();
    return data;
}

// Populate subtasks at the same time
export async function getTemplateTasksWithSubTask(client: MongoClient, templateId: string) {
    const db = client.db();
    const data = await db
        .collection(TaskCollection.TEMPLATE_TASKS)
        .find({ templateId })
        .toArray();
    const tasks: Task[] = convertToTasks(data);

    const subTaskPromises = [];
    for (const task of tasks) {
        const id = task.id;
        const subTasksPromise = db
            .collection(SubTaskCollection)
            .find({ parentTaskId: id })
            .toArray();
        subTaskPromises.push(subTasksPromise);
    }
    const subTaskData = await Promise.all(subTaskPromises);
    const subTaskArrayOfArray = subTaskData.map((subTaskArray) =>
        covertToSubTasks(subTaskArray),
    );

    return {
        taskArray: tasks,
        subTaskArrayOfArray,
    };
}

// Template CRUD operations
export async function insertTemplate(client: MongoClient, template: Template) {
    const db = client.db();
    const res = await db.collection(TemplateCollection).insertOne(template);
    return res;
}

export async function getAllTemplates(client: MongoClient, userId: string) {
    const db = client.db();
    const res = await db.collection(TemplateCollection).find({ userId }).toArray();
    return res;
}

export async function getTemplateById(client: MongoClient, templateId: string) {
    if (!templateId) throw new Error('templateId not found.');
    const db = client.db();
    const res = await db
        .collection(TemplateCollection)
        .findOne({ _id: new ObjectId(templateId) });
    return res;
}

export async function updateTemplateById(
    client: MongoClient,
    templateId: string,
    templateProps: TemplateProperties,
) {
    if (!templateId) throw new Error('templateId not found.');
    const db = client.db();
    const res = await db
        .collection(TemplateCollection)
        .updateOne({ _id: new ObjectId(templateId) }, { $set: templateProps });
    return res;
}

export async function deleteTemplateById(client: MongoClient, templateId: string) {
    if (!templateId) throw new Error('templateId not found.');
    const db = client.db();
    const res = await db
        .collection(TemplateCollection)
        .deleteOne({ _id: new ObjectId(templateId) });
    return res;
}
