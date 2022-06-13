import React from 'react';
import useRecurringEventQuery from '../../../hooks/recurring-item-hooks/useRecurringEventQuery';
import { NoIdRecurringEvent } from '../../../models/recurring-models/RecurringEvent';
import WrapperModal from '../../ui/modal/wrapper/WrapperModal';
import RecurringEventForm from './form/RecurringEventForm';

interface Props {
    onClose: () => void;
    onAdd: () => void;
    beginningPeriod?: Date;
}

const RecurringEventAdd: React.FC<Props> = (props) => {
    const beginningPeriod = props.beginningPeriod ?? new Date();
    const { onClose, onAdd } = props;
    const { addRecEvent } = useRecurringEventQuery({
        onInvalidate: onAdd,
    });

    const addHandler = async (newRecurringEvent: NoIdRecurringEvent) => {
        console.log(newRecurringEvent);
        addRecEvent(newRecurringEvent);
        let timer = setTimeout(() => {
            onClose();
        }, 1100);
    };

    return (
        <WrapperModal onClose={onClose}>
            <RecurringEventForm
                onSubmit={addHandler}
                onClose={onClose}
                beginningPeriod={beginningPeriod}
            />
        </WrapperModal>
    );
};

export default RecurringEventAdd;
