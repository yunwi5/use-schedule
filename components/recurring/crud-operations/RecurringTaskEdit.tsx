import React, { useRef, useState } from 'react';

import useRecurringTaskQuery from '../../../hooks/recurring-item-hooks/useRecurringTaskQuery';
import {
    NoIdRecurringTask,
    RecurringTask,
    RecurringTaskProps,
} from '../../../models/recurring-models/RecurringTask';
import RecurringItemDeleteModal from '../../ui/modal/modal-variation/RecurringItemDeleteModal';
import RecurringItemEditModal from '../../ui/modal/modal-variation/RecurringItemEditModal';
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
    const propsRef = useRef<RecurringTaskProps | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const submitHandler = async (newRecurringEvent: NoIdRecurringTask) => {
        console.log(newRecurringEvent);
        const newProps: RecurringTaskProps = {
            ...newRecurringEvent,
            startDate: initialRecTask.startDate, // should be editted properties
            interval: initialRecTask.interval,
            lastRecurred: initialRecTask.lastRecurred,
        };
        propsRef.current = newProps;
        setShowEditModal(true);
    };

    const editHandler = async (patchGenerated: boolean) => {
        if (propsRef.current == null) return;
        await patchRecTask(
            initialRecTask.id,
            propsRef.current,
            patchGenerated,
            initialRecTask.plannerType,
        );
    };

    const deleteHandler = async (deleteGeneratedEvents: boolean) => {
        setShowDeleteModal(false);
        deleteRecTask(initialRecTask.id, deleteGeneratedEvents, initialRecTask.plannerType);
    };

    return (
        <WrapperModal onClose={onClose}>
            <RecurringTaskForm
                onSubmit={submitHandler}
                onClose={onClose}
                beginningPeriod={initialRecTask.startDate}
                initialTask={initialRecTask}
                onDelete={() => setShowDeleteModal(true)}
                isEdit={true}
            />
            {showEditModal && (
                <RecurringItemEditModal
                    onClose={() => setShowEditModal(false)}
                    targetName={initialRecTask.name}
                    onAction={editHandler}
                />
            )}
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
