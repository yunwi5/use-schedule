import { InsertManyResult, MongoClient, UpdateResult } from 'mongodb';
import {
    getRecurringEvents,
    getRecurringTasks,
    updateRecurringEventProps,
    updateRecurringTaskProps,
} from '../../db/recurring-items';
import { RecurringEvent } from '../../models/recurring-models/RecurringEvent';
import { processRecurringEvents, processRecurringTasks } from '.';
import { convertToAppObjectList } from '../gen-utils/object-util';
import { insertEvents } from '../../db/event-util';
import { RecurringTask } from '../../models/recurring-models/RecurringTask';
import { insertManyTasks } from '../../db/tasks-util';
import { getTaskCollection } from '../tasks-utils/task-util';

export async function updateRecurringEvents(client: MongoClient, userId: string) {
    let recurringEvents: RecurringEvent[] = [];
    let getResult = await getRecurringEvents(client, userId);
    let convertedArray: RecurringEvent[] = convertToAppObjectList(getResult);
    recurringEvents = processRecurringEvents(convertedArray);

    const generatedEventsQuery: Promise<InsertManyResult<Document> | UpdateResult>[] =
        recurringEvents.reduce(
            (accPromise: Promise<InsertManyResult<Document> | UpdateResult>[], recEvent) => {
                const generatedEvents = recEvent.produceOneOffEvents();
                if (!generatedEvents.length) return accPromise;

                // Items in insertMany operations should not be empty list!
                const eventsInsertionPromise = insertEvents(client, generatedEvents);
                const propUpdatePromise = updateRecurringEventProps(client, recEvent.id, {
                    lastRecurred: recEvent.lastRecurred,
                });
                const resultPromise = [eventsInsertionPromise, propUpdatePromise];
                return accPromise.concat(resultPromise);
            },
            [],
        );
    const result = await Promise.all(generatedEventsQuery);
    return result;
}

export async function updateRecurringTasks(client: MongoClient, userId: string) {
    let recurringTasks: RecurringTask[] = [];
    let getResult = await getRecurringTasks(client, userId);
    let convertedArray: RecurringTask[] = convertToAppObjectList(getResult);
    recurringTasks = processRecurringTasks(convertedArray);

    const generatedTasksQuery: Promise<InsertManyResult<Document> | UpdateResult>[] =
        recurringTasks.reduce(
            (accPromise: Promise<InsertManyResult<Document> | UpdateResult>[], recTask) => {
                const genreatedTasks = recTask.produceOneOffTasks();
                if (!genreatedTasks.length) return accPromise;

                const taskCollection = getTaskCollection(recTask.plannerType);
                // Items in insertMany operations should not be empty list!
                const tasksInsertionPromise = insertManyTasks(
                    client,
                    taskCollection,
                    genreatedTasks,
                );
                const propUpdatePromise = updateRecurringTaskProps(client, recTask.id, {
                    lastRecurred: recTask.lastRecurred,
                });
                const resultPromise = [tasksInsertionPromise, propUpdatePromise];
                return accPromise.concat(resultPromise);
            },
            [],
        );
    const result = await Promise.all(generatedTasksQuery);
    return result;
}
