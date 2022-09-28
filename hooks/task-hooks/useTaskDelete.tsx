import useNotification from '../useNotification';
import { NotifStatus } from '../../components/ui/Notification';
import { deleteTask } from '../../lib/planners/tasks-api';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { Task } from '../../models/task-models/Task';
import { useQueryClient } from 'react-query';
import { StaticKeys } from '../../constants/query-keys';

interface Props {
    task: Task;
    onDelete(): void;
}

const useTaskDelete = ({ task, onDelete }: Props) => {
    // For faster cache update for tasks data on the frontend
    const queryClient = useQueryClient();

    const { setNotification } = useNotification();

    const taskDeleteHandler = async () => {
        setNotification(NotifStatus.PENDING);
        const { isSuccess } = await deleteTask(
            task.id,
            task.plannerType || PlannerMode.WEEKLY,
        );
        if (isSuccess) {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries([StaticKeys.TASK_QUERY_KEY]);

            // Optimistically update to the new value
            // Need to clean this up.
            queryClient.setQueryData(
                [StaticKeys.TASK_QUERY_KEY],
                (oldTasksData: any | undefined) => {
                    const newTasks = (oldTasksData?.tasks || []).filter(
                        (t: any) => t.id !== task.id,
                    );
                    return { tasks: newTasks };
                },
            );

            setNotification(NotifStatus.SUCCESS, 'Delete task successful!');
        } else {
            setNotification(NotifStatus.ERROR, 'Delete task went wrong');
        }
        onDelete();
    };

    return { deleteTask: taskDeleteHandler };
};

export default useTaskDelete;
