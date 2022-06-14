import React, { useState } from 'react';
import useRecurringEventQuery from '../../../hooks/recurring-item-hooks/useRecurringEventQuery';
import { IEvent } from '../../../models/Event';
import {
    NoIdRecurringEvent,
    RecurringEvent,
} from '../../../models/recurring-models/RecurringEvent';
import WrapperModal from '../../ui/modal/wrapper/WrapperModal';
import RecurringEventForm from './form/RecurringEventForm';

interface Props {
    onClose: () => void;
    onDuplicate: () => void;
    initialRecEvent: IEvent;
}

const RecurringEventDuplicate: React.FC<Props> = (props) => {
    const { onClose, onDuplicate, initialRecEvent } = props;
    const { addRecEvent: addRecEvent } = useRecurringEventQuery({
        onInvalidate: () => {
            onDuplicate();
            onClose();
        },
    });

    const duplicateHandler = async (newRecurringEvent: NoIdRecurringEvent) => {
        // status should not be overriden
        // delete newRecurringEventProps.status;
        // need to show modal to confirm whether user wants to fix existing generated events as well.
        addRecEvent(newRecurringEvent);

        // close after 1.1s
        let timer = setTimeout(() => {
            onClose();
            clearTimeout(timer);
        }, 1100);
    };

    return (
        <WrapperModal onClose={onClose}>
            <RecurringEventForm
                onSubmit={duplicateHandler}
                onClose={onClose}
                beginningPeriod={initialRecEvent.dateTime}
                initialEvent={initialRecEvent}
                heading={'Duplicate Recurring Event'}
                isEdit={false}
            />
        </WrapperModal>
    );
};

export default RecurringEventDuplicate;
