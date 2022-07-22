import React, { useState } from 'react';
import { CalendarItemType } from '../../../../models/calendar-models/CalendarItemType';
import { EventProps, IEvent } from '../../../../models/Event';
import { Importance } from '../../../../models/task-models/Status';
import EventDetail from '../../events/detail/EventDetail';
import EventEdit from '../../events/EventEdit';
import AgendaItemCard from './AgendaItemCard';

interface Props {
    item: IEvent;
    onInvalidate(): void;
}

const AgendaEventItem: React.FC<Props> = ({ item, onInvalidate }) => {
    const [localEvent, setLocalEvent] = useState(item);
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const handleMutation = (eventProps: EventProps) => {
        setLocalEvent((prevEvent) => ({ ...prevEvent, ...eventProps }));
    };

    return (
        <>
            <AgendaItemCard
                item={localEvent}
                itemType={CalendarItemType.EVENT}
                status={localEvent.status}
                importance={localEvent.importance || Importance.IMPORTANT}
                location={localEvent.location}
                onShowDetail={() => setShowDetail(true)}
                onShowEdit={() => setShowEdit(true)}
            />
            {showDetail && (
                <EventDetail
                    onClose={() => setShowDetail(false)}
                    onInvalidate={onInvalidate}
                    onEditEvent={handleMutation}
                    event={localEvent}
                />
            )}
            {showEdit && (
                <EventEdit
                    event={localEvent}
                    onDeleteEvent={onInvalidate}
                    onEditEvent={handleMutation}
                    onClose={() => setShowEdit(false)}
                />
            )}
        </>
    );
};

export default AgendaEventItem;
