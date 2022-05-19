import React from 'react';

import Modal from '../../ui/modal/Modal';
import { addMinutes } from '../../../utilities/date-utils/date-control';
import EventForm from './form/EventForm';
import useEventAdd from '../../../hooks/event-hooks/useEventAdd';

interface Props {
    onClose: () => void;
    onAdd: () => void;
    beginningPeriod: Date;
}

const EventAdd: React.FC<Props> = ({ onClose, onAdd, beginningPeriod: initialPeriod }) => {
    const beginningPeriod = addMinutes(initialPeriod, 60 * 12);
    const { addEvent } = useEventAdd({ onAdd });

    return (
        <Modal
            onClose={onClose}
            modalClass={`modal gap-[1.2rem] text-[1.1rem] min-h-[28rem] max-h-[700px]`}
        >
            <EventForm onSubmit={addEvent} onClose={onClose} beginningPeriod={beginningPeriod} />
        </Modal>
    );
};

export default EventAdd;
