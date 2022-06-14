import React from 'react';
import useRecurringEventQuery from '../../../hooks/recurring-item-hooks/useRecurringItemQuery';
import { NoIdRecurringTask } from '../../../models/recurring-models/RecurringTask';
import WrapperModal from '../../ui/modal/wrapper/WrapperModal';
import RecurringTaskForm from './form/RecurringTaskForm';

interface Props {
    onClose: () => void;
    onAdd: () => void;
    beginningPeriod?: Date;
}

const RecurringEventAdd: React.FC<Props> = (props) => {
    const beginningPeriod = props.beginningPeriod ?? new Date();
    const { onClose, onAdd } = props;
    const { addRecItem } = useRecurringEventQuery({
        onInvalidate: onAdd,
    });

    const addHandler = async (newRecurringTask: any) => {
        console.log(newRecurringTask);
        // addRecEvent(newRecurringTask);
        let timer = setTimeout(() => {
            onClose();
            clearTimeout(timer);
        }, 1100);
    };

    return (
        <WrapperModal onClose={onClose}>
            <RecurringTaskForm
                onSubmit={addHandler}
                onClose={onClose}
                beginningPeriod={beginningPeriod}
            />
        </WrapperModal>
    );
};

export default RecurringEventAdd;
