import React, { useRef, useState } from 'react';

import useRecurringEventQuery from '../../../hooks/recurring-item-hooks/useRecurringEventQuery';
import {
    NoIdRecurringEvent,
    RecurringEvent,
    RecurringEventProps,
} from '../../../models/recurring-models/RecurringEvent';
import RecurringItemDeleteModal from '../../ui/modal/modal-variation/RecurringItemDeleteModal';
import RecurringItemEditModal from '../../ui/modal/modal-variation/RecurringItemEditModal';
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
        onInvalidate: () => {
            onEdit();
            onClose();
        },
    });
    // store eventProps in the ref, before calling patch query
    const propsRef = useRef<RecurringEventProps | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // When submitted, show edit modal to let users choose whether they want to
    // edit all existing one-off events generated by this , or just keep them as they are
    const submitHandler = async (newRecurringEvent: NoIdRecurringEvent) => {
        const newRecurringEventProps: RecurringEventProps = {
            ...newRecurringEvent,
            startDate: initialRecEvent.startDate, // should be editted properties
            interval: initialRecEvent.interval,
            lastRecurred: initialRecEvent.lastRecurred,
        };
        // temporarily store the updated props in the ref before getting user's choice
        propsRef.current = newRecurringEventProps;
        setShowEditModal(true);
    };

    // execute edit action - PATCH request
    const editHandler = async (patchGenerated: boolean) => {
        if (propsRef.current == null) return;
        await patchRecEvent(initialRecEvent.id, propsRef.current, patchGenerated);
    };

    // execute delete action - DELETE request
    const deleteHandler = async (deleteGeneratedEvents: boolean) => {
        setShowDeleteModal(false);
        deleteRecEvent(initialRecEvent.id, deleteGeneratedEvents);
    };

    return (
        <WrapperModal onClose={onClose}>
            <RecurringEventForm
                onSubmit={submitHandler}
                onClose={onClose}
                beginningPeriod={initialRecEvent.startDate}
                initialEvent={initialRecEvent}
                onDelete={() => setShowDeleteModal(true)}
                isEdit={true}
            />
            {showEditModal && (
                <RecurringItemEditModal
                    onClose={() => setShowEditModal(false)}
                    targetName={initialRecEvent.name}
                    onAction={editHandler}
                />
            )}
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
