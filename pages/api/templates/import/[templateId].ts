import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectDatabase } from '../../../../db/mongodb-config';
import { PlannerMode } from '../../../../models/planner-models/PlannerMode';
import { NoIdSubTask } from '../../../../models/task-models/SubTask';
import { NoIdTask } from '../../../../models/task-models/Task';
import { TaskCollection, SubTaskCollection } from '../../../../db/collections';
import { insertManySubTasks } from '../../../../db/subtask-util';
import { insertTask } from '../../../../db/tasks-util';
import { getTemplateTasksWithSubTask } from '../../../../db/template-util';
import { addDays } from '../../../../utilities/date-utils/date-control';
import { getISOTimeFormat } from '../../../../utilities/date-utils/date-format';
import { getDayIndexFromMonth } from '../../../../utilities/date-utils/date-get';

type Data = { message: string; data?: any };

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { templateId: initialId } = req.query;
    const templateId = Array.isArray(initialId) ? initialId.join('') : initialId;
    const { weekBeginning: weekString } = req.body;
    const weekBeginning = new Date(weekString);

    let client: MongoClient;
    try {
        client = await connectDatabase();
    } catch (err) {
        let message = err instanceof Error ? err.message : 'Connect to database did not work.';
        return res.status(500).json({ message });
    }

    if (req.method === 'POST') {
        // Transfer all the template tasks to weekly tasks according to the weekBeginning date
        let data: { taskArray: NoIdTask[]; subTaskArrayOfArray: NoIdSubTask[][] };
        try {
            data = await getTemplateTasksWithSubTask(client, templateId);
        } catch (err) {
            let message =
                err instanceof Error ? err.message : 'Getting templateTasks did not work.';
            client.close();
            return res.status(500).json({ message });
        }

        const { taskArray, subTaskArrayOfArray } = data;
        const adjustedTasks = taskArray.map((task) => {
            task.plannerType = PlannerMode.WEEKLY;
            if (!task.isAnyDateTime) {
                const taskDateTime = new Date(task.timeString);
                const dayToAdd = getDayIndexFromMonth(taskDateTime);

                const planDate = addDays(weekBeginning, dayToAdd);
                const planDateTime = new Date(
                    `${planDate.toDateString()} ${getISOTimeFormat(taskDateTime)}`,
                );
                task.timeString = planDateTime.toString();
            }
            if (task.dueDateString) {
                const dueDateTime = new Date(task.dueDateString);
                const dayToAdd = getDayIndexFromMonth(dueDateTime);

                const planDueDate = addDays(weekBeginning, dayToAdd);
                const planDueDateTime = new Date(
                    `${planDueDate.toDateString()} ${getISOTimeFormat(dueDateTime)}`,
                );
                task.dueDateString = planDueDateTime.toString();
            }
            delete task['id'];
            delete task['templateId'];
            return task;
        });

        let taskInsertPromises = [];
        for (const task of adjustedTasks) {
            const taskPromise = insertTask(TaskCollection.WEEKLY_TASKS, task);
            taskInsertPromises.push(taskPromise);
        }

        const resolvedTaskInsertPromises = await Promise.all(taskInsertPromises);

        try {
            for (let i = 0; i < resolvedTaskInsertPromises.length; i++) {
                const insertedResult = resolvedTaskInsertPromises[i];
                const insertedId = insertedResult.insertedId;
                const subTasks = subTaskArrayOfArray[i];
                const adjustedSubTasks: NoIdSubTask[] = subTasks.map((sub) => {
                    delete sub['id'];
                    return {
                        ...sub,
                        parentTaskId: insertedId.toString(),
                    };
                });
                await insertManySubTasks(client, SubTaskCollection, adjustedSubTasks);
            }
        } catch (err) {
            let message =
                err instanceof Error ? err.message : 'Inserting many subTasks did not work.';
            client.close();
        }

        res.status(201).json({ message: 'No error here!', data: adjustedTasks });
    } else {
        res.status(405).json({ message: 'This method is not allowed for this api.' });
    }

    client.close();
}

export default handler;
