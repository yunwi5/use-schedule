import TaskForm from './task-form/TaskForm';
import PlannerModal from '../planner-modal/PlannerModal';
import useTaskAdd from '../../../hooks/task-hooks/useTaskAdd';
import { AbstractTask } from '../../../models/task-models/AbstractTask';

interface Props {
    task: AbstractTask;
    onClose: () => void;
    onDuplicate: () => void;
}

const TaskDuplicate: React.FC<Props> = (props) => {
    const { task, onClose, onDuplicate } = props;
    const { addTask } = useTaskAdd({ onAdd: onDuplicate });

    return (
        <PlannerModal onClose={onClose} title={'Duplicate Task'}>
            <TaskForm initialTask={task} onSubmit={addTask} beginningPeriod={task.dateTime} />
        </PlannerModal>
    );
};

export default TaskDuplicate;
