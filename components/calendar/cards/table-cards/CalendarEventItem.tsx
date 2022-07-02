import React, { useState } from 'react';
import { CalendarItemType } from '../../../../models/calendar-models/CalendarItemType';
import { IEvent } from '../../../../models/Event';
import { Status } from '../../../../models/task-models/Status';
import EventDetail from '../../events/detail/EventDetail';
import CalendarItemCard from './CalendarItemCard';

interface Props {
    event: IEvent;
    onInvalidate(): void;
}

const CalendarEventItem: React.FC<Props> = (props) => {
    const { event, onInvalidate } = props;
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <CalendarItemCard
                bgClass={`bg-sky-50`}
                textClass={`text-sky-600/70`}
                hoverBgClass={`hover:bg-sky-500/60`}
                hoverTextClass={`hover:text-sky-50`}
                borderClass={'border-sky-500/70'}
                dateTime={event.dateTime}
                isCompleted={event.status === Status.COMPLETED}
                overdue={event.status === Status.OVERDUE}
                itemType={CalendarItemType.EVENT}
                onClick={setShowDetail.bind(null, true)}
            >
                {event.name}
            </CalendarItemCard>
            {showDetail && (
                <EventDetail
                    onClose={setShowDetail.bind(null, false)}
                    onInvalidate={onInvalidate}
                    event={event}
                />
            )}
        </>
    );
};

export default CalendarEventItem;
