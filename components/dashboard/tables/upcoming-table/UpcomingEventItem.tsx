import React, { useState } from 'react';

import { CalendarItemType } from '../../../../models/calendar-models/CalendarItemType';
import { IEvent } from '../../../../models/Event';
import { useDashboardContext } from '../../../../store/context/dashboard-context';
import EventDetail from '../../../calendar/events/detail/EventDetail';
import EventEdit from '../../../calendar/events/EventEdit';
import UpcomingItemCard from '../../cards/UpcomingItemCard';

interface Props {
    event: IEvent;
}

const UpcomingEventItem: React.FC<Props> = ({ event }) => {
    const { onInvalidate } = useDashboardContext();
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <UpcomingItemCard
                item={event}
                itemType={CalendarItemType.EVENT}
                onShowDetail={() => setShowDetail(true)}
            />
            {showDetail && (
                <EventDetail
                    onClose={() => setShowDetail(false)}
                    onInvalidate={onInvalidate}
                    event={event}
                />
            )}
        </>
    );
};

export default UpcomingEventItem;
