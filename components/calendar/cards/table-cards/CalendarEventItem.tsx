import React, { useState } from 'react';
import { CalendarItemType } from '../../../../models/calendar-models/CalendarItemType';
import { EventProps, IEvent } from '../../../../models/Event';
import { Status } from '../../../../models/task-models/Status';
import EventDetail from '../../events/detail/EventDetail';
import CalendarItemCard from './CalendarItemCard';

interface Props {
    event: IEvent;
    onInvalidate(): void;
}

const CalendarEventItem: React.FC<Props> = (props) => {
    const { event, onInvalidate } = props;
    const [localEvent, setLocalEvent] = useState(event);
    const [showDetail, setShowDetail] = useState(false);

    const handleMutation = (eventProps?: EventProps) => {
        if (!eventProps) return;
        setLocalEvent((prevEvent) => ({ ...prevEvent, ...eventProps }));
    };

    return (
        <>
            <CalendarItemCard
                bgClass={`bg-sky-50`}
                textClass={`text-sky-600/70`}
                hoverBgClass={`hover:bg-sky-500/60`}
                hoverTextClass={`hover:text-sky-50`}
                borderClass={'border-sky-500/70'}
                dateTime={localEvent.dateTime}
                isCompleted={localEvent.status === Status.COMPLETED}
                overdue={localEvent.status === Status.OVERDUE}
                itemType={CalendarItemType.EVENT}
                onClick={setShowDetail.bind(null, true)}
            >
                {localEvent.name}
            </CalendarItemCard>
            {showDetail && (
                <EventDetail
                    onClose={setShowDetail.bind(null, false)}
                    onEditEvent={handleMutation}
                    onInvalidate={onInvalidate}
                    event={localEvent}
                />
            )}
        </>
    );
};

export default CalendarEventItem;
