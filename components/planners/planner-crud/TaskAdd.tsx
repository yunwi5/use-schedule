import React, { useState } from 'react';

import TaskForm from './task-form/TaskForm';
import PlannerModal from '../planner-modal/PlannerModal';
import DiscardModal from '../../ui/modal/modal-variation/DiscardModal';
import useTaskAdd from '../../../hooks/task-hooks/useTaskAdd';

interface Props {
    onClose: () => void;
    onAddTask: () => void;
    beginningPeriod: Date;
}

const getDefaultBeginning = (beginningPeriod: Date) => {
    const date = new Date(beginningPeriod);
    date.setHours(12);
    return date;
};

const TaskAdd: React.FC<Props> = (props) => {
    const { onClose, onAddTask, beginningPeriod } = props;
    const { addTask } = useTaskAdd({
        onAdd: onAddTask,
    });

    const [showDiscardModal, setShowDiscardModal] = useState(false);

    return (
        <PlannerModal onClose={onClose} title={'New Task'}>
            {showDiscardModal && (
                <DiscardModal
                    onAction={onClose}
                    onClose={setShowDiscardModal.bind(null, false)}
                />
            )}
            <TaskForm
                onSubmit={addTask}
                beginningPeriod={getDefaultBeginning(beginningPeriod)}
            />
        </PlannerModal>
    );
};

export default TaskAdd;
