import { useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { StaticKeys } from '../constants/query-keys';
import { fetchAllEvents } from '../lib/events/event-apis';
import { IEvent } from '../models/Event';
import { processEvents } from '../utilities/event-utils/event-util';

const useEventQuery = (initialEvents?: IEvent[]) => {
    const queryClient = useQueryClient();
    const {
        data: eventData,
        isError: isEventError,
        isLoading,
    } = useQuery(StaticKeys.EVENT_QUERY_KEY, fetchAllEvents, {
        initialData: initialEvents ? { events: initialEvents } : undefined,
        refetchInterval: 1000,
    });
    if (isEventError) {
        console.log('Event error');
    }
    const events: IEvent[] = useMemo(() => (eventData ? eventData.events : []), [eventData]);

    const invalidateEvents = () => queryClient.invalidateQueries(StaticKeys.EVENT_QUERY_KEY);

    const processedEvents = useMemo(() => {
        return processEvents(events);
    }, [events]);

    return {
        events: processedEvents,
        invalidateEvents,
        isLoading,
    };
};

export default useEventQuery;
