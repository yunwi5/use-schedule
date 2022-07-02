import useRecurringTaskQuery from '../../../hooks/recurring-item-hooks/useRecurringTaskQuery';
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
    const { addRecTask } = useRecurringTaskQuery({
        onInvalidate: () => {
            onAdd();
            onClose();
        },
    });

    const addHandler = async (newRecurringTask: NoIdRecurringTask) => {
        console.log(newRecurringTask);
        addRecTask(newRecurringTask);
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
