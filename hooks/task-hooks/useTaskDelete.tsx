import useNotification from '../useNotification';
import { NotifStatus } from '../../components/ui/Notification';
import { deleteTask } from '../../lib/planners/tasks-api';
import { PlannerMode } from '../../models/planner-models/PlannerMode';
import { Task } from '../../models/task-models/Task';

interface Props {
    task: Task;
    onDelete(): void;
}

const useTaskDelete = ({ task, onDelete }: Props) => {
    const { setNotification } = useNotification();

    const taskDeleteHandler = async () => {
        setNotification(NotifStatus.PENDING);
        const { isSuccess } = await deleteTask(task.id, task.plannerType || PlannerMode.WEEKLY);
        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS, 'Delete task successful!');
        } else {
            setNotification(NotifStatus.ERROR, 'Delete task went wrong');
        }
        onDelete();
    };

    return { deleteTask: taskDeleteHandler };
};

export default useTaskDelete;
