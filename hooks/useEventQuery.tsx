import { useQuery, useQueryClient } from 'react-query';
import { fetchAllEvents } from '../lib/events/event-apis';
import { IEvent } from '../models/Event';

const useEventQuery = (initialEvents?: IEvent[]) => {
    const queryClient = useQueryClient();
    const { data: eventData, isError: isEventError } = useQuery('events', fetchAllEvents, {
        initialData: initialEvents ? { events: initialEvents } : undefined,
    });
    if (isEventError) {
        console.log('Event error');
    }
    const events: IEvent[] = eventData ? eventData.events : [];

    const invalidateEvents = () => queryClient.invalidateQueries('events');

    return {
        events,
        invalidateEvents,
    };
};

export default useEventQuery;
