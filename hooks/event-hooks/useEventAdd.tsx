import { NoIdEvent } from '../../models/Event';
import { postEvent } from '../../lib/events/event-apis';
import useNotification from '../useNotification';
import { NotifStatus } from '../../components/ui/Notification';
import { useQueryClient } from 'react-query';
import { StaticKeys } from '../../constants/query-keys';

interface Props {
    onAdd(): void;
}

const useEventAdd = ({ onAdd }: Props) => {
    // For faster cache update for tasks data on the frontend
    const queryClient = useQueryClient();
    const { setNotification } = useNotification();

    const eventAddHandler = async (newEvent: NoIdEvent) => {
        setNotification(NotifStatus.PENDING, 'Posting your event...');
        const { isSuccess, message, insertedId } = await postEvent(newEvent);
        if (isSuccess) {
            if (insertedId) newEvent.id = insertedId;

            setNotification(NotifStatus.SUCCESS, message);
            onAdd();

            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries([StaticKeys.EVENT_QUERY_KEY]);

            // Optimistically update to the new value
            queryClient.setQueryData(
                [StaticKeys.EVENT_QUERY_KEY],
                (oldEventData: any | undefined) => {
                    const newEvents = [...oldEventData?.events, newEvent];
                    return { events: newEvents };
                },
            );
        } else {
            setNotification(NotifStatus.ERROR, message);
        }
    };

    return { addEvent: eventAddHandler };
};

export default useEventAdd;
