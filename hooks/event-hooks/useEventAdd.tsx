import { NoIdEvent } from '../../models/Event';
import { postEvent } from '../../lib/events/event-apis';
import useNotification from '../useNotification';
import { NotifStatus } from '../../components/ui/Notification';

interface Props {
    onAdd(): void;
}

const useEventAdd = ({ onAdd }: Props) => {
    const { setNotification } = useNotification();

    const eventAddHandler = async (newEvent: NoIdEvent) => {
        setNotification(NotifStatus.PENDING, 'Posting your event...');
        const { isSuccess, message } = await postEvent(newEvent);
        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS, message);
            onAdd();
        } else {
            setNotification(NotifStatus.ERROR, message);
        }
    };

    return { addEvent: eventAddHandler };
};

export default useEventAdd;
