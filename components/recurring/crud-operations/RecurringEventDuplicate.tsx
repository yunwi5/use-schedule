import React from 'react';
import useRecurringEventQuery from '../../../hooks/recurring-item-hooks/useRecurringEventQuery';
import { IEvent } from '../../../models/Event';
import { NoIdRecurringEvent } from '../../../models/recurring-models/RecurringEvent';
import WrapperModal from '../../ui/modal/wrapper/WrapperModal';
import RecurringEventForm from './form/RecurringEventForm';

interface Props {
    onClose: () => void;
    onDuplicate: () => void;
    initialEvent: IEvent;
    formTitle?: string;
}

const RecurringEventDuplicate: React.FC<Props> = (props) => {
    const { onClose, onDuplicate, initialEvent, formTitle } = props;
    const { addRecEvent } = useRecurringEventQuery({
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
    };

    return (
        <WrapperModal onClose={onClose}>
            <RecurringEventForm
                onSubmit={duplicateHandler}
                onClose={onClose}
                beginningPeriod={initialEvent.dateTime}
                initialEvent={initialEvent}
                heading={formTitle || 'Duplicate Recurring Event'}
                isEdit={false}
            />
        </WrapperModal>
    );
};

export default RecurringEventDuplicate;
