import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@auth0/nextjs-auth0';

import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { FormTaskObject, Task } from '../../models/task-models/Task';
import useTemplate from '../useTemplate';
import useNotification from '../useNotification';
import { NotifStatus } from '../../components/ui/Notification';
import { postTask } from '../../lib/planners/tasks-api';
import { useQueryClient } from 'react-query';
import { StaticKeys } from '../../constants/query-keys';

interface Props {
    onAdd(): void;
}

const useTaskAdd = ({ onAdd }: Props) => {
    const userId = useUser().user?.sub;
    // For faster cache update for tasks data on the frontend
    const queryClient = useQueryClient();

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
            if (insertedId) newTask.id = insertedId;

            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries([StaticKeys.TASK_QUERY_KEY]);

            // Optimistically update to the new value
            queryClient.setQueryData(
                [StaticKeys.TASK_QUERY_KEY],
                (oldTasksData: any | undefined) => {
                    const newTasks = [...oldTasksData?.tasks, newTask];
                    return { tasks: newTasks };
                },
            );

            setNotification(NotifStatus.SUCCESS);
        } else {
            setNotification(NotifStatus.ERROR);
        }

        onAdd(); // call mutate
        // onClose();
    };

    return { addTask: taskAddHandler };
};

export default useTaskAdd;
