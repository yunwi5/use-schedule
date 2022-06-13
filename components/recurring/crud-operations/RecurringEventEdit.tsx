import React, { useState } from 'react';
import useRecurringEventQuery from '../../../hooks/recurring-item-hooks/useRecurringEventQuery';
import {
    NoIdRecurringEvent,
    RecurringEvent,
    RecurringEventProps,
} from '../../../models/recurring-models/RecurringEvent';
import DeleteModal from '../../ui/modal/modal-variation/DeleteModal';
import RecurringItemDeleteModal from '../../ui/modal/modal-variation/RecurringItemDeleteModal';
import WrapperModal from '../../ui/modal/wrapper/WrapperModal';
import RecurringEventForm from './form/RecurringEventForm';

interface Props {
    onClose: () => void;
    onEdit: () => void;
    initialRecEvent: RecurringEvent;
}

const RecurringEventEdit: React.FC<Props> = (props) => {
    const { onClose, onEdit, initialRecEvent } = props;
    const { patchRecEvent, deleteRecEvent } = useRecurringEventQuery({
        onInvalidate: onEdit,
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const editHandler = async (newRecurringEvent: NoIdRecurringEvent) => {
        console.log(newRecurringEvent);
        const newRecurringEventProps: RecurringEventProps = {
            ...newRecurringEvent,
            lastRecurred: initialRecEvent.lastRecurred,
        };
        // status should not be overriden
        // delete newRecurringEventProps.status;
        // need to show modal to confirm whether user wants to fix existing generated events as well.
        await patchRecEvent(initialRecEvent.id, newRecurringEventProps);

        // close after 1s
        setTimeout(() => {
            onClose();
        }, 1000);
    };

    const deleteHandler = async (deleteGeneratedEvents: boolean) => {
        setShowDeleteModal(false);
        console.log('Delete all generated:', deleteGeneratedEvents);
        deleteRecEvent(initialRecEvent.id, deleteGeneratedEvents);
    };

    return (
        <WrapperModal onClose={onClose}>
            <RecurringEventForm
                onSubmit={editHandler}
                onClose={onClose}
                beginningPeriod={initialRecEvent.startDate}
                initialEvent={initialRecEvent}
                onDelete={() => setShowDeleteModal(true)}
                isEdit={true}
            />
            {showDeleteModal && (
                <RecurringItemDeleteModal
                    onClose={() => setShowDeleteModal(false)}
                    targetName={initialRecEvent.name}
                    onAction={deleteHandler}
                />
            )}
        </WrapperModal>
    );
};

export default RecurringEventEdit;
