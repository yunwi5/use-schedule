import React from 'react';
import useRecurringEventAdd from '../../../hooks/recurring-item-hooks/useRecurringEventAdd';
import { NoIdRecurringEvent } from '../../../models/recurring-models/RecurringEvent';
import WrapperModal from '../../ui/modal/modal-variation/WrapperModal';
import RecurringEventForm from './form/RecurringEventForm';

interface Props {
    onClose: () => void;
    onAdd: () => void;
    beginningPeriod?: Date;
}

const RecurringEventAdd: React.FC<Props> = (props) => {
    const beginningPeriod = props.beginningPeriod ?? new Date();
    const { onClose, onAdd } = props;
    const { addRecEvent } = useRecurringEventAdd({ onAdd });

    const addHandler = async (newRecurringEvent: NoIdRecurringEvent) => {
        console.log(newRecurringEvent);
        addRecEvent(newRecurringEvent);
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
