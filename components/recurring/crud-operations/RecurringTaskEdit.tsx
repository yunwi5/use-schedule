import React, { useState } from 'react';

import useRecurringTaskQuery from '../../../hooks/recurring-item-hooks/useRecurringTaskQuery';
import {
    NoIdRecurringTask,
    RecurringTask,
    RecurringTaskProps,
} from '../../../models/recurring-models/RecurringTask';
import RecurringItemDeleteModal from '../../ui/modal/modal-variation/RecurringItemDeleteModal';
import WrapperModal from '../../ui/modal/wrapper/WrapperModal';
import RecurringTaskForm from './form/RecurringTaskForm';

interface Props {
    onClose: () => void;
    onEdit: () => void;
    initialRecTask: RecurringTask;
}

const RecurringTaskEdit: React.FC<Props> = (props) => {
    const { onClose, onEdit, initialRecTask } = props;
    const { patchRecTask, deleteRecTask } = useRecurringTaskQuery({
        onInvalidate: () => {
            onEdit();
            onClose();
        },
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const editHandler = async (newRecurringEvent: NoIdRecurringTask) => {
        console.log(newRecurringEvent);
        const newProps: RecurringTaskProps = {
            ...newRecurringEvent,
            startDate: initialRecTask.startDate, // should be editted properties
            interval: initialRecTask.interval,
            lastRecurred: initialRecTask.lastRecurred,
        };
        await patchRecTask(initialRecTask.id, newProps, true, initialRecTask.plannerType);
    };

    const deleteHandler = async (deleteGeneratedEvents: boolean) => {
        setShowDeleteModal(false);
        deleteRecTask(initialRecTask.id, deleteGeneratedEvents, initialRecTask.plannerType);
    };

    return (
        <WrapperModal onClose={onClose}>
            <RecurringTaskForm
                onSubmit={editHandler}
                onClose={onClose}
                beginningPeriod={initialRecTask.startDate}
                initialTask={initialRecTask}
                onDelete={() => setShowDeleteModal(true)}
                isEdit={true}
            />
            {showDeleteModal && (
                <RecurringItemDeleteModal
                    onClose={() => setShowDeleteModal(false)}
                    targetName={initialRecTask.name}
                    onAction={deleteHandler}
                />
            )}
        </WrapperModal>
    );
};

export default RecurringTaskEdit;
