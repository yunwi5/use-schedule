import { useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { fetchAllEvents } from '../lib/events/event-apis';
import { callRecurringItemUpdate } from '../lib/recurring';
import { IEvent } from '../models/Event';
import { processEvents } from '../utilities/event-utils/event-util';

type FilterCallback = (event: { name: string }) => boolean;

const useEventQuery = (initialEvents?: IEvent[], filterCallback?: FilterCallback) => {
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
        let processed = processEvents(events);
        let filtered = filterCallback ? processed.filter(filterCallback) : processed;
        return filtered;
    }, [events, filterCallback]);

    useEffect(() => {
        callRecurringItemUpdate().then(({ isSuccess, message }) =>
            console.log(`success: ${isSuccess}, ${message}`),
        );
    }, []);

    return {
        events: processedEvents,
        invalidateEvents,
    };
};

export default useEventQuery;
