import React from 'react';

import { NoIdEvent } from '../../../models/Event';
import { postEvent } from '../../../lib/events/event-apis';
import useNotification from '../../../hooks/useNotification';
import Modal from '../../ui/modal/Modal';
import { NotifStatus } from '../../ui/Notification';
import { addDays, addMinutes } from '../../../utilities/date-utils/date-control';
import EventForm from './form/EventForm';
import classes from './EventModal.module.scss';

interface Props {
    onClose: () => void;
    onAddEvent: () => void;
    beginningPeriod: Date;
}

const EventAdd: React.FC<Props> = ({ onClose, onAddEvent, beginningPeriod: initialPeriod }) => {
    const beginningPeriod = addMinutes(initialPeriod, 60 * 12);
    const { setNotification } = useNotification();

    const eventAddHandler = async (newEvent: NoIdEvent) => {
        console.log('new event:', newEvent);
        setNotification(NotifStatus.PENDING, 'Posting your event...');
        const { isSuccess, message } = await postEvent(newEvent);
        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS, message);
            onAddEvent();
        } else {
            setNotification(NotifStatus.ERROR, message);
        }
    };

    return (
        <Modal onClose={onClose} modalClass={`modal ${classes.modal}`}>
            <EventForm
                onSubmit={eventAddHandler}
                onClose={onClose}
                beginningPeriod={beginningPeriod}
            />
        </Modal>
    );
};

export default EventAdd;
