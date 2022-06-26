import { useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { fetchAllEvents } from '../lib/events/event-apis';
import { IEvent } from '../models/Event';
import { processEvents } from '../utilities/event-utils/event-util';

const useEventQuery = (initialEvents?: IEvent[]) => {
    const queryClient = useQueryClient();
    const { data: eventData, isError: isEventError } = useQuery('events', fetchAllEvents, {
        initialData: initialEvents ? { events: initialEvents } : undefined,
    });
    if (isEventError) {
        console.log('Event error');
    }
    const events: IEvent[] = useMemo(() => (eventData ? eventData.events : []), [eventData]);

    const invalidateEvents = () => queryClient.invalidateQueries('events');

    const processedEvents = useMemo(() => {
        return processEvents(events);
    }, [events]);

    return {
        events: processedEvents,
        invalidateEvents,
    };
};

export default useEventQuery;
