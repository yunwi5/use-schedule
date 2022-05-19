import React, { useState } from 'react';
import useNotification from '../useNotification';
import Modal from '../../components/ui/modal/Modal';
import { IEvent, EventProps } from '../../models/Event';
import { deleteEvent, patchEvent } from '../../lib/events/event-apis';
import { NotifStatus } from '../../components/ui/Notification';

interface Props {
    onClose: () => void;
    onInvalidate: () => void;
    event: IEvent;
}

const useEventDelete = ({ onClose, onInvalidate, event }: Props) => {
    const { setNotification } = useNotification();

    const eventDeleteHandler = async () => {
        // send HTTP DELETE request
        const { isSuccess, message } = await deleteEvent(event.id);
        setNotification(NotifStatus.PENDING, 'Deleting Event...');
        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS, message);
            onClose();
            onInvalidate(); // query invalidation
        } else {
            setNotification(NotifStatus.ERROR, message);
        }

        isSuccess
            ? setNotification(NotifStatus.SUCCESS, message)
            : setNotification(NotifStatus.ERROR, message);
    };

    return { deleteEvent: eventDeleteHandler };
};

export default useEventDelete;
