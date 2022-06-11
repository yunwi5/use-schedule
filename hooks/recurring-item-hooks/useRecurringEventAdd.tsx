import useNotification from '../useNotification';
import { NotifStatus } from '../../components/ui/Notification';
import { NoIdRecurringEvent } from '../../models/recurring-models/RecurringEvent';
import { postRecurringEvent } from '../../lib/recurring/recurring-event-apis';

interface Props {
    onAdd(): void;
}

const useEventAdd = ({ onAdd }: Props) => {
    const { setNotification } = useNotification();

    const eventAddHandler = async (newRecEvent: NoIdRecurringEvent) => {
        setNotification(NotifStatus.PENDING, 'Posting your recurring event...');
        const { isSuccess, message, insertedId } = await postRecurringEvent(newRecEvent);
        console.log(`insertedId: ${insertedId}`);
        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS, message);
            onAdd();
        } else {
            setNotification(NotifStatus.ERROR, message);
        }
    };

    return { addRecEvent: eventAddHandler };
};

export default useEventAdd;
