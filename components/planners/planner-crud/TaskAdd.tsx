import React, { useCallback, useState } from 'react';

import TaskForm from './task-form/TaskForm';
import PlannerModal from '../planner-modal/PlannerModal';
import DiscardModal from '../../ui/modal/modal-variation/DiscardModal';
import useTaskAdd from '../../../hooks/task-hooks/useTaskAdd';

interface Props {
    onClose: () => void;
    onAddTask: () => void;
    beginningPeriod: Date;
}

const TaskAdd: React.FC<Props> = (props) => {
    const { onClose, onAddTask, beginningPeriod } = props;
    const { addTask } = useTaskAdd({ onAdd: onAddTask });

    const [showDiscardModal, setShowDiscardModal] = useState(false);

    const [userHasEdit, setUserHasEdit] = useState(false);

    const closeHandler = useCallback(() => {
        if (userHasEdit) setShowDiscardModal(true);
        else onClose();
    }, [userHasEdit, onClose]);

    const userHasEditHandler = useCallback((hasEdit: boolean) => {
        setUserHasEdit(hasEdit);
    }, []);

    return (
        <PlannerModal onClose={closeHandler} title={'Add New Task'}>
            {showDiscardModal && (
                <DiscardModal onAction={onClose} onClose={setShowDiscardModal.bind(null, false)} />
            )}
            <TaskForm
                onSubmit={addTask}
                beginningPeriod={beginningPeriod}
                onHasEdit={userHasEditHandler}
                userHasEdit={userHasEdit}
            />
        </PlannerModal>
    );
};

export default TaskAdd;
