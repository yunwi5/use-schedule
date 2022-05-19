import React, { useState } from 'react';
import useNotification from '../../../hooks/useNotification';
import Modal from '../../ui/modal/Modal';
import { IEvent, EventProps } from '../../../models/Event';
import EventForm from './form/EventForm';
import { deleteEvent, patchEvent } from '../../../lib/events/event-apis';
import { NotifStatus } from '../../ui/Notification';
import DeleteModal from '../../ui/modal/modal-variation/DeleteModal';
import useEventDelete from '../../../hooks/event-hooks/useEventDelete';

interface Props {
    onClose: () => void;
    onEditEvent: () => void;
    event: IEvent;
}

const EventEdit: React.FC<Props> = ({ onClose, onEditEvent, event }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { setNotification } = useNotification();
    const { deleteEvent } = useEventDelete({ onClose, event, onInvalidate: onEditEvent });

    const eventEditHandler = async (editedEvent: EventProps) => {
        // Send HTTP PATCH request with given event id
        setNotification(NotifStatus.PENDING, 'Updating event...');
        delete editedEvent['status'];
        const { isSuccess, message } = await patchEvent(event.id, editedEvent);
        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS, message);
            onEditEvent();
            onClose();
        } else {
            setNotification(NotifStatus.ERROR, message);
        }
    };

    return (
        <>
            <Modal
                onClose={onClose}
                modalClass={`modal gap-[1.2rem] text-[1.1rem] min-h-[28rem] max-h-[700px]`}
            >
                <EventForm
                    onSubmit={eventEditHandler}
                    onClose={onClose}
                    beginningPeriod={event.dateTime}
                    initialEvent={event}
                    onDelete={() => setShowDeleteModal(true)}
                />
            </Modal>
            {showDeleteModal && (
                <DeleteModal
                    targetName={event.name}
                    onAction={deleteEvent}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
        </>
    );
};

export default EventEdit;
