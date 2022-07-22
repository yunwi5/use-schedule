import { useState } from 'react';

import { CalendarItemType } from '../../../../models/calendar-models/CalendarItemType';
import { EventProps, IEvent } from '../../../../models/Event';
import { useDashboardContext } from '../../../../store/context/dashboard-context';
import EventDetail from '../../../calendar/events/detail/EventDetail';
import UpcomingItemCard from '../../cards/UpcomingItemCard';

interface Props {
    event: IEvent;
}

const UpcomingEventItem: React.FC<Props> = ({ event }) => {
    const { onInvalidate } = useDashboardContext();
    const [localEvent, setLocalEvent] = useState(event);
    const [showDetail, setShowDetail] = useState(false);

    const handleMutation = (eventProps: EventProps) => {
        setLocalEvent((prevEvent) => ({ ...prevEvent, ...eventProps }));
    };

    return (
        <>
            <UpcomingItemCard
                item={localEvent}
                itemType={CalendarItemType.EVENT}
                onShowDetail={() => setShowDetail(true)}
            />
            {showDetail && (
                <EventDetail
                    onEditEvent={handleMutation}
                    onClose={() => setShowDetail(false)}
                    onInvalidate={onInvalidate}
                    event={localEvent}
                />
            )}
        </>
    );
};

export default UpcomingEventItem;
