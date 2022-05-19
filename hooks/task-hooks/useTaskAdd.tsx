import { useUser } from '@auth0/nextjs-auth0';
import React from 'react';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { FormTaskObject, Task } from '../../models/task-models/Task';
import useTemplate from '../useTemplate';
import { v4 as uuidv4 } from 'uuid';
import useNotification from '../useNotification';
import { NotifStatus } from '../../components/ui/Notification';
import { postTask } from '../../lib/planners/tasks-api';

interface Props {
    onAdd(): void;
}

const useTaskAdd = ({ onAdd }: Props) => {
    const userId = useUser().user?.sub;

    const { currentTemplate, plannerMode } = useTemplate();
    const { setNotification } = useNotification();

    const taskAddHandler = async (newFormTask: FormTaskObject) => {
        if (!userId) {
            if (!userId) alert('User is not logged in!');
            return;
        }

        const plannerType = newFormTask.plannerType || plannerMode || PlannerMode.WEEKLY;
        const newTask: Task = {
            ...newFormTask,
            id: uuidv4(),
            plannerType: plannerType,
            userId,
        };

        if (plannerType === PlannerMode.TEMPLATE && currentTemplate) {
            newTask.templateId = currentTemplate.id;
        }

        setNotification(NotifStatus.PENDING);
        const { isSuccess, insertedId } = await postTask(newTask, plannerType);
        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS);
        } else {
            setNotification(NotifStatus.ERROR);
        }

        if (insertedId) newTask.id = insertedId;
        onAdd(); // call mutate
        // onClose();
    };

    return { addTask: taskAddHandler };
};

export default useTaskAdd;
